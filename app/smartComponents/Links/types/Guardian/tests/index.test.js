import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Guardian } from '../index';

describe('<Guardian />', () => {
  let rendered;
  let instance;
  let doResagaSnapshot = false;

  const resaga = {
    setValue: jest.fn(obj => doResagaSnapshot && expect(obj).toMatchSnapshot()),
    dispatchTo: jest.fn(
      obj => doResagaSnapshot && expect(obj).toMatchSnapshot(),
    ),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Guardian {...props} />);
    instance = rendered.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Guardian).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleListItemSubmit', () => {
    it('should call dispatchTo', () => {
      const model = {
        followerId: 1,
        relationship: 'other',
        otherRelationship: null,
      };
      const onSuccess = jest.fn();
      const onError = jest.fn();
      instance.handleListItemSubmit({ model, onSuccess, onError });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderUnlinkFollower', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderUnlinkFollower(1, 2));
    });
  });

  describe('handleDeleteNode', () => {
    it('should call deleteNode', () => {
      NODE_API_HELPERS.deleteNode = jest.fn();
      instance.handleDeleteNode({ onLoad: jest.fn(), onClose: jest.fn() });
      expect(NODE_API_HELPERS.deleteNode).toHaveBeenCalled();
    });
  });

  describe('handleDeleteError', () => {
    it('should not fail even if onLoad is null', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      const onLoad = null;
      instance.handleDeleteError({ onLoad })();
    });
  });

  describe('handleDeleteSuccess', () => {
    it('should call handleDeleteNode', () => {
      instance.handleDeleteNode = jest.fn();
      rendered.setState({ shouldDeleteAnotherNode: true });
      instance.handleDeleteSuccess({ onLoad: jest.fn(), onClose: jest.fn() })();
      expect(instance.handleDeleteNode).toHaveBeenCalled();
    });
  });

  describe('handleUnlinkFollower', () => {
    it('should setState', () => {
      instance.handleUnlinkFollower(1, 1);
      expect(rendered.state().shouldDeleteFromOtherParticipant).toEqual(1);
    });
  });

  describe('handleClickOpenEdit', () => {
    it('should setState', () => {
      instance.handleClickOpenEdit(1)();
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('editFollower', () => {
    it('should setState', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.editFollower());
    });
  });

  describe('handleDeleteNodeSuccess', () => {
    it('should call setValue', () => {
      const linkIds = [1, 2, 3, 4, 5, 6];
      const participantFollowers = [
        { followers: [1], link: 1 },
        { followers: [2], link: 2 },
      ];
      rendered.setProps({ linkIds, participantFollowers });
      instance.handleDeleteNodeSuccess({
        onLoad: jest.fn(),
        onClose: jest.fn(),
      })(1, { nodeId: 1 });
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('handleUpdateFollowers', () => {
    it('should return editedStore', () => {
      const affectedParticipants = [
        { participantId: 1544, followers: [5144], link: 5144 },
        { participantId: 1593, followers: [5052, 5145, 5146], link: 5146 },
      ];
      const store = {
        1544: { followers: [5144] },
        1593: { followers: [5052, 5145, 5146] },
      };
      const editedStore = {
        1544: { followers: [] },
        1593: { followers: [5052, 5145] },
      };
      expect(
        instance.handleUpdateFollowers(affectedParticipants)(store),
      ).toEqual(editedStore);
    });
  });

  describe('renderStatus', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if userConnected is true', () => {
      rendered.setProps({
        userConnected: true,
      });
      const snapshot = shallow(<div>{instance.renderStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if invitationPending is true', () => {
      rendered.setProps({
        invitationPending: true,
      });
      const snapshot = shallow(<div>{instance.renderStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('#openSeeDetail()', () => {
    it('still matches snapshot', () => {
      expect(
        instance.openSeeDetail({ stopPropagation: jest.fn() }),
      ).toMatchSnapshot();
    });
  });
  describe('renderInviteButton', () => {
    it('should match snapshot', () => {
      rendered.setProps({ userConnected: true });
      const snapshot = shallow(<div>{instance.renderInviteButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if user is not connected and not invitation pending', () => {
      const snapshot = shallow(<div>{instance.renderInviteButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleDeleteRelationship', () => {
    it('should setState', () => {
      instance.handleDeleteRelationship(1, 1);
      expect(rendered.state().shouldDeleteAnotherNode).toEqual(1);
    });
  });

  describe('handleDeleteSuccess', () => {
    it('should not fail even if onLoad and onClose is null', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      const onLoad = null;
      const onClose = null;
      instance.handleDeleteSuccess({ onLoad, onClose })();

      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
    });
  });

  describe('handleDelete', () => {
    it('should call dispatchTo', () => {
      const onLoad = jest.fn();
      const onClose = jest.fn();
      instance.handleDelete(1, 2)({ onLoad, onClose });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('getFollowerOptions', () => {
    it('should match snapshot', () => {
      const selectableFollowers = [1, 2];
      rendered.setProps({ selectableFollowers });

      expect(instance.getFollowerOptions()).toMatchSnapshot();
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
      rendered.setProps({ readOnlyStatus: true });
      doResagaSnapshot = true;
      instance.handleClick({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });
    });
  });

  describe('renderRelationship', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRelationship()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditableFormActions', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderEditableFormActions(1, 2)()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderListItemValue', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderListItemValue(1, 1)()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      rendered.setProps({ showEditBtn: true });
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if showUnlink', () => {
      rendered.setProps({ showUnlink: true, showEditBtn: true });
      instance.renderForm = jest.fn(() => 'renderForm');
      instance.renderUnlinkFollower = jest.fn(() => 'renderUnlinkFollower');
      instance.renderEditableFormActions = jest.fn(
        () => 'renderEditableFormActions',
      );
      instance.renderListItemValue = jest.fn(() => 'renderListItemValue');
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('getAvatarProps', () => {
    it('should match snapshot', () => {
      instance.AvatarProps = true;
      expect(instance.getAvatarProps()).toBe(true);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
