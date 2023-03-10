import React from 'react';
import renderer from 'react-test-renderer';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<LoadingIndicator />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
