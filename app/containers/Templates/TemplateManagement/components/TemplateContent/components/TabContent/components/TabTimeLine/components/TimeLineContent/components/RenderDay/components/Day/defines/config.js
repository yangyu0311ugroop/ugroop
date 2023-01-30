import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { COMMENT as DISCUSSION_DRAWER } from 'containers/Templates/TemplateManagement/components/Comment/config';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  value: {
    icon: props => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editDays',
      props.dayId,
      'icon',
    ],
    placeId: props => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editDays',
      props.dayId,
      'placeId',
    ],
    timeZoneId: props => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editDays',
      props.dayId,
      'timeZoneId',
    ],
    discussionDrawerNodeId: [DISCUSSION_DRAWER, 'nodeId'],
    fk: props => FILE_STORE_SELECTORS.selectFileId({ id: props.dayPhotoId }),
    oldMetaInfo: props =>
      FILE_STORE_SELECTORS.templateMetaInfo({ id: props.dayPhotoId }),
    nodeChildren: props => NODE_STORE_SELECTORS.children({ id: props.dayId }),
    isNew: ({ dayId }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editDays',
      dayId,
      'isNew',
    ],
    checklists: props =>
      NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: props.dayId }),
    showChecklists: ({ dayId }) =>
      NODE_STORE_SELECTORS.calculatedShowChecklists({ id: dayId }),
    editing: ({ dayId }) => NODE_STORE_SELECTORS.editing({ id: dayId }),
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
  },

  setValue: {
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    selectedActivityId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedActivityId'],
    editDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editDayId'],
    editDays: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editDays'],
    editing: ({ dayId }) => NODE_STORE_SELECTORS.editing({ id: dayId }),
    ...SET_VALUE,
  },
};
