/**
 * Created by quando on 21/3/17.
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import FirstTimeSetupLayout from 'ugcomponents/Layout/FirstTimeSetupLayout';
import OrganisationSetup from './index';
export default function OrganisationSetupWrapper({ location }) {
  return (
    <FirstTimeSetupLayout location={location}>
      <OrganisationSetup type="Enterprise" />
    </FirstTimeSetupLayout>
  );
}

OrganisationSetupWrapper.propTypes = {
  location: PropTypes.object,
};

OrganisationSetupWrapper.defaultProps = {
  location: {},
};
