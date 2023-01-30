import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import EditableFolderForm from 'viewComponents/Card/components/FolderCard/components/Editable';
import withTemplateViewActions from 'smartComponents/Node/hoc/withTemplateViewActions';

export class EditableFolderCard extends React.PureComponent {
  render = () => {
    const { templateViewActions, content, id } = this.props;
    return (
      <EditableFolderForm
        initContent={content}
        currFolderId={id}
        id={id}
        onSubmit={templateViewActions.onUpdate}
        onCancel={templateViewActions.onEditCancel}
      />
    );
  };
}

EditableFolderCard.propTypes = {
  // hoc
  templateViewActions: PropTypes.object,

  // parent
  id: PropTypes.number,
  content: PropTypes.string,
};

export default compose(withTemplateViewActions)(EditableFolderCard);
