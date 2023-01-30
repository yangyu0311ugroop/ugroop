import { URL_HELPERS } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Password } from '../index';

describe('<Password />', () => {
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

    rendered = shallow(<Password {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Password).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleDiscard()', () => {
    it('should return null', () => {
      window.confirm = jest.fn(() => false);

      expect(instance.handleDiscard(true)()).toBe(null);
    });

    it('should handleDiscard', () => {
      rendered.setState({ isChanged: false });
      instance.goPersonalInfo = jest.fn(() => 'goPersonalInfo');

      expect(instance.handleDiscard()()).toBe('goPersonalInfo');
    });
  });

  describe('goPersonalInfo()', () => {
    it('should goPersonalInfo()', () => {
      URL_HELPERS.goToUrl = jest.fn(() => () => 'URL_HELPERS.goToUrl');

      instance.goPersonalInfo();

      TEST_HELPERS.expectCalled(URL_HELPERS.goToUrl);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
