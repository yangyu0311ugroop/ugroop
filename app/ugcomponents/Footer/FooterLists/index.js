import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Ul from 'components/Ul/index';

const styleSheet = {
  root: {},
};

function FooterLists(props) {
  const { classes, className, component, items } = props;
  return (
    <Ul
      className={classNames(classes.root, className)}
      component={component}
      items={items}
    />
  );
}

FooterLists.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  component: PropTypes.any,
};

const StyleFooterLists = withStyles(styleSheet, { name: 'FooterLists' })(
  FooterLists,
);
export const FooterListsTest = FooterLists;
export default StyleFooterLists;
