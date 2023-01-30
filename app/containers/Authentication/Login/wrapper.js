/**
 * Created by quando on 21/3/17.
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import AuthLayout from 'ugcomponents/Layout/AuthLayout';
import LoginPage from './index';

export default function LoginPageWrapper({ location }) {
  return (
    <AuthLayout>
      <LoginPage location={location} />
    </AuthLayout>
  );
}

LoginPageWrapper.propTypes = {
  // from react-router
  location: PropTypes.object, // to get query i.e. /login?email=abc@xyz.com
};

LoginPageWrapper.defaultProps = {
  location: {},
};
