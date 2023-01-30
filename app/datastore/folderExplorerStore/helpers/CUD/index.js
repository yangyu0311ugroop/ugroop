import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { DO_NOTHING, DEFAULT_NODE_SHARE_TOUR_ID } from 'appConstants';
import {
  NODE_API,
  CREATE_NODE,
  UPDATE_NODE,
  BATCH_DELETE,
  TEMPLATE_API,
  FOLDER_API,
  REMOVE_TEMPLATE,
  DELETE_CHILDREN_FROM_FOLDER,
  MOVE,
  COPY,
} from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { CHECKITEM, CHECKLIST } from 'utils/modelConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG, GET_USER_ID_CONFIG, PHOTO_METAINFO_CONFIG } from './config';

export class CUD extends PureComponent {
  onErrorCopy = cb => () => {
    SnackbarHelper.openErrorSnackbar(
      'You cannot copy the item there',
      this.props.resaga,
    );
    this.shouldRunCallback(cb);
  };

  onErrorMove = cb => () => {
    SnackbarHelper.openErrorSnackbar(
      'You cannot move the item there',
      this.props.resaga,
    );
    this.shouldRunCallback(cb);
  };

  onErrorUnauthorize = cb => {
    SnackbarHelper.openErrorSnackbar(
      'You are not authorized in doing the action',
      this.props.resaga,
    );
    this.shouldRunCallback(cb);
  };

  onErrorDelete = cb => err => {
    if (err.status === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED) {
      this.onErrorUnauthorize(cb);
    }

    return DO_NOTHING;
  };

  onErrorCreate = cb => err => {
    if (err.status === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED) {
      this.onErrorUnauthorize(cb);
    }

    return DO_NOTHING;
  };

  onErrorUpdate = cb => (err, { nodeId }) => {
    if (err.status === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED) {
      this.onErrorUnauthorize(cb);
      this.onEditCancel(nodeId)();
    }

    return DO_NOTHING;
  };

  // Region : Move Node
  onMoveSuccess = cb => () => {
    SnackbarHelper.openSuccessSnackbar(
      'Successfully moved the item',
      this.props.resaga,
    );
    this.shouldRunCallback(cb);
  };

  onMoveConfirm = (idToBeMoved, type = '', currFolderId = 0) => (
    id,
    opts = {},
  ) => {
    const payload = {
      id: idToBeMoved,
      body: {
        parentNodeId: id,
      },
      keyPath: `${id}.children`,
      type,
      initialPath: `${this.props.folderId}.children`,
      sortedIdsPath: `${currFolderId}.calculated.sortedIds`,
    };
    const param = {
      payload,
      onSuccess: this.onMoveSuccess(opts.onSuccess),
      onError: this.onErrorMove(opts.onError),
    };
    this.props.resaga.dispatchTo(NODE_API, MOVE, param);
  };
  // End Region : Move Node

  // Region : Copy Node
  onCopySuccess = cb => result => {
    this.appendCurrentUser(result);
    SnackbarHelper.openSuccessSnackbar(
      'Successfully copied the item',
      this.props.resaga,
    );
    this.shouldRunCallback(cb);
  };

  onCopyConfirm = (idToBeCopied, type) => (id, opts = {}) => {
    const keyPath =
      this.props.folderId === id
        ? `${this.props.folderId}.children`
        : `${id}.children`;
    const sortedKeyPath =
      this.props.folderId === id
        ? `${this.props.folderId}.calculated.sortedIds`
        : `${id}.calculated.sortedIds`;
    const ignoreTypes = LOGIC_HELPERS.ifElse(
      !opts.includeCheckList,
      [CHECKITEM, CHECKLIST],
      [],
    );
    const param = {
      payload: {
        id: idToBeCopied,
        body: {
          parentNodeId: id,
          ignoreTypes,
        },
        type,
        keyPath,
        sortedKeyPath,
      },
      onSuccess: this.onCopySuccess(opts.onSuccess),
      onError: this.onErrorCopy(opts.onError),
    };

    this.props.resaga.dispatchTo(NODE_API, COPY, param);
  };
  // End Region : Copy Node

  // Region : Delete/Batch Delete
  onDeleteSuccess = cb => result => {
    SnackbarHelper.openSuccessSnackbar(
      'Successfully deleted the item',
      this.props.resaga,
    );
    this.shouldRunCallback(cb, result);
  };

  onBatchDelete = (payload, opts = {}) => {
    const { orgId } = this.props;
    const param = {
      payload: {
        items: payload,
        keyPath: `${this.props.folderId}.children`,
        sortedIdsKeyPath: `${this.props.folderId}.calculated.sortedIds`,
        orgTourKeypath: `${LOGIC_HELPERS.ifElse(
          orgId,
          orgId,
          DEFAULT_NODE_SHARE_TOUR_ID,
        )}.children`,
      },
      onSuccess: this.onDeleteSuccess(opts.onSuccess),
      onError: this.onErrorDelete(opts.onError),
    };
    this.props.resaga.dispatchTo(NODE_API, BATCH_DELETE, param);
  };

