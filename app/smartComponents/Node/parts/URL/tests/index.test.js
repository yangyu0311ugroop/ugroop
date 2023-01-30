import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Url } from '../index';

describe('<Url />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<Url classes={{}} />);
    instance = rendered.instance();
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderNodeProp = jest.fn(() => 'renderNodeProp');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('renderProp()', () => {
    it('should renderLink', () => {
      rendered.setProps({
        children: jest.fn(),
        url: 'url',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
    });
  });

  describe('renderLink()', () => {
    it('should return null', () => {
      rendered.setProps({ url: null });

      expect(instance.renderLink()).toBe(null);
    });

    it('should renderLink', () => {
      rendered.setProps({ url: 'url' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });

    it('should render node prop', () => {
      instance.renderNodeProp = jest.fn(() => '');
      rendered.setProps({ editable: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });

    it('should render url', () => {
      rendered.setProps({ url: 'www.google.com' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });
  });

  describe('renderTextOnly()', () => {
    it('should return null', () => {
      rendered.setProps({ url: null });

      expect(instance.renderTextOnly()).toBe(null);
    });

    it('should render node prop', () => {
      instance.renderNodeProp = jest.fn(() => '');
      rendered.setProps({ editable: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });

    it('should renderTextOnly', () => {
      rendered.setProps({ url: 'www.facebook.com' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
    it('should render title', () => {
      rendered.setProps({ url: 'www.facebook.com', variant: 'title' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should still render title value is null', () => {
      rendered.setProps({ url: null, variant: 'title' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
