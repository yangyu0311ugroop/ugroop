/**
 * Created by stephenkarpinskyj on 11/10/18.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import { USERLOGOUT } from 'containers/App/constants';
import { USER_API_HELPERS } from 'apis/components/User/helpers';
import withAuthenticated from 'smartComponents/Authentication/hoc/withAuthenticated';
import { CONFIG } from './config';

export const withLogout = WrappedComponent => {
  class Logout extends React.PureComponent {
    handleLogout = () => {
      const { logout, authenticated, id, devicetoken } = this.props;
      if (authenticated) {
        USER_API_HELPERS.signOut({ onSuccess: logout }, this.props);
        USER_API_HELPERS.unregisterDevice(id, devicetoken, this.props);
      }
    };

    render = () => {
      const { logout, authenticated, resaga: r, ...rest } = this.props;
      return <WrappedComponent logout={this.handleLogout} {...rest} />;
    };
  }

  Logout.propTypes = {
    // hoc
    id: PropTypes.number,
    devicetoken: PropTypes.string,
    logout: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    resaga: PropTypes.object.isRequired,
  };

  return Logout;
};

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: USERLOGOUT }),
});

export default compose(
  withAuthenticated,
  resaga(CONFIG),
  connect(
    null,
    mapDispatchToProps,
  ),
  withLogout,
);
