import conversions from 'conversions';

export const unitOfDistanceCoverter = (value = 0, to = 'km', from = 'm') =>
  conversions(value, from, to);

export const CONVERTERS = {
  unitOfDistanceCoverter,
};
