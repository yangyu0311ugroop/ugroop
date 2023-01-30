import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DeclineNotificationWrapper } from '../wrapper';

describe('<NotFound />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<DeclineNotificationWrapper />);
  });

  it('should exists', () => {
    expect(DeclineNotificationWrapper).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render properly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
