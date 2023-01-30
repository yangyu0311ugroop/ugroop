import { PORTAL_HELPERS } from '../../../../containers/Portal/helpers';
import {
  STREAM_CHAT_STORE_IMMER,
  TEMPLATE_MANAGEMENT_DATASTORE,
} from '../../../../appConstants';

export const TemplateConfig = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  value: {
    archivedChannels: ({ templateId }) => [
      STREAM_CHAT_STORE_IMMER,
      'tours',
      templateId,
      'archivedChannel',
    ],
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
