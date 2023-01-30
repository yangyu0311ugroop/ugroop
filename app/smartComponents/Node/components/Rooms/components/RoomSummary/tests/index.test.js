import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RoomSummary } from '../index';

describe('<RoomSummary />', () => {
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

    rendered = shallow(<RoomSummary {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RoomSummary).toBeDefined();
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

  describe('renderRoomTypes()', () => {
    it('should renderRoomTypes()', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomTypes);
    });
  });

  describe('renderRoomType()', () => {
    it('should renderRoomType()', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomType, ['Twin', 1, 2]);
    });
  });

  describe('renderRoomCountByType()', () => {
    it('should renderRoomCountByType()', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomCountByType);
    });
    it('should renderRoomCountByType()', () => {
      rendered.setProps({ roomTypes: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomCountByType);
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('setSelectedType()', () => {
    it('should renderEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.setSelectedType());
    });
  });

  describe('renderRoom()', () => {
    it('should renderRoom', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoom);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderRooms = jest.fn(() => 'renderRooms');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
