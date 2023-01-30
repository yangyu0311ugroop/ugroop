import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { H5Test } from '../index';
import style from '../style';

describe('<H5 />', () => {
  const classes = mockStylesheet('H5', style, coolTheme);
  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H5Test classes={classes}>{children}</H5Test>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
  it('should have letterSpacing', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H5Test classes={classes} weight="light" letterSpace>
        {children}
      </H5Test>,
    );
    expect(renderedComponent.find('.letterSpacing').length).toBe(1);
  });
  it('should have textTransform', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H5Test classes={classes} transform="Uppercase" letterSpace>
        {children}
      </H5Test>,
    );
    expect(renderedComponent.find('.textTransform').length).toBe(1);
  });
  it('should have error', () => {
    const renderedComponent = shallow(
      <H5Test classes={{ error: 'error' }} error>
        Test
      </H5Test>,
    );

    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
  it('should have success', () => {
    const renderedComponent = shallow(
      <H5Test classes={{ success: 'success' }} success>
        Test
      </H5Test>,
    );

    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
  it('should have textCenter', () => {
    const renderedComponent = shallow(
      <H5Test classes={{ textCenter: 'textCenter' }} textCenter>
        Test
      </H5Test>,
    );

    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
  it('should have dense', () => {
    const renderedComponent = shallow(
      <H5Test classes={{ dense: 'dense' }} dense>
        Test
      </H5Test>,
    );

    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});
