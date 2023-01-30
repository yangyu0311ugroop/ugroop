import { DEFAULT } from 'appConstants';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { AssignedOrganiserEditable } from 'smartComponents/Node/parts/AssignedOrganiser/AssignedOrganiserEditable';
import { AssignedOrganiserInfo } from 'smartComponents/Node/parts/AssignedOrganiser/AssignedOrganiserInfo';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';

export const AssignedOrganiser = memo(({ id, variant }) => {
  const createdBy = useSelector(state =>
    NODE_STORE_RESELECTORS.getCreatedBy(state, id),
  );
  const assignedOrganiserId = useSelector(store =>
    NODE_STORE_RESELECTORS.getAssignedOrganiser(store, id),
  );
  const userId = assignedOrganiserId || createdBy;

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.READ_ONLY]: (
      <AssignedOrganiserInfo templateId={id} id={userId} responsive />
    ),
    [DEFAULT]: <AssignedOrganiserEditable templateId={id} id={id} />,
  });
});

AssignedOrganiser.propTypes = {
  id: PropTypes.number,
  variant: PropTypes.string,
};

export default memo(AssignedOrganiser);
