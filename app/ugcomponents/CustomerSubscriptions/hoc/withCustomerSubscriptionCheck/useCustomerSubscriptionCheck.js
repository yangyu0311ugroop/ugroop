import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { GET_INVOICE, INVOICE_API } from '../../../../apis/constants';
import { URL_HELPERS, DENY_ACCESS_REASON } from '../../../../appConstants';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { ORG_DATASTORE_RESELECTORS } from '../../../../datastore/orgStore/selectorsViaConnect';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
/* eslint-disable no-param-reassign */
function UseCustomerSubscriptionCheck(props) {
  const { isFeatured } = props;
  const history = useHistory();
  const [state, setState] = useImmer({
    pass: false,
  });
  const orgOwnerId = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(store, {
      id: props.orgId,
      attribute: 'createdBy',
    }),
  );

  const orgOwnerIdViaNode = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(store, {
      id: props.orgId,
      attribute: 'userId',
    }),
  );

  const userOrgId = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgUserAttribute)(store, {
      id: props.orgId,
      attribute: 'userId',
    }),
  );

  const role = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgUserAttribute)(store, {
      id: props.orgId,
      attribute: 'role',
    }),
  );
  const fetchCurrentInvoice = (customerId, subscriptionId) => {
    if (customerId && subscriptionId) {
      const query = {
        customer: customerId,
        subscription: subscriptionId,
      };
      props.resaga.dispatchTo(INVOICE_API, GET_INVOICE, {
        payload: {
          query: JSON.stringify(query),
        },
      });
    }
  };

  const handleRedirect = ({ id, from }) => {
    if (isFeatured) return;
    const oOwnerId = orgOwnerId == null ? orgOwnerIdViaNode : orgOwnerId;
    if (from === 'org') {
      // in future more logics go here.
      if (props.fromUrl === `/orgs/${props.orgId}/people`) {
        setState(draft => {
          draft.pass = true;
        });
      } // Skip Org People page)
      else if (oOwnerId && role && userOrgId) {
        let orgOwner = oOwnerId;
        if (!orgOwner && role === 'owner') {
          orgOwner = userOrgId;
        }
        if (orgOwner === props.userId) {
          if (isEmptyString(props.customerId)) {
            history.push({
              pathname: URL_HELPERS.orgSubscriptionSetup(id),
              state: { pathname: props.fromUrl },
            });
          } else {
            history.push({
              pathname: URL_HELPERS.orgSubscriptionSubscribe(id),
              state: { pathname: props.fromUrl },
            });
          }
        } else {
          history.push({
            pathname: URL_HELPERS.orgDenyAccess(id),
            state: {
              reason: DENY_ACCESS_REASON.NO_SUBSCRIPTION,
              fromPath: props.fromUrl,
            },
          });
        }
      } else {
        // this is the case, the tour only shared by a org through tour role, but it has no subscription plan
        history.push({
          pathname: URL_HELPERS.orgDenyAccess(id),
          state: {
            reason: DENY_ACCESS_REASON.NO_SUBSCRIPTION,
            fromPath: props.fromUrl,
          },
        });
      }
    } else if (from === 'user') {
      if (
        props.fromUrl === `/settings/billings` ||
        props.fromUrl.includes('/tours') ||
        props.fromUrl === URL_HELPERS.checklists()
      ) {
        if (
          !isEmptyString(props.customerId) &&
          props.nodeCreatedBy === props.userId
        ) {
          history.push({
            pathname: URL_HELPERS.subscriptionResubscribe(),
            state: { pathname: props.fromUrl },
          });
        } else if (props.nodeCreatedBy === props.userId) {
          history.push({
            pathname: URL_HELPERS.subscriptionSetup(),
            state: { pathname: props.fromUrl },
          });
        } else {
          history.push({
            pathname: URL_HELPERS.personalDenyAccess(),
            search: `?userId=${id}`,
            state: {
              reason: DENY_ACCESS_REASON.NO_SUBSCRIPTION,
              fromPath: props.fromUrl,
            },
          });
        }
      }
    }
  };

  const mayOrgBillingRedirect = orgId => {
    if (isFeatured) return;
    if (props.fromUrl === `/orgs/${props.orgId}/settings/billings`) {
      history.push({
        pathname: URL_HELPERS.orgDenyAccess(orgId),
        state: {
          reason: DENY_ACCESS_REASON.NO_ORG_BILLING_ACCESS,
          fromPath: props.fromUrl,
        },
      });
    } else {
      setState(draft => {
        draft.pass = true;
      });
    }
  };

  useEffect(() => {
    if (props.fetchCustomerSubscriptionSuccess) {
      if (props.customerId && isEmptyString(props.subscriptionId)) {
        fetchCurrentInvoice(props.customerId);
      } else if (props.customerId && !isEmptyString(props.subscriptionId)) {
        fetchCurrentInvoice(props.customerId, props.subscriptionId);
      }
      if (!isEmptyString(props.subscriptionId)) {
        if (!isEmptyString(props.orgId)) {
          const oOwnerId = orgOwnerId == null ? orgOwnerIdViaNode : orgOwnerId;
          if (oOwnerId === props.userId) {
            setState(draft => {
              draft.pass = true;
            });
          } else {
            mayOrgBillingRedirect(props.orgId);
          }
        } else {
          setState(draft => {
            draft.pass = true;
          });
        }
      } else if (!isEmptyString(props.orgId)) {
        // Orgs
        handleRedirect({ id: props.orgId, from: 'org' });
      } else {
        // Users
        handleRedirect({ id: props.userId, from: 'user' });
      }
    }
  }, [
    props.fetchCustomerSubscriptionSuccess,
    props.customerId,
    props.subscriptionId,
  ]);

  return state.pass;
}

UseCustomerSubscriptionCheck.propTypes = {
  fromUrl: PropTypes.string,
  orgId: PropTypes.number,
  customerId: PropTypes.string,
  userId: PropTypes.number,
  subscriptionId: PropTypes.string,
  resaga: PropTypes.object,
  fetchCustomerSubscriptionSuccess: PropTypes.bool,
  nodeCreatedBy: PropTypes.number,
};

export default UseCustomerSubscriptionCheck;
