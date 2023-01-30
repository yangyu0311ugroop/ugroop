import utils from 'datastore/templateManagementStore/helpers/utils';
import dotProp from 'dot-prop-immutable';
import { get } from 'lodash';

const moveBefore = operation => days => utils.move(days, operation);

const moveAfter = operation => days => utils.move(days, operation, 1);

const moveAcross = operationList => days => {
  if (operationList.size) {
    return operationList.reduce(
      (updatedDays, operation) => moveAcross(operation)(updatedDays),
      days,
    );
  }

  if (utils.isNotMoving(operationList)) {
    return days;
  }

  return moveAfter(operationList)(days);
};

const insertToBeMovedId = ({ dayId, id }) => (toBeMovedIds = {}) =>
  dotProp.merge(toBeMovedIds, `${dayId}`, [id]);

const insertToBeMovedData = (id, data) => (toBeMovedData = {}) =>
  dotProp.merge(toBeMovedData, `${id}`, data);

const removeToBeMovedId = ({ dayId, id }) => (toBeMovedIds = {}) => {
  const ids = get(toBeMovedIds, `${dayId}`, []);
  const index = ids.indexOf(id);
  return dotProp.delete(toBeMovedIds, `${dayId}.${index}`);
};

const removeToBeMovedData = id => (toBeMovedData = {}) =>
  dotProp.delete(toBeMovedData, `${id}`);

export default {
  moveAcross,
  moveBefore,
  moveAfter,
  insertToBeMovedId,
  removeToBeMovedId,
  insertToBeMovedData,
  removeToBeMovedData,
};
