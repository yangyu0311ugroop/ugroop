import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DateTimeTooltip } from '../index';

describe('<DateTimeTooltip />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<DateTimeTooltip {...props} />);
  });

  it('should exists', () => {
    expect(DateTimeTooltip).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
