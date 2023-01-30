/**
 * Created by stephenkarpinskyj on 14/4/18.
 */

import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  ON_DRAG_END,
  ON_DRAG_START,
} from 'appConstants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('containers/Templates/TemplateManagement/TemplateContent/TabContent/TabTimeLine/DragDropContext/config', () => {
  requests.fetchWithAuthorisation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue[ON_DRAG_START]).toEqual([
        TEMPLATE_MANAGEMENT_DATASTORE,
        ON_DRAG_START,
      ]);
      expect(CONFIG.setValue[ON_DRAG_END]).toEqual([
        TEMPLATE_MANAGEMENT_DATASTORE,
        ON_DRAG_END,
      ]);
    });
  });
});
