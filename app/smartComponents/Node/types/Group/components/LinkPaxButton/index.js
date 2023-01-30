import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import ParticipantsDialog from '../ParticipantsDialog';

export const LinkPaxButton = props => {
  const { id } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        size="extraSmall"
        dense
        onClick={handleClick}
        variant={VARIANTS.INLINE}
        color="primary"
      >
        Add Existing PAX
      </Button>
      <ParticipantsDialog id={id} open={open} onClose={handleClose} />
    </>
  );
};

LinkPaxButton.propTypes = {
  id: PropTypes.number,
};

export default LinkPaxButton;
