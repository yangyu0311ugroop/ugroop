import { TEMPLATE_MANAGEMENT_DATASTORE, NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { findIndex } from 'lodash';
/**
 * Created by quando on 18/8/17.
 */
import { CONFIG as config } from 'resaga';
import { PUB_TAB_CONTENT } from './components/PubTemplateTabs/components/PublicTabContent/config';

export const PUBLIC_TEMPLATE = 'public_template';
export const FETCH_TEMPLATE = 'fetchPubTemplate';
export const TAB_GALLERY = 'TabGallery';

export const TEMPLATE_CONFIG = {
  value: {
    templateId: () => [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  [config.PAGE]: PUBLIC_TEMPLATE,

  value: {
    currentQueryDayId: () => [PUB_TAB_CONTENT, 'currentQueryDayId'],
    createdBy: props => [NODE_STORE, 'nodes', props.templateId, 'createdBy'],
    timelineIndex: {
      keyPath: [
        ({ templateId }) =>
          NODE_STORE_SELECTORS.calculatedTimelineId({ id: templateId }),
        ({ templateId }) =>
          NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
      ],
      getter: (id, tabs = []) => {
        const indx = findIndex(tabs, a => a === id);
        return indx || 0;
      },
    },
  },
};
