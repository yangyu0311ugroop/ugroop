import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TemplateCardFooter } from '../index';

describe('<TemplateCardFooter />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<TemplateCardFooter {...props} />);
  });

  it('should exists', () => {
    expect(TemplateCardFooter).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
