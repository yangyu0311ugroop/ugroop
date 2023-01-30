import React from 'react';
import PropTypes from 'prop-types';
import resagaHOC from 'resaga';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import InviteePublic from '../Invitee/public';
import { INVITATION_STORE_SELECTORS } from '../../../../../../datastore/invitationStore/selectors';
import { NODE_STORE } from '../../../../../../appConstants';

function InviteeByUserNodePublic(props) {
  const { userId, role, content, templateId, userNodeId } = props;

  return (
    <InviteePublic
      emailLinkSubject={content}
      userId={userId}
      role={role}
      templateId={templateId}
      userNodeId={userNodeId}
    />
  );
}

InviteeByUserNodePublic.propTypes = {
  templateId: PropTypes.number,
  userId: PropTypes.number,
  role: PropTypes.string,
  content: PropTypes.string,
  userNodeId: PropTypes.number,
};

InviteeByUserNodePublic.defaultProps = {
  templateId: 0,
  userId: 0,
  role: null,
};

export default resagaHOC({
  value: {
    userId: ({ userNodeId: id }) =>
      INVITATION_STORE_SELECTORS.userNodeUserId({ id }),
    role: ({ userNodeId: id }) =>
      INVITATION_STORE_SELECTORS.userNodeRole({ id }),
    content: ({ templateId: id }) => [NODE_STORE, 'nodes', id, 'content'],
  },
  setValue: {
    tourConnectionOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.open,
    tourConnectionId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.id,
    tourConnectionMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.mode,
  },
})(InviteeByUserNodePublic);
