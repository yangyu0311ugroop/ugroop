/**
 * Created by paulcedrick on 6/21/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import mHelper from 'utils/helpers/moment';
import stylesheet from '../styles';
import { ItemDuration } from '../index';

const mockStyle = mockStylesheet('ItemDuration', stylesheet);

describe('<ItemDuration /> component', () => {
  let rendered;

  const duration = 2;

  beforeEach(() => {
    mHelper.getDate = jest.fn(() => '01-01-1994');
    mHelper.getDay = jest.fn(() => 'Sun');
    mHelper.getDateWithFormat = jest.fn(() => '01-01-1994');
    rendered = shallow(
      <ItemDuration classes={mockStyle} duration={duration} />,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    if (global.gc) {
      global.gc();
    }
  });

  it('should exist', () => {
    expect(rendered.render()).toBeDefined();
  });

  it('should render only the duration if weekDay and startDate do not exist', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render startDate if startDate exist', () => {
    rendered.setProps({
      startDate: '01-01-1994',
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render day if weekDay exist', () => {
    rendered.setProps({
      weekDay: 0,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should remove s in days if duration is 1', () => {
    rendered.setProps({
      duration: 1,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
