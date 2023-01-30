import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { SupplierNumber } from '../index';

describe('<SupplierNumber />', () => {
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
    rendered = shallow(<SupplierNumber {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SupplierNumber).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getTextProps', () => {
    it('should not change text props value if this.TextProps value was already defined', () => {
      instance.TextProps = { nn: 'qq' };
      const result = instance.getTextProps();

      expect(result).toEqual({ nn: 'qq' });
    });
  });

  describe('handleSubmit', () => {
    it('should create patchEvent request', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit();

      expect(TEMPLATE_API_HELPERS.patchEvent).toBeCalled();
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderActions', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderActions()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
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
      rendered.setProps({ placeId: '1', location: 'Manila' });
      instance.componentDidUpdate({ placeId: '1' });
      expect(instance.cacheCountry).toBeCalled();
    });
    it('cacheCountry to be called when changed', () => {
      instance.cacheCountry = jest.fn();
      rendered.setProps({ placeId: '1', location: 'Manila' });
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
      rendered.setProps({ placeId: '1' });
      expect(instance.getDefaultCountryParam().placeId).toEqual('1');
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
