import createCachedSelector from 're-reselect';
import dotProp from 'dot-prop';
import _ from 'lodash';
import { MARKET_PLACE_STORE } from '../../../appConstants';
const selectMarketPlaceStore = state => state.get(MARKET_PLACE_STORE);

const selectProductIds = (state, props) =>
  dotProp.get(
    selectMarketPlaceStore(state),
    `publishProducts.${props.category}.productsList`,
  );

const selectProductIdsFromMarketStore = (marketStore, props) =>
  dotProp.get(marketStore, `publishProducts.${props.category}.productsList`);

const selectProductIdsFromMarketStoreRef = () =>
  selectProductIdsFromMarketStore;

const selectPublisherFromMarketStore = (marketStore, props) =>
  dotProp.get(marketStore, `publishedBy.${props.id}`);

const selectPublisher = (state, props) =>
  dotProp.get(selectMarketPlaceStore(state), `publishedBy.${props.id}`);

const selectPublisherFromMarketStoreRef = () => selectPublisherFromMarketStore;

export const makeSelectPublished = createCachedSelector(
  [selectPublisher],
  result => result,
)((state, props) => `makeSelectPublished.${props.id}`);

export const makeSelectCategoryLists = createCachedSelector(
  [selectMarketPlaceStore],
  result => result && result.category,
)(() => 'category');

function makeAllProductIdsFromAllCategoryCacheKey({
  inputSelectors = [],
} = {}) {
  const keySelectors = inputSelectors;
  return (...args) => {
    const store = keySelectors[0](...args);
    const fn = keySelectors[1](...args);
    const data =
      store &&
      store.category &&
      store.category.map(c => fn(store, { category: c }));
    if (data && data.length > 0) {
      const idString = _.flatten(data).reduce((a, c) => `${a},${c}`);
      return `allProductsKeys.${idString}`;
    }
    return '';
  };
}

function makeAllPublisherIdsCacheKey({ inputSelectors = [] } = {}) {
  const keySelectors = inputSelectors;
  return (...args) => {
    const state = keySelectors[0](...args);
    const fn = keySelectors[1](...args);
    const pfn = keySelectors[2](...args);

    const data =
      state &&
      state.category &&
      state.category.map(c => fn(state, { category: c }));
    const allOrgIds =
      data &&
      _.flatten(data).map(o => {
        const p = pfn(state, { id: o });
        return p.orgId;
      });
    if (allOrgIds && allOrgIds.length > 0) {
      const idString = _.uniq(allOrgIds).reduce((a, c) => `${a},${c}`);
      return `allOrgIds.${idString}`;
    }
    return '';
  };
}

export const makeAllProductIdsFromAllCategory = createCachedSelector(
  [selectMarketPlaceStore, selectProductIdsFromMarketStoreRef],
  (state, fn) => {
    const data =
      state &&
      state.category &&
      state.category.map(c => fn(state, { category: c }));
    return data && _.flatten(data);
  },
)({
  keySelectorCreator: makeAllProductIdsFromAllCategoryCacheKey,
});

export const makeAllPublisherIds = createCachedSelector(
  [
    selectMarketPlaceStore,
    selectProductIdsFromMarketStoreRef,
    selectPublisherFromMarketStoreRef,
  ],
  (state, fn, publisherFn) => {
    const data =
      state &&
      state.category &&
      state.category.map(c => fn(state, { category: c }));
    const allOrgIds =
      data &&
      _.flatten(data).map(o => {
        const p = publisherFn(state, { id: o });
        return p.orgId;
      });
    return _.uniq(allOrgIds);
  },
)({
  keySelectorCreator: makeAllPublisherIdsCacheKey,
});

export const makeSelectMarketPlaceProductIds = createCachedSelector(
  [selectProductIds],
  result => result,
)((state, props) => `makeSelectMarketPlaceProductIds.${props.category}`);
