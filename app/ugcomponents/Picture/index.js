/**
 * Created by paulcedrick on 6/21/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './styles';
import UGImage from './UGImage/index';
import './style.css';

export const UGPicture = ({ classes, imageUrl, className, imgSize }) => (
  <div className={classNames(classes.ugPicture, className)}>
    <UGImage size={imgSize} imageUrl={imageUrl} />
    <div className={classes.ugDetails}>
      <p className={classes.ugName}>Sample</p>
    </div>
  </div>
);

UGPicture.defaultProps = {
  imageUrl: '',
  className: '',
  imgSize: 'small',
};

UGPicture.propTypes = {
  imageUrl: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  imgSize: PropTypes.string,
};

export default withStyles(stylesheet, { name: 'UGPicture' })(UGPicture);
