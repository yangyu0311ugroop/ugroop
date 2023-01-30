import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Li from 'components/Li/index';

const styleSheet = {
  root: {
    display: 'inline-block',
    paddingRight: '32px',
    fontSize: '14px',
  },
};

function FooterItem(props) {
  const { classes, className } = props;
  return <Li className={classNames(classes.root, className)}>{props.item}</Li>;
}

FooterItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  item: PropTypes.any.isRequired,
};

const StyleFooterItems = withStyles(styleSheet, { name: 'FooterItem' })(
  FooterItem,
);
export const FooterItemTest = FooterItem;
export default StyleFooterItems;
