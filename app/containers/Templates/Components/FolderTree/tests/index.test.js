import { DO_NOTHING, URL_HELPERS } from 'appConstants';
import { FOLDER_TREE_COPY_MODE } from 'containers/Templates/Components/FolderTree/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { FOLDER_API, GET_FOLDER_TREE } from 'apis/constants';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { FolderTree } from '../index';

describe('<FolderTree />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const intl = {
    formatMessage: jest.fn(() => 'formatMessage'),
  };

  const props = {
    classes: {},
    resaga,
    rootNodeId: 1,
    onConfirm: jest.fn(),
    myToursId: 1,
    orgToursId: 2,
    intl,
  };

  beforeEach(() => {
    SnackbarHelper.openErrorSnackbar = jest.fn();
    rendered = shallow(<FolderTree {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(FolderTree).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should call fetchFolders if rootNodeId exist', () => {
      const rootNodeIds = [1, -1, -2];
      rootNodeIds.forEach(rootNodeId => {
        rendered.setProps({ rootNodeId });
        instance.fetchFolders = jest.fn();
        instance.componentDidMount();
        expect(instance.fetchFolders).toBeCalled();
      });
    });
  });

  describe('componentDidUpdate', () => {
    it('should call fetchFolders is true again', () => {
      instance.fetchFolders = jest.fn();
      rendered.setProps({
        isOpen: true,
      });
      expect(instance.fetchFolders).toBeCalled();
    });
    it('should not call fetchFolders if it is not true', () => {
      instance.fetchFolders = jest.fn();
      rendered.setProps({
        isOpen: false,
      });
      expect(instance.fetchFolders).not.toBeCalled();
    });
  });

  describe('onSelect', () => {
    it('should set selected state based on the pass value to it', () => {
      instance.onSelect(2);
      expect(rendered.state().selected).toBe(2);
    });
  });

  describe('onConfirmSuccess', () => {
    it('should reset selected state, call fetchFolders and set value isOpen', () => {
      instance.fetchFolders = jest.fn();
      instance.onConfirmSuccess();
      expect(rendered.state().selected).toBe(-1);
      expect(instance.fetchFolders).toBeCalledWith(props.rootNodeId);
      expect(resaga.setValue).toBeCalledWith({
        isOpen: false,
      });
    });
  });

  describe('onConfirm', () => {
    it('should call onConfirm props with a particular param shape', () => {
      rendered.setState({
        selected: 1,
      });
      instance.onConfirmSuccess = 'onConfirmSuccess';
      instance.onConfirm();

      expect(props.onConfirm).toBeCalledWith(1, {
        includeCheckList: false,
        onSuccess: 'onConfirmSuccess',
        onError: 'onConfirmSuccess',
      });
    });
  });

  describe('onClose', () => {
    it('should call set value with a particular param shape', () => {
      instance.onClose();
      expect(resaga.setValue).toBeCalledWith({
        isOpen: false,
      });
    });
  });

  describe('getErrorDisplay', () => {
    it('should render a particular text if status code is unauthorized', () => {
      const snapshot = shallow(
        <div>
          {instance.getErrorDisplay(HTTP_STATUS_CODE.STATUS_UNAUTHORIZED)}
        </div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render a particular text if status code is unauthorized', () => {
      const snapshot = shallow(
        <div>
          {instance.getErrorDisplay(HTTP_STATUS_CODE.STATUS_SERVER_ERROR)}
        </div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleFetchArrayFolderSuccess', () => {
    it('should return empty string if there is no knownAs', () => {
      rendered.setProps({
        knownAsValues: [],
        memberIds: [1],
      });

      const result = {
        raw: [
          {
            children: [
              {
                status: 'personal',
                id: 1,
                children: [],
              },
            ],
          },
        ],
      };

      const newItems = [
        {
          children: [
            {
              children: [],
              id: 1,
              status: 'personal',
            },
          ],
        },
      ];

      instance.handleFetchArrayFolderSuccess(result);
      expect(rendered.state().items).toEqual(newItems);
    });
    it('should set items to whatever the result is and isFetchLoading state to false', () => {
      rendered.setProps({
        knownAs: [],
      });
      const result = {
        raw: [
          {
            id: 1,
            content: 'my',
            children: [],
          },
          {
            id: 2,
            content: 'Org Tours',
            children: [],
          },
        ],
      };
      instance.handleFetchArrayFolderSuccess(result);
      expect(rendered.state().items).toEqual(result.raw);
      expect(rendered.state().isFetchLoading).toBe(false);
    });
    it('should setState item if a child is a not personal workspace', () => {
      const oldArray = {
        raw: [
          {
            id: 1,
            content: 'Organisation Tours',
            children: [{ id: 2, content: '2', status: '' }],
          },
          {
            id: 3,
            content: 'My Tours',
            children: [],
          },
        ],
      };

      const result = [
        {
          id: 1,
          content: 'Organisation Tours',
          children: [{ id: 2, content: '2', status: '' }],
        },
        {
          id: 3,
          content: 'My Tours',
          children: [],
        },
      ];

      instance.handleFetchArrayFolderSuccess(oldArray);
      expect(rendered.state().items).toEqual(result);
    });
    it('should render something if there are knownAsValues', () => {
      rendered.setProps({
        knownAsValues: [[1, 'Elijah']],
        memberIds: [1],
      });
      const result = {
        raw: [
          {
            children: [
              {
                status: 'personal',
                content: '1',
                children: [],
                id: 1,
              },
            ],
          },
        ],
      };
      const newItems = [
        {
          children: [
            {
              children: [],
              id: 1,
              status: 'personal',
              content: '1',
            },
          ],
        },
      ];

      instance.handleFetchArrayFolderSuccess(result);
      expect(rendered.state().items).toEqual(newItems);
    });
  });

  describe('renderIcon', () => {
    it('should render something', () => {
      instance.renderIcon(1, 'className');
    });
  });

  describe('handleFetchFolderError', () => {
    it('should call openErrorSnackbar with particular params if statusCode is unauthorized and isOpen prop is true', () => {
      rendered.setProps({
        isOpen: true,
      });
      const errorObject = {
        response: {
          error: {
            statusCode: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
          },
        },
      };

      instance.handleFetchFolderError(errorObject);
      expect(rendered.state()).toMatchSnapshot();
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });

    it('should call openErrorSnackbar with particular params if statusCode is not unauthorized and isOpen prop is true', () => {
      rendered.setProps({
        isOpen: true,
      });
      const errorObject = {
        response: {
          error: {
            statusCode: HTTP_STATUS_CODE.STATUS_SERVER_ERROR,
          },
        },
      };

      instance.handleFetchFolderError(errorObject);
      expect(rendered.state()).toMatchSnapshot();
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });

    it('should return DO_NOTING if isProp is not open', () => {
      rendered.setProps({
        isOpen: false,
      });
      const errorObject = {
        response: {
          error: {
            statusCode: HTTP_STATUS_CODE.STATUS_SERVER_ERROR,
          },
        },
      };

      const result = instance.handleFetchFolderError(errorObject);
      expect(result).toBe(DO_NOTHING);
    });
  });

  describe('fetchFolders', () => {
    it('should not call dispatchTo if isOpen props is false', () => {
      instance.fetchFoldersSuccess = 'fetchFolderSuccess';
      instance.fetchFolders();

      expect(resaga.dispatchTo).not.toBeCalled();
    });
    it('should call dispatchTo with a particular param shape if isOpen prop is true and id is not array', () => {
      rendered.setProps({
        isOpen: true,
      });
      rendered.setProps({
        rootNodeId: 3,
      });
      instance.getTreeIds = jest.fn(() => 1);
      instance.fetchFoldersSuccess = 'fetchFolderSuccess';
      instance.handleFetchFolderError = 'handleFetchFolderError';
      instance.fetchFolders();

      expect(rendered.state()).toMatchSnapshot();
      expect(resaga.dispatchTo).toBeCalledWith(FOLDER_API, GET_FOLDER_TREE, {
        payload: { id: 1 },
        onSuccess: 'fetchFolderSuccess',
        onError: 'handleFetchFolderError',
      });
    });

    it('should call dispatchTo with a particular param shape if isOpen prop is true and id is array', () => {
      rendered.setProps({
        isOpen: true,
      });
      rendered.setProps({
        rootNodeId: [3, 4],
      });
      instance.handleFetchArrayFolderSuccess = 'handleFetchArrayFolderSuccess';
      instance.handleFetchFolderError = 'handleFetchFolderError';
      instance.fetchFolders();

      expect(rendered.state()).toMatchSnapshot();
      /* expect(resaga.dispatchTo).toBeCalledWith(
        FOLDER_API,
        BATCH_GET_FOLDER_TREE,
        {
          payload: { ids: [props.orgToursId, 3, 4] },
          onSuccess: 'handleFetchArrayFolderSuccess',
          onError: 'handleFetchFolderError',
        },
      ); */
    });
  });

  describe('getTreeIds', () => {
    it('should return orgNodeIds + myToursId if url is in my tours page and folder tree is in copy mode', () => {
      rendered.setProps({
        orgNodeIds: [1, 2, 3],
        myToursId: 4,
        location: {
          pathname: URL_HELPERS.tours(),
        },
        folderTreeMode: FOLDER_TREE_COPY_MODE,
        rootNodeId: undefined,
      });
      const result = instance.getTreeIds();
      expect(result).toEqual([1, 2, 3, 4]);
    });
  });

  describe('fetchFoldersSuccess', () => {
    it('should rename the content object attribute then transform it to array', () => {
      instance.fetchFoldersSuccess({
        content: 'Beauty in Brokenness',
        children: [],
      });
      expect(rendered.state().items).toMatchSnapshot();
    });
  });
  describe('onChangeCheck', () => {
    it('should rename the content object attribute then transform it to array', () => {
      instance.onChangeCheck();
      expect(rendered.state().includeCheckList).toMatchSnapshot();
    });
  });
  describe('cloneOption', () => {
    it('should render clone option', () => {
      rendered.setProps({
        showOption: true,
      });
      const snapshot = shallow(<div>{instance.cloneOption()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderItem', () => {
    it('should render content smartComponent given the id passed to it', () => {
      const snapshot = shallow(<div>{instance.renderItem(1)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render folder name if id is not included to the orgNodeIds of the user', () => {
      rendered.setProps({
        orgToursId: 1,
        orgNodeIds: [1, 2, 3],
        userOrgs: [1, 2, 3],
      });
      const snapshot = shallow(<div>{instance.renderItem(5)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render organisation name if id is included to the orgNodeIds of the user', () => {
      rendered.setProps({
        orgToursId: 1,
        orgNodeIds: [1, 2, 3],
        userOrgs: [1, 2, 3],
      });
      const snapshot = shallow(<div>{instance.renderItem(1)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render organisation text only', () => {
      rendered.setProps({
        orgToursId: 1,
        orgNodeIds: [1, 2, 3],
        userOrgs: [1, 2, 3],
      });
      const snapshot = shallow(<div>{instance.renderItem(1, true)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should pass different title for the dialog', () => {
      rendered.setState({
        selectedTitle: 'qqq',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should pass error text if errStatusCode exist', () => {
      rendered.setState({
        errStatusCode: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
