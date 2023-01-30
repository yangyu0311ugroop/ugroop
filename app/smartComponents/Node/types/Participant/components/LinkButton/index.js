import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';

import FollowerListDialog from './components/FollowerListDialog';
import { CONFIG } from './config';
import m from './messages';

export const LinkButton = ({ id, firstName, lastName }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={VARIANTS.INLINE}
        size="xs"
        color="black"
        onClick={() => setOpen(true)}
        data-testid="link-button-participant-list"
      >
        <M {...m.label} />
      </Button>
      <FollowerListDialog
        firstName={firstName}
        lastName={lastName}
        id={id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

LinkButton.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,

  // resaga props
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

LinkButton.defaultProps = {};

export default compose(resaga(CONFIG))(memo(LinkButton));
