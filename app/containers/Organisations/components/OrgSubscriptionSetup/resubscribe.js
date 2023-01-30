import React, { useEffect } from 'react';
import resagaHOC from 'resaga';
import { compose } from 'redux';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  EXPANDED,
  SUBSCRIPTION_ENTERPRISE,
  URL_HELPERS,
  FREE_ORG_SEATS_THRESHOLD,
} from 'appConstants';
import {
  CARDS_API,
  CREATE_SUBSCRIPTION_FIRSTTIME,
  GET_CUSTOMER_CARDS,
  GET_CUSTOMER_SUBSCRIPTION,
  GET_ORG_MEMBERS,
  ORGANISATION_API,
  SUBSCRIPTION_API,
} from 'apis/constants';
import EnterpriseSeatPlan from 'smartComponents/Plan/NewEnterpriseSeatPlan';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';
import { ORG_DATASTORE_RESELECTORS } from '../../../../datastore/orgStore/selectorsViaConnect';
import useResubscribeProtection from '../../../../hooks/useResubscribeProtection';
/* eslint-disable no-param-reassign */

function Resubscribe(props) {
  const ref = React.createRef();
  const { resaga, id, userId } = props;
  const customerId = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(state, {
      orgId: props.id,
      userId: props.userId,
    }),
  );
  const orgSeats = useSelector(store =>
    ORG_DATASTORE_RESELECTORS.getOrganisationSeats(store, {
      id,
    }),
  );
  const history = useHistory();
  const location = useLocation();
  const [state, setState] = useImmer({
    loading: false,
  });

  const pass = useResubscribeProtection({
    orgId: props.id,
    userId: props.userId,
  });
  useEffect(() => {
    resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
      payload: {
        id,
      },
    });
    resaga.dispatchTo(SUBSCRIPTION_API, GET_CUSTOMER_SUBSCRIPTION, {
      payload: {
        id,
        type: 'org',
      },
    });
  }, []);

  useEffect(() => {
    if (customerId) {
      resaga.dispatchTo(CARDS_API, GET_CUSTOMER_CARDS, {
        payload: {
          id: customerId,
        },
      });
    }
  }, [customerId]);

  const onCreateSubscriptionSuccess = () => {
    if (location.state && location.state.pathname) {
      history.push(location.state.pathname);
    } else {
      history.push(URL_HELPERS.myTours(id));
    }
    setState(draft => {
      draft.loading = false;
    });
  };

  const onCreateSubscriptionFail = () => {
    setState(draft => {
      draft.loading = false;
    });
  };

  const submitSubscription = async () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.loading = true;
    });
    const {
      planId,
      stripeData,
      freePlanId,
      planFirstPurchase,
      bundlePlanId,
    } = await ref.current.collectPaymentInfo();
    let selectPlan = stripeData ? planId : freePlanId;
    if (customerId) {
      selectPlan = planId;
    }
    if (stripeData && stripeData.error) {
      return;
    }
    let q = 1;
    const quantity = orgSeats - FREE_ORG_SEATS_THRESHOLD;
    if (quantity > parseInt(planFirstPurchase, 10)) {
      q = quantity;
    } else {
      q = parseInt(planFirstPurchase, 10);
    }
    const orgQuantity = q > 1 ? q : 1;
    const tourQuantity = planId === freePlanId ? 1 : 20;
    const subscription = {
      customerId,
      planIds: [selectPlan, bundlePlanId],
      source: stripeData ? stripeData.token.id : null,
      quantity: orgQuantity, // never pass quantity zero.
      planQuantity: [orgQuantity, tourQuantity], // 20 is the enterprise tour plan
    };
    resaga.dispatchTo(SUBSCRIPTION_API, CREATE_SUBSCRIPTION_FIRSTTIME, {
      payload: subscription,
      onSuccess: onCreateSubscriptionSuccess,
      onError: onCreateSubscriptionFail,
    });
  };

  const view = ref ? (
    <PlanProvider>
      <EnterpriseSeatPlan
        variant={EXPANDED}
        type={SUBSCRIPTION_ENTERPRISE}
        ref={ref}
        onSubmit={submitSubscription}
        userId={userId}
        orgId={id}
        isUpgrade
        showDurationSwitch
        loading={state.loading}
      />
    </PlanProvider>
  ) : (
    <div />
  );
  if (pass) {
    return view;
  }
  return <div />;
}

Resubscribe.propTypes = {
  userId: PropTypes.number,
  resaga: PropTypes.object,
  id: PropTypes.number,
};

Resubscribe.defaultProps = {};

export default compose(resagaHOC())(React.memo(Resubscribe));
