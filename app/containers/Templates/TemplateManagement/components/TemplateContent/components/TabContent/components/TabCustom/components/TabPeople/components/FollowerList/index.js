import { ability } from 'apis/components/Ability/ability';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withNodeRole } from 'smartComponents/Node/hoc/withNodeRole';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  INTERESTED_LINKEE,
  INTERESTED_PERSON,
  PARTICIPANT_LINKEE,
  TOUR_INTERESTED,
  TOUR_ORGANIZER,
  TOUR_OWNER,
  TOUR_PARTICIPANT,
} from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import InterestedList from 'containers/Templates/Modals/InterestedList';
import P from 'viewComponents/Typography';
import { DEFAULT, PEOPLE_TAB_OPTIONS } from 'appConstants';

import { CONFIG, CONFIG_0, CONFIG_2, CONFIG_3, SET_VALUE } from './config';
import styles from './styles';

export class FollowerList extends PureComponent {
  getFollowerIds = () => {
    const {
      interestedPersonIds,
      participantFollowerNodeIds,
      userFollowerNodeId,
      roles,
    } = this.props;

    if (roles.includes(TOUR_ORGANIZER) || roles.includes(TOUR_OWNER))
      return interestedPersonIds;

    if (roles.includes(TOUR_PARTICIPANT)) return participantFollowerNodeIds;

    if (roles.includes(TOUR_INTERESTED)) return [userFollowerNodeId];

    return [];
  };

  handleAddParticipant = () => {
    this.props.resaga.setValue({
      interestedPersonCreateOpen: true,
    });
  };

  getTabSelected = () => {
    const { peopleTabOptionSelected } = this.props;

    return LOGIC_HELPERS.switchCase(peopleTabOptionSelected, {
      [PEOPLE_TAB_OPTIONS.ONLY_FOLLOWING]: 'Following',
      [PEOPLE_TAB_OPTIONS.ONLY_NOT_FOLLOWING]: 'Not Following',
      [DEFAULT]: 'All Followers',
    });
  };

  renderProp = () => {
    const { children } = this.props;

    return children({ followers: this.getFollowerIds() });
  };

  render = () => {
    const { templateId, variant, classes } = this.props;
    const addFollowerBtn = LOGIC_HELPERS.ifElse(
      ability.can('execute', INTERESTED_PERSON),
      <Button
        dense
        color="primary"
        size="extraSmall"
        onClick={this.handleAddParticipant}
      >
        Add Follower
      </Button>,
      null,
    );

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: (
        <GridContainer direction="column">
          <GridItem>
            <GridContainer card justify="space-between" alignItems="center">
              <GridItem>
                <GridContainer className={classes.noWrap} noWrap>
                  <GridItem>
                    <P dense color="gray">
                      Followers:
                    </P>
                  </GridItem>
                  <GridItem>
                    <P dense weight="bold" color="black">
                      {this.getTabSelected()}
                    </P>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer className={classes.noWrap} noWrap>
                  <GridItem>
                    <InterestedList
                      templateId={templateId}
                      variant={VARIANTS.SORTERS_ONLY}
                    />
                  </GridItem>
                  <GridItem>{addFollowerBtn}</GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs>
            <GridContainer card>
              <InterestedList
                interestedPersonIds={this.getFollowerIds()}
                templateId={templateId}
                variant={VARIANTS.CONTENT_ONLY}
              />
            </GridContainer>
          </GridItem>
        </GridContainer>
      ),
    });
  };
}

FollowerList.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,
  variant: PropTypes.string,
  children: PropTypes.func,

  // resaga props
  peopleTabOptionSelected: PropTypes.string,
  roles: PropTypes.array,
  interestedPersonIds: PropTypes.array,
  participantFollowerNodeIds: PropTypes.array,
  userFollowerNodeId: PropTypes.number,
};

FollowerList.defaultProps = {
  templateId: 0,
  roles: [],
};

export default compose(
  resaga(CONFIG_0),
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'participantIds',
    roles: [PARTICIPANT_LINKEE],
    outputProp: 'userParticipantId',
  }),
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'interestedPersonIds',
    roles: [INTERESTED_LINKEE],
    outputProp: 'userFollowerId',
  }),
  withNodeRole,
  withStyles(styles, { name: 'FollowerList' }),
  resaga(CONFIG),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
  resaga(SET_VALUE),
)(FollowerList);
