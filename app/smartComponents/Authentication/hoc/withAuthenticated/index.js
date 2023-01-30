/**
 * Created by stephenkarpinskyj on 11/10/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export const withAuthenticated = WrappedComponent => {
  class Authenticated extends React.PureComponent {
    render = () => {
      const { resaga: r, ...rest } = this.props;
      return <WrappedComponent {...rest} />;
    };
  }

  Authenticated.propTypes = {
    // hoc
    resaga: PropTypes.object.isRequired,
  };

  Authenticated.defaultProps = {};

  return Authenticated;
};

export default WrappedComponent =>
  compose(resaga(CONFIG))(withAuthenticated(WrappedComponent));
