import { USER_ID_CONFIG } from 'apis/components/User/config';
import intersection from 'lodash/intersection';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export const withStars = WrappedComponent => {
  class Stars extends React.PureComponent {
    stars = () => {
      const { stars, scope, toggleId } = this.props;

      // organisation tours empty
      if (toggleId && !scope.length) return [];

      // should not filter if no toggleId
      if (!toggleId && !scope.length) return stars;

      // only show starred tours in scope
      return intersection(stars, scope);
    };

    render = () => {
      const { stars, scope, toggleId, ...props } = this.props;

      return <WrappedComponent stars={this.stars()} {...props} />;
    };
  }

  Stars.propTypes = {
    // parent props
    toggleId: PropTypes.number,

    // resaga props
    stars: PropTypes.array,
    scope: PropTypes.array,
  };

  Stars.defaultProps = {
    stars: [],
    scope: [],
  };

  return Stars;
};

export default WrappedComponent =>
  compose(
    resaga(USER_ID_CONFIG),
    resaga(CONFIG),
  )(withStars(WrappedComponent));
