import { DO_NOTHING, TOUR_INVITATION_TYPE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { RECEIVED, SENT } from 'datastore/invitationStore/constants';
import { get } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import IconButton from 'ugcomponents/Buttons/IconButton/index';
import Icon from 'ugcomponents/Icon';
import { LoadingText } from 'ugcomponents/Progress';
import DaySeparator from './components/DaySeparator';
import Received from './components/Received';
import Sent from './components/Sent';
import Time from './components/Time';
import { CONFIG } from './config';
import styles from './styles';

export class Content extends PureComponent {
  state = {
    mouseOver: '',
  };

  handleMouseOver = mouseOver => () => this.setState({ mouseOver });

  handleMouseOut = () => () => {
    const { seeDetail } = this.props;

    if (seeDetail) {
      return DO_NOTHING;
    }

    return this.setState({ mouseOver: '' });
  };

  seeDetail = token => () => {
    this.props.resaga.setValue({ seeDetail: token });
  };

  isMouseOver = token => {
    const { mouseOver } = this.state;

    return mouseOver === token;
  };

  isTransfer = () => this.props.type === TOUR_INVITATION_TYPE.TRANSFER;

  wrapperClassName = ({ token, isLast }) => {
    const { classes } = this.props;

    const isMouseOver = this.isMouseOver(token);

    return classnames(
      this.isTransfer() && classes.transferBackground,
      classes.invitationItem,
      isMouseOver && classes.invitationItemHover,
      !isLast && classes.invitationSeparator,
      !isLast && classes.invitationNotLastItem,
      isLast && classes.invitationLastItem,
    );
  };

  renderActionButtons = token => {
    const { classes } = this.props;

    const isMouseOver = this.isMouseOver(token);

    if (!isMouseOver) {
      return null;
    }

    return (
      <div className={classes.actionButtons}>
        <IconButton
          onClick={this.seeDetail(token)}
          tooltip="Detail"
          className={classes.iconButton}
          enterDelay={1000}
        >
          <Icon icon="lnr-ellipsis" />
        </IconButton>
      </div>
    );
  };

  renderInvitationWrapper = ({
    token,
    previousToken,
    isFirst,
    isLast,
    render,
  }) => {
    const { classes, viewStore, type } = this.props;
    return (
      <div key={token}>
        <DaySeparator
          viewStore={viewStore}
          token={token}
          previousToken={previousToken}
          first={isFirst}
          type={type}
        />
        <GridContainer
          className={this.wrapperClassName({ token, isLast })}
          onMouseEnter={this.handleMouseOver(token)}
          onMouseLeave={this.handleMouseOut(token)}
        >
          <GridItem>
            <Time token={token} type={type} />
          </GridItem>
          <GridItem className={classes.grow}>{render}</GridItem>
        </GridContainer>
      </div>
    );
  };

  renderEmpty = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.empty}>Nothing to see yet</div>
      </div>
    );
  };

  renderInvitation = (data, Component) => (token, index) => {
    const { type, userId, orgUserIds } = this.props;
    let previousToken = '';

    if (index) {
      previousToken = get(data, index - 1);
    }

    return this.renderInvitationWrapper({
      token,
      previousToken,
      isFirst: index === 0,
      isLast: index === data.length - 1,
      render: (
        <Component
          token={token}
          type={type}
          userId={userId}
          orgUserIds={orgUserIds}
        />
      ),
    });
  };

  renderContent = (array, Component) => {
    const { children } = this.props;

    if (!array.length) {
      if (typeof children === 'function') {
        return children({ array });
      }

      return this.renderEmpty();
    }

    const content = array.map(this.renderInvitation(array, Component));

    if (typeof children === 'function') {
      return children({ array, content });
    }

    return content;
  };

  render = () => {
    const {
      show,
      showCompleted,
      fetching,
      received,
      sent,
      completedFromMe,
      completedToMe,
    } = this.props;

    if (fetching) {
      return <LoadingText />;
    }

    switch (show) {
      case RECEIVED:
        return this.renderContent(
          showCompleted ? completedToMe : received,
          Received,
        );

      case SENT:
        return this.renderContent(showCompleted ? completedFromMe : sent, Sent);

      default:
        return null;
    }
  };
}

Content.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  type: PropTypes.string,
  viewStore: PropTypes.string.isRequired,
  show: PropTypes.string,
  children: PropTypes.func,

  sent: PropTypes.array,
  received: PropTypes.array,
  completedFromMe: PropTypes.array,
  completedToMe: PropTypes.array,
  userId: PropTypes.number,

  // resaga props
  seeDetail: PropTypes.string,
  fetching: PropTypes.bool,
  showCompleted: PropTypes.bool,
  orgUserIds: PropTypes.array,
};

Content.defaultProps = {
  show: RECEIVED,

  sent: [],
  received: [],
  completedFromMe: [],
  completedToMe: [],

  seeDetail: '',
  type: TOUR_INVITATION_TYPE.SHARE,
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(Content);
