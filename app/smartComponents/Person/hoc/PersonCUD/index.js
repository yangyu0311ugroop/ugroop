import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import PhoneCUD from './cud';

export const withPhoneCUD = WrappedComponent => {
  class hoc extends PureComponent {
    renderWrappedComponent = () => cud => (
      <WrappedComponent phoneCUD={cud} {...this.props} />
    );

    render = () => {
      const { id: phoneId, userId } = this.props;

      return (
        <PhoneCUD phoneId={phoneId} userId={userId}>
          {this.renderWrappedComponent()}
        </PhoneCUD>
      );
    };
  }
  hoc.propTypes = {
    // hoc props

    // parent props
    id: PropTypes.number,
    userId: PropTypes.number,

    // resaga props
  };

  hoc.defaultProps = {};
  return hoc;
};
