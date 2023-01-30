import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { get } from 'lodash';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TOUR_PARTICIPANT } from 'utils/modelConstants';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG_1 = {
  value: {
    interestedPersonIds: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.interestedPeople({ id }),
    participantIds: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.calculatedParticipants({ id }),
    orgId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.organisationId,
      'templateId',
    ),
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
};

export const CONFIG_2 = {
  value: {
    customData: {
      keyPath: ({ userId: id }) => [
        USER_STORE_SELECTORS.firstName({ id }),
        USER_STORE_SELECTORS.lastName({ id }),
        USER_STORE_SELECTORS.birthDate({ id }),
        USER_STORE_SELECTORS.email({ id }),
      ],
      getter: (firstName, lastName, dob, email) => ({
        firstName,
        lastName,
        dob,
        email,
      }),
    },
    personNodeIds: {
      getter: ({ role, interestedPersonIds, participantIds }) =>
        LOGIC_HELPERS.ifElse(
          role === TOUR_PARTICIPANT,
          participantIds,
          interestedPersonIds,
        ),
    },
    inviteeId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],
  },
};
export const CONFIG_3 = {
  value: {
    pendingNodeId: {
      keyPath: ({ personNodeIds: ids }) =>
        ids &&
        ids.map(id =>
          NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.email }),
        ),
      props: ({ personNodeIds: ids, customData }) => ({
        ids,
        customData,
      }),
      getter: (...values) => {
        const props = values.pop();
        const ids = get(props, 'ids', []);
        const currEamail = get(props, 'customData.email', '');

        const data = values
          .map((value, index) => [value, ids[index]])
          .filter(val => val[0] === currEamail);
        return get(data, '0.1', null);
      },
    },
  },
};

export const CONFIG_4 = {
  value: {
    status: ({ pendingNodeId: id }) => NODE_STORE_SELECTORS.status({ id }),
  },
  setValue: {
    nodes: NODE_STORE_SELECTORS.nodes,
    inviteeId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],
    inviteeToken: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeToken'],
    inviteeEmail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeEmail'],
  },
};
