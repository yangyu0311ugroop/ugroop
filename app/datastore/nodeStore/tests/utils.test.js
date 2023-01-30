/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_STORE_UTILS } from '../utils';
import { NODE_BATCH_ACTIONS } from '../constants';

describe('datastore/nodeStore/utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#filterTrailsByIdReducer', () => {
    it('appends first id in trail if trail has id', () => {
      const id = 1;
      const acc = [];
      const trail = [2, 1];
      expect(NODE_STORE_UTILS.filterTrailsByIdReducer(id)(acc, trail)).toEqual([
        trail[0],
      ]);
    });

    it('not appends first id in trail if trail not has id', () => {
      const id = 1;
      const acc = 'acc';
      const trail = [2];
      expect(NODE_STORE_UTILS.filterTrailsByIdReducer(id)(acc, trail)).toEqual(
        acc,
      );
    });
  });

  describe('#filterByTypesReducer', () => {
    it('appends id if currentType matches', () => {
      const types = ['type1', 'type2'];
      const acc = [];
      const id = 1;
      const currentType = 'type1';
      expect(
        NODE_STORE_UTILS.filterByTypesReducer(types)(acc, [id, currentType]),
      ).toEqual([id]);
    });

    it('not appends id if currentType not matches', () => {
      const types = ['type2'];
      const acc = 'acc';
      const id = 1;
      const currentType = 'type1';
      expect(
        NODE_STORE_UTILS.filterByTypesReducer(types)(acc, [id, currentType]),
      ).toEqual(acc);
    });
  });

  describe('#filterByStatusesReducer', () => {
    it('appends id if currentStatus matches', () => {
      const statuses = ['status1', 'status2'];
      const acc = [];
      const id = 1;
      const currentStatus = 'status1';
      expect(
        NODE_STORE_UTILS.filterByStatusesReducer(statuses)(acc, [
          id,
          currentStatus,
        ]),
      ).toEqual([id]);
    });

    it('not appends id if currentStatus not matches', () => {
      const statuses = ['status2'];
      const acc = 'acc';
      const id = 1;
      const currentStatus = 'status1';
      expect(
        NODE_STORE_UTILS.filterByStatusesReducer(statuses)(acc, [
          id,
          currentStatus,
        ]),
      ).toEqual(acc);
    });
  });

  describe('#filterByDateReducer', () => {
    it('appends id if currentTime matches', () => {
      const time = '2018-01-01T12:00:00.000Z';
      const acc = [];
      const id = 1;
      const currentTime = '2018-01-01T00:00:00.000Z';
      expect(
        NODE_STORE_UTILS.filterByDateReducer(time)(acc, [id, currentTime]),
      ).toEqual([id]);
    });

    it('not appends id if currentTime not matches', () => {
      const time = '2018-01-01T12:00:00.000Z';
      const acc = 'acc';
      const id = 1;
      const currentTime = '2018-01-02T00:00:00.000Z';
      expect(
        NODE_STORE_UTILS.filterByDateReducer(time)(acc, [id, currentTime]),
      ).toEqual(acc);
    });
  });

  describe('#idValueReducer', () => {
    it('appends id + value if has id', () => {
      const acc = [];
      const id = 1;
      const value = 'value';
      expect(NODE_STORE_UTILS.idValueReducer(acc, [id, value])).toEqual([
        { id, value },
      ]);
    });

    it('not appends id + value not has id', () => {
      const acc = 'acc';
      expect(NODE_STORE_UTILS.idValueReducer(acc, [])).toEqual(acc);
    });
  });

  describe('#idValuesReducer', () => {
    it('appends id + value if has id', () => {
      const acc = [];
      const id = 1;
      const values = { x: 1 };
      expect(NODE_STORE_UTILS.idValuesReducer(acc, [id, values])).toEqual([
        { id, ...values },
      ]);
    });

    it('not appends id + value not has id', () => {
      const acc = 'acc';
      expect(NODE_STORE_UTILS.idValuesReducer(acc, [])).toEqual(acc);
    });
  });

  describe('#calculatedTimeMoment', () => {
    it('returns setTimeZone helper', () => {
      expect(NODE_STORE_UTILS.calculatedTimeMoment).toBe(
        MOMENT_HELPERS.setTimeZone,
      );
    });
  });

  describe('#getParentInTrail', () => {
    const id = 1;
    const parentId = 2;
    const trail = [id, parentId];

    it('returns parent in trail', () => {
      expect(NODE_STORE_UTILS.getParentInTrail(trail, id)).toEqual(parentId);
    });

    it('returns null if no parent in trail', () => {
      expect(NODE_STORE_UTILS.getParentInTrail([id], id)).toBeNull();
    });

    it('returns null if no trail', () => {
      expect(NODE_STORE_UTILS.getParentInTrail()).toBeNull();
    });
  });

  describe('#parseEventNodeBatchOperations', () => {
    it('returns parsed operations', () => {
      const operations = [
        { id: 1, action: NODE_BATCH_ACTIONS.UPDATE_EVENT },
        { parentId: 2, action: NODE_BATCH_ACTIONS.MOVE_INSIDE },
        { id: 3, action: 'someAction' },
      ];
      expect(
        NODE_STORE_UTILS.parseEventNodeBatchOperations(operations),
      ).toEqual({ action: 'someAction', id: 3, parentNodeId: 2 });
    });

    it('returns null if no operations', () => {
      const operations = [];
      expect(
        NODE_STORE_UTILS.parseEventNodeBatchOperations(operations),
      ).toBeNull();
    });
  });
});
