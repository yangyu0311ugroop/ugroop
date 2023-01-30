import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CreatedAt } from '../index';

describe('<CreatedAt />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<CreatedAt {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CreatedAt).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should componentWillUnmount', () => {
      global.clearInterval = jest.fn();

      instance.componentWillUnmount();

      TEST_HELPERS.expectCalled(global.clearInterval);
    });
  });

  describe('updateTimeHandler()', () => {
    it('should forceUpdate', () => {
      instance.forceUpdate = jest.fn();

      instance.updateTimeHandler();

      TEST_HELPERS.expectCalled(instance.forceUpdate);
    });
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('renderTitle()', () => {
    it('should return renderTitle', () => {
      rendered.setProps({ createdAt: '1234-12-21 13:34:56.789' });

      expect(instance.renderTitle()).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ createdAt: '' });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ createdAt: new Date().toISOString() });
      instance.renderTitle = jest.fn(() => 'renderTitle');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderDefault', () => {
      rendered.setProps({
        createdAt: new Date().toISOString(),
        showFromNow: true,
      });
      instance.renderTitle = jest.fn(() => 'renderTitle');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDate()', () => {
    it('should return null', () => {
      rendered.setProps({ createdAt: '' });

      expect(instance.renderDate()).toBe(null);
    });

    it('should renderDate', () => {
      rendered.setProps({ createdAt: 'July 12 2019' });
      instance.renderTitle = jest.fn(() => 'renderTitle');

      const snapshot = shallow(<div>{instance.renderDate()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSimpleTooltip()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderSimpleTooltip()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
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
