import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';

export const refreshOrPushLink = props => e => {
  if (e.metaKey || e.ctrlKey) return;
  e.preventDefault();
  if (window.swUpdate) {
    window.location = props.to;
    return;
  }
  if (props.onClick) {
    props.onClick();
  }
  props.history.push(props.to);
};

function UGLink(props) {
  // eslint-disable-next-line react/prop-types
  const { staticContext, ...rest } = props;
  return (
    <Link // eslint-disable-line no-link-component/no-link-component
      {...rest}
      onClick={refreshOrPushLink(props)}
    >
      {props.children}
    </Link>
  );
}

UGLink.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object.isRequired,
  to: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  onClick: PropTypes.func,
  staticContext: PropTypes.any,
};

export default compose(withRouter)(UGLink);
export const UGLinkTest = UGLink;
