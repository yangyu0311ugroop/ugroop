import {
  CONFIRMED,
  INVITATION_STORE,
  PENDING,
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { dropRight } from 'lodash';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_1 = {
  value: {
    people: {
      keyPath: ({ people }) =>
        people.map(id => USER_STORE_SELECTORS.email({ id })),
      getter: (...args) => dropRight(args, 1),
    },
    myEmail: [COGNITO_ACCOUNTSTORE, 'account', 'email'],
    owner: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.createdBy, 'templateId'),

    exist: {
      keyPath: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeEmail'],
      getter: invitee => !!invitee,
    },
    status: {
      keyPath: ({ inviteeToken }) => [
        INVITATION_STORE,
        'shares',
        inviteeToken,
        'status',
      ],
      getter: status => ({
        pending: status === PENDING,
        accepted: status === CONFIRMED,
      }),
      spreadObject: true,
    },
  },
};

export const CONFIG_2 = {
  value: {
    ownerEmail: ({ owner: id }) => USER_STORE_SELECTORS.email({ id }),
  },
};
