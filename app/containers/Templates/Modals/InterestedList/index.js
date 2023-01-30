import React from 'react';
import intersection from 'lodash/intersection';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import {
  // PENDING,
  MODE_CONSTANTS,
  MODE_CONSTANTS_VALUES,
  LAYOUT_CONSTANTS,
  LAYOUT_CONSTANTS_VALUES,
  DEFAULT,
  PEOPLE_TAB_OPTIONS,
  PEOPLE_FILTERS,
} from 'appConstants';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { PARTICIPANT } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import isFunction from 'lodash/isFunction';
/* import { TOUR_ROLE } from 'apis/components/Ability/roles';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc'; */
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogActions from 'components/Dialog/UGDialogAction';
import Button from 'viewComponents/Button';
import Filter from 'viewComponents/Filter';
import Icon from 'viewComponents/Icon';
import StyleIcon from 'ugcomponents/Icon';
import { H4 } from 'viewComponents/Typography';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import { Can } from 'apis/components/Ability/components/Can';

import InterestedListItem from './components/InterestedListItem';
import InvitationListItem from './components/InvitationListItem';
import ConnectedListItem from './components/ConnectedListItem';
import m from './messages';
import styles from './styles';
import { CONFIG_0, CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4 } from './config';
import { ability } from '../../../../apis/components/Ability/ability';

