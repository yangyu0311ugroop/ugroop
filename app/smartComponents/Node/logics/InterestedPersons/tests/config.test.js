import { INTERESTED_PERSON_STATUSES } from 'utils/constants/nodes';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { CONFIG_0, CONFIG_1, CONFIG_2, CONFIG_3 } from '../config';

describe('containers/Templates/Modals/InterestedList/config', () => {
  describe('CONFIG_0', () => {
    it('exists', () => {
      expect(CONFIG_0).toBeDefined();
    });
    it('value', () => {
      const { value } = CONFIG_0();
      expect(value.interestedPersonIds({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.interestedPeople({ id: 1 }),
      );
      expect(value.userNodes).toEqual(INVITATION_STORE_SELECTORS.userNodes);
    });
  });
  describe('CONFIG_1', () => {
    it('exists', () => {
      expect(CONFIG_1).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const { value } = CONFIG_1();
        const props = { interestedPersonIds: [1] };
        expect(value.statuses.keyPath).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER
            .complete,
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER
            .pending,
        ]);
        expect(value.statuses.cacheKey(props)).toMatchSnapshot();
        expect(value.statuses.cacheKey({})).toMatchSnapshot();
        expect(value.statuses.props(props)).toEqual(props.interestedPersonIds);
        expect(
          value.statuses.getter(false, false, props.interestedPersonIds),
        ).toEqual({
          filterComplete: false,
          filterPending: false,
          statuses: [],
          hasInterestedPersonIds: true,
        });
        expect(
          value.statuses.getter(true, true, props.interestedPersonIds),
        ).toEqual({
          filterComplete: true,
          filterPending: true,
          statuses: [
            INTERESTED_PERSON_STATUSES.complete,
            INTERESTED_PERSON_STATUSES.pending,
          ],
          hasInterestedPersonIds: true,
        });
        expect(value.statuses.getter(true, true)).toEqual({
          filterComplete: true,
          filterPending: true,
          statuses: [
            INTERESTED_PERSON_STATUSES.complete,
            INTERESTED_PERSON_STATUSES.pending,
          ],
          hasInterestedPersonIds: false,
        });
      });
      it('should have connectedNodeIds', () => {
        const { value } = CONFIG_1();
        const interestedPersonIds = [1];
        const userNodes = {
          0: { nodeId: 1 },
        };
        expect(
          value.connectedNodeIds.getter({
            interestedPersonIds,
            userNodes,
          }),
        ).toEqual([{ nodeId: 1 }]);
      });
      it('should have connectedNodeIds if i is undefined', () => {
        const { value } = CONFIG_1();
        const interestedPersonIds = [1];
        const userNodes = {};
        expect(
          value.connectedNodeIds.getter({
            interestedPersonIds,
            userNodes,
          }),
        ).toEqual([]);
      });

      it('should not crash if userNodes and interestedPersonIds is undefined', () => {
        const { value } = CONFIG_1();
        const interestedPersonIds = undefined;
        const userNodes = undefined;
        expect(
          value.connectedNodeIds.getter({
            interestedPersonIds,
            userNodes,
          }),
        ).toEqual([]);
      });
    });
  });

  describe('CONFIG_2', () => {
    it('exists', () => {
      expect(CONFIG_2).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        NODE_STORE_SELECTORS.filterByStatuses = jest.fn((...args) => [
          'filterByStatuses',
          ...args,
        ]);
        const { value } = CONFIG_2();
        expect(value.interestedPersonIds).toEqual(
          NODE_STORE_SELECTORS.filterByStatuses({
            ids: 'interestedPersonIds',
            statuses: 'statuses',
          }),
        );
      });
    });
  });

  describe('CONFIG_3', () => {
    it('exists', () => {
      expect(CONFIG_3).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        NODE_STORE_SELECTORS.sortByProp = jest.fn((...args) => [
          'sortByProp',
          ...args,
        ]);
        const { value } = CONFIG_3();
        expect(value.interestedPersonIds).toEqual(
          NODE_STORE_SELECTORS.sortByProp({
            ids: 'interestedPersonIds',
          }),
        );
      });
      it('unfilteredInterested', () => {
        const { value } = CONFIG_3();
        expect(value.unfilteredInterested({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.interestedPeople({ id: 1 }),
        );
      });
    });
  });
});
