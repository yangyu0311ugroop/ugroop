import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TermsOfService } from '../index';

describe('<TermsOfService />', () => {
  let rendered;
  process.env.BRANCH = 'production';
  process.env.APP_VERSION = '1.0.0';
  process.env.BUILD_URL = 'www.google.com';
  process.env.BUILD_NUM = '2323';
  process.env.CI = '1';

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
    rendered = shallow(<TermsOfService {...props} />);
  });

  it('should exists', () => {
    expect(TermsOfService).toBeDefined();
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
});
