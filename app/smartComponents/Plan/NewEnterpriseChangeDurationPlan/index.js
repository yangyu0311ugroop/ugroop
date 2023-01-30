import React, { forwardRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { COUPON_MODE } from 'appConstants';
import { Elements } from '@stripe/react-stripe-js';
import { makeStyles } from 'components/material-ui';
import { H3, H5 } from 'viewComponents/Typography';
import GridItem from 'components/GridItem';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import { isEmptyString, parseStringJson } from 'utils/stringAdditions';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { getDisplayText } from '../components/Utility/SubscriptionUtility';
import DurationPreviewDue from '../components/DurationPreviewDue';
import SubscriptionChangeDurationPlans from '../parts/SubscriptionChangeDurationPlansHook';
import SubscriptionCard from '../parts/SubscriptionCard';
import ApplyCoupon from '../parts/ApplyCoupon';
import RenderCustomerInfo from '../components/RenderCustomerInfo';
import { StripeContext } from '../../../lib/stripe';
import { useDetectSubscriptionProcess } from '../hooks/detectSubscriptionProcessHook';
import RenderSubscriptionSubmitButton from '../components/RenderSubscriptionSubmitButton';
import { CUSTOMER_RESELECTOR } from '../../../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../../../datastore/selectUtility';
import { INVOICE_RESELECTOR } from '../../../datastore/invoiceImmerStore/selectors';

const styles = {
  grow: {
    flex: 1,
  },
  info: {
    paddingTop: 32,
    paddingRight: 16,
  },
  total: {
    textAlign: 'right',
  },
  summary: {
    paddingTop: 32,
    paddingLeft: 16,
  },
  seats: {
    paddingTop: 0,
    maxWidth: 1140,
    margin: '0 auto',
  },
  seatPadding: {
    width: '100%',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    maxWidth: 780,
  },
  padding: {
    width: '100%',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  paddingTop: {
    paddingTop: 16,
  },
  paddingBottom: {
    paddingBottom: 16,
  },
  submit: {
    marginTop: 8,
  },
  cancel: {
    margin: 0,
  },
  submitText: {
    color: 'white',
  },
};

const useStyles = makeStyles(styles);
function EnterpriseChangeDurationPlan(props) {
  const classes = useStyles();
  const {
    userId,
    orgId,
    loading,
    onSubmit,
    hideInnerSubmitButton,
    myForwardedRef,
    type,
    applyCoupon,
    isChangeDuration,
    currentPlanInterval,
  } = props;

  const customerId = useSelector(store =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(store, {
      orgId,
      userId,
    }),
  );
  const currentSubscriptionId = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionId)(store, {
      customerId,
    }),
  );

  const currentPaymentSource = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(state, {
      customerId,
      attribute: 'default_source',
    }),
  );

  const existedCoupon = useSelector(store =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(store, {
      customerId,
      attribute: 'discount.coupon.id',
    }),
  );

  const existedCouponEnd = useSelector(store =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(store, {
      customerId,
      attribute: 'discount.end',
    }),
  );

  const existedCouponMode = useSelector(store =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(store, {
      customerId,
      attribute: 'discount.coupon.duration',
    }),
  );

  const currentSubscriptionPlans = useSelector(store =>
    CUSTOMER_RESELECTOR.makeSelectSubscriptionPlans(store, {
      subscriptionId: currentSubscriptionId,
      attribute: 'items.data',
    }),
  );

  const planJson = parseStringJson(currentSubscriptionPlans);
  let ids = [];
  let equalNames = [];
  let subscriptionPlanQuantityList = [];
  if (planJson) {
    ids = planJson.map(o => o.equalPlanId);
    subscriptionPlanQuantityList = planJson.map(o => o.quantity);
    equalNames = planJson.map(o => o.name);
  }
  const stripe = useContext(StripeContext);
  const [state, setState] = useImmer({
    intervalState: 'month',
  });
  useDetectSubscriptionProcess(props);
  useEffect(() => {
    if (isChangeDuration) {
      let intervalState = '';
      if (currentPlanInterval === 'month') {
        intervalState = 'year';
      } else {
        intervalState = 'month';
      }
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.intervalState = intervalState;
      });
    }
  }, [currentPlanInterval]);

  const renderSubscription = () => (
    <GridItem className={classes.grow}>
      <SubscriptionChangeDurationPlans
        types={type}
        ref={myForwardedRef}
        interval={state.intervalState}
        calculatedIds={ids}
        subscriptionPlanQuantityList={subscriptionPlanQuantityList}
        currentPaymentSource={currentPaymentSource}
        equalNames={equalNames}
        customerId={customerId}
        currentSubscriptionPlans={currentSubscriptionPlans}
      />
    </GridItem>
  );

  const renderCard = () => {
    const cardProps = {
      orgId,
      userId,
    };

    return (
      <GridItem>
        <SubscriptionCard {...cardProps} type={type} />
      </GridItem>
    );
  };

  const renderCoupon = () => {
    let showCoupon = true;
    const now = Date.now() / 1000;
    if (
      !isEmptyString(existedCoupon) &&
      (existedCouponMode === COUPON_MODE.FOREVER ||
        existedCouponMode === COUPON_MODE.ONCE ||
        (existedCouponMode === COUPON_MODE.REPEATING &&
          existedCouponEnd >= now))
    ) {
      showCoupon = false;
    }
    if (!isEmptyString(customerId) && showCoupon) {
      return (
        <GridItem>
          <ApplyCoupon onSubmit={applyCoupon} />
        </GridItem>
      );
    }
    return <div />;
  };

  const renderInfo = () => (
    <GridContainer direction="column" spacing={1}>
      {<RenderCustomerInfo userId={userId} orgId={orgId} />}
      <GridItem>
        <H5 dense subtitle weight="bold" transform="uppercase">
          {getDisplayText()} To
        </H5>
      </GridItem>
      <GridItem>{renderSubscription()}</GridItem>
    </GridContainer>
  );

  const renderDue = () => (
    <DurationPreviewDue
      customerId={customerId}
      interval={state.intervalState}
      orgId={orgId}
    />
  );

  const renderSummary = () => (
    <GridContainer direction="column" spacing={2} className={classes.grow}>
      <GridItem>
        <H3 dense weight="bold" className={classes.paddingBottom}>
          {getDisplayText()} Summary
        </H3>
      </GridItem>
      {renderDue()}
      {renderCoupon()}
      {renderCard()}
      <GridItem>
        <GridContainer direction="column">
          {
            <RenderSubscriptionSubmitButton
              firstTime={false}
              onSubmit={onSubmit}
              hideInnerSubmitButton={hideInnerSubmitButton}
              loading={loading}
            />
          }
        </GridContainer>
      </GridItem>
    </GridContainer>
  );

  const renderDefault = () => (
    <Elements stripe={stripe}>
      <Container padding>
        <GridContainer className={classes.grow} spacing={0}>
          <GridItem sm={12} md={6} className={classes.padding}>
            {renderInfo()}
          </GridItem>
          <GridItem sm={12} md={6} className={classes.padding}>
            {renderSummary()}
          </GridItem>
        </GridContainer>
      </Container>
    </Elements>
  );

  return renderDefault();
}

EnterpriseChangeDurationPlan.propTypes = {
  // parent props
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onSubmit: PropTypes.func,
  myForwardedRef: PropTypes.object,
  orgId: PropTypes.any,
  userId: PropTypes.number,
  previewUpcomingInvoice: PropTypes.func,
  hideInnerSubmitButton: PropTypes.bool,
  applyCoupon: PropTypes.func,
};

EnterpriseChangeDurationPlan.defaultProps = {};

const WrappedComponent = React.memo(EnterpriseChangeDurationPlan);
// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <WrappedComponent {...props} myForwardedRef={ref} />
));
