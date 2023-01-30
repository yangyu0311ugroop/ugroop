import {
  INVITATION_STORE,
  ORGANISATION_VIEWSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
} from 'appConstants';
import {
  INVITATION_API,
  ORGANISATION_API,
  CANCEL_INVITATION,
  RESEND_INVITATION,
} from 'apis/constants';
import { get } from 'lodash';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const SEE_DETAIL_CONFIG = {
  value: {
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
  },
};

export const CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
    personalMessage: ({ seeDetail }) =>
      INVITATION_STORE_SELECTORS.content({ id: seeDetail }),
    detail: {
      keyPath: [
        [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
        [INVITATION_STORE, 'shares'],
        [INVITATION_STORE, 'organisationShares'],
        [ORGANISATION_VIEWSTORE, 'fromOrg'],
        [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
      ],
      getter: (seeDetail, shares, orgShares, isFromOrg, templateId) => {
        const {
          shareFrom,
          shareTo,
          shareToUserId,
          createdAt,
          updatedAt,
          role,
          status,
          inviteFrom,
          email,
          resendUserId,
        } = get(!isFromOrg ? shares : orgShares, `${seeDetail}`, {});
        return {
          seeDetail,
          shareFrom: isFromOrg ? inviteFrom : shareFrom,
          shareTo,
          shareToUserId,
          createdAt,
          updatedAt,
          role,
          status,
          email,
          resendUserId,
          templateId,
        };
      },
      spreadObject: true,
    },
    fromOrg: [ORGANISATION_VIEWSTORE, 'fromOrg'],

    organisationName: ({ seeDetail }) => [
      INVITATION_STORE,
      'notifications',
      seeDetail,
      'content',
      'organisationName',
    ],

    inviteToOrganisation: ({ seeDetail }) => [
      INVITATION_STORE,
      'notifications',
      seeDetail,
      'content',
      'inviteToOrganisation',
    ],
  },
  isLoading: {
    isLoading: {
      keyPath: [
        [INVITATION_API, RESEND_INVITATION],
        [INVITATION_API, CANCEL_INVITATION],
        [ORGANISATION_API, RESEND_INVITATION],
        [ORGANISATION_API, CANCEL_INVITATION],
      ],
      getter: (resendTour, cancelTour, resendOrg, cancelOrg) =>
        LOGIC_HELPERS.ifElse(
          [resendTour, cancelTour, resendOrg, cancelOrg],
          true,
          false,
          true,
        ),
    },
  },
  setValue: {
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
    fromOrg: [ORGANISATION_VIEWSTORE, 'fromOrg'],
    updatedAt: ({ seeDetail }) =>
      INVITATION_STORE_SELECTORS.updatedAt({ id: seeDetail }),
    resendUserId: ({ seeDetail }) =>
      INVITATION_STORE_SELECTORS.resendUserId({ id: seeDetail }),
  },
};
