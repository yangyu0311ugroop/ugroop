import _ from 'lodash';
import {
  TOUR_CONTRIBUTOR_ROLE,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
  TOUR_ROLE,
} from '../../../../apis/components/Ability/roles';
import {
  CONFIRMED,
  PENDING,
  SUBSCRIPTION_FREE_PLANS,
} from '../../../../appConstants';

function calculateOrgSeats(
  connectedOrgPeopleEmails,
  deactivatedEmails,
  rawResponse,
  planName,
  tourOwnerId,
) {
  let contributorQuantity = 0;
  const allConnectedPeople = _.filter(
    rawResponse.userNodes,
    o => o.role !== TOUR_ROLE.TOUR_INTERESTED,
  ).map(o => {
    const u = rawResponse.users.find(us => us.id === o.userId);
    return {
      ...o,
      email: u.email,
    };
  });

  const nodeSharesContributorPending = _.filter(
    rawResponse.nodeShares,
    o =>
      o.role !== TOUR_ROLE.TOUR_INTERESTED &&
      o.role !== TOUR_ROLE.TOUR_PARTICIPANT &&
      (o.status === PENDING || o.status === CONFIRMED),
  );
  const userSharesContributor = _.filter(
    rawResponse.userNodes,
    o =>
      o.role !== TOUR_ROLE.TOUR_INTERESTED &&
      o.role !== TOUR_ROLE.TOUR_PARTICIPANT,
  ).map(o => {
    const u = rawResponse.users.find(us => us.id === o.userId);
    return {
      ...o,
      email: u.email,
    };
  });
  if (nodeSharesContributorPending && nodeSharesContributorPending.length > 0) {
    for (let i = 0; i < nodeSharesContributorPending.length; i += 1) {
      const ns = nodeSharesContributorPending[i];
      userSharesContributor.push({
        role: ns.role,
        email: ns.shareTo,
      });
      allConnectedPeople.push({
        role: ns.role,
        email: ns.shareTo,
        token: ns.notificationToken,
        status: ns.status,
      });
    }
  }
  const connectedOutsideOwnOrg = userSharesContributor
    .map(o => {
      if (connectedOrgPeopleEmails.includes(o.email)) {
        return null;
      }
      return o.email;
    })
    .filter(o => o !== null);

  // check deactivate member logic condition never appear as invitation and org role deactivate
  const finalconnectedOutsideOwnOrg = _.uniq(connectedOutsideOwnOrg)
    .map(o => {
      if (
        deactivatedEmails &&
        deactivatedEmails.includes(o) &&
        rawResponse.nodeShares.findIndex(
          ns =>
            ns.shareTo === o &&
            ns.status === CONFIRMED &&
            TOUR_CONTRIBUTOR_ROLE_TYPES.includes(ns.role),
        ) === -1
      ) {
        return null;
      }
      return o;
    })
    .filter(o => o !== null);
  if (userSharesContributor.length === 1) {
    const viewShare = _.find(
      userSharesContributor,
      o => o.role === TOUR_CONTRIBUTOR_ROLE.TOUR_VIEWER,
    );
    if (viewShare && SUBSCRIPTION_FREE_PLANS.includes(planName)) {
      contributorQuantity = 1.5;
    } else {
      contributorQuantity = finalconnectedOutsideOwnOrg.length;
    }
  } else {
    contributorQuantity = finalconnectedOutsideOwnOrg.length;
  }
  const paxSharesOutsideOrg = _.filter(
    rawResponse.userNodes,
    o => o.role === TOUR_ROLE.TOUR_PARTICIPANT && o.userId !== tourOwnerId,
  )
    .map(o => {
      const u = rawResponse.users.find(us => us.id === o.userId);
      return {
        ...o,
        email: u.email,
      };
    })
    .map(o => {
      if (connectedOrgPeopleEmails.includes(o.email)) {
        return null;
      }
      return o;
    })
    .filter(o => o !== null);
  const nodeSharesPax = _.filter(
    rawResponse.nodeShares,
    o =>
      o.role === TOUR_ROLE.TOUR_PARTICIPANT &&
      (o.status === PENDING || o.status === CONFIRMED),
  );
  if (nodeSharesPax && nodeSharesPax.length > 0) {
    for (let i = 0; i < nodeSharesPax.length; i += 1) {
      const ns = nodeSharesPax[i];
      paxSharesOutsideOrg.push({
        role: ns.role,
        email: ns.shareTo,
      });
      allConnectedPeople.push({
        role: ns.role,
        email: ns.shareTo,
        token: ns.notificationToken,
        status: ns.status,
      });
    }
  }
  const finalShares = _.uniqBy(
    paxSharesOutsideOrg
      .filter(
        o =>
          userSharesContributor.find(us => us.email === o.email) === undefined,
      )
      .map(o => {
        if (connectedOrgPeopleEmails.includes(o.email)) {
          return null;
        }
        return o.email;
      })
      .filter(o => o !== null),
    o => o.email,
  );
  return {
    allConnectedPeople,
    contributorQuantity,
    finalShares: finalShares.length,
  };
}
function calculatePersonSeats(rawResponse, planName, tourOwnerId) {
  const userShares = rawResponse.userNodes
    .filter(
      o => o.role !== TOUR_ROLE.TOUR_INTERESTED && o.userId !== tourOwnerId,
    )
    .map(o => {
      const u = rawResponse.users.find(us => us.id === o.userId);
      return {
        ...o,
        email: u.email,
      };
    });
  const nodeSharesPaxPending = _.filter(
    rawResponse.nodeShares,
    o => o.role !== TOUR_ROLE.TOUR_INTERESTED && o.status === PENDING,
  );
  for (let i = 0; i < nodeSharesPaxPending.length; i += 1) {
    const ns = nodeSharesPaxPending[i];
    if (
      !userShares.find(o => o.email === ns.shareTo && o.status === CONFIRMED)
    ) {
      userShares.push({
        role: ns.role,
        email: ns.shareTo,
        token: ns.notificationToken,
        status: ns.status,
      });
    }
  }
  let quantity = 0;
  const finalShares = _.uniqBy(userShares, o => o.email);
  if (finalShares.length === 1) {
    const viewShare = _.find(
      finalShares,
      o => o.role === TOUR_CONTRIBUTOR_ROLE.TOUR_VIEWER,
    );
    if (viewShare && SUBSCRIPTION_FREE_PLANS.includes(planName)) {
      quantity = 1.5;
    } else {
      quantity = finalShares.length + 1;
    }
  } else {
    quantity = finalShares.length + 1;
  }
  return {
    quantity,
    allConnectedPeople: userShares,
  };
}

export const SEAT_UTILITY = {
  calculateOrgSeats,
  calculatePersonSeats,
};
