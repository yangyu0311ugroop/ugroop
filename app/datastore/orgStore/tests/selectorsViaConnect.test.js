import { ORGANISATION_DATA_STORE } from 'appConstants';
import { ORG_DATASTORE_RESELECTORS } from 'datastore/orgStore/selectorsViaConnect';
import { fromJS } from 'immutable';

describe('ORG_DATASTORE_RESELECTORS', () => {
  const orgStore = fromJS({
    [ORGANISATION_DATA_STORE]: {
      organisations: {},
    },
  }).setIn([ORGANISATION_DATA_STORE, 'organisations'], {
    1: { id: 1, photo: 'sample-photo-1' },
  });
  it('should return organisation photo', () => {
    const orgPhoto = ORG_DATASTORE_RESELECTORS.getOrganisationPhoto(
      orgStore,
      1,
    );

    expect(orgPhoto).toBe('sample-photo-1');
  });
});
