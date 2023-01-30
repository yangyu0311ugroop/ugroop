import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';

export const CONFIG_1 = ({ orgId }) => ({
  value: {
    ids: ORGANISATION_STORE_SELECTORS.connectedMembers({
      id: [orgId],
    }),
  },
});
export const CONFIG_2 = ({ userId }) => ({
  value: {
    memberId: ORGANISATION_STORE_SELECTORS.getConnectedIdByUserId({
      user: userId,
    }),
  },
});

export const CONFIG_3 = ({ outputProp, keyProp }) => ({
  value: {
    [outputProp]: ORGANISATION_STORE_SELECTORS.connectedMembersProp({
      id: 'memberId',
      keyProp,
    }),
  },
});
