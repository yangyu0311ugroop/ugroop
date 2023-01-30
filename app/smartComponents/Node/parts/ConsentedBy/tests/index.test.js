import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ConsentedBy } from '../index';

describe('<ConsentedBy />', () => {
  let rendered;
  let instance;

  const intl = {
    formatMessage: jest.fn(() => 'msg'),
  };

  beforeEach(() => {
    rendered = shallow(<ConsentedBy intl={intl} />);
    instance = rendered.instance();
  });

  describe('getConsentedOnBehalf', () => {
    it('should return boolean value', () => {
      rendered.setProps({
        userId: 1,
        value: 2,
      });
      expect(instance.getConsentedOnBehalf()).toBe(true);
    });
  });

  describe('renderIconConsentedTitle', () => {
    it('should return something if getConsentedOnBehalf', () => {
      instance.getConsentedOnBehalf = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderIconConsentedTitle);
    });
    it('should return something if getConsentedOnBehalf is false', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIconConsentedTitle);
    });
  });

  describe('renderIconNotConsentedTitle', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIconNotConsentedTitle);
    });
  });

  describe('renderIcon', () => {
    it('should match snapshot if requiresConsent', () => {
      rendered.setProps({
        requiresConsent: true,
      });
      instance.renderIconNotConsentedTitle = jest.fn(() => 'yawza');
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcon);
    });
    it('should match snapshot if requiresConsent is false', () => {
      rendered.setProps({
        requiresConsent: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcon);
    });
    it('should match snapshot if requiresConsent and value is true', () => {
      rendered.setProps({
        requiresConsent: true,
        value: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcon);
    });
  });

  describe('renderLink', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });
  });

  describe('renderProp', () => {
    it('should match snapshot', () => {
      LOGIC_HELPERS.ifFunction = jest.fn(() => 'bang');
      instance.renderProp();
      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
    });
  });
});
