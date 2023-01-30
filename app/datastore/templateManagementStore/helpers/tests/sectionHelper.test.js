import sectionHelper from '../sectionHelper';

describe('section helper', () => {
  const generatedId = 10;
  jest.spyOn(Date, 'now').mockImplementation(() => generatedId);

  describe('upsert', () => {
    let data;
    beforeAll(() => {
      data = {
        101: { id: 101, content: 'section1' },
      };
    });
    it('shall insert properly', () => {
      const result = sectionHelper.upsert(
        { id: 101, content: 'section101' },
        {},
      )(data);
      expect(result[101].content).toBe('section101');
    });
    it('shall insert properly', () => {
      const result = sectionHelper.upsert(
        { id: 101, content: 'section101' },
        {},
      )(undefined);
      expect(result[101].content).toBe('section101');
    });
    it('shall update properly', () => {
      const result = sectionHelper.upsert(
        { id: 102, content: 'section102' },
        { node: { other: 'abcd' } },
      )(data);
      expect(result[101].content).toBe('section1');
      expect(result[102].content).toBe('section102');
      expect(result[102].other).toBe('abcd');
    });
  });

  describe('remove', () => {
    let data;
    beforeAll(() => {
      data = {
        101: { id: 101, content: 'section1' },
      };
    });
    it('shall remove properly', () => {
      const result = sectionHelper.remove(101)(data);
      expect(result[101]).toBe(undefined);
    });
    it('shall do nothing if id is wrong', () => {
      const result = sectionHelper.remove(102)(data);
      expect(result[101]).not.toBeNull();
    });
  });

  describe('setPhoto', () => {
    let testingPhotoData;
    beforeAll(() => {
      testingPhotoData = {
        1: { id: 1, content: 'tab1', photos: [100] },
      };
    });
    it('should insert photo correctly', () => {
      const result = sectionHelper.setPhoto(1, [2])(testingPhotoData);
      expect(result['1'].photos).toEqual([2]);
    });
    it('should insert photo correctly with same children Id', () => {
      const result = sectionHelper.setPhoto(1, [100, 101])(testingPhotoData);
      expect(result['1'].photos).toEqual([100, 101]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = sectionHelper.setPhoto(-1, 1)(testingPhotoData);
      expect(result['1'].photos).toEqual([100]);
    });
  });

  describe('removePhotoById', () => {
    let testingPhotoData;
    beforeAll(() => {
      testingPhotoData = {
        1: { id: 1, content: 'tab1', photos: [100] },
      };
    });
    it('should insert photo correctly', () => {
      const result = sectionHelper.removePhotoById(1, 100)(testingPhotoData);
      expect(result['1'].photos).toEqual([]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = sectionHelper.removePhotoById(-1, 1)(testingPhotoData);
      expect(result['1'].photos).toEqual([100]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = sectionHelper.removePhotoById(1, 1)(testingPhotoData);
      expect(result['1'].photos).toEqual([100]);
    });
  });

  describe('setAttachment', () => {
    let testingAttachmentData;
    beforeAll(() => {
      testingAttachmentData = {
        1: { id: 1, content: 'tab1', attachment: 1 },
      };
    });
    it('should update attachment id correctly', () => {
      const newAttachmentId = 2;
      const result = sectionHelper.setAttachment(1, newAttachmentId)(
        testingAttachmentData,
      );
      expect(result['1'].attachment).toEqual(newAttachmentId);
    });
    it('should do nothing if child is the same', () => {
      const existingAttachmentId = testingAttachmentData['1'].attachment;
      const result = sectionHelper.setAttachment(1, existingAttachmentId)(
        testingAttachmentData,
      );
      expect(result['1'].attachment).toEqual(existingAttachmentId);
    });
    it('should not modify existing attachments if parent id is not found', () => {
      const result = sectionHelper.setAttachment(-1, 1)(testingAttachmentData);
      expect(result['1']).toEqual(result['1']);
    });
    it('should do nothing if parent id is not a number', () => {
      const result = sectionHelper.setAttachment(1, Number.NaN)(
        testingAttachmentData,
      );
      expect(result).toBe(testingAttachmentData);
    });
    it('should do nothing if id is not a number', () => {
      expect(
        sectionHelper.setAttachment(-1, 'some id')(testingAttachmentData),
      ).toEqual(testingAttachmentData);
    });
  });

  describe('removeAttachmentById', () => {
    let testingPhotoData;
    beforeAll(() => {
      testingPhotoData = {
        1: { id: 1, content: 'tab1', attachment: 100 },
      };
    });
    it('should insert photo correctly', () => {
      const result = sectionHelper.removeAttachmentById(1, 100)(
        testingPhotoData,
      );
      expect(result['1'].attachment).toEqual(undefined);
    });
    it('should do nothing if parent id is not found', () => {
      const result = sectionHelper.removeAttachmentById(-1, 1)(
        testingPhotoData,
      );
      expect(result['1'].attachment).toEqual(100);
    });
  });

  describe('makeSection', () => {
    it('should create section correctly', () => {
      const id = 1;
      const formData = {
        editContent: 'editContent',
        editLocation: 'editLocation',
      };
      expect(sectionHelper.makeSection(id, formData)).toEqual({
        id,
        content: formData.editContent,
        customData: { location: formData.editLocation },
        type: 'activity',
      });
    });

    it('should create section correctly if no editLocation', () => {
      const id = 1;
      const formData = { editContent: 'editContent' };
      expect(sectionHelper.makeSection(id, formData)).toEqual({
        id,
        content: formData.editContent,
        customData: {
          location: formData.editLocation,
          icon: '',
          placeId: '',
          timeZoneId: '',
        },
        type: 'activity',
      });
    });
  });

  describe('makeDescription', () => {
    it('should return description', () => {
      const description = 'description';
      expect(sectionHelper.makeDescription(description)).toEqual({
        customData: { description },
      });
    });
    it('should return empty', () => {
      expect(sectionHelper.makeDescription()).toEqual({});
    });
  });

  describe('makeUrl', () => {
    it('should return url', () => {
      const url = 'url';
      expect(sectionHelper.makeUrl(url)).toEqual({
        customData: { url },
      });
    });
    it('should return empty', () => {
      expect(sectionHelper.makeUrl()).toEqual({});
    });
  });

  describe('makeLocation', () => {
    it('should return icon and placeId', () => {
      expect(
        sectionHelper.makeLocation({
          editLocation: 'some location',
          icon: 'icon',
          placeId: 'placeId',
          timeZoneId: 'timeZoneId',
        }),
      ).toEqual({
        customData: {
          icon: 'icon',
          placeId: 'placeId',
          timeZoneId: 'timeZoneId',
        },
      });
    });
    it('should return empty', () => {
      expect(sectionHelper.makeLocation({})).toEqual({});
    });
  });

  describe('makePhoto', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('return null if photo is null means deleted', () => {
      expect(sectionHelper.makePhoto(null)).toEqual({
        customData: { photoId: null, photo: null, metaInfo: null },
        photos: [],
      });
    });
    it('return empty object when photo object is empty', () => {
      expect(sectionHelper.makePhoto({})).toEqual(null);
    });
    it('return customData if photo has id', () => {
      const photo = { id: 1, content: 'photo', metaInfo: 'metaInfo' };
      expect(sectionHelper.makePhoto(photo)).toEqual({
        customData: {
          photoId: photo.id,
          photo: photo.content,
          metaInfo: photo.metaInfo,
        },
      });
    });
    it('return customData and generated photoId if photo has no id', () => {
      const photo = { content: 'photo', metaInfo: 'metaInfo' };
      expect(sectionHelper.makePhoto(photo)).toEqual({
        customData: {
          photoId: photo.id,
          photo: photo.content,
          metaInfo: photo.metaInfo,
        },
        photos: [generatedId],
      });
    });
  });

  describe('makeAttachment', () => {
    const parentNodeId = 1;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('return empty object when no attachment and no attachment description', () => {
      expect(sectionHelper.makeAttachment(parentNodeId, {}, {})).toEqual({
        canDelete: true,
        customData: {
          attachment: null,
        },
      });
    });
    it('return customData with generated attachment id if null attachmentId', () => {
      const attachment = { x: 1 };
      const dirtyData = { attachment, attachmentURL: 'url' };
      expect(sectionHelper.makeAttachment(parentNodeId, {}, dirtyData)).toEqual(
        {
          customData: { attachment: { parentNodeId, ...attachment } },
          attachment: generatedId,
        },
      );
    });
    it('return customData with createAttachment if null attachmentId w/ description', () => {
      const attachment = { x: 1 };
      const fileDescription = 'fileDescription';
      const dirtyData = { attachment, attachmentDescription: null };
      expect(
        sectionHelper.makeAttachment(
          parentNodeId,
          { fileDescription },
          dirtyData,
        ),
      ).toEqual({
        customData: {
          attachment: {
            description: fileDescription,
            parentNodeId,
            ...attachment,
          },
        },
        createAttachment: true,
      });
    });
    it('return customData with updated attachment id', () => {
      const attachmentId = 2;
      const attachment = { x: 1 };
      const attachmentDescription = 'attachmentDescription';
      const dirtyData = { attachmentId, attachment, attachmentDescription };
      expect(sectionHelper.makeAttachment(parentNodeId, {}, dirtyData)).toEqual(
        {
          customData: {
            attachment: {
              id: attachmentId,
              description: attachmentDescription,
              parentNodeId,
              ...attachment,
            },
          },
          attachment: attachmentId,
        },
      );
    });
  });

  describe('mergeAll', () => {
    it('should set key value', () => {
      const props = { x: 1 };
      expect(sectionHelper.mergeAll(props)).toEqual(props);
    });
  });

  describe('mergeAttachment', () => {
    it('should set key value', () => {
      expect(
        sectionHelper.mergeAttachment(1, { name: 'abc' })({
          2: { name: 'def' },
        }),
      ).toEqual({ 1: { name: 'abc' }, 2: { name: 'def' } });
    });

    it('should set default value', () => {
      expect(sectionHelper.mergeAttachment(1, { name: 'abc' })()).toEqual({
        1: { name: 'abc' },
      });
    });
  });

  describe('setAttachmentValue', () => {
    it('should set key value', () => {
      const { attachments } = sectionHelper.setAttachmentValue({
        attachment: 1,
        customData: { attachment: { name: 'abc' } },
      });
      expect(attachments({})).toEqual({ 1: { name: 'abc' } });
    });

    it('should return empty', () => {
      expect(sectionHelper.setAttachmentValue({ attachment: 0 })).toEqual({});
    });
  });
});
