import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

export const styleSheet = theme => {
  const borderTopColor = theme.colorTone === 'warm' ? '#36322F' : '#DFE8EC';
  return {
    root: {
      paddingTop: '24px',
      marginBottom: '40px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    upperBorder: {
      borderTop: {
        style: 'solid',
        color: borderTopColor,
        width: 1,
      },
    },
  };
};

function Footer(props) {
  const { children, classes, className, ...other } = props;
  return (
    <footer
      className={classNames(classes.root, classes.upperBorder, className)}
      {...other}
    >
      {children}
    </footer>
  );
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

const StyleFooter = withStyles(styleSheet, { name: 'Footer' })(Footer);
export const FooterTest = Footer;
export default StyleFooter;
