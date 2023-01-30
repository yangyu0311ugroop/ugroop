import { URL_HELPERS } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Birthday } from '../index';

describe('<Birthday />', () => {
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

    rendered = shallow(<Birthday {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Birthday).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleChange()', () => {
    it('should handleChange()', () => {
      instance.handleChange({}, true);

      expect(rendered.state().isChanged).toBe(true);
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
      instance.goPersonalInfo = jest.fn();

      instance.handleDiscard();

      TEST_HELPERS.expectCalled(instance.goPersonalInfo);
    });
  });

  describe('goPersonalInfo()', () => {
    it('should goPersonalInfo()', () => {
      URL_HELPERS.goToUrl = jest.fn(() => () => 'goToUrl');

      instance.goPersonalInfo();

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
    });
  });

  describe('closeSuccess()', () => {
    it('should closeSuccess()', () => {
      instance.closeSuccess();

      expect(rendered.state().isChanged).toBe(false);
    });
  });

  describe('handleSuccess()', () => {
    it('should handleSuccess()', () => {
      instance.handleSuccess();

      expect(rendered.state().saving).toBe(false);
      expect(rendered.state().success).toBe(true);
      expect(rendered.state().isChanged).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
