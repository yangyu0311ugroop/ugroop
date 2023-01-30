/**
 * Created by stephenkarpinskyj on 16/3/18.
 */
import { EVENT_STORE } from 'appConstants';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';

export const FIRST_CONFIG = {
  value: {
    event: ({ dataId: id }) => EVENT_STORE_DATA_SELECTORS.event({ id }),
    trail: NODE_STORE_SELECTORS.trail,
    iconOverride: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.iconOverride,
      }),
  },
};

export const SECOND_CONFIG = {
  value: {
    templateId: {
      getter: ({ trail }) =>
        Array.isArray(trail) ? trail[trail.length - 1] : 0,
    },
  },
};

export const THIRD_CONFIG = {
  value: {
    links: {
      keyPath: ({ eventAttachments = [] }) =>
        eventAttachments.map(id => [EVENT_STORE, 'attachments', id, 'link']),
      cacheKey: ({ eventAttachments }) =>
        `Event.Button.TooltipIconButton.TooltipContent.attachment${
          eventAttachments ? eventAttachments.toString() : null
        }.link`,
      prop: ({ eventAttachments }) => eventAttachments,
      getter: (...links) => links.filter(link => !!link),
    },
    names: {
      keyPath: ({ eventAttachments = [] }) =>
        eventAttachments.map(id => [EVENT_STORE, 'attachments', id, 'name']),
      cacheKey: ({ eventAttachments }) =>
        `Event.Button.TooltipIconButton.TooltipContent.attachment${
          eventAttachments ? eventAttachments.toString() : null
        }.name`,
      prop: ({ eventAttachments }) => eventAttachments,
      getter: (...names) => names.filter(name => !!name),
    },
  },
};
