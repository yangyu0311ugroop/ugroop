import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JDialog from 'ugcomponents/JDialog';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import withResaga from 'resaga';

export const CreateGroupDialog = props => {
  const { open, onClose, templateId } = props;

  const handleValidSubmit = ({ content }) => {
    const node = {
      type: 'group',
      parentNodeId: templateId,
      content,
      customData: {
        type: 'travelgroup',
      },
    };
    NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId: templateId,
        childKey: 'groups',
        onSuccess: onClose,
        onError: onClose,
      },
      props,
    );
  };

  return (
    <JDialog
      onValidSubmit={handleValidSubmit}
      denseTitle
      headerNoWrap
      open={open}
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      header={<JText bold>Create Group</JText>}
    >
      <GridContainer direction="column">
        <GridItem>
          <TextField label="Name" name="content" fullWidth />
        </GridItem>
      </GridContainer>
    </JDialog>
  );
};

CreateGroupDialog.propTypes = {
  templateId: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default withResaga()(CreateGroupDialog);
