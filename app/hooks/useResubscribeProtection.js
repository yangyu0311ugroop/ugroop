import PropTypes from 'prop-types';
import { isEmptyString } from 'utils/stringAdditions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CUSTOMER_RESELECTOR } from '../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../datastore/selectUtility';

const UseResubscribeProtectionHook = props => {
  const { orgId, userId } = props;
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!location.state) {
      if (isEmptyString(orgId)) {
        history.replace(`/settings/billings`);
      } else {
        history.replace(`/orgs/${orgId}/settings/billings`);
      }
    }
  }, [location.state]);

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

  if (customerId && isEmptyString(currentSubscriptionId)) {
    return true;
  }
  return false;
};

UseResubscribeProtectionHook.propTypes = {
  resaga: PropTypes.object,
  type: PropTypes.string,
};

export default UseResubscribeProtectionHook;
