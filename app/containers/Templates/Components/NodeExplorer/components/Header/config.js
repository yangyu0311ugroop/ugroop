import { NODE_STORE } from 'appConstants';
import { MY_TEMPLATE_VIEWSTORE_SELECTORS } from 'containers/Templates/Components/NodeExplorer/selectors';
import { getOrganisationName } from 'datastore/orgStore/selectors';
import { USER_STORE_SELECTORS } from '../../../../../../datastore/userStore/selectors';

export const CONFIG = {
  value: {
    folderName: props => [NODE_STORE, 'nodes', props.folderId, 'content'],
    isFetchingInitialContent:
      MY_TEMPLATE_VIEWSTORE_SELECTORS.getters.isFetchingInitialContent,
    organisationName: ({ organisationId }) =>
      getOrganisationName({ id: organisationId }),
    userId: USER_STORE_SELECTORS.userId,
  },
  setValue: {},
};
