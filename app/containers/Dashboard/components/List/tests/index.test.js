import { TOUR_LIST_NAMES } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { List } from '../index';

describe('<List />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    name: TOUR_LIST_NAMES[0],
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<List {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(List).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('items()', () => {
    it('should return null', () => {
      rendered.setProps({ items: [1, 2, 3, 4], maxRender: 2 });

      expect(instance.items()).toEqual([1, 2]);
    });

    it('should return all', () => {
      rendered.setProps({ items: [1, 2, 3, 4] });

      expect(instance.items()).toEqual([1, 2, 3, 4]);
    });

    it('should return all #2', () => {
      rendered.setProps({ items: [1, 2], maxRender: 4 });

      expect(instance.items()).toEqual([1, 2]);
    });
  });

  describe('renderItem()', () => {
    it('should renderItem', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderItem);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ items: [] });

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      rendered.setProps({ items: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
