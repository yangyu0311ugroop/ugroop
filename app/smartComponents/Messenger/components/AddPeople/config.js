import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { STREAM_CHAT_STORE_IMMER } from '../../../../appConstants';
import { PORTAL_HELPERS } from '../../../../containers/Portal/helpers';
import { USER_STORE_SELECTORS } from '../../../../datastore/userStore/selectors';
export const CONFIG = {
  value: {
    userNodeIds: ({ templateId }) => [
      STREAM_CHAT_STORE_IMMER,
      'tours',
      templateId,
      'userNodeIds',
    ],
    createdBy: ({ templateId }) =>
      NODE_STORE_SELECTORS.createdBy({ id: templateId }),
    loginUserId: COGNITO_STORE_SELECTOR.userId.value,
  },
};

export const CONFIG2 = {
  value: {
    userIds: INVITATION_STORE_SELECTORS.getUserNodeUserIds({
      idsProp: 'userNodeIds',
    }),
    userRoles: INVITATION_STORE_SELECTORS.getUserNodeUserRoles({
      idsProp: 'userNodeIds',
    }),
    userEmails: INVITATION_STORE_SELECTORS.getUserNodeUserRoles({
      idsProp: 'userNodeIds',
    }),
    loginUserPhoto: ({ createdBy }) =>
      USER_STORE_SELECTORS.photo({ id: createdBy }),
    loginUserName: ({ createdBy }) =>
      USER_STORE_SELECTORS.knownAs({ id: createdBy }),
    loginUseEmail: ({ createdBy }) =>
      USER_STORE_SELECTORS.email({ id: createdBy }),
  },
};

export const CONFIG3 = {
  value: {
    names: USER_STORE_SELECTORS.getAllNames({ idsProp: 'userIds' }),
    emails: USER_STORE_SELECTORS.getAllEmails({ idsProp: 'userIds' }),
    photos: USER_STORE_SELECTORS.getAllPhotos({ idsProp: 'userIds' }),
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
