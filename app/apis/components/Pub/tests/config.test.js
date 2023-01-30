import {
  GET_PUB_TEMPLATE_EVENTS,
  GET_PUB_TEMPLATE_PEOPLE,
  GET_PUB_TEMPLATE_TIMES,
  GET_PUB_TEMPLATE_TREE,
  GET_PUB_TEMPLATE_TAB,
  GET_PUB_TEMPLATE_HEADER,
  BATCH_GET_PUB_TEMPLATE_TAB,
  PUB_CREATE_INTEREST,
  GET_DETAILS,
} from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG, convertChildren } from '../config';
import { NODE_API_UTILS } from '../../Node/utils';

jest.mock('dot-prop-immutable', () => ({
  set: () => ({ id: 1 }),
}));

describe('apis/Pub/config', () => {
  requests.fetchWithURL = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('#requests', () => {
    it('still matches snapshot', () => {
      CONFIG.requests[GET_PUB_TEMPLATE_EVENTS]({ hashkey: 'abcd' });
      CONFIG.requests[GET_PUB_TEMPLATE_PEOPLE]({ hashkey: 'abcd' });
      CONFIG.requests[GET_PUB_TEMPLATE_TIMES]({ hashkey: 'abcd', ids: [1] });
      CONFIG.requests[GET_PUB_TEMPLATE_TIMES]({ hashkey: 'abcd', ids: [] });
      CONFIG.requests[GET_PUB_TEMPLATE_TREE]({ hashkey: 'abcd' });
      CONFIG.requests[GET_PUB_TEMPLATE_HEADER]({ hashkey: 'abcd' });
      CONFIG.requests[GET_PUB_TEMPLATE_TAB]({ hashkey: 'abcd' });
      CONFIG.requests[PUB_CREATE_INTEREST]({ hashkey: 'abcd', data: 'data' });
      CONFIG.requests[GET_DETAILS]({});
      CONFIG.requests[GET_DETAILS]({
        userIds: [10, 11],
        organisationIds: [22, 33],
      });
      expect(requests.fetchWithURL.mock.calls).toMatchSnapshot();
    });
  });

  describe('#processError', () => {
    it('processes correctly', () => {
      const errorMsg = 'Test error message';
      expect(
        CONFIG.processError({
          response: { error: { headers: { error: errorMsg } } },
        }),
      ).toEqual(errorMsg);
      expect(
        CONFIG.processError({ response: { error: { message: errorMsg } } }),
      ).toEqual(errorMsg);
      const otherError = { other: { format: errorMsg } };
      expect(CONFIG.processError(otherError)).toEqual(otherError);
    });
  });

  describe('processResult', () => {
    it('should process result of GET_PUB_TEMPLATE_HEADER', () => {
      NODE_API_UTILS.getGalleryId = jest.fn(() => 11);
      NODE_API_UTILS.getTimelineId = jest.fn(() => 12);
      const template = {
        content: 'content',
        id: 1,
        customData: {
          shortDescription: 'shortDescription',
        },
      };

      CONFIG.processResult[GET_PUB_TEMPLATE_HEADER](template);
    });
    it('should process result of GET_PUB_TEMPLATE_TAB', () => {
      const type = 'tabother';
      const id = 1;
      const children = {
        0: {
          content: 'content',
          type: 'activity',
          parentNodeId: 2,
        },
      };

      CONFIG.processResult[GET_PUB_TEMPLATE_TAB](
        { type, children, id },
        { templateId: 1 },
      );
    });
    it('should process the result of BATCH_GET_PUB_TEMPLATE_TAB', () => {
      const result = [
        { content: '1', id: 1 },
        { content: '2', id: 2 },
        { content: '3', id: 3 },
      ];
      expect(
        CONFIG.processResult[BATCH_GET_PUB_TEMPLATE_TAB](result, {}),
      ).toMatchSnapshot();
    });
    it('should process the result of PUB_CREATE_INTEREST', () => {
      const getHashKeyDescription = {
        1: {
          haskeyDescription: 'abcd' || null,
        },
      };
      CONFIG.processResult[PUB_CREATE_INTEREST](getHashKeyDescription);
      expect(typeof CONFIG.processResult[PUB_CREATE_INTEREST]()).toBe('object');
    });

    it('should process the result of GET_DETAILS', () => {
      const data = {
        persons: [
          { userId: 11, photo: [{ url: 'url' }], knownAs: 'Test 11' },
          { userId: 12, photo: [{ url: 'url2' }], knownAs: 'Test 12' },
        ],
        organisations: [
          {
            id: 22,
            photo: [{ url: 'url22' }],
            location: { location: 'location22' },
          },
          {
            id: 33,
            photo: [{ url: 'url33' }],
            location: { location: 'location33' },
          },
        ],
      };
      expect(CONFIG.processResult[GET_DETAILS](data)).toMatchSnapshot();
    });

    it('should process the result of GET_DETAILS', () => {
      expect(CONFIG.processResult[GET_DETAILS]({})).toMatchSnapshot();
    });
  });

  describe('convertChildren', () => {
    it('should convert children', () => {
      const children = { 1: '1', 2: '2', 3: '3' };
      convertChildren()(children);
    });
  });

  describe('BATCH_GET_PUB_TEMPLATE_TAB', () => {
    it('should call multiple fetchWithAuthorisation with particular parameter', () => {
      requests.fetchWithURL = jest.fn();
      const mockTabs = [
        {
          id: 1,
          type: 'tabtimeline',
        },
        {
          id: 2,
          type: 'tabtother',
        },
        {
          id: 3,
          type: 'tabother',
        },
      ];
      CONFIG.requests[BATCH_GET_PUB_TEMPLATE_TAB]({
        hashkey: 'hashkey',
        items: mockTabs,
      });
      expect(requests.fetchWithURL).toBeCalled();
    });
  });
});
