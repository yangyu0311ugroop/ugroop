import { shallow } from 'enzyme';
import React from 'react';
import { UGFooter } from '../index';

describe('<UGFooter />', () => {
  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<UGFooter {...props} />);
  });

  it('should exists', () => {
    expect(UGFooter).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
});
