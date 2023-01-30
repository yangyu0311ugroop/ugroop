import { requests } from 'utils/request';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER,
} from 'containers/Templates/constants';
import {
  FOLDER_API,
  GET_PARENT_OF_FOLDER,
  GET_FOLDER_CHILDREN_WITH_PAGINATION,
  DELETE_CHILDREN_FROM_FOLDER,
  GET_FOLDER_TREE,
  BATCH_GET_FOLDER_TREE,
  GET_CHECKLISTS,
  GET_FOLDER_IMAGE,
} from 'apis/constants';
import { CONFIG } from '../config';

describe('Folder/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('requests', () => {
    beforeEach(() => {
      requests.fetchWithAuthorisation = jest.fn();
    });
    it('should exist', () => {
      expect(typeof CONFIG.requests).toBe('object');
    });
    it('should call fetchWithAuthorisation', () => {
      CONFIG.requests[GET_CHECKLISTS]({ id: 2233 });

      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });

    describe('GET_PARENT_OF_FOLDER', () => {
      it('should call api for fetching parents', () => {
        CONFIG.requests[GET_PARENT_OF_FOLDER](1);
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${FOLDER_API}/1/parents`,
        );
      });
    });

    describe('FETCH_FOLDER_CHLIDREN', () => {
      it('should call api for fetch folder children', () => {
        CONFIG.requests[GET_FOLDER_CHILDREN_WITH_PAGINATION]({ id: 1 });
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${FOLDER_API}/1/children?offset=${DEFAULT_OFFSET}&limit=${DEFAULT_LIMIT}&sortby=${DEFAULT_SORT_FIELD}:${DEFAULT_SORT_ORDER},id`,
        );
      });
    });

    describe('DELETE FOLDER', () => {
      it('should call api for deleting folder', () => {
        CONFIG.requests[DELETE_CHILDREN_FROM_FOLDER]({ id: 1 });
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'delete',
          `/${FOLDER_API}/1`,
        );
      });
    });

    describe('GET_FOLDER_TREE', () => {
      it('should call api for fetching all folders and its children folders given the folderId', () => {
        CONFIG.requests[GET_FOLDER_TREE]({ id: 1 });
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${FOLDER_API}/1/tree`,
        );
      });
    });

    describe('BATCH_GET_FOLDER_TREE', () => {
      it('should call api for fetching all folders and its children folders given the folderId', () => {
        CONFIG.requests[BATCH_GET_FOLDER_TREE]({ ids: [1, 2] });
        expect(requests.fetchWithAuthorisation).toBeCalled();
        expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
      });
    });

    describe('GET_FOLDER_IMAGE', () => {
      it('should call api for fetching all folders and its children folders given the folderId', () => {
        CONFIG.requests[GET_FOLDER_IMAGE]({ id: 1 });
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${FOLDER_API}/1/folderImage`,
        );
      });
    });
  });

  describe('processResult', () => {
    it('should exist', () => {
      expect(typeof CONFIG.processResult).toBe('object');
    });
  });
});
