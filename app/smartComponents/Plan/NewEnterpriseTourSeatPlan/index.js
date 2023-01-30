import React, { forwardRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FREE_ORG_SEATS_THRESHOLD,
  COUPON_MODE,
  UPGRADE,
  FEEDBACK_EMAIL,
} from 'appConstants';
import { Elements } from '@stripe/react-stripe-js';
import { makeStyles } from 'components/material-ui';
import { H3, H5 } from 'viewComponents/Typography';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import NewOrgPreviewDue from '../components/NewOrgPreviewDue/newOrgPreviewDue';
import SubscriptionCard from '../parts/SubscriptionCard';
import { StripeContext } from '../../../lib/stripe';
import { isEmptyString } from '../../../utils/stringAdditions';
import Container from '../../../components/Container';
import { ORG_DATASTORE_RESELECTORS } from '../../../datastore/orgStore/selectorsViaConnect';
import RenderSubscriptionSubmitButton from '../components/RenderSubscriptionSubmitButton';
import RenderDurationSwitch from '../components/RenderDurationSwitch';
import { getDisplayText } from '../components/Utility/SubscriptionUtility';
import { useDetectSubscriptionProcess } from '../hooks/detectSubscriptionProcessHook';
import ApplyCoupon from '../parts/ApplyCoupon';
import { usePlanContext } from '../context/planStateContext';
import SubscriptionTourSeats from '../parts/SubscriptionTourSeats';
import RenderCustomerInfo from '../components/RenderCustomerInfo';
import { useSelectorCurrentSubscriptionData } from '../hooks/useSelectorCurrentSubscriptionData';
import JText from '../../../components/JText';
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
  subscriptionListFrame: {
    maxHeight: 350,
  },
};
const useStyles = makeStyles(styles);
function NewEnterpriseTourSeatPlan(props) {
  const classes = useStyles();
  const {
    userId,
    orgId,
    loading,
    onSubmit,
    myForwardedRef,
    subscriptionItemIndex,
    previewUpcomingInvoice,
    type,
    showDurationSwitch,
    applyCoupon,
  } = props;

  const stripe = useContext(StripeContext);
  const [planState] = usePlanContext();
  useDetectSubscriptionProcess(props);
  const [state, setState] = useImmer({
    intervalState: 'month',
    firstTime: false,
  });

  const data = useSelectorCurrentSubscriptionData({
    userId: props.userId,
    orgId: props.orgId,
    subscriptionItemIndex: props.subscriptionItemIndex,
  });

  const {
    customerId,
    currentSubscriptionQuantity,
    existedCoupon,
    existedCouponMode,
    existedCouponEnd,
    currentPlanId,
    currentPlanInterval,
    currentPaymentSource,
  } = data;

  useEffect(() => {
    if (isEmptyString(customerId)) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.firstTime = true;
      });
    }
  }, [customerId]);

  const orgSeats = useSelector(store =>
    ORG_DATASTORE_RESELECTORS.getOrganisationSeats(store, {
      id: orgId,
    }),
  );
  const handleInterval = ev => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.intervalState = ev.target.value;
    });
  };

  const renderSubscription = () => {
    const { intervalState } = state;
    return (
      <SubscriptionTourSeats
        type={type}
        ref={myForwardedRef}
        interval={intervalState}
        previewUpcomingInvoice={previewUpcomingInvoice}
        currentSubscriptionQuantity={currentSubscriptionQuantity}
        currentPlanId={currentPlanId}
        currentPlanInterval={currentPlanInterval}
        currentPaymentSource={currentPaymentSource}
      />
    );
  };

  const renderDue = () => {
    const { intervalState } = state;
    return (
      <NewOrgPreviewDue
        intervalState={intervalState}
        quantity={orgSeats - FREE_ORG_SEATS_THRESHOLD}
        type={type}
        userId={userId}
        orgId={orgId}
        subscriptionItemIndex={subscriptionItemIndex}
      />
    );
  };

  const renderCard = () => {
    const cardProps = {
      orgId,
    };

    return (
      <GridItem>
        <SubscriptionCard {...cardProps} type={type} />
      </GridItem>
    );
  };

  const needMoreSeats = () => {
    if (planState.subscriptionProcess === UPGRADE) {
      return (
        <a href={`mailto:${FEEDBACK_EMAIL}`} target="_blank">
          <JText blue lg underline link>
            Need more than 100 tour seats? Please contact us.
          </JText>
        </a>
      );
    }
    return null;
  };

  const renderInfo = () => {
    const { subscriptionProcess } = planState;
    return (
      <GridContainer direction="column" spacing={1}>
        <RenderCustomerInfo
          userId={userId}
          orgId={orgId}
          subscriptionItemIndex={subscriptionItemIndex}
        />
        <GridItem>
          <H5 dense subtitle weight="bold" transform="uppercase">
            {subscriptionProcess} To
          </H5>
        </GridItem>
        <GridItem className={classes.subscriptionListFrame}>
          {renderSubscription()}
        </GridItem>
        <GridItem>{needMoreSeats()}</GridItem>
      </GridContainer>
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
            hideInnerSubmitButton: false,
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

  return <Elements stripe={stripe}>{renderExpandedView()}</Elements>;
}

NewEnterpriseTourSeatPlan.propTypes = {
  // parent props
  type: PropTypes.string,
  onSubmit: PropTypes.func,
  myForwardedRef: PropTypes.object,
  orgId: PropTypes.any,
  userId: PropTypes.number,
  previewUpcomingInvoice: PropTypes.func,
  showDurationSwitch: PropTypes.bool,
  subscriptionItemIndex: PropTypes.number,
  loading: PropTypes.bool,
  applyCoupon: PropTypes.func,
};

NewEnterpriseTourSeatPlan.defaultProps = {
  loading: false,
};

const WrappedComponent = React.memo(NewEnterpriseTourSeatPlan);

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <WrappedComponent {...props} myForwardedRef={ref} />
));
