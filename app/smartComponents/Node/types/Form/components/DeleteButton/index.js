import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { FORMS } from 'utils/modelConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import DeleteButton from 'viewComponents/DeleteButton';
import { CONFIG } from './config';

export class Form extends React.PureComponent {
  handleDeleteClick = ({ onLoad, onClose }) => {
    const { id: nodeId, parentNodeId: parent } = this.props;
    NODE_API_HELPERS.deleteNode(
      {
        nodeId,
        parent,
        childKey: FORMS,
        onSuccess: this.handleDeleteNodeSuccess({
          onLoad,
          onClose,
        }),
        onError: this.handleDeleteNodeError({ onLoad }),
      },
      this.props,
    );
  };

  handleDeleteNodeSuccess = ({ onLoad, onClose }) => () => {
    const { parentOnSuccess } = this.props;
    LOGIC_HELPERS.ifFunction(onLoad);
    LOGIC_HELPERS.ifFunction(onClose);
    LOGIC_HELPERS.ifFunction(parentOnSuccess);
  };

  handleDeleteNodeError = ({ onLoad }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
  };

  render = () => (
    <DeleteButton
      dialogTitle="Delete this Form or Attachment"
      headlineText="Are you sure you want to delete this Form or Attachment?"
      confirmButton="Delete Form or Attachment"
      onClick={this.handleDeleteClick}
      simple={this.props.simple}
    />
  );
}

Form.propTypes = {
  // parent
  id: PropTypes.number,
  parentOnSuccess: PropTypes.func,
  simple: PropTypes.bool,

  // resaga value
  parentNodeId: PropTypes.number,
};

Form.defaultProps = {
  id: null,

  parentNodeId: null,
};

export default resaga(CONFIG)(Form);
