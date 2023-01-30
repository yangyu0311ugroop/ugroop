import { CONFIG, CONFIG_2 } from '../config';

describe('InviteButton/config.js', () => {
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

    describe('personId', () => {
      describe('keyPath', () => {
        it('should match snapshot', () => {
          expect(CONFIG.value.personId.keyPath({ id: 1 })).toMatchSnapshot();
        });
      });

      describe('getter', () => {
        it('should return first item in array', () => {
          expect(CONFIG.value.personId.getter([1, 2])).toBe(1);
        });
      });
    });

    describe('firstName', () => {
      it('should match snapshot', () => {
        expect(CONFIG.value.firstName({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('lastName', () => {
      it('should match snapshot', () => {
        expect(CONFIG.value.lastName({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('personEmail', () => {
      it('should match snapshot', () => {
        expect(CONFIG.value.personEmail({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('dateOfBirth', () => {
      it('should match snapshot', () => {
        expect(CONFIG.value.dateOfBirth({ id: 1 })).toMatchSnapshot();
      });
    });

    describe('personType', () => {
      it('should match snapshot', () => {
        expect(CONFIG.value.personType({ id: 1 })).toMatchSnapshot();
      });
    });
  });
});

describe('InviteButton/CONFIG_2', () => {
  afterEach(() => jest.clearAllMocks());

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.setValue).toBe('object');
    });

    describe('calculatedPeople', () => {
      it('should match snapshot', () => {
        expect(CONFIG_2.setValue.calculatedPeople({ id: 1 })).toMatchSnapshot();
      });
    });
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.value).toBe('object');
    });

    describe('participantEmail', () => {
      it('should match snapshot', () => {
        expect(CONFIG_2.value.participantEmail({ id: 1 })).toMatchSnapshot();
      });
    });
  });
});
