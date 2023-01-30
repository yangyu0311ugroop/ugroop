import toJSON from 'enzyme-to-json';
import React from 'react';
import { shallow } from 'enzyme';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { H2Test } from '../index';
import style from '../style';

describe('<H2 />', () => {
  const classes = mockStylesheet('H2', style, coolTheme);
  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H2Test classes={classes}>{children}</H2Test>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should have letterSpacing', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H2Test classes={classes} weight="light" letterSpace>
        {children}
      </H2Test>,
    );
    expect(renderedComponent.find('.letterSpacing').length).toBe(1);
  });
  it('should have textTransform', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H2Test classes={classes} transform="Uppercase" letterSpace>
        {children}
      </H2Test>,
    );
    expect(renderedComponent.find('.textTransform').length).toBe(1);
  });
  it('should accept noMargin', () => {
    const snapshot = shallow(<div>{H2Test({ classes, noMargin: true })}</div>);

    expect(toJSON(snapshot)).toMatchSnapshot();
  });
});
