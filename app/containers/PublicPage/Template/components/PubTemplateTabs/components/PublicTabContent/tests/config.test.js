import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import { TEMPLATE_MANAGEMENT_DATASTORE, NODE_STORE } from 'appConstants';
import { requests } from 'utils/request';
import { CONFIG as config } from 'resaga';
import { CONFIG, FETCH_PUB_TAB, Normalize } from '../config';

describe('Config Test', () => {
  describe('processResult', () => {
    beforeEach(() => {
      arrays.convert = jest.fn();
      arrays.setIndex = jest.fn(() => ({ tab: {} }));
      Normalize.normalize = jest.fn(() => ({
        result: { 1: 1, 2: 2 },
        entities: { someTable: {} },
      }));
    });
    it('call processResult type=tabtimeline', () => {
      expect(CONFIG.processResult[FETCH_PUB_TAB]).toBeDefined();
      const result = CONFIG.processResult[FETCH_PUB_TAB]({
        type: 'tabtimeline',
        children: [],
      });
      expect(result).toEqual({
        ids: { 1: 1, 2: 2 },
        nodes: {},
        someTable: {},
      });
    });
    it('call processResult type=tabother', () => {
      expect(CONFIG.processResult[FETCH_PUB_TAB]).toBeDefined();
      const result = CONFIG.processResult[FETCH_PUB_TAB]({
        type: 'tabother',
        children: [],
      });
      expect(result).toEqual({
        ids: { 1: 1, 2: 2 },
        nodes: {},
        someTable: {},
      });
    });
    it('call processResult type=tabgallery', () => {
      expect(CONFIG.processResult[FETCH_PUB_TAB]).toBeDefined();
      const result = CONFIG.processResult[FETCH_PUB_TAB]({
        type: 'tabgallery',
        children: [],
      });
      expect(result).toEqual({
        ids: { 1: 1, 2: 2 },
        nodes: {},
        someTable: {},
      });
    });
    it('call processResult with type is not timeline', () => {
      expect(CONFIG.processResult[FETCH_PUB_TAB]).toBeDefined();
      const result = CONFIG.processResult[FETCH_PUB_TAB]({
        type: '',
        children: [],
      });
      expect(result).toEqual({ ids: undefined, nodes: {} });
    });
  });
  describe('onSubmit', () => {
    it('submit INSERT_BEFORE', () => {
      requests.fetchWithURL = jest.fn();
      CONFIG[config.SUBMIT][FETCH_PUB_TAB]({ hashkey: 'abcd', id: 1 });
      expect(requests.fetchWithURL).toBeCalledWith(
        'get',
        '/pub/template/abcd/tab/1',
      );
    });
  });
  describe('value', () => {
    it('tab', () => {
      expect(CONFIG.value.tab({ tabId: 1 })).toEqual(
        NODE_STORE_SELECTORS.node({ id: 1 }),
      );
    });
    describe('sectionIds', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.sectionIds).toBe('function');
      });

      it('should return correct value', () => {
        expect(CONFIG.value.sectionIds({ tabId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'children',
        ]);
      });
    });
  });
  describe('set value', () => {
    it('should have correct setvalue', () => {
      expect(CONFIG.setValue.tabId).toEqual([
        TEMPLATE_MANAGEMENT_DATASTORE,
        'tabId',
      ]);
    });
  });
});
