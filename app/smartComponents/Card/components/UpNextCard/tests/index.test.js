import {
  GET_TIMES,
  GET_USER_RELATED_TEMPLATES,
  NODE_API,
  USER_API,
} from 'apis/constants';
import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme/build';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { UNSET } from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import { UpNextCardContainer } from '../index';

describe('<UpNextCardContainer />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<UpNextCardContainer {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UpNextCardContainer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should call dispatchTo with particular params', () => {
      instance.handleGetTimesSuccess = 'handleGetTimesSuccess';
      instance.handleGetTimes = jest.fn(arg1 => `${arg1}`);

      instance.componentDidMount();

      expect(resaga.dispatchTo).toBeCalledWith(
        USER_API,
        GET_USER_RELATED_TEMPLATES,
        {
          payload: { activeOnly: true },
          onSuccess: 'handleGetTimesSuccess',
        },
      );
    });
  });

  describe('timeReducer', () => {
    it('should return accumulate', () => {
      expect(instance.timeReducer({})('accumulate')).toBe('accumulate');
    });

    it('should create new key if not exist', () => {
      expect(
        instance.timeReducer({
          1: {
            calculated: { time: { start: { value: 'monday', real: true } } },
          },
        })({}, 1),
      ).toEqual({ monday: [1] });
    });

    it('should concat new key if exist', () => {
      expect(
        instance.timeReducer({
          1: {
            calculated: { time: { start: { value: 'monday', real: true } } },
          },
        })({ monday: [12] }, 1),
      ).toEqual({ monday: [12, 1] });
    });

    it('should not concat new key if mode=unset', () => {
      expect(
        instance.timeReducer({
          1: {
            calculated: {
              time: { start: { value: 'monday', real: true, mode: UNSET } },
            },
          },
        })({ monday: [12] }, 1),
      ).toEqual({ monday: [12] });
    });
  });

  describe('handleGetTimesSuccess()', () => {
    it('should call setValue', () => {
      instance.timeReducer = jest.fn(() => jest.fn(() => 'timeReducer'));

      instance.handleGetTimesSuccess({
        templateIds: [],
        eventIds: [1],
        excludedIds: [],
      })({
        1: { some: 'node' },
      });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });

    it('should call setValue', () => {
      instance.timeReducer = jest.fn(() => jest.fn(() => 'timeReducer'));

      instance.handleGetTimesSuccess({
        templateIds: [],
        eventIds: [],
        excludedIds: [],
      })();

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleGetTimes', () => {
    it('should return DO_NOTHING if targetIds does not exist in the results', () => {
      const results = {
        checklistIds: [],
        templateIds: [],
        tabtimelineIds: [],
        eventIds: [],
      };
      const result = instance.handleGetTimes('onSuccess')(results);

      expect(resaga.setValue).toBeCalledWith({
        timeNodes: {},
        times: [],
      });
      expect(result).toBe(DO_NOTHING);
    });

    it('should call dispatchTo with particular parameters', () => {
      const results = {
        checklistIds: [1, 2, 3],
        templateIds: [],
        tabtimelineIds: [],
        eventIds: [],
      };
      instance.handleGetTimes(jest.fn(() => 'onSuccess'))(results);

      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, GET_TIMES, {
        payload: { ids: [1, 2, 3] },
        onSuccess: 'onSuccess',
      });
    });
  });

  describe('handleFilterNode', () => {
    it('should return same array if node id is excluded', () => {
      const excludedIds = [2];

      const result = instance.handleFilterNode({}, excludedIds)({}, 2);

      expect(result).toEqual({});
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
