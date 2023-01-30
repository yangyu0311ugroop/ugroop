import React from 'react';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';

export function Swipeable(props) {
  const {
    onSwiped,
    children,
    preventDefaultTouchmoveEvent,
    trackMouse,
    isSwipeDisable,
    onSwiping,
  } = props;

  const handlers = useSwipeable({
    onSwiped,
    onSwiping,
    preventDefaultTouchmoveEvent,
    trackMouse,
  });
  if (isSwipeDisable) return children;
  return <div {...handlers}>{children}</div>;
}

Swipeable.propTypes = {
  onSwiped: PropTypes.func,
  onSwiping: PropTypes.func,
  children: PropTypes.any,
  preventDefaultTouchmoveEvent: PropTypes.bool,
  trackMouse: PropTypes.bool,
  isSwipeDisable: PropTypes.bool,
};

Swipeable.defaultProps = {
  preventDefaultTouchmoveEvent: false,
  trackMouse: false,
};

export default React.memo(Swipeable);
