import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import { compose } from 'redux';
import { normalize } from 'normalizr';
import get from 'lodash/get';
import assign from 'lodash/assign';
import { DATASTORE_UTILS } from 'datastore';
import TabHelper from 'datastore/templateManagementStore/helpers/tabs';
import { TAB_GALLERY } from 'utils/modelConstants';

export const TEMPLATE_TAB_UTILS = {
  addTab: result => {
    const normalizedNode = normalize(result, NODE_SCHEMA.singleNode);
    return {
      nodes: DATASTORE_UTILS.upsertObject(normalizedNode.entities.node),
    };
  },
  addMultipleNode: (result = []) => {
    const nodes = [];
    const tempResult = [...result];

    tempResult.forEach(node => {
      const processedResult = TabHelper.convertChildrenToArray(
        node.type,
        node.children,
      );
      const normalizedNode = normalize(processedResult, NODE_SCHEMA.node);
      nodes.push(normalizedNode);
    });

    // replace tab children with ids rather than objects
    const transformedResult = result
      .map((node, index) => {
        const tempNode = node;
        tempNode.children = nodes[index].result;
        tempNode.index = index;
        return tempNode;
      })
      .filter(node => node.type !== TAB_GALLERY);

    const photos = nodes.reduce(
      (acc, { entities }) => assign(acc, entities.photo),
      {},
    );

    const eventNodes = nodes.reduce(
      (acc, { entities }) => assign(acc, entities.eventNodes),
      {},
    );

    const nonTabNodes = nodes.reduce(
      (acc, { entities }) => assign(acc, entities.node),
      {},
    );

    const parentArr = result.filter(item => !!item.parentNodeId);

    const tabNodes = normalize(transformedResult, NODE_SCHEMA.node);
    let templateId = get(result, '0.parentNodeId');
    if (!templateId) {
      templateId = get(parentArr, '0.parentNodeId');
    }

    return {
      nodes: compose(
        DATASTORE_UTILS.upsertObject(nonTabNodes),
        DATASTORE_UTILS.upsertObject(eventNodes),
        DATASTORE_UTILS.upsertObject(tabNodes.entities.node),
        DATASTORE_UTILS.upsertArray(
          `${templateId}.calculated.events`,
          DATASTORE_UTILS.getObjectIds(eventNodes),
        ),
      ),
      files: DATASTORE_UTILS.upsertObject(photos),
      result: tabNodes.result,
    };
  },
};
