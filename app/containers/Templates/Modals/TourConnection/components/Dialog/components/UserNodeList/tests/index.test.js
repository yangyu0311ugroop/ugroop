import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';

import { UserNodeList } from '../index';

describe('UserNodeList', () => {
  const resagaMock = {
    setValue: jest.fn(),
  };

  const props = {
    classes: {},
    resaga: resagaMock,
  };

  let rendered;
  let instance;
  beforeEach(() => {
    rendered = shallow(<UserNodeList userId={1} nodeId={1} {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  describe('<UserNodeActions />', () => {
    it('should exists', () => {
      expect(UserNodeList).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });
  describe('getInterestedUserNodeId()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.getInterestedUserNodeId())).toMatchSnapshot();
    });
  });
  describe('getParticipantUserNodeId()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.getParticipantUserNodeId())).toMatchSnapshot();
    });
  });
  describe('renderUserNode()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.renderUserNode(1, true))).toMatchSnapshot();
    });
    it('Should render correctly if no parameter', () => {
      expect(toJSON(instance.renderUserNode(1))).toMatchSnapshot();
    });
  });
  describe('renderPart()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.renderPart({}))).toMatchSnapshot();
    });
  });
  describe('renderOtherNone()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.renderOtherNone())).toMatchSnapshot();
    });
  });
  describe('renderAddOthers()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.renderAddOthers())).toMatchSnapshot();
    });
    it('Should render correctly when user has ability', () => {
      instance.canAddRoles = jest.fn(() => true);
      expect(toJSON(instance.renderAddOthers())).toMatchSnapshot();
    });
  });
  describe('showFollower()  ', () => {
    it('Should render correctly when showFollower', () => {
      rendered.setProps({
        roles: ['tour_organizer', 'tour_collaborator'],
        ownerId: 1,
        userId: 2,
      });
      expect(toJSON(instance.showFollower())).toMatchSnapshot();
    });
  });

  describe('renderContributorAddRole()  ', () => {
    it('Should render correctly when user has ability', () => {
      instance.canAddRoles = jest.fn(() => true);
      expect(toJSON(instance.renderContributorAddRole())).toMatchSnapshot();
    });
  });
  describe('renderOther()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.renderOther())).toMatchSnapshot();
    });
    it('Should render correctly if has participants', () => {
      instance.getParticipantUserNodeId = jest.fn(() => [1]);
      expect(toJSON(instance.renderOther())).toMatchSnapshot();
    });
    it('Should render correctly if has interensted', () => {
      instance.getInterestedUserNodeId = jest.fn(() => [1]);
      expect(toJSON(instance.renderOther())).toMatchSnapshot();
    });
  });
  describe('renderOtherSection()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.renderOtherSection())).toMatchSnapshot();
    });
    it('Should render correctly', () => {
      instance.canShowOtherRoles = jest.fn(() => true);
      expect(toJSON(instance.renderOtherSection())).toMatchSnapshot();
    });
  });
  describe('renderContributor()  ', () => {
    it('Should render correctly', () => {
      expect(toJSON(instance.renderContributor())).toMatchSnapshot();
    });
    it('Should render correctly', () => {
      // instance.canShowOtherRoles = jest.fn(() => true);
      rendered.setProps({ onRenderContributor: jest.fn(() => true) });
      expect(toJSON(instance.renderContributor())).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderContributorSection = jest.fn(
        () => 'renderContributorSection',
      );
      instance.renderOtherSection = jest.fn(() => 'renderOtherSection');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
