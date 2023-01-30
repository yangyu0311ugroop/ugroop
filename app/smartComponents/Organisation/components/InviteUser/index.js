import { DO_NOTHING } from 'appConstants';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogActions from 'components/Dialog/UGDialogAction';
import { Title, CloseButton } from 'ugcomponents/DialogForm/Complex';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FormattedMessage as M } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import InviteByEmail from './components/InviteByEmail';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';

export class InviteUser extends PureComponent {
  componentWillMount = () => {
    const { classes } = this.props;

    this.dialogClasses = { paper: classes.paper };
  };

  handleClose = () => {
    const { onClose } = this.props;

    if (onClose) return onClose();

    return DO_NOTHING;
  };

  renderTitle = () => (
    <React.Fragment>
      <Title
        heading={
          <div>
            <M {...m.header} />
          </div>
        }
      />
      <CloseButton onClick={this.handleClose} />
    </React.Fragment>
  );

  renderActions = () => {
    const { id, disabled } = this.props;
    return (
      <GridContainer direction="column">
        <GridItem>
          <InviteByEmail id={id} disabled={disabled} />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { open } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        classes={this.dialogClasses}
        fullWidth
      >
        <DialogTitle>{this.renderTitle()}</DialogTitle>
        <DialogActions>{this.renderActions()}</DialogActions>
      </Dialog>
    );
  };
}

InviteUser.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // template id
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  onClose: PropTypes.func,
  // resaga props
};

InviteUser.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'InviteUser' }),
  resaga(CONFIG),
)(InviteUser);