export class InterestedList extends React.PureComponent {
  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) {
      this.handleOpen();
    }
  };

  handleModeChange = ({ target: { value } }) => {
    this.props.resaga.setValue({ modeList: value });
  };

  handleOpen = () => {
    const { modeList } = InterestedList.defaultProps;
    this.props.resaga.setValue({ modeList });
  };

  handleFilterClick = (
    interestedListViewModalFilter,
    peopleTabOptionSelected,
  ) => () => {
    this.props.resaga.setValue({
      interestedListViewModalFilter,
      peopleTabOptionSelected,
      peopleFilterSelected: PEOPLE_FILTERS.FOLLOWER,
    });
  };

  handleCloseClick = () => {
    this.props.onClose();
  };

  handleOpenCreateInterestedPersonModal = () =>
    this.props.resaga.setValue({ interestedPersonCreateOpen: true });

  handleRowClick = id => {
    this.props.resaga.setValue({
      interestedPersonViewOpen: true,
      interestedPersonViewId: id,
      interestedPersonViewMode: null,
    });
  };

  handleModeSelect = mode => () => {
    this.props.resaga.setValue({
      modeList: mode,
    });
  };

  handleLayoutSelect = layout => () => {
    this.props.resaga.setValue({
      layout,
    });
  };

  canViewAll = () => ability.can('execute', PARTICIPANT);

  renderFilters = () => {
    const {
      modeList,
      completeInterestedPersonIds,
      pendingInterestedPersonIds,
      connectedNodeIds,
      peopleTabOptionSelected,
      interestedPersonIds,
      classes,
      children,
    } = this.props;
    const connectedIds = connectedNodeIds.map(item => item.nodeId);
    const filterConnectedComplete = intersection(
      completeInterestedPersonIds,
      connectedIds,
    );
    const filterConnectedPending = intersection(
      pendingInterestedPersonIds,
      connectedIds,
    );
    const connectedMode = modeList === MODE_CONSTANTS.CONNECTED;
    const content = (
      <React.Fragment>
        <Can do="execute" on={PARTICIPANT}>
          <GridItem>
            <Filter
              selected={
                peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS
              }
              color="pending"
              onClick={this.handleFilterClick(
                VARIANTS.ALL_FOLLOWERS,
                PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS,
              )}
              count={interestedPersonIds.length}
            >
              <M {...m.allFollowers} />
            </Filter>
          </GridItem>
        </Can>
        <GridItem className={this.canViewAll() && classes.indent}>
          <Filter
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ONLY_FOLLOWING
            }
            color="pending"
            onClick={this.handleFilterClick(
              VARIANTS.FOLLOWING,
              PEOPLE_TAB_OPTIONS.ONLY_FOLLOWING,
            )}
            count={LOGIC_HELPERS.ifElse(
              connectedMode,
              filterConnectedPending.length,
              pendingInterestedPersonIds.length,
            )}
          >
            <M {...m.pendingFilterLabel} />
          </Filter>
        </GridItem>
        <Can do="execute" on={PARTICIPANT}>
          <GridItem className={classes.indent}>
            <Filter
              selected={
                peopleTabOptionSelected ===
                PEOPLE_TAB_OPTIONS.ONLY_NOT_FOLLOWING
              }
              color="gray"
              onClick={this.handleFilterClick(
                VARIANTS.NOT_FOLLOWING,
                PEOPLE_TAB_OPTIONS.ONLY_NOT_FOLLOWING,
              )}
              count={LOGIC_HELPERS.ifElse(
                connectedMode,
                filterConnectedComplete.length,
                completeInterestedPersonIds.length,
              )}
            >
              <M {...m.completeFilterLabel} />
            </Filter>
          </GridItem>
        </Can>
      </React.Fragment>
    );
    if (isFunction(children)) {
      return children(content, this.canViewAll() || interestedPersonIds.length);
    }
    return content;
  };

  renderHeading = () => <M {...m.heading} />;

  renderSubheading = () => {
    const { classes } = this.props;
    return (
      <GridContainer alignItems="baseline" className={classes.noWrap} noWrap>
        <GridItem className={classes.modeSelectContainer}>
          {this.renderModePopper()}
        </GridItem>
        <GridItem className={classes.modeSelectContainer}>
          {this.renderLayoutPopper()}
        </GridItem>
      </GridContainer>
    );
  };

  renderModePopper = () => (
    <Popper
      placement="bottom"
      stopPropagation
      renderButton={this.renderModePopperButton}
    >
      {this.renderModePopperOptions}
    </Popper>
  );

  renderModePopperOptions = ({ closeMenu }) => {
    const { modeList } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={modeList === MODE_CONSTANTS.CREATED_AT}
            icon="lnr-users"
            closeMenu={closeMenu}
            onClick={this.handleModeSelect(MODE_CONSTANTS.CREATED_AT)}
          >
            Show People
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={modeList === MODE_CONSTANTS.CONNECTED}
            icon="lnr-group-work"
            closeMenu={closeMenu}
            onClick={this.handleModeSelect(MODE_CONSTANTS.CONNECTED)}
          >
            Show Connected
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={modeList === MODE_CONSTANTS.INVITE}
            icon="lnr-loading"
            closeMenu={closeMenu}
            onClick={this.handleModeSelect(MODE_CONSTANTS.INVITE)}
          >
            Show Pending
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderLayoutPopper = () => (
    <Popper
      stopPropagation
      placement="bottom"
      renderButton={this.renderLayoutPopperButton}
    >
      {this.renderLayoutPopperOptions}
    </Popper>
  );

  renderLayoutPopperOptions = ({ closeMenu }) => {
    const { layout } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={layout === LAYOUT_CONSTANTS.SIMPLE_VIEW}
            closeMenu={closeMenu}
            onClick={this.handleLayoutSelect(LAYOUT_CONSTANTS.SIMPLE_VIEW)}
          >
            Simple View
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={layout === LAYOUT_CONSTANTS.DETAILED_VIEW}
            closeMenu={closeMenu}
            onClick={this.handleLayoutSelect(LAYOUT_CONSTANTS.DETAILED_VIEW)}
          >
            Detailed View
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderLayoutPopperButton = ({ openMenu }) => {
    const { layout } = this.props;
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
        color="black"
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>{LAYOUT_CONSTANTS_VALUES[layout]}</GridItem>
          <GridItem>
            <StyleIcon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderModePopperButton = ({ openMenu }) => {
    const { modeList, classes } = this.props;
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
        className={classes.modeSelectContainer}
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>{MODE_CONSTANTS_VALUES[modeList]}</GridItem>
          <GridItem>
            <StyleIcon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  getName = value =>
    LOGIC_HELPERS.switchCase(value, {
      [PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS]: <M {...m.allFollowers} />,
      [PEOPLE_TAB_OPTIONS.ONLY_FOLLOWING]: <M {...m.pendingFilterLabel} />,
      [PEOPLE_TAB_OPTIONS.ONLY_NOT_FOLLOWING]: <M {...m.completeFilterLabel} />,
      [DEFAULT]: <M {...m.allFollowers} />,
    });

  renderFilterPopperButton = ({ openMenu }) => {
    const { classes, peopleTabOptionSelected } = this.props;
    return (
      <GridContainer
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        spacing={0}
        dense
      >
        <GridItem xs={12}>
          <Button
            noMargin
            size="base"
            color="normal"
            onClick={openMenu}
            className={classes.menuButton}
            variant={VARIANTS.INLINE}
          >
            {this.getName(peopleTabOptionSelected)}
            <Icon
              size="xsmall"
              icon="lnr-chevron-down"
              className={classes.addMarginLeft}
            />
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  renderFilterPopperOptions = ({ closeMenu }) => {
    const { peopleTabOptionSelected } = this.props;
    return (
      <GridContainer direction="column" wrap="nowrap">
        <Can do="execute" on={PARTICIPANT}>
          <GridItem>
            <MenuItem
              onClick={this.handleFilterClick(
                VARIANTS.ALL_FOLLOWERS,
                PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS,
              )}
              closeMenu={closeMenu}
              selected={
                peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS
              }
            >
              {this.getName(PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS)}
            </MenuItem>
          </GridItem>
        </Can>
        <GridItem>
          <MenuItem
            onClick={this.handleFilterClick(
              VARIANTS.FOLLOWING,
              PEOPLE_TAB_OPTIONS.ONLY_FOLLOWING,
            )}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ONLY_FOLLOWING
            }
          >
            {this.getName(PEOPLE_TAB_OPTIONS.ONLY_FOLLOWING)}
          </MenuItem>
        </GridItem>
        <Can do="execute" on={PARTICIPANT}>
          <GridItem>
            <MenuItem
              onClick={this.handleFilterClick(
                VARIANTS.NOT_FOLLOWING,
                PEOPLE_TAB_OPTIONS.ONLY_NOT_FOLLOWING,
              )}
              closeMenu={closeMenu}
              selected={
                peopleTabOptionSelected ===
                PEOPLE_TAB_OPTIONS.ONLY_NOT_FOLLOWING
              }
            >
              {this.getName(PEOPLE_TAB_OPTIONS.ONLY_NOT_FOLLOWING)}
            </MenuItem>
          </GridItem>
        </Can>
      </GridContainer>
    );
  };

  renderFilterPopper = () => (
    <Popper
      placement="bottom"
      renderButton={this.renderFilterPopperButton}
      stopPropagation
    >
      {this.renderFilterPopperOptions}
    </Popper>
  );

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderTitle = () => (
    <React.Fragment>
      <Title
        heading={this.renderHeading()}
        headingBackground={this.renderHeadingBackground()}
        renderSubheading={this.renderSubheading}
        hideOnSm={false}
      />
      <CloseButton onClick={this.handleCloseClick} />
    </React.Fragment>
  );

  renderAddRow = () => (
    <GridItem xs>
      <Button
        variant={VARIANTS.INLINE}
        color="primary"
        dense
        onClick={this.handleOpenCreateInterestedPersonModal}
      >
        <GridContainer alignItems="baseline">
          <GridItem>
            <Icon icon="plus" size={SIZE_CONSTANTS.XXS} bold color="success" />
          </GridItem>
          <GridItem>
            <H4 dense weight="bold" transform="uppercase" primary>
              <M {...m.addInterestedPersonButtonLabel} />
            </H4>
          </GridItem>
        </GridContainer>
      </Button>
    </GridItem>
  );

  renderInvitationRow = id => {
    const { templateId, modeList } = this.props;
    return (
      <InvitationListItem
        key={id}
        id={id}
        templateId={templateId}
        mode={modeList}
        statusHidden
      />
    );
  };

  renderNoInvitations = () => (
    <GridItem xs>
      <H4 dense fontStyle="italic">
        <M {...m.noInvitations} />
      </H4>
    </GridItem>
  );

  renderNoConnected = () => (
    <GridItem xs>
      <H4 dense fontStyle="italic">
        <M {...m.noConnected} />
      </H4>
    </GridItem>
  );

  renderNoLastAccess = () => (
    <GridItem xs>
      <H4 dense fontStyle="italic">
        <M {...m.noLastAccess} />
      </H4>
    </GridItem>
  );

  renderInterestedRow = (id, index) => {
    const { templateId, modeList } = this.props;
    return (
      <InterestedListItem
        key={id}
        id={id}
        templateId={templateId}
        mode={modeList}
        onClick={this.handleRowClick}
        index={index}
      />
    );
  };

  renderConnectedRow = id => {
    const { templateId, modeList } = this.props;
    return (
      <ConnectedListItem
        key={id}
        id={id}
        templateId={templateId}
        mode={modeList}
        onClick={this.handleRowClick}
      />
    );
  };

  renderNoInterestedRow = () => {
    const { interestedListViewModalFilter } = this.props;
    const message =
      interestedListViewModalFilter === VARIANTS.NOT_FOLLOWING ? (
        <M {...m.noInterestedComplete} />
      ) : (
        <M {...m.noInterestedPending} />
      );
    return (
      <GridItem xs>
        <H4 dense fontStyle="italic">
          {message}
        </H4>
      </GridItem>
    );
  };

  renderList = () => {
    const {
      modeList,
      interestedPersonIds,
      shareTokens,
      connectedNodeIds,
      interestedListViewModalFilter,
      completeInterestedPersonIds,
      pendingInterestedPersonIds,
    } = this.props;

    const filtered = connectedNodeIds
      .filter(item => interestedPersonIds.includes(item.nodeId))
      .map(item => item.nodeId);

    const people = LOGIC_HELPERS.switchCase(interestedListViewModalFilter, {
      [VARIANTS.ALL_FOLLOWERS]: interestedPersonIds,
      [VARIANTS.FOLLOWING]: pendingInterestedPersonIds,
      [VARIANTS.NOT_FOLLOWING]: completeInterestedPersonIds,
      [DEFAULT]: interestedPersonIds,
    });

    switch (modeList) {
      case 'invite':
        return shareTokens.length
          ? shareTokens.map(this.renderInvitationRow)
          : this.renderNoInvitations();
      case 'connected':
        return filtered.length
          ? filtered.map(this.renderInterestedRow)
          : this.renderNoConnected();
      default:
        return people.length
          ? people.map(this.renderInterestedRow)
          : this.renderNoConnected();
    }
  };

  renderContent = () => (
    <GridContainer direction="column">{this.renderList()}</GridContainer>
  );

  renderProp = () => {
    const {
      interestedPersonIds,
      interestedListViewModalFilter,
      completeInterestedPersonIds,
      pendingInterestedPersonIds,
      children,
    } = this.props;

    const people = LOGIC_HELPERS.switchCase(interestedListViewModalFilter, {
      [VARIANTS.ALL_FOLLOWERS]: interestedPersonIds,
      [VARIANTS.FOLLOWING]: pendingInterestedPersonIds,
      [VARIANTS.NOT_FOLLOWING]: completeInterestedPersonIds,
      [DEFAULT]: interestedPersonIds,
    });

    return children({ followers: people });
  };

  render = () => {
    const { open, onClose, variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.FILTERS_ONLY]: this.renderFilters,
      [VARIANTS.SORTERS_ONLY]: this.renderSubheading,
      [VARIANTS.CONTENT_ONLY]: this.renderContent,
      [VARIANTS.POPPER]: this.renderFilterPopper,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: (
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          maxHeight={SIZE_CONSTANTS.SM}
        >
          <DialogTitle noPaddingBottom>{this.renderTitle()}</DialogTitle>
          <DialogContent halfPaddingTop>{this.renderContent()}</DialogContent>
          <DialogActions disableActionSpacing>
            {this.renderAddRow()}
          </DialogActions>
        </Dialog>
      ),
    });
  };
}

InterestedList.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent
  templateId: PropTypes.number.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  openDialog: PropTypes.func,
  participantParentId: PropTypes.number,
  variant: PropTypes.string,
  children: PropTypes.func,

  // resaga value
  modeList: PropTypes.string,
  layout: PropTypes.string,
  connectedNodeIds: PropTypes.array,
  interestedPersonIds: PropTypes.array,
  completeInterestedPersonIds: PropTypes.array,
  pendingInterestedPersonIds: PropTypes.array,
  shareTokens: PropTypes.array,
  interestedListViewModalFilter: PropTypes.string,
  peopleTabOptionSelected: PropTypes.string,
};

InterestedList.defaultProps = {
  open: false,
  onClose: () => {},

  modeList: MODE_CONSTANTS.CREATED_AT,
  layout: LAYOUT_CONSTANTS.SIMPLE_VIEW,
  interestedListViewModalFilter: VARIANTS.ALL_FOLLOWERS,
  interestedPersonIds: [],
  completeInterestedPersonIds: [],
  pendingInterestedPersonIds: [],
  shareTokens: [],
  variant: '',
  peopleTabOptionSelected: '',
};

export default compose(
  withStyles(styles, { name: 'InterestedList' }),
  resaga(CONFIG_0()),
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
  resaga(CONFIG_3()),
  resaga(CONFIG_4()),
)(InterestedList);
