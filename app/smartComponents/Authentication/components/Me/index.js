import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { USER_API_HELPERS } from 'apis/components/User/helpers';
import { withAuthenticated } from 'smartComponents/Authentication/hoc';
import { get } from 'lodash';

/**
 * Simply calls api/me on mount if already authenticated.
 */
export class Me extends React.PureComponent {
  componentDidMount = () => {
    const { authenticated } = this.props;
    if (authenticated) {
      USER_API_HELPERS.fetchMe({ onSuccess: this.onSuccess }, this.props);
    }
  };

  onSuccess = data => {
    const userId = get(data, 'user.id');
    USER_API_HELPERS.fetchUserPreference({}, this.props, userId);
    USER_API_HELPERS.fetchPersonalPreference({}, this.props, userId);
  };

  render = () => null;
}

Me.propTypes = {
  // hoc
  authenticated: PropTypes.bool.isRequired,
};

export default compose(
  withAuthenticated,
  resaga(),
)(Me);
