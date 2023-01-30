import React from 'react';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';
import { isEmptyString } from '../../../../utils/stringAdditions';
import GridItem from '../../../../components/GridItem';
import GridContainer from '../../../../components/GridContainer';
import PriceDisplay from '../../../../ugcomponents/PriceDisplay';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import CustomerInfo from '../../../Customer/parts/Info';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { usePlanGlobalContext } from '../../context/planProviderGlobalContext';

function RenderCustomerInfo(props) {
  const { subscriptionItemIndex } = props;
  const {
    currentPlanName,
    currentPlanCurrency,
    subscriptionTaxPercentage: currentDefaultTaxPercentage,
    currentPlanInterval,
    currentPlanMetaDescription,
  } = useSelectorCurrentSubscriptionData(props);
  const [planState] = usePlanGlobalContext();
  const subscriptionLinePrice =
    planState.subscriptionPrice[subscriptionItemIndex];
  const { userId, orgId } = props;
  const show = LOGIC_HELPERS.ifElse([userId, orgId], true, false, true);
  if (!show) return null;
  let subheader = null;
  if (!isEmptyString(currentPlanName)) {
    subheader = (
      <GridItem>
        <GridContainer direction="row" alignItems="center">
          <GridItem>{currentPlanMetaDescription}</GridItem>
          <GridItem>
            <PriceDisplay
              currency={SubscriptionCalculationUtility.currencyLabelConversion(
                currentPlanCurrency,
              )}
              interval={currentPlanInterval}
              amount={subscriptionLinePrice > 0 ? subscriptionLinePrice : 0}
              quantity={1}
              tax={currentDefaultTaxPercentage}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
    return <CustomerInfo userId={userId} orgId={orgId} subheader={subheader} />;
  }
}

export default React.memo(RenderCustomerInfo);
