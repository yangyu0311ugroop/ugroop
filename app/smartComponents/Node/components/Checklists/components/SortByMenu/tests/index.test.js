import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { SortByMenu } from '../index';

describe('<SortByMenu />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 2299,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<SortByMenu {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SortByMenu).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should clearTimeout', () => {
      global.clearTimeout = jest.fn();
      instance.blockOpening = 'blockOpening';

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalledWith(instance.blockOpening);
    });
  });

  describe('openMoreMenu()', () => {
    it('should setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();

      instance.openMoreMenu(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(rendered.state().anchorEl).toBe(event.currentTarget);
    });

    it('should NOT setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();
      rendered.setState({ blockOpening: true, anchorEl: null });

      instance.openMoreMenu(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('closeMoreMenu()', () => {
    it('should setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();
      global.setTimeout = jest.fn(cb => cb());

      instance.closeMoreMenu(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(global.setTimeout).toBeCalled();
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('stopPropagation()', () => {
    it('should setState', () => {
      const event = { stopPropagation: jest.fn() };

      instance.stopPropagation(event);

      expect(event.stopPropagation).toBeCalledWith();
    });
  });

  describe('handleSortBy()', () => {
    it('should call resaga.setValue', () => {
      instance.closeMoreMenu = jest.fn();

      instance.handleSortBy('sortBy', 'order')('event');

      expect(instance.closeMoreMenu).toBeCalledWith('event');
      expect(resaga.setValue).toBeCalledWith({
        sortBy: 'sortBy',
        order: 'order',
      });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderMenuItem = jest.fn(() => 'renderMenuItem');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
