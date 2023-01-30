import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  LoadingChannels,
  ChatDown,
  ChatContext,
} from '@ugr00p/stream-chat-react';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { isMobile, isIOS, isSafari } from 'react-device-detect';
import classNames from 'classnames';
import { compose } from 'redux';
import resaga from 'resaga';
import { makeStyles } from '../../../../components/material-ui';
import Badge, { BadgeColor } from '../../../../viewComponents/Badge';
import { VARIANTS } from '../../../../variantsConstants';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { Span } from '../../../../viewComponents/Typography';
import Button from '../../../../viewComponents/Button';
import Icon from '../../../../ugcomponents/Icon';
import { useMessengerContext } from '../../../../containers/StreamChat/messageStateContext';
import { CONFIG } from '../../../../containers/Templates/TemplateManagement/components/Messager/config';
/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @example ./examples/ChannelList.md
 */

const useStyles = (dimension, ismobile) =>
  makeStyles(({ colors }) => ({
    teamChannelList: {
      display: 'flex',
      height: '100%',
    },
    headFrame: {
      height: '63px',
      background: colors.lightGray,
      color: colors.darkgray,
      padding: '4px 0px',
      margin: 0,
      width: '100%',
      borderBottom: colors.borderColor,
      borderTop: colors.borderColor,
      boxShadow: 'none',
    },
    sideBar: {
      border: colors.borderColor,
      background: colors.lightGray,
      minWidth: ismobile ? dimension.width : 280,
    },
    sideContent: {
      overflowX: 'hidden',
      overflowY: 'auto',
      height: dimension.height - 112,
    },
    noPadding: {
      padding: 0,
    },
    addChannel: {
      marginTop: 10,
      marginRight: 10,
    },
    channelText: {
      minWidth: isIOS || isSafari ? 215 : null,
    },
  }));

function UGChannelListTeam(props) {
  const [state] = useMessengerContext();
  const { client } = useContext(ChatContext);
  const classes = useStyles(state.tourChannelPageDimension, isMobile)();
  const addChannel = () => {
    PORTAL_HELPERS.openCreateChatChannel(
      { templateId: props.templateId },
      { resaga: props.resaga },
    );
  };

  const { LoadingErrorIndicator, LoadingIndicator } = props;
  const channelName = () => {
    if (isMobile) {
      return `Chat Groups (sorted by last post)`;
    }
    return 'Chat Groups';
  };
  if (props.error) {
    return (
      <LoadingErrorIndicator
        type="Connection Error"
        text="Please refresh your page and try again!"
      />
    );
  }
  if (props.loading) {
    return <LoadingIndicator />;
  }
  return (
    <div className={classes.teamChannelList}>
      <div
        className={classNames(
          'str-chat__channel-list-team__main',
          classes.sideBar,
        )}
      >
        <div
          className={classNames(
            'str-chat__channel-list-team__header',
            classes.headFrame,
          )}
        >
          <div className="str-chat__channel-list-team__header--middle">
            <GridContainer spacing={0} justify="space-between" noWrap>
              <GridItem>
                <GridContainer direction="column" spacing={0} noWrap>
                  <GridItem>
                    <GridContainer
                      justify="flex-start"
                      alignItems="center"
                      noWrap
                    >
                      <GridItem>
                        <Badge
                          color={BadgeColor(client.user.online)}
                          variant={VARIANTS.ROUND}
                          content=" "
                        />
                      </GridItem>
                      <GridItem>{client.user.name || client.user.id}</GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem>
                    <GridContainer
                      justify="flex-start"
                      alignItems="center"
                      noWrap
                    >
                      <GridItem>
                        <Button
                          variant={VARIANTS.INLINE}
                          size="xs"
                          color="darkgray"
                          weight="light"
                          noMargin
                          noPadding
                        >
                          <Icon
                            size="small"
                            icon="lnr-chevron-down"
                            paddingRight
                          />
                        </Button>
                      </GridItem>
                      <GridItem className={classes.channelText}>
                        <Span>{channelName()}</Span>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer spacing={0} noWrap>
                  <GridItem className={classes.addChannel}>
                    <Button
                      variant={VARIANTS.INLINE}
                      color="darkgray"
                      size="extraSmall"
                      tooltipProps={{
                        title: 'Add Chat Group',
                      }}
                      weight="light"
                      noMargin
                      onClick={addChannel}
                      data-testid="addChannelButton"
                    >
                      <Icon icon="lnr-plus" />
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <div className={classes.sideContent}>{props.children}</div>
      </div>
    </div>
  );
}

UGChannelListTeam.propTypes = {
  /** When true, loading indicator is shown - [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadingChannels.js) */
  loading: PropTypes.bool,
  /** When true, error indicator is shown - [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown.js) */
  error: PropTypes.bool,
  /**
   * Loading indicator UI Component. It will be displayed if `loading` prop is true.
   *
   * Defaults to and accepts same props as:
   * [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadingChannels.js)
   *
   */
  LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Error indicator UI Component. It will be displayed if `error` prop is true
   *
   * Defaults to and accepts same props as:
   * [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown.js)
   *
   */
  LoadingErrorIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  resaga: PropTypes.object,
  templateId: PropTypes.number,
};

UGChannelListTeam.defaultProps = {
  error: false,
  LoadingIndicator: LoadingChannels,
  LoadingErrorIndicator: ChatDown,
};

export default compose(resaga(CONFIG))(React.memo(UGChannelListTeam));
