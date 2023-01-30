import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import { Badge } from '../index';

describe('<Badge />', () => {
  let rendered;

  const props = {
    classes: {},
    Component: 'p',
  };

  beforeEach(() => {
    rendered = shallow(<Badge {...props} />);
  });

  it('should exists', () => {
    expect(Badge).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render something', () => {
    rendered.setProps({
      variant: VARIANTS.SQUARE,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
