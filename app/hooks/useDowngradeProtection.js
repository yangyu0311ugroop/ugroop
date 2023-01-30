/**
 * Created by Yang on 11/7/19.
 */

import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  GET_INVOICE,
  GET_ORG_MEMBERS,
  INVOICE_API,
  LIST_SUBSCRIPTION_SCHEDULE,
  ORGANISATION_API,
  SUBSCRIPTION_SCHEDULE_API,
} from 'apis/constants';
import { useImmer } from 'use-immer';
import { isEmptyString, parseStringJson } from 'utils/stringAdditions';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { CUSTOMER_RESELECTOR } from '../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../datastore/selectUtility';

function UseDowngradeProtectionHook(props) {
  const { orgId, userId, resaga, type } = props;
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

  const [state, setState] = useImmer({
    listSubscriptionScheduleSuccess: false,
    orgMemberFetchSuccess: false,
  });

  const orgMembersSuccess = () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.orgMemberFetchSuccess = true;
    });
  };

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
        query: JSON.stringify({ customer: customerId }),
      },
    });
  };

  const fetchOrgMembers = () => {
    resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
      payload: { id: orgId },
      onSuccess: orgMembersSuccess,
    });
  };

  useEffect(() => {
    if (customerId) {
      fetchSchedulePlan();
      fetchCurrentInvoice();
    }
  }, [customerId]);

  useEffect(() => {
    if (orgId) {
      fetchOrgMembers();
    }
  }, [orgId]);

  useEffect(() => {
    if (!location.state) {
      if (isEmptyString(orgId)) {
        history.replace(`/settings/billings`);
      } else {
        history.replace(`/orgs/${orgId}/settings/billings`);
      }
    }
  }, [location.state]);
  if (orgId) {
    if (state.orgMemberFetchSuccess) {
      if (state.listSubscriptionScheduleSuccess) {
        if (location.state && location.state.userActions) {
          return {
            isPass: true,
            index,
          };
        }
      }
    }
    return {
      isPass: false,
    };
  }
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
}

export default UseDowngradeProtectionHook;
