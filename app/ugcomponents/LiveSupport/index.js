import React from 'react';
import LiveSupport from 'smartComponents/LiveSupport';
import PropTypes from 'prop-types';

export const UGLiveSupport = ({ appId }) => <LiveSupport appId={appId} />;

UGLiveSupport.propTypes = {
  appId: PropTypes.string,
};

export default UGLiveSupport;
