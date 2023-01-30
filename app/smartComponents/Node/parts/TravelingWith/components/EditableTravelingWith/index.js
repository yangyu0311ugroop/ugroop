import { NODESTORE_HOOKS } from 'datastore/nodeStore/hooks';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Editable from 'smartComponents/Editables/Editable';
import { pluralizeText } from 'utils/stringAdditions';
import first from 'lodash/first';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JText from 'components/JText';
import Icon from 'ugcomponents/Icon';
import TravelingWithDialog from './components/TravelingWithDialog';

const useGetTravelingWith = id => {
  const travelWithTuple = NODESTORE_HOOKS.useNodeGetTravelingWith(id);
  const travelWiths = travelWithTuple.map(a => a[1]);

  const names = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipantsFullName(state, travelWiths),
  );

  return names;
};

const useGetGroupName = id => {
  const groups = NODESTORE_HOOKS.useNodeGetTravelingWithGroupId(id);
  const groupId = first(groups);
  const content = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeContent(state, groupId),
  );
  return content || '';
};

export const EditableTravelingWith = memo(props => {
  const [openDialog, setOpenDialog] = useState(false);
  const participants = useGetTravelingWith(props.id);
  const groupName = useGetGroupName(props.id);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const renderParticipantValue = () => {
    if (participants.length > 1)
      return `${participants[0]} and ${participants.length -
        1} other ${pluralizeText('participant', participants.length - 1)}`;
    if (participants.length === 1) return `${participants[0]}`;

    return '';
  };

  const renderValue = () => {
    const people = renderParticipantValue();
    if (!groupName) return '';

    const group = (
      <GridContainer noWrap>
        <GridItem>
          <Icon icon="lnr-users" size="small" color="gray" />
        </GridItem>
        <GridItem>
          <JText bold ellipsis>
            {groupName}
          </JText>
        </GridItem>
      </GridContainer>
    );
    const travelling = LOGIC_HELPERS.ifElse(
      !people,
      '',
      <GridContainer noWrap>
        <GridItem>
          <Icon icon="lnr-group-work" color="gray" />
        </GridItem>
        <GridItem>{people}</GridItem>
      </GridContainer>,
    );
    return (
      <React.Fragment>
        {group}
        {travelling}
      </React.Fragment>
    );
  };

  return (
    <>
      <Editable
        // readOnly={participants.length === 0}
        label="Traveling With"
        renderValue={renderValue}
        value={participants}
        placeholder="Click to specify travelling with"
        onClick={handleOpenDialog}
        readOnly={props.readOnly}
      />
      <TravelingWithDialog
        id={props.id}
        templateId={props.templateId}
        open={openDialog}
        onClose={handleCloseDialog}
        onButtonClose={handleCloseDialog}
      />
    </>
  );
});

EditableTravelingWith.propTypes = {
  id: PropTypes.number,
  templateId: PropTypes.number,
  readOnly: PropTypes.bool,
};

export default EditableTravelingWith;
