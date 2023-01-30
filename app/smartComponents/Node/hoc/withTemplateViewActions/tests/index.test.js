import React from 'react';
import { shallow } from 'enzyme';
import { HTTP_STATUS_CODE } from 'utils/http-constant';

import toJSON from 'enzyme-to-json';
import {
  FOLDER_TREE_MOVE_MODE,
  FOLDER_TREE_COPY_MODE,
} from 'containers/Templates/Components/FolderTree/constants';
import { DO_NOTHING } from 'appConstants';

import composedWithTemplateViewActions, {
  withTemplateViewActions,
} from '../index';

describe('smartComponents/Node/hoc/withTemplateViewActions', () => {
  let rendered;
  let instance;

  const Component = () => <div />;
  const Hoc = withTemplateViewActions(Component);

  const props = {
    resaga: {
      dispatchTo: jest.fn(),
      setValue: jest.fn(),
    },
  };

  beforeEach(() => {
    rendered = shallow(<Hoc {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });
  it('exists', () => {
    expect(withTemplateViewActions()).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithTemplateViewActions(Component)).toBeDefined();
    });
  });

  describe('onUpdate', () => {
    it('should call dispatchTo with proper data', () => {
      const form = {
        payload: {
          parentNodeId: 1,
          content: 'content',
          type: 'folder',
        },
      };

      instance.onUpdate({ form });
      expect(props.resaga.dispatchTo).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return id', () => {
      rendered.setProps({
        id: 1,
      });
      expect(instance.getUser()).toEqual({ id: 1 });
    });
  });

  describe('onClose', () => {
    it('should call set value', () => {
      instance.onClose();
      expect(props.resaga.setValue).toHaveBeenCalledWith({
        folderFormOpen: false,
      });
    });
  });

  describe('onCopy', () => {
    it('should call set value with proper values', () => {
      rendered.setProps({
        id: 1,
        type: 'type',
        content: 'as',
      });
      instance.onCopy();
      expect(props.resaga.setValue).toHaveBeenCalledWith({
        isOpenFolderTree: true,
        folderTreeMode: FOLDER_TREE_COPY_MODE,
        selectedId: 1,
        selectedType: 'type',
        selectedName: 'as',
      });
    });
  });

  describe('onMove', () => {
    it('should call set value with proper values', () => {
      rendered.setProps({
        id: 1,
        type: 'type',
        content: 'as',
      });
      instance.onMove();
      expect(props.resaga.setValue).toHaveBeenCalledWith({
        isOpenFolderTree: true,
        folderTreeMode: FOLDER_TREE_MOVE_MODE,
        selectedId: 1,
        selectedType: 'type',
        selectedName: 'as',
      });
    });
  });

  describe('onUpdateSuccess', () => {
    it('should call proper functions', () => {
      instance.shouldRunCallback = jest.fn();

      const cb = jest.fn();

      instance.onUpdateSuccess(cb)();

      expect(instance.shouldRunCallback).toHaveBeenCalledWith(cb);
      expect(props.resaga.setValue).toHaveBeenCalledWith({
        isEditable: false,
      });
    });
  });

  describe('onErrorUpdate', () => {
    it('should call proper functions if status is unauthorized', () => {
      instance.onErrorUnauthorize = jest.fn();
      instance.onEditCancel = jest.fn();

      const cb = jest.fn();
      const err = {
        status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
      };

      instance.onErrorUpdate(cb)(err);
      expect(instance.onErrorUnauthorize).toHaveBeenCalledWith(cb);
      expect(instance.onEditCancel).toHaveBeenCalled();
    });
    it('should do nothing if error is not unauthorized', () => {
      const cb = jest.fn();
      const err = {
        status: 'status',
      };
      expect(instance.onErrorUpdate(cb)(err)).toEqual(DO_NOTHING);
    });
  });

  describe('onErrorUnauthorize', () => {
    it('should call proper functions', () => {
      instance.shouldRunCallback = jest.fn();

      const cb = jest.fn();

      instance.onErrorUnauthorize(cb);
      expect(instance.shouldRunCallback).toHaveBeenCalledWith(cb);
    });
  });

  describe('onEditCancel', () => {
    it('should call set value', () => {
      instance.onEditCancel();
      expect(props.resaga.setValue).toHaveBeenCalledWith({
        isEditable: false,
      });
    });
  });

  describe('onEnableEditMode', () => {
    it('should call set value', () => {
      instance.onEnableEditMode();
      expect(props.resaga.setValue).toHaveBeenCalledWith({
        isEditable: true,
      });
    });
  });

  describe('shouldRunCallback', () => {
    it('should run callback if it is a function', () => {
      const cb = jest.fn();
      const passedParam = 'shouldRunCallback';
      instance.shouldRunCallback(cb, passedParam);
      expect(cb).toHaveBeenCalled();
    });
    it('should do nothing if cb is not a function', () => {
      const cb = 'jest.fn()';
      const passedParam = 'shouldRunCallback';
      expect(instance.shouldRunCallback(cb, passedParam)).toEqual(DO_NOTHING);
    });
  });

  describe('onDelete', () => {
    it('should call setValue with proper values', () => {
      instance.onDelete('item');
      expect(props.resaga.setValue).toHaveBeenCalledWith({
        isOpenDeleteDialog: true,
        selectedItem: 'item',
        deleteType: 'singleDelete',
        shouldRedirect: false,
      });
    });
  });
});
