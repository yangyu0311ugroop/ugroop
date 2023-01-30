/**
 * Created by stephenkarpinskyj on 13/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Sets key that only updates while dialog is open.
 */
const withKey = ({ keyProp = 'time' } = {}) => WrappedComponent => {
  class Key extends React.PureComponent {
    state = {
      key: null,
    };

    componentDidUpdate = prevProps => {
      const { open, [keyProp]: key } = this.props;
      if (open && prevProps[keyProp] !== key) this.setState({ key });
    };

    render = () => {
      const { [keyProp]: key, ...rest } = this.props;
      const { key: keyState } = this.state;
      return <WrappedComponent key={keyState} {...rest} />;
    };
  }

  Key.propTypes = {
    open: PropTypes.bool,
    [keyProp]: PropTypes.number,
  };

  Key.defaultProps = {
    open: false,
    [keyProp]: null,
  };

  return Key;
};

export default withKey;
