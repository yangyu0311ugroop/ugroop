import { Slide } from '@material-ui/core';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import JDialog from 'ugcomponents/JDialog';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class PopperDialog extends PureComponent {
  handleCloseDialog = () => PORTAL_HELPERS.close(this.props);

  render = () => {
    const { classes, renderPopper } = this.props;

    return (
      <JDialog
        open
        popper
        fullWidth
        fullScreen={false}
        onClose={this.handleCloseDialog}
        overrideClasses={{
          scrollPaper: classes.scrollPaper,
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
        hideSubmitButton
      >
        {LOGIC_HELPERS.ifFunction(
          renderPopper,
          [{ closeMenu: this.handleCloseDialog }],
          renderPopper,
        )}
      </JDialog>
    );
  };
}

PopperDialog.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  renderPopper: PropTypes.func,
};

PopperDialog.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'PopperDialog' }),
  resaga(CONFIG),
)(PopperDialog);
