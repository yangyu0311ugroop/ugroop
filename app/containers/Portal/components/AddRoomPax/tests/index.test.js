import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddRoomPax } from '../index';

describe('<AddRoomPax />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<AddRoomPax {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddRoomPax).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should handleClose()', () => {
      PORTAL_HELPERS.close = jest.fn(() => '');

      instance.handleClose();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('handleRemoveLink()', () => {
    it('should handleRemoveLink()', () => {
      PORTAL_HELPERS.close = jest.fn(() => '');

      instance.handleRemoveLink({ participantId: 1 })();

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('handleCreateSuccess()', () => {
    it('should handleCreateSuccess()', () => {
      instance.handleClose = jest.fn(() => '');

      instance.handleCreateSuccess({ node: { id: 9922 } });

      TEST_HELPERS.expectCalled(instance.handleClose);
      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('handleCreateLink()', () => {
    it('should handleCreateLink()', () => {
      instance.handleCreateLink({
        participantId: 1,
        occupant: [1, 2],
      })({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });
    });
    it('should handleCreateLink()', () => {
      rendered.setState({ loading: true });
      instance.handleCreateLink({
        participantId: 1,
        occupant: [1, 2],
      })({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });
    });
  });

  describe('handleremoveLinkSuccess()', () => {
    it('should handleremoveLinkSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleremoveLinkSuccess);
    });
  });
  describe('renderSaveCancelButton()', () => {
    it('should renderSaveCancelButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSaveCancelButton);
    });
  });

  describe('availableIds()', () => {
    it('should availableIds', () => {
      rendered.setProps({
        confirmedParticipantIds: [1, 2, 3],
        allRoomPaxIds: [1],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.availableIds);
    });
  });

  describe('renderAvailableParticipantList()', () => {
    it('should renderAvailableParticipantList', () => {
      rendered.availableIds = jest.fn(() => [1, 2]);
      TEST_HELPERS.expectMatchSnapshot(instance.renderAvailableParticipantList);
    });
    it('should rencder renderAvailableParticipantList correctly when room is full', () => {
      rendered.availableIds = jest.fn(() => [1, 2]);
      rendered.isFull = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderAvailableParticipantList);
    });
  });

  describe('handleCreateLinkSuccess()', () => {
    it('should handleCreateLinkSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkSuccess);
    });
    it('should handleCreateLinkSuccess', () => {
      rendered.setState({ loading: true });
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkSuccess);
    });
  });

  describe('handleCreateLinkError()', () => {
    it('should handleCreateLinkError', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCreateLinkError);
    });
  });

  describe('handleClickRow()', () => {
    it('should handleClickRow', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleClickRow);
    });
  });

  describe('renderDeleteButton()', () => {
    it('should renderDeleteButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDeleteButton, [1]);
    });
    it('should renderDeleteButton', () => {
      rendered.setProps({ processId: 1 });
      rendered.setState({ loading: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderDeleteButton, [1]);
    });
  });

  describe('renderAddButton()', () => {
    it('should renderAddButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddButton, [1, [1]]);
    });
    it('should renderAddButton', () => {
      rendered.setState({ loading: true, processId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddButton, [1, [1]]);
    });
  });

  describe('setLoading()', () => {
    it('should setLoading', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.setLoading, [
        { value: false, id: 1 },
      ]);
    });
  });

  describe('renderOccupants()', () => {
    it('should renderOccupants', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOccupants);
    });
    it('should renderOccupants', () => {
      rendered.setProps({ occupantIds: [1, 3] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderOccupants);
    });
  });

  describe('renderNoPax()', () => {
    it('should renderNoPax', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNoPax);
    });
    it('should renderNoPax', () => {
      rendered.setProps({ participantId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderNoPax);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      instance.isFull = jest.fn(() => true);
      rendered.setProps({ occupantIds: [1, 3] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
    it('should renderContent form 2nd line', () => {
      instance.isFull = jest.fn(() => true);
      instance.availableIds = jest.fn(() => [1]);
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
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

  describe('renderContent()', () => {
    it('should renderContent', () => {
      instance.renderSaveCancelButton = jest.fn(() => 'renderSaveCancelButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
