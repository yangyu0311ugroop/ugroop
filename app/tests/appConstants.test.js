import {
  URL_HELPERS,
  SHARE_URL_HELPERS,
  DO_NOTHING_FUNC,
  RECENT,
  STARRED,
} from 'appConstants';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

describe('DO_NOTHING_FUNC', () => {
  it('just need to be called', () => {
    expect(DO_NOTHING_FUNC()).toBe(undefined);
  });
});

describe('URL_HELPERS', () => {
  describe('home()', () => {
    it('should return index', () => {
      expect(
        URL_HELPERS.home('/homepage', {
          path: URL_HELPERS.myTours(),
          isExact: true,
        }),
      ).toBe(URL_HELPERS.index());
    });

    it('should return myTours', () => {
      expect(
        URL_HELPERS.home('/homepage', {
          path: URL_HELPERS.myTours(),
          isExact: false,
        }),
      ).toBe(URL_HELPERS.myTours());
    });

    it('should return myTours 2', () => {
      expect(
        URL_HELPERS.home('/homepage', {
          path: URL_HELPERS.index(),
          isExact: true,
        }),
      ).toBe(URL_HELPERS.myTours());
    });

    it('should return myTours 3', () => {
      expect(URL_HELPERS.home()).toBe(URL_HELPERS.myTours());
    });

    it('should return page', () => {
      expect(URL_HELPERS.home('/somepage')).toBe('/somepage');
    });
  });

  describe('tours()', () => {
    it('should return tours URL', () => {
      expect(URL_HELPERS.tours()).toMatchSnapshot();
      expect(URL_HELPERS.tours(':id?')).toMatchSnapshot();
      expect(URL_HELPERS.tours('3344')).toMatchSnapshot();
    });
  });

  describe('personalInfo()', () => {
    it('should return personalInfo URL', () => {
      expect(URL_HELPERS.personalInfo()).toMatchSnapshot();
    });
  });

  describe('myTours()', () => {
    it('should return myTours URL', () => {
      expect(URL_HELPERS.myTours()).toMatchSnapshot();
      expect(URL_HELPERS.myTours(-1)).toMatchSnapshot();
      expect(URL_HELPERS.myTours(RECENT)).toMatchSnapshot();
      expect(URL_HELPERS.myTours(STARRED)).toMatchSnapshot();
      expect(URL_HELPERS.myTours('3344')).toMatchSnapshot();
    });
  });

  describe('settingsOrganisations()', () => {
    it('should return settingsOrganisations URL', () => {
      expect(URL_HELPERS.settingsOrganisations()).toMatchSnapshot();
    });
  });

  describe('tourPrint()', () => {
    it('should return tourPrint URL', () => {
      expect(URL_HELPERS.tourPrint()).toMatchSnapshot();
    });
  });

  describe('isDashboardPage()', () => {
    it('should return true', () => {
      expect(
        URL_HELPERS.isDashboardPage({ path: URL_HELPERS.dashboardPages[0] }),
      ).toBe(true);
    });

    it('should return false', () => {
      expect(
        URL_HELPERS.isDashboardPage({ path: 'not a dashboard page' }),
      ).toBe(false);
    });
  });

  describe('isPersonalPage()', () => {
    it('should return true', () => {
      expect(
        URL_HELPERS.isPersonalPage({ path: URL_HELPERS.personalPages[0] }),
      ).toBe(true);
    });

    it('should return false', () => {
      expect(URL_HELPERS.isPersonalPage({ path: 'not a personal page' })).toBe(
        false,
      );
    });
  });

  describe('isOrganisationPage()', () => {
    it('should return true', () => {
      expect(
        URL_HELPERS.isOrganisationPage({
          path: URL_HELPERS.organisationPages[0],
        }),
      ).toBe(true);
    });

    it('should return false', () => {
      expect(URL_HELPERS.isOrganisationPage({ path: 'not a org page' })).toBe(
        false,
      );
    });
  });

  describe('isPersonalSettingPages()', () => {
    it('should return true', () => {
      expect(
        URL_HELPERS.isPersonalSettingPages({
          path: URL_HELPERS.personalSettingPages[0],
        }),
      ).toBe(true);
    });

    it('should return false', () => {
      expect(
        URL_HELPERS.isPersonalSettingPages({ path: 'not a profile settings' }),
      ).toBe(false);
    });
  });

  describe('isTourPage()', () => {
    it('should return true', () => {
      expect(
        URL_HELPERS.isTourPage({
          path: URL_HELPERS.tours(':id?'),
          isExact: true,
          params: { id: 2233 },
        }),
      ).toBe(2233);
    });

    it('should return false', () => {
      expect(
        URL_HELPERS.isTourPage({
          path: URL_HELPERS.tours(':id?'),
          isExact: true,
          params: { id: 0 },
        }),
      ).toBe(0);
    });
  });

  describe('googlePlace', () => {
    it('should return place url', () => {
      expect(URL_HELPERS.googlePlace('Manila')).toEqual(
        'https://www.google.com/maps/search/?api=1&query=Manila',
      );
    });
  });

  describe('makeUrl', () => {
    it('should return place url', () => {
      expect(URL_HELPERS.makeUrl('https://www.google.com')).toEqual(
        'www.google.com',
      );
    });
  });

  describe('goTo()', () => {
    it('should goTo()', () => {
      const history = { push: jest.fn() };

      URL_HELPERS.goTo('/tours/1231', { history })();

      TEST_HELPERS.expectCalledAndMatchSnapshot(history.push);
    });
  });

  describe('goToUrl()', () => {
    it('should goToUrl()', () => {
      const history = { push: jest.fn() };

      URL_HELPERS.goToUrl('/tours/1231', { history })();

      TEST_HELPERS.expectCalledAndMatchSnapshot(history.push, '/tours/1231');
    });
  });
});

describe('SHARE_URL_HELPERS', () => {
  const message = 'test';
  const link = 'localhost';

  it('should match snapshot', () => {
    expect(SHARE_URL_HELPERS.facebookURL(link, message)).toMatchSnapshot();
    expect(SHARE_URL_HELPERS.twitterURL(link, message)).toMatchSnapshot();
    expect(SHARE_URL_HELPERS.whatsAppURL(link, message)).toMatchSnapshot();
    expect(SHARE_URL_HELPERS.mailURL(link, message)).toMatchSnapshot();
  });
});
