/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import Logo from 'ugcomponents/Logo/index';
import forgotBackground from 'shareAssets/bg-login.jpg';
import defaultBackground from 'shareAssets/bg-login-2.jpg';
import { UGAuthenticationLayout } from '../index';

describe('UGAuthenticationLayout/tests/index.test.js', () => {
  const BUILD_URL = process.env.BUILD_URL;
  const BUILD_NUM = process.env.BUILD_NUM;
  const BRANCH = process.env.BRANCH;
  const STABLE_BRANCH = process.env.STABLE_BRANCH;
  const COMPARE_URL = process.env.COMPARE_URL;
  const APP_VERSION = process.env.APP_VERSION;
  const CI = process.env.CI;

  const classes = {};
  const children = <div>Hi</div>;

  let rendered;
  let instance;

  beforeEach(() => {
    process.env.BUILD_URL = 'buildUrl';
    process.env.BUILD_NUM = 'buildNum';
    delete process.env.BRANCH;
    delete process.env.STABLE_BRANCH;
    process.env.COMPARE_URL = 'compareUrl';
    process.env.APP_VERSION = 'appVersion';
    process.env.CI = '1';
    rendered = shallow(
      <UGAuthenticationLayout classes={classes}>
        {children}
      </UGAuthenticationLayout>,
    );
    instance = rendered.instance();
  });
  afterEach(() => {
    process.env.BUILD_URL = BUILD_URL;
    process.env.BUILD_NUM = BUILD_NUM;
    process.env.BRANCH = BRANCH;
    process.env.STABLE_BRANCH = STABLE_BRANCH;
    process.env.COMPARE_URL = COMPARE_URL;
    process.env.APP_VERSION = APP_VERSION;
    process.env.CI = CI;
    jest.clearAllMocks();
  });

  describe('<UGAuthenticationLayout />', () => {
    it('should exists', () => {
      expect(UGAuthenticationLayout).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('config()  ', () => {
    it('should setState', () => {
      const newState = { hi: 'hoo' };
      instance.config(newState);
      expect(rendered.state().hi).toBe(newState.hi);
    });
  });

  describe('reset()  ', () => {
    it('should setState to props.setting', () => {
      instance.reset();
      expect(rendered.state()).toEqual(instance.props.setting);
    });
  });

  describe('renderLogo()  ', () => {
    it('should render Logo component', () => {
      const renderLogo = shallow(instance.renderLogo());
      expect(renderLogo.find(Logo).length).toBe(1);
    });
  });

  describe('componentDidMount()  ', () => {
    it('should set to default background', () => {
      const history = { location: { pathname: '/' } };
      rendered.setProps({ history });
      rendered.setState({ currentBG: 'forgot' });
      instance.componentDidMount();
      expect(instance.state.currentBG).toBe('auth');
      expect(instance.state.background).toBe(defaultBackground);
    });
    it('should set to forgot background', () => {
      const history = { location: { pathname: '/forgot' } };
      rendered.setProps({ history });
      rendered.setState({ currentBG: 'auth' });
      instance.componentDidMount();
      expect(instance.state.currentBG).toBe('forgot');
      expect(instance.state.background).toBe(forgotBackground);
    });
  });

  describe('renderSidebar()  ', () => {
    it('sidebar is truthy', () => {
      const sidebar = <div>Sidebar</div>;
      const renderSidebar = shallow(instance.renderSidebar(sidebar));
      expect(renderSidebar.contains(sidebar)).toBe(true);
    });
    it('sidebar is falsy', () => {
      const renderSidebar = shallow(instance.renderSidebar());
      expect(renderSidebar).toBeDefined();
    });
  });

  describe('renderVersion()', () => {
    it('still matches snapshot if not CI', () => {
      delete process.env.CI;
      expect(instance.renderVersion()).toMatchSnapshot();
    });
    it('still matches snapshot if CI', () => {
      expect(instance.renderVersion()).toMatchSnapshot();
    });
    it('still matches snapshot if CI and BRANCH=stage', () => {
      process.env.BRANCH = 'stage';
      expect(instance.renderVersion()).toMatchSnapshot();
    });
  });
});
