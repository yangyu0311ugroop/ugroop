import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import PersonCUD from './hoc';

export const withPassportCUD = WrappedComponent => {
  class hoc extends PureComponent {
    renderWrappedComponent = passportCUD => (
      <WrappedComponent passportCUD={passportCUD} {...this.props} />
    );

    render = () => (
      <PersonCUD userId={this.props.userId} id={this.props.id}>
        {this.renderWrappedComponent}
      </PersonCUD>
    );
  }

  hoc.propTypes = {
    // hoc props

    // parent props
    id: PropTypes.number,
    userId: PropTypes.number,

    // resaga props
  };

  hoc.defaultProps = {
    id: 0,
    userId: 0,
  };

  return hoc;
};
