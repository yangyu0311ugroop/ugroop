import React, { forwardRef, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { CONFIG1 } from './config';
import EventData from './eventData';

export class EachEventData extends PureComponent {
  render() {
    const { myForwardedRef, collectData, ...rest } = this.props;
    return (
      <EventData
        ref={this.props.myForwardedRef}
        collectData={collectData}
        {...rest}
      />
    );
  }
}

EachEventData.propTypes = {
  myForwardedRef: PropTypes.any,
  collectData: PropTypes.func,
};

// eslint-disable-next-line react/no-multi-comp
const WrappedComponent = compose(resaga(CONFIG1))(EachEventData);

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <WrappedComponent {...props} myForwardedRef={ref} />
));
