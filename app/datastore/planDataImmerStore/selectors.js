import dotProp from 'dot-prop';
import createCachedSelector from 're-reselect';
import _ from 'lodash';
import { FREE_ORG_SEATS_THRESHOLD, PLAN_STORE_IMMER } from '../../appConstants';
import { isNumber } from '../../utils/numberAdditions';
import { isEmptyString, parseStringJson } from '../../utils/stringAdditions';

export const selectPlanStore = state => state.get(PLAN_STORE_IMMER);

const selectPlanIds = (state, props) => {
  const planStore = selectPlanStore(state);
  return dotProp.get(planStore, `products.${props.id}`);
};

const selectPlanIdsRef = state => props => selectPlanIds(state, props);

const selectPlanAmountRef = state => selectPlanAmount(state);

export const selectPlanAmount = state => props => {
  const planStore = selectPlanStore(state);
  return dotProp.get(planStore, `plans.${props.id}.amount`);
};

const selectPlanIntervalRef = state => selectPlanInterval(state);

const selectPlanInterval = state => props => {
  const planStore = selectPlanStore(state);
  return dotProp.get(planStore, `plans.${props.id}.interval`);
};

const selectPassedProps = (state, props) => props;

export const selectPlanNickName = (state, props) => {
  const planStore = selectPlanStore(state);
  return dotProp.get(planStore, `plans.${props.id}.nickname`);
};

export const selectPlanNickNameRef = state => props =>
  selectPlanNickName(state, props);

export const selectPlanAttribute = (state, props) => {
  const planStore = selectPlanStore(state);
  return dotProp.get(planStore, `plans.${props.id}.${props.attribute}`);
};
const selectPlanAttributeRef = state => props =>
  selectPlanAttribute(state, props);

export const makeSelectFreePlanId = createCachedSelector(
  [
    selectPlanIds,
    selectPlanAmountRef,
    selectPlanIntervalRef,
    selectPassedProps,
  ],
  (ids, fn, intervalFn, selectPassedPropsFn) => {
    const { isChangeDuration, interval } = selectPassedPropsFn || {};
    if (ids && ids.length > 0) {
      const listAmounts = ids.map(i => fn({ id: i }));
      const intervalData = ids.map(i => intervalFn({ id: i }));
      const res = _.zip(ids, listAmounts, intervalData).reduce(
        (result, [id, eachAmount, date]) => {
          if (isChangeDuration) {
            if (date === interval) {
              if (isNumber(eachAmount) && eachAmount === 0) {
                result.push(id);
              }
            }
          } else if (date === interval) {
            if (isNumber(eachAmount) && eachAmount === 0) {
              result.push(id);
            }
          }

          return result;
        },
        [],
      );
      if (res.length) {
        return res[0];
      }
    }
    return null;
  },
)((state, props) => `makeSelectFreePlanId.products.${props.id}`);

