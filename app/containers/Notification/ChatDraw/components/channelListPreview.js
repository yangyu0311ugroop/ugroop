import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { makeStyles } from '../../../../components/material-ui';
import GridItem from '../../../../components/GridItem';
import { Span } from '../../../../viewComponents/Typography';
import { isEmptyString } from '../../../../utils/stringAdditions';
import GridContainer from '../../../../components/GridContainer';
import TemplateLink from './templateLink';
import {
  setChannelDrawActiveChannel,
  setRecentChannelDrawStatus,
} from '../../../StreamChat/actions';
import { URL_HELPERS } from '../../../../appConstants';
import RenderAvatar from '../../../../smartComponents/Messenger/components/ChannelDetail/components/renderAvatar';
const styles = ({ colors }) => ({
  listItemStyle: {
    padding: '8px 8px 8px 16px',
    borderBottom: colors.borderColor,
  },
  active: {
    background: colors.listActiveColor,
    color: colors.listFontColor,
  },
  hoverOver: {
    background: colors.listMouseOverColor,
  },
});

const useStyles = makeStyles(styles);

export function ChannelListPreview(props) {
  const [mouseIn, setMouseIn] = useState(false);

  const classes = useStyles();
  const isActive = () => props.active;
  const isMouseIn = () => {
    if (mouseIn && !isActive()) {
      return true;
    }
    return false;
  };
  const shouldBold = () => {
    const unreadCount = props.unread;
    return unreadCount >= 1;
  };
  const textWeight = () => {
    if (shouldBold()) {
      return 'black';
    }
    return 'normal';
  };

  const handleMouseOver = () => {
    setMouseIn(true);
  };

  const handleMouseOut = () => {
    setMouseIn(false);
  };

  const latestMessageSenderAvatar = () => {
    const channel = props.channel;
    const latestMessage =
      channel.state.messages[channel.state.messages.length - 1];
    if (latestMessage) {
      return { image: latestMessage.user.image, name: latestMessage.user.name };
    }
    return null;
  };

  const onClickLink = id => e => {
    if (e) {
      e.preventDefault();
    }
    props.setChannelDrawActiveChannel({
      templateId: props.channel.data.templateId,
      channelId: props.channel.cid,
    });
    props.setActiveChannel(props.channel);
    const link = `${URL_HELPERS.tours(id)}?messenger=true`;
    props.history.push(link);
    props.setActiveDraw(false);
  };

  const renderTemplateLink = () => {
    if (props.channel.data.templateId) {
      return (
        <GridItem>
          <TemplateLink
            id={props.channel.data.templateId}
            onClickLink={onClickLink}
          />
        </GridItem>
      );
    }
    return <GridItem />;
  };

  const renderLatestMessage = () => {
    if (
      !isEmptyString(props.latestMessage) &&
      props.latestMessage !== 'Nothing yet...'
    ) {
      const { image, name } = latestMessageSenderAvatar();
      return (
        <GridItem>
          <GridContainer>
            <GridItem>{RenderAvatar(image, name, false)}</GridItem>
            <GridItem>
              <Span subtitle>{props.latestMessage}</Span>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }
    return <GridItem />;
  };

  return (
    <>
      <GridItem
        className={classNames(
          classes.listItemStyle,
          isActive() ? classes.active : null,
          isMouseIn() ? classes.hoverOver : null,
        )}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        clickable
        onClick={onClickLink(props.channel.data.templateId)}
        data-testid="channelListPreview"
      >
        <GridContainer direction="column">
          <GridItem>
            <Span weight={textWeight()}># {props.channel.data.name}</Span>
          </GridItem>
          {renderTemplateLink()}
          {renderLatestMessage()}
        </GridContainer>
      </GridItem>
    </>
  );
}

ChannelListPreview.propTypes = {
  setActiveChannel: PropTypes.func,
  channel: PropTypes.object,
  active: PropTypes.bool,
  unread: PropTypes.number,
  history: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  latestMessage: PropTypes.string,
  setChannelDrawActiveChannel: PropTypes.func,
  setActiveDraw: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    setChannelDrawActiveChannel: data =>
      dispatch(setChannelDrawActiveChannel(data)),
    setActiveDraw: data => dispatch(setRecentChannelDrawStatus(data)),
  };
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRouter,
)(React.memo(ChannelListPreview));
