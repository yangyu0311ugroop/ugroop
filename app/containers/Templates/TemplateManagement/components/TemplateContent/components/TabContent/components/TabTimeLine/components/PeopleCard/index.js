import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import Headx from 'ugcomponents/Headx';
import {
  INTERESTED_PEOPLE,
  TOUR_CONTRIBUTOR,
  PARTICIPANT,
} from 'utils/modelConstants';
import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import { CONFIG, CONFIG_0 } from './config';
import styles from './styles';
import PeopleLink from './components/PeopleLink';

export class PeopleCard extends React.PureComponent {
  renderPeopleNav = () => {
    const { peopleTabIndex, classes } = this.props;
    return (
      <GridContainer alignItems="center">
        <GridItem xs>
          <Headx>People</Headx>
        </GridItem>
        <GridItem>
          <PeopleLink
            peopleTabIndex={peopleTabIndex}
            view={TOUR_CONTRIBUTOR}
            readOnlyLabel={<div />}
            customProps={classes.peopleNav}
            filterView={{ peopleTabOptionSelected: 'allContributors' }}
          >
            See all
          </PeopleLink>
        </GridItem>
      </GridContainer>
    );
  };

  renderContent = ({ peopleView, content, label, filterView = {} }) => {
    const { classes, peopleTabIndex } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem className={classes.counter}>{label}</GridItem>
        <GridItem>
          <PeopleLink
            peopleTabIndex={peopleTabIndex}
            peopleView={peopleView}
            filterView={filterView}
          >
            <Headx xs>{content}</Headx>
          </PeopleLink>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const {
      classes,
      confirmedParticipantIds,
      interestedIds,
      pendingParticipantIds,
    } = this.props;

    return (
      <GridContainer card paddingBottom0 direction="column">
        <GridItem>{this.renderPeopleNav()}</GridItem>
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem xs className={classes.textCenter}>
              {this.renderContent({
                peopleView: PARTICIPANT,
                content: 'Going',
                label: confirmedParticipantIds.length,
                filterView: {
                  participantViewFilter: PARTICIPANT_STATUSES.confirmed,
                  peopleTabOptionSelected: 'goingParticipants',
                },
              })}
            </GridItem>
            <GridItem xs className={classes.textCenter}>
              {this.renderContent({
                peopleView: PARTICIPANT,
                content: 'Maybe',
                label: pendingParticipantIds.length,
                filterView: {
                  participantViewFilter: 'pending',
                  peopleTabOptionSelected: 'maybeParticipants',
                },
              })}
            </GridItem>
            <GridItem xs className={classes.textCenter}>
              {this.renderContent({
                peopleView: INTERESTED_PEOPLE,
                content: 'Followers',
                label: interestedIds.length,
                filterView: {
                  interestedListViewModalFilter: 'allFollowers',
                  peopleTabOptionSelected: 'allFollowers',
                },
              })}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

PeopleCard.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent

  // resaga value
  peopleTabIndex: PropTypes.number,
  interestedIds: PropTypes.array,
  confirmedParticipantIds: PropTypes.array,
  pendingParticipantIds: PropTypes.array,
};

PeopleCard.defaultProps = {
  peopleTabIndex: -1,
  interestedIds: [],
  confirmedParticipantIds: [],
  pendingParticipantIds: [],
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'PeopleCard' }),
  resaga(CONFIG_0),
  resaga(CONFIG),
)(PeopleCard);
