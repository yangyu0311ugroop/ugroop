/**
 * Created by stephenkarpinskyj on 30/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { IATASearchField } from '..';

describe('<IATASearchField />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    classes: {
      hidden: 'hidden',
      menuItem: 'menuItem',
    },
    iata: {
      api: jest.fn(),
    },
    cityName: 'cityName',
    cityNameProps: {
      name: 'cityName',
    },
    iataCode: 'iataCode',
    iataCodeProps: {
      name: 'iataCode',
    },
    timeZoneId: 'timeZoneId',
    timeZoneIdProps: {
      name: 'timeZoneId',
    },
  });

  beforeEach(() => {
    wrapper = shallow(<IATASearchField {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(IATASearchField).toBeDefined();
  });

  describe('#handleTextFieldBlur()', () => {
    it('unsets state.textFieldFocused', () => {
      global.setTimeout = jest.fn(cb => cb());
      instance.setState = jest.fn();
      instance.handleTextFieldBlur();
      expect(instance.setState).toBeCalledWith({ textFieldFocused: false });
    });
  });

  describe('#handleTextFieldFocus()', () => {
    it('sets state.textFieldFocused', () => {
      instance.setState = jest.fn();
      instance.handleTextFieldFocus();
      expect(instance.setState).toBeCalledWith({ textFieldFocused: true });
    });
  });

  describe('#handleTextFieldChange()', () => {
    const value = 'value';

    it('not calls props.iata.api if no value', () => {
      instance.handleTextFieldChange();
      expect(instance.props.iata.api).not.toBeCalled();
    });

    it('calls props.iata.api', () => {
      instance.handleTextFieldChange(value);
      expect(instance.props.iata.api.mock.calls[0]).toEqual(
        expect.arrayContaining([
          {
            field: 'all',
            operator: 'startswith',
            value: 'Value',
          },
        ]),
      );
    });

    it('sets state.menuData=null when handling no airports', () => {
      instance.handleTextFieldChange(value);
      instance.setState = jest.fn();
      instance.props.iata.api.mock.calls[0][1]({});
      expect(instance.setState).toBeCalledWith({ menuData: null });
    });

    it('sets state.menuData when handling airports', () => {
      instance.handleTextFieldChange(value);
      instance.setState = jest.fn();
      instance.props.iata.api.mock.calls[0][1]({ city: [{}] });
      expect(instance.setState).toBeCalledWith({ menuData: [] });
    });

    it('sets state.textFieldValue', () => {
      instance.setState = jest.fn();
      instance.handleTextFieldChange(value);
      expect(instance.setState).toBeCalledWith({ textFieldValue: value });
    });
  });

  describe('#handleMenuItemClick()', () => {
    const data = {
      iata: 'iata',
      tzzone: 'tzzone',
    };

    it('calls input.setValue', () => {
      instance.input = { setValue: jest.fn() };
      instance.handleMenuItemClick(data)();
      expect(instance.input.setValue).toBeCalledWith('undefined (iata)');
    });
  });

  describe('#handleRef()', () => {
    it('sets this.[key]', () => {
      const key = 'key';
      const ref = 'ref';
      instance.handleRef(key)(ref);
      expect(instance[key]).toEqual(ref);
    });
  });

  describe('#renderAiportName()', () => {
    it('renders empty string', () => {
      expect(instance.renderAiportName()).toEqual('');
    });
  });

  describe('#renderCityName()', () => {
    it('renders empty string', () => {
      expect(instance.renderCityName()).toEqual('');
    });
  });

  describe('#renderMenuItems()', () => {
    it('menuData still matches snapshot', () => {
      const menuData = [{ iata: 'iata' }];
      instance.setState({ menuData });
      expect(instance.renderMenuItems()).toMatchSnapshot();
    });
  });

  describe('#renderMenu()', () => {
    it('visible menu still matches snapshot', () => {
      const textFieldValue = 'textFieldValue';
      const textFieldFocused = 'textFieldFocused';
      instance.setState({ textFieldValue, textFieldFocused });
      expect(instance.renderMenu()).toMatchSnapshot();
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
