import React, { forwardRef, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { CONFIG_2, CONFIG_3 } from './config';
import CollectEventData from './collectEventData';

export class CollectEventTime extends PureComponent {
  render() {
    const { myForwardedRef, collectData, ...rest } = this.props;
    return (
      <CollectEventData
        ref={this.props.myForwardedRef}
        collectData={collectData}
        {...rest}
      />
    );
  }
}

CollectEventTime.propTypes = {
  myForwardedRef: PropTypes.object,
  collectData: PropTypes.func,
};

// eslint-disable-next-line react/no-multi-comp
const WrappedComponent = compose(
  resaga(CONFIG_2),
  resaga(CONFIG_3),
)(CollectEventTime);

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <WrappedComponent {...props} myForwardedRef={ref} />
));
