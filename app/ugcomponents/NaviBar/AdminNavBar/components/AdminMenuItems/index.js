/**
 *
 * UGAdminPopoverMenu
 *
 */

import { INVITATION_VIEW_STORE } from 'appConstants';
import React from 'react';
import propTypes from 'prop-types';
import InvitationCard from 'ugcomponents/Card/InvitationCard';
import NotificationViewCard from 'smartComponents/Card/NotificationViewCard';
import UGProfileMenuItems from './UGProfileMenuItems';

const UGAdminMenuItems = props => {
  if (props.type === 'profile') {
    return <UGProfileMenuItems {...props} />;
  }
  if (props.type === 'invite') {
    return <InvitationCard viewStore={INVITATION_VIEW_STORE} />;
  }
  if (props.type === 'notification') {
    return <NotificationViewCard {...props} />;
  }
  return <UGProfileMenuItems {...props} />;
};

UGAdminMenuItems.propTypes = {
  type: propTypes.string,
};

export default UGAdminMenuItems;
