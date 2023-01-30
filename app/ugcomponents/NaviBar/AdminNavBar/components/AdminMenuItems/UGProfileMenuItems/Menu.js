/**
 * Created by Yang on 20/2/17.
 */
import React from 'react';
import propTypes from 'prop-types';
import UGLink from 'components/Link';

const Menu = props => (
  <UGLink to={props.link} onClick={props.handlesOnClick}>
    <i className={props.icon} /> {props.menuName}
  </UGLink>
);

Menu.propTypes = {
  icon: propTypes.string,
  link: propTypes.string,
  menuName: propTypes.string,
  handlesOnClick: propTypes.func,
};

Menu.defaultProps = {
  handlesOnClick: e => e.preventDefault(),
};

export default Menu;
