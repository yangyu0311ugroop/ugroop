import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import CurrentTours from './CurrentTours';
import UpcomingTours from './UpcomingTours';
import CompletedTours from './CompletedTours';

const TourIndexPage = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={CurrentTours} />
    <Route path={`${match.url}/current`} component={CurrentTours} />
    <Route path={`${match.url}/upcoming`} component={UpcomingTours} />
    <Route path={`${match.url}/completed`} component={CompletedTours} />
  </Switch>
);

TourIndexPage.propTypes = {
  match: PropTypes.object,
};

export default TourIndexPage;
