import React from 'react';
import { shallow } from 'enzyme';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { H6Test } from '../index';
import style from '../style';

describe('<H6 />', () => {
  const classes = mockStylesheet('H6', style, coolTheme);
  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H6Test classes={classes}>{children}</H6Test>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should have letterSpacing', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H6Test classes={classes} weight="light" letterSpace>
        {children}
      </H6Test>,
    );
    expect(renderedComponent.find('.letterSpacing').length).toBe(1);
  });
  it('should have textTransform', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H6Test classes={classes} transform="Uppercase" letterSpace>
        {children}
      </H6Test>,
    );
    expect(renderedComponent.find('.textTransform').length).toBe(1);
  });
});
