import dotProp from 'dot-prop-immutable';
import { get } from 'lodash';

import {
  ACTIVITY,
  EVENTS,
  DAY,
  TAB_TIMELINE,
  TAB_GALLERY,
  TEMPLATE,
} from 'utils/modelConstants';
import arrays from './arrays';

const updateChildren = (id, children) => tabs =>
  dotProp.set(tabs, `${id}.children`, children);

const convertChildrenToArray = (tabType, tabChildren) => {
  switch (tabType) {
    case TAB_TIMELINE:
      return convertTabTimelineChildrenToArray(tabChildren);
    case TEMPLATE:
    case TAB_GALLERY:
      return arrays.convertNextNodesToArray(tabChildren);
    default:
      return arrays.convert(tabChildren);
  }
};

const convertTabTimelineChildrenToArray = tabChildren => {
  const getFirstType = arr => arr && arr[0] && arr[0].type;
  const onShouldConvertAll = children => {
    const type = getFirstType(children);
    return type === ACTIVITY || EVENTS.includes(type);
  };
  const onUpdate = (parent, convertedChildren) => {
    switch (parent.type) {
      case DAY: {
        // Strip events as they're stored in separate array(s)
        const activities = convertedChildren.find(
          arr => getFirstType(arr) === ACTIVITY,
        );
        return dotProp.set(parent, 'children', activities || []);
      }

      default: {
        return dotProp.set(parent, 'children', convertedChildren);
      }
    }
  };

  // Strip events as they're stored in separate array(s)
  const days = tabChildren.find(c => c && c.type === DAY);
  return arrays.convert([days], onShouldConvertAll, onUpdate);
};

const moveChildren = (
  tabId,
  source,
  destination,
  type = 'children',
) => tabs => {
  const children = dotProp.get(tabs, `${tabId}.${type}`, []);
  if (!children.length) return tabs;

  const child = get(children, source);
  const remove = [...children.slice(0, source), ...children.slice(source + 1)];

  const newChildren = [
    ...remove.slice(0, destination),
    child,
    ...remove.slice(destination),
  ];

  return dotProp.set(tabs, `${tabId}.${type}`, newChildren);
};

const moveRemoveChildren = (
  sourceId,
  targetId,
  source,
  destination,
  type = 'children',
) => nodes => {
  const sourceChildren = dotProp.get(nodes, `${sourceId}.${type}`, []);
  const targetChildren = dotProp.get(nodes, `${targetId}.${type}`, []);
  if (!sourceChildren.length) return nodes;

  const child = get(sourceChildren, source);
  // remove
  const remove = [
    ...sourceChildren.slice(0, source),
    ...sourceChildren.slice(source + 1),
  ];

  const newChildren = [
    ...targetChildren.slice(0, destination),
    child,
    ...targetChildren.slice(destination),
  ];
  return dotProp.set(
    dotProp.set(nodes, `${targetId}.${type}`, newChildren),
    `${sourceId}.${type}`,
    remove,
  );
};

export default {
  updateChildren,
  convertChildrenToArray,
  moveChildren,
  moveRemoveChildren,
};
