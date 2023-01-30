import createCachedSelector from 're-reselect';

function makeCacheKey({ inputSelectors = [] } = {}) {
  const keySelectors = inputSelectors;
  return (...args) => {
    if (args[1] != null) {
      return `${keySelectors[0].name}.${JSON.stringify(args[1])}`;
    }
    return '';
  };
}

const makeCacheKeyTimeLine = timeStamp => ({ inputSelectors = [] } = {}) => {
  const keySelectors = inputSelectors;
  return (...args) => {
    if (args[1] != null) {
      return `${keySelectors[0].name}.${JSON.stringify(args[1])}.${timeStamp}`;
    }
    return '';
  };
};

export const makeSingleSelect = selector =>
  createCachedSelector(selector, select => select)({
    keySelectorCreator: makeCacheKey,
  });

// this function will refetch the result, when timeline pass in has changed.
export const makeSingleSelectByTimestamp = (selector, timestamp) =>
  createCachedSelector(selector, select => select)({
    keySelectorCreator: makeCacheKeyTimeLine(timestamp),
  });
