import {
  CONFIRM_INVITATION,
  DECLINE_INVITATION,
  GET_SHARED_TEMPLATES,
} from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import upsertHelpers from 'utils/helpers/upsertStore';
import { requests } from 'utils/request';
import { DEFAULT_LIMIT } from 'containers/Templates/constants';
import { CONFIG, helpers } from '../config';

describe('NodeShare/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('helpers', () => {
    describe('normaliseConfirmInvitation', () => {
      it('upserts correctly', () => {
        DATASTORE_UTILS.upsertObject = jest.fn((...args) => [
          'upsertObject',
          ...args,
        ]);
        upsertHelpers.array = jest.fn((...args) => ['array', ...args]);
        const obj = {
          nodeShare: {
            notificationToken: 'notificationToken',
            status: 'status',
            updatedAt: 'updatedAt',
          },
          userNodes: { userNode: { id: 1 } },
        };
        expect(helpers.normaliseConfirmInvitation(obj)).toMatchSnapshot();
      });
    });

    describe('normaliseDeclineInvitation', () => {
      it('upserts correctly', () => {
        DATASTORE_UTILS.upsertObject = jest.fn((...args) => [
          'upsertObject',
          ...args,
        ]);
        upsertHelpers.array = jest.fn((...args) => ['array', ...args]);
        const obj = {
          notificationToken: 'notificationToken',
          status: 'status',
          updatedAt: 'updatedAt',
        };
        expect(helpers.normaliseDeclineInvitation(obj)).toMatchSnapshot();
      });
    });
  });

  describe('requests', () => {
    it('should call fetchWithAuthorisation', () => {
      requests.fetchWithAuthorisation = jest.fn();

      CONFIG.requests[CONFIRM_INVITATION]({
        token: 'some token',
        content: 'some content',
      });
      CONFIG.requests[DECLINE_INVITATION]({
        token: 'some token',
        content: 'some content',
      });

      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });
    describe('GET_SHARED_TEMPLATES', () => {
      it('should call fetch request given a url if page selected is sharedToMe', () => {
        const param = {
          pageSelected: 'shareToMe',
          offset: 0,
          sortOrder: 'desc',
          sortField: 'createdBy',
        };
        CONFIG.requests[GET_SHARED_TEMPLATES](param);
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/nodeshares/sharedToMe?offset=${
            param.offset
          }&limit=${DEFAULT_LIMIT}&sortby=${param.sortField}:${
            param.sortOrder
          },id`,
        );
      });

      it('should call fetch request given a url if page selected is not sharedToMe', () => {
        const param = {
          pageSelected: 'shareFromMe',
          offset: 0,
          sortOrder: 'desc',
          sortField: 'createdBy',
        };
        CONFIG.requests[GET_SHARED_TEMPLATES](param);
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/nodeshares/sharedFromMe?offset=${
            param.offset
          }&limit=${DEFAULT_LIMIT}&sortby=${param.sortField}:${
            param.sortOrder
          },id`,
        );
      });

      it('should use page payload if page is present for the limit', () => {
        const param = {
          pageSelected: 'shareFromMe',
          offset: 0,
          sortOrder: 'desc',
          sortField: 'createdBy',
          page: 1,
        };
        CONFIG.requests[GET_SHARED_TEMPLATES](param);
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/nodeshares/sharedFromMe?offset=${
            param.offset
          }&limit=${DEFAULT_LIMIT * 2}&sortby=${param.sortField}:${
            param.sortOrder
          },id`,
        );
      });
    });
  });
  describe('value', () => {
    it('tourAbilities', () => {
      expect(CONFIG.value.tourAbilities.isEqual()).toBe(true);
    });
  });
  describe('processResult', () => {
    describe('GET_SHARED_TEMPLATES', () => {
      it('should normalize the param passed to it by resaga request', () => {
        DATASTORE_UTILS.upsertObject = jest.fn((...args) => [
          'upsertObject',
          ...args,
        ]);
        CONFIG.processResult[GET_SHARED_TEMPLATES]({
          nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
          orgList: [],
          userNodes: [],
          users: [],
        });
        expect(DATASTORE_UTILS.upsertObject).toHaveBeenCalled();
      });
    });
  });
  describe('helpers', () => {});
});
