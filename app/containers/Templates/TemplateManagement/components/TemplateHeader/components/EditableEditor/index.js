import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import stylesheet from './style';

export const EditableEditor = ({ classes, value, onChange, toolBarId }) => (
  <RichTextEditor
    editorClassName={classes.editModeEditor}
    onChange={onChange}
    initContent={value}
    toolBarId={toolBarId}
  />
);

EditableEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  toolBarId: PropTypes.string.isRequired,
};
EditableEditor.defaultProps = {};

export default withStyles(stylesheet, { name: 'EditableEditor' })(
  EditableEditor,
);
