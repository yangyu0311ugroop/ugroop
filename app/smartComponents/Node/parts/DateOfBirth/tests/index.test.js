import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { DateOfBirth } from '..';

describe('<DateOfBirth />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    value: 'value',
  });

  beforeEach(() => {
    MOMENT_HELPERS.getDateLastYear = jest.fn(() => 'lastYear');
    MOMENT_HELPERS.getDateMiddleLastYear = jest.fn(() => 'middlelastYear');
    wrapper = shallow(<DateOfBirth {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(DateOfBirth).toBeDefined();
  });

  describe('renderRow', () => {
    it('should match snapshot', () => {
      wrapper.setProps({ showAge: true });
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderTextOnly()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTextOnly()).toMatchSnapshot();
    });
  });

  describe('#renderTextField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderTextField()).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('still matches snapshot if value', () => {
      MOMENT_HELPERS.renderDate = jest.fn(() => 'date');
      MOMENT_HELPERS.renderAge = jest.fn(() => 'age');
      expect(instance.renderEditableValue('value')).toMatchSnapshot();
    });

    it('returns value if no value', () => {
      const value = '';
      expect(instance.renderEditableValue(value)).toBe(value);
      expect(instance.renderEditableValue()).toBe();
      expect(instance.renderEditableValue(null)).toBeNull();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot if props.userConnected and props.userValue', () => {
      wrapper.setProps({ userConnected: true, userValue: 'userValue' });
      expect(instance.renderEditable()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
