import { DATASTORE_UTILS } from 'datastore';
import { normalize } from 'normalizr';
import schema from 'datastore/productDataImmerStore/schema';

const addProducts = result => {
  const normalizedData = normalize(result.data, schema.products);
  return {
    products: DATASTORE_UTILS.upsertObject(normalizedData.entities.product),
    ids: normalizedData.result,
    productsData: normalizedData.entities.product,
  };
};

export const PRODUCTS_NORMALISERS = {
  addProducts,
};
