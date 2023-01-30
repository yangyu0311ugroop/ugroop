import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Role } from '../index';

describe('<Role />', () => {
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
    rendered = shallow(<Role {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Role).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ role: '' });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ role: 'admin' });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderText()', () => {
    it('should return null', () => {
      rendered.setProps({ role: 'invalid role' });

      expect(instance.renderText()).toBe('');
    });

    it('should renderText', () => {
      rendered.setProps({ role: 'admin' });

      const snapshot = shallow(<div>{instance.renderText()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render article', () => {
      rendered.setProps({ role: 'admin', article: true });

      const snapshot = shallow(<div>{instance.renderText()}</div>);

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
