import EditableForm from 'viewComponents/ListItem/components/EditableForm';
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import withTemplateViewActions from 'smartComponents/Node/hoc/withTemplateViewActions';

export class EditableFolderListItem extends React.PureComponent {
  render = () => {
    const { id, content, templateViewActions } = this.props;
    return (
      <EditableForm
        key={id}
        folderId={id}
        value={content}
        onClose={templateViewActions.onEditCancel}
        onSave={templateViewActions.onUpdate}
      />
    );
  };
}

EditableFolderListItem.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,

  // hoc
  templateViewActions: PropTypes.object,
};

export default compose(withTemplateViewActions)(EditableFolderListItem);
