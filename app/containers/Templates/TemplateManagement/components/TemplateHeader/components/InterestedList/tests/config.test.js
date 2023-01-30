import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { INTERESTED_PERSON_STATUSES } from 'utils/constants/nodes';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_1, CONFIG_2 } from '../config';

describe('containers/Templates/TemplateHeader/InterestedList/config', () => {
  describe('CONFIG_1', () => {
    it('exists', () => {
      expect(CONFIG_1).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        NODE_STORE_SELECTORS.filterByStatuses = jest.fn((...args) => [
          'filterByStatuses',
          ...args,
        ]);
        const { value } = CONFIG_1();
        expect(value.people).toEqual(
          NODE_STORE_SELECTORS.filterByStatuses({
            ids: 'interestedPersonIds',
            statuses: [INTERESTED_PERSON_STATUSES.pending],
          }),
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
        NODE_STORE_SELECTORS.sortByProp = jest.fn((...args) => [
          'sortByProp',
          ...args,
        ]);
        const { value } = CONFIG_2();
        expect(value.people).toEqual(
          NODE_STORE_SELECTORS.sortByProp({
            ids: 'people',
          }),
        );
        expect(value.interestedListViewOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.open,
        );
        expect(value.interestedPersonCreateOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
        );
        expect(value.interestedPersonViewOpen).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
        );
        expect(value.interestedPersonViewId).toEqual(
          TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.id,
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
        });
      });
    });

    describe('#setValue', () => {
      const { value } = CONFIG_2();
      expect(value.interestedListViewOpen).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.open,
      );
      expect(value.interestedPersonCreateOpen).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
      );
      expect(value.interestedPersonViewOpen).toEqual(
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
      );
    });
  });
});
