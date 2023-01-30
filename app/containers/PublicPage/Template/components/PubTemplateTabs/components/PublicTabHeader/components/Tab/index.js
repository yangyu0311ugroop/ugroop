import React from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import CONFIG from './config';
import Tab from './tab';

export const PublicTabContainer = props => {
  const { label, isPrivate } = props;
  const otherProps = omit(props, ['resaga', 'tabId', 'isPrivate']);
  if (!isPrivate) {
    return <Tab label={label} {...otherProps} />;
  }
  return <div />;
};

PublicTabContainer.propTypes = {
  label: PropTypes.string,
  isPrivate: PropTypes.bool,
};
PublicTabContainer.defaultProps = {
  label: '',
  isPrivate: false,
};

export default resaga(CONFIG)(PublicTabContainer);
