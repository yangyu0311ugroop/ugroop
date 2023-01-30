import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RoomCard } from '../index';

describe('<RoomCard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<RoomCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RoomCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openAddRoom()', () => {
    it('should openAddRoom()', () => {
      PORTAL_HELPERS.openAddRoom = jest.fn(() => '');

      instance.openAddRoom();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddRoom);
    });
  });

  describe('selectRoom()', () => {
    it('should selectRoom()', () => {
      instance.selectRoom(55)();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('renderChildren()', () => {
    it('should return null', () => {
      expect(instance.renderChildren({ ids: [] })).toBe(null);
    });

    it('should renderChildren', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderChildren, [
        { ids: [1, 2] },
      ]);
    });
  });

  describe('renderRoom()', () => {
    it('should renderRoom', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoom);
    });
  });

  describe('renderRooms()', () => {
    it('should return null', () => {
      instance.renderEmpty = jest.fn(() => 'renderEmpty');
      rendered.setProps({ rooms: [] });

      expect(instance.renderRooms()).toBe('renderEmpty');
    });

    it('should renderRooms', () => {
      instance.renderRoom = jest.fn(() => 'renderRoom');
      rendered.setProps({ rooms: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderRooms);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderRooms = jest.fn(() => 'renderRooms');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
