import { Can } from 'apis/components/Ability/components/Can';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import {
  PENDING,
  DEFAULT,
  PERSON_TYPE,
  INVITE,
  DETAILED_VIEW,
  SIMPLE_VIEW,
  LAYOUT_CONSTANTS_VALUES,
  PARTICIPANT_MODE_VALUES,
  SORT_CONSTANTS,
  PEOPLE_TAB_OPTIONS,
  PEOPLE_FILTERS,
} from 'appConstants';
import Hidden from '@material-ui/core/Hidden';
import { VARIANTS } from 'variantsConstants';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { PARTICIPANT } from 'utils/modelConstants';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { TOUR_ROLE } from 'apis/components/Ability/roles';
import { ability } from 'apis/components/Ability/ability';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogActions from 'components/Dialog/UGDialogAction';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { H4 } from 'viewComponents/Typography';
import Filter from 'viewComponents/Filter';
import isFunction from 'lodash/isFunction';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import ParticipantListItem from './components/ParticipantListItem';
import InvitationListItem from './components/InvitationListItem';
import m from './messages';
import styles from './styles';
import {
  CONFIG_0,
  CONFIG,
  CONFIG_1,
  CONFIG_2,
  CONFIG_3,
  CONFIG_4,
  CONFIG_5,
  SORTER_CONFIG,
} from './config';

