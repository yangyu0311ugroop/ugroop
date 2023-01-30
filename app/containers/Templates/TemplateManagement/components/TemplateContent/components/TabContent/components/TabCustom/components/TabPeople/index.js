import {
  TOUR_CONTRIBUTOR_ROLE_TYPES,
  TOUR_CONTRIBUTOR_ROLE,
} from 'apis/components/Ability/roles';
import { DEFAULT, PEOPLE_TAB_OPTIONS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import WrapperParticipantList from 'smartComponents/Node/components/ParticipantList';
import TemplateInterestedList from 'containers/Templates/TemplateManagement/components/TemplateHeader/components/InterestedList';
import { VARIANTS } from 'variantsConstants';
import { ability } from 'apis/components/Ability/ability';
import {
  PARTICIPANT,
  TOUR_VIEWER,
  TOUR_COLLABORATOR,
} from 'utils/modelConstants';
import { withNodeRole } from 'smartComponents/Node/hoc/withNodeRole';
import Sticky from 'react-stickynode';
import { withRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FollowerList from './components/FollowerList';
import ParticipantList from './components/ParticipantList';
import ContributorList from './components/ContributorList';
import { CONFIG, CONFIG_0 } from './config';
import styles from './styles';
import { parseQueryParam } from '../../../../../../../../../../../utils/helpers/url';
import { withSMDown } from '../../../../../../../../../../../components/material-ui/hocs/withMediaQuery';
import ContributorPublicList from './components/ContributorList/public';

export class TabPeople extends PureComponent {
  componentDidMount() {
    const { peopleTabOptionSelected, location, participantIds } = this.props;
    const { search } = location;
    const parsedQuery = parseQueryParam(search);
    const canView = this.canViewAll();

    if (parsedQuery.participant) {
      const participantId = parseInt(parsedQuery.participant, 10);
      if (participantId && participantIds.includes(participantId)) {
        const optionSelected = LOGIC_HELPERS.ifElse(
          canView,
          PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS,
          PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS,
        );
        return this.props.resaga.setValue({
          peopleTabOptionSelected: optionSelected,
          invitationMode: null,
          participantViewOpen: true,
          participantViewId: participantId,
        });
      }
    }
    if (!peopleTabOptionSelected) {
      const filterRoleBy = LOGIC_HELPERS.ifElse(
        canView,
        TOUR_CONTRIBUTOR_ROLE_TYPES,
        [TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER],
      );

      const optionSelected = LOGIC_HELPERS.ifElse(
        canView,
        PEOPLE_TAB_OPTIONS.ALL_CONTRIBUTORS,
        PEOPLE_TAB_OPTIONS.ONLY_ORGANISERS,
      );

      return this.props.resaga.setValue({
        filterRoleBy,
        peopleTabOptionSelected: optionSelected,
        invitationMode: null,
      });
    }
    return null;
  }

  canViewAll = () => {
    const { roles } = this.props;
    return (
      ability.can('execute', PARTICIPANT) ||
      roles.includes(TOUR_VIEWER) ||
      roles.includes(TOUR_COLLABORATOR)
    );
  };

  renderTemplatePeople = () => {
    const {
      classes,
      templateId,
      peopleTabOptionSelected,
      id,
      smDown,
    } = this.props;

    return (
      <GridContainer className={classes.root}>
        <WrapperParticipantList variant={VARIANTS.VIEW} />
        <WrapperParticipantList variant={VARIANTS.CREATE} />
        <TemplateInterestedList
          variant={VARIANTS.MODALS}
          templateId={templateId}
        />
        <GridItem xs={12} md={3}>
          <Sticky enabled={!smDown} top={98} innerZ={1000}>
            <Sidebar id={id} />
          </Sticky>
        </GridItem>
        <GridItem xs={12} md={9}>
          {LOGIC_HELPERS.switchCase(peopleTabOptionSelected, {
            [PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS]: (
              <FollowerList templateId={templateId} />
            ),
            [PEOPLE_TAB_OPTIONS.ONLY_FOLLOWING]: (
              <FollowerList templateId={templateId} />
            ),
            [PEOPLE_TAB_OPTIONS.ONLY_NOT_FOLLOWING]: (
              <FollowerList templateId={templateId} />
            ),

            [PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS]: (
              <ParticipantList templateId={templateId} />
            ),
            [PEOPLE_TAB_OPTIONS.GOING_PARTICIPANTS]: (
              <ParticipantList templateId={templateId} />
            ),
            [PEOPLE_TAB_OPTIONS.MAYBE_PARTICIPANTS]: (
              <ParticipantList templateId={templateId} />
            ),
            [PEOPLE_TAB_OPTIONS.NOT_GOING_PARTICIPANTS]: (
              <ParticipantList templateId={templateId} />
            ),

            [PEOPLE_TAB_OPTIONS.ONLY_CONTRIBUTORS]: (
              <ContributorList templateId={templateId} />
            ),
            [PEOPLE_TAB_OPTIONS.ONLY_VIEWERS]: (
              <ContributorList templateId={templateId} />
            ),
            [PEOPLE_TAB_OPTIONS.ONLY_ORGANISERS]: (
              <ContributorList templateId={templateId} />
            ),
            [DEFAULT]: <ContributorList templateId={templateId} />,
          })}
        </GridItem>
      </GridContainer>
    );
  };

  renderPeoplePublic = () => {
    const { templateId } = this.props;
    return <ContributorPublicList templateId={templateId} />;
  };

  render = () => {
    const { isPublic } = this.props;

    if (isPublic) return this.renderPeoplePublic();

    return this.renderTemplatePeople();
  };
}

TabPeople.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  roles: PropTypes.array,
  location: PropTypes.object,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number,
  isPublic: PropTypes.bool,

  // resaga props
  templateId: PropTypes.number,
  peopleTabOptionSelected: PropTypes.string,
  participantIds: PropTypes.array,
};

TabPeople.defaultProps = {
  templateId: 0,
  peopleTabOptionSelected: null,
  roles: [],
  location: {},
  participantIds: [],
};

export default compose(
  withStyles(styles, { name: 'TabPeople' }),
  withRouter,
  withSMDown,
  resaga(CONFIG_0),
  withNodeRole,
  resaga(CONFIG),
)(TabPeople);
