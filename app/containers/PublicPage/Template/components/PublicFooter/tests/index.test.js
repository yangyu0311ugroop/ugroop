import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PublicFooter } from '../index';

describe('<PublicFooter />', () => {
  let rendered;
  let OLD_ENV;

  beforeEach(() => {
    OLD_ENV = process.env;
    delete process.env.CI;
    delete process.env.BRANCH;
    rendered = shallow(
      <PublicFooter classes={{}} location={{ search: '?org=1' }} />,
    );
  });

  afterEach(() => {
    process.env = { ...OLD_ENV };
    delete process.env.CI;
    delete process.env.BRANCH;
  });

  it('should exists', () => {
    expect(PublicFooter).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render SharedBy Avatar', () => {
    rendered.setProps({ sharedBy: 1, photo: '/img_url' });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render no Org', () => {
    rendered.setProps({ location: { search: '' } });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('render builds', () => {
    it('should render latest build', () => {
      process.env = { ...OLD_ENV, CI: true };
      const versionRender = shallow(<PublicFooter classes={{}} />);
      expect(toJSON(versionRender)).toMatchSnapshot();
    });

    it('should render stage build', () => {
      process.env = { ...OLD_ENV, CI: true, BRANCH: 'stage' };
      const versionRender = shallow(<PublicFooter classes={{}} />);
      expect(toJSON(versionRender)).toMatchSnapshot();
    });
  });
});
