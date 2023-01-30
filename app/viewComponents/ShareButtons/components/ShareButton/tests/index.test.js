import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { FACEBOOK, TWITTER, WHATSAPP } from 'appConstants';
import { ShareButton } from '../index';

describe('<ShareButton />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<ShareButton {...props} />);
  });

  it('should exists', () => {
    expect(ShareButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render default: Mail', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render Facebook', () => {
    rendered.setProps({ type: FACEBOOK });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render Twitter', () => {
    rendered.setProps({ type: TWITTER });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render WhatsApp', () => {
    rendered.setProps({ type: WHATSAPP });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render medium', () => {
    rendered.setProps({ size: 'medium' });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
