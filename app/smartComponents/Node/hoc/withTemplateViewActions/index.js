import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { NODE_API, UPDATE_NODE } from 'apis/constants';
import {
  FOLDER_TREE_MOVE_MODE,
  FOLDER_TREE_COPY_MODE,
} from 'containers/Templates/Components/FolderTree/constants';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { DO_NOTHING } from 'appConstants';
// import memoize from 'memoize-one';

import { CONFIG } from './config';

export const withTemplateViewActions = WrappedComponent => {
  class HasTemplateViewActions extends PureComponent {
    onUpdate = ({ form }) => {
      const payload = {
        id: form.payload.parentNodeId,
        content: form.payload.content,
        type: form.payload.type,
      };

      const param = {
        payload: {
          nodeId: payload.id,
          node: payload,
        },
        onSuccess: this.onUpdateSuccess(form.onSuccess),
        onError: this.onErrorUpdate(form.onError),
      };

      this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, param);
    };

    getUser = () => {
      const { id } = this.props;

      return {
        id,
      };
    };

    onClose = () => {
      this.props.resaga.setValue({
        folderFormOpen: false,
      });
    };

    onMove = () => {
      const { id, type, content } = this.props;
      this.props.resaga.setValue({
        isOpenFolderTree: true,
        folderTreeMode: FOLDER_TREE_MOVE_MODE,
        selectedId: id,
        selectedType: type,
        selectedName: content,
      });
    };

    onCopy = () => {
      const { id, type, content } = this.props;
      this.props.resaga.setValue({
        isOpenFolderTree: true,
        folderTreeMode: FOLDER_TREE_COPY_MODE,
        selectedId: id,
        selectedType: type,
        selectedName: content,
      });
    };

    onDelete = (item, shouldRedirect = false) => {
      this.props.resaga.setValue({
        isOpenDeleteDialog: true,
        selectedItem: item,
        deleteType: 'singleDelete',
        shouldRedirect,
      });
    };

    onUpdateSuccess = cb => () => {
      SnackbarHelper.openSuccessSnackbar(
        'Successfully updated the item',
        this.props.resaga,
      );
      this.shouldRunCallback(cb);
      return this.props.resaga.setValue({
        isEditable: false,
      });
    };

    onErrorUpdate = cb => err => {
      if (err.status === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED) {
        this.onErrorUnauthorize(cb);
        this.onEditCancel();
      }

      return DO_NOTHING;
    };

    onErrorUnauthorize = cb => {
      SnackbarHelper.openErrorSnackbar(
        'You are not authorized in doing the action',
        this.props.resaga,
      );

      this.shouldRunCallback(cb);
    };

    onEditCancel = () => {
      this.props.resaga.setValue({
        isEditable: false,
      });
    };

    onEnableEditMode = () => {
      this.props.resaga.setValue({
        isEditable: true,
      });
    };

    shouldRunCallback = (cb, passedParam) => {
      if (typeof cb === 'function') return cb(passedParam);

      return DO_NOTHING;
    };

    getOperations = () => ({
      onUpdate: this.onUpdate,
      onMove: this.onMove,
      onCopy: this.onCopy,
      onDelete: this.onDelete,
      onEnableEditMode: this.onEnableEditMode,
      onEditCancel: this.onEditCancel,
    });

    render = () => (
      <WrappedComponent
        templateViewActions={this.getOperations()}
        {...this.props}
      />
    );
  }

  HasTemplateViewActions.propTypes = {
    // hoc
    resaga: PropTypes.object.isRequired,

    // parent
    id: PropTypes.number,

    // resaga
    content: PropTypes.string,
    type: PropTypes.string,
  };

  return HasTemplateViewActions;
};

export default WrappedComponent =>
  compose(resaga(CONFIG))(withTemplateViewActions(WrappedComponent));
