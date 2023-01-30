import { FLAT_BUTTON } from 'appConstants';
/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { IconButton } from '../index';

describe('IconButton/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const classes = {
    block: 'block',
    dense: 'dense',
    green_loading: 'green_loading',
    primaryFlat: 'primaryFlat',
  };
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(
      <IconButton classes={classes} tooltip="Hello Tooltip">
        {children}
      </IconButton>,
    );
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(IconButton).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('buttonColor()', () => {
    it('should return null', () => {
      rendered.setProps({ variant: FLAT_BUTTON, color: 'primary' });

      expect(instance.buttonColor()).toBe('primaryFlat');
    });
  });

  describe('renderIconButton()', () => {
    it('should call renderButton', () => {
      instance.renderButton = jest.fn(() => 'renderButton');

      expect(instance.renderIconButton()).toBe('renderButton');
    });
  });

  describe('renderDefault()', () => {
    it('should call renderDefault', () => {
      rendered.setProps({ tooltip: '' });

      instance.renderButton = jest.fn(() => 'renderButton');

      expect(instance.renderDefault()).toBe('renderButton');
    });

    it('should call renderTooltipButton', () => {
      rendered.setProps({ tooltip: 'tooltip' });

      instance.renderButton = jest.fn(() => 'renderButton');
      instance.renderTooltipButton = jest.fn(() => 'renderTooltipButton');

      expect(instance.renderDefault()).toBe('renderTooltipButton');
    });
  });

  describe('renderFlatButton()', () => {
    it('should call renderButton', () => {
      rendered.setProps({ tooltip: '' });
      instance.renderButton = jest.fn(() => 'renderButton');

      expect(instance.renderFlatButton()).toMatchSnapshot();
    });
    it('should call renderTooltipButton', () => {
      rendered.setProps({ tooltip: 'tooltip' });

      instance.renderButton = jest.fn(() => 'renderButton');
      instance.renderTooltipButton = jest.fn(() => 'renderTooltipButton');

      expect(instance.renderTooltipButton()).toBe('renderTooltipButton');
    });
  });

  describe('render()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
