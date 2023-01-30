import React, { useState } from 'react';

import Button from 'viewComponents/Button';

import PropTypes from 'prop-types';
import CreateGroupDialog from './CreateGroupDialog';

export const AddGroupButton = props => {
  const { id } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button dense size="extraSmall" color="primary" onClick={handleOpen}>
        Add Group
      </Button>
      <CreateGroupDialog templateId={id} open={open} onClose={handleClose} />
    </>
  );
};

AddGroupButton.propTypes = {
  id: PropTypes.number,
};

export default AddGroupButton;
