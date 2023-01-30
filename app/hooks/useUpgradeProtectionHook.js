import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { isEmptyString, parseStringJson } from 'utils/stringAdditions';
import {
  GET_INVOICE,
  INVOICE_API,
  LIST_SUBSCRIPTION_SCHEDULE,
  SUBSCRIPTION_SCHEDULE_API,
} from 'apis/constants';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { CUSTOMER_RESELECTOR } from '../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../datastore/selectUtility';

const UseUpgradeProtectionHook = props => {
  const { resaga, orgId, userId, type } = props;
  const location = useLocation();
  const history = useHistory();

  const customerId = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(state, {
      orgId,
      userId,
    }),
  );
  const currentSubscriptionId = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionId)(state, {
      customerId,
    }),
  );

  const currentSubscriptionPlans = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectSubscriptionPlans(state, {
      subscriptionId: currentSubscriptionId,
      attribute: 'items.data',
    }),
  );

  const plans = parseStringJson(currentSubscriptionPlans);
  const index = _.findIndex(plans, o => o.type === type);
  useEffect(() => {
    if (customerId) {
      fetchSchedulePlan();
      fetchCurrentInvoice();
    }
  }, [customerId]);

  useEffect(() => {
    if (!location.state) {
      if (isEmptyString(orgId)) {
        history.replace(`/settings/billings`);
      } else {
        history.replace(`/orgs/${orgId}/settings/billings`);
      }
    }
  }, [location.state]);

  const [state, setState] = useImmer({
    listSubscriptionScheduleSuccess: false,
  });

  const listSubscriptionScheduleSuccess = () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.listSubscriptionScheduleSuccess = true;
    });
  };

  const fetchSchedulePlan = () => {
    resaga.dispatchTo(SUBSCRIPTION_SCHEDULE_API, LIST_SUBSCRIPTION_SCHEDULE, {
      payload: {
        query: JSON.stringify({ customer: customerId }),
      },
      onSuccess: listSubscriptionScheduleSuccess,
    });
  };

  const fetchCurrentInvoice = () => {
    resaga.dispatchTo(INVOICE_API, GET_INVOICE, {
      payload: {
        query: JSON.stringify({
          customer: customerId,
          subscription: currentSubscriptionId,
        }),
      },
    });
  };

  if (state.listSubscriptionScheduleSuccess) {
    if (location.state && location.state.userActions) {
      return {
        isPass: true,
        index,
      };
    }
  }
  return {
    isPass: false,
  };
};

UseUpgradeProtectionHook.propTypes = {
  resaga: PropTypes.object,
  type: PropTypes.string,
};

export default UseUpgradeProtectionHook;
