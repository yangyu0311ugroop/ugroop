/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EventIcon } from 'viewComponents/Event';
import { EVENT_HELPERS } from 'utils/helpers/events';

const makeIconOptions = (type, subtype) => {
  const icons = EVENT_HELPERS.getEventIcons(type, subtype);
  return icons.reduce((acc, i) => {
    if (i.hidden) return acc;
    return [
      ...acc,
      {
        value: i.type,
        children: (
          <GridContainer alignItems="center">
            <GridItem>
              <EventIcon
                type={type}
                subtype={subtype}
                iconOverride={i.type}
                size="base"
              />
            </GridItem>
            <GridItem>{i.name}</GridItem>
          </GridContainer>
        ),
      },
    ];
  }, []);
};

const iconOptions = (type, subtype) => {
  const icons = EVENT_HELPERS.getEventIcons(type, subtype);
  return icons.reduce((acc, i) => {
    if (i.hidden) return acc;
    return [
      ...acc,
      {
        ...i,
        value: i.type,
        children: i.name,
      },
    ];
  }, []);
};

export default {
  makeIconOptions,
  iconOptions,
};
