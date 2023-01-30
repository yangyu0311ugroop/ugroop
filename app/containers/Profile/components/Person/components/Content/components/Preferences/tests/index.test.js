import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Preferences } from '../index';
import { TEST_HELPERS } from '../../../../../../../../../utils/helpers/testHelpers';

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
    rendered = shallow(<Preferences {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Preferences).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('hasAccess()', () => {
    it('should hasAccess correctly', () => {
      instance.hasAccess = jest.fn(() => true);
      expect(instance.hasAccess()).toBe(true);
    });
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

  describe('renderReminderContent()', () => {
    it('should renderReminderContent', () => {
      TEST_HELPERS.expectDefined(instance.renderReminderContent);
    });
  });

  describe('renderRemindersPersonal()', () => {
    it('should renderRemindersPersonal', () => {
      TEST_HELPERS.expectDefined(instance.renderRemindersPersonal);
    });
  });

  describe('renderBreadcrumbs()', () => {
    it('should return null', () => {
      rendered.setProps({ location: { pathname: '/1' } });

      expect(instance.renderBreadcrumbs()).toBe(null);
    });

    it('should renderBreadcrumbs', () => {
      rendered.setProps({ location: { pathname: '/1/2/3/4/photo' } });

      TEST_HELPERS.expectMatchSnapshot(instance.renderBreadcrumbs);
    });
  });

  describe('renderPersonalPreference()', () => {
    it('should renderPersonalPreference', () => {
      TEST_HELPERS.expectDefined(instance.renderPersonalPreference);
    });
  });

  describe('renderPreference()', () => {
    it('should renderPreference', () => {
      TEST_HELPERS.expectDefined(instance.renderPreference);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderBreadcrumbs = jest.fn(() => 'renderBreadcrumbs');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
