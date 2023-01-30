import { schema } from 'normalizr';

const charges = new schema.Entity('charges');

const customers = new schema.Entity('customers', {
  charges: [charges],
});

export const CHARGES_SCHEMA = {
  customers,
};
