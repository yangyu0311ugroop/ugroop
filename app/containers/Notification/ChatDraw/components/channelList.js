import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  LoadingChannels,
  ChatDown,
  ChatContext,
} from '@ugr00p/stream-chat-react';
import classNames from 'classnames';
import { compose } from 'redux';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '../../../../components/material-ui';
import Badge, { BadgeColor } from '../../../../viewComponents/Badge';
import { VARIANTS } from '../../../../variantsConstants';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { Span } from '../../../../viewComponents/Typography';
import Button from '../../../../viewComponents/Button';
import Icon from '../../../../ugcomponents/Icon';
import { RESAGA_HELPERS } from '../../../../utils/helpers/resaga';
import { CONFIG } from './config';
import { useMessengerContext } from '../../../StreamChat/messageStateContext';
import { makeSelectChannelDraw } from '../../../../datastore/streamChat/selectors';
import { setRecentChannelDrawStatus } from '../../../StreamChat/actions';
/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @example ./examples/ChannelList.md
 */

const useStyles = props =>
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
      borderRight: colors.borderColor,
      minWidth: 323,
      background: 'none',
    },
    sideContent: {
      overflowX: 'hidden',
      overflowY: 'auto',
      // eslint-disable-next-line no-undef
      height:
        props.client &&
        Object.keys(props.client && props.client.activeChannels).length * 95 >
          1080
          ? 1080
          : 'unset',
    },
    noPadding: {
      padding: 0,
    },
    footerBar: {
      borderTop: colors.borderColor,
      padding: '16px 4px 16px 8px',
      background: colors.white,
    },
  }));
export function ChannelListDraw(props) {
  const { client } = useContext(ChatContext);
  const onClickKeepDrawOpen = () => {
    if (props.drawerKeepOpen) {
      props.resaga.setValue({
        drawerKeepOpen: false,
      });
    }
    if (props.chatDrawerKeepOpen) {
      props.setActiveDraw(false);
    }
    props.resaga.setValue({
      chatDrawerKeepOpen: RESAGA_HELPERS.toggleValue,
    });
  };

  const [, dispatch] = useMessengerContext();
  useEffect(() => {
    if (!props.isDrawActive) {
      let filterChannels = props.channels;
      if (props.match && props.match.path === '/tours/:id?') {
        const tourId = parseInt(props.match.params.id, 10);
        filterChannels =
          filterChannels &&
          filterChannels.filter(
            o => o.data.templateId !== tourId || o.data.templateId === null,
          );
      }
      if (filterChannels && filterChannels.length > 0) {
        filterChannels.map(c => {
          dispatch.addInToChannelQueue(c);
          return true;
        });
      }
    } else {
      let filterChannels = props.channels;
      if (props.match && props.match.path === '/tours/:id?') {
        const tourId = parseInt(props.match.params.id, 10);
        filterChannels =
          filterChannels &&
          filterChannels.filter(
            o => o.data.templateId !== tourId || o.data.templateId === null,
          );
      }
      if (filterChannels && filterChannels.length > 0) {
        filterChannels.forEach(c => {
          dispatch.removeFromWaitingListQueue(c.cid);
        });
      }
    }
  }, [props.isDrawActive, props.channels]);

  const classes = useStyles(props)();
  const { LoadingErrorIndicator, LoadingIndicator } = props;
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
            <GridContainer direction="column" spacing={0} noWrap>
              <GridItem>
                <GridContainer justify="flex-start" alignItems="center" noWrap>
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
                <GridContainer justify="flex-start" alignItems="center" noWrap>
                  <GridItem>
                    <Button
                      variant={VARIANTS.ICON}
                      size="xs"
                      color="darkgray"
                      weight="light"
                      noMargin
                      noPadding
                    >
                      <Icon size="small" icon="lnr-chevron-down" paddingRight />
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Span>All Chat Groups</Span>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <div className={classes.sideContent}>{props.children}</div>
        <div className={classes.footerBar}>
          <Button
            color="darkgray"
            variant={VARIANTS.INLINE}
            onClick={onClickKeepDrawOpen}
          >
            {!props.chatDrawerKeepOpen
              ? 'Always keep this menu open'
              : "Don't keep this menu open"}
          </Button>
        </div>
      </div>
    </div>
  );
}

ChannelListDraw.propTypes = {
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
  drawerKeepOpen: PropTypes.bool,
  chatDrawerKeepOpen: PropTypes.bool,
  isDrawActive: PropTypes.bool,
  channels: PropTypes.array,
  match: PropTypes.object,
  setActiveDraw: PropTypes.func,
};

ChannelListDraw.defaultProps = {
  error: false,
  LoadingIndicator: LoadingChannels,
  LoadingErrorIndicator: ChatDown,
};

const mapStateToProps = createStructuredSelector({
  isDrawActive: makeSelectChannelDraw(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setActiveDraw: data => dispatch(setRecentChannelDrawStatus(data)),
  };
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  resaga(CONFIG),
  withRouter,
)(React.memo(ChannelListDraw));
