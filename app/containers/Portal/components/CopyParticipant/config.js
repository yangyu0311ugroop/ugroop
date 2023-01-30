import { ORGANISATION_DATA_STORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import first from 'lodash/first';
import { NODE_STORE_SELECTORS } from '../../../../datastore/nodeStore/selectors';
import { NODE_PATHS } from '../../../../datastore/nodeStore/constants';

export const organisationTours = ({ selectedOrgId }) => [
  ORGANISATION_DATA_STORE,
  'organisationTours',
  selectedOrgId,
  'children',
];

export const USER_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
    fetchTour: {
      keyPath: [ORGANISATION_DATA_STORE, 'organisationTours'],
      getter: org => !org,
    },
    selectedOrgId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.selectedOrgId,
    participantModel: NODE_STORE_SELECTORS.node,
    personId: {
      keyPath: ({ id }) =>
        NODE_STORE_SELECTORS.nodeProp({
          id,
          path: NODE_PATHS.calculatedPeople,
        }),
      getter: people => first(people),
    },
  },
};
export const CONFIG = {
  value: {
    orgUserIds: ({ userId }) => USER_STORE_SELECTORS.orgUsers({ id: userId }),
    tours: organisationTours,
    personModel: ({ personId }) =>
      PERSON_STORE_SELECTORS.person({ id: personId }),
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
    selectedOrgId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.selectedOrgId,
  },
};
