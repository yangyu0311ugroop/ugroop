import { ABILITY_NORMALISERS } from 'apis/components/Ability/normalisers';
import { ABILITY_API, FIND_MY_ABILITIES, FIND_MY_TOURS } from 'apis/constants';
import {
  ABILITY_DATA_STORE,
  ORGANISATION_DATA_STORE,
  USER_DATA_STORE,
} from 'appConstants';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_SCHEMA } from 'datastore/orgStore/schema';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { DATASTORE_UTILS } from 'datastore';
import { first } from 'lodash';
import { normalize } from 'normalizr';
import { requests } from 'utils/request';
import { TOUR_ROLE } from './roles';

const reduce = (definitions, type, key, notSetRole) => (object, element) => ({
  ...object,
  [element[key]]: definitions[type][element.role || notSetRole],
});

export const utility = { reduce };

export const CONFIG = {
  name: ABILITY_API,

  requests: {
    [FIND_MY_ABILITIES]: () =>
      requests.fetchWithAuthorisation('get', `/${ABILITY_API}/me`),
    [FIND_MY_TOURS]: () =>
      requests.fetchWithAuthorisation('get', `/${ABILITY_API}/tours`),
  },

  value: {
    id: USER_STORE_SELECTORS.userId,
  },

  setValue: {
    fetched: [ABILITY_DATA_STORE, 'fetched'],
    definitions: [ABILITY_DATA_STORE, 'definitions'],
    tours: [ABILITY_DATA_STORE, 'tours'],
    organisation: [ABILITY_DATA_STORE, 'organisation'],
    organisations: [ORGANISATION_DATA_STORE, 'organisations'],
    orgUsers: [ORGANISATION_DATA_STORE, 'orgUsers'],
    organisationRoles: [ORGANISATION_DATA_STORE, 'organisations'],
    organisationNode: [ORGANISATION_DATA_STORE, 'organisationNode'],
    organisationTours: [ORGANISATION_DATA_STORE, 'organisationTours'],
    organisationId: [ORGANISATION_DATA_STORE, 'organisationId'],
    organisationIds: [ORGANISATION_DATA_STORE, 'organisationIds'],
    userId: [USER_DATA_STORE, 'userId'],
    files: FILE_STORE_SELECTORS.files,
    users: USER_STORE_SELECTORS.users,
    node: NODE_STORE_SELECTORS.nodes,
    userNode: [USER_DATA_STORE, 'userNode'],
    sortedOrganisationIds: USER_STORE_SELECTORS.organisations,
    preferences: [ORGANISATION_DATA_STORE, 'preferences'],
  },

  processResult: {
    [FIND_MY_ABILITIES]: ({
      id,
      definitions,
      organisation,
      ownedTours,
      sharedTours,
      organisationNode,
      organisationData,
    }) => {
      const ownAsOwnedTours = ownedTours.filter(tour => !tour.role); // Admins & Owner
      const ownedHasRoleTours = ownedTours.filter(tour => !!tour.role); // Other Role
      ownedTours.filter(tour => !tour.role);

      const ownToursAbility = ownAsOwnedTours.reduce(
        utility.reduce(definitions, 'tour', 'id', TOUR_ROLE.TOUR_OWNER),
        {},
      );

      const ownToursOrgAbility = ownedHasRoleTours.reduce(
        utility.reduce(definitions, 'organisation', 'id', ''),
        {},
      );

      const sharedToursAbility = sharedTours.reduce(
        utility.reduce(definitions, 'tour', 'nodeId', TOUR_ROLE.TOUR_OWNER),
        {},
      );

      const { entities, result: organisationIds } = normalize(
        organisationNode,
        ORGANISATION_SCHEMA.organisationNodes,
      );
      const { entities: dataEntities } = normalize(
        organisationData,
        ORGANISATION_SCHEMA.organisationDatas,
      );
      const { entities: rolesEntities } = normalize(
        organisation,
        ORGANISATION_SCHEMA.organisationRoles,
      );
      // hack: currently one user can only belong to one organisation => always the first one
      const organisationId = first(organisationIds);

      return {
        userId: id,
        definitions,
        tours: {
          ...ownToursOrgAbility,
          ...sharedToursAbility,
          ...ownToursAbility,
        }, // Prioritise ownership, shared, org members
        organisation: organisation.reduce(
          utility.reduce(definitions, 'organisation', 'orgId'),
          {},
        ),
        organisationNode: entities.organisationNode,
        organisationId,
        organisationIds,
        organisations: DATASTORE_UTILS.upsertObject(
          dataEntities.organisationData,
        ),
        orgUsers: DATASTORE_UTILS.upsertObject(rolesEntities.organisationRole),
        organisationRoles: DATASTORE_UTILS.upsertObject(
          rolesEntities.organisationRole,
        ),
        files: DATASTORE_UTILS.upsertObject({
          ...dataEntities.photo,
        }),
        users: DATASTORE_UTILS.upsertObject(id, {
          organisations: organisationIds,
        }),
        preferences: DATASTORE_UTILS.upsertObject({
          ...dataEntities.preference,
        }),
        fetched: Date.now(),
      };
    },
    [FIND_MY_TOURS]: ABILITY_NORMALISERS.findMyTours,
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