  onDelete = (id, type, opts = {}) => {
    const { folderId, parentId, orgId } = this.props;
    const param = {
      payload: {
        id,
        items: [{ id }],
        keyPath:
          type === 'folder' || type === 'template'
            ? `${LOGIC_HELPERS.ifElse(
                id === folderId,
                parentId,
                folderId,
              )}.calculated.sortedIds`
            : `${this.props.folderId}.children`,
        sortedIdsKeyPath: `${LOGIC_HELPERS.ifElse(
          id === folderId,
          parentId,
          folderId,
        )}.calculated.sortedIds`,
        orgTourKeypath: `${LOGIC_HELPERS.ifElse(
          orgId,
          orgId,
          DEFAULT_NODE_SHARE_TOUR_ID,
        )}.children`,
      },
      onSuccess: this.onDeleteSuccess(opts.onSuccess),
      onError: this.onErrorDelete(opts.onError),
    };
    if (type === 'folder') {
      this.props.resaga.dispatchTo(
        FOLDER_API,
        DELETE_CHILDREN_FROM_FOLDER,
        param,
      );
    } else {
      this.props.resaga.dispatchTo(TEMPLATE_API, REMOVE_TEMPLATE, param);
    }
  };
  // End Region : Delete/Batch Delete

  // Region : Create Node
  onCreateSuccess = cb => result => {
    // This is a quick fix at the moment while the list view are not yet refactored.
    // Since it was still using the createdBy and lastModifiedBy object, I have to resort in mimicking
    // the returned createdBy object. In the future, it can just accept the id and use userStore
    // to get the user information.
    // TODO: Paul - remove this part once you start refactoring the grid view and list view
    this.appendCurrentUser(result);
    // End
    SnackbarHelper.openSuccessSnackbar(
      'Successfully created',
      this.props.resaga,
    );
    this.shouldRunCallback(cb);
  };

  onCreate = opts => ({ form }) => {
    const payload = {
      type: 'folder',
      content: form.payload.content,
      parentNodeId: this.props.folderId,
    };
    const param = {
      payload: {
        node: payload,
        keyPath: `${this.props.folderId}.children`,
        isAppendedFirst: true,
      },
      onSuccess: this.onCreateSuccess(opts.onSuccess),
      onError: this.onErrorCreate(opts.onSuccess),
    };

    this.props.resaga.dispatchTo(NODE_API, CREATE_NODE, param);
  };
  // End Region : Create Node

  // Region : Editing Node
  onUpdateSuccess = cb => (result, { nodeId }) => {
    this.appendCurrentUser(result);
    SnackbarHelper.openSuccessSnackbar(
      'Successfully updated the item',
      this.props.resaga,
    );
    this.shouldRunCallback(cb);
    return this.props.resaga.setValue({
      nodes: DATASTORE_UTILS.updateSpecificObjectAttribute(
        'isEditable',
        false,
        nodeId,
      ),
    });
  };

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

  onEnableEditMode = id => () => {
    this.props.resaga.setValue({
      nodes: DATASTORE_UTILS.updateSpecificObjectAttribute(
        'isEditable',
        true,
        id,
      ),
    });
  };

  onEditCancel = id => () => {
    this.props.resaga.setValue({
      nodes: DATASTORE_UTILS.updateSpecificObjectAttribute(
        'isEditable',
        false,
        id,
      ),
    });
  };

  // End Region : Editing Node
  getUser = () => {
    const { id } = this.props;

    return {
      id,
    };
  };

  // This is a temporary fix. This will be remove in the next refactor
  // The next refactor will probably involve refactoring shared tours as well
  // TODO: Paul - Remove this once Shared Tours are refactored as well when refactoring Grid View and List View
  appendCurrentUser = result => {
    const node = { ...result.node };
    node.createdBy = this.getUser();
    node.lastModifiedBy = this.getUser();
    this.props.resaga.setValue({
      nodes: compose(
        DATASTORE_UTILS.upsertArray(
          `${node.parentNodeId}.calculated.sortedIds`,
          node.id,
          {
            isAppendedFirst: true,
          },
        ),
        DATASTORE_UTILS.upsertObject(node.id, node),
      ),
    });
  };

  shouldRunCallback = (cb, passedParam) => {
    if (typeof cb === 'function') return cb(passedParam);

    return DO_NOTHING;
  };

  render = () => (
    <React.Fragment>
      {this.props.children({
        onCreate: this.onCreate,
        onUpdate: this.onUpdate,
        onDelete: this.onDelete,
        onBatchDelete: this.onBatchDelete,
        onMoveConfirm: this.onMoveConfirm,
        onCopyConfirm: this.onCopyConfirm,
        onEnableEditMode: this.onEnableEditMode,
        onEditCancel: this.onEditCancel,
      })}
    </React.Fragment>
  );
}

CUD.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  folderId: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
  orgId: PropTypes.number,

  // resaga props
  id: PropTypes.number,
  parentId: PropTypes.number,
};

CUD.defaultProps = {
  id: 0,
};

export default compose(
  resaga(GET_USER_ID_CONFIG),
  resaga(CONFIG),
  resaga(PHOTO_METAINFO_CONFIG),
)(CUD);
