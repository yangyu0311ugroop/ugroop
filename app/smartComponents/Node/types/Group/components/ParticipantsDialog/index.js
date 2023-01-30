import JText from 'components/JText';
import {
  LINK_STORE_RESELECTORS,
  NODE_STORE_RESELECTORS,
} from 'datastore/nodeStore/selectorsViaConnect';
import { TEMPLATE_DATASTORE_RESELECTORS } from 'datastore/templateManagementStore/selectorsViaConnect';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import JDialog from 'ugcomponents/JDialog';
import Content from 'smartComponents/Node/parts/Content';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import zip from 'lodash/zip';

import ParticipantItem from '../ParticipantItem';

const useGetParticipantsInTheGroup = id => {
  const participantIds = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipants(state, id),
  );
  const prevNodeIds = useSelector(state =>
    LINK_STORE_RESELECTORS.getLinkPrevNodeIds(state, participantIds),
  );
  const linkWithNodeIds = zip(participantIds, prevNodeIds);

  return linkWithNodeIds;
};

const useParticipantIds = () => {
  const templateId = useSelector(state =>
    TEMPLATE_DATASTORE_RESELECTORS.getCurrentTemplateId(state),
  );
  const participantIds = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipants(state, templateId),
  );
  const participantsWithNoGroup = useSelector(state =>
    NODE_STORE_RESELECTORS.getParticipantsNotTravellingWith(
      state,
      participantIds,
    ),
  );

  return participantsWithNoGroup;
};

export const ParticipantsDialog = props => {
  const { open, onClose, id: groupId } = props;
  const ids = useParticipantIds();
  const pGroupIds = useGetParticipantsInTheGroup(groupId);

  return (
    <JDialog
      open={open}
      onClose={onClose}
      headerNoWrap
      header={
        <JText bold>
          <Content id={groupId} variant={VARIANTS.TEXT_ONLY} />
        </JText>
      }
      hideSubmitButton
      maxWidth="xs"
      fullWidth
    >
      <GridContainer direction="column">
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <JText italic gray>
                Participants in the group
              </JText>
            </GridItem>
            <GridItem>
              {pGroupIds.length === 0 ? (
                <JText>No participants in this group</JText>
              ) : (
                pGroupIds.map(pGroupId => (
                  <ParticipantItem
                    groupId={groupId}
                    hideAddButton
                    id={pGroupId[1]}
                    linkId={pGroupId[0]}
                  />
                ))
              )}
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <JText italic gray>
                Participants with no group yet
              </JText>
            </GridItem>
            <GridItem>
              {ids.length === 0 ? (
                <JText>No assignable participants</JText>
              ) : (
                ids.map(id => (
                  <ParticipantItem groupId={groupId} hideDeleteButton id={id} />
                ))
              )}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </JDialog>
  );
};

ParticipantsDialog.propTypes = {
  id: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ParticipantsDialog;
