import React, { forwardRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT, COUPON_MODE, UPGRADE } from 'appConstants';
import { Elements } from '@stripe/react-stripe-js';
import { makeStyles } from 'components/material-ui';
import { H3, H5 } from 'viewComponents/Typography';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import SubscriptionCard from '../parts/SubscriptionCard';
import SubscriptionPlan from '../parts/SubscriptionPlanHooks';
import { StripeContext } from '../../../lib/stripe';
import RenderCustomerInfo from '../components/RenderCustomerInfo';
import Container from '../../../components/Container';
import RenderSubscriptionSubmitButton from '../components/RenderSubscriptionSubmitButton';
import RenderDurationSwitch from '../components/RenderDurationSwitch';
import { getDisplayText } from '../components/Utility/SubscriptionUtility';
import { useDetectSubscriptionProcess } from '../hooks/detectSubscriptionProcessHook';
import PersonalPreviewDue from '../components/NewPersonalPreviewdue/newPersonalPreviewDue';
import { CUSTOMER_RESELECTOR } from '../../../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../../../datastore/selectUtility';
import { PLAN_RESELECTOR } from '../../../datastore/planDataImmerStore/selectors';
import { isEmptyString } from '../../../utils/stringAdditions';
import { usePlanContext } from '../context/planStateContext';
import ApplyCoupon from '../parts/ApplyCoupon';
const styles = () => ({
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
});
const useStyles = makeStyles(styles);
function NewIndividualSeatPlan(props) {
  const classes = useStyles();
  const stripe = useContext(StripeContext);
  const [planState] = usePlanContext();
  const customerId = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(state, {
      userId: props.userId,
    }),
  );

  const currentSubscriptionId = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionId)(state, {
      customerId,
    }),
  );

  const subscriptionItemId = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionItem)(state, {
      subscriptionId: currentSubscriptionId,
      subscriptionItemIndex: props.subscriptionItemIndex,
    }),
  );

  const currentPlanId = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectSubscriptionItemAttribute)(
      state,
      {
        subscriptionItemId,
        attribute: `plan`,
      },
    ),
  );

  const currentPlanInterval = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: currentPlanId,
      attribute: 'interval',
    }),
  );
  const existedCoupon = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionAttribute)(
      state,
      {
        subscriptionId: currentSubscriptionId,
        attribute: 'discount.coupon.id',
      },
    ),
  );

  const existedCouponEnd = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionAttribute)(
      state,
      {
        subscriptionId: currentSubscriptionId,
        attribute: 'discount.end',
      },
    ),
  );

  const existedCouponMode = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionAttribute)(
      state,
      {
        subscriptionId: currentSubscriptionId,
        attribute: 'discount.coupon.duration',
      },
    ),
  );

  const [state, setState] = useImmer({
    intervalState: 'month',
  });
  useDetectSubscriptionProcess(props);
  useEffect(() => {
    if (props.isChangeDuration) {
      let value;
      if (currentPlanInterval === 'month') {
        value = 'year';
      } else {
        value = 'month';
      }
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.intervalState = value;
      });
    } else if (currentPlanInterval) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.intervalState = currentPlanInterval;
      });
    }
  }, [currentPlanInterval, props.isChangeDuration]);
  const {
    userId,
    loading,
    onSubmit,
    hideInnerSubmitButton,
    myForwardedRef,
    subscriptionItemIndex,
    previewUpcomingInvoice,
    type,
    showDurationSwitch,
    applyCoupon,
  } = props;

  const handleInterval = ev => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.intervalState = ev.target.value;
    });
  };

  const renderSubscription = () => {
    const { intervalState } = state;
    return (
      <GridItem className={classes.grow}>
        <SubscriptionPlan
          type={type}
          ref={myForwardedRef}
          interval={intervalState}
          previewUpcomingInvoice={previewUpcomingInvoice}
          subscriptionItemIndex={subscriptionItemIndex}
          userId={userId}
        />
      </GridItem>
    );
  };

  const renderDue = () => {
    const { intervalState } = state;
    return (
      <PersonalPreviewDue
        intervalState={intervalState}
        type={type}
        userId={props.userId}
        subscriptionItemIndex={props.subscriptionItemIndex}
      />
    );
  };

  const renderCard = () => {
    const cardProps = {
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
    if (
      !isEmptyString(customerId) &&
      showCoupon &&
      planState.subscriptionProcess === UPGRADE
    ) {
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
      <RenderCustomerInfo
        userId={userId}
        subscriptionItemIndex={props.subscriptionItemIndex}
      />
      <GridItem>
        <H5 dense subtitle weight="bold" transform="uppercase">
          {getDisplayText()} To
        </H5>
      </GridItem>
      <GridItem>{renderSubscription()}</GridItem>
    </GridContainer>
  );

  const renderSubscriptionPlans = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <H5 dense subtitle weight="bold" transform="uppercase">
          {getDisplayText()} To
        </H5>
      </GridItem>
      <GridItem>{renderSubscription()}</GridItem>
    </GridContainer>
  );

  const renderDefaultView = () => (
    <Elements stripe={stripe}>
      <GridContainer direction="column" spacing={1} className={classes.grow}>
        <GridItem>
          <H3 dense weight="bold">
            {getDisplayText()} Summary
          </H3>
        </GridItem>
        {RenderDurationSwitch({
          showDurationSwitch,
          handleInterval,
          intervalState: state.intervalState,
        })}
        <GridItem>
          <GridContainer direction="column" spacing={1}>
            <GridItem>{renderSubscriptionPlans()}</GridItem>
            {renderDue()}
            {renderCoupon()}
            {renderCard()}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Elements>
  );

  const renderSummary = () => (
    <GridContainer direction="column" spacing={2} className={classes.grow}>
      <GridItem>
        <H3 dense weight="bold" className={classes.paddingBottom}>
          {getDisplayText()} Summary
        </H3>
      </GridItem>
      {RenderDurationSwitch({
        showDurationSwitch,
        handleInterval,
        intervalState: state.intervalState,
      })}
      {renderDue()}
      {renderCoupon()}
      {renderCard()}
      <GridItem>
        <GridContainer direction="column">
          {RenderSubscriptionSubmitButton({
            firstTime: state.firstTime,
            onSubmit,
            hideInnerSubmitButton,
            loading,
          })}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );

  const renderExpandedView = () => (
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
  );

  const renderView = () => {
    if (props.variant === DEFAULT) {
      return renderDefaultView();
    }
    return renderExpandedView();
  };

  return <Elements stripe={stripe}>{renderView()}</Elements>;
}

NewIndividualSeatPlan.propTypes = {
  subscriptionItemIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  variant: PropTypes.string,
  myForwardedRef: PropTypes.object,
  userId: PropTypes.number,
  previewUpcomingInvoice: PropTypes.func,
  hideInnerSubmitButton: PropTypes.bool,
  loading: PropTypes.bool,
  showDurationSwitch: PropTypes.bool,
  isChangeDuration: PropTypes.bool,
  type: PropTypes.string,
  applyCoupon: PropTypes.func,
};

NewIndividualSeatPlan.defaultProps = {
  variant: DEFAULT,
  hideInnerSubmitButton: false,
  showDurationSwitch: false,
};

const WrappedComponent = React.memo(NewIndividualSeatPlan);

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <WrappedComponent {...props} myForwardedRef={ref} />
));
