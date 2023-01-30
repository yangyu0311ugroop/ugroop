import React from 'react';
import NotificationPage from 'containers/Notification';

export const DeclineNotificationWrapper = props => (
  <NotificationPage decline {...props} />
);

export default DeclineNotificationWrapper;
