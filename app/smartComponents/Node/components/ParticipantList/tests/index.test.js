import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TOUR_ROLE } from 'apis/components/Ability/roles';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { Participants } from '../index';

describe('<Participants />', () => {
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
    rendered = shallow(<Participants {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Participants).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getParticipantListProps', () => {
    it('should return parentId as templateId if participant can execute', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ templateId: 1 });
      const result = instance.getParticipantListProps();

      expect(result).toEqual({
        isTemplateId: true,
        parentId: 1,
      });
    });

    it('should return parentId as templateId but returns useList to false', () => {
      ability.can = jest.fn(() => false);
      rendered.setProps({
        templateId: 1,
      });
      const result = instance.getParticipantListProps(
        0,
        1,
        [TOUR_ROLE.TOUR_ORGANIZER],
        [TOUR_ROLE.TOUR_PARTICIPANT],
      );

      expect(result).toEqual({
        parentId: 1,
        useList: false,
        isTemplateId: true,
        hideParticipants: false,
      });
    });

    it('should return parentId as myInterestedPersonNodeId and includeInviteMode to false', () => {
      ability.can = jest.fn(() => false);
      rendered.setProps({
        templateId: 1,
      });
      const result = instance.getParticipantListProps(
        1,
        1,
        [TOUR_ROLE.TOUR_ORGANIZER],
        [TOUR_ROLE.TOUR_PARTICIPANT],
      );

      expect(result).toEqual({
        parentId: 1,
        includeInviteMode: false,
        isTemplateId: false,
        isInterestedPerson: true,
      });
    });

    it('should return parentId as templateId and other stuff if participantAccessRoles exist in myRoles', () => {
      ability.can = jest.fn(() => false);
      rendered.setProps({
        templateId: 1,
      });
      const result = instance.getParticipantListProps(
        1,
        1,
        [TOUR_ROLE.TOUR_ORGANIZER],
        [TOUR_ROLE.TOUR_ORGANIZER],
      );

      expect(result).toEqual({
        defaultAccessLevel: PARTICIPANT_ACCESS_LEVELS.limited,
        parentId: 1,
        interestedPersonNodeId: 1,
        participantNodeId: 1,
        includeInviteMode: false,
        includeFormsMode: false,
        includeStatusFilters: false,
        isTemplateId: true,
      });
    });
  });

  describe('handleCreateClick', () => {
    it('should call setValue', () => {
      instance.handleCreateClick();

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderParticipantsWithMyRoles', () => {
    it('should match snapshot', () => {
      instance.getParticipantListProps = jest.fn(() => ({}));
      const snapshot = shallow(
        <div>{instance.renderParticipantsWithMyRoles(1, 2)(1)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderParticipantsWithParticipantAccessRoles', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>
          {instance.renderParticipantsWithParticipantAccessRoles(1, 2)(1)}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderParticipantsWithMyConfirmedParticipantNodeId', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>
          {instance.renderParticipantsWithMyConfirmedParticipantNodeId(1, 2)(1)}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderParticipantsWithInterestedPersonNodeId', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderParticipantsWithMyInterestedPersonNodeId(1)}</div>,
      );

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
