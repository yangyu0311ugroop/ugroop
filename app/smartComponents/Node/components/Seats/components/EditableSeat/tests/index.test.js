import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  CREATE_LINK,
  DELETE_LINK,
  NODE_API,
  REMOVE_NODE_AND_LINKS,
  UPDATE_LINK,
} from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PARTICIPANTS, SEAT, SEATS } from 'utils/modelConstants';
import Content from 'smartComponents/Node/parts/Content';

import { EditableSeat } from '../index';

describe('<EditableSeat />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 1,
    participantId: 2,
    parentNodeId: 3,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<EditableSeat {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditableSeat).toBeDefined();
  });

  it('should render correctly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render content correctly', () => {
    const snapshot = rendered.find(Content).renderProp('children')('vvv');

    expect(snapshot).toMatchSnapshot();
  });

  describe('handleRemove', () => {
    it('should call deleteNode', () => {
      NODE_API_HELPERS.deleteNode = jest.fn();
      instance.handleRemoveSuccess = 'handleRemoveSuccess';

      instance.handleRemove();

      expect(resaga.dispatchTo).toBeCalledWith(
        NODE_API,
        REMOVE_NODE_AND_LINKS,
        {
          payload: {
            id: props.id,
            fk: props.participantId,
            parentNodeId: props.parentNodeId,
            childKey: SEATS,
            nextNodeChildKey: SEATS,
          },
          onSuccess: 'handleRemoveSuccess',
        },
      );
    });
  });

  describe('handleRemoveSuccess', () => {
    it('should close the delete modal and set remove loading to false', () => {
      instance.handleRemoveSuccess();

      expect(rendered.state().open).toBe(false);
      expect(rendered.state().removeLoading).toBe(false);
    });
  });

  describe('dialog actions', () => {
    it('should set open state', () => {
      instance.handleOpenDialog();
      expect(rendered.state().open).toBe(true);

      instance.handleCloseDialog();
      expect(rendered.state().open).toBe(false);
    });
  });

  describe('handleMoveSuccess', () => {
    it('should set submit loading and open to false', () => {
      instance.handleMoveSuccess();

      expect(rendered.state().open).toBe(false);
      expect(rendered.state().submitLoading).toBe(false);
    });
  });

  describe('handleSubmitSuccess', () => {
    it('should fire a dispatch to update link api if new participant id is not 0 and prev participant id is not 0', () => {
      instance.handleMoveSuccess = 'handleMoveSuccess';

      instance.handleSubmitSuccess(2)();

      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, UPDATE_LINK, {
        payload: {
          id: props.id,
          fk: props.participantId,
          data: {
            nextNodeId: 2,
          },
          prevNodeChildKey: PARTICIPANTS,
          nextNodeChildKey: SEATS,
        },
        onSuccess: instance.handleMoveSuccess,
      });
    });

    it('should fire a dispatch to delete link api if new participant is 0 and prev participant id is not 0', () => {
      instance.handleMoveSuccess = 'handleMoveSuccess';

      instance.handleSubmitSuccess(0)();

      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, DELETE_LINK, {
        payload: {
          id: props.id,
          fk: props.participantId,
          prevNodeChildKey: PARTICIPANTS,
          nextNodeChildKey: SEATS,
        },
        onSuccess: instance.handleMoveSuccess,
      });
    });

    it('should fire a dispatch to delete link api if new participant is not 0 and prev participant id is 0', () => {
      rendered.setProps({
        participantId: 0,
      });
      instance.handleMoveSuccess = 'handleMoveSuccess';

      instance.handleSubmitSuccess(2)();

      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, CREATE_LINK, {
        payload: {
          id: props.id,
          data: {
            nextNodeId: 2,
          },
          prevNodeChildKey: PARTICIPANTS,
          nextNodeChildKey: SEATS,
        },
        onSuccess: instance.handleMoveSuccess,
      });
    });
  });

  describe('handleSubmit', () => {
    it('should call updateNode api', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleSubmitSuccess = jest.fn(() => 'handleSubmitSuccess');
      const mockObj = {
        node: {
          content: 'Something',
        },
        participantId: 2,
      };

      instance.handleSubmit(mockObj);
      expect(NODE_API_HELPERS.updateNode).toBeCalledWith(
        {
          nodeId: props.id,
          node: {
            ...mockObj.node,
            type: SEAT,
          },
          onSuccess: instance.handleSubmitSuccess(),
        },
        { ...props },
      );
    });
  });

  describe('renderValue', () => {
    it('should display name of participant including avatar', () => {
      rendered.setProps({ participantId: 1 });
      const snapshot = shallow(<div>{instance.renderValue()('qqqq')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should not display name of participant if participantId is 0', () => {
      rendered.setProps({ participantId: 0 });
      const snapshot = shallow(<div>{instance.renderValue()('qqqqq')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDialogFooter', () => {
    it('should pass to renderActions buttons needed for dialog footer if loading is not true', () => {
      const renderSubmitButton = jest.fn(() => 'renderSubmitButton');
      const renderCancelButton = jest.fn(() => 'renderCancelButton');
      const renderActions = jest.fn(() => 'renderActions');

      const dialogFooter = instance.renderDialogFooter()({
        renderSubmitButton,
        renderCancelButton,
        renderActions,
      });

      expect(dialogFooter).toBe('renderActions');
      expect(renderActions).toBeCalled();
      expect(renderActions.mock.calls).toMatchSnapshot();
    });

    it('should pass to renderActions buttons needed for dialog footer if loading is true', () => {
      rendered.setState({
        removeLoading: true,
      });
      const renderSubmitButton = jest.fn(() => 'renderSubmitButton');
      const renderCancelButton = jest.fn(() => 'renderCancelButton');
      const renderActions = jest.fn(() => 'renderActions');

      const dialogFooter = instance.renderDialogFooter()({
        renderSubmitButton,
        renderCancelButton,
        renderActions,
      });

      expect(dialogFooter).toBe('renderActions');
      expect(renderActions).toBeCalled();
      expect(renderActions.mock.calls).toMatchSnapshot();
    });
  });
});
