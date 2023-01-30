import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Organisation from './components/Organisation';
import Person from './components/Person/container';

export const Profile = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/person/:id?`} component={Person} />
    <Route path={`${match.url}/organisation`} component={Organisation} />
  </Switch>
);

Profile.propTypes = {
  match: PropTypes.object,
};

export default Profile;
