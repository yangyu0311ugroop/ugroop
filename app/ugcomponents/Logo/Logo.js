/**
 * Created by Yang on 16/2/17.
 */
import Img from 'components/Img/index';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LogoPng from 'shareAssets/NewLogoPlanePNG.png';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = {
  root: {
    height: '40px',
    width: '40px',
  },
  block: {
    display: 'block',
  },
};

export const Logo = ({ classes, block }) => (
  <Img
    src={LogoPng}
    className={classNames(classes.root, block && classes.block)}
    alt="uGroop"
  />
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  block: PropTypes.bool,
};

Logo.defaultProps = {
  block: false,
};

export default withStyles(styleSheet, { name: 'Logo' })(Logo);
