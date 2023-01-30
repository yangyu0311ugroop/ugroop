import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { List } from '../index';
import {
  TOUR_INTERESTED,
  TOUR_ORGANIZER,
  TOUR_PARTICIPANT,
} from '../../../../../../../utils/modelConstants';

describe('<List />', () => {
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
    rendered = shallow(<List {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(List).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderCount', () => {
    it('should match snapshot', () => {
      rendered.setProps({ followers: [] });
      const snapshot = shallow(<div>{instance.renderCount()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderListWithOldData', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderListWithOldData()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderList', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderList(1)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('getFollowerIds', () => {
    it('should return interestedPersonIds', () => {
      const roles = [TOUR_ORGANIZER];
      const interestedPersonIds = [1, 2];

      rendered.setProps({ roles });

      expect(instance.getFollowerIds(interestedPersonIds)).toEqual([1, 2]);
    });

    it('should return participantFollowerNodeIds', () => {
      const roles = [TOUR_PARTICIPANT];
      const participantFollowerNodeIds = [1, 2];

      rendered.setProps({ roles });

      expect(instance.getFollowerIds(participantFollowerNodeIds)).toEqual([
        1,
        2,
      ]);
    });

    it('should return userFollowerNodeId', () => {
      const roles = [TOUR_INTERESTED];
      const userFollowerNodeId = [1];

      rendered.setProps({ roles });

      expect(instance.getFollowerIds(userFollowerNodeId)).toEqual([1]);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if followers is greater than 0', () => {
      const roles = [TOUR_ORGANIZER];
      rendered.setProps({
        filteredFollowers: [1, 2],
        oldParentNodeId: 0,
        roles,
        indentLeft: true,
        xsDown: false,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render with old data', () => {
      instance.renderListWithOldData = jest.fn(() => 'renderListWithOldData');
      rendered.setProps({ oldParentNodeId: 1 });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
