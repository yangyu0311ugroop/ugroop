import React, { useEffect, useContext } from 'react';
import { useImmer } from 'use-immer';
import resaga from 'resaga';
import classNames from 'classnames';
import { Collapse } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { ChannelContext } from '@ugr00p/stream-chat-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GridContainer from '../../../../../components/GridContainer';
import GridItem from '../../../../../components/GridItem';
import Button from '../../../../../viewComponents/Button';
import { VARIANTS } from '../../../../../variantsConstants';
import Icon from '../../../../../ugcomponents/Icon';
import { H5, Span } from '../../../../../viewComponents/Typography';
import { makeStyles } from '../../../../../components/material-ui';
import { StyledSimpleRTE } from '../../../../../ugcomponents/Inputs/SimpleRTE';
import momentHelper from '../../../../../utils/helpers/moment';
import MemberLists from './memberLists';
import { CONFIG3 } from './config';
import { PORTAL_HELPERS } from '../../../../../containers/Portal/helpers';
import AddPeople from '../../AddPeople';
import {
  getChatStreamId,
  getUGroopUserId,
} from '../../../../../utils/stringAdditions';
import Popper from '../../../../../components/Popper';
import MenuItem from '../../../../../components/Popper/components/MenuItem';
import { makeSelectArchivedChannels } from '../../../../../datastore/streamChat/selectors';
import { selectCurrentUserAccount } from '../../../../../datastore/stormPathStore/selectors';
import RenderAvatar from './renderAvatar';
const styles = ({ colors }) => ({
  actionFrame: {
    padding: '18px 0 16px 0',
    background: 'white',
    margin: 0,
    borderRight: colors.borderColor,
    borderBottom: colors.borderColor,
  },
  aboutFrame: {
    padding: '8px 0 6px 16px',
    background: 'white',
    margin: 0,
    borderRight: colors.borderColor,
  },
  aboutContentFrame: {
    padding: '8px 16px 6px 16px',
    background: colors.white,
    borderRight: colors.borderColor,
    margin: 0,
  },
  aboutContentStyle: {
    background: colors.ghostWhite,
    padding: '0 8px 0 8px',
    margin: '0 0 4px 0',
  },
  bottomBorder: {
    borderBottom: colors.borderColor,
  },
  membersFrame: {
    padding: '8px 0 6px 16px',
    background: 'white',
    margin: 0,
    borderRight: colors.borderColor,
    borderBottom: colors.borderColor,
  },
  memberRowPadding: {
    padding: 4,
  },
  noPadding: {
    padding: 0,
  },
});

const useStyles = makeStyles(styles);

