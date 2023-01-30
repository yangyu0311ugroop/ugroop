import { schema } from 'normalizr';

const phone = new schema.Entity('phone');
const phones = [phone];
const passport = new schema.Entity('passport');
const passports = [passport];

const insurancePolicy = new schema.Entity('insurancePolicy');
const insurancePolicies = [insurancePolicy];

export const PHONE_STORE_SCHEMA = {
  phone,
  phones,
  passports,
  insurancePolicies,
};
