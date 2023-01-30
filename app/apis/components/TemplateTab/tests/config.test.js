import {
  BATCH_GET_TEMPLATE_TAB_DETAIL,
  GET_TEMPLATE_TAB_DETAIL,
  TEMPLATE_TAB_API,
} from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';

describe('TemplateTab/config.js', () => {
  beforeEach(() => {
    requests.fetchWithAuthorisation = jest.fn();
  });
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

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('GET_TEMPLATE_TAB_DETAIL', () => {
      it('should call request fetchWithAuthorisation with particular parameter', () => {
        const tab = { id: 1, type: 'tabtimeline' };
        CONFIG.requests[GET_TEMPLATE_TAB_DETAIL]({ tab });
        expect(requests.fetchWithAuthorisation).toBeCalledWith(
          'get',
          `/${TEMPLATE_TAB_API}/1/tabtimeline`,
        );
      });
      it('should processResult if there are children', () => {
        CONFIG.processResult[GET_TEMPLATE_TAB_DETAIL]({
          type: 'tabtimeline',
          id: 1,
          children: [1, 2, 3],
        });
      });
      it('should processResult if there are no children', () => {
        CONFIG.processResult[GET_TEMPLATE_TAB_DETAIL]({
          type: 'tabtimeline',
          id: 1,
          children: [],
        });
      });
      it('should processResult if there are no children with templateId', () => {
        CONFIG.processResult[GET_TEMPLATE_TAB_DETAIL](
          {
            type: 'tabtimeline',
            id: 1,
            children: [],
          },
          { templateId: 1 },
        );
      });
    });

    describe('BATCH_GET_TEMPLATE_TAB_DETAIL', () => {
      it('should call many fetchWithAuthorisation with particular parameter', () => {
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
        CONFIG.requests[BATCH_GET_TEMPLATE_TAB_DETAIL]({ tabs: mockTabs });
        expect(requests.fetchWithAuthorisation).toBeCalled();
        expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
      });
      it('should processResult of BATCH_GET_TEMPLATE_TAB_DETAIL', () => {
        const result = [
          { content: '1', id: 1 },
          { content: '2', id: 2 },
          { content: '3', id: 3 },
        ];
        expect(
          CONFIG.processResult[BATCH_GET_TEMPLATE_TAB_DETAIL](result),
        ).toMatchSnapshot();
      });
    });
  });
});
