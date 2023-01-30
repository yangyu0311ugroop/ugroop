import { shallow } from 'enzyme';
import React from 'react';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Marker } from 'smartComponents/Node/components/Marker/index';

describe('<Marker />', () => {
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

    rendered = shallow(<Marker {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Marker).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should not call handleHovered', () => {
      instance.handleHovered = jest.fn();

      instance.componentWillReceiveProps({ showDetail: false });

      TEST_HELPERS.expectNotCalled(instance.handleHovered);
    });

    it('should handle start hovering', () => {
      rendered.setProps({ hovered: false });
      instance.handleHovered = jest.fn();

      instance.componentWillReceiveProps({ showDetail: true, hovered: true });

      expect(instance.handleHovered).toBeCalledWith(true);
    });

    it('should handle stop hovering', () => {
      rendered.setProps({ hovered: true, leaveDelay: 2233 });
      instance.handleHovered = jest.fn();

      instance.componentWillReceiveProps({ showDetail: true, hovered: false });

      expect(instance.handleHovered).toBeCalledWith(false, 2233);
    });

    it('should handle start hovering something else', () => {
      rendered.setProps({ hoveredElse: false, leaveDelay: 2233 });
      rendered.setState({ hovered: true });
      instance.handleHovered = jest.fn();

      instance.componentWillReceiveProps({
        showDetail: true,
        hoveredElse: true,
      });

      expect(instance.handleHovered).toBeCalledWith(false);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('handleHovered()', () => {
    it('should call setState', () => {
      instance.handleHovered(true);

      expect(rendered.state().hovered).toBe(true);
    });

    it('should delay', () => {
      global.setTimeout = jest.fn(cb => cb());

      instance.handleHovered(3344, 1);

      TEST_HELPERS.expectCalled(global.setTimeout);
      expect(rendered.state().hovered).toBe(3344);
    });
  });

  describe('handleMouseEnter()', () => {
    it('should handle hovered', () => {
      global.setTimeout = jest.fn(cb => cb());
      rendered.setProps({ hovered: true });

      instance.handleMouseEnter();

      TEST_HELPERS.expectNotCalled(resaga.setValue);
    });

    it('should handle !hovered', () => {
      global.setTimeout = jest.fn(cb => cb());
      rendered.setProps({ hovered: false, id: 3344 });

      instance.handleMouseEnter();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('handleMouseLeave()', () => {
    it('should clearTimeout', () => {
      global.clearTimeout = jest.fn();
      rendered.setProps({ hovered: false });

      instance.handleMouseLeave();

      TEST_HELPERS.expectCalled(global.clearTimeout);
    });

    it('should setValue', () => {
      rendered.setProps({ hovered: true });

      instance.handleMouseLeave();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('handleClose()', () => {
    it('should handleClose()', () => {
      instance.handleClose();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('handleMinimise()', () => {
    it('should handleMinimise()', () => {
      instance.handleHovered = jest.fn();

      instance.handleMinimise();

      TEST_HELPERS.expectCalled(instance.handleHovered, false);
    });
  });

  describe('handleClick()', () => {
    it('should unset', () => {
      rendered.setProps({ active: false });

      instance.handleClick();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });

    it('should clickZoom', () => {
      rendered.setProps({ active: true });

      instance.handleClick();

      TEST_HELPERS.expectCalled(resaga.setValue, {
        clickZoom: RESAGA_HELPERS.toggleValue,
      });
    });
  });

  describe('renderRow()', () => {
    it('should renderRow', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow);
    });
  });

  describe('renderCircle()', () => {
    it('should renderCircle', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCircle);
    });
  });

  describe('renderDetail()', () => {
    it('should return null', () => {
      rendered.setState({ hovered: false });

      expect(instance.renderDetail()).toBe(null);
    });

    it('should renderDetail', () => {
      rendered.setState({ hovered: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDetail);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderCircle = jest.fn(() => 'renderCircle');
      instance.renderDetail = jest.fn(() => 'renderDetail');

      rendered.setProps({ showDetail: true, interactive: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
