import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { H4Test } from '../index';
import style from '../style';

describe('<H4 />', () => {
  const classes = mockStylesheet('H4', style, coolTheme);
  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H4Test classes={classes}>{children}</H4Test>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should have letterSpacing', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H4Test classes={classes} weight="light" letterSpace>
        {children}
      </H4Test>,
    );
    expect(renderedComponent.find('.letterSpacing').length).toBe(1);
  });
  it('should have textTransform', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H4Test classes={classes} transform="Uppercase" letterSpace>
        {children}
      </H4Test>,
    );
    expect(renderedComponent.find('.textTransform').length).toBe(1);
  });

  it('should have dense', () => {
    const renderedComponent = shallow(
      <H4Test classes={{ dense: 'dense' }} dense>
        Test
      </H4Test>,
    );

    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});
