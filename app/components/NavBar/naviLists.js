import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Ul from 'components/Ul/index';

export const styleSheet = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
};

function NavLists(props) {
  const { classes, className, component, items } = props;
  return (
    <Ul
      className={classNames(classes.root, className)}
      component={component}
      items={items}
    />
  );
}

NavLists.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  component: PropTypes.any,
};

const StyleNavLists = withStyles(styleSheet, { name: 'NavLists' })(NavLists);
export const NaviListTest = NavLists;
export default StyleNavLists;
