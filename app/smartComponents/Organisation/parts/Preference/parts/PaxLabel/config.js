import {
  getOrganisationPaxLabel,
  getOrganisationPreferenceId,
} from 'datastore/orgStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_ID = {
  value: {
    id: RESAGA_HELPERS.subscribeIfNotGiven(
      RESAGA_HELPERS.mapToId(getOrganisationPreferenceId, 'orgId'),
      'id',
    ),
  },
  setValue: {},
};

export const CONFIG = {
  value: {
    label: RESAGA_HELPERS.subscribeIfNotGiven(getOrganisationPaxLabel, 'label'),
  },
  setValue: {},
};
