import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TourCount } from '../index';

describe('<TourCount />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<TourCount {...props} />);
    instance = rendered.instance();
  });

  describe('getStrippedOwnProps', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.getStrippedOwnProps);
    });
  });

  describe('renderWithLabel', () => {
    it('should return childrenArray length', () => {
      rendered.setProps({ withLabel: false, childrenArray: [1] });
      expect(instance.renderWithLabel()).toEqual(1);
    });
    it('should return no tours', () => {
      rendered.setProps({ withLabel: true, childrenArray: [] });
      expect(instance.renderWithLabel()).toEqual('No tours');
    });
    it('should return withLabel 1 tour', () => {
      rendered.setProps({ withLabel: true, childrenArray: [1] });
      expect(instance.renderWithLabel()).toEqual('1 tour');
    });
    it('should return withLabel many tours', () => {
      rendered.setProps({ withLabel: true, childrenArray: [1, 2] });
      expect(instance.renderWithLabel()).toEqual('2 tours');
    });
  });

  describe('renderTextOnly', () => {
    it('should match snapshot', () => {
      instance.renderWithLabel = jest.fn(() => 'renderWithLabel');
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
  });

  describe('renderProp', () => {
    it('should match snapshot', () => {
      rendered.setProps({ children: jest.fn(), childrenArray: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
    });
  });

  describe('renderWithOrgName', () => {
    it('should match snapshot with childrenArray.length', () => {
      rendered.setProps({ childrenArray: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderWithOrgName);
    });
    it('should match snapshot with childrenArray.length > 1', () => {
      rendered.setProps({ childrenArray: [1, 2] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderWithOrgName);
    });
    it('should match snapshot if there are no childrenArray', () => {
      rendered.setProps({ childrenArray: [] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderWithOrgName);
    });
  });

  describe('renderWithOrgNameStringOnly', () => {
    it('should return string', () => {
      rendered.setProps({ childrenArray: [1, 2], name: 'name' });
      expect(instance.renderWithOrgNameStringOnly()).toEqual('name - 2');
    });
  });

  describe('renderOrgCountOnly', () => {
    it('should return count', () => {
      rendered.setProps({ childrenArray: [1, 2] });
      expect(instance.renderOrgCountOnly()).toEqual('2');
    });
  });

  describe('renderSpanOnly', () => {
    it('should match snapshot', () => {
      instance.renderWithLabel = jest.fn(() => 'renderWithLabel');
      TEST_HELPERS.expectMatchSnapshot(instance.renderSpanOnly);
    });
  });

  describe('renderStringOnly', () => {
    it('should match snapshot', () => {
      instance.renderWithLabel = jest.fn(() => 'renderWithLabel');
      TEST_HELPERS.expectMatchSnapshot(instance.renderStringOnly);
    });
  });

  describe('renderTitle', () => {
    it('should match snapshot', () => {
      instance.renderWithLabel = jest.fn(() => 'renderWithLabel');
      TEST_HELPERS.expectMatchSnapshot(instance.renderTitle);
    });
  });
});
