import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import styles from './styles';

function Img(props) {
  const { classes, className, src, alt, ...other } = props;
  return (
    <img className={classNames(classes.root)} src={src} alt={alt} {...other} />
  );
}

Img.propTypes = {
  classes: PropTypes.object.isRequired,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const ImgTest = Img;
export default withStyles(styles, { name: 'Img' })(Img);
