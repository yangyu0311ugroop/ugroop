import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../ugcomponents/Icon';
import { H3, H5 } from '../../../../viewComponents/Typography';
const ChatDown = ({ type, text }) => (
  <div className="str-chat__down">
    <div className="str-chat__down-main">
      <Icon color="danger" size="large" icon="lnr-site-map" paddingRight />
      <H3>{type}</H3>
      <H5>{text}</H5>
    </div>
  </div>
);

ChatDown.defaultProps = {
  type: 'Error',
};

ChatDown.propTypes = {
  /** The type of error */
  type: PropTypes.string,
  /** The error message to show */
  text: PropTypes.string,
};

export default React.memo(ChatDown);
