/**
 * Created by quando on 21/3/17.
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import FirstTimeSetupLayout from 'ugcomponents/Layout/FirstTimeSetupLayout';
import { Switch, Route } from 'react-router-dom';
import { FirstStep, LastStep } from 'routeProtectionV2';
import FirstTimeSetupIndex from './index';
import OrganisationSetupWrapper from './Organisation/wrapper';
import PersonSetupWrapper from './Person/wrapper';

export const Index = ({ location }) => (
  <FirstTimeSetupLayout location={location}>
    <FirstTimeSetupIndex />
  </FirstTimeSetupLayout>
);

Index.propTypes = {
  location: PropTypes.object,
};

Index.defaultProps = {
  location: { pathName: '' },
};

const OrganisationSetup = FirstStep(OrganisationSetupWrapper);
const PersonSetup = LastStep(PersonSetupWrapper);

export default function FirstTimeSetupWrapper({ match }) {
  return (
    <Switch>
      <Route exact path={match.url} component={Index} />
      <Route path={`${match.url}/organisation`} component={OrganisationSetup} />
      <Route path={`${match.url}/person`} component={PersonSetup} />
    </Switch>
  );
}

FirstTimeSetupWrapper.propTypes = {
  match: PropTypes.object,
};

FirstTimeSetupWrapper.defaultProps = {
  match: {},
};
