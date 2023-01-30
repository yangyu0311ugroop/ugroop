/**
 * Created by paulcedrick on 6/20/17.
 */
import React from 'react';
import Img from 'components/Img';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import Loader from 'react-loading';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './styles';

export const UGImageItem = ({
  classes,
  height,
  once,
  className,
  imageUrl,
  imgStyle,
  placeholder,
}) => (
  <div className={classNames(classes.ugImageItem, className)}>
    <LazyLoad height={height} once={once} placeholder={placeholder}>
      <Img
        src={imageUrl}
        alt=""
        className={classNames(classes.ugImage, imgStyle)}
      />
    </LazyLoad>
  </div>
);

UGImageItem.defaultProps = {
  className: '',
  imageUrl: '',
  placeholder: <Loader height={40} type="bubbles" />,
  imgStyle: '',
  once: true,
  height: 40,
};

UGImageItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  placeholder: PropTypes.node,
  imgStyle: PropTypes.string,
  once: PropTypes.bool,
  height: PropTypes.number,
};

export default withStyles(stylesheet, { name: 'UGImageItem' })(UGImageItem);
