import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AllAssets from './AllAssets';
import MyAssets from './MyAssets';
import OrganisationAssets from './OrganisationAssets';
import SharedAssets from './SharedAssets';

const AssetsIndexPage = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={MyAssets} />
    <Route path={`${match.url}/my`} component={MyAssets} />
    <Route path={`${match.url}/shared`} component={SharedAssets} />
    <Route path={`${match.url}/organisation`} component={OrganisationAssets} />
    <Route path={`${match.url}/all`} component={AllAssets} />
  </Switch>
);

AssetsIndexPage.propTypes = {
  match: PropTypes.object,
};

export default AssetsIndexPage;
