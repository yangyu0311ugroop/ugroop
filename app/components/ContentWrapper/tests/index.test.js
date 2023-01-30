import React from 'react';
import { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import { ContentWrapperTest } from '../index';

const styleSheet = {
  root: {
    height: '100vh',
  },
};

describe('<ContentWrapper />', () => {
  it('should render a prop and return Grid', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <ContentWrapperTest classes={styleSheet}>{children}</ContentWrapperTest>,
    );
    expect(renderedComponent.type()).toEqual(Grid);
  });
});
