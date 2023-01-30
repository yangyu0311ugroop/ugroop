import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';

export const refreshOrPushLink = props => e => {
  if (e.metaKey || e.ctrlKey) return;
  if (props.stopPropogationLink) {
    e.stopPropagation();
  }
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

function UGNavLink(props) {
  return (
    <NavLink // eslint-disable-line no-link-component/no-navLink-component
      {...props}
      onClick={refreshOrPushLink(props)}
    >
      {props.children}
    </NavLink>
  );
}

UGNavLink.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object.isRequired,
  to: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  onClick: PropTypes.func,
  stopPropogationLink: PropTypes.bool,
};

export default compose(withRouter)(UGNavLink);
export const UGNavLinkTest = UGNavLink;
