import {
  GET_INVITATIONS,
  USER_API,
  GET_TRANSFER_NODE_LIST,
} from 'apis/constants';
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
import { DO_NOTHING_FUNC, TOUR_INVITATION_TYPE } from 'appConstants';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import { CONFIG, USER_ID_CONFIG } from './config';
import styles from './styles';

export class TourInvitationCard extends PureComponent {
  state = {
    array: [],
    loading: false,
  };

  componentDidMount = () => {
    const { showCompleted } = this.props;

    this.fetchData(showCompleted);
  };

  componentWillReceiveProps = nextProps => {
    const { showCompleted } = this.props;

    if (showCompleted !== nextProps.showCompleted) {
      this.fetchData(nextProps.showCompleted);
    }
  };

  isTransfer = type => type === TOUR_INVITATION_TYPE.TRANSFER;

  onFetchSuccess = () => this.setState({ loading: false });

  onFetchError = () => this.setState({ loading: false });

  fetchData = showCompleted => {
    const { type, userId } = this.props;
    const action = LOGIC_HELPERS.ifElse(
      this.isTransfer(type),
      GET_TRANSFER_NODE_LIST,
      GET_INVITATIONS,
    );
    this.setState({ loading: true });
    this.props.resaga.dispatchTo(USER_API, action, {
      payload: {
        status: showCompleted ? COMPLETED : PENDING,
        myUserId: userId,
      },
      onSuccess: this.onFetchSuccess,
      onError: this.onFetchError,
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
      type,
      userId,
    } = this.props;
    const { loading } = this.state;
    const { array } = this.state;
    if (loading) return null;

    if (typeof children === 'function') {
      const content = (
        <Content viewStore={viewStore} type={type} userId={userId}>
          {this.renderProp}
        </Content>
      );

      return children({ array, content });
    }

    return (
      <div
        className={classnames(
          classes.root,
          LOGIC_HELPERS.ifElse(fixWidth, classes.fixWidth),
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
            type={type}
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
                <Content
                  viewStore={viewStore}
                  disablePortal={disablePortal}
                  userId={userId}
                />
              </div>
            </GridItem>
            <Footer viewStore={viewStore} type={type} />
          </Collapse>
        </GridContainer>
      </div>
    );
  };
}

TourInvitationCard.propTypes = {
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
  type: PropTypes.string,

  // resaga props
  userId: PropTypes.number,
  showCompleted: PropTypes.bool,
  open: PropTypes.bool,
  updateUserPreference: PropTypes.bool,
  onClose: PropTypes.func,
};

TourInvitationCard.defaultProps = {
  userId: 0,
  fixHeight: false,
  showCompleted: false,
  open: true,
  paddingFooter: true,
  updateUserPreference: false,
  onClose: DO_NOTHING_FUNC,
  type: TOUR_INVITATION_TYPE.SHARE,
};

export default compose(
  withStyles(styles, { name: 'TourInvitationCard' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(TourInvitationCard);
