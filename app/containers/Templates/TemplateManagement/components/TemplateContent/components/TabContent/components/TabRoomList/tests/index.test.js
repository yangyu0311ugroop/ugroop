import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TabRoomList } from '../index';

describe('<TabRoomList />', () => {
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

    rendered = shallow(<TabRoomList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabRoomList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('canEdit()', () => {
    it('should canEdit()', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(true);
    });
  });

  describe('handleDeleteRoom()', () => {
    it('should handleDeleteRoom()', () => {
      instance.handleDeleteRoom();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('handleChange()', () => {
    it('should handleChange()', () => {
      instance.handleChange(1)();
    });
  });

  describe('renderCard()', () => {
    it('should renderCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
  });

  describe('handleSortSelect()', () => {
    it('should handleSortSelect', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleSortSelect(''));
    });
  });

  describe('renderLeft()', () => {
    it('should renderLeft', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });
  });

  describe('renderContent()', () => {
    it('should render placeholder', () => {
      rendered.setProps({ rooms: [] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });

    it('should render placeholder 1', () => {
      rendered.setProps({ rooms: [11] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });

    it('should renderContent', () => {
      instance.canEdit = jest.fn(() => true);
      rendered.setProps({ rooms: [99] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
