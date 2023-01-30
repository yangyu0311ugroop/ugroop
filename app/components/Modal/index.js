/**
 * Created by edil on 6/22/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
// TODO : 3.5 React Upgrade, check if we need it.
const UGModal = ({ title, body, footer }) => (
  <div styleName="ug-modal">
    <div styleName="ug-modal-header">
      <div styleName="ug-modal-title">{title}</div>
      <hr styleName="ug-modal-header-hr" />
    </div>
    <div>{body}</div>
    {footer && <div styleName="ug-modal-footer">{footer}</div>}
  </div>
);

UGModal.propTypes = {
  title: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
};

export default UGModal;
