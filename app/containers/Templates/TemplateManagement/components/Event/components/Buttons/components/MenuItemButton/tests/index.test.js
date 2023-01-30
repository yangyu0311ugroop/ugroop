import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { MenuItemButton } from '../index';

describe('<MenuItemButton />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    type: 'ACTIVITIES',
    subtype: 'MEETING',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<MenuItemButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(MenuItemButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('newEvent()', () => {
    it('should newEvent()', () => {
      EVENT_STORE_HELPERS.setEventCreate = jest.fn(
        () => 'EVENT_STORE_HELPERS.setEventCreate',
      );

      instance.newEvent({}, { onOpen: jest.fn() });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('openCreateEventDialog()', () => {
    it('should openCreateEventDialog()', () => {
      EVENT_STORE_HELPERS.setEventCreate = jest.fn(
        () => 'EVENT_STORE_HELPERS.setEventCreate',
      );

      expect(
        instance.openCreateEventDialog(['ACTIVITIES', 'MEETING'])(),
      ).toEqual({ typeOpen: false, subtypeOpen: false });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('name()', () => {
    it('should return prop', () => {
      rendered.setProps({ name: 'prop name' });

      expect(instance.name({ name: 'event name' }, { name: 'icon name' })).toBe(
        'prop name',
      );
    });

    it('should return iconOverride', () => {
      rendered.setProps({ name: '' });

      expect(instance.name({ name: 'event name' }, { name: 'icon name' })).toBe(
        'icon name',
      );
    });

    it('should return event', () => {
      rendered.setProps({ name: '' });

      expect(instance.name({ name: 'event name' }, { name: '' })).toBe(
        'event name',
      );
    });
  });

  describe('icon()', () => {
    it('should return iconOverride', () => {
      expect(instance.icon({ icon: 'event icon' }, { icon: 'icon icon' })).toBe(
        'icon icon',
      );
    });

    it('should return event', () => {
      expect(instance.icon({ icon: 'event icon' }, { icon: '' })).toBe(
        'event icon',
      );
    });
  });

  describe('color()', () => {
    it('should return colorOverride', () => {
      expect(instance.color({ color: 'color' }, { color: 'color1' })).toBe(
        'color',
      );
    });
  });

  describe('renderAddEventMenuButton()', () => {
    it('should renderAddEventMenuButton', () => {
      instance.name = jest.fn(() => 'name');
      instance.icon = jest.fn(() => 'icon');
      instance.color = jest.fn(() => 'color');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAddEventMenuButton);
    });

    it('should renderAddEventMenuButton with different style when icon is bicycle', () => {
      instance.name = jest.fn(() => 'name');
      instance.icon = jest.fn(() => 'lnr-bicycle');
      instance.color = jest.fn(() => 'color');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAddEventMenuButton);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectDefined(instance.render);
    });

    it('should render', () => {
      rendered.setProps({ onClick: jest.fn() });

      TEST_HELPERS.expectDefined(instance.render);
    });
  });
});
