import dotProp from 'dot-prop';
import createCachedSelector from 're-reselect';
import _ from 'lodash';
import {
  INVOICE_STORE_IMMER,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_INDIVIDUAL,
  SUBSCRIPTION_PLAN_TYPE,
} from '../../appConstants';
import { isEmptyString } from '../../utils/stringAdditions';
import { isNumber } from '../../utils/numberAdditions';

const lineIdsCacheKey = prefix => ({ inputSelectors = [] } = {}) => {
  const keySelectors = inputSelectors;
  return (...args) => {
    const fn = keySelectors[0](...args);
    const data = fn({
      customerId: args[1].customerId,
      attribute: 'lines.data',
    });
    if (data && data.length > 0) {
      const idString = _.flatten(data).reduce((a, c) => `${a},${c}`);
      return `${prefix}.lineIdsCacheKey.${idString}`;
    }
    return '';
  };
};

const selectInvoiceStore = state => state.get(INVOICE_STORE_IMMER);

const selectCurrentInvoiceAttribute = (state, props) => {
  const invoiceStore = selectInvoiceStore(state);
  return dotProp.get(
    invoiceStore,
    `currentInvoice.${props.customerId}_currentInvoice.${props.attribute}`,
  );
};

const selectCurrentInvoiceLineAttribute = (state, props) => {
  const invoiceStore = selectInvoiceStore(state);
  return dotProp.get(
    invoiceStore,
    `currentInvoiceLineItem.${props.id}.${props.attribute}`,
  );
};

const selectCurrentInvoiceAttributeRef = state => props =>
  selectCurrentInvoiceAttribute(state, props);

const selectCurrentInvoiceLineAttributeRef = state => props =>
  selectCurrentInvoiceLineAttribute(state, props);

const selectUpcomingInvoiceAttribute = (state, props) => {
  const invoiceStore = selectInvoiceStore(state);
  return dotProp.get(
    invoiceStore,
    `upcomingInvoice.${props.customerId}_upcomingInvoice.${props.attribute}`,
  );
};

const selectUpcomingInvoiceAttributeRef = state => props =>
  selectUpcomingInvoiceAttribute(state, props);

const selectUpcomingInvoiceLineAttribute = (state, props) => {
  const invoiceStore = selectInvoiceStore(state);
  return dotProp.get(
    invoiceStore,
    `upcomingInvoiceLineItem.${props.id}.${props.attribute}`,
  );
};

const selectUpcomingInvoiceLineAttributeRef = state => props =>
  selectUpcomingInvoiceLineAttribute(state, props);

const makeSelectInvoiceTypes = createCachedSelector(
  [
    selectUpcomingInvoiceAttributeRef,
    selectUpcomingInvoiceLineAttributeRef,
    (state, props) => ({
      props,
      state,
    }),
  ],
  (upcomingInvoiceAttributeFn, upcomingInvoiceLineAttributeFn, data) => {
    const lineIds = upcomingInvoiceAttributeFn({
      customerId: data.props.customerId,
      attribute: 'lines.data',
    });
    if (lineIds && lineIds.length > 0) {
      const list = lineIds.map(id => {
        const type = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'type',
        });
        return type;
      });
      return list ? JSON.stringify(list) : null;
    }
    return null;
  },
)({
  keySelectorCreator: lineIdsCacheKey('makeSelectInvoiceTypes'),
});

const makeSelectSubscriptionMetaInfo = createCachedSelector(
  [
    selectUpcomingInvoiceAttributeRef,
    selectUpcomingInvoiceLineAttributeRef,
    (state, props) => ({
      props,
      state,
    }),
  ],
  (upcomingInvoiceAttributeFn, upcomingInvoiceLineAttributeFn, data) => {
    const lineIds = upcomingInvoiceAttributeFn({
      customerId: data.props.customerId,
      attribute: 'lines.data',
    });
    let pType = '';
    const productType = data.props.productType;
    if (!isEmptyString(productType)) {
      if (productType === SUBSCRIPTION_ENTERPRISE) {
        pType = SUBSCRIPTION_PLAN_TYPE.ORG_SEAT;
      } else if (productType === SUBSCRIPTION_INDIVIDUAL) {
        pType = SUBSCRIPTION_PLAN_TYPE.INDIVIDUAL_SEAT;
      } else {
        pType = SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT;
      }
    }
    if (lineIds && lineIds.length > 0) {
      const list = lineIds.map(id => {
        const type = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'type',
        });
        const amount = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'amount',
        });
        const period = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'period',
        });
        const planMetaType = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'plan.metadata.type',
        });
        return {
          type,
          amount,
          period,
          planMetaType,
        };
      });
      const result = _.reduce(
        list,
        (t, o) => {
          if (o.type === 'subscription' && o.planType !== pType) {
            return {
              otherSubscriptionTotalAmount:
                t.otherSubscriptionTotalAmount +
                (isNumber(o.amount) ? o.amount : 0),
            };
          }
          return t;
        },
        {
          otherSubscriptionTotalAmount: 0,
          invoiceLineStartPeriod: 0,
          invoiceLineEndPeriod: 0,
        },
      );
      if (list.length > 0) {
        const totalLength = list.length;
        if (totalLength > 0) {
          if (list[totalLength - 1].period) {
            result.invoiceLineStartPeriod = list[totalLength - 1].period.start;
            result.invoiceLineEndPeriod = list[totalLength - 1].period.end;
          }
        }
      }
      return JSON.stringify(result) || null;
    }
    return null;
  },
)({
  keySelectorCreator: lineIdsCacheKey('makeSelectSubscriptionMetaInfo'),
});

