import {
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  NODE_STORE,
  ATTACHMENT_DATASTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ability } from 'apis/components/Ability/ability';
import { CONFIG, ATTACHMENT_CONFIG } from '../config';

describe('Section/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof ATTACHMENT_CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('exist', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.exist).toBe('function');
        expect(CONFIG.value.exist({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'id',
        ]);
      });
    });

    describe('dirty', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.dirty).toBe('object');
        const { keyPath, getter } = CONFIG.value.dirty;

        expect(typeof keyPath).toBe('function');
        expect(typeof getter).toBe('function');

        expect(keyPath({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
        ]);
        expect(getter({ id: 123 })).toEqual(false);
        expect(getter({ id: 123, content: 'abc' })).toEqual(true);
      });
    });

    describe('editLocation', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.editLocation).toBe('function');

        expect(CONFIG.value.editLocation({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'editLocation',
        ]);
      });
    });

    describe('icon', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.icon).toBe('function');

        expect(CONFIG.value.icon({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'icon',
        ]);
      });
    });

    describe('placeId', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.placeId).toBe('function');

        expect(CONFIG.value.placeId({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'placeId',
        ]);
      });
    });

    describe('timeZoneId', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.timeZoneId).toBe('function');

        expect(CONFIG.value.timeZoneId({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'timeZoneId',
        ]);
      });
    });

    describe('description', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.description).toBe('function');

        expect(CONFIG.value.description({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'description',
        ]);
      });
    });

    describe('url', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.url).toBe('function');

        expect(CONFIG.value.url({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'url',
        ]);
      });
    });

    describe('attachmentId', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.attachmentId).toBe('function');

        expect(CONFIG.value.attachmentId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'attachment',
        ]);
      });
    });

    describe('attachment', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.attachment).toBe('function');

        expect(CONFIG.value.attachment({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'attachment',
        ]);
      });
    });

    describe('attachmentDescription', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.attachmentDescription).toBe('function');

        expect(CONFIG.value.attachmentDescription({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'attachmentDescription',
        ]);
      });
    });

    describe('photoId', () => {
      it('should exists', () => {
        expect(CONFIG.value.photoId({ id: 999 })).toEqual(
          NODE_STORE_SELECTORS.photoId({ id: 999 }),
        );
      });
    });

    describe('photo', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.photo).toBe('function');

        expect(CONFIG.value.photo({ id: 999 })).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editSections',
          999,
          'photo',
        ]);
      });
    });

    describe('ATTACHMENT_CONFIG value', () => {
      it('should have attachmentURL', () => {
        expect(
          ATTACHMENT_CONFIG.value.attachmentURL({ attachmentId: 999 }),
        ).toEqual([ATTACHMENT_DATASTORE, 'attachments', 999, 'url']);
      });
    });
    describe('batchEditing', () => {
      it('keypath', () => {
        expect(typeof CONFIG.value.batchEditing).toBe('object');
        expect(CONFIG.value.batchEditing.keyPath({ id: 1 })).toEqual([
          [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections', 1, 'id'],
          NODE_STORE_SELECTORS.createdBy,
        ]);
      });
      it('getter: should return the id when new activity', () => {
        ability.can = jest.fn(() => true);
        expect(
          CONFIG.value.batchEditing.getter(1, 0, { id: 1, isPublic: false }),
        ).toEqual(1);
      });
      it('getter: should return the batchEditing value when activity is not new', () => {
        ability.can = jest.fn(() => true);
        expect(
          CONFIG.value.batchEditing.getter(0, 1, { id: 1, isPublic: false }),
        ).toEqual(0);
      });
      it('getter: should return the batchEditing value when activity null', () => {
        ability.can = jest.fn(() => false);
        expect(
          CONFIG.value.batchEditing.getter(0, 1, { id: 1, isPublic: false }),
        ).toEqual(null);
      });
    });
  });
});
