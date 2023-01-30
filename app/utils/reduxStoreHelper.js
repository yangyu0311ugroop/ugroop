/**
 * Created by Yang on 28/2/17.
 */
const getDataStoreState = (state, storeName) =>
  state.find((element, key) => key === storeName);

export { getDataStoreState };