export class ParticipantList extends React.PureComponent {
  componentWillMount = () => {
    const { modeList } = this.props;
    if (modeList === 'forms') {
      this.fetchParticipants();
    }
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) {
      this.handleOpen();
    } else if (
      prevProps.modeList !== 'forms' &&
      this.props.modeList === 'forms'
    ) {
      this.fetchParticipants();
    }
  };

  canAddParticipant = () => ability.can('execute', PARTICIPANT);

  fetchParticipants = () => {
    const {
      templateId: id,
      sortedConfirmed,
      sortedPending,
      sortedDeclined,
    } = this.props;
    const ids = [...sortedConfirmed, ...sortedPending, ...sortedDeclined];
    TEMPLATE_API_HELPERS.getParticipants({ id, ids }, this.props);
  };

  handleOpen = () => {
    const { modeList, includeFormsMode } = this.props;
    if (includeFormsMode && modeList === 'forms') {
      this.fetchParticipants();
    }
  };

  handleModeSelect = mode => () => {
    this.props.resaga.setValue({
      modeList: mode,
      participantViewModeModalFilter: null,
    });
  };

  handleSortSelect = sortMode => () => {
    this.props.resaga.setValue({
      sortMode,
    });
  };

  handleLayoutSelect = layout => () => {
    this.props.resaga.setValue({
      layout,
    });
  };

  handleOpenCreateParticipantModal = () => {
    const { templateId } = this.props;
    this.props.resaga.setValue({
      participantCreateOpen: true,
      participantCreateParentNodeId: templateId,
      participantCreateMode: null,
    });
  };

  handleAllParticipantsClick = () => {
    this.props.resaga.setValue({
      participantViewModeModalFilter: VARIANTS.ALL_PARTICIPANTS,
      peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS,
      peopleFilterSelected: PEOPLE_FILTERS.PARTICIPANTS,
      modeList: null,
    });
  };

  handleFilterConfirmedClick = () => {
    this.props.resaga.setValue({
      participantViewModeModalFilter: VARIANTS.CONFIRMED,
      peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS,
      peopleFilterSelected: PEOPLE_FILTERS.PARTICIPANTS,
      modeList: null,
    });
  };

  handleFilterAllClick = () => {
    this.props.resaga.setValue({
      participantViewModeModalFilter: VARIANTS.ALL_PARTICIPANTS,
      peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS,
      modeList: null,
    });
  };

  handleFilterPendingClick = () => {
    this.props.resaga.setValue({
      participantViewModeModalFilter: VARIANTS.PENDING,
      peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS,
      peopleFilterSelected: PEOPLE_FILTERS.PARTICIPANTS,
      modeList: null,
    });
  };

  handleFilterDeclinedClick = () => {
    this.props.resaga.setValue({
      participantViewModeModalFilter: VARIANTS.DECLINED,
      peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS,
      peopleFilterSelected: PEOPLE_FILTERS.PARTICIPANTS,
      modeList: null,
    });
  };

  handleCloseClick = () => {
    this.props.onClose();
  };

  handlePendingClick = () => {
    this.props.resaga.setValue({
      modeList: INVITE,
      participantViewModeModalFilter: null,
    });
  };

  getShowLabel = () => {
    const { sortedPending, sortedDeclined, participantNodeId } = this.props;
    if (sortedPending.includes(participantNodeId)) {
      return m.filterPendingLabel;
    }
    if (sortedDeclined.includes(participantNodeId)) {
      return m.filterDeclinedLabel;
    }
    return m.filterConfirmedLabel;
  };

  ownParticipantOnly = idsReference => {
    const { participantNodeId } = this.props;
    return (
      !this.canAddParticipant() && idsReference.includes(participantNodeId)
    );
  };

  renderFilters = () => {
    const {
      sortedConfirmed,
      sortedPending,
      sortedDeclined,
      peopleTabOptionSelected,
      sortedAll,
      useList,
      hideParticipants,
      participantNodeId,
      paxLabel,
      classes,
      renderContent,
      isInterestedPerson,
      hasParticipantIds,
    } = this.props;

    let content = null;

    if (
      (!useList && !participantNodeId) ||
      (useList && isInterestedPerson && !hasParticipantIds.length)
    ) {
      if (isFunction(renderContent)) {
        return renderContent(null, { useList, participantNodeId });
      }
      return null;
    }

    if (!useList) {
      content = (
        <GridItem>
          <Filter
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS
            }
            color="primary"
            onClick={this.handleFilterConfirmedClick}
            count={LOGIC_HELPERS.ifElse(
              sortedAll.includes(participantNodeId),
              1,
              0,
            )}
          >
            <Hidden smUp>
              <M {...m.filterConfirmedLabelWithoutCount} />
            </Hidden>
            <Hidden xsDown>
              <M
                {...this.getShowLabel()}
                values={{ count: LOGIC_HELPERS.ifElse(hideParticipants, 0, 1) }}
              />
            </Hidden>
          </Filter>
        </GridItem>
      );
      // return content;
      if (isFunction(renderContent)) {
        return renderContent(content, { useList, participantNodeId });
      }
      return content;
    }

    content = (
      <>
        <Can do="execute" on={PARTICIPANT}>
          <GridItem>
            <Filter
              selected={
                peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS
              }
              color="primary"
              onClick={this.handleFilterAllClick}
              count={sortedAll.length}
            >
              <Hidden smUp>
                <M
                  {...m.filterAllLabelWithoutCount}
                  values={{ paxLabel: this.props.paxLabel }}
                />
              </Hidden>
              <Hidden xsDown>
                <M
                  {...m.filterAllLabel}
                  values={{ count: sortedAll.length, paxLabel }}
                />
              </Hidden>
            </Filter>
          </GridItem>
        </Can>
        <GridItem className={this.canAddParticipant() && classes.indent}>
          <Filter
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS
            }
            color="primary"
            onClick={this.handleFilterConfirmedClick}
            count={sortedConfirmed.length}
          >
            <Hidden smUp>
              <M {...m.filterConfirmedLabelWithoutCount} />
            </Hidden>
            <Hidden xsDown>
              <M
                {...m.filterConfirmedLabel}
                values={{ count: sortedConfirmed.length }}
              />
            </Hidden>
          </Filter>
        </GridItem>
        {(this.canAddParticipant() ||
          this.ownParticipantOnly(sortedPending)) && (
          <GridItem className={this.canAddParticipant() && classes.indent}>
            <Filter
              selected={
                peopleTabOptionSelected ===
                PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS
              }
              onClick={this.handleFilterPendingClick}
              count={
                this.ownParticipantOnly(sortedPending)
                  ? 1
                  : sortedPending.length
              }
            >
              <Hidden smUp>
                <M {...m.filterPendingLabelWithoutCount} />
              </Hidden>
              <Hidden xsDown>
                <M
                  {...m.filterPendingLabel}
                  values={{
                    count: this.ownParticipantOnly(sortedPending)
                      ? 1
                      : sortedPending.length,
                  }}
                />
              </Hidden>
            </Filter>
          </GridItem>
        )}
        {(this.canAddParticipant() ||
          this.ownParticipantOnly(sortedDeclined)) && (
          <GridItem className={this.canAddParticipant() && classes.indent}>
            <Filter
              selected={
                peopleTabOptionSelected ===
                PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS
              }
              onClick={this.handleFilterDeclinedClick}
              count={
                this.ownParticipantOnly(sortedDeclined)
                  ? 1
                  : sortedDeclined.length
              }
            >
              <Hidden smUp>
                <M {...m.filterDeclinedLabelWithoutCount} />
              </Hidden>
              <Hidden xsDown>
                <M
                  {...m.filterDeclinedLabel}
                  values={{
                    count: this.ownParticipantOnly(sortedDeclined)
                      ? 1
                      : sortedDeclined.length,
                  }}
                />
              </Hidden>
            </Filter>
          </GridItem>
        )}
      </>
    );
    if (isFunction(renderContent)) {
      return renderContent(content, { useList, participantNodeId });
    }
    return content;
  };

  renderHeading = () => (
    <M {...m.heading} values={{ paxLabel: this.props.paxLabel }} />
  );

  renderSorter = () => {
    const { classes } = this.props;

    return (
      <GridContainer alignItems="baseline" justify="flex-start">
        {this.canAddParticipant() && (
          <GridItem className={classes.layoutSelectContainer}>
            {this.renderLayoutPopper()}
          </GridItem>
        )}
        <GridItem className={classes.sortBySelectContainer}>
          {this.renderSortPopper()}
        </GridItem>
      </GridContainer>
    );
  };

  renderSubheading = () => {
    const { classes } = this.props;
    return (
      <GridContainer className={classes.subheadingContainer}>
        <GridItem className={classes.filterContainer}>
          {this.renderFilters()}
        </GridItem>
        <GridItem className={classes.selectContainer}>
          {this.renderSorter()}
        </GridItem>
      </GridContainer>
    );
  };

  renderSortPopper = () => (
    <Popper
      placement="bottom"
      renderButton={this.renderSortPopperButton}
      stopPropagation
    >
      {this.renderSortPopperOptions}
    </Popper>
  );

  renderFilterPopper = () => (
    <Popper
      placement="bottom"
      renderButton={this.renderFilterPopperButton}
      stopPropagation
    >
      {this.renderFilterPopperOptions}
    </Popper>
  );

  getName = value =>
    LOGIC_HELPERS.switchCase(value, {
      [PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS]: (
        <M
          {...m.filterAllLabelWithoutCount}
          values={{ paxLabel: this.props.paxLabel }}
        />
      ),
      [PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS]: (
        <M {...m.filterConfirmedLabelWithoutCount} />
      ),
      [PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS]: (
        <M {...m.filterPendingLabelWithoutCount} />
      ),
      [PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS]: (
        <M {...m.filterDeclinedLabelWithoutCount} />
      ),
      [DEFAULT]: (
        <M
          {...m.filterAllLabelWithoutCount}
          values={{ paxLabel: this.props.paxLabel }}
        />
      ),
    });

  renderFilterPopperButton = ({ openMenu }) => {
    const { classes, peopleTabOptionSelected } = this.props;
    return (
      <GridContainer
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        // card
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
        <GridItem>
          <MenuItem
            onClick={this.handleFilterAllClick}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS
            }
          >
            {this.getName(PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS)}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            onClick={this.handleFilterConfirmedClick}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS
            }
          >
            {this.getName(PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS)}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            onClick={this.handleFilterPendingClick}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected === PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS
            }
          >
            {this.getName(PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS)}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            onClick={this.handleFilterDeclinedClick}
            closeMenu={closeMenu}
            selected={
              peopleTabOptionSelected ===
              PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS
            }
          >
            {this.getName(PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS)}
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderSortPopperButton = ({ openMenu }) => {
    const { classes } = this.props;
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
        className={classes.popperButton}
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>Sort by</GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderSortPopperOptions = ({ closeMenu }) => {
    const { sortMode } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={sortMode === SORT_CONSTANTS.NAME}
            icon="lnr-user"
            closeMenu={closeMenu}
            onClick={this.handleSortSelect(SORT_CONSTANTS.NAME)}
          >
            Name (Known As)
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={sortMode === SORT_CONSTANTS.CREATED_AT}
            icon="lnr-clock3"
            closeMenu={closeMenu}
            onClick={this.handleSortSelect(SORT_CONSTANTS.CREATED_AT)}
          >
            Recently Added
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            icon="lnr-man-woman"
            selected={sortMode === SORT_CONSTANTS.TYPE}
            closeMenu={closeMenu}
            onClick={this.handleSortSelect(SORT_CONSTANTS.TYPE)}
          >
            Kind
          </MenuItem>
        </GridItem>
        {/* <GridItem> */}
        {/*  <MenuItem */}
        {/*    selected={sortMode === SORT_CONSTANTS.MEDICALS} */}
        {/*    icon="lnr-first-aid" */}
        {/*    closeMenu={closeMenu} */}
        {/*    onClick={this.handleSortSelect(SORT_CONSTANTS.MEDICALS)} */}
        {/*  > */}
        {/*    Medicals */}
        {/*  </MenuItem> */}
        {/* </GridItem> */}
        {/* <GridItem> */}
        {/*  <MenuItem */}
        {/*    selected={sortMode === SORT_CONSTANTS.LAST_NAME} */}
        {/*    icon="lnr-user" */}
        {/*    closeMenu={closeMenu} */}
        {/*    onClick={this.handleSortSelect(SORT_CONSTANTS.LAST_NAME)} */}
        {/*  > */}
        {/*    Last Name */}
        {/*  </MenuItem> */}
        {/* </GridItem> */}
        {/* <GridItem> */}
        {/*  <MenuItem */}
        {/*    selected={sortMode === SORT_CONSTANTS.LAST_SEEN} */}
        {/*    icon="lnr-eye" */}
        {/*    closeMenu={closeMenu} */}
        {/*    onClick={this.handleSortSelect(SORT_CONSTANTS.LAST_SEEN)} */}
        {/*  > */}
        {/*    Last Seen */}
        {/*  </MenuItem> */}
        {/* </GridItem> */}
        {/* <GridItem> */}
        {/*  <MenuItem */}
        {/*    selected={sortMode === SORT_CONSTANTS.MOST_LIKES} */}
        {/*    icon="lnr-thumbs-up" */}
        {/*    closeMenu={closeMenu} */}
        {/*    onClick={this.handleSortSelect(SORT_CONSTANTS.MOST_LIKES)} */}
        {/*  > */}
        {/*    Most Likes */}
        {/*  </MenuItem> */}
        {/* </GridItem> */}
      </GridContainer>
    );
  };

  renderModePopper = () => (
    <Popper
      placement="bottom"
      renderButton={this.renderPopperButton}
      stopPropagation
    >
      {this.renderModePopperOptions}
    </Popper>
  );

  renderModePopperOptions = ({ closeMenu }) => {
    const { includeInviteMode, modeList } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={modeList === PERSON_TYPE}
            icon="lnr-user"
            closeMenu={closeMenu}
            onClick={this.handleModeSelect(PERSON_TYPE)}
          >
            Show People
          </MenuItem>
        </GridItem>
        {includeInviteMode && (
          <GridItem>
            <MenuItem
              selected={modeList === INVITE}
              icon="lnr-envelope"
              closeMenu={closeMenu}
              onClick={this.handleModeSelect(INVITE)}
            >
              Show Invitations
            </MenuItem>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderPopperButton = ({ openMenu }) => {
    const { classes, modeList } = this.props;
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
        className={classes.popperButton}
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>{PARTICIPANT_MODE_VALUES[modeList]}</GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderLayoutPopperButton = ({ openMenu }) => {
    const { classes, layout } = this.props;
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
        className={classes.popperButton}
        noPadding
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>{LAYOUT_CONSTANTS_VALUES[layout]}</GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
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
            selected={layout === SIMPLE_VIEW}
            closeMenu={closeMenu}
            onClick={this.handleLayoutSelect(SIMPLE_VIEW)}
          >
            Simple View
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={layout === DETAILED_VIEW}
            closeMenu={closeMenu}
            onClick={this.handleLayoutSelect(DETAILED_VIEW)}
          >
            Detailed View
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

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

  renderAddRow = () =>
    this.canAddParticipant() && (
      <Button
        variant={VARIANTS.INLINE}
        color="primary"
        dense
        onClick={this.handleOpenCreateParticipantModal}
      >
        <GridContainer alignItems="baseline" wrap="nowrap">
          <GridItem>
            <Icon icon="plus" size={SIZE_CONSTANTS.XXS} bold color="success" />
          </GridItem>
          <GridItem>
            <H4
              whiteSpace="nowrap"
              dense
              weight="bold"
              transform="uppercase"
              primary
            >
              <M
                {...m.addParticipantButtonLabel}
                values={{ paxLabel: this.props.paxLabel }}
              />
            </H4>
          </GridItem>
        </GridContainer>
      </Button>
    );

  renderInvitationRow = id => {
    const { templateId, modeList } = this.props;
    return (
      <InvitationListItem
        key={id}
        id={id}
        templateId={templateId}
        mode={modeList}
        heading
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

  renderParticipantRow = (id, index) => {
    const {
      templateId,
      defaultAccessLevel,
      interestedPersonNodeId,
      participantNodeId,
      modeList,
      loading,
      layout,
      variant,
    } = this.props;
    return (
      <ParticipantListItem
        key={id}
        id={id}
        index={index}
        templateId={templateId}
        defaultAccessLevel={defaultAccessLevel}
        interestedPersonNodeId={interestedPersonNodeId}
        participantNodeId={participantNodeId}
        mode={modeList}
        loading={loading}
        heading
        readOnlyStatus={!this.canAddParticipant()}
        layout={layout}
        typeOnly
        variant={variant}
        hideRenderRowTail
      />
    );
  };

  renderNoParticipantsRow = () => {
    const { filterConfirmed, filterPending } = this.props;
    let message = (
      <M
        {...m.noParticipantsDeclined}
        values={{ paxLabel: this.props.paxLabel }}
      />
    );
    if (filterConfirmed)
      message = (
        <M
          {...m.noParticipantsConfirmed}
          values={{ paxLabel: this.props.paxLabel }}
        />
      );
    if (filterPending)
      message = (
        <M
          {...m.noParticipantsPending}
          values={{ paxLabel: this.props.paxLabel }}
        />
      );
    return (
      <GridItem xs>
        <H4 dense fontStyle="italic">
          {message}
        </H4>
      </GridItem>
    );
  };

  renderParticipantList = ids =>
    ids.length
      ? ids.map(this.renderParticipantRow)
      : this.renderNoParticipantsRow();

  renderList = () => {
    const {
      modeList,
      shareTokens,
      participantViewModeModalFilter,
      sortedAll,
      useList,
      participantNodeId,
      sortedAllGroupsParticipants,
      sortedConfirmedGroupsParticipants,
      sortedPendingGroupsParticipants,
      sortedDeclinedGroupsParticipants,
    } = this.props;

    const ids = LOGIC_HELPERS.switchCase(participantViewModeModalFilter, {
      [VARIANTS.ALL_PARTICIPANTS]: sortedAllGroupsParticipants,
      [VARIANTS.CONFIRMED]: sortedConfirmedGroupsParticipants,
      [VARIANTS.PENDING]: sortedPendingGroupsParticipants,
      [VARIANTS.DECLINED]: sortedDeclinedGroupsParticipants,
      [DEFAULT]: sortedAllGroupsParticipants,
    });

    if (
      !useList ||
      ([VARIANTS.PENDING, VARIANTS.DECLINED].includes(
        participantViewModeModalFilter,
      ) &&
        this.ownParticipantOnly(ids))
    ) {
      if (sortedAll.includes(participantNodeId))
        return this.renderParticipantList([participantNodeId]);

      return this.renderNoParticipantsRow();
    }

    switch (modeList) {
      case INVITE:
        return shareTokens.length
          ? shareTokens.map(this.renderInvitationRow)
          : this.renderNoInvitations();
      default:
        return this.renderParticipantList(ids);
    }
  };

  renderPendingInvitations = () => {
    const { shareTokens } = this.props;
    return shareTokens.length
      ? shareTokens.map(this.renderInvitationRow)
      : this.renderNoInvitations();
  };

  renderContent = () => (
    <GridContainer direction="column" wrap="nowrap">
      {this.renderList()}
    </GridContainer>
  );

  renderProp = () => {
    const {
      sortedAll,
      useList,
      participantNodeId,
      sortedConfirmed,
      children,
      defaultAccessLevel,
      isInterestedPerson,
      sortedPending,
      sortedDeclined,
      participantViewModeModalFilter,
    } = this.props;

    const filteredParticipants = LOGIC_HELPERS.switchCase(
      participantViewModeModalFilter,
      {
        [VARIANTS.ALL_PARTICIPANTS]: sortedAll,
        [VARIANTS.CONFIRMED]: sortedConfirmed,
        [VARIANTS.PENDING]: sortedPending,
        [VARIANTS.DECLINED]: sortedDeclined,
        [DEFAULT]: sortedAll,
      },
    );

    if (!useList)
      return LOGIC_HELPERS.ifFunction(children, [
        {
          participants: [participantNodeId],
          filteredParticipants,
        },
      ]);

    if (defaultAccessLevel === PARTICIPANT_ACCESS_LEVELS.limited) {
      return LOGIC_HELPERS.ifFunction(children, [
        {
          participants: LOGIC_HELPERS.ifElse(
            participantNodeId && !sortedConfirmed.includes(participantNodeId),
            [...sortedConfirmed, participantNodeId],
            sortedConfirmed,
          ),
          filteredParticipants,
        },
      ]);
    }

    if (isInterestedPerson) {
      return LOGIC_HELPERS.ifFunction(children, [
        { participants: sortedConfirmed, filteredParticipants },
      ]);
    }

    return LOGIC_HELPERS.ifFunction(children, [
      { participants: sortedAll, filteredParticipants },
    ]);
  };

  render = () => {
    const { open, onClose, variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.CONTENT_ONLY]: this.renderContent,
      [VARIANTS.ACTION_ONLY]: this.renderAddRow,
      [VARIANTS.FILTERS_ONLY]: this.renderFilters,
      [VARIANTS.SORTERS_ONLY]: this.renderSorter,
      [VARIANTS.POPPER]: this.renderFilterPopper,
      pendingInvitations: this.renderPendingInvitations,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: (
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          maxHeight={SIZE_CONSTANTS.MD}
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

ParticipantList.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  userNodeIdsAll: PropTypes.array,

  // parent
  templateId: PropTypes.number,
  defaultAccessLevel: PropTypes.string,
  interestedPersonNodeId: PropTypes.number,
  participantNodeId: PropTypes.number,
  includeInviteMode: PropTypes.bool,
  includeFormsMode: PropTypes.bool,
  includeStatusFilters: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  variant: PropTypes.string,
  useList: PropTypes.bool,
  children: PropTypes.func,
  hideParticipants: PropTypes.bool,
  isInterestedPerson: PropTypes.bool,
  renderContent: PropTypes.func,

  // resaga value
  modeList: PropTypes.string,
  layout: PropTypes.string,
  filterConfirmed: PropTypes.bool,
  filterPending: PropTypes.bool,
  filterDeclined: PropTypes.bool,
  hasParticipantIds: PropTypes.bool,
  participantIds: PropTypes.array,
  sortedAll: PropTypes.array,
  sortedConfirmed: PropTypes.array,
  sortedPending: PropTypes.array,
  sortedDeclined: PropTypes.array,
  shareTokens: PropTypes.array,
  modeValue: PropTypes.string,
  participantViewModeModalFilter: PropTypes.string,
  sortMode: PropTypes.string,
  peopleTabOptionSelected: PropTypes.string,
  groups: PropTypes.array,
  sortedAllGroupsParticipants: PropTypes.array,
  sortedConfirmedGroupsParticipants: PropTypes.array,
  sortedPendingGroupsParticipants: PropTypes.array,
  sortedDeclinedGroupsParticipants: PropTypes.array,
  paxLabel: PropTypes.string,
  confirmedParticipantIds: PropTypes.array,
  // resaga isLoading
  loading: PropTypes.bool,
};

ParticipantList.defaultProps = {
  templateId: null,
  includeInviteMode: true,
  includeFormsMode: true,
  includeStatusFilters: true,
  open: false,
  onClose: () => {},

  modeList: null,
  sortMode: SORT_CONSTANTS.NAME,
  layout: 'simpleView',
  filterConfirmed: true,
  filterPending: false,
  filterDeclined: false,
  hasParticipantIds: false,
  participantIds: [],
  sortedAll: [],
  sortedConfirmed: [],
  sortedPending: [],
  sortedDeclined: [],
  shareTokens: [],
  modeValue: 'Show People',
  participantViewModeModalFilter: VARIANTS.ALL_PARTICIPANTS,
  isInterestedPerson: false,
  loading: false,
  hideParticipants: false,
  groups: [],
  sortedAllGroupsParticipants: [],
  confirmedParticipantIds: [],
};

export default compose(
  withStyles(styles, { name: 'ParticipantList' }),
  INVITATION_STORE_HOC.selectShareTokens({
    nodeIds: 'templateId',
    roles: [TOUR_ROLE.TOUR_PARTICIPANT],
    statuses: [PENDING],
  }),
  INVITATION_STORE_HOC.selectUserNodeIds({
    nodeIds: 'templateId',
    roles: [TOUR_ROLE.TOUR_PARTICIPANT],
    outputProp: 'userNodeIdsAll',
  }),
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'templateId',
    roles: [TOUR_ROLE.TOUR_PARTICIPANT],
    outputProp: 'userNodeUserIdsAll',
  }),
  resaga(CONFIG_0),
  resaga(CONFIG),
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
  resaga(CONFIG_3()),
  resaga(CONFIG_4()),
  resaga(CONFIG_5()),
  resaga(SORTER_CONFIG()),
)(ParticipantList);
