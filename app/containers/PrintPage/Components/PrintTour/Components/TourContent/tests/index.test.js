import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TourContent } from '../index';

const mockedSaga = {
  analyse: jest.fn(),
  dispatch: jest.fn(),
  setValue: jest.fn(),
  isLoading: jest.fn(),
  dispatchTo: jest.fn(),
};

const props = {
  tabId: 1,
  dayIds: [1, 2, 3],
  classes: {},
};

describe('TourContent', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(<TourContent resaga={mockedSaga} {...props} />);
    instance = component.instance();
  });
  describe('render', () => {
    it('check snapshot', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
