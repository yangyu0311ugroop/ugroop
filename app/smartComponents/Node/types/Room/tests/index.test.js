/* eslint-disable object-shorthand */
import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ability } from 'apis/components/Ability/ability';
import { Room } from '../index';

describe('<Room />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    clickId: 1,
    clickZoom: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Room {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Room).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('setLoading()', () => {
    it('should setLoading', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.setLoading, [
        { value: 1, loading: false },
      ]);
    });
  });

  describe('openAddPax()', () => {
    it('should setLoading', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.openAddPax);
    });
  });

  describe('handleRequestError()', () => {
    it('should handleRequestError', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleRequestError);
    });
  });

  describe('handleRelocateParticipant()', () => {
    it('should handleRequestError', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleRelocateParticipant, [
        { roomType: 'test' },
      ]);
    });
  });

  describe('componentDidUpdate()', () => {
    it('should set sate', () => {
      rendered.setProps({ editable: false });
      rendered.setState({ editing: true });
      instance.componentDidUpdate({ editable: true });
      expect(rendered.state().editing).toEqual(false);
    });
  });

  describe('toggleEditing()', () => {
    it('should set sate to false', () => {
      rendered.setState({ editing: true });
      instance.toggleEditing();
      expect(rendered.state().editing).toEqual(false);
    });
  });

  describe('deleteRoom()', () => {
    it('should deleteRoom', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.deleteRoom, [
        { onClick: jest.fn() },
      ]);
    });
  });

  describe('updateLink()', () => {
    it('should updateLink', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.updateLink(1), [{ result: 1 }]);
    });
    it('should updateLink if id is null', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.updateLink(), [{ result: 1 }]);
    });
  });

  describe('handleDeleteRoom()', () => {
    it('should handleDeleteRoom', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleDeleteRoom);
    });
  });

  describe('handleRemoveLink()', () => {
    it('should handleRemoveLink', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.handleRemoveLink({ participantId: 1 }),
      );
    });
  });

  describe('toggleShowPaxDetail()', () => {
    it('should toggleShowPaxDetail', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.toggleShowPaxDetail, [
        { stopPropagation: jest.fn() },
      ]);
    });
  });

  describe('handleremoveLinkSuccess()', () => {
    it('should handleremoveLinkSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleremoveLinkSuccess);
    });
  });

  describe('renderDeleteButton()', () => {
    it('should renderDeleteButton', () => {
      rendered.setState({ loading: true, processId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderDeleteButton, [1, true]);
    });
  });

  describe('onEditSuccess()', () => {
    it('should call resaga.setValue', () => {
      rendered.setProps({ selectedRoomType: ['some room'] });
      instance.onEditSuccess({ roomType: ['some room'] });
      expect(resaga.setValue).toBeCalled();
    });
    it('should call resaga.setValue not to be called when room type is null', () => {
      rendered.setProps({ selectedRoomType: ['some room'] });
      instance.onEditSuccess({});
      expect(resaga.setValue).not.toBeCalled();
    });
    it('should onEditSuccess resaga not to be called', () => {
      rendered.setProps({ selectedRoomType: ['All Rooms'] });
      instance.onEditSuccess({ roomType: ['All Rooms'] });
      expect(resaga.setValue).not.toBeCalled();
    });
  });

  describe('renderNoPax()', () => {
    it('should renderNoPax', () => {
      rendered.setProps({ smDown: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderNoPax, [true, true]);
    });
  });

  describe('renderChangeRoom()', () => {
    it('should renderChangeRoom', () => {
      rendered.setProps({ occupantIds: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderChangeRoom);
    });
  });

  describe('renderLabel()', () => {
    it('should match snapshots', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabel);
    });
  });

  describe('roomPaxContentCard()', () => {
    it('should roomPaxContentCard', () => {
      rendered.setProps({ occupantIds: [1] });
      instance.isEditing = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.roomPaxContentCard, [1]);
    });
  });

  describe('renderPaxContentAvatar()', () => {
    it('should renderPaxContentAvatar', () => {
      rendered.setProps({ occupantIds: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPaxContentAvatar, [1]);
    });
    it('should renderPaxContentAvatar', () => {
      rendered.setProps({ occupantIds: [1], participantId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPaxContentAvatar, [1]);
    });
  });

  describe('renderPaxContentAvatar()', () => {
    it('should renderPaxContentAvatar', () => {
      rendered.setProps({ occupantIds: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPaxContentAvatar, [1]);
    });
    it('should renderPaxContentFiltered', () => {
      rendered.setProps({ occupantIds: [1, 2, 3], participantId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPaxContentFiltered, [1]);
    });
    it('should renderPaxContentFiltered', () => {
      rendered.setProps({ occupantIds: [], participantId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPaxContentFiltered, [1]);
    });
  });

  describe('canEdit()', () => {
    it('should canEdit', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ editable: true });
      expect(instance.canEdit()).toEqual(true);
    });
  });

  describe('renderList()', () => {
    it('should renderList', () => {
      rendered.setProps({ occupantIds: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderList, [1]);
    });
    it('should renderList', () => {
      rendered.setProps({ occupantIds: [] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderList, [1]);
    });
  });

  describe('renderEditable()', () => {
    it('should renderEditable', () => {
      rendered.setProps({ id: 0 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable, [1]);
    });
    it('should renderEditable', () => {
      rendered.setProps({ id: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable, [1]);
    });
  });

  describe('renderSelect()', () => {
    it('should renderSelect', () => {
      rendered.setProps({ occupantIds: [1, 3], occupantLabel: 'hello' });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSelect);
    });
    it('should renderSelect', () => {
      instance.isOthers = jest.fn(() => true);
      rendered.setProps({
        occupantIds: [1, 3],
        occupantLabel: 'hello',
        guestCount: 2,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderSelect);
    });
  });

  describe('isFull()', () => {
    it('should return false', () => {
      rendered.setProps({ occupantIds: [1, 3], guestCount: 0 });
      expect(instance.isFull()).toEqual(false);
    });
    it('should return false', () => {
      rendered.setProps({ occupantIds: [1, 3], guestCount: 2 });
      expect(instance.isFull()).toEqual(true);
    });
  });

  describe('renderRowSimple()', () => {
    it('should renderRowSimple', () => {
      rendered.setProps({ occupantIds: [1, 3], id: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowSimple);
    });
  });
  describe('renderCard()', () => {
    it('should renderCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
    it('should renderCard', () => {
      rendered.setProps({ occupantIds: [1, 3], id: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
  });
  describe('isFull()', () => {
    it('should isFull', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.isOthers);
    });
  });

  describe('renderMenuItem()', () => {
    it('should renderMenuItem', () => {
      rendered.setProps({ menuItemClick: jest.fn() });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItem);
    });
    it('should renderMenuItem', () => {
      rendered.setProps({ menuItemClick: jest.fn() });
      rendered.setState({ showPaxDetail: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItem);
    });
  });

  describe('renderPaxcontentByAgeType()', () => {
    it('should renderPaxcontentByAgeType', () => {
      rendered.setProps({
        occupantIds: [1, 2, 3],
        ageTypeValues: ['Adult', 'Children', null],
      });
      instance.isEditing = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderPaxcontentByAgeType);
    });
  });

  describe('roomPaxContentList()', () => {
    it('should roomPaxContentList', () => {
      rendered.setProps({ occupantIds: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.roomPaxContentList, [1]);
    });
    it('should roomPaxContentList', () => {
      rendered.setProps({ occupantIds: [] });
      TEST_HELPERS.expectMatchSnapshot(instance.roomPaxContentList, [1]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');
    });
  });
});
