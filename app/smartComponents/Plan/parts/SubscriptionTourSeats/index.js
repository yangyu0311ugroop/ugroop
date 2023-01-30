import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

function SubscriptionTourSeats(props) {
  const {
    interval,
    myForwardedRef,
    type,
    previewUpcomingInvoice,
    ...rest
  } = props;

  return (
    <>
      <Content
        ref={myForwardedRef}
        interval={interval}
        type={type}
        previewUpcomingInvoice={previewUpcomingInvoice}
        {...rest}
      />
    </>
  );
}

SubscriptionTourSeats.propTypes = {
  interval: PropTypes.string,
  type: PropTypes.string,
  updateSelectIndex: PropTypes.func,
  previewUpcomingInvoice: PropTypes.func,
  myForwardedRef: PropTypes.object,
};

SubscriptionTourSeats.defaultProps = {};

const ComposeSubscriptionPlans = SubscriptionTourSeats;

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <ComposeSubscriptionPlans {...props} myForwardedRef={ref} />
));
