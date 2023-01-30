import { getOrganisationType } from 'datastore/orgStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from '../../../../datastore/templateManagementStore/selectors';

export const CONFIG_1 = {
  value: {
    orgId: ({ nodeId }) => NODE_STORE_SELECTORS.organisationId({ id: nodeId }),
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
};

export const CONFIG_2 = {
  value: {
    orgType: ({ orgId }) => getOrganisationType({ id: orgId }),
    value: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.personType }),
  },
};
