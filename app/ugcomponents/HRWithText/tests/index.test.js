import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { HRWithText } from '../index';

describe('<HRWithText />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<HRWithText {...props} />);
  });

  it('should exists', () => {
    expect(HRWithText).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
