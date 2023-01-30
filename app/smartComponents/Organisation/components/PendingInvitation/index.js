import { DO_NOTHING } from 'appConstants';
import { H1 } from 'viewComponents/Typography';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Invitee from 'smartComponents/Organisation/components/InviteUser/components/Invitee';
import { withStyles } from '@material-ui/core/styles';
import Dialog from 'components/Dialog';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import { InlineButton } from 'ugcomponents/Buttons';
import Icon from 'ugcomponents/Icon/index';
import Form from 'ugcomponents/Form';
import { CONFIG } from './config';
import styles from './styles';
import m from './messages';

export class PendingInvitaion extends PureComponent {
  componentWillMount = () => {
    const { classes } = this.props;

    this.dialogClasses = { paper: classes.paper };
  };

  handleClose = () => {
    const { onClose } = this.props;

    if (onClose) return onClose();

    return DO_NOTHING;
  };

  renderContent = () => {
    const { id, ids, classes } = this.props;

    if (!ids.length) {
      return this.renderEmpty();
    }

    return ids.map((token, index) => (
      <GridItem key={token} className={classes.pending}>
        <Invitee pending id={id} token={token} index={index} />
      </GridItem>
    ));
  };

  renderEmpty = () => (
    <GridItem>
      <GridContainer direction="row" spacing={0}>
        <GridItem>There is no pending invitations.</GridItem>
      </GridContainer>
    </GridItem>
  );

  renderHeading = () => <M {...m.header} />;

  renderFooter = () => <M {...m.footer} />;

  render = () => {
    const { classes, open } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        classes={this.dialogClasses}
        fullWidth
      >
        <Form>
          <div className={classes.closeButton}>
            <InlineButton color="default" onClick={this.handleClose}>
              <Icon icon="lnr-cross2" />
            </InlineButton>
          </div>
          <div className={classes.root}>
            <H1 className={classes.header} noMargin>
              {this.renderHeading()}
            </H1>
            <div className={classes.invitees}>
              <GridContainer
                className={classes.gridContent}
                direction="column"
                spacing={0}
              >
                {this.renderContent()}
              </GridContainer>
            </div>
            <div className={classes.footer}>
              <div className={classes.line} />
              <H1 className={classes.footerLabel} noMargin>
                {this.renderFooter()}
              </H1>
            </div>
          </div>
        </Form>
      </Dialog>
    );
  };
}
PendingInvitaion.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number.isRequired, // organisation id
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // resaga props
  ids: PropTypes.array,
};

PendingInvitaion.defaultProps = {
  ids: [],
  open: false,
};

export default compose(
  withStyles(styles, { name: 'PendingInvitaion' }),
  resaga(CONFIG),
)(PendingInvitaion);
