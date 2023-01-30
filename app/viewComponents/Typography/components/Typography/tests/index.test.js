import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import coolTheme from 'theme/coolTheme';
import warmTheme from 'theme/warmTheme';
import mockStylesheet from 'utils/mockStylesheet';
import types from 'utils/constants/fontTypes';
import { Typography } from '../index';
import style from '../style';

const classes = mockStylesheet('Typography', style, coolTheme);

describe('<Typography />', () => {
  it('should match snapshot', () => {
    const keys = Object.keys(types);
    keys.forEach(type => {
      const snapshot = shallow(<Typography classes={classes} type={type} />);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  it('should have warm color', () => {
    const snapshot = mockStylesheet('', style, warmTheme);
    expect(snapshot).toMatchSnapshot();
  });

  it('should have letterSpace', () => {
    const snapshot = shallow(
      <Typography type="" classes={{}} letterSpace>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have dense', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ noMargin: 'dense' }} dense>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have noMargin', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ noMargin: 'noMargin' }} noMargin>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have success', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ success: 'success' }} success>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have primary', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ primary: 'primary' }} primary>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have error', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ error: 'error' }} error>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have transform', () => {
    const snapshot = shallow(
      <Typography
        type=""
        classes={{ 'transform.capitalize': 'transform.capitalize' }}
        transform="capitalize"
      >
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have fontStyle', () => {
    const snapshot = shallow(
      <Typography
        type=""
        classes={{ 'fontStyle.italic': 'fontStyle.italic' }}
        fontStyle="italic"
      >
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have textAlign', () => {
    const snapshot = shallow(
      <Typography
        type=""
        classes={{ 'textAlign.center': 'textAlign.center' }}
        textAlign="center"
      >
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have subtitle', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ subtitle: 'subtitle' }} subtitle>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have lavender', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ lavender: 'lavender' }} lavender>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have white', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ white: 'white' }} white>
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('should have light', () => {
    const snapshot = shallow(
      <Typography type="" classes={{ light: 'light' }} weight="light">
        Test
      </Typography>,
    );
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
});
