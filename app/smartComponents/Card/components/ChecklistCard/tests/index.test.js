import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { UNSET } from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import { ChecklistCard } from '../index';

describe('<ChecklistCard />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<ChecklistCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChecklistCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleGetTimes()', () => {
    it('should not call dispatchTo', () => {
      expect(instance.handleGetTimes({})).toBe(DO_NOTHING);
      expect(instance.handleGetTimes({ checklistIds: [] })).toBe(DO_NOTHING);
    });

    it('should call dispatchTo', () => {
      instance.handleGetTimes({ checklistIds: [1, 2] });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('timeReducer()', () => {
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

      instance.handleGetTimesSuccess({ 1: { some: 'node' } });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });
  describe('renderLoading()', () => {
    it('should renderLoading', () => {
      const snapshot = shallow(<div>{instance.renderLoading()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTimes()', () => {
    it('should renderLoading #1', () => {
      rendered.setProps({ fetchChecklists: true });
      instance.renderLoading = jest.fn(() => 'renderLoading');

      expect(instance.renderTimes()).toBe('renderLoading');
    });

    it('should renderLoading #2', () => {
      rendered.setProps({ fetchChecklists: false, fetchTimes: true });
      instance.renderLoading = jest.fn(() => 'renderLoading');

      expect(instance.renderTimes()).toBe('renderLoading');
    });

    it('should renderEmpty', () => {
      rendered.setProps({
        fetchChecklists: false,
        fetchTimes: false,
        times: [],
      });
      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      expect(instance.renderTimes()).toBe('renderEmpty');
    });

    it('should renderTimes', () => {
      rendered.setProps({
        fetchChecklists: false,
        fetchTimes: false,
        times: [1, 2, 3],
      });

      const snapshot = shallow(<div>{instance.renderTimes()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
