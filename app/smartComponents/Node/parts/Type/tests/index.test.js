import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Type } from '../index';

describe('<Type />', () => {
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
    rendered = shallow(<Type {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Type).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('#renderData()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderData()).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ type: '' });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ type: 'some type' });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render section rather than activity', () => {
      rendered.setProps({ type: 'activity' });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderDefault properly given that type of node includes tab', () => {
      rendered.setProps({ type: 'tabtimeline' });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

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
