import { shallow } from 'enzyme';
import React from 'react';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { DATASTORE_UTILS } from 'datastore';
import { DO_NOTHING } from 'appConstants';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { CUD } from '../index';

describe('<CUD />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    children: jest.fn(),
    folderId: 1,
  };

  beforeEach(() => {
    SnackbarHelper.openErrorSnackbar = jest.fn();
    rendered = shallow(<CUD {...props} />);
    instance = rendered.instance();
    DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');
    DATASTORE_UTILS.updateSpecificObjectAttribute = jest.fn(
      () => 'updateSpecificObjectAttribute',
    );
    DATASTORE_UTILS.upsertArray = jest.fn(() => 'upsertArray');
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(CUD).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onErrorCopy', () => {
    it('should call showSnackbar with particular param', () => {
      instance.showSnackbar = jest.fn();
      instance.onErrorCopy(jest.fn())();
      expect(instance.showSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('onErrorMove', () => {
    it('should call showSnackbar with particular param', () => {
      instance.showSnackbar = jest.fn();
      instance.onErrorMove(jest.fn())();
      expect(instance.showSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('onErrorUnauthorize', () => {
    it('should execute openErrorSnackbar with a particular params', () => {
      instance.onErrorUnauthorize(jest.fn());
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('onErrorDelete', () => {
    it('should execute openErrorSnackbar with a particular params if status is 401', () => {
      instance.onErrorDelete(jest.fn())({
        status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
      });
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });

    it('should not execute openErrorSnackbar with a particular params if status is not 401', () => {
      const result = instance.onErrorDelete(jest.fn())({});
      expect(SnackbarHelper.openErrorSnackbar).not.toBeCalled();
      expect(result).toBe(DO_NOTHING);
    });
  });

  describe('onErrorCreate', () => {
    it('should execute openErrorSnackbar with a particular params if status is 401', () => {
      instance.onErrorCreate(jest.fn())({
        status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
      });
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });

    it('should not execute openErrorSnackbar with a particular params if status is not 401', () => {
      const result = instance.onErrorCreate(jest.fn())({});
      expect(SnackbarHelper.openErrorSnackbar).not.toBeCalled();
      expect(result).toBe(DO_NOTHING);
    });
  });

  describe('onErrorUpdate', () => {
    it('should execute openErrorSnackbar with a particular params if status is 401', () => {
      instance.onErrorUpdate(jest.fn())(
        {
          status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
        },
        {},
      );
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });

    it('should not execute openErrorSnackbar with a particular params if status is not 401', () => {
      const result = instance.onErrorUpdate(jest.fn())({}, {});
      expect(SnackbarHelper.openErrorSnackbar).not.toBeCalled();
      expect(result).toBe(DO_NOTHING);
    });
  });

  describe('onMoveSuccess', () => {
    it('should call setValue with a particular param', () => {
      instance.onMoveSuccess(jest.fn())({}, { body: { parentNodeId: 2 } });
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('onMoveConfirm', () => {
    it('should call dispatchTo with a particular param shape', () => {
      instance.onMoveSuccess = jest.fn(() => 'onMoveSuccess');
      instance.onErrorMove = jest.fn(() => 'onErrorMove');
      instance.onMoveConfirm(1)(2);
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('onCopySuccess', () => {
    it('should call setValue with a particular param if it is in current folder', () => {
      rendered.setProps({
        folderId: 2,
      });
      instance.onCopySuccess(jest.fn())({}, { body: { parentNodeId: 2 } });
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
    it('should call setValue with a particular param if it is not in the current folder', () => {
      instance.onCopySuccess(jest.fn())({}, { body: { parentNodeId: 2 } });
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('onCopyConfirm', () => {
    it('should run dispatchTo with particular param', () => {
      instance.onCopySuccess = jest.fn(() => 'onCopySuccess');
      instance.onErrorCopy = jest.fn(() => 'onErrorCopy');
      instance.onCopyConfirm(3)(1);
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
    it('should run dispatchTo with particular param if folder id is not equal destination id', () => {
      instance.onCopySuccess = jest.fn(() => 'onCopySuccess');
      instance.onErrorCopy = jest.fn(() => 'onErrorCopy');
      instance.onCopyConfirm(2)(3);
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('onBatchDelete', () => {
    it('should call dispatchTo', () => {
      instance.onDeleteSuccess = jest.fn(() => 'onDeleteSuccess');
      instance.onBatchDelete([1, 2, 3]);
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('onDeleteSuccess()()', () => {
    it('should call setValue', () => {
      const cb = jest.fn();
      instance.shouldRunCallback = jest.fn();
      instance.onDeleteSuccess(cb)(null, { items: [{ id: 1 }, { id: 2 }] });
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
      expect(instance.shouldRunCallback.mock.calls).toMatchSnapshot();
    });
  });

  describe('onDelete', () => {
    it('should call dispatchTo depending on the type', () => {
      const tableCases = [
        { id: 1, type: 'folder' },
        { id: 1, type: 'template' },
        { id: 1, type: 'somethingselse' },
      ];

      tableCases.forEach(tableCase => {
        instance.onDeleteSuccess = jest.fn(() => 'onDeleteSuccess');
        instance.onDelete(tableCase.id, tableCase.type);
        expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
      });
    });
  });

  describe('onCreateSuccess()', () => {
    it('should call setValue', () => {
      const cb = jest.fn();
      instance.shouldRunCallback = jest.fn();
      instance.onCreateSuccess(cb)({
        node: {
          id: 1,
          createdBy: {},
          lastModifiedBy: {},
        },
      });
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
      expect(instance.shouldRunCallback.mock.calls).toMatchSnapshot();
    });
  });

  describe('onCreate()', () => {
    it('should call dispatchTo', () => {
      instance.onCreateSuccess = jest.fn(() => 'onCreateSuccess');
      instance.onCreate({ onSuccess: 'opt.onSuccess' })({
        form: {
          payload: {
            id: 1,
            type: 'folder',
            content: 'qqq',
          },
        },
      });
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('onUpdateSuccess()()', () => {
    it('should call setValue', () => {
      const cb = jest.fn();
      instance.shouldRunCallback = jest.fn();
      instance.onUpdateSuccess(cb)({ node: {} }, { nodeId: 1 });
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
      expect(instance.shouldRunCallback.mock.calls).toMatchSnapshot();
    });
  });

  describe('onUpdate()', () => {
    it('should call dispatchTo', () => {
      instance.onUpdateSuccess = jest.fn(() => 'onUpdateSuccess');
      instance.onUpdate({
        form: {
          payload: {
            parentNodeId: 1,
            content: 'qqq',
            type: 'folder',
          },
        },
      });
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('onEnableEditMode', () => {
    it('should call setValue with particular params', () => {
      instance.onEnableEditMode(1)();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('onEditCancel', () => {
    it('should call setValue with particular params', () => {
      instance.onEditCancel(1)();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('getUser()', () => {
    it('should return object containing all data about the current logged in user', () => {
      expect(instance.getUser()).toMatchSnapshot();
    });
  });

  describe('shouldRunCallback()', () => {
    it('should not run callback if it is not a function', () => {
      const tableCases = [1, 'asd', true, false];
      tableCases.forEach(tableCase => {
        const result = instance.shouldRunCallback(tableCase);
        expect(result).toBe(DO_NOTHING);
      });
    });
    it('should run callback if it is a function', () => {
      const cb = jest.fn();
      instance.shouldRunCallback(cb, 1);
      expect(cb).toBeCalledWith(1);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.render();
      expect(props.children.mock.calls).toMatchSnapshot();
    });
  });
});
