import { shallow } from 'enzyme';
import React from 'react';
import { UGLiveSupport } from '../index';

describe('<UGLiveSupport />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<UGLiveSupport />);
  });

  it('should exists', () => {
    expect(UGLiveSupport).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
});
