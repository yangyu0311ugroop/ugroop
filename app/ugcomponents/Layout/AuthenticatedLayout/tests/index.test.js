/**
 * Created by quando on 1/7/17.
 */
jest.mock('ugcomponents/SnackBar');
/* eslint-disable */
// This disabling is for mocking purposes
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { AuthenticatedLayout } from '../index';
import Header from '../Header/index';
import Content from '../Content/index';
/* eslint-enable */
const hello = 'Hello';
const props = { hi: 'ho' };
const renderedComponent = shallow(
  <AuthenticatedLayout>{hello}</AuthenticatedLayout>,
);
const renderedComponentWithChildrenComponent = shallow(
  <AuthenticatedLayout {...props}>{hello}</AuthenticatedLayout>,
);

describe('<AuthenticatedLayout />', () => {
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

  it('should exists', () => {
    expect(AuthenticatedLayout).toBeDefined();
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
  });

  it('still matches snapshot if not CI', () => {
    delete process.env.CI;
    expect(
      toJSON(shallow(<AuthenticatedLayout>{hello}</AuthenticatedLayout>)),
    ).toMatchSnapshot();
  });
  it('still matches snapshot if CI', () => {
    expect(
      toJSON(shallow(<AuthenticatedLayout>{hello}</AuthenticatedLayout>)),
    ).toMatchSnapshot();
  });
  it('still matches snapshot if CI and BRANCH=stage', () => {
    process.env.BRANCH = 'stage';
    expect(
      toJSON(shallow(<AuthenticatedLayout>{hello}</AuthenticatedLayout>)),
    ).toMatchSnapshot();
  });

  describe('setBackground()', () => {
    it('should render correctly', () => {
      const instance = renderedComponent.instance();

      instance.setBackground('grey');

      expect(renderedComponent.state().background).toBe('grey');
    });
  });
});

describe('<AuthenticatedLayout /> props', () => {
  it('should pass props down to header correctly', () => {
    const header = renderedComponentWithChildrenComponent.find(Header);
    const headerProps = header.props();
    expect(headerProps).toBeDefined();
    expect(headerProps.hi).toBe(props.hi);
  });
});
