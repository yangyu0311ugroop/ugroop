import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { PARTICIPANT } from 'utils/modelConstants';
import { Participant } from '..';

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

  describe('closePopper()', () => {
    it('should closePopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.closePopper);
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

  describe('#ShowParticipant()', () => {
    it('ShowParticipant', () => {
      wrapper.setProps({ isDialogOpen: false });
      const snapshot = shallow(<div>{instance.ShowParticipant()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('ShowParticipant return null', () => {
      wrapper.setProps({ isDialogOpen: true });
      const snapshot = shallow(<div>{instance.ShowParticipant()}</div>);
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
    it('still matches snapshot when read only', () => {
      const snapshot = shallow(
        <div>{instance.renderTextOnly('readOnly')()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
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
      wrapper.setProps({ showDetails: true });
      ability.can = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow);
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

  describe('renderPersonNameEditables()', () => {
    it('should renderPersonNameEditables', () => {
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

  describe('renderRowSimpleContent', () => {
    it('should match snapshot', () => {
      instance.renderRowConditions = jest.fn();
      const snapshot = shallow(<div>{instance.renderRowSimpleContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('canExecuteParticipant', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.canExecuteParticipant()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPersonPart', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderPersonPart('Span', 'text', {})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderPersonPart('Span', 'text')}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRowConditions', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRowConditions()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
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

  describe('renderRowSimpleContent', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRowSimpleContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if showAvatar is false', () => {
      wrapper.setProps({ handleEditableClick: jest.fn() });
      const snapshot = shallow(<div>{instance.renderRowSimpleContent()}</div>);

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
