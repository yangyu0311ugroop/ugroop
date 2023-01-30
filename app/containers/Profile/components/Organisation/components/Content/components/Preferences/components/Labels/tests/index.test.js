import { URL_HELPERS } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Labels } from '../index';

describe('<DateFormat />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<Labels {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Labels).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleChange()', () => {
    it('should return true', () => {
      instance.handleChange({}, true);

      expect(rendered.state().isChanged).toBe(true);
      expect(rendered.state().success).toBe(false);
    });

    it('should return false', () => {
      instance.handleChange({}, false);

      expect(rendered.state().isChanged).toBe(false);
    });
  });

  describe('handleDiscard()', () => {
    it('should return null', () => {
      rendered.setState({ isChanged: true });
      window.confirm = jest.fn(() => false);

      expect(instance.handleDiscard()).toBe(null);
    });

    it('should handleDiscard', () => {
      rendered.setState({ isChanged: false });
      instance.goOrgPreference = jest.fn(() => 'goPersonalInfo');

      expect(instance.handleDiscard()).toBe('goPersonalInfo');
    });
  });

  describe('goOrgPreference()', () => {
    it('should goOrgPreference()', () => {
      URL_HELPERS.goToUrl = jest.fn(() => () => 'URL_HELPERS.goToUrl');

      instance.goOrgPreference();

      TEST_HELPERS.expectCalled(URL_HELPERS.goToUrl);
    });
  });
  describe('handleValidSubmit()', () => {
    it('should return null', () => {
      rendered.setState({ isChanged: false });

      expect(instance.handleValidSubmit()).toBe(null);
    });

    it('should handleValidSubmit', () => {
      rendered.setState({ isChanged: true });

      instance.handleValidSubmit({});

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
      expect(rendered.state().saving).toBe(true);
    });
  });

  describe('closeSuccess()', () => {
    it('should closeSuccess()', () => {
      instance.closeSuccess();

      expect(rendered.state().success).toBe(false);
    });
  });

  describe('handleSuccess()', () => {
    it('should handleSuccess()', () => {
      instance.handleSuccess();

      expect(rendered.state().success).toBe(true);
      expect(rendered.state().saving).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
