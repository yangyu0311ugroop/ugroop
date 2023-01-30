import {
  NODE_API,
  GET_NODE,
  CREATE_CHILD,
  CREATE_CLONE,
  CREATE_NEXT_NODE,
  DELETE_CHILDREN,
  SHARE_NODE,
  UPDATE_NODE,
  CREATE_NODE,
  REMOVE_NODE,
  BATCH_DELETE,
  BATCH_DELETE_CHILDREN,
  INSERT_AFTER,
  INSERT_BEFORE,
  COPY,
  MOVE,
  CREATE_PHOTO,
  UPDATE_PHOTO,
  GET_TIMES,
  REMOVE_PHOTO,
  BATCH_MOVE,
  GET_ATTACHMENT,
  CREATE_ATTACHMENT,
  UPDATE_ATTACHMENT,
  REMOVE_ATTACHMENT,
  UPDATE_CHILD,
  GET_CHILDREN,
  INSERT_TEMP_AFTER,
  INSERT_TEMP_BEFORE,
  DELETE_TEMP_NODE,
  MOVE_NODE_BEFORE,
  MOVE_NODE_AFTER,
  UNLINK_NEXT_NODE,
  CREATE_LINK,
  DELETE_LINK,
  UPDATE_LINK,
  REMOVE_NODE_AND_LINKS,
  GET_LINKS,
  TRANSFER_NODE,
  GET_TRANSFER_NODE,
  PATCH_TRANSFER_NODE,
  BATCH_CREATE_CLONE,
  GET_NODES_VIA_FILTER,
} from 'apis/constants';
import { DO_NOTHING } from 'appConstants';
import {
  wrapRequestWithErrorHandler,
  SHOW_ERROR_IN_SNACKBAR,
  SHOW_UNPROCESSABLE_ERROR_IN_SNACKBAR,
} from 'error-messages';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';
import injectReducer from 'utils/injectReducer';
import { DATASTORE_UTILS } from 'datastore';
import { NODE_API_UTILS } from 'apis/components/Node/utils';
import tabsHelper from 'datastore/templateManagementStore/helpers/tabs';
import { TEMPLATE } from 'utils/modelConstants';
import { CONFIG } from './config';