export const makeSelectUpgradePlanIds = createCachedSelector(
  [
    selectPlanIds,
    state => {
      const planStore = selectPlanStore(state);
      return dotProp.get(planStore, `plans`);
    },
    selectPassedProps,
  ],
  (ids, planCollection, props) => {
    const { interval, orgSeats, currentPlanAmount, currentPlanTierAmount } =
      props || {};
    if (ids && ids.length > 0) {
      const listAmounts = ids.map(i => planCollection[i].amount);
      const intervalData = ids.map(i => planCollection[i].interval);
      const listPlanFirstPurchase = ids.map(
        i => planCollection[i].metadata.firstPurchase,
      );
      const listFirstTierAmount = ids.map(i => {
        if (planCollection[i].tiers) {
          return planCollection[i].tiers[0].flat_amount;
        }
        return undefined;
      });
      const res = _.zip(
        ids,
        listFirstTierAmount,
        listAmounts,
        listPlanFirstPurchase,
        intervalData,
      ).reduce(
        (
          result,
          [id, eachFirstTierAmount, eachAmount, eachFirstPurchase, date],
        ) => {
          if (date === interval) {
            if (isNumber(currentPlanTierAmount)) {
              if (isNumber(eachAmount) && currentPlanTierAmount < eachAmount) {
                result.push({ id, price: eachAmount });
              } else if (
                isNumber(eachFirstTierAmount) &&
                currentPlanTierAmount < eachFirstTierAmount
              ) {
                result.push({ id, price: eachFirstTierAmount });
              }
            } else if (isNumber(currentPlanAmount)) {
              if (isNumber(eachAmount) && currentPlanAmount < eachAmount) {
                result.push({ id, price: eachAmount });
              } else if (
                isNumber(eachFirstTierAmount) &&
                currentPlanAmount < eachFirstTierAmount
              ) {
                result.push({ id, price: eachFirstTierAmount });
              }
            } else if (
              typeof currentPlanAmount === 'undefined' &&
              typeof currentPlanTierAmount === 'undefined'
            ) {
              if (isNumber(eachAmount)) {
                if (eachAmount === 0) {
                  if (
                    !(
                      isNumber(orgSeats) &&
                      orgSeats > FREE_ORG_SEATS_THRESHOLD + 1
                    )
                  ) {
                    result.push({
                      id,
                      price: eachAmount,
                    });
                  }
                } else if (
                  !isEmptyString(eachFirstPurchase) &&
                  eachAmount !== 0
                ) {
                  const num = parseInt(eachFirstPurchase, 10);
                  const seat = orgSeats || 0;
                  if (seat <= num) {
                    result.push({
                      id,
                      price: eachAmount,
                    });
                  }
                } else {
                  result.push({
                    id,
                    price: eachAmount,
                  });
                }
              }
              if (isNumber(eachFirstTierAmount)) {
                result.push({ id, price: eachFirstTierAmount });
              }
            }
          }
          return result;
        },
        [],
      );
      if (res.length) {
        return JSON.stringify(
          _.orderBy(res, ['price'], ['desc']).map(o => o.id),
        );
      }
    }
    return null;
  },
)(
  (state, props) =>
    `makeSelectUpgradePlanIds.products.${props.id}.${props.currentPlanAmount}.${
      props.currentPlanTierAmount
    }`,
);

export const makeSelectBundlePlanId = createCachedSelector(
  [selectPlanIdsRef, selectPlanNickNameRef, selectPassedProps],
  (idsFn, nameFn, selectPassedPropsFn) => {
    const { bundleProductId, selectPlanBundleName } = selectPassedPropsFn || {};
    const ids = idsFn({
      id: bundleProductId,
    });
    if (ids && ids.length > 0) {
      const names = ids.map(i => ({
        id: i,
        name: nameFn({ id: i }),
      }));
      const res = names.filter(o => o.name === selectPlanBundleName);
      if (res != null && res.length > 0) {
        return res[0].id;
      }
    }
    return null;
  },
)(
  (state, props) =>
    `makeSelectBundlePlanId.${props.bundleProductId}.${
      props.selectPlanBundleName
    }`,
);

export const makeSelectEqualPlanId = createCachedSelector(
  [
    selectPlanIdsRef,
    selectPlanAttributeRef,
    (s, props) => ({
      selectPlanId: props.selectPlanId,
      productId: props.productId,
    }),
  ],
  (idsFn, attributeFn, data) => {
    const ids = idsFn({
      id: data.productId,
    });
    const selectPlanName = attributeFn({
      id: data.selectPlanId,
      attribute: 'metadata.EqualPlan',
    });
    if (ids && ids.length > 0) {
      const names = ids.map(i => ({
        id: i,
        name: attributeFn({ id: i, attribute: 'nickname' }),
      }));
      const res = names.filter(o => o.name === selectPlanName);
      if (res != null && res.length > 0) {
        return res[0].id;
      }
    }
    return null;
  },
)((state, props) => {
  if (isEmptyString(props.selectPlanId)) {
    return 'makeSelectEqualPlanId.default';
  }
  return `makeSelectEqualPlanId.${props.selectPlanId}.${props.productId}`;
});

