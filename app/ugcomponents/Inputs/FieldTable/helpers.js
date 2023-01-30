/**
 * Created by stephenkarpinskyj on 24/4/18.
 */

import arrayHelpers from 'utils/helpers/arrays';

/**
 * Converts all values as existing (ie. with id's).
 */
const modelToArray = model => {
  if (model) {
    return Object.entries(model).map(([id, values]) => ({ id, ...values }));
  }

  return null;
};

/**
 * Converts all values as new (ie. without id's).
 */
const modelToPostArray = model =>
  model ? Object.values(model).map(({ id, ...rest }) => rest) : null;

/**
 * Converts all values as new/existing/removed based on defaultValues.
 */
const modelToPatchArray = (model, defaultValues) => {
  if (model) {
    const upsertedValues = Object.entries(model).reduce((array, [id, data]) => {
      const numberId = parseInt(id, 10);
      const defaultModel = defaultValues
        ? defaultValues.find(e => e.id === numberId)
        : null;
      const converted = defaultModel ? { id: numberId, ...data } : data; // Skip id if new data
      return arrayHelpers.mergeAppending(array, [converted]);
    }, []);

    let deletedValues = null;

    if (defaultValues) {
      deletedValues = defaultValues.reduce((array, { id }) => {
        const upserted = upsertedValues.find(e => e.id === id);
        return upserted
          ? array
          : arrayHelpers.mergeAppending(array, [{ id, isDeleted: true }]);
      }, []);
    }

    return arrayHelpers.mergeAppending(upsertedValues, deletedValues);
  }

  return null;
};

/**
 * Converts flat/'dot notation' table values to array of objects.
 */
// TODO: Remove if Formsy.onChange gets fixed: https://github.com/formsy/formsy-react/issues/47
const dotNotationToArray = (tableName, tableValues) => {
  if (tableName && tableValues) {
    const isMatching = key => key.match(`^${tableName}\\.[0-9]+\\..+`);
    const keys = Object.keys(tableValues).filter(isMatching);
    const rows = {};
    keys.forEach(key => {
      // TODO: Handle rows with deeper nested properties
      const split = key.split('.');
      const rowId = split[1];
      const propertyKey = split[2];
      if (!rows[rowId]) rows[rowId] = {};
      rows[rowId][propertyKey] = tableValues[key];
    });
    return Object.entries(rows).map(([id, rowValues]) => ({
      id,
      ...rowValues,
    }));
  }
  return [];
};

export default {
  modelToArray,
  modelToPostArray,
  modelToPatchArray,
  dotNotationToArray,
};
