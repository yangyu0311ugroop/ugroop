import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PassportCard } from '../index';

describe('<PassportCard />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<PassportCard {...props} />);
  });

  it('should exists', () => {
    expect(PassportCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render something different when isDefault is true', () => {
    rendered.setProps({
      isDefault: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
