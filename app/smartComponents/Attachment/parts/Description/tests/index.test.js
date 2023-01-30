import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EMPTY_RTE } from 'appConstants';
import React from 'react';
import { shallow } from 'enzyme';
import { AttachmentDescription } from '../index';

describe('<AttachmentDescription />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<AttachmentDescription {...props} />);
    instance = rendered.instance();
  });

  describe('getValue', () => {
    it('should return description', () => {
      rendered.setProps({ description: 'wow' });
      expect(instance.getValue()).toEqual('wow');
    });
    it('should return empty string', () => {
      rendered.setProps({ description: null });
      expect(instance.getValue()).toEqual('');
    });
  });

  describe('getRTEValue', () => {
    it('should return description', () => {
      rendered.setProps({ description: 'wow' });
      expect(instance.getRTEValue()).toEqual('wow');
    });
    it('should return empty string', () => {
      rendered.setProps({ description: null });
      expect(instance.getRTEValue()).toEqual(EMPTY_RTE);
    });
  });

  describe('getRTEClassName', () => {
    it('should return something', () => {
      rendered.setProps({ width: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.getRTEClassName);
    });
  });

  describe('getTextClassName', () => {
    it('should return something if there is width', () => {
      rendered.setProps({
        width: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.getTextClassName);
    });
    it('should return null if there is no width', () => {
      rendered.setProps({
        width: null,
      });
      expect(instance.getTextClassName()).toEqual(null);
    });
  });

  describe('renderTextField', () => {
    it('should match snapshot if richText is true', () => {
      rendered.setProps({
        richText: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextField);
    });
    it('should match snapshot if richText is false', () => {
      rendered.setProps({
        richText: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextField);
    });
  });

  describe('renderTextOnly', () => {
    it('should match snapshot if richText is true', () => {
      rendered.setProps({
        richText: true,
        compact: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
    it('should return getValue', () => {
      rendered.setProps({
        richText: false,
      });
      instance.getValue = jest.fn(() => 'getValue');
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
  });
});
