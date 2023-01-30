import { USER_API_HELPERS } from 'apis/components/User/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Distance } from '../index';

describe('<Distance />', () => {
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
    rendered = shallow(<Distance {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Distance).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSubmit', () => {
    it('should call user api helpers update user preference', () => {
      rendered.setProps({ userId: 1 });
      USER_API_HELPERS.updateUserPreference = jest.fn(() => jest.fn());

      instance.handleSubmit({
        model: {},
        onSuccess: jest.fn(),
        onError: jest.fn(),
      });

      expect(USER_API_HELPERS.updateUserPreference).toBeCalled();
      expect(
        USER_API_HELPERS.updateUserPreference.mock.calls,
      ).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should render the converted distance in m to target measurement of choice', () => {
      rendered.setProps({ eventDistance: 1000 });

      const snapshot = shallow(<div>{instance.renderValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should return null if eventDistance is zero', () => {
      rendered.setProps({
        eventDistance: 0,
      });
      expect(instance.renderValue()).toEqual(null);
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot if eventDistance is greater than 1', () => {
      rendered.setProps({
        eventDistance: 1000,
      });

      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if event distance is not greater than 1', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLabelValueStacked', () => {
    it('should match snapshot', () => {
      instance.renderValue = jest.fn(() => 1);
      const snap = shallow(<div>{instance.renderLabelValueStacked()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return null if there is no value', () => {
      instance.renderValue = jest.fn(() => null);
      expect(instance.renderLabelValueStacked()).toEqual(null);
    });
  });

  describe('renderLabelValue', () => {
    it('should match snapshot', () => {
      instance.renderValue = jest.fn(() => 1);
      const snap = shallow(<div>{instance.renderLabelValue()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return null if there is no value', () => {
      instance.renderValue = jest.fn(() => null);
      expect(instance.renderLabelValue()).toEqual(null);
    });
  });
});
