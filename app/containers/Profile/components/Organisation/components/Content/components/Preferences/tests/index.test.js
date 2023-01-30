import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Preferences } from '../index';

describe('<Preferences />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    match: {},
    history: {},
    location: { pathname: '/1/2/3' },
    resaga,
    id: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Preferences {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Preferences).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderListItem()', () => {
    it('should renderListItem', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderListItem);
    });

    it('should renderListItem with data', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderListItem, [
        {
          subnav: 'subnav',
          heading: 'heading',
          content: 'content',
          body: 'body',
          extras: 'extras',
          divider: false,
        },
      ]);
    });
  });

  describe('renderNameContent()', () => {
    it('should renderNameContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNameContent);
    });

    it('should renderNameContent knownAs', () => {
      rendered.setProps({
        firstName: 'firstName',
        lastName: 'lastName',
        knownAs: 'knownAs',
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderNameContent);
    });
  });

  describe('renderAddress()', () => {
    it('should return null', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddress);
    });
  });

  describe('renderType()', () => {
    it('should renderType', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderType);
    });
  });

  describe('renderWebsite()', () => {
    it('should renderWebsite', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderWebsite);
    });
  });

  describe('renderEmailContent()', () => {
    it('should renderEmailContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmailContent);
    });

    it('should renderEmailContent secondaryEmail', () => {
      rendered.setProps({ secondaryEmail: 'secondaryEmail' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEmailContent);
    });
  });

  describe('renderContact()', () => {
    it('should renderContact', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContact);
    });
  });

  describe('renderOthers()', () => {
    it('should renderOthers', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderOthers);
    });
  });

  describe('renderPersonalInfo()', () => {
    it('should renderPersonalInfo', () => {
      instance.renderProfile = jest.fn(() => 'renderProfile');
      instance.renderContact = jest.fn(() => 'renderContact');
      instance.renderOthers = jest.fn(() => 'renderOthers');

      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonalInfo);
    });
  });

  describe('renderBreadcrumbs()', () => {
    it('should return null', () => {
      rendered.setProps({ location: { pathname: '/1/2/3' } });

      expect(instance.renderBreadcrumbs()).toBe(null);
    });

    it('should renderBreadcrumbs', () => {
      rendered.setProps({ location: { pathname: '/1/2/3/4/photo' } });

      TEST_HELPERS.expectMatchSnapshot(instance.renderBreadcrumbs);
    });
  });

  describe('renderTimezoneContent()', () => {
    it('should renderTimezoneContent', () => {
      TEST_HELPERS.expectDefined(instance.renderTimezoneContent);
    });
  });

  describe('renderDateFormatContent()', () => {
    it('should renderDateFormatContent', () => {
      TEST_HELPERS.expectDefined(instance.renderDateFormatContent);
    });
  });

  describe('renderReminderContent()', () => {
    it('should renderReminderContent', () => {
      TEST_HELPERS.expectDefined(instance.renderReminderContent);
    });
  });

  describe('renderLabelContent()', () => {
    it('should renderReminderContent', () => {
      TEST_HELPERS.expectDefined(instance.renderLabelContent);
    });
  });

  describe('renderLabels()', () => {
    it('should renderLabels', () => {
      TEST_HELPERS.expectDefined(instance.renderLabels);
    });
  });

  describe('renderOrgPreference()', () => {
    it('should renderOrgPreference', () => {
      TEST_HELPERS.expectDefined(instance.renderOrgPreference);
    });
  });

  describe('renderTimezone()', () => {
    it('should renderTimezone', () => {
      TEST_HELPERS.expectDefined(instance.renderTimezone);
    });
  });

  describe('renderDateFormat()', () => {
    it('should renderDateFormat', () => {
      TEST_HELPERS.expectDefined(instance.renderDateFormat);
    });
  });

  describe('renderPaxLabel()', () => {
    it('should renderPaxLabel', () => {
      TEST_HELPERS.expectDefined(instance.renderPaxLabel);
    });
  });

  describe('renderReminders()', () => {
    it('should renderReminders', () => {
      TEST_HELPERS.expectDefined(instance.renderReminders);
    });
  });

  describe('renderPreference()', () => {
    it('should renderPreference', () => {
      TEST_HELPERS.expectDefined(instance.renderPreference);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderBreadcrumbs = jest.fn(() => 'renderBreadcrumbs');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
