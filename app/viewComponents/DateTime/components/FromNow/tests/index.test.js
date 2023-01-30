import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { DateTimeFromNow } from '../index';

describe('<DateTimeFromNow />', () => {
  let rendered;

  beforeEach(() => {
    MOMENT_HELPERS.renderFromNow = jest.fn(value => value);
    MOMENT_HELPERS.renderDayDateTime = jest.fn(value => value);
    rendered = shallow(<DateTimeFromNow dateTime="2019-01-01T00:00:00.000Z" />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(DateTimeFromNow).toBeDefined();
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
