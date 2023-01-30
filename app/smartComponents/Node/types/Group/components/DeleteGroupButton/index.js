import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DEFAULT, NODE_STORE, LINK, MENU_ITEM } from 'appConstants';
import {
  LINK_STORE_RESELECTORS,
  NODE_STORE_RESELECTORS,
} from 'datastore/nodeStore/selectorsViaConnect';
import { TEMPLATE_DATASTORE_RESELECTORS } from 'datastore/templateManagementStore/selectorsViaConnect';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import withResaga from 'resaga';
import { GROUP } from 'utils/modelConstants';

import DeleteButton from 'viewComponents/DeleteButton';
import JText from 'components/JText';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import MenuItem from 'components/Popper/components/MenuItem';

export const useGetParticipantLinksInGroup = id => {
  const participantLinks = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipants(state, id),
  );

  return participantLinks;
};
export const DeleteGroupButton = props => {
  const { id, label, closeMenu } = props;
  const templateId = useSelector(state =>
    TEMPLATE_DATASTORE_RESELECTORS.getCurrentTemplateId(state),
  );
  const participantLinks = useGetParticipantLinksInGroup(id);
  const participantIds = useSelector(state =>
    LINK_STORE_RESELECTORS.getLinkPrevNodeIds(state, participantLinks),
  );

  let dialogId = 0;

  const onClick = ({ onClose }) => {
    NODE_API_HELPERS.deleteNode(
      {
        nodeId: id,
        parent: templateId,
        childKey: 'groups',
        type: GROUP,
        dependentIds: participantIds,
        dependentLinkIds: participantLinks,
        onSuccess: onClose,
      },
      props,
    );
  };

  const closePortal = () => {
    PORTAL_HELPERS.closePortal(dialogId, props);
  };

  const onClickPortal = () => {
    NODE_API_HELPERS.deleteNode(
      {
        nodeId: id,
        parent: templateId,
        childKey: 'groups',
        type: GROUP,
        dependentIds: participantIds,
        dependentLinkIds: participantLinks,
        onSuccess: closePortal,
        onError: closePortal,
      },
      props,
    );
  };

  const confirmDelete = () => {
    dialogId = PORTAL_HELPERS.confirmDelete(
      {
        title: 'Remove Group',
        message: 'Are you sure you want to remove this group?',
        onConfirm: onClickPortal,
        closeOnConfirm: false,
      },
      props,
    );
  };

  const renderLink = prop => (
    <JText italic danger link onClick={prop.onClick} underline>
      {label}
    </JText>
  );
  const linkButton = () => (
    <DeleteButton
      iconButton={false}
      onClick={onClick}
      text="Delete Group"
      renderProp
    >
      {renderLink}
    </DeleteButton>
  );

  const renderDefault = () => (
    <DeleteButton iconButton={false} onClick={onClick} text="Delete Group" />
  );
  const renderMenuItem = () => (
    <MenuItem icon="lnr-exit" closeMenu={closeMenu} onClick={confirmDelete}>
      <JText danger>{label}</JText>
    </MenuItem>
  );

  return LOGIC_HELPERS.switchCase(props.variant, {
    [LINK]: linkButton,
    [MENU_ITEM]: renderMenuItem,
    [DEFAULT]: renderDefault,
  });
};

DeleteGroupButton.propTypes = {
  resaga: PropTypes.object.isRequired,
  id: PropTypes.number,
  label: PropTypes.string,
  variant: PropTypes.string,
  closeMenu: PropTypes.func,
};

export default withResaga({
  setValue: {
    nodes: [NODE_STORE, 'nodes'],
    linkIds: [NODE_STORE, 'linkIds'],
    ...PORTAL_HELPERS.setValue,
  },
})(DeleteGroupButton);