const makeSelectProrateMetaInfo = createCachedSelector(
  [
    selectUpcomingInvoiceAttributeRef,
    selectUpcomingInvoiceLineAttributeRef,
    (state, props) => props,
  ],
  (upcomingInvoiceAttributeFn, upcomingInvoiceLineAttributeFn, props) => {
    const lineIds = upcomingInvoiceAttributeFn({
      customerId: props.customerId,
      attribute: 'lines.data',
    });
    if (lineIds && lineIds.length > 0) {
      const list = lineIds.map(id => {
        const type = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'type',
        });
        const amount = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'amount',
        });
        const period = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'period',
        });
        const planMetaType = upcomingInvoiceLineAttributeFn({
          id,
          attribute: 'plan.metadata.type',
        });
        return {
          type,
          amount,
          period,
          planType: planMetaType,
        };
      });
      let pType = '';
      const productType = props.productType;
      if (!isEmptyString(productType)) {
        if (productType === SUBSCRIPTION_ENTERPRISE) {
          pType = SUBSCRIPTION_PLAN_TYPE.ORG_SEAT;
        } else if (productType === SUBSCRIPTION_INDIVIDUAL) {
          pType = SUBSCRIPTION_PLAN_TYPE.INDIVIDUAL_SEAT;
        } else {
          pType = SUBSCRIPTION_PLAN_TYPE.TOUR_SEAT;
        }
      }
      const result = _.reduce(
        list,
        (t, o) => {
          if (o.type === 'invoiceitem') {
            if (pType === o.planType) {
              return {
                prorateAmount:
                  t.prorateAmount + (isNumber(o.amount) ? o.amount : 0),
                prorateStart: o.period.start,
                prorateEnd: o.period.end,
                totalInvoiceAmount:
                  t.totalInvoiceAmount + (isNumber(o.amount) ? o.amount : 0),
              };
            }
            return {
              prorateAmount: t.prorateAmount,
              prorateStart: o.period.start,
              prorateEnd: o.period.end,
              totalInvoiceAmount:
                t.totalInvoiceAmount + (isNumber(o.amount) ? o.amount : 0),
            };
          }
          return t;
        },
        {
          prorateAmount: 0,
          prorateStart: 0,
          prorateEnd: 0,
          totalInvoiceAmount: 0,
        },
      );
      return JSON.stringify(result) || null;
    }
    return null;
  },
)({
  keySelectorCreator: lineIdsCacheKey('makeSelectProrateMetaInfo'),
});

const makeSelectCurrentInvoiceProrateMetaInfo = createCachedSelector(
  [
    selectCurrentInvoiceAttributeRef,
    selectCurrentInvoiceLineAttributeRef,
    (state, props) => props,
  ],
  (currentInvoiceAttributeFn, currentInvoiceLineAttributeFn, props) => {
    const lineIds = currentInvoiceAttributeFn({
      customerId: props.customerId,
      attribute: 'lines.data',
    });
    if (lineIds && lineIds.length > 0) {
      const list = lineIds.map(id => {
        const type = currentInvoiceLineAttributeFn({
          id,
          attribute: 'type',
        });
        const amount = currentInvoiceLineAttributeFn({
          id,
          attribute: 'amount',
        });
        const period = currentInvoiceLineAttributeFn({
          id,
          attribute: 'period',
        });
        const planMetaType = currentInvoiceLineAttributeFn({
          id,
          attribute: 'plan.metadata.type',
        });
        return {
          type,
          amount,
          period,
          planType: planMetaType,
        };
      });
      const pType = props.planType;
      const result = _.reduce(
        list,
        (t, o) => {
          if (o.type === 'invoiceitem') {
            if (
              !isEmptyString(o.planMetaType) &&
              !isEmptyString(pType) &&
              o.planMetaType === pType
            ) {
              return {
                currentInvoiceTotal:
                  t.currentInvoiceTotal + (isNumber(o.amount) ? o.amount : 0),
                currentProductLineInvoiceTotal:
                  t.currentProductLineInvoiceTotal +
                  (isNumber(o.amount) ? o.amount : 0),
                currentOtherSubscriptionTotalAmount:
                  t.currentOtherSubscriptionTotalAmount,
              };
            }
            return {
              currentProductLineInvoiceTotal: t.currentProductLineInvoiceTotal,
              currentInvoiceTotal:
                t.currentInvoiceTotal + (isNumber(o.amount) ? o.amount : 0),
              currentOtherSubscriptionTotalAmount:
                t.currentOtherSubscriptionTotalAmount,
            };
          }
          if (o.type === 'subscription') {
            if (o.planMetaType !== pType) {
              return {
                currentProductLineInvoiceTotal:
                  t.currentProductLineInvoiceTotal,
                currentInvoiceTotal: t.currentInvoiceTotal,
                currentOtherSubscriptionTotalAmount:
                  t.currentOtherSubscriptionTotalAmount +
                  (isNumber(o.amount) ? o.amount : 0),
              };
            }
          }
          return t;
        },
        {
          currentInvoiceTotal: 0,
          currentProductLineInvoiceTotal: 0,
          currentOtherSubscriptionTotalAmount: 0,
        },
      );
      return JSON.stringify(result) || null;
    }
    return null;
  },
)({
  keySelectorCreator: lineIdsCacheKey(
    'makeSelectCurrentInvoiceProrateMetaInfo',
  ),
});

export const INVOICE_RESELECTOR = {
  selectCurrentInvoiceAttribute,
  selectUpcomingInvoiceAttribute,
  makeSelectInvoiceTypes,
  makeSelectSubscriptionMetaInfo,
  makeSelectProrateMetaInfo,
  makeSelectCurrentInvoiceProrateMetaInfo,
};
