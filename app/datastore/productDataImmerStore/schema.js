import { schema } from 'normalizr';
const product = new schema.Entity('product');
const products = [product];

export default {
  products,
};
