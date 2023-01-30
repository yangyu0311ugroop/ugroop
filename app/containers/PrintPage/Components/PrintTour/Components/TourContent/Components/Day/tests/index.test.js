import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Day } from '../index';

const mockedSaga = {
  analyse: jest.fn(),
  dispatch: jest.fn(),
  setValue: jest.fn(),
  isLoading: jest.fn(),
  dispatchTo: jest.fn(),
};

const props = {
  dayIds: [1, 2, 3],
  days: {
    1: { dayId: 1 },
    2: { dayId: 2, photos: {} },
    3: { dayId: 3, photos: [1] },
  },
  classes: {},
};

describe('TourContent/Day', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(<Day resaga={mockedSaga} {...props} />);
    instance = component.instance();
  });
  describe('render', () => {
    it('check snapshot', () => {
      expect(toJSON(instance.render())).toMatchSnapshot();
    });
  });
});
