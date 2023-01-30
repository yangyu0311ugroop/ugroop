import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import {
  DENY_ACCESS_REASON,
  FREE_ORG_SEATS_THRESHOLD,
  URL_HELPERS,
} from '../../../../appConstants';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { ORG_DATASTORE_RESELECTORS } from '../../../../datastore/orgStore/selectorsViaConnect';
import { TOUR_ROLE } from '../../../../apis/components/Ability/roles';
/* eslint-disable no-param-reassign */
function UseTourSeatSubscriptionCheck(props) {
  const history = useHistory();
  const { isFeatured } = props;
  const {
    orgId,
    userId,
    nodeCreatedBy,
    fetchCustomerSubscriptionSuccess,
    subscriptionOrgSeats,
    subscriptionTourSeats,
    totalNumberContributors,
    totalNumberParticipants,
    totalNumberPeople,
    connectedOrgPeople,
    tourConnectedPeople,
  } = props;
  const [state, setState] = useImmer({
    pass: false,
  });
  const orgOwnerId = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(store, {
      id: props.orgId,
      attribute: 'createdBy',
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
  const handleRedirect = (reason, lackSeats) => {
    if (isFeatured) return;
    if (orgId) {
      let orgOwner = orgOwnerId;
      if (!orgOwner && role === 'owner') {
        orgOwner = userOrgId;
      }
      history.push({
        pathname: URL_HELPERS.orgDenyAccess(orgId),
        state: {
          isOwner: orgOwner === userId,
          orgId,
          reason,
          lackSeats,
        },
      });
    } else {
      history.push({
        pathname: URL_HELPERS.personalDenyAccess(),
        search: `?userId=${userId}`,
        state: {
          isOwner: nodeCreatedBy === userId,
          reason,
          lackSeats,
        },
      });
    }
  };

  useEffect(() => {
    if (fetchCustomerSubscriptionSuccess && connectedOrgPeople > 0 && orgId) {
      // here, totalNumberContributors are the outside org contributors
      // except connected one people and role is view
      if (connectedOrgPeople > 0 && subscriptionOrgSeats > 0) {
        if (
          connectedOrgPeople >
          subscriptionOrgSeats + FREE_ORG_SEATS_THRESHOLD
        ) {
          const lackSeats =
            connectedOrgPeople -
            subscriptionOrgSeats +
            FREE_ORG_SEATS_THRESHOLD;
          if (lackSeats !== 0.5) {
            handleRedirect(
              DENY_ACCESS_REASON.INSUFFICIENT_CONTRIBUTOR_SEAT,
              lackSeats,
            );
          }
        }
        if (totalNumberContributors > 0) {
          if (
            totalNumberContributors >
            subscriptionOrgSeats + FREE_ORG_SEATS_THRESHOLD - connectedOrgPeople
          ) {
            const lackSeats =
              totalNumberContributors -
              (subscriptionOrgSeats +
                FREE_ORG_SEATS_THRESHOLD -
                connectedOrgPeople);
            if (subscriptionOrgSeats !== 1.5) {
              handleRedirect(
                DENY_ACCESS_REASON.INSUFFICIENT_CONTRIBUTOR_SEAT,
                lackSeats,
              );
            } else if (tourConnectedPeople && tourConnectedPeople.length > 0) {
              if (
                tourConnectedPeople.findIndex(o =>
                  [
                    TOUR_ROLE.TOUR_ORGANIZER,
                    TOUR_ROLE.TOUR_COLLABORATOR,
                  ].includes(o.role),
                ) >= 0
              ) {
                handleRedirect(
                  DENY_ACCESS_REASON.INSUFFICIENT_CONTRIBUTOR_SEAT,
                  1,
                );
              }
            }
          }
          if (totalNumberParticipants > subscriptionTourSeats) {
            const lackSeats = totalNumberParticipants - subscriptionTourSeats;
            handleRedirect(
              DENY_ACCESS_REASON.INSUFFICIENT_TOUR_SEAT,
              lackSeats,
            );
          } else {
            setState(draft => {
              draft.pass = true;
            });
          }
        }
        if (totalNumberContributors === 0) {
          if (totalNumberParticipants > subscriptionTourSeats) {
            const lastSeats = totalNumberParticipants - subscriptionTourSeats;
            handleRedirect(
              DENY_ACCESS_REASON.INSUFFICIENT_TOUR_SEAT,
              lastSeats,
            );
          } else {
            setState(draft => {
              draft.pass = true;
            });
          }
        }
      }
    }
  }, [
    fetchCustomerSubscriptionSuccess,
    totalNumberContributors,
    totalNumberParticipants,
    subscriptionOrgSeats,
    subscriptionTourSeats,
    connectedOrgPeople,
  ]);
  useEffect(() => {
    if (fetchCustomerSubscriptionSuccess && orgId == null) {
      if (totalNumberPeople > 0 && totalNumberPeople > subscriptionTourSeats) {
        const lackSeats = totalNumberPeople - subscriptionTourSeats;
        if (lackSeats === 0.5) {
          setState(draft => {
            draft.pass = true;
          });
        } else {
          handleRedirect(DENY_ACCESS_REASON.INSUFFICIENT_TOUR_SEAT, lackSeats);
        }
      } else {
        setState(draft => {
          draft.pass = true;
        });
      }
    }
  }, [
    fetchCustomerSubscriptionSuccess,
    totalNumberPeople,
    subscriptionTourSeats,
  ]);

  return state.pass;
}

UseTourSeatSubscriptionCheck.propTypes = {
  changePassTourSeatState: PropTypes.func,
  totalNumberParticipants: PropTypes.number,
  totalNumberContributors: PropTypes.number,
  totalNumberPeople: PropTypes.number,
  connectedOrgPeople: PropTypes.number,
  subscriptionTourSeats: PropTypes.number,
  subscriptionOrgSeats: PropTypes.number,
  fetchCustomerSubscriptionSuccess: PropTypes.bool,
  orgId: PropTypes.number,
  userId: PropTypes.number,
  orgOwnerId: PropTypes.number,
  userOrgId: PropTypes.number,
  role: PropTypes.string,
  nodeCreatedBy: PropTypes.number,
  tourConnectedPeople: PropTypes.string,
};

export default UseTourSeatSubscriptionCheck;
