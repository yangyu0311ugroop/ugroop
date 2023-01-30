import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import styles from './styles';

export class EditableActions extends React.PureComponent {
  render = () => {
    const { classes, children } = this.props;
    return <div className={classes.root}>{children}</div>;
  };
}

EditableActions.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
};

EditableActions.defaultProps = {
  children: null,
};

export default withStyles(styles, {
  name: 'viewComponents/Editable/Actions',
})(EditableActions);
