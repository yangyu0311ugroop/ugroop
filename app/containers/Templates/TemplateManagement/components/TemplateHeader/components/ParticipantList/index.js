import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { DEFAULT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import CreateParticipantModal from 'containers/Templates/Modals/Participant/Create';
import ViewParticipantModal from 'containers/Templates/Modals/Participant/View';
import ParticipantListModal from 'containers/Templates/Modals/ParticipantList';
import concat from 'lodash/concat';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import Node from 'smartComponents/Node';
import {
  ConditionsBorderStyle,
  ParticipantAccessLevel,
  PeopleTabRedirect,
} from 'smartComponents/Node/logics';
import { Name } from 'smartComponents/Node/parts';
import Icon from 'ugcomponents/Icon';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PARTICIPANT } from 'utils/modelConstants';
import { STATUS_CONSTANTS, VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { AvatarList } from 'viewComponents/People';
import P from 'viewComponents/Typography';

import Participant from './components/Participant';
import { CONFIG_1, CONFIG_2 } from './config';
import styles from './styles';

export class TemplateParticipantList extends React.PureComponent {
  componentDidMount() {
    const { pendingIds, declinedIds, people } = this.props;
    const all = concat(pendingIds, declinedIds, people);
    this.props.resaga.setValue({
      participantsCount: all.length,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { people, pendingIds, declinedIds } = this.props;
    const {
      people: nextPeople,
      pendingIds: nextPendingIds,
      declinedIds: nextDeclinedIds,
    } = nextProps;

    if (
      people.length !== nextPeople.length ||
      pendingIds.length !== nextPendingIds.length ||
      declinedIds.length !== nextDeclinedIds.length
    ) {
      const all = concat(nextPeople, nextPendingIds, nextDeclinedIds);
      this.props.resaga.setValue({
        participantsCount: all.length,
      });
    }
  }

  getCreateParticipantParentNodeId = () => {
    const { templateId, participantCreateParentNodeId } = this.props;
    return participantCreateParentNodeId || templateId;
  };

  canCreateParticipant = () => ability.can('execute', PARTICIPANT);

  handleCloseParticipantsModal = () =>
    this.props.resaga.setValue({ participantListViewOpen: false });

  handleCloseCreateParticipantModal = () =>
    this.props.resaga.setValue({ participantCreateOpen: false });

  handleCloseViewParticipantModal = () =>
    this.props.resaga.setValue({ participantViewOpen: false });

  handleViewFormsClick = ev => {
    ev.preventDefault();
    this.props.resaga.setValue({
      participantListViewModeList: 'forms',
      participantListViewOpen: true,
    });
  };

  handleFilterSelect = filter => () => {
    this.props.resaga.setValue({
      participantViewModeFilter: filter,
    });
  };

  getAllParticipants = () => {
    const { pendingIds, declinedIds, people } = this.props;
    return concat(people, pendingIds, declinedIds);
  };

  getPeopleBasedOnFilter = () => {
    const {
      pendingIds,
      declinedIds,
      people,
      participantViewModeFilter,
    } = this.props;
    const all = this.getAllParticipants();
    return LOGIC_HELPERS.switchCase(participantViewModeFilter, {
      [VARIANTS.CONFIRMED]: people,
      [VARIANTS.PENDING]: pendingIds,
      [VARIANTS.DECLINED]: declinedIds,
      [VARIANTS.ALL_PARTICIPANTS]: all,
      [DEFAULT]: people,
    });
  };

  renderParticipantListModal = () => {
    const {
      templateId,
      parentId,
      defaultAccessLevel,
      interestedPersonNodeId,
      participantNodeId,
      includeInviteMode,
      includeFormsMode,
      includeStatusFilters,
      participantListViewOpen,
      variant,
      useList,
      myId,
      isTemplateId,
      children,
      hideParticipants,
      isInterestedPerson,
      renderContent,
    } = this.props;
    return (
      <ParticipantListModal
        isInterestedPerson={isInterestedPerson}
        hideParticipants={hideParticipants}
        templateId={templateId}
        parentId={parentId}
        defaultAccessLevel={defaultAccessLevel}
        interestedPersonNodeId={interestedPersonNodeId}
        participantNodeId={participantNodeId}
        includeInviteMode={includeInviteMode}
        includeFormsMode={includeFormsMode}
        includeStatusFilters={includeStatusFilters}
        open={participantListViewOpen}
        onClose={this.handleCloseParticipantsModal}
        variant={variant}
        useList={useList}
        myId={myId}
        isTemplateId={isTemplateId}
        renderContent={renderContent}
      >
        {children}
      </ParticipantListModal>
    );
  };

  renderCreateParticipantModal = () => {
    const {
      templateId,
      participantCreateOpen,
      participantCreateMode,
    } = this.props;
    return (
      <CreateParticipantModal
        templateId={templateId}
        parentNodeId={this.getCreateParticipantParentNodeId()}
        open={participantCreateOpen}
        mode={participantCreateMode}
        onClose={this.handleCloseCreateParticipantModal}
      />
    );
  };

  renderViewParticipantModal = () => {
    const {
      templateId,
      defaultAccessLevel,
      interestedPersonNodeId,
      participantNodeId,
      participantViewOpen,
      participantViewId,
      participantViewMode,
    } = this.props;
    return (
      <ViewParticipantModal
        templateId={templateId}
        defaultAccessLevel={defaultAccessLevel}
        interestedPersonNodeId={interestedPersonNodeId}
        participantNodeId={participantNodeId}
        open={participantViewOpen}
        id={participantViewId}
        mode={participantViewMode}
        onClose={this.handleCloseViewParticipantModal}
      />
    );
  };

  renderTooltipText = (id, accessLevel) => () => (
    <Node id={id} variant={VARIANTS.TEXT_ONLY} accessLevel={accessLevel} />
  );

  renderAvatarWithClassname = (id, props, accessLevel) => className => (
    <Name
      id={id}
      className={className}
      variant={VARIANTS.AVATAR}
      AvatarProps={props}
      tooltipText={this.renderTooltipText(id, accessLevel)}
    />
  );

  renderAvatarWithAccessLevel = (id, props) => accessLevel => {
    if (accessLevel === PARTICIPANT_ACCESS_LEVELS.full) {
      return (
        <ConditionsBorderStyle id={id}>
          {this.renderAvatarWithClassname(id, props, accessLevel)}
        </ConditionsBorderStyle>
      );
    }
    return this.renderAvatarWithClassname(id, props, accessLevel)();
  };

  renderAvatar = (id, props) => {
    const {
      defaultAccessLevel,
      interestedPersonNodeId,
      participantNodeId,
    } = this.props;
    return (
      <ParticipantAccessLevel
        id={id}
        defaultAccessLevel={defaultAccessLevel}
        interestedPersonNodeId={interestedPersonNodeId}
        participantNodeId={participantNodeId}
      >
        {this.renderAvatarWithAccessLevel(id, props)}
      </ParticipantAccessLevel>
    );
  };

  renderListLogics = () => {
    const { participantIds } = this.props;
    return participantIds.map(id => (
      <Node key={id} id={id} variant={VARIANTS.LOGIC} />
    ));
  };

  renderAvatarListPlaceholder = () => (
    <P dense subtitle fontStyle="italic">
      No participants as of the moment
    </P>
  );

  renderAvatars = () => props => {
    const filterPeople = this.getPeopleBasedOnFilter();
    const { peopleTabIndex, useList } = this.props;

    const shouldDisplaySeeMore = peopleTabIndex !== -1 || useList === true;

    return (
      <AvatarList
        people={filterPeople}
        seeMore={shouldDisplaySeeMore}
        placeholder={this.renderAvatarListPlaceholder()}
        onClick={props.handlePeopleRedirect({ peopleView: PARTICIPANT })}
        renderAvatar={this.renderAvatar}
        maxAvatars={10}
        customBorder
      />
    );
  };

  renderAvatarList = () => (
    <PeopleTabRedirect>{this.renderAvatars()}</PeopleTabRedirect>
  );

  renderLabel = () =>
    this.canCreateParticipant() ? (
      this.renderFilterPopper()
    ) : (
      <GridItem className={this.props.classes.popperButton}>
        {STATUS_CONSTANTS[this.props.participantViewModeFilter]}
      </GridItem>
    );

  renderList = () => (
    <GridContainer direction="column" spacing={0} wrap="nowrap">
      <GridItem>{this.renderAvatarList()}</GridItem>
    </GridContainer>
  );

  renderFilterPopper = () => {
    const countIds = this.getPeopleBasedOnFilter();
    return (
      <Popper
        stopPropagation
        placement="bottom"
        renderButton={this.renderPopperButton}
        noPadding
        menuHeader="Filter by Status"
        key={countIds}
      >
        {this.renderPopperOptions}
      </Popper>
    );
  };

  renderPopperOptions = ({ closeMenu }) => {
    const { participantViewModeFilter } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={participantViewModeFilter === VARIANTS.CONFIRMED}
            closeMenu={closeMenu}
            onClick={this.handleFilterSelect(VARIANTS.CONFIRMED)}
          >
            Going
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={participantViewModeFilter === VARIANTS.PENDING}
            closeMenu={closeMenu}
            onClick={this.handleFilterSelect(VARIANTS.PENDING)}
          >
            Maybe
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={participantViewModeFilter === VARIANTS.DECLINED}
            closeMenu={closeMenu}
            onClick={this.handleFilterSelect(VARIANTS.DECLINED)}
          >
            Not Going
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={participantViewModeFilter === VARIANTS.ALL_PARTICIPANTS}
            closeMenu={closeMenu}
            onClick={this.handleFilterSelect(VARIANTS.ALL_PARTICIPANTS)}
          >
            Show All
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderPopperButton = ({ openMenu }) => {
    const { classes, participantViewModeFilter } = this.props;
    const countIds = this.getPeopleBasedOnFilter().length;

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
            {STATUS_CONSTANTS[participantViewModeFilter]}
            {countIds > 0 && (
              <span className={classes.badge}>
                {this.getPeopleBasedOnFilter().length}
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
    const { participantIds, myId } = this.props;
    return (
      <Participant participantIds={participantIds} userId={myId} mode="me" />
    );
  };

  renderParticipants = () => {
    const { useList } = this.props;
    return useList ? this.renderList() : this.renderMine();
  };

  renderParticipantsValue = () => {
    const { people } = this.props;

    return people.length;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.VALUE_ONLY]: this.renderParticipantsValue(),
      [VARIANTS.AVATARS_ONLY]: this.renderParticipants(),
      [VARIANTS.CREATE]: this.renderCreateParticipantModal(),
      [VARIANTS.SORTERS_ONLY]: (
        <React.Fragment>{this.renderParticipantListModal()}</React.Fragment>
      ),
      [VARIANTS.VIEW]: this.renderViewParticipantModal(),
      [VARIANTS.LOGIC]: null,
      [DEFAULT]: (
        <React.Fragment>
          {this.renderParticipantListModal()}
          {this.renderListLogics()}
        </React.Fragment>
      ),
    });
  };
}

TemplateParticipantList.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent
  templateId: PropTypes.number,
  parentId: PropTypes.number,
  interestedPersonNodeId: PropTypes.number,
  participantNodeId: PropTypes.number,
  includeInviteMode: PropTypes.bool,
  includeFormsMode: PropTypes.bool,
  includeStatusFilters: PropTypes.bool,
  useList: PropTypes.bool,
  defaultAccessLevel: PropTypes.string,
  variant: PropTypes.string,
  isTemplateId: PropTypes.bool,
  children: PropTypes.func,
  hideParticipants: PropTypes.bool,
  isInterestedPerson: PropTypes.bool,
  renderContent: PropTypes.func,

  // resaga value
  participantIds: PropTypes.array,
  people: PropTypes.array,
  myId: PropTypes.number,
  participantListViewOpen: PropTypes.bool,
  participantCreateOpen: PropTypes.bool,
  participantCreateParentNodeId: PropTypes.number,
  participantCreateMode: PropTypes.string,
  participantViewOpen: PropTypes.bool,
  participantViewId: PropTypes.number,
  participantViewMode: PropTypes.string,
  pendingIds: PropTypes.array,
  declinedIds: PropTypes.array,
  participantViewModeFilter: PropTypes.string,
  peopleTabIndex: PropTypes.number,
};

TemplateParticipantList.defaultProps = {
  participantViewModeFilter: 'confirmed',
  templateId: null,
  parentId: null,
  interestedPersonNodeId: null,
  participantNodeId: null,
  includeFormsMode: true,
  useList: true,
  isInterestedPerson: false,

  participantIds: [],
  people: [],
  myId: null,
  participantListViewOpen: false,
  participantCreateOpen: false,
  participantCreateParentNodeId: null,
  participantCreateMode: null,
  participantViewOpen: false,
  participantViewId: null,
  participantViewMode: null,
  peopleTabIndex: -1,
  isTemplateId: true,
  hideParticipants: false,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'HeaderParticipantList' }),
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
)(TemplateParticipantList);
