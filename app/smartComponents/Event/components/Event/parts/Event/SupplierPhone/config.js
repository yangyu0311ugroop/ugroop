import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { GEOCODE_STORE_SELECTORS } from 'datastore/geocodeStore/selectors';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  getOrganisationAddress,
  getOrganisationPlaceId,
  getOrganisationLocationId,
} from 'datastore/orgStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';

export const getEventDayId = ({ id: parentNodeId }) =>
  NODE_STORE_SELECTORS.parentParentNodeId({ parentNodeId });

export const PARENT_ID_CONFIG = {
  value: {
    dayId: RESAGA_HELPERS.subscribeIfNotGiven(getEventDayId, 'dayId'),
    orgId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.organisationId,
      'templateId',
    ),
  },
};
export const ORGANISATION_CONFIG = {
  value: {
    orgLocationId: RESAGA_HELPERS.mapToId(getOrganisationLocationId, 'orgId'),
  },
};

export const CONFIG = {
  value: {
    placeId: {
      keyPath: [
        RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.placeId, 'dayId'),
        RESAGA_HELPERS.mapToId(getOrganisationPlaceId, 'orgLocationId'),
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: ['location', 'placeId'],
        }),
      ],
      getter: (
        dayPlaceId,
        orgPlaceId,
        formPlaceId,
        { eventPlaceId, eventLocation },
      ) =>
        formPlaceId ||
        LOGIC_HELPERS.ifElse(eventLocation, eventPlaceId, null) ||
        dayPlaceId ||
        orgPlaceId,
    },
    location: {
      keyPath: [
        RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.location, 'dayId'),
        RESAGA_HELPERS.mapToId(getOrganisationAddress, 'orgLocationId'),
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: ['location', 'address'],
        }),
      ],
      getter: (dayLocation, orgLocation, formLocation, { eventLocation }) =>
        formLocation || eventLocation || dayLocation || orgLocation,
    },
  },
};

export const COUNTRY_CONFIG = {
  value: {
    countryCode: RESAGA_HELPERS.mapToId(
      GEOCODE_STORE_SELECTORS.countryCode,
      'placeId',
    ),
  },
};
