import React from 'react';
import PropTypes from 'prop-types';
import resagaHOC from 'resaga';
import { TOUR_CONTRIBUTOR_ROLE } from 'apis/components/Ability/roles';
import {
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
  TOUR_CONNECTION_MODES,
} from 'datastore/templateManagementStore/selectors';
import { useSelector } from 'react-redux';
import Invitee from '../Invitee';
import InviteePublic from '../Invitee/public';
import { makeSingleSelect } from '../../../../../../datastore/selectUtility';
import { NODE_STORE_RESELECTORS } from '../../../../../../datastore/nodeStore/selectorsViaConnect';

function InviteeByOwner(props) {
  const { templateId, renderPublic } = props;
  const userId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: 'createdBy',
    }),
  );
  const content = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: 'content',
    }),
  );
  const handleSeeDetail = () => {
    props.resaga.setValue({
      tourConnectionOpen: true,
      tourConnectionId: templateId,
      tourConnectionUserId: userId,
      tourConnectionMode: TOUR_CONNECTION_MODES.owner,
    });
  };
  if (renderPublic) {
    return (
      <InviteePublic
        role={TOUR_CONTRIBUTOR_ROLE.TOUR_OWNER}
        emailLinkSubject={content}
        userId={userId}
        templateId={templateId}
        content={content}
      />
    );
  }

  return (
    <Invitee
      onSeeDetail={handleSeeDetail}
      role={TOUR_CONTRIBUTOR_ROLE.TOUR_OWNER}
      emailLinkSubject={content}
      accepted
      userId={userId}
      templateId={templateId}
      content={content}
    />
  );
}

InviteeByOwner.propTypes = {
  resaga: PropTypes.object,
  templateId: PropTypes.number,
  renderPublic: PropTypes.bool,
};

InviteeByOwner.defaultProps = {
  templateId: 0,
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
})(React.memo(InviteeByOwner));
