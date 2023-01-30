/**
 * Created by stephenkarpinskyj on 22/5/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../containerConfig';

describe('containers/Templates/TemplateManagment/TemplateContent/TabComponent/TabTimeline/TimelineContent/RenderDay/Day/containerConfig', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('editing Test', () => {
    it('should exist', () => {
      expect(CONFIG.setValue.editing({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.editing({ id: 1 }),
      );
    });
  });
});
