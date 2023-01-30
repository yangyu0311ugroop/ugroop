import {
  TEMPLATE,
  FOLDER,
  TAB_GALLERY,
  TAB_TIMELINE,
  TAB_OTHER,
  TAB_PEOPLE,
} from 'utils/modelConstants';
import { NODE_API_UTILS } from '../utils';

describe('Node/utils', () => {
  describe('createNodeData', () => {
    it('should construct a node data for template', () => {
      const data = {
        cloneId: 1,
        createdBy: 2,
        lastModifiedBy: 2,
        customData: {
          shortDescription: 'qqq',
          duration: 2,
        },
        content: 'aaa',
      };

      expect(NODE_API_UTILS.createNodeData(TEMPLATE, data)).toMatchSnapshot();
    });
    it('should return empty object if node type is not supported', () => {
      const data = {
        cloneId: 1,
        createdBy: 2,
        lastModifiedBy: 2,
        customData: {
          shortDescription: 'qqq',
          duration: 2,
        },
        content: 'aaa',
      };

      expect(NODE_API_UTILS.createNodeData('qqq', data)).toMatchSnapshot();
    });

    it('should return something if type is folder', () => {
      const data = {
        cloneId: 1,
        other: 'other',
      };
      expect(NODE_API_UTILS.createNodeData(FOLDER, data)).toMatchSnapshot();
    });

    describe('upsertCalculatedTimes', () => {
      it('upserts correctly', () => {
        const props = { resaga: { setValue: jest.fn() } };
        const nodes = { id: 1 };
        const store = { y: 2 };
        NODE_API_UTILS.upsertCalculatedTimes(props)(nodes);
        expect(props.resaga.setValue.mock.calls[0][0].nodes(store)).toEqual({
          id: 1,
          y: 2,
        });
      });
    });
  });

  describe('upsertActivityData', () => {
    it('should return something if there is a photo and an attachment', () => {
      const node = {
        customData: {
          photo: 'photo',
          metaInfo: {
            x: 1,
            y: 1,
            height: 1,
            width: 1,
            rotate: 1,
          },
          attachment: {
            description: 'description',
          },
        },
      };
      const payload = {
        node: {
          customData: {
            photo: 'photo',
            metaInfo: {
              x: 1,
              y: 1,
              height: 1,
              width: 1,
              rotate: 1,
            },
          },
          attachment: {
            description: 'description',
          },
        },
      };

      expect(
        NODE_API_UTILS.upsertActivityData(node, payload),
      ).toMatchSnapshot();
    });
    it('should return something if there is only a photo', () => {
      const node = {
        customData: {
          photo: 'photo',
          metaInfo: {
            x: 1,
            y: 1,
            height: 1,
            width: 1,
            rotate: 1,
          },
          attachment: {
            description: 'description',
          },
        },
      };
      const payload = {
        node: {
          customData: {
            photo: 'photo',
            metaInfo: {
              x: 1,
              y: 1,
              height: 1,
              width: 1,
              rotate: 1,
            },
          },
        },
      };

      expect(
        NODE_API_UTILS.upsertActivityData(node, payload),
      ).toMatchSnapshot();
    });
    it('should return something if there is only an attachment', () => {
      const node = {
        customData: {
          attachment: {
            description: 'description',
          },
        },
      };
      const payload = {
        node: {
          customData: {},
          attachment: {
            description: 'description',
          },
        },
      };

      expect(
        NODE_API_UTILS.upsertActivityData(node, payload),
      ).toMatchSnapshot();
    });
    it('should return something if there is no attachment and photo', () => {
      const node = {
        customData: {},
      };
      const payload = {
        node: {
          customData: {},
        },
      };
      expect(
        NODE_API_UTILS.upsertActivityData(node, payload),
      ).toMatchSnapshot();
    });
  });

  describe('getGalleryId()', () => {
    it('should return -1', () => {
      expect(NODE_API_UTILS.getGalleryId()).toBe(-1);
    });

    it('should return id', () => {
      expect(
        NODE_API_UTILS.getGalleryId({
          children: [
            { type: TAB_TIMELINE, id: 1 },
            { type: TAB_GALLERY, id: 2 },
          ],
        }),
      ).toBe(2);
    });
  });

  describe('getTimelineId()', () => {
    it('should return -1', () => {
      expect(NODE_API_UTILS.getTimelineId()).toBe(-1);
    });

    it('should return id', () => {
      expect(
        NODE_API_UTILS.getTimelineId({
          children: [
            { type: TAB_TIMELINE, id: 1 },
            { type: TAB_GALLERY, id: 2 },
          ],
        }),
      ).toBe(1);
    });
  });
  describe('getPeopleTabId', () => {
    it('should return -1 if template children does not contain tabpeople', () => {
      expect(NODE_API_UTILS.getPeopleTabId()).toBe(-1);
    });

    it('should return id of the tabother with tabpeople as subtype', () => {
      const template = {
        children: [
          { type: TAB_OTHER, id: 1, customData: {} },
          { type: TAB_GALLERY, id: 2, customData: {} },
          { type: TAB_OTHER, id: 3, customData: { subtype: TAB_PEOPLE } },
        ],
      };

      expect(NODE_API_UTILS.getPeopleTabId(template)).toBe(3);
    });
  });
});
