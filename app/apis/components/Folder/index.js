import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import {
  FOLDER_API,
  GET_PARENT_OF_FOLDER,
  GET_FOLDER_CHILDREN_WITH_PAGINATION,
  DELETE_CHILDREN_FROM_FOLDER,
  GET_CHECKLISTS,
  BATCH_GET_FOLDER_TREE,
} from 'apis/constants';
import injectReducer from 'utils/injectReducer';

import { CONFIG } from './config';
import { MY_TEMPLATE_PAGE } from '../../../containers/Templates/Components/NodeExplorer/config';
import { MY_TEMPLATE_VIEWSTORE } from '../../../containers/Templates/Components/NodeExplorer/constants';

export class Folder extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [GET_PARENT_OF_FOLDER]: {
        onSuccess: this.props.resaga.setValue,
      },
      [GET_FOLDER_CHILDREN_WITH_PAGINATION]: {
        onSuccess: this.props.resaga.setValue,
      },
      [DELETE_CHILDREN_FROM_FOLDER]: {
        onSuccess: this.props.resaga.setValue,
      },
      [GET_CHECKLISTS]: { onSuccess: this.props.resaga.setValue },
      [BATCH_GET_FOLDER_TREE]: { onSuccess: this.props.resaga.setValue },
    });
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

Folder.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Folder.defaultProps = {};

const myTemplateReducer = injectReducer({
  key: MY_TEMPLATE_PAGE,
  reducer: reducer(MY_TEMPLATE_PAGE),
});

const myTemplateViewStore = injectReducer({
  key: MY_TEMPLATE_VIEWSTORE,
  reducer: reducer(MY_TEMPLATE_VIEWSTORE),
});

export default compose(
  injectReducer({
    key: FOLDER_API,
    reducer: reducer(FOLDER_API),
  }),
  myTemplateViewStore,
  myTemplateReducer,
  resaga(CONFIG),
)(Folder);
