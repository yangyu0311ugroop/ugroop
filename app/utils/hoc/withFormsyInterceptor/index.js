/**
 * Created by stephenkarpinskyj on 19/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';

const withFormsyInterceptor = WrappedComponent => {
  class FormsyInterceptor extends React.PureComponent {
    render = () => {
      const { value, onInterceptValue, ...rest } = this.props;
      return <WrappedComponent value={onInterceptValue(value)} {...rest} />;
    };
  }

  FormsyInterceptor.propTypes = {
    value: PropTypes.any,
    onInterceptValue: PropTypes.func,
  };

  FormsyInterceptor.defaultProps = {
    onInterceptValue: value => value || '',
  };

  return FormsyInterceptor;
};

export default withFormsyInterceptor;
