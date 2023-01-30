import { useSelector } from 'react-redux';
import { makeSingleSelect } from '../../../datastore/selectUtility';
import { PLAN_RESELECTOR } from '../../../datastore/planDataImmerStore/selectors';

export const useSelectorPlanData = props => {
  const planId = props.planId;
  const PlanAmount = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'amount',
    }),
  );

  const PlanTierAmount = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'tiers.0.flat_amount',
    }),
  );

  const PlanSecondTierAmount = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'tiers.1.unit_amount',
    }),
  );

  const PlanName = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'nickname',
    }),
  );

  const PlanCurrency = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'currency',
    }),
  );

  const PlanFirstPurchase = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'metadata.firstPurchase',
    }),
  );

  const PlanInterval = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'interval',
    }),
  );

  const PlanMetaDescription = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'metadata.description',
    }),
  );

  const PlanDetails = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'metadata.productInfo',
    }),
  );
  const PlanBundleName = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'metadata.bundleProduct',
    }),
  );

  const PlanType = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: 'metadata.type',
    }),
  );

  const PlanLevel = useSelector(state =>
    makeSingleSelect(PLAN_RESELECTOR.selectPlanAttribute)(state, {
      id: planId,
      attribute: `metadata.level`,
    }),
  );

  return {
    PlanMetaDescription,
    PlanInterval,
    PlanFirstPurchase,
    PlanCurrency,
    PlanName,
    PlanSecondTierAmount,
    PlanTierAmount,
    PlanAmount,
    PlanDetails,
    PlanBundleName,
    PlanType,
    PlanLevel,
  };
};
