import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import style from './style';

export class EditableMenuItemInput extends React.PureComponent {
  render = () => {
    const { classes, children } = this.props;
    return <div className={classes.root}>{children}</div>;
  };
}

EditableMenuItemInput.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
};

EditableMenuItemInput.defaultProps = {
  children: null,
};

export default withStyles(style, {
  name: 'viewComponents/Editable/MenuItemInput',
})(EditableMenuItemInput);
