import _ from 'lodash';

const updateState = (state, filter, keys, values) => {
  // TODO: optimise the code to use deep clone.
  const cloneState = _.cloneDeep(state);
  const index = _.findIndex(cloneState, filter);
  let i = 0;
  if (index !== -1) {
    keys.forEach(key => {
      cloneState[index][key] = values[i];
      i += 1;
    });
  }
  return { cloneState, index };
};

export { updateState };
