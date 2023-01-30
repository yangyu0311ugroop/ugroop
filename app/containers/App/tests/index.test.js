import { shallow } from 'enzyme';
import React from 'react';
import { App } from '../index';

jest.mock('lib/awsLib', () => ({
  Auth: {
    configure: jest.fn(),
  },
}));

describe('Component: APP testing', () => {
  it('renders without exploding', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.length).toBe(1);
  });
});
