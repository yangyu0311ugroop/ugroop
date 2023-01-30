import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import resaga from 'resaga';
import EditableFolder from 'containers/Templates/Components/EditableFolder/index';
import FolderCUD from 'datastore/folderExplorerStore/helpers/CUD/index';
import { CONFIG } from './config';

export class EditableFolderCard extends PureComponent {
  onSuccess = hook => () => {
    this.props.resaga.setValue({
      folderFormOpen: false,
    });
    hook();
  };

  onSubmit = cud => ({ form }) => {
    const opts = {
      onSuccess: this.onSuccess(form.onSuccess),
      onError: this.onCancel,
    };
    cud.onCreate(opts)({ form });
  };

  onCancel = () => {
    this.props.resaga.setValue({
      folderFormOpen: false,
    });
  };

  renderEditableFolder = () => cud => {
    const { currFolderId } = this.props;
    return (
      <EditableFolder
        currFolderId={currFolderId}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit(cud)}
      />
    );
  };

  render = () => {
    const { currFolderId } = this.props;
    return (
      <FolderCUD folderId={currFolderId}>
        {this.renderEditableFolder()}
      </FolderCUD>
    );
  };
}

EditableFolderCard.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  currFolderId: PropTypes.number,
};

EditableFolderCard.defaultProps = {
  currFolderId: 0,
};

export default resaga(CONFIG)(EditableFolderCard);
