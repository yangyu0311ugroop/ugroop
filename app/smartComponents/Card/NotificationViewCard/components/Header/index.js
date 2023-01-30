import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'viewComponents/Icon';
import { withStyles } from '@material-ui/core/styles';
import Button from 'viewComponents/Button';
import { compose } from 'redux';
import resaga from 'resaga';
import dotProp from 'dot-prop-immutable';
import { VARIANTS } from 'variantsConstants';
import {
  NOTIFICATION_API,
  UPDATE_UGROOP_NOTIFICATION_STATUS,
} from 'apis/constants';
import { CloseButton } from 'ugcomponents/DialogForm/Complex';
import { CONFIG } from './config';
import styles from './styles';

export class Header extends PureComponent {
  ugroopStatusFn = ugroop =>
    Object.keys(ugroop).reduce(
      (accu, id) => dotProp.set(accu, `${id}.status`, 'read'),
      ugroop,
    );

  markAllReadSuccess = () => {
    this.props.resaga.setValue({
      ugroopStatus: this.ugroopStatusFn,
    });
  };

  markAllReadAction = event => {
    const { userId, ugroopIds } = this.props;
    const ids = ugroopIds;
    const length = ids.length;
    if (ugroopIds.length > 0) {
      this.props.resaga.dispatchTo(
        NOTIFICATION_API,
        UPDATE_UGROOP_NOTIFICATION_STATUS,
        {
          payload: {
            id: userId,
            ugroopid: ids[0],
            data: {
              beforeId: ids[length - 1],
              status: 'read',
            },
          },
          onSuccess: this.markAllReadSuccess,
        },
      );
    }
    event.preventDefault();
  };

  renderMarkAllButton = () => {
    const { classes, ugroopIds } = this.props;
    if (ugroopIds.length > 0) {
      return (
        <Button
          className={classnames(classes.button)}
          size="extraSmall"
          variant={VARIANTS.OUTLINE}
          onClick={this.markAllReadAction}
        >
          Mark All as Read
        </Button>
      );
    }
    return null;
  };

  renderCloseButton = () => {
    const { classes } = this.props;
    return (
      <CloseButton
        onClick={this.handleCloseClick}
        className={classes.closeButton}
      >
        <Icon icon="lnr-cross2" size="xxs" />
      </CloseButton>
    );
  };

  handleCloseClick = () => {
    this.props.onClose();
  };

  render = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.header}>
        <div className={classes.padding}>
          <GridContainer direction="row" alignItems="center">
            <GridItem className={classes.iconGrid}>
              <Icon color="blue" icon="lnr-alarm" />
            </GridItem>
            <GridItem className={classnames(classes.title, classes.grow)}>
              Notifications
            </GridItem>
            <GridItem>{this.renderMarkAllButton()}</GridItem>
            <GridItem>{this.renderCloseButton()}</GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  resaga: PropTypes.object.isRequired,
  ugroopIds: PropTypes.array,
  onClose: PropTypes.func,
};
Header.defaultProps = {
  ugroopIds: [],
  onClose: () => {},
};

export default compose(
  withStyles(styles, { name: 'Header' }),
  resaga(CONFIG),
)(Header);
