import React from 'react';
import PropTypes from 'prop-types';
import Badge, { BadgeColor } from '../../../../../viewComponents/Badge';
import { VARIANTS } from '../../../../../variantsConstants';
function UserOnlineStatus(props) {
  const status = () => props.online;
  return (
    <Badge color={BadgeColor(status())} variant={VARIANTS.ROUND} content=" " />
  );
}

UserOnlineStatus.propTypes = {
  online: PropTypes.bool,
};

export default UserOnlineStatus;
