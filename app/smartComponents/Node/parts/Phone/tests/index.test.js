import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { VARIANTS } from 'variantsConstants';
import { Phone } from '..';

describe('<Phone />', () => {
  let wrapper;
  let instance;
  const resaga = {
    dispatchTo: jest.fn(),
  };

  const makeProps = () => ({
    resaga,
    value: 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<Phone {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('renderRow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot', () => {
      wrapper.setProps({ userConnected: true, userValues: [[1, 2]] });
      instance.renderValue = jest.fn(() => '');
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

  describe('#renderEditableMenuValue()', () => {
    it('still matches snapshot if props.value', () => {
      const value = 'value';
      expect(instance.renderEditableMenuValue(value)).toMatchSnapshot();
    });
  });

  describe('#renderEditableValue()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      expect(instance.renderEditableValue(value)).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot is props.userConnected and props.userValues', () => {
      wrapper.setProps({ userConnected: true, userValues: ['value'] });
      expect(instance.renderEditable()).toMatchSnapshot();
    });
  });
  describe('#componentDidMount() fetchLocationApi to be called', () => {
    it('still matches snapshot is props.userConnected and props.userValues', () => {
      instance.fetchLocationApi = jest.fn();
      wrapper.setProps({ variant: VARIANTS.TEXT_FIELD, value: '' });
      instance.componentDidMount();
      expect(instance.fetchLocationApi).toBeCalled();
    });
  });
  describe('#fetchLocationApi', () => {
    it('dispatchto to be called', () => {
      instance.fetchLocationApi();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('getUserValue', () => {
    it('should return userValue[1]', () => {
      wrapper.setProps({ userValues: [[1, 2]] });
      expect(instance.getUserValue(1)).toEqual(2);
    });
    it('should return null', () => {
      wrapper.setProps({ userValues: [[2, 2]] });
      expect(instance.getUserValue(1)).toEqual(null);
    });
  });
  describe('getDefaultUserValue', () => {
    it('should return userValues[0][1]', () => {
      wrapper.setProps({ userValues: [[1, 2]] });
      expect(instance.getDefaultUserValue()).toEqual(2);
    });
    it('should return null', () => {
      wrapper.setProps({ userValues: [] });
      expect(instance.getDefaultUserValue()).toEqual(null);
    });
  });

  describe('renderValue', () => {
    it('should return renderValue with getUserValue', () => {
      const renderValue = jest.fn();
      wrapper.setProps({ renderValue, userPhoneId: 1 });
      instance.getUserValue = jest.fn(() => 1);
      instance.renderValue();
      expect(instance.getUserValue).toHaveBeenCalled();
    });
    it('should return renderValue with getDefaultUserValue', () => {
      const renderValue = jest.fn();
      wrapper.setProps({ renderValue, userPhoneId: 0 });
      instance.getDefaultUserValue = jest.fn(() => 1);
      instance.renderValue();
      expect(instance.getDefaultUserValue).toHaveBeenCalled();
    });
    it('should just return renderValue with value', () => {
      instance.getDefaultUserValue = jest.fn(() => 1);
      wrapper.setProps({ userPhoneId: null, value: '1' });
      instance.renderValue();
      expect(instance.getDefaultUserValue).toHaveBeenCalled();
    });
    it('should just call defaultValue of renderValue', () => {
      instance.renderValue();
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
