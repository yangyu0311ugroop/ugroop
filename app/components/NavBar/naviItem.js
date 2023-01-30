import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Li from 'components/Li/index';

export const styleSheet = theme => {
  const item = {};
  if (theme.colorTone === 'warm') {
    item.color = '#9C9C9C';
    item.activeColor = '#36322F';
  } else {
    item.color = '#5E6986';
    item.activeColor = 'white';
  }
  return {
    item: {
      display: 'inline-block',
      padding: '0 6px',
      fontWeight: '500',
      color: item.color,
    },
    active: {
      color: item.activeColor,
    },
  };
};

function NavItem(props) {
  const { classes, className, active } = props;
  const activeClass = active === true ? classes.active : undefined;
  return (
    <Li className={classNames(classes.item, className, activeClass)}>
      {props.item}
    </Li>
  );
}

NavItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  item: PropTypes.any.isRequired,
  active: PropTypes.bool,
};

const StyleNavItem = withStyles(styleSheet, { name: 'NavItem' })(NavItem);
export const NaviItemTest = NavItem;
export default StyleNavItem;
