import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import {
  SUBSCRIPTION_API,
  UPDATE_SUBSCRIPTION,
  SUBSCRIPTION_SCHEDULE_API,
  CREATE_SUBSCRIPTION_SCHEDULE,
  CREATE_SUBSCRIPTION_FIRSTTIME,
  UPDATE_SUBSCRIPTION_SCHEDULE,
  CUSTOMER_API,
  UPDATE_CUSTOMER,
  RELEASE_SUBSCRIPTION_SCHEDULE,
} from 'apis/constants';
import { LOGIC_HELPERS } from '../../utils/helpers/logic';

export const SUBSCRIPTION_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
    knownAs: COGNITO_STORE_SELECTORS.knownAs,
    email: COGNITO_STORE_SELECTORS.myEmail,
    firstName: COGNITO_STORE_SELECTORS.firstName,
    lastName: COGNITO_STORE_SELECTORS.lastName,
  },
  isLoading: {
    loading: {
      keyPath: [
        [SUBSCRIPTION_API, UPDATE_SUBSCRIPTION],
        [SUBSCRIPTION_API, CREATE_SUBSCRIPTION_FIRSTTIME],
        [SUBSCRIPTION_SCHEDULE_API, CREATE_SUBSCRIPTION_SCHEDULE],
        [SUBSCRIPTION_SCHEDULE_API, UPDATE_SUBSCRIPTION_SCHEDULE],
        [CUSTOMER_API, UPDATE_CUSTOMER],
        [SUBSCRIPTION_SCHEDULE_API, RELEASE_SUBSCRIPTION_SCHEDULE],
      ],
      getter: (
        updateSubscription,
        firstTimeSubscription,
        createSchedule,
        updateSchedule,
        updateCustomer,
        releaseSchedule,
      ) =>
        LOGIC_HELPERS.ifElse(
          [
            updateSubscription,
            firstTimeSubscription,
            createSchedule,
            updateSchedule,
            updateCustomer,
            releaseSchedule,
          ],
          true,
          false,
          true,
        ),
    },
  },
};
