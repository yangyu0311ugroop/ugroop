import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import stylesheet from './style';

export const ReadOnlyEditor = ({ classes, value, toolBarId }) => (
  <RichTextEditor
    editorClassName={classes.readOnlyEditor}
    initContent={value}
    toolBarId={toolBarId}
    readOnly
  />
);

ReadOnlyEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  toolBarId: PropTypes.string.isRequired,
};
ReadOnlyEditor.defaultProps = {};

export default withStyles(stylesheet, { name: 'ReadOnlyEditor' })(
  ReadOnlyEditor,
);
