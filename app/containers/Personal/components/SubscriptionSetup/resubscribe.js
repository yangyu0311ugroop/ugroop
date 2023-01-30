import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import resagaHOC from 'resaga';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import {
  CREATE_SUBSCRIPTION_FIRSTTIME,
  SUBSCRIPTION_API,
} from '../../../../apis/constants';
import {
  EXPANDED,
  SUBSCRIPTION_INDIVIDUAL,
  URL_HELPERS,
} from '../../../../appConstants';
import IndividualSeatPlan from '../../../../smartComponents/Plan/NewIndividualSeatPlan';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import useResubscribeProtection from '../../../../hooks/useResubscribeProtection';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import {
  selectAccountAttribute,
  selectCognitoPersonAttribute,
} from '../../../../datastore/stormPathStore/selectors';

function PersonResubscribe(props) {
  const ref = React.createRef();
  const history = useHistory();
  const { pathName, creatingSubscription, resaga } = props;
  const userId = useSelector(state =>
    makeSingleSelect(selectAccountAttribute)(state, {
      attribute: 'id',
    }),
  );
  const knownAs = useSelector(state =>
    makeSingleSelect(selectCognitoPersonAttribute)(state, {
      attribute: 'knownAs',
    }),
  );
  const firstName = useSelector(state =>
    makeSingleSelect(selectCognitoPersonAttribute)(state, {
      attribute: 'firstName',
    }),
  );

  const lastName = useSelector(state =>
    makeSingleSelect(selectCognitoPersonAttribute)(state, {
      attribute: 'lastName',
    }),
  );

  const email = useSelector(state =>
    makeSingleSelect(selectCognitoPersonAttribute)(state, {
      attribute: 'email',
    }),
  );
  const onCreateSubscriptionSuccess = () => {
    if (pathName) {
      history.push(pathName);
    } else {
      history.push(URL_HELPERS.myTours());
    }
  };

  const onCreateSubscriptionFail = () => {};
  const pass = useResubscribeProtection({
    userId,
  });
  const submitSubscription = async () => {
    const {
      planId,
      stripeData,
      freePlanId,
    } = await ref.current.collectPaymentInfo();
    const selectPlan = stripeData ? planId : freePlanId;
    if (stripeData && stripeData.error) {
      // Do something about the error
      return;
    }
    const subscription = {
      userId,
      name: knownAs && knownAs !== '' ? knownAs : `${firstName} ${lastName}`,
      planIds: [selectPlan],
      source: stripeData ? stripeData.token.id : null,
      email,
    };
    resaga.dispatchTo(SUBSCRIPTION_API, CREATE_SUBSCRIPTION_FIRSTTIME, {
      payload: subscription,
      onSuccess: onCreateSubscriptionSuccess,
      onError: onCreateSubscriptionFail,
    });
  };

  const view = ref ? (
    <PlanProvider>
      <Helmet
        title="Subscription"
        meta={[
          {
            name: 'description',
            content: 'Subscription',
          },
        ]}
      />
      <IndividualSeatPlan
        variant={EXPANDED}
        type={SUBSCRIPTION_INDIVIDUAL}
        ref={ref}
        onSubmit={submitSubscription}
        isUpgrade
        showDurationSwitch
        loading={creatingSubscription}
        subscriptionItemIndex={0}
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

PersonResubscribe.propTypes = {
  pathName: PropTypes.string,
  creatingSubscription: PropTypes.bool,
  resaga: PropTypes.object,
};

export default compose(resagaHOC())(React.memo(PersonResubscribe));
