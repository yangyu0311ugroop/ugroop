import dotProp from 'dot-prop-immutable';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { NODE_BATCH_ACTIONS } from 'datastore/nodeStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { TEMPLATE_API_EVENT_UTILS } from '../events';

describe('apis/Template/utils/events', () => {
  describe('convertToBatchCreate', () => {
    it('not converts if not batchCreate', () => {
      const model = { x: 1 };
      expect(TEMPLATE_API_EVENT_UTILS.convertToBatchCreate(model)).toEqual([
        model,
      ]);
    });

    it('converts if batchCreate', () => {
      let model = { x: 1 };
      const dayRange = [1, 2];
      model = dotProp.set(
        model,
        EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.batchCreate),
        true,
      );
      model = dotProp.set(
        model,
        EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.tempDayRange),
        [1, 2],
      );
      expect(TEMPLATE_API_EVENT_UTILS.convertToBatchCreate(model)).toEqual(
        dayRange.map(id => ({
          data: {},
          node: {
            customData: {
              start: { tempDay: id.toString() },
            },
          },
          x: 1,
        })),
      );
    });
  });

  describe('injectNodeType', () => {
    it('injects node type', () => {
      const node = { x: 1 };
      const data = {};
      expect(TEMPLATE_API_EVENT_UTILS.injectNodeType(node, data)).toEqual({
        type: 'event',
        x: 1,
      });
    });
  });

  describe('injectDataId', () => {
    it('injects dataId', () => {
      const data = { x: 1 };
      const dataId = 2;
      expect(TEMPLATE_API_EVENT_UTILS.injectDataId(data, dataId)).toEqual({
        id: dataId,
        ...data,
      });
    });
  });

  describe('wrapInBatchOperations', () => {
    it('wraps in batch operations', () => {
      const node = {};
      const id = 1;
      const parentNodeId = 2;
      expect(
        TEMPLATE_API_EVENT_UTILS.wrapInBatchOperations(node, id, parentNodeId),
      ).toEqual({
        operations: [
          { action: NODE_BATCH_ACTIONS.UPDATE_EVENT, id, node },
          {
            action: NODE_BATCH_ACTIONS.MOVE_INSIDE,
            parentId: parentNodeId,
            toBeMovedId: id,
          },
        ],
      });
    });

    it('not wraps in MOVE_INSIDE batch operation', () => {
      const node = {};
      const id = 1;
      const parentNodeId = null;
      expect(
        TEMPLATE_API_EVENT_UTILS.wrapInBatchOperations(node, id, parentNodeId),
      ).toEqual({
        operations: [{ action: NODE_BATCH_ACTIONS.UPDATE_EVENT, id, node }],
      });
    });
  });

  describe('upsertEvents', () => {
    it('upserts correctly', () => {
      const flightBookingId = 2;
      const props = { resaga: { setValue: jest.fn() } };
      const obj = {
        events: { 1: { id: 1 } },
        attachments: { 7: { id: 7 } },
        flightBookings: { [flightBookingId]: { id: flightBookingId } },
        activityDetail: { 4: { id: 4 } },
      };
      const storeEvents = { 3: { id: 3 } };
      const storeFlightBookings = { 4: { id: 4 } };
      const storeFlightBookingIds = [5];
      const storeActivityDetails = { 5: { id: 5 } };
      TEMPLATE_API_EVENT_UTILS.upsertEvents(props)(obj);

      expect(
        props.resaga.setValue.mock.calls[0][0].activityDetail(
          storeActivityDetails,
        ),
      ).toEqual({
        ...obj.activityDetail,
        ...storeActivityDetails,
      });
      expect(
        props.resaga.setValue.mock.calls[0][0].events(storeEvents),
      ).toEqual({
        ...obj.events,
        ...storeEvents,
      });
      expect(
        props.resaga.setValue.mock.calls[0][0].flightBookings(
          storeFlightBookings,
        ),
      ).toEqual({
        ...obj.flightBookings,
        ...storeFlightBookings,
      });
      expect(
        props.resaga.setValue.mock.calls[0][0].flightBookingIds(
          storeFlightBookingIds,
        ),
      ).toEqual([flightBookingId]);
    });

    it('only upserts flightBookingIds', () => {
      const props = { resaga: { setValue: jest.fn() } };
      const obj = { flightBookingIds: {} };
      TEMPLATE_API_EVENT_UTILS.upsertEvents(props)(obj);
      const {
        flightBookingIds,
        ...rest
      } = props.resaga.setValue.mock.calls[0][0];
      expect(rest).toEqual({});
    });
  });

  describe('upsertEvent', () => {
    it('upserts correctly', () => {
      const nodeId = 1;
      const props = { resaga: { setValue: jest.fn() } };
      const obj = {
        node: { [nodeId]: { id: nodeId } },
        events: { 2: { id: 2 } },
        attachments: [{ id: 2 }],
        activityDetail: [{ id: 2 }],
        calculatedNodes: [1, 2],
      };
      const storeNodes = { 3: { id: 3 } };
      const storeEvents = { 4: { id: 4 } };
      TEMPLATE_API_EVENT_UTILS.upsertEvent(props)(obj);
      expect(props.resaga.setValue.mock.calls[0][0].nodes(storeNodes)).toEqual({
        ...obj.node,
        ...storeNodes,
      });
      expect(
        props.resaga.setValue.mock.calls[0][0].events(storeEvents),
      ).toEqual({
        ...obj.events,
        ...storeEvents,
      });
    });

    it('not upserts', () => {
      const props = { resaga: { setValue: jest.fn() } };
      const obj = {};
      TEMPLATE_API_EVENT_UTILS.upsertEvent(props)(obj);
      expect(props.resaga.setValue).toBeCalled();
    });
  });

  describe('deleteEvent', () => {
    it('deletes correctly', () => {
      const id = 1;
      const dataId = 2;
      const templateId = 3;
      const props = { resaga: { setValue: jest.fn() } };
      const payload = { templateId, id, dataId };
      TEMPLATE_API_EVENT_UTILS.deleteEvent(props)(null, payload);
      const storeNodes = { 3: { id: 3 }, [id]: { id } };
      // const storeEvents = { 4: { id: 4 }, [dataId]: { id: dataId } };
      expect(props.resaga.setValue.mock.calls[0][0].nodes(storeNodes)).toEqual({
        [id]: undefined,
        3: { id: 3 },
      });
      // expect(
      //   props.resaga.setValue.mock.calls[0][0].events(storeEvents),
      // ).toEqual({
      //   [dataId]: undefined,
      //   4: { id: 4 },
      // });
    });
  });

  describe('upsertFlightBooking', () => {
    it('upserts correctly', () => {
      const id = 1;
      const props = { resaga: { setValue: jest.fn() } };
      const obj = { flightBookings: { [id]: { id } } };
      const storeFlightBookings = { 2: { id: 2 } };
      const storeFlightBookingIds = [3];
      TEMPLATE_API_EVENT_UTILS.upsertFlightBooking(props)(obj);
      expect(
        props.resaga.setValue.mock.calls[0][0].flightBookings(
          storeFlightBookings,
        ),
      ).toEqual({
        ...obj.flightBookings,
        ...storeFlightBookings,
      });
      expect(
        props.resaga.setValue.mock.calls[0][0].flightBookingIds(
          storeFlightBookingIds,
        ),
      ).toEqual([...storeFlightBookingIds, id]);
    });

    it('not upserts', () => {
      const props = { resaga: { setValue: jest.fn() } };
      const obj = {};
      TEMPLATE_API_EVENT_UTILS.upsertFlightBooking(props)(obj);
      expect(props.resaga.setValue).toBeCalled();
    });
  });

  describe('deleteFlightBooking', () => {
    it('deletes correctly', () => {
      const dataId = 2;
      const props = { resaga: { setValue: jest.fn() } };
      const payload = { dataId };
      TEMPLATE_API_EVENT_UTILS.deleteFlightBooking(props)(null, payload);
      const storeFlightBookings = { 3: { id: 3 }, [dataId]: { id: dataId } };
      const storeFlightBookingIds = [2, 4];
      expect(
        props.resaga.setValue.mock.calls[0][0].flightBookings(
          storeFlightBookings,
        ),
      ).toEqual({
        3: { id: 3 },
      });
      expect(
        props.resaga.setValue.mock.calls[0][0].flightBookingIds(
          storeFlightBookingIds,
        ),
      ).toEqual([4]);
    });
  });
});
