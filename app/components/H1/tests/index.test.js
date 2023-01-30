import toJSON from 'enzyme-to-json';
import React from 'react';
import { shallow } from 'enzyme';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { H1Test } from '../index';
import styleSheet from '../commonStyle';
import styles from '../style';

describe('<H1 />', () => {
  const classes = styleSheet({});
  it('should test styles', () => {
    const snapshot = mockStylesheet('', styles, coolTheme);
    expect(snapshot).toMatchSnapshot();
    expect(typeof styleSheet({ colorTone: 'warm' })).toBe('object');
  });
  it('should have commonStyle classname', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H1Test classes={classes}>{children}</H1Test>,
    );
    expect(renderedComponent.find('.fontWeight.color.fontFamily').length).toBe(
      1,
    );
  });
  it('should have letterSpacing', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H1Test classes={classes} weight="light" letterSpace>
        {children}
      </H1Test>,
    );
    expect(renderedComponent.find('.letterSpacing').length).toBe(1);
  });
  it('should have textTransform', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H1Test classes={classes} transform="Uppercase" letterSpace>
        {children}
      </H1Test>,
    );
    expect(renderedComponent.find('.textTransform').length).toBe(1);
  });

  it('should accept noMargin', () => {
    const snapshot = shallow(<div>{H1Test({ classes, noMargin: true })}</div>);

    expect(toJSON(snapshot)).toMatchSnapshot();
  });
});
