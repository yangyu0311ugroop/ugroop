import { CREATE_LINK, DELETE_LINK, NODE_API } from 'apis/constants';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Name from 'smartComponents/Node/parts/Name';
import Status from 'smartComponents/Node/parts/Status';
import { PARTICIPANT } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import withResaga from 'resaga';

export const ParticipantItem = props => {
  const {
    id,
    resaga,
    linkId,
    groupId,
    hideAddButton,
    hideDeleteButton,
  } = props;

  const handleAdd = () =>
    resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id,
        data: {
          nextNodeId: groupId,
          action: 'group',
          actionContent: {
            type: 'travelgroup',
          },
        },
        prevNodeChildKey: 'groups',
        nextNodeChildKey: 'participants',
        upsertLinkId: true,
      },
    });

  const handleDelete = () =>
    resaga.dispatchTo(NODE_API, DELETE_LINK, {
      payload: {
        id,
        fk: groupId,
        linkKey: linkId,
        nextNodeChildKey: 'participants',
        prevNodeChildKey: 'groups',
        // removedPrevLinkId: false,
        removeLinkId: true,
      },
    });

  return (
    <GridContainer alignItems="center">
      <GridItem xs>
        <GridContainer alignItems="center">
          <GridItem>
            <Name id={id} variant={VARIANTS.AVATAR} />
          </GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText bold>
                  <Name id={id} variant={VARIANTS.TEXT_ONLY} />
                </JText>
              </GridItem>
              <GridItem>
                <JText>
                  <Status type={PARTICIPANT} id={id} />
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        {!hideAddButton && (
          <Button
            iconButton
            square
            icon="plus"
            size="extraSmall"
            dense
            color="primary"
            onClick={handleAdd}
            testId="addParticipantToGroup"
          />
        )}
        {!hideDeleteButton && (
          <Button
            iconButton
            square
            icon="trash2"
            size="extraSmall"
            dense
            color="alert"
            onClick={handleDelete}
            testId="removeParticipantToGroup"
          />
        )}
      </GridItem>
    </GridContainer>
  );
};

ParticipantItem.propTypes = {
  resaga: PropTypes.object.isRequired,
  id: PropTypes.number,
  linkId: PropTypes.number,
  groupId: PropTypes.number,
  hideAddButton: PropTypes.bool,
  hideDeleteButton: PropTypes.bool,
};

export default withResaga()(ParticipantItem);
