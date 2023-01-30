/**
 * Created by Yang on 11/7/19.
 */

import React, { Fragment, useEffect } from 'react';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {
  SUBSCRIPTION_FREE_PLANS,
  SUBSCRIPTION_FREE_TOUR_PLANS,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import _ from 'lodash';
import {
  FIND_ORGANISATION_ID,
  GET_CUSTOMER_SUBSCRIPTION,
  SUBSCRIPTION_API,
  TEMPLATE_API,
  GET_PEOPLE,
  GET_ORG_MEMBERS,
} from 'apis/constants';

import resaga from 'resaga';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import UseCustomerSubscriptionCheck from './useCustomerSubscriptionCheck';
import UseTourSeatSubscriptionCheck from './useTourseatSubscriptionCheck';
import { isNumber } from '../../../../utils/numberAdditions';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { usePrevious } from '../../../../hooks/usePrevious';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { ORG_DATASTORE_RESELECTORS } from '../../../../datastore/orgStore/selectorsViaConnect';
import { useGlobalContext } from '../../../../containers/App/globalStateContext';
import { TEMPLATE_VIEWSTORE_RESELECTORS } from '../../../../datastore/templateManagementStore/selectorsViaConnect';
import SnackbarHelpers from '../../../SnackBar/helpers';
import { SEAT_UTILITY } from './SeatCalculationUtility';
/* eslint-disable no-param-reassign */
const withCustomerSubscriptionCheck = WrappedComponent => {
  function CustomerSubscriptionCheck(props) {
    const [globalState, globalStateDispatch] = useGlobalContext();
    const history = useHistory();
    const [state, setState] = useImmer({
      requireTourSeatCheck: true,
      customerId: null,
      orgId: null,
      urlFrom: '',
      nodeCreatedBy: null,
      subscriptionId: null,
      fetchCustomerSubscriptionSuccess: false,
      subscriptionTourSeats: -1,
      subscriptionOrgSeats: -1,
      connectedOrgPeople: -1,
      unmountRedirect: false,
      subscriptionPlanName: '',
    });

    const location = useLocation();
    const match = useRouteMatch();
    const fetchCustomerSubscription = (id, type, cb) => {
      props.resaga.dispatchTo(SUBSCRIPTION_API, GET_CUSTOMER_SUBSCRIPTION, {
        payload: { id, type },
        onSuccess: cb,
      });
    };

    const fetchTemplatePeople = (id, cb) => {
      props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
        payload: { id },
        onSuccess: cb,
      });
    };
    const orgOwnerId = useSelector(store =>
      makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(store, {
        id: props.id,
        attribute: 'createdBy',
      }),
    );

    const orgOwnerIdViaNode = useSelector(store =>
      makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(store, {
        id: props.id,
        attribute: 'userId',
      }),
    );

    const fetchOrgMembers = (tourId, cb) => {
      props.resaga.dispatchTo(TEMPLATE_API, GET_ORG_MEMBERS, {
        payload: { id: tourId },
        onSuccess: cb,
        onError: err => {
          if (isEmptyString(props.isFeaturedTour)) {
            history.push('/');
            if (err.status === 401) {
              SnackbarHelpers.openErrorSnackbar(
                'You are not authorized to access this tour',
                props.resaga,
              );
            }
          }
        },
      });
    };

    const calculateSeats = (orgMembers, tourOwnerId) => res => {
      const rawResponse = res.raw;
      if (orgMembers) {
        const connectedOrgPeople = orgMembers.confirmed.map(o => ({
          userId: o.userId,
          email: o.email,
        }));
        const pending = orgMembers.pending;
        const deactivated = orgMembers.deactivated;
        const emails = connectedOrgPeople.map(o => o.email);
        const deactivatedEmails = deactivated && deactivated.map(o => o.email);
        globalStateDispatch.setBillingOrgMembers(connectedOrgPeople);
        globalStateDispatch.setBillingOrgDeactivatedMembers(deactivated);
        globalStateDispatch.setBillingOrgPendingMembers(pending);
        const {
          allConnectedPeople,
          contributorQuantity,
          finalShares,
        } = SEAT_UTILITY.calculateOrgSeats(
          emails,
          deactivatedEmails,
          rawResponse,
          state.subscriptionPlanName,
          tourOwnerId,
        );
        setState(draft => {
          draft.unmountRedirect = false;
          draft.connectedOrgPeople = connectedOrgPeople.length;
        });
        globalStateDispatch.setTourConnectedPeople(allConnectedPeople);
        globalStateDispatch.dispatch(draft => {
          draft.BillingContext.org.connectedContributor = contributorQuantity;
          draft.BillingContext.org.connectedPax = finalShares;
        });
      } else {
        setState(draft => {
          draft.unmountRedirect = false;
        });
        const {
          allConnectedPeople,
          quantity,
        } = SEAT_UTILITY.calculatePersonSeats(
          rawResponse,
          state.subscriptionPlanName,
          tourOwnerId,
        );
        globalStateDispatch.setTourConnectedPeople(allConnectedPeople);
        globalStateDispatch.dispatch(draft => {
          draft.BillingContext.person.connectedPeople = quantity;
        });
      }
    };

    const fetchSubscriptionFromTourLink = () => {
      props.resaga.dispatchTo(TEMPLATE_API, FIND_ORGANISATION_ID, {
        payload: { id: match.params.id },
        // eslint-disable-next-line no-unused-vars
        onSuccess: ({ id, node }) => {
          const organisationId = _.get(node, 'calculated.organisationId', -1);
          const nodeCreatedBy = _.get(node, 'createdBy', -1);
          if (isNumber(organisationId)) {
            fetchCustomerSubscription(organisationId, 'org', response => {
              const subscriptionItems =
                response.raw.subscriptions &&
                response.raw.subscriptions.data.length > 0
                  ? response.raw.subscriptions.data[0].items.data
                  : [];
              const item = _.find(
                subscriptionItems,
                o => o.plan.metadata.type === 'tourseat',
              );
              const orgSeatItem = _.find(
                subscriptionItems,
                o => o.plan.metadata.type === 'orgseat',
              );
              let orgQuantity = 0;
              if (
                orgSeatItem &&
                SUBSCRIPTION_FREE_PLANS.includes(orgSeatItem.plan.nickname)
              ) {
                orgQuantity = 1.5;
              } else if (item) {
                orgQuantity = orgSeatItem.quantity;
              }

              let quantity = 0;
              if (
                item &&
                SUBSCRIPTION_FREE_TOUR_PLANS.includes(item.plan.nickname)
              ) {
                quantity = 0;
              } else if (item) {
                if (item.quantity > 20) {
                  quantity = item.quantity;
                } else {
                  quantity = 20;
                }
              }

              setState(draft => {
                draft.orgId = organisationId;
                draft.urlFrom = location.pathname;
                draft.customerId = response.raw.id;
                draft.subscriptionId =
                  response.raw.subscriptions &&
                  response.raw.subscriptions.data.length > 0
                    ? response.raw.subscriptions.data[0].id
                    : '';
                draft.fetchCustomerSubscriptionSuccess = true;
                draft.subscriptionTourSeats = quantity;
                draft.subscriptionOrgSeats = orgQuantity;
                draft.unmountRedirect = false;
                draft.subscriptionPlanName =
                  orgSeatItem && orgSeatItem.plan.nickname;
                draft.nodeCreatedBy = nodeCreatedBy;
              });
            });
          } else {
            fetchCustomerSubscription(nodeCreatedBy, 'user', response => {
              const subscriptionItems =
                response.raw.subscriptions &&
                response.raw.subscriptions.data.length > 0
                  ? response.raw.subscriptions.data[0].items.data
                  : [];

              let quantity = 0;
              let productName = '';
              if (subscriptionItems && subscriptionItems.length > 0) {
                productName = subscriptionItems[0].plan.nickname;
                quantity = SubscriptionCalculationUtility.convertPersonPlanToQuantity(
                  productName,
                );
              }
              setState(draft => {
                draft.nodeCreatedBy = nodeCreatedBy;
                draft.urlFrom = location.pathname;
                draft.customerId = response.raw.id;
                draft.subscriptionId =
                  response.raw.subscriptions &&
                  response.raw.subscriptions.data.length > 0
                    ? response.raw.subscriptions.data[0].id
                    : '';
                draft.fetchCustomerSubscriptionSuccess = true;
                draft.subscriptionTourSeats = quantity;
                draft.subscriptionPlanName = productName;
              });
            });
          }
          if (organisationId) {
            fetchOrgMembers(match.params.id, orgMemberResult => {
              fetchTemplatePeople(
                match.params.id,
                calculateSeats(orgMemberResult, nodeCreatedBy),
              );
            });
          } else {
            fetchTemplatePeople(
              match.params.id,
              calculateSeats(null, nodeCreatedBy),
            );
          }
        },
      });
    };

    const prevTourId = usePrevious(
      match && match.params.id ? match.params.id : null,
    );
    useEffect(() => {
      if (location.pathname.includes('orgs')) {
        if (props.id) {
          fetchCustomerSubscription(props.id, 'org', response => {
            setState(draft => {
              draft.orgId = props.id;
              draft.urlFrom = location.pathname;
              draft.customerId = response.raw ? response.raw.id : '';
              draft.subscriptionId =
                response.raw.subscriptions &&
                response.raw.subscriptions.data.length > 0
                  ? response.raw.subscriptions.data[0].id
                  : '';
              draft.fetchCustomerSubscriptionSuccess = true;
              draft.requireTourSeatCheck = false;
            });
          });
        }
      } else if (match && match.params.id) {
        // Tours
        if (match.params.id !== prevTourId) {
          fetchSubscriptionFromTourLink();
        }
      } else {
        // or Personal stuffs.
        fetchCustomerSubscription(props.userId, 'user', response => {
          setState(draft => {
            draft.urlFrom = location.pathname;
            draft.customerId = response.raw ? response.raw.id : '';
            draft.subscriptionId =
              response.raw.subscriptions &&
              response.raw.subscriptions.data.length > 0
                ? response.raw.subscriptions.data[0].id
                : '';
            draft.fetchCustomerSubscriptionSuccess = true;
            draft.requireTourSeatCheck = false;
          });
        });
      }
    }, [location, props.userId, props.id, match, prevTourId]);

    useEffect(() => {
      if (match && match.params.id) {
        if (prevTourId && match.params.id !== prevTourId) {
          setState(draft => {
            draft.unmountRedirect = true;
            draft.customerId = null;
            draft.orgId = null;
            draft.nodeCreatedBy = null;
            draft.subscriptionId = null;
            draft.fetchCustomerSubscriptionSuccess = false;
            draft.subscriptionTourSeats = -1;
            draft.subscriptionOrgSeats = -1;
            draft.connectedOrgPeople = -1;
            draft.subscriptionPlanName = '';
          });
          globalStateDispatch.resetBillingData();
        }
      }
    }, [match]);

    useEffect(
      () => () => {
        setState(draft => {
          draft.unmountRedirect = false;
        });
      },
      [match],
    );
    const cancelInvitation = useSelector(store =>
      makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
        store,
        {
          key: 'cancelInvitation',
        },
      ),
    );
    useEffect(() => {
      if (cancelInvitation) {
        fetchSubscriptionFromTourLink();
        props.resaga.setValue({
          cleanCancelInvitation: null,
        });
      }
    }, [cancelInvitation]);

    useEffect(() => {
      if (state.orgId) {
        if (
          state.connectedOrgPeople > 0 &&
          state.subscriptionTourSeats >= 0 &&
          state.subscriptionOrgSeats >= 0 &&
          !isEmptyString(state.subscriptionPlanName)
        )
          globalStateDispatch.setBillingOrgSeatsData({
            tourSeats: state.subscriptionTourSeats,
            orgSeats: state.subscriptionOrgSeats,
            connectedOrgPeople: state.connectedOrgPeople,
            subscriptionPlan: state.subscriptionPlanName,
          });
      }
    }, [
      state.subscriptionOrgSeats,
      state.subscriptionTourSeats,
      state.connectedOrgPeople,
      state.subscriptionPlanName,
      state.orgId,
    ]);

    useEffect(() => {
      if (!state.orgId) {
        if (
          state.subscriptionTourSeats >= 0 &&
          !isEmptyString(state.subscriptionPlanName)
        ) {
          globalStateDispatch.setBillingPersonSeatsData({
            tourSeats: state.subscriptionTourSeats,
            subscriptionPlan: state.subscriptionPlanName,
          });
        }
      }
    }, [state.orgId, state.subscriptionTourSeats, state.subscriptionPlanName]);

    useEffect(
      () => () => {
        // clean up
        globalStateDispatch.resetBillingData();
      },
      [],
    );
    const customerSubscriptionPass = UseCustomerSubscriptionCheck({
      fromUrl: state.urlFrom,
      orgId: state.orgId,
      customerId: state.customerId,
      userId: props.userId,
      nodeCreatedBy: state.nodeCreatedBy,
      subscriptionId: state.subscriptionId,
      fetchCustomerSubscriptionSuccess: state.fetchCustomerSubscriptionSuccess,
      resaga: props.resaga,
      isFeatured: props.isFeaturedTour,
    });

    const touSeatPass = UseTourSeatSubscriptionCheck({
      totalNumberParticipants: globalState.BillingContext.org.connectedPax,
      totalNumberContributors:
        globalState.BillingContext.org.connectedContributor,
      totalNumberPeople: globalState.BillingContext.person.connectedPeople,
      connectedOrgPeople: state.connectedOrgPeople,
      subscriptionTourSeats: state.subscriptionTourSeats,
      subscriptionOrgSeats: state.subscriptionOrgSeats,
      fetchCustomerSubscriptionSuccess: state.fetchCustomerSubscriptionSuccess,
      nodeCreatedBy: state.nodeCreatedBy,
      orgId: state.orgId,
      userId: props.userId,
      resaga: props.resaga,
      isFeatured: props.isFeaturedTour,
      tourConnectedPeople: globalState.BillingContext.tourConnectedPeople,
    });
    if (state.unmountRedirect && isEmptyString(props.isFeaturedTour)) {
      return <div />;
    }
    if (isEmptyString(props.isFeaturedTour)) {
      if (!customerSubscriptionPass) {
        return <div />;
      }
    }
    if (state.requireTourSeatCheck && isEmptyString(props.isFeaturedTour)) {
      if (!touSeatPass) {
        return <div />;
      }
    }

    const {
      // eslint-disable-next-line react/prop-types
      staticContext,
      ...rest
    } = props;
    let ownerId = orgOwnerId;
    if (ownerId == null) {
      ownerId = orgOwnerIdViaNode;
    }
    return (
      <Fragment>
        <WrappedComponent
          {...rest}
          orgOwnerId={ownerId}
          customerId={state.customerId}
          subscriptionId={state.subscriptionId}
        />
      </Fragment>
    );
  }

  CustomerSubscriptionCheck.propTypes = {
    // hoc
    resaga: PropTypes.object.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
    id: PropTypes.number, // OrgId
    userId: PropTypes.number,
    match: PropTypes.object,
    organisationIdFromURL: PropTypes.number,
    isFeaturedTour: PropTypes.string,
  };

  CustomerSubscriptionCheck.defaultProps = {};

  return compose(
    resaga({
      setValue: {
        cleanCancelInvitation: [
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'cancelInvitation',
        ],
        ...SET_VALUE,
      },
    }),
  )(CustomerSubscriptionCheck);
};
export default withCustomerSubscriptionCheck;
