import { schema, normalize } from 'normalizr';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DEFAULT_NODE_SHARE_TOUR_ID } from 'appConstants';
const nodes = new schema.Entity(
  'trail',
  {},
  {
    // transform object to remain consistency (avoid renaming node property)
    processStrategy: ({ id, name, status }) => ({
      id: LOGIC_HELPERS.ifElse(!id, DEFAULT_NODE_SHARE_TOUR_ID, id),
      content: name,
      name,
      status,
    }),
  },
);
const procBreanCrumbsTrail = data => ({
  id: data.id,
  trail: data.trail.map(trail =>
    LOGIC_HELPERS.ifElse(
      !trail.id,
      { id: DEFAULT_NODE_SHARE_TOUR_ID, ...trail },
      trail,
    ),
  ),
});
const breadcrumb = new schema.Entity(
  'breadcrumb',
  {
    trail: [nodes],
  },
  { processStrategy: procBreanCrumbsTrail },
);

export const breadcrumbNormaliser = data => {
  const { entities, result } = normalize(data, breadcrumb);
  return {
    breadcrumb: entities.breadcrumb,
    trail: entities.trail,
    nodes: entities.trail,
    id: result,
  };
};

export const NODE_TRAIL_NORMALISERS = {
  breadcrumbNormaliser,
};

export default {
  breadcrumb,
};
