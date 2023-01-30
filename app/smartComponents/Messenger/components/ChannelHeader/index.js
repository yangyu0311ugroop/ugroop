import React, { useEffect, useContext } from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import { ChannelContext } from '@ugr00p/stream-chat-react';
import { makeStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import { selectChannelDetailOpenStatus } from 'datastore/streamChat/selectors';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';
import GridItem from '../../../../components/GridItem';
import Button from '../../../../viewComponents/Button';
import { VARIANTS } from '../../../../variantsConstants';
import Icon from '../../../../ugcomponents/Icon';
import { setChannelOpen } from './actions';
import { H5, Span } from '../../../../viewComponents/Typography';
import { selectCurrentUserAccount } from '../../../../datastore/stormPathStore/selectors';
import { useMessengerContext } from '../../../../containers/StreamChat/messageStateContext';
const styles = ({ colors }) => ({
  frame: {
    height: '64px',
    background: 'white',
    color: colors.darkgray,
    borderTop: colors.borderColor,
    borderBottom: colors.borderColor,
    padding: '4px 16px',
    margin: 0,
    width: '100%',
  },
  noPadding: {
    padding: 0,
  },
  channelTitle: {
    whiteSpace: 'nowrap',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
});

const useStyles = makeStyles(styles);
const ChannelHeader = React.memo(props => {
  const [members, setMembers] = useImmer([]); // array of watch ids
  // eslint-disable-next-line camelcase
  const { channel, watcher_count } = useContext(ChannelContext);
  const [state, dispatchCtx] = useMessengerContext();
  useEffect(() => {
    async function getMembers() {
      const result = await channel.query({
        members: {
          limit: 30,
          offset: 0,
        },
      });
      if (result.members && result.members.length > 0) {
        setMembers(draft => {
          const ids = result.members.map(o => o.id);
          ids.forEach(id => {
            const index = draft.findIndex(o => o === id);
            if (index < 0) {
              draft.push(id);
            }
          });
        });
      }
      if (state.newMemberAdded) {
        dispatchCtx.setNewAddedMember(false);
      }
    }
    getMembers();
  }, [channel.state.watcher_count, state.newMemberAdded]);

  const onClickChannelDetailButton = () => {
    props.setChannelOpen(!props.open)();
  };

  const getMemberCount = () => {
    if (members.length === 0) {
      return channel.data.member_count;
    }
    return _.values(channel.state.members).length;
  };

  const classes = useStyles();
  return (
    <GridContainer
      className={classnames(classes.frame, classes.noWrap)}
      direction="row"
      justify="space-between"
      alignItems="center"
      noWrap
    >
      <GridItem xs={4} md={4}>
        <GridContainer
          direction="column"
          spacing={0}
          className={classes.channelTitle}
        >
          <GridItem className={classes.noPadding}>
            <H5 weight="black" noMargin dense>
              {channel.data.name}
            </H5>
          </GridItem>
          <GridItem className={classes.noPadding}>
            <GridContainer spacing={1} alignItems="center" noWrap>
              <GridItem>
                <Button
                  variant={VARIANTS.INLINE}
                  color="darkgray"
                  size="xs"
                  noMargin
                  noPadding
                  weight="light"
                  onClick={onClickChannelDetailButton}
                  data-testid="memberIcon"
                >
                  <Icon icon="lnr-user" size="xsmall" paddingRight />
                  <Span data-testid="memberCount">{getMemberCount()}</Span>
                </Button>
              </GridItem>
              <GridItem>
                <Span>|</Span>
              </GridItem>
              <GridItem>
                {/* eslint-disable-next-line camelcase */}
                <Span>{watcher_count} online</Span>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={0} md={6} />
      <GridItem>
        <Button
          variant={VARIANTS.INLINE}
          color="darkgray"
          size="extraSmall"
          tooltipProps={{
            title: 'Chat Group details',
          }}
          weight="light"
          noMargin
          onClick={onClickChannelDetailButton}
        >
          <Icon icon="lnr-notification-circle" />
        </Button>
      </GridItem>
    </GridContainer>
  );
});

ChannelHeader.propTypes = {
  // hoc props
  setChannelOpen: PropTypes.func,
  open: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    setChannelOpen: value => () => dispatch(setChannelOpen(value)),
  };
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUserAccount(),
  open: selectChannelDetailOpenStatus,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ChannelHeader);
