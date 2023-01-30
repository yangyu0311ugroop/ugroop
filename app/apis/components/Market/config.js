import { MARKET_API, USE_TEMPLATE, GET_PUBLISHER_IDS } from 'apis/constants';
import { requests } from 'utils/request';
import { normalize } from 'normalizr';
import {
  ABILITY_DATA_STORE,
  FILE_DATA_STORE,
  ORGANISATION_DATA_STORE,
} from '../../../appConstants';
import { ORGANISATION_SCHEMA } from '../../../datastore/orgStore/schema';
import DATASTORE_UTILS from '../../../datastore/utils';

export const CONFIG = {
  name: MARKET_API,

  requests: {
    [USE_TEMPLATE]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${MARKET_API}/${id}/useTemplate`,
        data,
      ),
    [GET_PUBLISHER_IDS]: ({ query }) =>
      requests.fetchWithAuthorisation('get', `/${MARKET_API}/lists/${query}`),
  },
  processResult: {
    [GET_PUBLISHER_IDS]: data => {
      const { entities } = normalize(
        data,
        ORGANISATION_SCHEMA.organisationDatas,
      );
      return {
        organisations: DATASTORE_UTILS.upsertObject(entities.organisationData),
        files: DATASTORE_UTILS.upsertObject({
          ...entities.photo,
        }),
        photos: DATASTORE_UTILS.upsertObject({
          ...entities.photo,
        }),
      };
    },
  },
  value: {
    tourOwnerAbilities: [
      ABILITY_DATA_STORE,
      'definitions',
      'tour',
      'tour_owner',
    ],
  },
  setValue: {
    tours: [ABILITY_DATA_STORE, 'tours'],
    organisations: [ORGANISATION_DATA_STORE, 'organisations'],
    photos: [ORGANISATION_DATA_STORE, 'photos'],
    files: [FILE_DATA_STORE, 'files'],
  },
  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
