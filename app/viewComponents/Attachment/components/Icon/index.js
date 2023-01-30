import React from 'react';
import Icon from 'viewComponents/Icon';
import PropTypes from 'prop-types';

export const AttachmentIcon = ({ iconSize }) => (
  <span>
    <Icon icon="paperclip" size={iconSize} color="lavender" />
  </span>
);

AttachmentIcon.propTypes = {
  iconSize: PropTypes.string,
};

AttachmentIcon.defaultProps = {
  iconSize: 'extraSmall',
};

export default AttachmentIcon;
