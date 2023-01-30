/**
 * Created by quando on 21/3/17.
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import AuthLayout from 'ugcomponents/Layout/AuthLayout';
import RegisterPage from './index';

export default function RegisterPageWrapper({ location }) {
  return (
    <AuthLayout>
      <RegisterPage location={location} />
    </AuthLayout>
  );
}

RegisterPageWrapper.propTypes = {
  // from react-router
  location: PropTypes.object, // to get query i.e. /registration?email=abc@xyz.com
};

RegisterPageWrapper.defaultProps = {
  location: {},
};