function ChannelDetailBody(props) {
  const { channel } = useContext(ChannelContext);
  const [collpase, setCollpase] = useImmer({
    about: true,
    member: false,
  });
  const [watchers, setWatchers] = useImmer({
    data: [],
  }); // array of watch ids

  const classes = useStyles();
  const createdBy = channel.data.created_by;

  useEffect(() => {
    async function getWatchers() {
      const result = await channel.query({
        watchers: {
          limit: 30,
          offset: 0,
        },
      });
      if (result.watchers && result.watchers.length > 0) {
        // eslint-disable-next-line no-unused-vars
        setWatchers(draft => {
          // eslint-disable-next-line no-param-reassign
          draft.data = result.watchers.map(o => o.id);
        });
      }
    }
    getWatchers();
  }, [channel.state.watcher_count]);

  const createdTime = () => {
    const date = momentHelper.getDateWithFormat(
      channel.data.created_at,
      'MMMM DD, YYYY',
    );
    return date;
  };

  /* eslint-disable no-param-reassign */
  const onClickChevron = key => () => {
    setCollpase(draft => {
      const oldState = draft[key];
      draft[key] = !oldState;
      Object.keys(draft).forEach(function(k) {
        if (k !== key) {
          draft[k] = false;
        }
      });
    });
  };

  const onEditDescription = () => {
    PORTAL_HELPERS.openEditChatChannel(
      {
        channelId: channel.cid,
        templateId: channel.data.templateId,
        channelName: channel.data.name,
        channelDescription: channel.data.description,
      },
      { resaga: props.resaga },
    );
  };

  const showChevronIcon = value => {
    if (value) {
      return 'lnr-chevron-down';
    }
    return 'lnr-chevron-right';
  };

  const existedMember = () => {
    const state = channel.state.members;

    return Object.keys(state).map(key => getUGroopUserId(key));
  };

  const leaveChannel = async () => {
    PORTAL_HELPERS.openLeaveChannelDialog(
      {
        channelId: channel.cid,
        templateId: channel.data.templateId,
        removeStreamUserId: getChatStreamId(
          props.currentUser.email,
          props.currentUser.id,
        ),
      },
      { resaga: props.resaga },
    );
  };

  const deleteChannel = async () => {
    PORTAL_HELPERS.openDeleteChannelDialog(
      {
        channelId: channel.cid,
        templateId: channel.data.templateId,
      },
      { resaga: props.resaga },
    );
  };

  const hideChannel = () => {
    PORTAL_HELPERS.openArchiveChannelDialog(
      {
        channelId: channel.cid,
        templateId: channel.data.templateId,
      },
      { resaga: props.resaga },
    );
  };

  // eslint-disable-next-line react/prop-types
  const renderMoreButton = ({ openMenu }) => (
    <Button
      variant={VARIANTS.INLINE}
      color="darkgray"
      tooltipProps={{
        title: 'More Options',
      }}
      weight="light"
      noMargin
      noPadding
      onClick={openMenu}
    >
      <Icon icon="lnr-ellipsis" paddingRight />
    </Button>
  );

  const hideChannelButton = closeMenu => (
    <GridItem>
      <MenuItem closeMenu={closeMenu} onClick={hideChannel}>
        Hide Chat Group
      </MenuItem>
    </GridItem>
  );

  const deleteChannelButton = closeMenu => {
    if (
      createdBy.id ===
      getChatStreamId(props.currentUser.email, props.currentUser.id)
    ) {
      return (
        <GridItem>
          <MenuItem closeMenu={closeMenu} onClick={deleteChannel}>
            Delete Chat Group
          </MenuItem>
        </GridItem>
      );
    }
    return null;
  };

  // eslint-disable-next-line react/prop-types
  const renderMoreMenu = ({ closeMenu }) => (
    <GridContainer direction="column" wrap="nowrap">
      {hideChannelButton(closeMenu)}
      {deleteChannelButton(closeMenu)}
    </GridContainer>
  );

  const showActionContent = () => (
    <GridItem xs={12} md={12}>
      <GridContainer
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.actionFrame}
        spacing={0}
      >
        <GridItem>
          <AddPeople
            colors="darkgray"
            text="Add"
            templateId={channel.data.templateId}
            channelId={channel.cid}
            members={existedMember()}
          />
        </GridItem>
        <GridItem>
          <Button
            variant={VARIANTS.INLINE}
            color="darkgray"
            tooltipProps={{
              title: 'Leave Chat Group',
            }}
            weight="light"
            noMargin
            noPadding
            onClick={leaveChannel}
          >
            <Icon icon="lnr-exit-left" paddingRight />
            <Span>Leave</Span>
          </Button>
        </GridItem>
        <GridItem>
          <Popper noPadding renderButton={renderMoreButton}>
            {renderMoreMenu}
          </Popper>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  const showAboutContent = () => (
    <>
      <GridItem xs={12} md={12}>
        <GridContainer
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classNames(
            classes.aboutFrame,
            collpase.about === false && classes.bottomBorder,
          )}
          spacing={0}
        >
          <GridItem>
            <H5 weight="black" dense>
              About
            </H5>
          </GridItem>
          <GridItem>
            <Button
              variant={VARIANTS.INLINE}
              size="xs"
              color="darkgray"
              weight="light"
              noMargin
              noPadding
              onClick={onClickChevron('about')}
            >
              <Icon
                size="small"
                icon={showChevronIcon(collpase.about)}
                paddingRight
              />
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} md={12}>
        <Collapse in={collpase.about} timeout="auto" unmountOnExit>
          <GridContainer
            direction="column"
            className={classNames(
              classes.aboutContentFrame,
              classes.bottomBorder,
            )}
            spacing={0}
          >
            <GridItem xs={12} md={12}>
              <GridContainer
                direction="column"
                spacing={0}
                className={classes.aboutContentStyle}
              >
                <GridItem>
                  <H5>Description</H5>
                </GridItem>
                <GridItem>
                  <StyledSimpleRTE
                    name="description"
                    value={channel.data.description}
                    placeholder="Describe what this chat group is so people can find it."
                    lines={2}
                    readOnly
                  />
                </GridItem>
                <GridItem>
                  <Button
                    variant={VARIANTS.INLINE}
                    size="xs"
                    weight="light"
                    noMargin
                    noPadding
                    onClick={onEditDescription}
                  >
                    Edit
                  </Button>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} md={12}>
              <GridContainer
                direction="column"
                spacing={0}
                className={classes.aboutContentStyle}
              >
                <GridItem>
                  <GridContainer>
                    <GridItem>
                      {RenderAvatar(createdBy.image, createdBy.name, false)}
                    </GridItem>
                    <GridItem>
                      <Span>Created {createdTime()}</Span>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </Collapse>
      </GridItem>
    </>
  );

  const showMembersContent = () => (
    <>
      <GridItem xs={12} md={12}>
        <GridContainer
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classNames(
            classes.membersFrame,
            collpase.member === false && classes.bottomBorder,
          )}
          spacing={0}
        >
          <GridItem>
            <H5 weight="black" dense>
              Members
            </H5>
          </GridItem>
          <GridItem>
            <Button
              variant={VARIANTS.INLINE}
              size="xs"
              color="darkgray"
              weight="light"
              noMargin
              noPadding
              onClick={onClickChevron('member')}
            >
              <Span>{channel.data.member_count}</Span>
              <Icon
                size="small"
                icon={showChevronIcon(collpase.member)}
                paddingLeft
                paddingRight
              />
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} md={12}>
        <Collapse in={collpase.member} timeout="auto" unmountOnExit>
          <GridContainer
            direction="column"
            className={classNames(classes.membersFrame, classes.bottomBorder)}
            spacing={0}
          >
            <GridItem xs={12} md={12}>
              <MemberLists
                templateId={channel.data.templateId}
                channelId={channel.data.cid}
                members={channel && channel.state.members}
                watchers={channel && watchers.data}
              />
            </GridItem>
            <GridItem xs={12} md={12}>
              <AddPeople
                size="extraSmall"
                text="Add People"
                templateId={channel.data.templateId}
                channelId={channel.cid}
                members={existedMember()}
                variant={VARIANTS.OUTLINE}
                noPadding={false}
              />
            </GridItem>
          </GridContainer>
        </Collapse>
      </GridItem>
    </>
  );
  return (
    <GridContainer spacing={0}>
      {showActionContent()}
      {showAboutContent()}
      {showMembersContent()}
    </GridContainer>
  );
}

ChannelDetailBody.propTypes = {
  // hoc props
  resaga: PropTypes.object,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  archivedChannels: makeSelectArchivedChannels,
  currentUser: selectCurrentUserAccount(),
});

export default compose(
  connect(mapStateToProps),
  resaga(CONFIG3),
)(React.memo(ChannelDetailBody));
