import { defineMessages } from 'react-intl';

export default defineMessages({
  deniedAccess: {
    id: 'app.containers.Plan.parts.DenyAccess.deniedAccess',
    defaultMessage: 'Access Denied',
  },
  insufficientTourSeat: {
    id: 'app.containers.Plan.parts.DenyAccess.insufficientTourSeat',
    defaultMessage: 'Oops, more tour seats are needed',
  },
  insufficientContributorSeat: {
    id: 'app.containers.Plan.parts.DenyAccess.insufficientContributorSeat',
    defaultMessage: 'Oops, more team seats are needed',
  },
  noSubscription: {
    id: 'app.containers.Plan.parts.DenyAccess.noSubscription',
    defaultMessage: 'No Subscription Plan',
  },
  thankYou: {
    id: 'app.containers.Plan.parts.DenyAccess.thankYou',
    defaultMessage: 'Thank you.',
  },

  // ORGANISATION
  organisationDenied: {
    id: 'app.containers.Plan.parts.organisationDenied',
    defaultMessage:
      'The organisation you are trying to access has no subscription plan.',
  },
  organisationTourDenied: {
    id: 'app.containers.Plan.parts.organisationTourDenied',
    defaultMessage:
      'The tour you are trying to access belongs to the organisation who has no subscription plan.',
  },
  organisationTourMessage: {
    id: 'app.containers.Plan.parts.organisationTourMessage',
    defaultMessage:
      'Please contact the owner of your organisation to set it up.',
  },
  organisationMessage: {
    id: 'app.containers.Plan.parts.organisationMessage',
    defaultMessage:
      'Please contact the owner of your organisation to set it up.',
  },

  // PERSONAL
  personalTourDenied: {
    id: 'app.containers.Plan.parts.personalDenied',
    defaultMessage:
      'The tour you are trying to access belongs to someone who has no subscription plan.',
  },
  personalTourMessage: {
    id: 'app.containers.Plan.parts.personalMessage',
    defaultMessage: 'Please contact them to set it up.',
  },

  // insufficient_tour_seat
  insufficientTourSeatDenied: {
    id: 'app.containers.Plan.parts.insufficient_tour_seatDenied',
    defaultMessage:
      'This tour requires {lackSeats} on your plan, so please contact the organisation owner {ownerName} for an upgrade.',
  },
  insufficientTourSeatMessage: {
    id: 'app.containers.Plan.parts.insufficient_tour_seatMessage',
    defaultMessage:
      'Once done, you will be able to access this tour and any others below the new limit.',
  },
  // insufficient_contributor_seat
  insufficientContributorSeatMessage: {
    id: 'app.containers.Plan.parts.insufficientContributorSeatMessage',
    defaultMessage:
      'Once done, you will be able to access this tour and any others below the new limit.',
  },
  insufficientContributorSeatDenied: {
    id: 'app.containers.Plan.parts.insufficientContributorSeatDenied',
    defaultMessage:
      'This tour requires {lackSeats} on your plan, so please contact the organisation owner {ownerName} for an upgrade.',
  },

  // NO ORG BILLING
  noOrgBillingAccess: {
    id: 'app.containers.Plan.parts.DenyAccess.noOrgBillingAccess',
    defaultMessage: 'Permission Denied',
  },
  noOrgBillingAccessDenied: {
    id: 'app.containers.Plan.parts.DenyAccess.noOrgBillingAccessDenied',
    defaultMessage:
      'You either do no have permission to access the Billing or you do not belong to the organisation which created this tour.',
  },
  noOrgBillingAccessMessage: {
    id: 'app.containers.Plan.parts.DenyAccess.noOrgBillingAccessMessage',
    defaultMessage:
      'If it is regarding the subscription plan, please contact the owner of the organisation.',
  },

  // NO PERSON BILLING
  noPersonBillingAccess: {
    id: 'app.containers.Plan.parts.DenyAccess.noPersonBillingAccess',
    defaultMessage: 'Permission Denied',
  },
  noPersonBillingAccessDenied: {
    id: 'app.containers.Plan.parts.DenyAccess.noPersonBillingAccessDenied',
    defaultMessage: 'Sorry, you are not the owner of the tour.',
  },
  noPersonBillingAccessMessage: {
    id: 'app.containers.Plan.parts.DenyAccess.noPersonBillingAccessMessage',
    defaultMessage:
      'Please contact the owner who creates this tour and upgrade the subscription plan.',
  },
  // // PERSONAL DOWNGRADE
  // personalDowngradeDenied: {
  //   id: 'app.containers.Plan.parts.personalDowngradeDenied',
  //   defaultMessage: 'Sorry you are not allowed to downgrade your account.',
  // },
  // personalDowngradeMessage: {
  //   id: 'app.containers.Plan.parts.personalDowngradeMessage',
  //   defaultMessage: 'You should be subscribed first.',
  // },
  // // UPGRADE
  // upgradeDenied: {
  //   id: 'app.containers.Organisations.components.DenyAccess.upgradeDenied',
  //   defaultMessage:
  //     'The organisation you are trying to access cannot be upgraded.',
  // },
  // upgradeMessage: {
  //   id: 'app.containers.Organisations.components.DenyAccess.upgradeMessage',
  //   defaultMessage: 'The organisation should be subscribed first.',
  // },
  //
  // // ADD SEAT
  // addSeatDenied: {
  //   id: 'app.containers.Organisations.components.DenyAccess.addSeatDenied',
  //   defaultMessage:
  //     'The organisation you are trying to access cannot add a seat.',
  // },
  // addSeatMessage: {
  //   id: 'app.containers.Organisations.components.DenyAccess.addSeatMessage',
  //   defaultMessage: 'In order to add seat you need to upgrade your plan first.',
  // },
  //
  // // HIGHEST PLAN UPGRADE
  // highestPlanUpgradeDenied: {
  //   id:
  //     'app.containers.Organisations.components.DenyAccess.highestPlanUpgradeDenied',
  //   defaultMessage:
  //     'The organisation you are trying to access cannot be upgraded.',
  // },
  // highestPlanUpgradeMessage: {
  //   id:
  //     'app.containers.Organisations.components.DenyAccess.highestPlanUpgradeMessage',
  //   defaultMessage: 'Subscribed plan is already the highest plan.',
  // },
});
