import { PHOTO_PREVIEW } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PORTAL_HELPERS, PORTAL_DATA_ID_SELECTOR } from '../helpers';

describe('PORTAL_HELPERS', () => {
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof PORTAL_HELPERS).toBe('object');
    });
  });

  describe('openPortal', () => {
    it('should call setValue', () => {
      expect(
        PORTAL_HELPERS.openPortal(PHOTO_PREVIEW)(
          { thisId: 9999 },
          { resaga },
          0,
          2233,
        ),
      ).toBe(2233);

      TEST_HELPERS.expectCalled(resaga.setValue);
    });

    it('should use dialogId', () => {
      expect(
        PORTAL_HELPERS.openPortal(PHOTO_PREVIEW)(
          { thisId: 9999 },
          { resaga },
          3344,
        ),
      ).toBe(3344);
    });
  });

  describe('closePortal', () => {
    it('should call setValue', () => {
      PORTAL_HELPERS.closePortal(1122, { resaga });

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('confirmDeletePhoto', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmDeletePhoto({}, { resaga });

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('confirmCancelUploadPhotos', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmCancelUploadPhotos({}, { resaga });

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('promptEventAdded', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.promptEventAdded({}, { resaga });

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('PORTAL_DATA_ID_SELECTOR', () => {
    it('should return PORTAL_DATA_ID_SELECTOR', () => {
      TEST_HELPERS.expectMatchSnapshot(PORTAL_DATA_ID_SELECTOR, [
        { portalId: 2233 },
      ]);
    });
  });

  describe('confirmCancelUploadPhotos', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmCancelAddRoute({});

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('confirmCancelAddRoute', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmCancelAddRoute({});

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('confirmDeleteRoute', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmDeleteRoute({});

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('confirmDeleteBooking', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmDeleteBooking({});

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('confirmDelete', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmDelete({});

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('confirmCustom', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmCustom({});

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });

  describe('openCloneMarketTemplate', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.openCloneMarketTemplate({}, { resaga });

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('openCreateTourEmail', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.openCreateTourEmail({}, { resaga });

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('openLeaveChannelDialog,', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.openLeaveChannelDialog({}, { resaga });

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('openDeleteChannelDialog,', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.openDeleteChannelDialog({}, { resaga });

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('close', () => {
    it('should call LOGIC_HELPERS.ifFunction', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();

      PORTAL_HELPERS.close({});

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifFunction);
    });
  });
  describe('confirmCancelTransfer', () => {
    it('should call PORTAL_HELPERS.prompt', () => {
      PORTAL_HELPERS.prompt = jest.fn();

      PORTAL_HELPERS.confirmCancelTransfer({});

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.prompt);
    });
  });
});
