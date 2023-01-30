/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { H5 } from 'viewComponents/Typography';
import { EventHeading } from 'viewComponents/Event';

const makeSubtypeOptions = (type, filter = null) => {
  const subtypes = EVENT_HELPERS.getEventTypeConstants(type).getTypes();
  const options = Object.values(subtypes).map(({ type: subtype, name }) => ({
    value: subtype,
    children: <EventHeading Typography={H5}>{name}</EventHeading>,
  }));

  return filter ? options.filter(filter) : options;
};

export default {
  makeSubtypeOptions,
};
