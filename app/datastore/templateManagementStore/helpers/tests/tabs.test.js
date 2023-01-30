import arrays from 'datastore/templateManagementStore/helpers/arrays';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TAB_GALLERY, TEMPLATE } from 'utils/modelConstants';
import helpers from '../tabs';

describe('Tab helpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateChildren', () => {
    it('should updateChildren', () => {
      expect(
        helpers.updateChildren(1, [11, 12])({ 1: { children: [15] } }),
      ).toEqual({ 1: { children: [11, 12] } });
    });
  });

  describe('convertChildrenToArray', () => {
    it('converts children of timeline tab', () => {
      const makeEvent = (id, event) => ({
        id,
        type: 'event',
        nextNodes: [event],
        parentNodeId: 123,
      });
      const makeSection = (id, section) => ({
        id,
        type: 'activity',
        nextNodes: [section],
      });
      const makeDay = (id, day) => ({
        id,
        type: 'day',
        children: [
          makeEvent(id + 1, makeEvent(id + 2)),
          makeSection(id + 3, makeSection(id + 4)),
        ],
        nextNodes: [day],
      });
      const day2 = makeDay(11);
      delete day2.children[0];
      delete day2.children[1];

      expect(
        helpers.convertChildrenToArray('tabtimeline', [makeDay(1, day2)]),
      ).toMatchSnapshot();
    });
    it('converts children of default tab', () => {
      const makeSection = (id, section) => ({
        id,
        type: 'activity',
        nextNodes: [section],
      });
      const makeDay = (id, day) => ({
        id,
        type: 'day',
        children: [makeSection(id + 3, makeSection(id + 4))],
        nextNodes: [day],
      });
      const day2 = makeDay(11);
      delete day2.children[0];
      delete day2.children[1];

      expect(
        helpers.convertChildrenToArray('someothertabtype', [makeDay(1, day2)]),
      ).toMatchSnapshot();
    });

    it('should return TEMPLATE', () => {
      arrays.convertNextNodesToArray = jest.fn();

      helpers.convertChildrenToArray(TEMPLATE);

      TEST_HELPERS.expectCalled(arrays.convertNextNodesToArray);
    });

    it('should return TAB_GALLERY', () => {
      arrays.convertNextNodesToArray = jest.fn();

      helpers.convertChildrenToArray(TAB_GALLERY);

      TEST_HELPERS.expectCalled(arrays.convertNextNodesToArray);
    });
  });

  describe('moveChildren', () => {
    const tabs = { 1: { children: [11, 12, 13] } };

    it('should NOT moveChildren if tabId not exist', () => {
      expect(helpers.moveChildren(2)(tabs)).toEqual(tabs);
    });

    it('should moveChildren', () => {
      expect(helpers.moveChildren(1, 0, 2)(tabs)).toEqual({
        1: { children: [12, 13, 11] },
      });
    });
  });
  describe('moveRemoveChildren', () => {
    const node = { 1: { children: [11, 12, 13] } };

    it('should NOT moveRemoveChildren if tabId not exist', () => {
      expect(helpers.moveRemoveChildren(0, 1, 0, 2)(node)).toEqual(node);
    });

    it('should moveRemoveChildren', () => {
      expect(helpers.moveRemoveChildren(1, 1, 0, 2)(node)).toEqual({
        '1': { children: [12, 13] },
      });
    });
  });
});
