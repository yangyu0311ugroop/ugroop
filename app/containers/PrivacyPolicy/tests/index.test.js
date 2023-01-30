import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PRODUCTION } from 'appConstants';
import { PrivacyPolicy } from '../index';

describe('<PrivacyPolicy />', () => {
  const BUILD_URL = process.env.BUILD_URL;
  const BUILD_NUM = process.env.BUILD_NUM;
  const BRANCH = process.env.BRANCH;
  const STABLE_BRANCH = process.env.STABLE_BRANCH;
  const COMPARE_URL = process.env.COMPARE_URL;
  const APP_VERSION = process.env.APP_VERSION;
  const CI = process.env.CI;

  beforeEach(() => {
    process.env.BUILD_URL = 'buildUrl';
    process.env.BUILD_NUM = 'buildNum';
    delete process.env.BRANCH;
    delete process.env.STABLE_BRANCH;
    process.env.COMPARE_URL = 'compareUrl';
    process.env.APP_VERSION = 'appVersion';
    process.env.CI = '1';
  });

  afterEach(() => {
    process.env.BUILD_URL = BUILD_URL;
    process.env.BUILD_NUM = BUILD_NUM;
    process.env.BRANCH = BRANCH;
    process.env.STABLE_BRANCH = STABLE_BRANCH;
    process.env.COMPARE_URL = COMPARE_URL;
    process.env.APP_VERSION = APP_VERSION;
    process.env.CI = CI;
  });

  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    hi: 'ho',
  };

  beforeEach(() => {
    rendered = shallow(<PrivacyPolicy {...props} />);
  });

  it('should exists', () => {
    expect(PrivacyPolicy).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render when authenticated', () => {
    rendered.setProps({ account: true });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render when unauthenticated', () => {
    rendered.setProps({ account: false });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('still matches snapshot if not CI and PRODUCTION', () => {
    delete process.env.CI;
    process.env.BRANCH = PRODUCTION;
    const wrapper = shallow(<PrivacyPolicy {...props} />);
    wrapper.setProps({ account: false });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('still matches snapshot if BRANCH=stage', () => {
    process.env.BRANCH = 'stage';
    const wrapper = shallow(<PrivacyPolicy {...props} />);
    wrapper.setProps({ account: false });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
