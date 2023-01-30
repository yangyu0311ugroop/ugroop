import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { INTERESTED_PERSON, PARTICIPANT } from 'utils/modelConstants';
import { Participant } from '..';
import { ANIMATION_MAX_INDEX } from '../../../../../containers/Templates/Modals/ShareList/components/Invitee/constants';

describe('<Participant />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot = false;

  const makeProps = () => ({
    classes: {},
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect(obj).toMatchSnapshot(),
      ),
      dispatchTo: jest.fn(
        obj => doResagaSnapshot && expect(obj).toMatchSnapshot(),
      ),
    },
    value: 'value',
  });

  beforeEach(() => {
    wrapper = shallow(<Participant {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('#handleEditableClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleEditableClick({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });
    });
    it('resaga.setValue still matches snapshot', () => {
      wrapper.setProps({ readOnlyStatus: true });
      doResagaSnapshot = true;
      instance.handleEditableClick({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });
    });
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
      expect(wrapper.state().loading).toBe(false);
    });
  });

  describe('isRequired', () => {
    it('if both isEmptyInterestLevel and isEmptySelfTravel is null', () => {
      wrapper.setProps({
        isEmptyInterestLevel: null,
        isEmptySelfTravel: null,
      });
      expect(instance.isRequired()).toBe(false);
    });
    it('if both isEmptyInterestLevel and isEmptySelfTravel is true, isRequired should return false', () => {
      wrapper.setProps({
        isEmptyInterestLevel: true,
        isEmptySelfTravel: true,
      });
      expect(instance.isRequired()).toBe(false);
    });
    it('if isEmptyInterestLevel is false, isRequired should return false', () => {
      wrapper.setProps({
        isEmptyInterestLevel: false,
        isEmptySelfTravel: true,
      });
      expect(instance.isRequired()).toBe(false);
    });
    it('if isEmptySelfTravel is false, isRequired should return false', () => {
      wrapper.setProps({
        isEmptyInterestLevel: true,
        isEmptySelfTravel: false,
      });
      expect(instance.isRequired()).toBe(false);
    });
    it('if both isEmptyInterestLevel and isEmptySelfTravel is false, isRequired should return true', () => {
      wrapper.setProps({
        isEmptyInterestLevel: false,
        isEmptySelfTravel: false,
      });
      expect(instance.isRequired()).toBe(true);
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
      wrapper.setState({
        anchorEl: true,
      });
      instance.openPopper();
      expect(wrapper.state().anchorEl).toEqual(null);
    });
    it('should set to currentTarget', () => {
      wrapper.setState({
        anchorEl: false,
      });
      instance.openPopper(1);
      expect(wrapper.state().anchorEl).toEqual(1);
    });
  });

  describe('closePopper()', () => {
    it('should closePopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.closePopper);
    });
  });

  describe('handlePopperClickAway', () => {
    it('should call clickAway', () => {
      wrapper.setState({
        anchorEl: 'asdasd',
      });
      instance.handlePopperClickAway();
      expect(wrapper.state().anchorEl).toBe(null);
    });
  });

  describe('handleClick', () => {
    it('should call openPopper immediately and not createPerson if personId do exist', () => {
      instance.openPopper = jest.fn();
      wrapper.setProps({
        personId: 3,
      });
      const ev = { currentTarget: 1 };
      instance.handleClick(ev);

      expect(instance.openPopper).toBeCalledWith(1);
    });

    it('should call createPerson if personId do not exist', () => {
      PERSON_DETAIL_HELPER.createPerson = jest.fn();
      wrapper.setProps({
        personId: null,
      });
      const ev = { currentTarget: 1 };
      instance.handleClick(ev);

      expect(PERSON_DETAIL_HELPER.createPerson).toBeCalled();
      expect(PERSON_DETAIL_HELPER.createPerson.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderPopperPaperContent()', () => {
    it('should renderPopperPaperContent', () => {
      wrapper.setProps({
        linkedUserId: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
    });
    it('should renderPopperPaperContent if no linkedUserId', () => {
      wrapper.setProps({
        linkedUserId: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
    });
    it('should return something else if loading', () => {
      wrapper.setState({ loading: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
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

  describe('#renderRowTitle()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      const snapshot = shallow(<div>{instance.renderRowTitle(value)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('still matches snapshot if props.heading', () => {
      const value = 'value';
      wrapper.setProps({ heading: true });
      const snapshot = shallow(
        <div>{instance.renderRowTitle(value, 999)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderRowSubtitle()', () => {
    it('still matches snapshot', () => {
      const value = 'value';
      const snapshot = shallow(<div>{instance.renderRowSubtitle(value)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('still matches snapshot if props.heading', () => {
      const value = 'value';
      wrapper.setProps({ heading: true });
      const snapshot = shallow(<div>{instance.renderRowSubtitle(value)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderCreatedAt()', () => {
    it('still matches snapshot', () => {
      const variant = 'variant';
      instance.renderPart = () => 'renderPart';
      const snapshot = shallow(<div>{instance.renderCreatedAt(variant)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderSubtitle()', () => {
    it('still matches snapshot', () => {
      const variant = 'variant';
      instance.renderPart = () => 'renderPart';
      instance.renderCreatedAt = () => 'renderCreatedAt';
      wrapper.setProps({
        subtitle: NODE_PATHS.createdAt,
        onRenderRowSubtitle: () => 'test',
      });
      const snapshot = shallow(<div>{instance.renderSubtitle(variant)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('still matches snapshot', () => {
      const variant = 'variant';
      instance.renderPart = () => 'renderPart';
      instance.renderCreatedAt = () => 'renderCreatedAt';
      wrapper.setProps({
        subtitle: NODE_PATHS.createdAt,
        mode: 'createdAt',
      });
      const snapshot = shallow(<div>{instance.renderSubtitle(variant)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('#renderRowTail()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        onRenderRowTail: () => 'test',
      });
      const snapshot = shallow(<div>{instance.renderRowTail()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('still matches snapshot', () => {
      wrapper.setProps({
        mode: 'forms',
        canMove: true,
        showUpload: true,
      });
      const snapshot = shallow(<div>{instance.renderRowTail()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('#renderRowAvatarWithClassName()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        onRenderRowTail: () => 'test',
      });
      const snapshot = shallow(
        <div>{instance.renderRowAvatarWithClassName()({})}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('#renderRowAvatar()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        accessLevel: '',
      });
      const snapshot = shallow(<div>{instance.renderRowAvatar({})}</div>);
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
  describe('#renderTextOnly()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        accessLevel: PARTICIPANT_ACCESS_LEVELS.full,
      });
      const snapshot = shallow(<div>{instance.renderTextOnly()()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('#renderLogic()', () => {
    it('still matches snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLogic()()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('#renderForm()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({ isRYI: true });
      instance.isRequired = jest.fn(() => false);
      instance.renderPart = () => 'renderPart';
      const snapshot = shallow(<div>{instance.renderForm()()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('still matches snapshot isPublic', () => {
      wrapper.setProps({ isPublic: true });
      instance.renderPart = () => 'renderPart';
      const snapshot = shallow(<div>{instance.renderForm()()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('still matches snapshot withRelationshipField true', () => {
      wrapper.setProps({ isPublic: true, withRelationshipField: true });
      instance.renderPart = () => 'renderPart';
      const snapshot = shallow(<div>{instance.renderForm()()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('#renderEditable()', () => {
    it('still matches snapshot', () => {
      instance.renderPart = () => 'renderPart';
      const snapshot = shallow(<div>{instance.renderEditable()()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('still matches snapshot when readonly', () => {
      wrapper.setProps({ readOnlyStatus: true, status: 'confirmed' });
      instance.renderPart = () => 'renderPart';
      instance.canExecuteParticipant = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderEditable()()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('#renderLastAccess()', () => {
    it('matches snapshot', () => {
      instance.renderPart = () => 'renderPart';
      const snapshot = shallow(
        <div>{instance.renderLastAccess({ userId: 1 })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('still matches snapshot', () => {
      wrapper.setProps({ mode: 'lastAccess', userConnected: true });
      instance.renderPart = () => 'renderPart';
      const snapshot = shallow(
        <div>{instance.renderLastAccess({ userId: 1 })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onMoveSuccess', () => {
    it('should setState and setValue', () => {
      instance.onMoveSuccess();
      expect(wrapper.state().dialogOpen).toBe(false);
    });
  });

  describe('openMoveDialog', () => {
    it('should setState and setValue', () => {
      instance.openMoveDialog(1)();
      expect(wrapper.state().dialogOpen).toBe(true);
    });
  });
  describe('openLinkDialog', () => {
    it('should setState and setValue', () => {
      instance.openLinkDialog(1)();
      expect(wrapper.state().dialoglinkOpen).toBe(true);
    });
  });
  describe('openUnlinkDialog', () => {
    it('should setState and setValue', () => {
      instance.openUnlinkDialog(1)();
      expect(wrapper.state().dialogUnlinkOpen).toBe(true);
    });
  });

  describe('closeMoveDialog', () => {
    it('should setState and setValue', () => {
      instance.closeMoveDialog();
      expect(wrapper.state().dialogOpen).toBe(false);
    });
  });

  describe('handleSetupPersonSuccess', () => {
    it('should call setValue and openPopper', () => {
      doResagaSnapshot = true;
      const data = { peopleById: jest.fn() };
      const target = 1;
      instance.openPopper = jest.fn();

      instance.handleSetupPersonSuccess(target)(data);

      expect(instance.openPopper).toBeCalledWith(1);
    });
  });

  describe('handleConfirmMove', () => {
    it('should be called', () => {
      wrapper.setProps({
        id: 1,
        parentId: 2,
        selectedFollowerId: 3,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.handleConfirmMove);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('renderRowContent()', () => {
    it('should renderRowContent', () => {
      wrapper.setProps({
        layout: 'detailedView',
        mode: 'mode',
      });
      ability.can = jest.fn(() => true);
      instance.renderRowConditions = jest.fn();
      instance.renderSubtitle = jest.fn();
      instance.renderMoveButton = jest.fn();
      instance.renderCreatedAt = jest.fn();
      instance.renderPart = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowContent);
    });
  });

  describe('renderRow()', () => {
    it('should renderRow', () => {
      wrapper.setState({ showForms: true });
      wrapper.setProps({ showDetails: true, rooms: [1] });
      ability.can = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow);
    });
  });

  describe('#renderToolTipTitleFollower()', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderToolTipTitleFollower()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleOpenFollowerDialog', () => {
    it('handleOpenFollowerDialog should return null', () => {
      const snapshot = shallow(
        <div>{instance.handleOpenFollowerDialog()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFormCount()', () => {
    it('should renderFormCount', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFormCount(true)([]));
    });
    it('should render values length', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderFormCount(true)({ values: [1] }),
      );
    });
    it('should render values length if not showForms', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderFormCount(false)({ values: [1] }),
      );
    });
  });

  describe('onCheckboxClick', () => {
    it('should setState', () => {
      wrapper.setState({ showForms: true });
      instance.onCheckboxClick();
      expect(wrapper.state().showForms).toBe(false);
    });
  });

  describe('onToggleRoomingWith', () => {
    it('should setState', () => {
      wrapper.setState({ showRoomingWith: true });
      instance.onToggleRoomingWith();
      expect(wrapper.state().showRoomingWith).toBe(false);
    });
  });

  describe('renderMoveButton()', () => {
    it('should renderMoveButton', () => {
      wrapper.setProps({
        canMove: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMoveButton);
    });
  });

  describe('renderRow()', () => {
    it('should renderRow', () => {
      instance.renderRowContent = jest.fn(() => '');
      instance.renderRowTail = jest.fn(() => '');
      instance.renderMoveButton = jest.fn(() => '');
      instance.renderFormCount = jest.fn(() => '');
      instance.renderShowFormsCheckbox = jest.fn(() => '');
      instance.renderAttachmentRowTail = jest.fn(() => '');
      instance.renderRowForms = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow);
    });
  });

  describe('#renderAddFollower()', () => {
    it('renderAddFollower to be called ', () => {
      const snapshot = shallow(<div>{instance.renderAddFollower()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPersonNameEditables()', () => {
    it('should renderPersonNameEditables', () => {
      wrapper.setProps({
        participantEmail: 'email',
        userConnected: false,
        nodeType: PARTICIPANT,
        invitationPending: false,
      });
      instance.renderPopperPaper = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonNameEditables);
    });
    it('should renderPersonNameEditables 1', () => {
      wrapper.setProps({
        participantEmail: 'email',
        userConnected: false,
        nodeType: PARTICIPANT,
        invitationPending: false,
        noName: false,
      });
      instance.renderPopperPaper = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonNameEditables);
    });
  });

  describe('renderPersonType', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderPersonType()('asd')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if value is null', () => {
      const snapshot = shallow(<div>{instance.renderPersonType()(null)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPopperPaper()', () => {
    it('should renderPopperPaper', () => {
      instance.renderPopperPaperContent = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaper);
    });
  });

  describe('renderPopperPaperContent()', () => {
    it('should renderPopperPaperContent', () => {
      wrapper.setProps({
        linkedUserId: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
    });
    it('should renderPopperPaperContent if no linkedUserId', () => {
      wrapper.setProps({
        linkedUserId: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
    });
    it('should return something else if loading', () => {
      wrapper.setState({ loading: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperPaperContent);
    });
  });

  describe('closePopper()', () => {
    it('should closePopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.closePopper);
    });
  });

  describe('openSeeDetail()', () => {
    it('should openSeeDetail', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.openSeeDetail, [
        { stopPropagation: jest.fn() },
      ]);
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

  describe('renderLink', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLink()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if parentType is interested person', () => {
      wrapper.setProps({ parentType: INTERESTED_PERSON });
      const snapshot = shallow(<div>{instance.renderLink()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRowSimpleContent', () => {
    it('should match snapshot', () => {
      instance.renderRowConditions = jest.fn();
      const snapshot = shallow(<div>{instance.renderRowSimpleContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot', () => {
      instance.renderRowConditions = jest.fn();
      wrapper.setProps({ handleEditableClick: jest.fn() });
      const snapshot = shallow(<div>{instance.renderRowSimpleContent()}</div>);

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

  describe('renderRowSimple', () => {
    it('should match snapshot', () => {
      instance.renderRowSimpleContent = jest.fn();
      const snapshot = shallow(<div>{instance.renderRowSimple()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if showAvatar is false', () => {
      instance.renderRowSimpleContent = jest.fn();
      instance.renderRowAvatar = jest.fn();
      const snapshot = shallow(<div>{instance.renderRowSimple()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderTableRow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTableRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot', () => {
      wrapper.setProps({ smDown: true });
      const snapshot = shallow(<div>{instance.renderTableRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