export const makeSelectDowngradePlanIds = createCachedSelector(
  [
    selectPlanIds,
    state => {
      const planStore = selectPlanStore(state);
      return dotProp.get(planStore, `plans`);
    },
    selectPassedProps,
  ],
  (ids, planCollection, props) => {
    const { interval, orgSeats, currentPlanAmount, currentPlanTierAmount } =
      props || {};
    if (ids && ids.length > 0) {
      const listAmounts = ids.map(i => planCollection[i].amount);
      const intervalData = ids.map(i => planCollection[i].interval);
      const listPlanFirstPurchase = ids.map(
        i => planCollection[i].metadata.firstPurchase,
      );
      const listFirstTierAmount = ids.map(i => {
        if (planCollection[i].tiers) {
          return planCollection[i].tiers[0].flat_amount;
        }
        return undefined;
      });
      const res = _.zip(
        ids,
        listFirstTierAmount,
        listAmounts,
        listPlanFirstPurchase,
        intervalData,
      ).reduce(
        (
          result,
          [id, eachFirstTierAmount, eachAmount, eachFirstPurchase, date],
        ) => {
          const eachFirstPurchaseNum = parseInt(eachFirstPurchase, 10);
          if (
            date === interval &&
            ((!isEmptyString(eachFirstPurchase) &&
              eachFirstPurchaseNum + 1 >= orgSeats) ||
              isEmptyString(eachFirstPurchase) ||
              eachFirstPurchaseNum > 1)
          ) {
            if (
              isNumber(currentPlanTierAmount) &&
              (currentPlanTierAmount > eachAmount ||
                currentPlanTierAmount > eachFirstTierAmount)
            ) {
              if (isNumber(eachAmount)) {
                result.push({ id, price: eachAmount });
              }
              if (isNumber(eachFirstTierAmount)) {
                result.push({ id, price: eachFirstTierAmount });
              }
            } else if (
              isNumber(currentPlanAmount) &&
              (currentPlanAmount > eachAmount ||
                currentPlanAmount > eachFirstTierAmount)
            ) {
              if (isNumber(eachAmount)) {
                result.push({ id, price: eachAmount });
              }
              if (isNumber(eachFirstTierAmount)) {
                result.push({ id, price: eachFirstTierAmount });
              }
            } else if (
              typeof currentPlanAmount === 'undefined' &&
              typeof currentPlanTierAmount === 'undefined'
            ) {
              if (isNumber(eachAmount)) {
                result.push({ id, price: eachAmount });
              }
              if (isNumber(eachFirstTierAmount)) {
                result.push({ id, price: eachFirstTierAmount });
              }
            }
          }
          return result;
        },
        [],
      );
      if (res.length) {
        return JSON.stringify(
          _.orderBy(res, ['price'], ['desc']).map(o => o.id),
        );
      }
    }
    return null;
  },
)((state, props) => {
  if (props.currentPlanAmount) {
    return `makeSelectDowngradePlanIds.products.${props.id}.${
      props.currentPlanAmount
    }`;
  }
  return `makeSelectDowngradePlanIds.products.${props.id}.${
    props.currentPlanTierAmount
  }`;
});

// TODO: OPTIMIZE THE SELECT
export const makeSelectProjectionPlans = createCachedSelector(
  [selectPlanAttributeRef, (state, props) => props],
  (fn, props) => {
    const {
      currentfirstTierAmount,
      currentsecondTier,
      quantity,
      currentPlanFirstPurchase,
      projectPlanIds,
      seat,
    } = props || {};
    const ids = parseStringJson(projectPlanIds);
    if (ids && ids.length > 0) {
      for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        const firstPurchase = fn({
          id,
          attribute: 'metadata.firstPurchase',
        });
        const tierAmount = fn({
          id,
          attribute: 'tiers.0.flat_amount',
        });
        const secondTierAmount = fn({
          id,
          attribute: 'tiers.1.unit_amount',
        });
        const name = fn({
          id,
          attribute: 'metadata.description',
        });
        const currentPlanFirstPurchaseNum = parseInt(
          currentPlanFirstPurchase,
          10,
        );
        const number =
          (tierAmount - currentfirstTierAmount) / currentsecondTier;
        if (number + currentPlanFirstPurchaseNum <= quantity + seat) {
          let projectPrice = tierAmount;
          if (quantity + seat > firstPurchase) {
            projectPrice =
              tierAmount + (quantity + seat - firstPurchase) * secondTierAmount;
          }
          return JSON.stringify({
            betterPlan: true,
            id,
            totalQuantity: quantity + seat,
            projectPrice,
            name,
            firstPurchase,
          });
        }
      }
      return '';
    }
    return '';
  },
)(
  (state, props) =>
    `makeSelectProjectionPlans.${props.projectPlanIds}.${props.quantity}`,
);

export const PLAN_RESELECTOR = {
  selectPlanAttribute,
};
