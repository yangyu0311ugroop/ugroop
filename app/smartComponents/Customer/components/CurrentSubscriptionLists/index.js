import GridContainer from 'components/GridContainer';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SubscribedPlan from '../SubscribedPlan';
import { useSelectorCurrentSubscriptionData } from '../../../Plan/hooks/useSelectorCurrentSubscriptionData';
import { parseStringJson } from '../../../../utils/stringAdditions';

function CurrentSubscriptionList(props) {
  const { variant, userId, orgId, orgSeats } = props;
  const data = useSelectorCurrentSubscriptionData(props);
  const {
    currentSubscriptionPlans,
    subscriptionItems,
    subscriptionTaxPercentage: currentDefaultTaxPercentage,
    subscriptionDefaultTax: currentDefaultTax,
    currentActiveScheduleId,
    currentSubscriptionId,
    customerId,
    nextPhasePlans,
    currentPhaseStart,
    currentPhaseEnd,
    currentPhaseCoupon,
    nextPhaseCoupon,
  } = data;
  const currentPlans = parseStringJson(currentSubscriptionPlans);
  const sortedData = currentPlans.sort((a, b) => (a.type > b.type ? 1 : -1));
  const showLists = () =>
    sortedData.map(o => {
      const items = parseStringJson(subscriptionItems);
      const subscriptionItemIndex = _.findIndex(items, i => i.plan === o.id);
      return (
        <SubscribedPlan
          key={o.id}
          variant={variant}
          userId={userId}
          orgId={orgId}
          tax={currentDefaultTaxPercentage}
          taxId={currentDefaultTax}
          currentActiveScheduleId={currentActiveScheduleId}
          planId={o.id}
          subscriptionItemIndex={subscriptionItemIndex}
          currentSubscriptionId={currentSubscriptionId}
          customerId={customerId}
          currentSubscriptionPlans={currentSubscriptionPlans}
          nextPhasePlans={nextPhasePlans}
          currentPhaseStartTime={currentPhaseStart}
          currentPhaseEndTime={currentPhaseEnd}
          subscriptionItems={subscriptionItems}
          currentPhaseCoupon={currentPhaseCoupon}
          nextPhaseCoupon={nextPhaseCoupon}
          orgSeats={orgSeats}
        />
      );
    });

  if (subscriptionItems) {
    return <GridContainer direction="column">{showLists()}</GridContainer>;
  }
  return <div />;
}

CurrentSubscriptionList.propTypes = {
  orgId: PropTypes.number,
  userId: PropTypes.number,
  variant: PropTypes.string,
  orgSeats: PropTypes.number,
};

CurrentSubscriptionList.defaultProps = {};

export default CurrentSubscriptionList;
