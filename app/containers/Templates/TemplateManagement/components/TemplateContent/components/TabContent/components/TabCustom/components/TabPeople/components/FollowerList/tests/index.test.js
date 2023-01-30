import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import {
  TOUR_INTERESTED,
  TOUR_ORGANIZER,
  TOUR_PARTICIPANT,
} from 'utils/modelConstants';
import { FollowerList } from '../index';

describe('<FollowerList />', () => {
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
    rendered = shallow(<FollowerList {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(FollowerList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getFollowerIds', () => {
    it('should return interestedPersonIds', () => {
      const roles = [TOUR_ORGANIZER];
      const interestedPersonIds = [1, 2];

      rendered.setProps({ roles, interestedPersonIds });

      expect(instance.getFollowerIds()).toEqual([1, 2]);
    });

    it('should return participantFollowerNodeIds', () => {
      const roles = [TOUR_PARTICIPANT];
      const participantFollowerNodeIds = [1, 2];

      rendered.setProps({ roles, participantFollowerNodeIds });

      expect(instance.getFollowerIds()).toEqual([1, 2]);
    });

    it('should return userFollowerNodeId', () => {
      const roles = [TOUR_INTERESTED];
      const userFollowerNodeId = 1;

      rendered.setProps({ roles, userFollowerNodeId });

      expect(instance.getFollowerIds()).toEqual([1]);
    });
  });

  describe('handleAddParticipant', () => {
    it('should call setValue', () => {
      instance.handleAddParticipant();

      expect(resaga.setValue).toHaveBeenCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderProp', () => {
    it('should call children as function', () => {
      const children = jest.fn();

      rendered.setProps({ children });

      instance.renderProp();

      expect(children).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
