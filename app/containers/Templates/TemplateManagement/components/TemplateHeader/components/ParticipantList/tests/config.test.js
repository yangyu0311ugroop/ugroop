import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_1, CONFIG_2 } from '../config';

describe('containers/Templates/TemplateHeader/ParticipantList/config', () => {
  describe('CONFIG_1', () => {
    it('exists', () => {
      expect(CONFIG_1).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const { value } = CONFIG_1();
        expect(value.myId).toEqual(COGNITO_STORE_SELECTORS.myId);
      });
      it('has participantIds', () => {
        const { value } = CONFIG_1();
        expect(value.participantIds({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.calculatedParticipants({ id: 1 }),
        );
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
        expect(value.people).toEqual(
          NODE_STORE_SELECTORS.filterByStatuses({
            ids: 'participantIds',
            statuses: [PARTICIPANT_STATUSES.confirmed],
          }),
        );
        expect(value.participantListViewOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.open,
        );
        expect(value.participantCreateOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
        );
        expect(value.participantCreateParentNodeId).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE
            .parentNodeId,
        );
        expect(value.participantViewOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
        );
        expect(value.participantViewId).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.id,
        );
      });

      describe('peopleTabIndex', () => {
        describe('keyPath', () => {
          it('should match snapshot for keypath', () => {
            const { value } = CONFIG_2();
            const result = value.peopleTabIndex.keyPath({ templateId: 1 });

            expect(result).toMatchSnapshot();
          });
        });

        describe('cacheKey', () => {
          it('should match snapshot for cacheKey', () => {
            const { value } = CONFIG_2();
            const result = value.peopleTabIndex.cacheKey({ templateId: 1 });

            expect(result).toMatchSnapshot();
          });
        });

        describe('props', () => {
          it('should only return peopleTabId', () => {
            const { value } = CONFIG_2();
            const result = value.peopleTabIndex.props({ peopleTabId: 1 });

            expect(result).toBe(1);
          });
        });

        describe('getter', () => {
          it('should return index of peoepleTabId in calculatedVisibleChildren', () => {
            const { value } = CONFIG_2();
            const result = value.peopleTabIndex.getter([3, 1, 2], 1);

            expect(result).toBe(1);
          });

          it('should not explode', () => {
            const { value } = CONFIG_2();
            const result = value.peopleTabIndex.getter(undefined, 1);

            expect(result).toBe(-1);
          });
        });
      });
    });

    describe('#setValue', () => {
      it('contains required properties', () => {
        const { setValue } = CONFIG_2();
        expect(setValue.participantListViewOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.open,
        );
        expect(setValue.participantListViewModeList).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.MODE.list,
        );
        expect(setValue.participantCreateOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
        );
        expect(setValue.participantViewOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
        );
      });
    });
  });
});
