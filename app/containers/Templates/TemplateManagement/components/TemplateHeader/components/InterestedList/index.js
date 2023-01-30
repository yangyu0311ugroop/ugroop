import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { DEFAULT, URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import MenuItem from 'components/Popper/components/MenuItem';
import InterestedListModal from 'containers/Templates/Modals/InterestedList';
import CreateInterestedPersonModal from 'containers/Templates/Modals/InterestedPerson/Create';
import ViewInterestedPersonModal from 'containers/Templates/Modals/InterestedPerson/View';
import concat from 'lodash/concat';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Name } from 'smartComponents/Node/parts';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { INTERESTED_PEOPLE, INTERESTED_PERSON } from 'utils/modelConstants';
import { STATUS_CONSTANTS, VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { AvatarList } from 'viewComponents/People';
import { withRouter } from 'react-router-dom';
import P from 'viewComponents/Typography';

import InterestedPerson from './components/InterestedPerson';
import { CONFIG_1, CONFIG_2 } from './config';
import styles from './styles';

export class TemplateInterestedList extends React.PureComponent {
  getPeopleTabUri = () => {
    const { peopleTabIndex, templateId } = this.props;
    return `${URL_HELPERS.tours(templateId)}?tab=${peopleTabIndex}`;
  };

  handleOpenInterestedModal = () => {
    const { history } = this.props;
    this.props.resaga.setValue({
      peopleView: INTERESTED_PEOPLE,
    });
    return history.push(this.getPeopleTabUri());
  };

  handleCloseInterestedModal = () =>
    this.props.resaga.setValue({ interestedListViewOpen: false });

  handleCloseCreateInterestedPersonModal = () =>
    this.props.resaga.setValue({ interestedPersonCreateOpen: false });

  handleCloseViewInterestedPersonModal = () =>
    this.props.resaga.setValue({ interestedPersonViewOpen: false });

  handleFilterSelect = filter => () => {
    this.props.resaga.setValue({
      interestedListViewFilter: filter,
    });
  };

  renderInterestedListModal = () => {
    const {
      templateId,
      interestedListViewOpen,
      variant,
      children,
      interestedPersonIds,
    } = this.props;
    return (
      <InterestedListModal
        templateId={templateId}
        open={interestedListViewOpen}
        onClose={this.handleCloseInterestedModal}
        variant={variant}
        interestedPersonIds={interestedPersonIds}
      >
        {children}
      </InterestedListModal>
    );
  };

  renderCreateInterestedPersonModal = () => {
    const { templateId, interestedPersonCreateOpen } = this.props;
    return (
      <CreateInterestedPersonModal
        templateId={templateId}
        open={interestedPersonCreateOpen}
        onClose={this.handleCloseCreateInterestedPersonModal}
      />
    );
  };

  renderViewInterestedPersonModal = () => {
    const {
      templateId,
      interestedPersonViewOpen,
      interestedPersonViewId,
      interestedPersonViewMode,
      variant,
    } = this.props;
    return (
      <ViewInterestedPersonModal
        templateId={templateId}
        open={interestedPersonViewOpen}
        id={interestedPersonViewId}
        mode={interestedPersonViewMode}
        onClose={this.handleCloseViewInterestedPersonModal}
        variant={variant}
      />
    );
  };

  renderAvatar = (id, props) => (
    <Name id={id} variant={VARIANTS.AVATAR} AvatarProps={props} />
  );

  getPeopleBaseOnFilter = () => {
    const { people, complete, pending, interestedListViewFilter } = this.props;
    const all = concat(complete, pending);

    return LOGIC_HELPERS.switchCase(interestedListViewFilter, {
      [VARIANTS.FOLLOWING]: pending,
      [VARIANTS.NOT_FOLLOWING]: complete,
      [VARIANTS.ALL_FOLLOWERS]: all,
      [DEFAULT]: people,
    });
  };

  renderPlaceholder = () => (
    <P dense subtitle fontStyle="italic">
      No followers as of the moment
    </P>
  );

  renderList = () => {
    const {
      people,
      complete,
      pending,
      interestedListViewFilter,
      peopleTabIndex,
    } = this.props;
    const all = concat(complete, pending);

    const filterPeople = LOGIC_HELPERS.switchCase(interestedListViewFilter, {
      [VARIANTS.FOLLOWING]: pending,
      [VARIANTS.NOT_FOLLOWING]: complete,
      [VARIANTS.ALL_FOLLOWERS]: all,
      [DEFAULT]: people,
    });

    const shouldDisplaySeeMore =
      peopleTabIndex !== -1 || ability.can('execute', INTERESTED_PERSON);

    return (
      <GridContainer direction="column" spacing={0} wrap="nowrap">
        <GridItem>
          <AvatarList
            people={filterPeople}
            addTooltipText="Add Follower"
            onClick={this.handleOpenInterestedModal}
            renderAvatar={this.renderAvatar}
            maxAvatars={10}
            placeholder={this.renderPlaceholder()}
            seeMore={shouldDisplaySeeMore}
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderListValueOnly = () => {
    const { pending } = this.props;

    return pending.length;
  };

  renderPopperOptions = ({ closeMenu }) => {
    const { interestedListViewFilter } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            closeMenu={closeMenu}
            selected={interestedListViewFilter === VARIANTS.FOLLOWING}
            onClick={this.handleFilterSelect(VARIANTS.FOLLOWING)}
          >
            Following
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={interestedListViewFilter === VARIANTS.NOT_FOLLOWING}
            closeMenu={closeMenu}
            onClick={this.handleFilterSelect(VARIANTS.NOT_FOLLOWING)}
          >
            Not Following
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={interestedListViewFilter === VARIANTS.ALL_FOLLOWERS}
            closeMenu={closeMenu}
            onClick={this.handleFilterSelect(VARIANTS.ALL_FOLLOWERS)}
          >
            Show All
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderPopperButton = ({ openMenu }) => {
    const { classes, interestedListViewFilter } = this.props;
    const countIds = this.getPeopleBaseOnFilter().length;
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
        className={classes.popperButton}
        weight="bold"
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>
            {STATUS_CONSTANTS[interestedListViewFilter]}
            {countIds > 0 && (
              <span className={classes.badge}>
                {this.getPeopleBaseOnFilter().length}
              </span>
            )}
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderMine = () => {
    const { interestedPersonIds, myId } = this.props;
    return (
      <InterestedPerson
        interestedPersonIds={interestedPersonIds}
        userId={myId}
        mode="me"
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.VALUE_ONLY]: this.renderListValueOnly(),
      [VARIANTS.AVATARS_ONLY]: this.renderList(),
      [VARIANTS.CREATE]: this.renderCreateInterestedPersonModal(),
      [VARIANTS.MODALS]: (
        <>
          {this.renderCreateInterestedPersonModal()}
          {this.renderViewInterestedPersonModal()}
        </>
      ),
      [DEFAULT]: (
        <React.Fragment>{this.renderInterestedListModal()}</React.Fragment>
      ),
    });
  };
}

TemplateInterestedList.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent
  templateId: PropTypes.number,
  myId: PropTypes.number,
  variant: PropTypes.string,
  children: PropTypes.func,

  // resaga value
  interestedPersonIds: PropTypes.array,
  people: PropTypes.array,
  interestedListViewOpen: PropTypes.bool,
  interestedPersonCreateOpen: PropTypes.bool,
  interestedPersonViewOpen: PropTypes.bool,
  interestedPersonViewId: PropTypes.number,
  interestedPersonViewMode: PropTypes.string,
  complete: PropTypes.array,
  pending: PropTypes.array,
  interestedListViewFilter: PropTypes.string,
  peopleTabIndex: PropTypes.number,
};

TemplateInterestedList.defaultProps = {
  templateId: null,
  myId: null,

  interestedPersonIds: [],
  people: [],
  interestedListViewOpen: false,
  interestedPersonCreateOpen: false,
  interestedPersonViewOpen: false,
  interestedPersonViewId: null,
  interestedPersonViewMode: null,
  interestedListViewFilter: 'allFollowers',
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'HeaderInterestedList' }),
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
)(TemplateInterestedList);
