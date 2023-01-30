/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { H5 } from 'viewComponents/Typography';
import { EventHeading } from 'viewComponents/Event';

const renderTypeOptions = () =>
  Object.values(EVENT_CONSTANTS.EVENTS).map(({ type, name }) => ({
    value: type,
    children: <EventHeading Typography={H5}>{name}</EventHeading>,
  }));

export default {
  renderTypeOptions,
};
