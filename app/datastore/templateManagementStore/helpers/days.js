import dotProps from 'dot-prop-immutable';
import utils from 'datastore/templateManagementStore/helpers/utils';

const moveBefore = operation => tabs => utils.move(tabs, operation);

const moveAfter = operation => tabs => utils.move(tabs, operation, 1);

const updateChildren = children => days =>
  Object.keys(children).reduce(
    (newDays, id) => dotProps.set(newDays, `${id}.children`, children[id]),
    days,
  );

const checkAll = (id, sectionIds) => toBeMovedIds => ({
  ...toBeMovedIds,
  [id]: sectionIds,
});

const checkAllData = (id, sectionIds) => toBeMovedData => ({
  ...toBeMovedData,
  ...sectionIds.reduce(
    (accm, sectionId) => ({ ...accm, [sectionId]: { dayId: id } }),
    {},
  ),
});

const uncheckAll = id => toBeMovedIds => dotProps.delete(toBeMovedIds, id);

const insertSectionIds = (id, sectionIds) => days => ({
  ...days,
  [id]: sectionIds,
});

export default {
  moveBefore,
  moveAfter,
  updateChildren,
  checkAll,
  checkAllData,
  uncheckAll,
  insertSectionIds,
};
