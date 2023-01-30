import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { InviteButton } from '../index';

describe('<InviteButton />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    personEmail: 'qqq@gg.com',
    participantEmail: 'qqq@gg.com',
  };

  beforeEach(() => {
    rendered = shallow(<InviteButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(InviteButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('findParticipant', () => {
    it('should return s if role is PARTICIPANT', () => {
      const s = { role: 'participant' };
      expect(instance.findParticipant(s)).toBe(true);
    });
  });

  describe('getFirstToken()', () => {
    it('should getFirstToken', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.getFirstToken([]));
    });
  });

  describe('handleNodeUpdateSuccess', () => {
    it('should setState', () => {
      instance.handleNodeUpdateSuccess();
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleFindUserSuccess', () => {
    it('should call updateNode', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleFindUserSuccess({ email: 'mail' })({
        inviteeId: 1,
        share: jest.fn(() => ({})),
      });
      expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
    });
  });

  describe('openPopper', () => {
    it('should setState to null if anchorEl', () => {
      rendered.setState({
        anchorEl: true,
      });
      instance.openPopper();
      expect(rendered.state().anchorEl).toEqual(null);
    });
    it('should set to currentTarget', () => {
      rendered.setState({
        anchorEl: false,
      });
      instance.openPopper(1);
      expect(rendered.state().anchorEl).toEqual(1);
    });
    it('should set to currentTarget', () => {
      rendered.setProps({ personEmail: null });
      rendered.setState({
        anchorEl: true,
      });
      instance.openPopper(1);
      expect(rendered.state().anchorEl).toEqual(1);
    });
  });

  describe('closePopper()', () => {
    it('should closePopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.closePopper);
    });
  });

  describe('handlePopperClickAway', () => {
    it('should call clickAway', () => {
      rendered.setState({
        anchorEl: 'asdasd',
      });
      instance.handlePopperClickAway();
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('handleSetupPersonSuccess', () => {
    it('should call setValue and openPopper', () => {
      const data = { peopleById: jest.fn() };
      const target = 1;
      instance.openPopper = jest.fn();

      instance.handleSetupPersonSuccess(target)(data);

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
      expect(instance.openPopper).toBeCalledWith(1);
    });
  });

  describe('renderInviteUser', () => {
    it('should match snapshots', () => {
      rendered.setProps({ participantEmail: null });
      expect(PERSON_DETAIL_HELPER.renderInviteUser).toMatchSnapshot();
    });
  });

  describe('handleClick', () => {
    it('should call openPopper immediately and not createPerson if personId do exist', () => {
      instance.openPopper = jest.fn();
      rendered.setProps({
        personId: 3,
      });
      const ev = { currentTarget: 1, stopPropagation: jest.fn() };
      instance.handleClick(ev);

      expect(instance.openPopper).toBeCalledWith(1);
    });

    it('should call createPerson if personId do not exist', () => {
      PERSON_DETAIL_HELPER.createPerson = jest.fn();
      rendered.setProps({
        personId: null,
      });
      const ev = { currentTarget: 1, stopPropagation: jest.fn() };
      instance.handleClick(ev);

      expect(PERSON_DETAIL_HELPER.createPerson).toBeCalled();
      expect(PERSON_DETAIL_HELPER.createPerson.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderPopperPaperContent()', () => {
    it('should renderPopperPaperContent', () => {
      rendered.setProps({
        linkedUserId: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
    });
    it('should renderPopperPaperContent if no linkedUserId', () => {
      rendered.setProps({
        linkedUserId: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
    });
    it('should return something else if loading', () => {
      rendered.setState({ loading: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
    });
  });

  describe('#renderToolTipTitle()', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderToolTipTitle()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    beforeEach(() => {
      instance.renderPopperPaperContent = jest.fn(
        () => 'renderPopperPaperContent',
      );
    });
    it('should render something different if userConnected is true', () => {
      rendered.setProps({ userConnected: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render something different if invitationPending is true', () => {
      rendered.setProps({ invitationPending: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render something different if personEmail & participantEmail is null or empty', () => {
      rendered.setProps({ personEmail: null, participantEmail: null });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
