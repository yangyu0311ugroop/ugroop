/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { SupplierPhone } from '..';
const resaga = {
  dispatchTo: jest.fn(),
};

describe('<SupplierPhone />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({ resaga });

  beforeEach(() => {
    wrapper = shallow(<SupplierPhone {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(SupplierPhone).toBeDefined();
  });

  describe('#getTextProps()', () => {
    it('returns TextProps', () => {
      const TextProps = 'TextProps';
      instance.TextProps = TextProps;
      expect(instance.getTextProps()).toEqual({ ...TextProps, country: null });
    });
  });

  describe('#handleSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderValue()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      expect(instance.renderValue(value)).toMatchSnapshot();
    });
  });

  describe('#renderField()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderField()).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderEditable()).toMatchSnapshot();
    });
  });

  describe('renderActions', () => {
    it('should still matches snapshot', () => {
      expect(instance.renderActions()).toMatchSnapshot();
    });
  });
  describe('cacheCountry', () => {
    it('should still matches snapshot', () => {
      instance.cacheCountry({ location: '', placeId: 1 });
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('componentDidMount', () => {
    it('cacheCountry not to be called', () => {
      instance.cacheCountry = jest.fn();
      instance.componentDidMount();
      expect(instance.cacheCountry).not.toBeCalled();
    });
    it('cacheCountry to be called', () => {
      const data = { placeId: 1 };
      instance.getDefaultCountryParam = jest.fn(() => data);
      instance.cacheCountry = jest.fn();
      instance.componentDidMount();
      expect(instance.cacheCountry).toBeCalled();
    });
  });
  describe('componentDidUpdate', () => {
    it('cacheCountry to be called', () => {
      instance.cacheCountry = jest.fn();
      wrapper.setProps({ placeId: '1', location: 'Manila' });
      instance.componentDidUpdate({ placeId: '1' });
      expect(instance.cacheCountry).toBeCalled();
    });
    it('cacheCountry to be called when changed', () => {
      instance.cacheCountry = jest.fn();
      wrapper.setProps({ placeId: '1', location: 'Manila' });
      instance.componentDidUpdate({ placeId: '2' });
      expect(instance.cacheCountry).toBeCalled();
    });
    it('cacheCountry not to be called when place id empty', () => {
      instance.cacheCountry = jest.fn();
      instance.componentDidUpdate({ placeId: '2' });
      expect(instance.cacheCountry).not.toBeCalled();
    });
  });
  describe('getDefaultCountryParam', () => {
    it('cacheCountry to be called', () => {
      wrapper.setProps({ placeId: '1' });
      expect(instance.getDefaultCountryParam().placeId).toEqual('1');
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

  describe('render()', () => {
    it('should render', () => {
      ability.can = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
