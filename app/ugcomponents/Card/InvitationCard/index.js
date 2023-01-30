import { GET_INVITATIONS, USER_API } from 'apis/constants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { COMPLETED, PENDING } from 'datastore/invitationStore/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Collapse from '@material-ui/core/Collapse';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DO_NOTHING_FUNC } from 'appConstants';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import { CONFIG, USER_ID_CONFIG } from './config';
import styles from './styles';

export class InvitationCard extends PureComponent {
  state = {
    array: [],
  };

  componentDidMount = () => {
    const { showCompleted } = this.props;

    this.fetchInvitation(showCompleted);
  };

  componentWillReceiveProps = nextProps => {
    const { showCompleted } = this.props;

    if (showCompleted !== nextProps.showCompleted) {
      this.fetchInvitation(nextProps.showCompleted);
    }
  };

  fetchInvitation = showCompleted => {
    const { userId } = this.props;

    this.props.resaga.dispatchTo(USER_API, GET_INVITATIONS, {
      payload: {
        status: showCompleted ? COMPLETED : PENDING,
        myUserId: userId,
      },
    });
  };

  renderProp = ({ array, content }) => {
    const { classes } = this.props;

    this.setState({ array });

    if (!array.length) return null;

    return <GridItem className={classnames(classes.body)}>{content}</GridItem>;
  };

  render = () => {
    const {
      classes,
      fixHeight,
      fixWidth,
      viewStore,
      open,
      updateUserPreference,
      paddingFooter,
      children,
      disablePortal,
      onClose,
      smDown,
    } = this.props;
    const { array } = this.state;

    if (typeof children === 'function') {
      const content = (
        <Content viewStore={viewStore}>{this.renderProp}</Content>
      );

      return children({ array, content });
    }

    return (
      <div
        className={classnames(
          classes.root,
          LOGIC_HELPERS.ifElse(
            fixWidth,
            smDown ? classes.fixWidthSM : classes.fixWidth,
          ),
        )}
      >
        <GridContainer
          direction="column"
          className={classes.relative}
          spacing={0}
        >
          <Header
            onClose={onClose}
            viewStore={viewStore}
            isLoading={updateUserPreference}
          />
          <Collapse in={open} transitionduration="auto" unmountOnExit>
            <GridItem
              className={classnames(
                classes.body,
                fixHeight && classes.fixHeight,
              )}
            >
              <div
                className={classnames(paddingFooter && classes.paddingFooter)}
              >
                <Content viewStore={viewStore} disablePortal={disablePortal} />
              </div>
            </GridItem>
            <Footer viewStore={viewStore} />
          </Collapse>
        </GridContainer>
      </div>
    );
  };
}

InvitationCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  fixWidth: PropTypes.bool,
  fixHeight: PropTypes.bool,
  children: PropTypes.func,
  paddingFooter: PropTypes.bool,
  disablePortal: PropTypes.bool,
  viewStore: PropTypes.string.isRequired,

  // resaga props
  userId: PropTypes.number,
  showCompleted: PropTypes.bool,
  open: PropTypes.bool,
  updateUserPreference: PropTypes.bool,
  onClose: PropTypes.func,
  smDown: PropTypes.bool,
};

InvitationCard.defaultProps = {
  userId: 0,
  fixHeight: false,
  showCompleted: false,
  open: true,
  paddingFooter: true,
  updateUserPreference: false,
  onClose: DO_NOTHING_FUNC,
};

export default compose(
  withStyles(styles, { name: 'InvitationCard' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
  withSMDown,
)(InvitationCard);
