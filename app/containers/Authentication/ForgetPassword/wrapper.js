/**
 * Created by quando on 21/3/17.
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import AuthLayout from 'ugcomponents/Layout/AuthLayout';
import ForgetPasswordPage from './index';

export default function ForgetPasswordPageWrapper({ location }) {
  return (
    <AuthLayout>
      <ForgetPasswordPage location={location} />
    </AuthLayout>
  );
}

ForgetPasswordPageWrapper.propTypes = {
  // from react-router
  location: PropTypes.object, // to get query i.e. /registration?email=abc@xyz.com
};

ForgetPasswordPageWrapper.defaultProps = {
  location: {},
};
