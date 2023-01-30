import React from 'react';
import { shallow } from 'enzyme';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import toJSON from 'enzyme-to-json';
import { InterestedPerson } from '..';
import { ability } from '../../../../../apis/components/Ability/ability';
import { ANIMATION_MAX_INDEX } from '../../../../../containers/Templates/Modals/ShareList/components/Invitee/constants';

describe('<InterestedPerson />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot = false;

  const makeProps = () => ({
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect(obj).toMatchSnapshot(),
      ),
      dispatchTo: jest.fn(
        obj => doResagaSnapshot && expect(obj).toMatchSnapshot(),
      ),
    },
    value: 'value',
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<InterestedPerson {...makeProps()} />);
    doResagaSnapshot = false;
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('#renderTextOnly()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        accessLevel: PARTICIPANT_ACCESS_LEVELS.full,
      });
      const snapshot = shallow(<div>{instance.renderTextOnly()()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderTextOnlyNameValue()', () => {
    it('still matches snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderTextOnlyNameValue('')}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#handleClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleClick({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });
    });
    it('resaga.setValue still matches snapshot', () => {
      wrapper.setProps({ readOnlyStatus: true });
      doResagaSnapshot = true;
      instance.handleClick({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });
    });
  });

  describe('#renderForm()', () => {
    it('still matches snapshot', () => {
      instance.renderPart = jest.fn(() => '');
      expect(instance.renderForm()()).toMatchSnapshot();
    });

    it('should still matches snapshot if withRelationshipField is true', () => {
      wrapper.setProps({
        withRelationshipField: true,
      });
      wrapper.setState({ isEmergencyContact: true });
      instance.renderPart = jest.fn(() => '');
      expect(instance.renderForm()()).toMatchSnapshot();
    });
  });

  describe('#isReadOnly()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        myId: 1,
        userId: 2,
      });
      expect(instance.isReadOnly()).toEqual(true);
    });
  });

  describe('#onEmerCcontactChange()', () => {
    it('return true', () => {
      instance.onEmerCcontactChange(null, true);
      expect(wrapper.state().isEmergencyContact).toEqual(true);
    });
    it('return falsy', () => {
      instance.onEmerCcontactChange(null, false);
      expect(wrapper.state().isEmergencyContact).toEqual(false);
    });
  });

  describe('#openSeeDetail()', () => {
    it('still matches snapshot', () => {
      expect(
        instance.openSeeDetail({ stopPropagation: jest.fn() }),
      ).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      ability.can = jest.fn(() => true);
      instance.renderPart = jest.fn(() => '');
      expect(instance.renderEditable()()).toMatchSnapshot();
    });
  });

  describe('#renderRowValue()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      expect(instance.renderRowValue(value)).toMatchSnapshot();
    });
    it('should match snapshot if userId', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowValue('value', 1));
    });
    it('should match snapshot if isDetailed', () => {
      instance.renderPart = jest.fn();
      instance.renderEmail = jest.fn();
      wrapper.setProps({
        layout: 'detailedView',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowValue('value', 1));
    });
  });

  describe('renderRowSubtitle', () => {
    it('should match snapshot if there is onRenderRowSubtitle', () => {
      wrapper.setProps({
        onRenderRowSubtitle: jest.fn(() => 'onRenderRowSubtitle'),
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowSubtitle);
    });
  });

  describe('renderMenuItem', () => {
    it('should match snapshot if id is not equal to participantParentId', () => {
      wrapper.setProps({
        id: 1,
        participantParentId: 2,
        openDialog: jest.fn(),
      });
      instance.renderPart = jest.fn(() => 'renderPart');
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItem());
    });
    it('should return null', () => {
      wrapper.setProps({
        id: 1,
        participantParentId: 1,
      });
      expect(instance.renderMenuItem()()).toEqual(null);
    });
    it('should be bold if there is a userId', () => {
      const value = 'value';
      expect(instance.renderRowValue(value, 1)).toMatchSnapshot();
    });
  });

  describe('renderEmail()', () => {
    it('should renderEmail', () => {
      instance.renderPart = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmail);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => '');
      instance.renderEditable = jest.fn(() => '');
      instance.renderMenuItem = jest.fn(() => '');
      instance.renderForm = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('renderRowSubtitle', () => {
    it('should renderRowSubtitle if it exists', () => {
      wrapper.setProps({
        onRenderRowSubtitle: jest.fn(() => 'onRenderRowSubtitle'),
      });
      expect(instance.renderRowSubtitle()).toEqual('onRenderRowSubtitle');
    });
  });

  describe('renderStatus', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if userConnected is true', () => {
      wrapper.setProps({
        userConnected: true,
      });
      const snapshot = shallow(<div>{instance.renderStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if invitationPending is true', () => {
      wrapper.setProps({
        invitationPending: true,
      });
      const snapshot = shallow(<div>{instance.renderStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderInviteButton', () => {
    it('should match snapshot', () => {
      wrapper.setProps({ userConnected: true });
      const snapshot = shallow(<div>{instance.renderInviteButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if user is not connected and not invitation pending', () => {
      const snapshot = shallow(<div>{instance.renderInviteButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('componentDidMount()', () => {
    beforeEach(() => {
      global.setTimeout = jest.fn(cb => cb && cb());
    });

    it('should call setTimeout when index < ANIMATION_MAX_INDEX', () => {
      wrapper.setProps({ noanimate: true, index: ANIMATION_MAX_INDEX - 1 });

      instance.componentDidMount();

      expect(global.setTimeout).toBeCalled();
      expect(global.setTimeout.mock.calls).toMatchSnapshot();

      expect(wrapper.state().show).toBe(true);
    });

    it('should call setTimeout when index >= ANIMATION_MAX_INDEX', () => {
      wrapper.setProps({ index: ANIMATION_MAX_INDEX });

      instance.componentDidMount();

      expect(global.setTimeout).toBeCalled();
      expect(global.setTimeout.mock.calls).toMatchSnapshot();

      expect(wrapper.state().show).toBe(true);
    });
  });
  describe('componentWillUnmount()', () => {
    beforeEach(() => {
      global.clearTimeout = jest.fn();
    });

    it('should call setTimeout when index < 5', () => {
      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
      expect(global.clearTimeout.mock.calls).toMatchSnapshot();
    });
  });
  describe('renderRow()', () => {
    it('should renderRow', () => {
      wrapper.setProps({
        layout: 'detailedView',
      });
      instance.renderPart = jest.fn(() => '');
      instance.renderEmail = jest.fn(() => '');
      instance.renderRowSubtitle = jest.fn(() => '');
      instance.renderRowTail = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow);
    });

    it('should match snapshot if invitationPending is true noanimate', () => {
      wrapper.setProps({
        layout: 'detailedView',
        invtationPending: true,
      });
      instance.renderPart = jest.fn(() => '');
      instance.renderEmail = jest.fn(() => '');
      instance.renderRowSubtitle = jest.fn(() => '');
      instance.renderRowTail = jest.fn(() => '');
      instance.renderStatus = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow);
    });
    it('should match snapshot if invitationPending is true', () => {
      wrapper.setProps({
        layout: 'detailedView',
        invtationPending: true,
        noanimate: true,
      });
      instance.renderPart = jest.fn(() => '');
      instance.renderEmail = jest.fn(() => '');
      instance.renderRowSubtitle = jest.fn(() => '');
      instance.renderRowTail = jest.fn(() => '');
      instance.renderStatus = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow());
    });
  });
});
