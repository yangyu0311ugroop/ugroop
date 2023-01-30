import dotProp from 'dot-prop';
import createCachedSelector from 're-reselect';
import { PRODUCT_STORE_IMMER } from '../../appConstants';

const selectProductStore = state => state.get(PRODUCT_STORE_IMMER);

const selectProductIds = (state, props) => {
  const productStore = selectProductStore(state);
  return {
    ids: productStore && productStore.ids,
    name: props.name,
  };
};

const selectProductName = state => data => {
  const productStore = selectProductStore(state);
  const { id } = data || {};
  return dotProp.get(productStore, `products.${id}.name`);
};

const selectProductNameRef = state => selectProductName(state);

export const makeSelectProductIdFilterByName = createCachedSelector(
  [selectProductIds, selectProductNameRef],
  (data, fn) => {
    const names =
      data.ids &&
      data.ids.length >= 0 &&
      data.ids.map(d => ({
        id: d,
        name: fn({ id: d }),
      }));
    const res = names && names.filter(o => o.name === data.name);
    if (res && res.length > 0) {
      return res[0].id;
    }
    return null;
  },
)((state, props) => `makeSelectProductIdFilterByName${props.type}`);
