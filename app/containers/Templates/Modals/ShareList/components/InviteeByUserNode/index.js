import React from 'react';
import PropTypes from 'prop-types';
import resagaHOC from 'resaga';
import {
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
  TOUR_CONNECTION_MODES,
} from 'datastore/templateManagementStore/selectors';
import Invitee from '../Invitee';

function InviteeByUserNode(props) {
  const { userNodeId, userId, role, content, templateId, email } = props;

  const handleSeeDetail = () => {
    props.resaga.setValue({
      tourConnectionOpen: true,
      tourConnectionId: userNodeId,
      tourConnectionMode: TOUR_CONNECTION_MODES.userNode,
    });
  };

  return (
    <Invitee
      onSeeDetail={handleSeeDetail}
      emailLinkSubject={content}
      accepted
      userId={userId}
      role={role}
      templateId={templateId}
      userNodeId={userNodeId}
      email={email}
    />
  );
}

InviteeByUserNode.propTypes = {
  resaga: PropTypes.object,
  templateId: PropTypes.number,
  userNodeId: PropTypes.number,
  userId: PropTypes.number,
  role: PropTypes.string,
  content: PropTypes.string,
  email: PropTypes.string,
};

InviteeByUserNode.defaultProps = {
  templateId: 0,
  userNodeId: 0,
  userId: 0,
  role: null,
};

export default resagaHOC({
  setValue: {
    tourConnectionOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.open,
    tourConnectionId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.id,
    tourConnectionMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.mode,
  },
})(InviteeByUserNode);
