import { NODE_STORE_SELECTORS } from '../../../../../../datastore/nodeStore/selectors';
import { SET_VALUE } from '../../../../../../ugcomponents/SnackBar/config';

export const CONFIG = {
  value: {
    attachmentIds: {
      keyPath: ({ formIds = [] }) =>
        formIds.map(id => NODE_STORE_SELECTORS.attachmentId({ id })),
      cacheKey: ({ formIds }) =>
        `Node.forms.Attachment.${
          formIds ? formIds.toString() : null
        }.attachmentIds`,
      props: ({ formIds }) => formIds,
      getter: (...values) => {
        values.pop();
        return values;
      },
    },
  },
  setValue: {
    ...SET_VALUE,
  },
};
