import toJSON from 'enzyme-to-json';
import React from 'react';
import { shallow } from 'enzyme';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { H3Test } from '../index';
import style from '../style';

describe('<H3 />', () => {
  const classes = mockStylesheet('H3', style, coolTheme);
  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H3Test classes={classes}>{children}</H3Test>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should have letterSpacing', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H3Test classes={classes} weight="light" letterSpace>
        {children}
      </H3Test>,
    );
    expect(renderedComponent.find('.letterSpacing').length).toBe(1);
  });
  it('should have textTransform', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H3Test classes={classes} transform="Uppercase" letterSpace>
        {children}
      </H3Test>,
    );
    expect(renderedComponent.find('.textTransform').length).toBe(1);
  });
  it('should accept noMargin', () => {
    const snapshot = shallow(<div>{H3Test({ classes, noMargin: true })}</div>);

    expect(toJSON(snapshot)).toMatchSnapshot();
  });
});
