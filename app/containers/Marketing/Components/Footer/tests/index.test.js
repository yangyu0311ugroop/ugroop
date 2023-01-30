import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { FooterMarketing } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingFooter', stylesheet, theme);

describe('Footer', () => {
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

  it('still matches snapshot if not CI', () => {
    delete process.env.CI;
    const wrapper = shallow(<FooterMarketing classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('still matches snapshot if CI', () => {
    const wrapper = shallow(<FooterMarketing classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('still matches snapshot if CI and BRANCH=stage', () => {
    process.env.BRANCH = 'stage';
    const wrapper = shallow(<FooterMarketing classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
