import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CompletedBy } from '../index';

describe('<CompletedBy />', () => {
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
    rendered = shallow(<CompletedBy {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CompletedBy).toBeDefined();
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

  describe('renderText()', () => {
    it('should renderText', () => {
      rendered.setProps({ completedBy: 12 });

      const snapshot = shallow(<div>{instance.renderText()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      rendered.setProps({ completedBy: 12 });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCompressed()', () => {
    it('should renderCompressed', () => {
      rendered.setProps({ completedBy: 12 });

      const snapshot = shallow(<div>{instance.renderCompressed()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAvatar()', () => {
    it('should return null', () => {
      rendered.setProps({ completedBy: 0 });

      expect(instance.renderAvatar()).toBe(null);
    });

    it('should renderAvatar', () => {
      rendered.setProps({ completedBy: 12 });

      const snapshot = shallow(<div>{instance.renderAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ completedBy: 0 });

      expect(instance.render()).toBe(null);
    });

    it('should return LOGIC_HELPERS.switchCase', () => {
      rendered.setProps({ completedBy: 123 });
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
