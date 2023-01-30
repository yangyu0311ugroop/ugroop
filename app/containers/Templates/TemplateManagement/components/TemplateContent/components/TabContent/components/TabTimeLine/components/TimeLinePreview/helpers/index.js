const FirstElement = 0;

function convertToArrayLists(data) {
  const lists = [];
  let index = 1;
  if (data && data.length > 0) {
    // has day 0
    const firstNode = data[FirstElement];
    lists.push({ id: firstNode.id, title: `Day ${index}` });
    let hasNextChildren = firstNode.nextNodes;
    while (hasNextChildren.length > 0) {
      index += 1;
      lists.push({
        id: hasNextChildren[FirstElement].id,
        title: `Day ${index}`,
      });
      hasNextChildren = hasNextChildren[FirstElement].nextNodes;
    }
  }
  return lists;
}

function traverseToLastNode(data) {
  let node = data[FirstElement];
  while (node && node.nextNodes.length > 0) {
    node = node.nextNodes[0];
  }
  return node;
}

export default { convertToArrayLists, traverseToLastNode };
