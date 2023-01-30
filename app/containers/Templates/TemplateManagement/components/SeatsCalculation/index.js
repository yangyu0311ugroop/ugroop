import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect } from 'react';
import resaga from 'resaga';
import {
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
} from '../../../../../datastore/nodeStore/selectorsViaConnect';
import { useGlobalContext } from '../../../../App/globalStateContext';
import { makeSingleSelect } from '../../../../../datastore/selectUtility';
import { TEMPLATE_VIEWSTORE_RESELECTORS } from '../../../../../datastore/templateManagementStore/selectorsViaConnect';
import {
  TOUR_INTERESTED,
  TOUR_PARTICIPANT,
} from '../../../../../utils/modelConstants';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from '../../../../../appConstants';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from '../../../../../apis/components/Ability/roles';
import { SEAT_UTILITY } from '../../../../../ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck/SeatCalculationUtility';
/* eslint-disable no-param-reassign */

function SeatsCalculation(props) {
  const mforwardRef = props.mforwardRef;
  const [globalContext, globalDispatch] = useGlobalContext();

  const orgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: props.templateId,
      attribute: CustomDataOrgId,
    }),
  );
  const nodeShareSuccessData = useSelector(state => {
    const data = makeSingleSelect(
      TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey,
    )(state, {
      key: 'nodeShareSuccessData',
    });
    if (data) {
      return JSON.stringify(data);
    }
    return '';
  });

  const addRoleSuccessData = useSelector(state => {
    const data = makeSingleSelect(
      TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey,
    )(state, {
      key: 'addRoleSuccessData',
    });
    if (data) {
      return JSON.stringify(data);
    }
    return '';
  });

  const existingMembers =
    globalContext.BillingContext.org.orgMembers &&
    globalContext.BillingContext.org.orgMembers.map(o => o.userId);

  const existingMembersEmail =
    globalContext.BillingContext.org.orgMembers &&
    globalContext.BillingContext.org.orgMembers.map(o => o.email);

  const partOfOrg = data => {
    if (data.userId) {
      if (existingMembers && existingMembers.length > 0) {
        return existingMembers.includes(data.userId);
      }
    } else if (data.email) {
      if (existingMembersEmail && existingMembersEmail.length > 0) {
        return existingMembers.includes(data.email);
      }
    }
    return false;
  };

  if (mforwardRef) {
    mforwardRef.current = {
      getPeopleSuccess: rawResponse => {
        if (orgId) {
          const orgMembersEmails = globalContext.BillingContext.org.orgMembers.map(
            o => o.email,
          );
          const deactivatedEmails = globalContext.BillingContext.org.deactivatedMembers.map(
            o => o.email,
          );
          const {
            allConnectedPeople,
            contributorQuantity,
            finalShares,
          } = SEAT_UTILITY.calculateOrgSeats(
            orgMembersEmails,
            deactivatedEmails,
            rawResponse,
            globalContext.BillingContext.org.subscriptionPlan,
          );
          globalDispatch.setTourConnectedPeople(allConnectedPeople);
          globalDispatch.dispatch(draft => {
            draft.BillingContext.org.connectedContributor = contributorQuantity;
            draft.BillingContext.org.connectedPax = finalShares;
          });
        } else {
          const quantity = SEAT_UTILITY.calculatePersonSeats(
            rawResponse,
            globalContext.BillingContext.person.subscriptionPlan,
          );
          globalDispatch.dispatch(draft => {
            draft.BillingContext.person.connectedPeople = quantity;
          });
        }
      },
    };
  }

  useEffect(() => {
    if (addRoleSuccessData) {
      const json = JSON.parse(addRoleSuccessData);
      globalDispatch.dispatch(draft => {
        const connectedPeople = draft.BillingContext.tourConnectedPeople;
        connectedPeople.push({
          role: json.role,
          email: json.shareTo,
          userId: json.userId,
          id: json.id,
        });
      });
      if (orgId) {
        if (!partOfOrg(json)) {
          globalDispatch.dispatch(draft => {
            const num = draft.BillingContext.org.connectedContributor + 1;
            draft.BillingContext.org.connectedContributor = num;
          });
          const findPaxRole = globalContext.BillingContext.tourConnectedPeople.find(
            o => o.userId === json.userId && o.role === TOUR_PARTICIPANT,
          );
          if (findPaxRole) {
            globalDispatch.dispatch(draft => {
              const num = draft.BillingContext.org.connectedPax - 1;
              draft.BillingContext.org.connectedPax = num;
            });
          }
        }
      } else {
        // check if the user is part of the tour already.
        const findUser = globalContext.BillingContext.tourConnectedPeople.find(
          o => o.userId === json.userId,
        );
        if (!findUser) {
          globalDispatch.dispatch(draft => {
            const num = draft.BillingContext.person.connectedPeople + 1;
            draft.BillingContext.person.connectedPeople = num;
          });
        }
      }
      props.resaga.setValue({
        addRoleSuccess: null,
      });
    }
  }, [addRoleSuccessData, orgId]);

  useEffect(() => {
    if (nodeShareSuccessData) {
      const json = JSON.parse(nodeShareSuccessData);
      globalDispatch.dispatch(draft => {
        const connectedPeople = draft.BillingContext.tourConnectedPeople;
        connectedPeople.push({
          role: json.role,
          email: json.email,
          status: 'pending',
          token: json.token,
        });
      });
      if (json.role === TOUR_INTERESTED) return; // no consider follower at all
      if (orgId) {
        if (!partOfOrg(json)) {
          if (json.role !== TOUR_INTERESTED && json.role !== TOUR_PARTICIPANT) {
            globalDispatch.dispatch(draft => {
              const num = draft.BillingContext.org.connectedContributor + 1;
              draft.BillingContext.org.connectedContributor = num;
            });
            const findPaxRole = globalContext.BillingContext.tourConnectedPeople.find(
              o =>
                (o.userId === json.userId || o.email === json.email) &&
                o.role === TOUR_PARTICIPANT,
            );
            if (findPaxRole) {
              globalDispatch.dispatch(draft => {
                const num = draft.BillingContext.org.connectedPax - 1;
                draft.BillingContext.org.connectedPax = num;
              });
            }
          } else {
            const findContributorRole = globalContext.BillingContext.tourConnectedPeople.find(
              o =>
                (o.userId === json.userId || o.email === json.email) &&
                TOUR_CONTRIBUTOR_ROLE_TYPES.includes(o.role),
            );
            if (!findContributorRole) {
              globalDispatch.dispatch(draft => {
                const num = draft.BillingContext.org.connectedPax + 1;
                draft.BillingContext.org.connectedPax = num;
              });
            }
          }
        }
      } else {
        // check if the user is part of the tour already.
        const findUser = globalContext.BillingContext.tourConnectedPeople.find(
          o => o.userId === json.userId || o.email === json.email,
        );
        if (!findUser) {
          globalDispatch.dispatch(draft => {
            const connectedPeople =
              draft.BillingContext.person.connectedPeople + 1;
            draft.BillingContext.person.connectedPeople = connectedPeople;
          });
        }
      }
    }
    props.resaga.setValue({
      nodeShareSuccess: null,
    });
  }, [nodeShareSuccessData, orgId]);
  return null;
}

const ResagaSeatsCalculation = resaga({
  setValue: {
    nodeShareSuccess: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'nodeShareSuccessData'],
    addRoleSuccess: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'addRoleSuccessData'],
  },
})(React.memo(SeatsCalculation));

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <ResagaSeatsCalculation {...props} mforwardRef={ref} />
));
