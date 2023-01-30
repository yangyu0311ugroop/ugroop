import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { RECEIVED, SENT } from 'datastore/invitationStore/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
// import Icon from 'ugcomponents/Icon/index';
import Icon from 'viewComponents/Icon';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import { FormattedMessage as M } from 'react-intl';
import { InlineButton } from 'ugcomponents/Buttons/index';
import { USER_PREFERENCE } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { USER_API_HELPERS } from 'apis/components/User/helpers';
import { CloseButton } from 'ugcomponents/DialogForm/Complex';
import m from './messages';
import { CONFIG, USER_ID_CONFIG } from './config';
import styles from './styles';

export class Header extends PureComponent {
  show = show => () => this.props.resaga.setValue({ show });

  count = show => {
    const {
      showCompleted,
      sentCount,
      receivedCount,
      completedFromMeCount,
      completedToMeCount,
    } = this.props;

    switch (show) {
      case RECEIVED:
        return showCompleted ? completedToMeCount : receivedCount;

      case SENT:
        return showCompleted ? completedFromMeCount : sentCount;

      default:
        return 0;
    }
  };

  renderTitle = () => {
    const { showCompleted } = this.props;

    if (showCompleted) {
      return <M {...m.completedTitle} />;
    }

    return <M {...m.outstandingTitle} />;
  };

  renderHeaderButtons = () => {
    const { show } = this.props;

    return (
      <GridContainer direction="row" alignItems="center">
        <GridItem>
          <InlineButton bold={show === RECEIVED} onClick={this.show(RECEIVED)}>
            {this.count(RECEIVED)} Received
          </InlineButton>
        </GridItem>
        <GridItem>
          <InlineButton bold={show === SENT} onClick={this.show(SENT)}>
            {this.count(SENT)} Sent
          </InlineButton>
        </GridItem>
        <GridItem>{this.renderToggle()}</GridItem>
        <GridItem>{this.renderCloseButton()}</GridItem>
      </GridContainer>
    );
  };

  handleCloseClick = () => {
    this.props.onClose();
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

  renderToggle = () => {
    const { expanded, isLoading, userId } = this.props;
    return (
      <Button
        onClick={USER_API_HELPERS.updateUserPreference(
          this.props.resaga,
          USER_PREFERENCE.DASH_BOARD_INVITATION,
          (!expanded).toString(),
          userId,
        )}
        color="gray"
        size="small"
        icon={LOGIC_HELPERS.ifElse(
          expanded,
          'lnr-chevron-up',
          'lnr-chevron-down',
        )}
        iconButton
        variant={VARIANTS.BORDERLESS}
        tabIndex={-1}
        noMargin
        noPadding
        disabled={isLoading}
      />
    );
  };

  render = () => {
    const { classes } = this.props;

    return (
      <GridItem className={classes.header}>
        <div className={classes.padding}>
          <GridContainer direction="row" alignItems="center">
            <GridItem className={classes.iconGrid}>
              <Icon color="blue" icon="lnr-users-plus" />
            </GridItem>
            <GridItem className={classnames(classes.title, classes.grow)}>
              {this.renderTitle()}
            </GridItem>
            <GridItem>{this.renderHeaderButtons()}</GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  showCompleted: PropTypes.bool,
  show: PropTypes.string,
  sentCount: PropTypes.number,
  completedFromMeCount: PropTypes.number,
  receivedCount: PropTypes.number,
  completedToMeCount: PropTypes.number,
  userId: PropTypes.number,
  expanded: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
};

Header.defaultProps = {
  showCompleted: false,
  show: RECEIVED,
  sentCount: 0,
  completedFromMeCount: 0,
  receivedCount: 0,
  completedToMeCount: 0,
  expanded: false,
  isLoading: false,
  onClose: () => {},
};

export default compose(
  withStyles(styles, { name: 'Header' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(Header);
