import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import InviteePublic from 'containers/Templates/Modals/ShareList/components/Invitee/public';
import { useSelector } from 'react-redux';

export const AssignedOrganiserInfo = memo(({ templateId, id, responsive }) => {
  const createdBy = useSelector(state =>
    NODE_STORE_RESELECTORS.getCreatedBy(state, templateId),
  );
  const content = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeContent(state, templateId),
  );
  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, templateId),
  );
  const { origin } = window.location;
  const publicUrl = `${origin}/public/template/${hashkey}`;
  const role = createdBy === id ? 'tour_owner' : 'tour_organizer';

  return (
    <InviteePublic
      userId={id}
      templateId={templateId}
      role={role}
      phoneNoMargin
      emailLinkSubject={content}
      emailLinkBody={`Visit the link to view: ${publicUrl}`}
      showCustomRoleAsValue
      adjustAvatarSmDown={responsive}
    />
  );
});

AssignedOrganiserInfo.propTypes = {
  id: PropTypes.number,
  templateId: PropTypes.number,
  responsive: PropTypes.bool,
};
