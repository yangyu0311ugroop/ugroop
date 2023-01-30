import { CONFIG, CONFIG2, CONFIG3 } from '../config';

describe('Checkgroups/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    it('eventObjIds.getter', () => {
      expect(typeof CONFIG.value.eventObjIds.getter({})).toBe('object');
    });
    it('eventObjIds.getter', () => {
      expect(typeof CONFIG.value.eventObjIds.getter({ events: [1, 2] })).toBe(
        'object',
      );
    });
  });
  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.value).toBe('object');
    });
  });
  describe('value.values', () => {
    it('values.keypath', () => {
      expect(typeof CONFIG2.value.values.keyPath({ sectionIds: [1, 2] })).toBe(
        'object',
      );
    });
    it('values.getter', () => {
      expect(typeof CONFIG2.value.values.getter(1, 1, [2, 1])).toBe('object');
    });
  });
  describe('value.values', () => {
    it('values.getter', () => {
      expect(typeof CONFIG2.value.attachmentIds.getter([2, 1])).toBe('object');
    });
  });
});
describe('value', () => {
  it('should exists', () => {
    expect(typeof CONFIG3.value).toBe('object');
  });
});
describe('value.values', () => {
  it('values.keypath', () => {
    expect(
      typeof CONFIG3.value.eventValues.keyPath({ eventDataIds: [1, 2] }),
    ).toBe('object');
  });
  it('values.getter', () => {
    expect(typeof CONFIG3.value.eventValues.getter(1, 1, [2, 1])).toBe(
      'object',
    );
  });
  it('values.cacheKey', () => {
    expect(
      typeof CONFIG3.value.eventValues.cacheKey({ eventDataIds: [1] }),
    ).toBe('string');
  });
  it('values.cacheKey', () => {
    expect(typeof CONFIG3.value.eventValues.cacheKey({})).toBe('string');
  });
});
describe('value.values', () => {
  it('values.getter', () => {
    expect(
      typeof CONFIG3.value.eventAttachmentsIds.getter({
        eventValues: [1, 2, 3],
      }),
    ).toBe('object');
  });
  it('values.getter', () => {
    CONFIG3.value.eventAttachmentsIds.getter({
      eventValues: [1, 2, [3]],
    });
  });
});
