import { CONFIG, CONFIG1, CONFIG2, CONFIG3 } from '../config';

describe('RateCount/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('config.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    describe('config.value.eventValues', () => {
      describe('#keyPath', () => {
        it('should exists', () => {
          expect(
            typeof CONFIG.value.eventValues.keyPath({ ids: [1, 2, 3] }),
          ).toBe('object');
        });
      });
      describe('#getter', () => {
        it('should qual to', () => {
          expect(CONFIG.value.eventValues.getter(1, 1, [2, 1])).toEqual([1, 1]);
        });
      });
      describe('#cacheKey', () => {
        it('should qual to', () => {
          expect(typeof CONFIG.value.eventValues.cacheKey([2, 1])).toBe(
            'string',
          );
        });
      });
    });
    describe('config.value.sectionValues', () => {
      describe('#keyPath', () => {
        it('should exists', () => {
          expect(
            typeof CONFIG.value.sectionValues.keyPath({ ids: [1, 2, 3] }),
          ).toBe('object');
        });
      });
      describe('#getter', () => {
        it('should qual to', () => {
          expect(CONFIG.value.sectionValues.getter(1, 1, [2, 1])).toEqual([
            1,
            1,
          ]);
        });
      });
      describe('#cacheKey', () => {
        it('should qual to', () => {
          expect(typeof CONFIG.value.sectionValues.cacheKey([2, 1])).toBe(
            'string',
          );
        });
      });
    });
    describe('config.value.eventNodeValues', () => {
      describe('#keyPath', () => {
        it('should exists', () => {
          expect(
            typeof CONFIG.value.eventNodeValues.keyPath({ ids: [1, 2, 3] }),
          ).toBe('object');
        });
      });
      describe('#getter', () => {
        it('should qual to', () => {
          expect(CONFIG.value.eventNodeValues.getter(1, 1, [2, 1])).toEqual([
            1,
            1,
          ]);
        });
      });
      describe('#cacheKey', () => {
        it('should qual to', () => {
          expect(typeof CONFIG.value.eventNodeValues.cacheKey([2, 1])).toBe(
            'string',
          );
        });
      });
    });
    describe('config.value.checklistValues', () => {
      describe('#keyPath', () => {
        it('should exists', () => {
          expect(
            typeof CONFIG.value.checklistValues.keyPath({ ids: [1, 2, 3] }),
          ).toBe('object');
        });
      });
      describe('#getter', () => {
        it('should qual to', () => {
          expect(CONFIG.value.checklistValues.getter(1, 1, [2, 1])).toEqual([
            1,
            1,
          ]);
        });
      });
      describe('#cacheKey', () => {
        it('should qual to', () => {
          expect(typeof CONFIG.value.checklistValues.cacheKey([2, 1])).toBe(
            'string',
          );
        });
      });
    });
    describe('config.value.events', () => {
      describe('#getter', () => {
        describe('#events', () => {
          it('#events', () => {
            expect(
              typeof CONFIG.value.events.getter({ eventValues: [[1, 2]] }),
            ).toBe('object');
          });
          it('#events', () => {
            expect(typeof CONFIG.value.events.getter({})).toBe('object');
          });
        });
        describe('#sectionIds', () => {
          it('#sectionIds', () => {
            expect(
              typeof CONFIG.value.sectionIds.getter({
                sectionValues: [[1, 2]],
              }),
            ).toBe('object');
          });
          it('#sectionIds', () => {
            expect(typeof CONFIG.value.sectionIds.getter({})).toBe('object');
          });
        });
        describe('#eventNodeIds', () => {
          it('#eventNodeIds', () => {
            expect(
              typeof CONFIG.value.eventNodeIds.getter({
                eventNodeValues: [[1, 2]],
              }),
            ).toBe('object');
            expect(typeof CONFIG.value.eventNodeIds.getter({})).toBe('object');
          });
        });
        describe('#checklistIds', () => {
          it('#checklistIds', () => {
            expect(
              typeof CONFIG.value.checklistIds.getter({
                checklistValues: [[1, 2]],
              }),
            ).toBe('object');
            expect(typeof CONFIG.value.checklistIds.getter({})).toBe('object');
          });
        });
      });
    });
  });
  describe('config1.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG1.value).toBe('object');
    });
    describe('config.value.eventDataIds', () => {
      describe('#keyPath', () => {
        it('should exists', () => {
          expect(
            typeof CONFIG1.value.eventDataIds.keyPath({
              eventNodeIds: [1, 2, 3],
            }),
          ).toBe('object');
        });
      });
      describe('#getter', () => {
        it('should qual to', () => {
          expect(CONFIG1.value.eventDataIds.getter(1, 1, [2, 1])).toEqual([
            1,
            1,
          ]);
        });
      });
      describe('#cacheKey', () => {
        it('should qual to', () => {
          expect(typeof CONFIG1.value.eventDataIds.cacheKey([2, 1])).toBe(
            'string',
          );
        });
      });
    });
  });

  describe('config2.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.value).toBe('object');
    });
    describe('config.value.sectionAttachment', () => {
      describe('#keyPath', () => {
        it('should exists', () => {
          expect(
            typeof CONFIG2.value.sectionAttachment.keyPath({
              sectionIds: [1, 2, 3],
            }),
          ).toBe('object');
        });
      });
      describe('#getter', () => {
        it('should qual to', () => {
          expect(CONFIG2.value.sectionAttachment.getter(1, 1, [2, 1])).toEqual([
            1,
            1,
          ]);
        });
      });
      describe('#cacheKey', () => {
        it('should qual to', () => {
          expect(typeof CONFIG2.value.sectionAttachment.cacheKey([2, 1])).toBe(
            'string',
          );
        });
      });
    });
    describe('config.value.eventAttachment', () => {
      describe('#keyPath', () => {
        it('should exists', () => {
          expect(
            typeof CONFIG2.value.eventAttachment.keyPath({
              eventDataIds: [1, 2, 3],
            }),
          ).toBe('object');
        });
      });
      describe('#getter', () => {
        it('should qual to', () => {
          expect(
            CONFIG2.value.eventAttachment.getter([1], [1], [2, 1]),
          ).toEqual([1, 1]);
        });
      });
    });
  });

  describe('config3.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG3.value).toBe('object');
    });
    describe('config3.value.eventCounts', () => {
      describe('#getter', () => {
        it('should qual to', () => {
          expect(
            typeof CONFIG3.value.eventCounts.getter({
              events: [1, 2],
              eventAttachment: [1, 2],
              sectionAttachment: [1, 2],
            }),
          ).toBe('object');
        });
        it('should qual to', () => {
          expect(typeof CONFIG3.value.eventCounts.getter({})).toBe('object');
        });
      });
    });
    describe('config.value.eventAttachment', () => {
      describe('#keyPath', () => {
        it('should exists', () => {
          expect(
            typeof CONFIG2.value.eventAttachment.keyPath({
              eventDataIds: [1, 2, 3],
            }),
          ).toBe('object');
        });
      });
      describe('#getter', () => {
        it('should qual to', () => {
          expect(
            CONFIG2.value.eventAttachment.getter([1], [1], [2, 1]),
          ).toEqual([1, 1]);
        });
      });
    });
  });
});
