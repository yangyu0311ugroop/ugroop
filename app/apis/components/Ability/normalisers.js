import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import { DATASTORE_UTILS } from 'datastore';
import first from 'lodash/first';
import { normalize } from 'normalizr';
import { compose } from 'redux';
import { helpers } from 'smartComponents/Node/logics/SortBy/config';
import { TEMPLATE } from 'utils/modelConstants';

const normalisePersonalTours = ({ myTours, sharedTours }) => {
  const { entities: myToursEntities } = normalize(
    myTours.children,
    NODE_SCHEMA.node,
  );
  const { entities: sharedToursEntities } = normalize(
    sharedTours,
    NODE_SCHEMA.node,
  );
  const personalNodes = {
    ...myToursEntities.node,
    ...sharedToursEntities.node,
  };
  const personalPhotos = {
    ...myToursEntities.photo,
    ...sharedToursEntities.photo,
  };

  const virtual = Object.keys(personalNodes)
    .reduce((accu, nodeId) => {
      if (personalNodes[nodeId].type !== TEMPLATE) return accu;

      return [...accu, [personalNodes[nodeId].updatedAt, nodeId]];
    }, [])
    .sort(helpers.sortTime());

  const sortedId = virtual.map(value => Number.parseInt(value[1], 10));
  const lastUpdatedAt = first(virtual.map(value => value[0]));

  return {
    personalNodes,
    personalPhotos,
    personalTours: {
      [-1]: {
        children: sortedId,
        updatedAt: lastUpdatedAt,
      },
    },
    updatedAt: lastUpdatedAt,
  };
};

const normaliseOrganisation = ({ orgTours, orgId }) => {
  const { entities: toursEntities } = normalize(
    orgTours[orgId].children,
    NODE_SCHEMA.node,
  );

  const virtual = Object.keys(toursEntities.node)
    .reduce((acc, nodeId) => {
      if (toursEntities.node[nodeId].type !== TEMPLATE) return acc;

      return [...acc, [toursEntities.node[nodeId].updatedAt, nodeId]];
    }, [])
    .sort(helpers.sortTime());

  const sortedId = virtual.map(value => Number.parseInt(value[1], 10));
  const lastUpdatedAt = first(virtual.map(value => value[0]));

  return {
    orgNodes: toursEntities.node,
    orgTour: {
      [orgId]: {
        children: sortedId,
        updatedAt: lastUpdatedAt,
      },
    },
    updatedAt: lastUpdatedAt,
  };
};

const cleanupTemplates = nodes =>
  Object.keys(nodes).reduce((accu, id) => {
    if (nodes[id].type === TEMPLATE) {
      const node = nodes[id];

      if (Array.isArray(node.children) && node.children.length) {
        return { ...accu, [id]: node };
      }

      delete node.children;

      return { ...accu, [id]: node };
    }

    return accu;
  }, {});

const normaliseTourRole = (accu, { nodeId, role }) => {
  const roles = accu[nodeId] && accu[nodeId].tourRoles;

  // no role yet, set the array
  if (!roles || !Array.isArray(roles))
    return {
      ...accu,
      [nodeId]: {
        tourRoles: [role],
      },
    };

  // role already exist
  if (roles.indexOf(role) !== -1) {
    return accu;
  }

  return {
    ...accu,
    [nodeId]: {
      tourRoles: roles.concat(role),
    },
  };
};

const normaliseCreatedBy = nodeData => (accu, id) => {
  if (!nodeData[id]) return accu;

  const { createdBy } = nodeData[id];

  if (createdBy && accu.indexOf(createdBy) === -1) {
    return accu.concat(createdBy);
  }

  return accu;
};

const normaliseOrganisationId = nodeData => (accu, id) => {
  if (!nodeData[id] || !nodeData[id].customData) return accu;

  const {
    customData: { organisationId },
  } = nodeData[id];

  if (organisationId && accu.indexOf(organisationId) === -1) {
    return accu.concat(organisationId);
  }

  return accu;
};

const findMyTours = ({ myTours, orgTours, sharedTours, userNodes }) => {
  const orgs = Object.keys(orgTours).reduce(
    (accu, orgId) => {
      if (!orgTours[orgId].children || !orgTours[orgId].children.length)
        return {
          ...accu,
          sorts: [...accu.sorts, [0, orgId]],
        };

      const { orgNodes, orgTour, updatedAt } = normaliseOrganisation({
        orgTours,
        orgId,
      });

      return {
        nodes: { ...accu.nodes, ...orgNodes },
        orgNodes: { ...accu.orgNodes, ...orgTour },
        sorts: [...accu.sorts, [updatedAt, orgId]],
      };
    },
    { nodes: {}, orgNodes: {}, sorts: [] },
  );
  const myOrgTourIds = Object.keys(orgs.nodes);

  // remove tours from org you are member with
  const filteredShareTours = sharedTours.filter(
    ({ id = 0 }) => !myOrgTourIds.includes(id.toString()),
  );

  const {
    personalNodes,
    personalPhotos,
    personalTours,
    updatedAt: personalUpdatedAt,
  } = normalisePersonalTours({ myTours, sharedTours: filteredShareTours });

  const sortedOrganisationIds = [[personalUpdatedAt, -1], ...orgs.sorts]
    .sort(helpers.sortTime())
    .map(value => Number.parseInt(value[1], 10));

  const cleanupNodes = cleanupTemplates({
    ...orgs.nodes,
    ...personalNodes,
  });

  const tourRoles = userNodes.reduce(ABILITY_NORMALISERS.normaliseTourRole, {});

  const allNodes = compose(
    DATASTORE_UTILS.upsertObject(tourRoles),
    DATASTORE_UTILS.upsertObject(cleanupNodes),
  );

  const nodeData = allNodes({});
  const nodeIds = Object.keys(nodeData).map(value =>
    Number.parseInt(value, 10),
  );

  const userIds = Object.keys(nodeData).reduce(
    ABILITY_NORMALISERS.normaliseCreatedBy(nodeData),
    [],
  );

  const organisationIds = Object.keys(nodeData).reduce(
    ABILITY_NORMALISERS.normaliseOrganisationId(nodeData),
    [],
  );
  return {
    files: DATASTORE_UTILS.upsertObject({
      ...personalPhotos,
    }),
    node: compose(
      DATASTORE_UTILS.upsertObject(tourRoles),
      DATASTORE_UTILS.upsertObject(cleanupNodes),
    ),
    organisationTours: compose(
      DATASTORE_UTILS.upsertObject(personalTours),
      DATASTORE_UTILS.upsertObject(orgs.orgNodes),
    ),
    sortedOrganisationIds,
    require: { userIds, organisationIds, nodeIds },
  };
};

export const ABILITY_NORMALISERS = {
  normaliseCreatedBy,
  normaliseOrganisationId,
  normaliseTourRole,
  findMyTours,
  normalisePersonalTours,
  normaliseOrganisation,
  cleanupTemplates,
};
