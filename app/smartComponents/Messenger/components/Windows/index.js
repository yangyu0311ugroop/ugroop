import { ChannelContext } from '@ugr00p/stream-chat-react';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

/**
 * Window - A UI component for conditionally displaying thread or channel.
 *
 * @example ../../docs/Window.md
 * @type { React.FC<import('types').WindowProps>}
 */
// eslint-disable-next-line react/prop-types
export const Window = ({ children, hideOnThread = false, innerStyle }) => {
  const { thread } = useContext(ChannelContext);
  // If thread is active and window should hide on thread. Return null
  if (thread && hideOnThread) return null;

  return (
    <div className="str-chat__main-panel" style={innerStyle}>
      {children}
    </div>
  );
};

Window.propTypes = {
  /** show or hide the window when a thread is active */
  hideOnThread: PropTypes.bool,
};

export default React.memo(Window);
