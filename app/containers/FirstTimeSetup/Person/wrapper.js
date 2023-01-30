/**
 * Created by quando on 21/3/17.
 * LoginPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import FirstTimeSetupLayout from 'ugcomponents/Layout/FirstTimeSetupLayout';
import PersonSetup from './index';
export default function PersonSetupWrapper({ location }) {
  return (
    <FirstTimeSetupLayout location={location}>
      <PersonSetup type="Individual" interval="month" />
    </FirstTimeSetupLayout>
  );
}

PersonSetupWrapper.propTypes = {
  location: PropTypes.object,
};

PersonSetupWrapper.defaultProps = {
  location: {},
};
