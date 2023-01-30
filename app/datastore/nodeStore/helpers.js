import {
  CLOSED,
  COMPLETED,
  DEFAULT,
  DO_NOTHING,
  MY_TOURS,
  MY_TOURS_NODE_CONTENT,
  MY_TOURS_NODE_CONTENT_2,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { get, uniq, without } from 'lodash';
import dropRight from 'lodash/dropRight';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import {
  ACTIVITY,
  CHECKGROUP,
  CHILDREN,
  GROUP,
  INTERESTED_PEOPLE,
  INTERESTED_PERSON,
  PARTICIPANT,
  PARTICIPANTS,
  TEMPLATE,
  TOUR,
  SECTION,
  TAB,
  TAB_OTHER,
} from 'utils/modelConstants';
import { INPUT_UTILS } from 'ugcomponents/Inputs';

const concatIfNotExist = ids => {
  if (!Array.isArray(ids)) {
    return concatIfNotExist([ids]);
  }

  return (array = []) => uniq([...array, ...ids]);
};

const deleteIfExist = ids => {
  if (!Array.isArray(ids)) {
    return deleteIfExist([ids]);
  }

  return (array = []) => without(array, ...ids);
};

const translateType = type =>
  LOGIC_HELPERS.switchCase(type, {
    [TEMPLATE]: TOUR,
    [TAB_OTHER]: TAB,
    [ACTIVITY]: SECTION,
    [CHECKGROUP]: GROUP,
    [DEFAULT]: type,
  });

const removeChildId = (id, props) => {
  const { childKey, resaga } = props;

  if (!childKey) {
    return DO_NOTHING;
  }

  return resaga.setValue({
    [childKey]: deleteIfExist(id),
  });
};

const remainingPredicate = ({ remaining = 0, completed = 0 }, status) => {
  if (status === undefined) return { remaining, completed };

  return status !== COMPLETED
    ? { remaining: remaining + 1, completed }
    : { remaining, completed: completed + 1 };
};

const openClosedPredicate = ({ open = 0, closed = 0 }, status) => {
  if (status === undefined) return { open, closed };

  return status !== CLOSED
    ? { open: open + 1, closed }
    : { open, closed: closed + 1 };
};

const calculateRemaining = (...results) =>
  results.reduce(NODE_STORE_HELPERS.remainingPredicate, {});

const calculateOpenClosed = (...results) =>
  results.reduce(NODE_STORE_HELPERS.openClosedPredicate, {});

const calculateProgress = ({ remaining = 0, completed = 0 }) => {
  const total = remaining + completed;
  if (!total) return 0;

  const progress = Math.round((100 / total) * completed);

  return Math.max(0, progress);
};

const calculateTotal = ({ remaining = 0, completed = 0 }) =>
  Math.max(0, remaining + completed);

const translateContent = content => {
  if (content === MY_TOURS_NODE_CONTENT) {
    return MY_TOURS;
  }

  if (content === MY_TOURS_NODE_CONTENT_2) {
    return MY_TOURS;
  }

  return content;
};

const pathToNodeInputName = (path, { nameKey = 'node' } = {}) => {
  const pathArray = [
    ...ARRAY_HELPERS.arrayIfNot(nameKey),
    ...ARRAY_HELPERS.arrayIfNot(path),
  ];
  return INPUT_UTILS.storePathToInputName(pathArray);
};
const processTemplateSettings = data => {
  const { id, customData } = data;
  const value = get(customData, 'value', null);
  return {
    id,
    value,
  };
};
const attributeSelector = value => get(value, 'customData.key', 0);
const processHashkey = ({ hashkey }) => hashkey;

/**
 * Returns a node's child key based on child node type.
 * @returns {*}
 */
const getChildKey = type => {
  switch (type) {
    case PARTICIPANT:
      return PARTICIPANTS;
    case INTERESTED_PERSON:
      return INTERESTED_PEOPLE;
    default:
      return CHILDREN;
  }
};

const nextNodeIds = (followersKey = 'followers') => ({
  keyPath: ({ [followersKey]: followers = [] }) =>
    followers.map(followerId =>
      NODE_STORE_SELECTORS.linkProp(['nextNodeId'])({ id: followerId }),
    ),
  cacheKey: ({ [followersKey]: followers }) =>
    `Link.types.Guardian.Followers.${
      Array.isArray(followers) ? followers.toString() : 'null'
    }`,
  props: () => null,
  getter: (...args) => dropRight(args),
});

export const NODE_STORE_HELPERS = {
  translateContent,
  translateType,
  concatIfNotExist,
  deleteIfExist,
  removeChildId,
  remainingPredicate,
  openClosedPredicate,
  calculateProgress,
  calculateTotal,
  calculateRemaining,
  calculateOpenClosed,
  pathToNodeInputName,
  processTemplateSettings,
  attributeSelector,
  processHashkey,
  getChildKey,
  nextNodeIds,
};
