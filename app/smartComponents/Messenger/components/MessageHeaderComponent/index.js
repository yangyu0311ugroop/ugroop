import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChannelContext } from '@ugr00p/stream-chat-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import resaga from 'resaga';
import { createStructuredSelector } from 'reselect';
import stripHtml from 'string-strip-html';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { H3, H4, Span } from '../../../../viewComponents/Typography';
import Button from '../../../../viewComponents/Button';
import { VARIANTS } from '../../../../variantsConstants';
import Icon from '../../../../ugcomponents/Icon';
import { selectCurrentUserAccount } from '../../../../datastore/stormPathStore/selectors';
import {
  getUGroopUserId,
  isEmptyString,
} from '../../../../utils/stringAdditions';
import { makeStyles } from '../../../../components/material-ui';
import momentHelper from '../../../../utils/helpers/moment';
import { CONFIG } from './config';
import { PORTAL_HELPERS } from '../../../../containers/Portal/helpers';
import AddPeople from '../AddPeople';
const styles = () => ({
  frame: {
    padding: '16px 32px',
  },
});

const useStyles = makeStyles(styles);
export function MessageHeaderComponent(props) {
  const classes = useStyles();
  const { channel } = useContext(ChannelContext);
  const createdTime = () => {
    const date = momentHelper.getDateWithFormat(
      channel.data.created_at,
      'MMMM DD, YYYY',
    );
    return date;
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

  const conditionalEditButton = () => {
    let buttonText = 'Add Description';
    if (!isEmptyString(channel.data.description)) {
      buttonText = 'Edit Description';
    }
    return (
      <Button
        variant={VARIANTS.INLINE}
        tooltipProps={{
          title: buttonText,
        }}
        weight="light"
        noMargin
        noPadding
        onClick={onEditDescription}
      >
        <Icon icon=" lnr-pencil" paddingRight />
        <Span>{buttonText}</Span>
      </Button>
    );
  };

  const channelCreator = () => {
    const { name, id } = channel.data.created_by || {};
    const currentUser = props.currentUser;
    if (
      getUGroopUserId(id).toString() ===
      (currentUser && currentUser.id.toString())
    ) {
      return 'You';
    }
    return `@${name}`;
  };
  const channelDescription = () => {
    if (isEmptyString(channel.data.description)) {
      return '';
    }
    return `Description: ${stripHtml(channel.data.description)}`;
  };

  const existedMember = () => {
    const state = channel.state.members;
    return Object.keys(state).map(key => getUGroopUserId(key));
  };
  if (props.loading || props.loadingMore) {
    return null;
  }
  return (
    <GridContainer className={classes.frame}>
      <GridItem xs={12} md={12}>
        <H3 weight="bolder" noMargin>
          # {channel.data.name}
        </H3>
      </GridItem>
      <GridItem>
        <H4>
          {channelCreator()} created this chat group on {createdTime()}. This is
          the very beginning of the {channel.data.name} chat group.{' '}
          {channelDescription()}
        </H4>
      </GridItem>
      <GridItem xs={12} md={12}>
        <GridContainer direction="row">
          <GridItem>
            <AddPeople
              templateId={channel.data.templateId}
              text="Add People"
              color="base"
              channelId={channel.cid}
              members={existedMember()}
            />
          </GridItem>
          <GridItem>{conditionalEditButton()}</GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUserAccount(),
});

MessageHeaderComponent.propTypes = {
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool,
  currentUser: PropTypes.object,
  resaga: PropTypes.object,
};

export default compose(
  resaga(CONFIG),
  connect(
    mapStateToProps,
    null,
  ),
)(React.memo(MessageHeaderComponent));
