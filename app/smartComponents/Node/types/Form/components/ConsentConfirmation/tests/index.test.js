import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import ConsentedBy from 'smartComponents/Node/parts/ConsentedBy';
import { ConsentConfirmation } from '../index';

describe('<ConsentConfirmation />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<ConsentConfirmation />);
    instance = rendered.instance();
  });

  describe('getValue', () => {
    it('should return consentId', () => {
      rendered.setProps({ consentId: true });
      expect(instance.getValue()).toBe(true);
    });
  });

  describe('getConsentedOnBehalf', () => {
    it('should return userId !== consentedUserId', () => {
      rendered.setProps({
        userId: 1,
      });
      expect(instance.getConsentedOnBehalf(2)).toBe(true);
    });
  });

  describe('handleChange', () => {
    it('should setState', () => {
      rendered.setState({
        changed: false,
      });
      instance.handleChange();
      expect(rendered.state().changed).toBe(true);
    });
    it('should not setState', () => {
      rendered.setState({
        changed: true,
      });
      instance.handleChange();
      expect(rendered.state().changed).toBe(true);
    });
  });

  describe('renderConsentPart', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderConsentPart(ConsentedBy, 'variant'),
      );
    });
  });

  describe('renderCheckboxConsentedLabel', () => {
    it('should match snapshot if getConsentedOnBehalf is true', () => {
      instance.getConsentedOnBehalf = jest.fn(() => true);
      instance.renderConsentPart = jest.fn(() => 'renderSomething');
      TEST_HELPERS.expectMatchSnapshot(instance.renderCheckboxConsentedLabel);
    });
    it('should match snapshot if getConsentedOnBehalf is false', () => {
      instance.getConsentedOnBehalf = jest.fn(() => false);
      instance.renderConsentPart = jest.fn(() => 'renderSomething');
      TEST_HELPERS.expectMatchSnapshot(instance.renderCheckboxConsentedLabel);
    });
  });
});
