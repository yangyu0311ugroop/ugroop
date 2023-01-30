import { PHONE_DATA_STORE } from 'appConstants';
import createCachedSelector from 're-reselect';

const getDefaultPhoneNumber = createCachedSelector(
  state => state.get(PHONE_DATA_STORE).get('phones'),
  (_, ids) => ids,
  (phones, ids = []) => {
    const filtered = ids.filter(id => phones[id].isDefault);

    if (filtered.length === 0) return null;
    const phoneId = filtered[0];
    return phones[phoneId].number;
  },
)((_, ids = []) => `getDefaultPhoneNumber.${ids.toString()}`);

export const PHONE_STORE_RESELECTORS = {
  getDefaultPhoneNumber,
};
