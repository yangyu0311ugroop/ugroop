/**
 * Created by stephenkarpinskyj on 5/4/18.
 */

import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  ON_DRAG_START,
  ON_DRAG_END,
} from 'appConstants';

export const CONFIG = {
  setValue: {
    [ON_DRAG_START]: [TEMPLATE_MANAGEMENT_DATASTORE, ON_DRAG_START],
    [ON_DRAG_END]: [TEMPLATE_MANAGEMENT_DATASTORE, ON_DRAG_END],
  },
};