export class Node extends Component {
  componentWillReceiveProps = nextProps => {
    const requests = {
      [GET_NODE]: { onSuccess: this.props.resaga.setValue },
      [GET_CHILDREN]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_NODE]: { onSuccess: this.updateNodeSuccess },
      [CREATE_CHILD]: { onSuccess: this.props.resaga.setValue },
      [CREATE_NEXT_NODE]: { onSuccess: this.props.resaga.setValue },
      [DELETE_CHILDREN]: { onSuccess: this.props.resaga.setValue },
      [SHARE_NODE]: {
        onSuccess: this.shareNodeSuccess,
        onError: SHOW_UNPROCESSABLE_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [CREATE_NODE]: { onSuccess: this.createNodeSuccess },
      [REMOVE_NODE]: { onSuccess: this.props.resaga.setValue },
      [BATCH_DELETE]: { onSuccess: this.props.resaga.setValue },
      [BATCH_DELETE_CHILDREN]: { onSuccess: this.props.resaga.setValue },
      [COPY]: { onSuccess: this.copySuccess },
      [MOVE]: { onSuccess: this.props.resaga.setValue },
      [CREATE_CLONE]: { onSuccess: this.cloneTemplateSuccess },
      [INSERT_BEFORE]: { onSuccess: this.props.resaga.setValue },
      [INSERT_AFTER]: { onSuccess: this.props.resaga.setValue },
      [INSERT_TEMP_BEFORE]: { onSuccess: this.props.resaga.setValue },
      [INSERT_TEMP_AFTER]: { onSuccess: this.props.resaga.setValue },
      [DELETE_TEMP_NODE]: { onSuccess: this.props.resaga.setValue },
      [CREATE_PHOTO]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_PHOTO]: { onSuccess: this.props.resaga.setValue },
      [REMOVE_PHOTO]: { onSuccess: this.props.resaga.setValue },
      [BATCH_MOVE]: { onSuccess: this.props.resaga.setValue },
      [GET_ATTACHMENT]: { onSuccess: this.props.resaga.setValue },
      [CREATE_NEXT_NODE]: { onSuccess: this.props.resaga.setValue },
      [CREATE_ATTACHMENT]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_ATTACHMENT]: { onSuccess: this.props.resaga.setValue },
      [REMOVE_ATTACHMENT]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_CHILD]: { onSuccess: this.props.resaga.setValue },
      [GET_TIMES]: {
        onSuccess: NODE_API_UTILS.upsertCalculatedTimes(this.props),
      },
      [MOVE_NODE_AFTER]: { onError: this.revertMove },
      [MOVE_NODE_BEFORE]: { onError: this.revertMove },
      [UNLINK_NEXT_NODE]: { onSuccess: this.props.resaga.setValue },
      [CREATE_LINK]: { onSuccess: this.props.resaga.setValue },
      [DELETE_LINK]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_LINK]: { onSuccess: this.props.resaga.setValue },
      [REMOVE_NODE_AND_LINKS]: { onSuccess: this.props.resaga.setValue },
      [GET_LINKS]: { onSuccess: this.props.resaga.setValue },
      [TRANSFER_NODE]: {
        onSuccess: this.props.resaga.setValue,
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [GET_TRANSFER_NODE]: { onSuccess: this.props.resaga.setValue },
      [PATCH_TRANSFER_NODE]: {
        onSuccess: this.props.resaga.setValue,
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [BATCH_CREATE_CLONE]: { onSuccess: this.props.resaga.setValue },
      [GET_NODES_VIA_FILTER]: { onSuccess: this.props.resaga.setValue },
    };

    this.props.resaga.analyse(
      nextProps,
      wrapRequestWithErrorHandler(requests, this.props.resaga),
    );
  };

  shouldComponentUpdate = () => false;

  createNodeSuccess = values => {
    this.props.resaga.setValue(values);

    const { node } = values;
    if (node.type === TEMPLATE) {
      // add owner abilities to newly created `id`
      this.addAbility(node.id);
    }
  };

  copySuccess = processedResult => {
    this.props.resaga.setValue({
      nodes: processedResult.nodes,
    });
    this.addAbility(processedResult.node.cloneId);
  };

  updateNodeSuccess = (nodes, { manuallySetValue }) => {
    if (manuallySetValue) {
      return DO_NOTHING;
    }

    return this.props.resaga.setValue(nodes);
  };

  revertMove = (error, { tabId, children, store = 'nodes' }) => {
    this.props.resaga.setValue({
      [store]: tabsHelper.updateChildren(tabId, children),
    });
  };

  shareNodeSuccess = ({ nodeShare, notification, nodeShareSubNode, raw }) => {
    this.props.resaga.setValue({
      shares: DATASTORE_UTILS.upsertObject(nodeShare),
      shareIds: upsertHelpers.array(
        DATASTORE_UTILS.getObjectIds(nodeShare, { number: false }),
        ARRAY_MODE.APPEND,
      ),
      notifications: DATASTORE_UTILS.upsertObject(notification),
      shareSubNodes: DATASTORE_UTILS.upsertObject(nodeShareSubNode),
      shareSubNodeIds: upsertHelpers.array(
        DATASTORE_UTILS.getObjectIds(nodeShareSubNode),
        ARRAY_MODE.APPEND,
      ),
      raw,
    });
  };

  cloneTemplateSuccess = ({ cloneId }) => this.addAbility(cloneId);

  addAbility = id => {
    const { tourOwnerAbilities } = this.props;

    if (!tourOwnerAbilities.length) {
      return null;
    }
    // add owner abilities to newly created `id`
    return this.props.resaga.setValue({
      tours: DATASTORE_UTILS.upsertArray(`${id}`, tourOwnerAbilities),
    });
  };

  render = () => null;
}

Node.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  tourOwnerAbilities: PropTypes.array,
};

Node.defaultProps = {
  tourOwnerAbilities: [],
};

export default compose(
  injectReducer({ key: NODE_API, reducer: reducer(NODE_API) }),
  resaga(CONFIG),
)(Node);
