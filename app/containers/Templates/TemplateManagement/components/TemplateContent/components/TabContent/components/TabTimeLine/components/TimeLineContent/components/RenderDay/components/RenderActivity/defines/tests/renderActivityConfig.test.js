import { CONFIG } from '../renderActivityConfig';

describe('Config Test', () => {
  const NODE_STORE = 'nodeStore';
  const testingData = {
    1: {
      id: 1,
      content: 'test01',
      children: [1, 2],
      photos: [1],
    },
    2: {
      id: 2,
      content: 'test01',
      children: [3, 4],
      photos: [2],
    },
    3: {
      id: 3,
      content: 'test01',
      children: [5, 6],
      photos: [3],
    },
  };

  describe('PhotoId Test', () => {
    describe('PhotoId', () => {
      it('KeyPath', () => {
        expect(CONFIG.value.photoId.keyPath).toEqual([NODE_STORE, 'nodes']);
      });
      it('getter correct data', () => {
        const id = CONFIG.value.photoId.getter(testingData, { activityId: 3 });
        expect(id).toEqual(3);
      });
      it('getter default value', () => {
        const id = CONFIG.value.photoId.getter(testingData, { activityId: -1 });
        expect(id).toEqual(0);
      });
      it('getter default value with index is out of bound', () => {
        const id = CONFIG.value.photoId.getter(testingData, { activityId: -2 });
        expect(id).toEqual(0);
      });
    });
  });

  describe('ActivityIds', () => {
    it('keyPath', () => {
      expect(CONFIG.value.activityIds.keyPath).toEqual([NODE_STORE, 'nodes']);
    });
    it('getter', () => {
      const data = { 1: { children: 'children' } };
      const props = { dayId: 1 };
      expect(CONFIG.value.activityIds.getter(data, props)).toEqual('children');
    });
  });

  describe('AttachmentId', () => {
    it('attachmentId', () => {
      expect(CONFIG.value.attachmentId({ activityId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'attachment',
      ]);
    });
  });

  describe('createdBy', () => {
    it('createdBy', () => {
      expect(CONFIG.value.createdBy({ activityId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'createdBy',
      ]);
    });
  });
});
