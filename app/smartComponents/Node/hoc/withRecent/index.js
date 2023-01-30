import { USER_ID_CONFIG } from 'apis/components/User/config';
import difference from 'lodash/difference';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export const withRecent = WrappedComponent => {
  class Recent extends React.PureComponent {
    recent = () => {
      const { recent, stars } = this.props;

      if (!stars.length) return recent;

      // only show recent tours that not starred
      return difference(recent, stars);
    };

    render = () => {
      const { recent, ...props } = this.props;

      return <WrappedComponent recent={this.recent()} {...props} />;
    };
  }

  Recent.propTypes = {
    // parent props

    // resaga props
    recent: PropTypes.array,
    stars: PropTypes.array,
  };

  Recent.defaultProps = {
    recent: [],
    stars: [],
  };

  return Recent;
};

export default WrappedComponent =>
  compose(
    resaga(USER_ID_CONFIG),
    resaga(CONFIG),
  )(withRecent(WrappedComponent));
