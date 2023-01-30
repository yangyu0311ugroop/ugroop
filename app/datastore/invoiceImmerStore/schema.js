import { schema } from 'normalizr';

const lineItem = new schema.Entity('lineItem');
const listLineItem = new schema.Array(lineItem);
const currentInvoiceLineItem = new schema.Entity('lineItem');
const currentListLineItem = new schema.Array(currentInvoiceLineItem);
const invoice = new schema.Entity(
  'invoice',
  {
    lines: {
      data: [lineItem],
    },
  },
  {
    idAttribute: value => `${value.customer}_upcomingInvoice`,
  },
);

const currentInvoice = new schema.Entity(
  'invoice',
  {
    lines: {
      data: [currentInvoiceLineItem],
    },
  },
  {
    idAttribute: value => `${value.customer}_currentInvoice`,
  },
);

export default {
  invoice,
  lineItem,
  listLineItem,
  currentInvoice,
  currentInvoiceLineItem,
  currentListLineItem,
};
