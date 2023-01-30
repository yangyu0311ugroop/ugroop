import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { TEMPLATE_DATASTORE_RESELECTORS } from 'datastore/templateManagementStore/selectorsViaConnect';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { VARIANTS } from 'variantsConstants';
import withResaga from 'resaga';

import Button from 'viewComponents/Button';

export const AddParticipantButton = props => {
  const templateId = useSelector(state =>
    TEMPLATE_DATASTORE_RESELECTORS.getCurrentTemplateId(state),
  );
  const { resaga, id } = props;

  const handleClick = () => {
    resaga.setValue({
      participantCreateOpen: true,
      participantCreateParentNodeId: templateId,
      participantCreateMode: null,
      groupId: id,
      participantInGroup: true,
    });
  };

  return (
    <Button
      variant={VARIANTS.INLINE}
      dense
      size="extraSmall"
      color="primary"
      onClick={handleClick}
    >
      Add PAX
    </Button>
  );
};

AddParticipantButton.propTypes = {
  resaga: PropTypes.object.isRequired,
  id: PropTypes.number,
};

export default withResaga({
  setValue: {
    participantCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
    participantCreateParentNodeId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.parentNodeId,
    participantCreateMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.mode,
    groupId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.groupId,
    participantInGroup:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE
        .participantInGroup,
  },
})(AddParticipantButton);
