import { INVITE } from 'appConstants';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ability } from 'apis/components/Ability/ability';
import { VARIANTS } from 'variantsConstants';
import { ParticipantList } from '..';

describe('<ParticipantList />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    templateId: 1,
    classes: {},
    onClose: jest.fn(),
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
      dispatchTo: jest.fn(
        (key, type, obj) =>
          doResagaSnapshot &&
          expect({ dispatchTo: { key, type, obj } }).toMatchSnapshot(),
      ),
    },
  });

  beforeEach(() => {
    ability.can = jest.fn(() => true);
    wrapper = shallow(<ParticipantList {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(ParticipantList).toBeDefined();
  });

  describe('#componentWillMount()', () => {
    it('calls fetchParticipants', () => {
      wrapper.setProps({ modeList: 'forms' });
      instance.fetchParticipants = jest.fn();
      instance.componentWillMount();
      expect(instance.fetchParticipants).toBeCalled();
    });
  });

  describe('#componentDidUpdate()', () => {
    it('calls handleOpen', () => {
      wrapper.setProps({ open: true });
      const prevProps = { open: false };
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toBeCalled();
    });
  });

  describe('#handleOpen()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      wrapper.setProps({ includeStatusFilters: false });
      instance.handleOpen();
    });

    it('resaga.setValue still matches snapshot if props.hasParticipantIds', () => {
      wrapper.setProps({ hasParticipantIds: true, includeStatusFilters: true });
      doResagaSnapshot = true;
      instance.handleOpen();
    });

    it('calls fetchParticipants', () => {
      wrapper.setProps({ modeList: 'forms' });
      instance.fetchParticipants = jest.fn();
      instance.handleOpen();
      expect(instance.fetchParticipants).toBeCalled();
    });
  });

  describe('#handleFilterConfirmedClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleFilterAllClick();
      instance.handleFilterConfirmedClick();
    });
  });

  describe('#getShowLabel()', () => {
    it('should return label for pending', () => {
      wrapper.setProps({ sortedPending: [1], participantNodeId: 1 });
      expect(instance.getShowLabel()).toMatchSnapshot();
    });
    it('should return label for pending', () => {
      wrapper.setProps({ sortedDeclined: [2], participantNodeId: 2 });
      expect(instance.getShowLabel()).toMatchSnapshot();
    });
  });

  describe('#ownParticipantOnly()', () => {
    it('should return label for pending', () => {
      wrapper.setProps({ participantNodeId: 2 });
      instance.canAddParticipant = jest.fn(() => false);
      expect(instance.ownParticipantOnly([1])).toEqual(false);
    });
  });

  describe('#handleFilterPendingClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleFilterPendingClick();
    });
  });

  describe('#handleAllParticipantsClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleAllParticipantsClick();
    });
  });

  describe('#handleFilterDeclinedClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleFilterDeclinedClick();
    });
  });

  describe('#handleCloseClick()', () => {
    it('rcalls props.onClose', () => {
      instance.handleCloseClick();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handleOpenCreateParticipantModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleOpenCreateParticipantModal();
    });
  });

  describe('#renderContent()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({ participantIds: [2] });
      expect(instance.renderContent()).toMatchSnapshot();
    });
  });

  describe('#renderFilters()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        renderContent: jest.fn(),
      });
      expect(instance.renderFilters()).toMatchSnapshot();
    });

    it('still matches snapshot if useList is true', () => {
      wrapper.setProps({
        useList: true,
      });
      instance.canAddParticipant = jest.fn(() => true);
      expect(instance.renderFilters()).toMatchSnapshot();
    });
    it('still matches snapshot if useList is true & shows only participants own', () => {
      wrapper.setProps({
        useList: true,
      });
      instance.canAddParticipant = jest.fn(() => false);
      instance.ownParticipantOnly = jest.fn(() => true);
      expect(instance.renderFilters()).toMatchSnapshot();
    });

    it('still matches snapshot if props.modeList=invite', () => {
      wrapper.setProps({ modeList: 'invite' });
      expect(instance.renderFilters()).toMatchSnapshot();
    });
    it('still matches snapshot if props.modeList=invite', () => {
      wrapper.setProps({ useList: false, participantNodeId: 1 });
      expect(instance.renderFilters()).toMatchSnapshot();
    });
    it('still matches snapshot if props.modeList=invite', () => {
      wrapper.setProps({
        useList: false,
        participantNodeId: 1,
        renderContent: jest.fn(),
      });
      expect(instance.renderFilters()).toMatchSnapshot();
    });
  });

  describe('#renderSubheading()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        modeList: 'personType',
      });
      instance.renderModePopper = jest.fn(() => '');
      instance.renderLayoutPopper = jest.fn(() => '');
      expect(instance.renderSubheading()).toMatchSnapshot();
    });
  });

  describe('renderModePopper()', () => {
    it('should renderModePopper', () => {
      instance.renderModePopperOptions = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderModePopper);
    });
  });

  describe('#renderInvitationRow()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderInvitationRow(1)).toMatchSnapshot();
    });
  });

  describe('#renderNoParticipantsRow()', () => {
    it('still matches snapshot if props.filterPending', () => {
      wrapper.setProps({ filterConfirmed: false, filterPending: true });
      expect(instance.renderNoParticipantsRow()).toMatchSnapshot();
    });
  });

  describe('#renderParticipantList()', () => {
    it('still matches snapshot if given ids', () => {
      expect(instance.renderParticipantList([1])).toMatchSnapshot();
    });

    it('still matches snapshot if no ids', () => {
      expect(instance.renderParticipantList([])).toMatchSnapshot();
    });
  });

  describe('#renderList()', () => {
    it('still matches snapshot if props.filterPending', () => {
      wrapper.setProps({
        useList: true,
        modeList: INVITE,
        shareTokens: ['token'],
        participantViewModeModalFilter: VARIANTS.PENDING,
      });
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('still matches snapshot if no shareTokens', () => {
      wrapper.setProps({
        useList: true,
        modeList: INVITE,
        shareTokens: [],
      });
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('still matches snapshot if no shareTokens', () => {
      wrapper.setProps({
        useList: false,
        sortedAll: [1, 2],
        participantNodeId: 2,
      });
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('should match snapshot if modeList is passport', () => {
      wrapper.setProps({ modeList: 'passport' });
      instance.renderPassportsList = jest.fn(() => 'renderPassportsList');
      const snap = shallow(<div>{instance.renderList()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
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

  describe('#defaultProps', () => {
    it('#onClose()', () => {
      expect(() => {
        ParticipantList.defaultProps.onClose();
      }).not.toThrow();
    });
  });

  describe('handleModeSelect', () => {
    it('should call setValue', () => {
      instance.handleModeSelect('mode', 'value')();
    });
  });

  describe('handleLayoutSelect', () => {
    it('should call setValue', () => {
      instance.handleLayoutSelect('mode', 'value')();
    });
  });

  describe('handleSortSelect', () => {
    it('should call setValue', () => {
      instance.handleSortSelect('mode')();
    });
  });

  describe('handlePendingClick', () => {
    it('should call setValue', () => {
      doResagaSnapshot = true;
      instance.handlePendingClick();
    });
  });

  describe('renderPendingInvitations', () => {
    it('should match snapshot if shareTokens length is greater than 1', () => {
      wrapper.setProps({
        shareTokens: [1, 2],
      });
      const snapshot = shallow(
        <div>{instance.renderPendingInvitations()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if shareTokens is empty', () => {
      const snapshot = shallow(
        <div>{instance.renderPendingInvitations()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSortPopperButton', () => {
    it('should match snapshot', () => {
      const openMenu = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderSortPopperButton({ openMenu }),
      );
    });
  });

  describe('renderSortPopperOptions', () => {
    it('should match snapshot', () => {
      const closeMenu = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderSortPopperOptions({ closeMenu }),
      );
    });
  });

  describe('renderModePopperOptions()', () => {
    it('should renderModePopperOptions', () => {
      wrapper.setProps({
        includeInviteMode: true,
        modeList: 'personType',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderModePopperOptions({}));
    });
    it('should renderModePopperOptions if modeList is invite', () => {
      wrapper.setProps({
        includeInviteMode: true,
        modeList: 'invite',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderModePopperOptions({}));
    });
  });

  describe('renderPopperButton()', () => {
    it('should renderPopperButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperButton({}));
    });
  });

  describe('renderLayoutPopperButton()', () => {
    it('should renderLayoutPopperButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutPopperButton({}));
    });
  });

  describe('renderLayoutPopper()', () => {
    it('should renderLayoutPopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutPopper());
    });
  });

  describe('renderFilters', () => {
    it('should match snapshot', () => {
      wrapper.setProps({
        participantViewModeModalFilter: VARIANTS.ALL_FOLLOWERS,
      });
      const snapshot = shallow(<div>{instance.renderFilters()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if includeStatusFilters is false', () => {
      wrapper.setProps({
        includeStatusFilters: false,
      });
      const snapshot = shallow(<div>{instance.renderFilters()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLayoutPopperOptions()', () => {
    it('should renderLayoutPopperOptions if detailedView', () => {
      wrapper.setProps({
        layout: 'detailedView',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutPopperOptions({}));
    });
    it('should renderLayoutPopperOptions if simpleView', () => {
      wrapper.setProps({
        layout: 'simpleView',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutPopperOptions({}));
    });
    it('should renderLayoutPopperOptions if no view', () => {
      wrapper.setProps({
        layout: null,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutPopperOptions({}));
    });
  });
  describe('renderFilterPopper()', () => {
    it('should renderFilterPopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFilterPopper);
    });
  });
  describe('getName()', () => {
    it('should getName', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.getName);
    });
  });
  describe('renderFilterPopperButton()', () => {
    it('should renderFilterPopperButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFilterPopperButton({}));
    });
  });
  describe('renderFilterPopperOptions()', () => {
    it('should renderFilterPopperOptions', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFilterPopperOptions({}));
    });
  });
  describe('renderProp', () => {
    it('should call children as function', () => {
      const children = jest.fn();
      wrapper.setProps({ useList: true, children });
      instance.renderProp();

      expect(children).toBeCalled();
    });

    it('should call children as function with sortedConfirmed as passed params', () => {
      const children = jest.fn();
      wrapper.setProps({
        defaultAccessLevel: PARTICIPANT_ACCESS_LEVELS.limited,
        useList: true,
        children,
        sortedConfirmed: [1, 2],
        participantNodeId: 1,
      });
      instance.renderProp();

      expect(children).toBeCalled();
    });

    it('should call children as function with sortedConfirmed as passed params when isInterestedPerson is true', () => {
      const children = jest.fn();
      wrapper.setProps({
        isInterestedPerson: true,
        useList: true,
        children,
        sortedConfirmed: [1, 2],
      });
      instance.renderProp();

      expect(children).toBeCalled();
    });

    it('should only return participantNodeId if useList is not true', () => {
      const children = jest.fn();
      wrapper.setProps({ useList: false, children });
      instance.renderProp();

      expect(children).toBeCalled();
      expect(children.mock.calls).toMatchSnapshot();
    });
  });
});
