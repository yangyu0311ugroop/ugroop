import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GridContainer from '../../../../../components/GridContainer';
import GridItem from '../../../../../components/GridItem';
import UserOnlineStatus from './userOnlineStatus';
import { makeStyles } from '../../../../../components/material-ui';
import { getChatStreamId } from '../../../../../utils/stringAdditions';
import { selectCurrentUserAccount } from '../../../../../datastore/stormPathStore/selectors';
import { mapDispatchToProps } from '../../ChannelHeader';
import RenderAvatar from './renderAvatar';

const styles = () => ({
  memberRowPadding: {
    padding: 8,
  },
  noPadding: {
    padding: 0,
  },
});

const useStyles = makeStyles(styles);

function MemberLists(props) {
  const classes = useStyles();
  const userOnlineStatus = member => {
    if (
      member.id ===
      getChatStreamId(props.currentUser.email, props.currentUser.id)
    ) {
      return true;
    }
    return props.watchers && props.watchers.includes(member.id)
      ? member.online
      : false;
  };

  const m = [];
  Object.keys(props.members).forEach(function(k) {
    m.push(props.members[k].user);
  });
  m.sort((a, b) => {
    const nameA = a.name || '';
    const nameB = b.name || '';
    const aOnline = userOnlineStatus(a).toString();
    const bOnline = userOnlineStatus(b).toString();
    return (
      aOnline.toString().localeCompare(bOnline) * -1 ||
      nameA.localeCompare(nameB)
    );
  });
  return (
    <GridContainer direction="column" spacing={0}>
      {m.map(u => (
        <GridItem className={classes.memberRowPadding} key={u.id}>
          <GridContainer>
            <GridItem>{RenderAvatar(u.image, u.name)}</GridItem>
            <GridItem>
              <UserOnlineStatus
                online={userOnlineStatus(u)}
                templateId={props.templateId}
                userId={u.id}
                channelId={props.channelId}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      ))}
    </GridContainer>
  );
}

MemberLists.propTypes = {
  // hoc props
  members: PropTypes.object,
  watchers: PropTypes.array,
  templateId: PropTypes.number,
  channelId: PropTypes.string,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUserAccount(),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(React.memo(MemberLists));
