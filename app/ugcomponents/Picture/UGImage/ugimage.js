/**
 * Created by paulcedrick on 6/21/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LazyLoad from 'react-lazyload';
import Loader from 'react-loading';
import Img from 'components/Img';
import { withStyles } from '@material-ui/core/styles';
import { queryImageURL, postMetaInfo } from 'utils/helpers/request';
import stylesheet from './styles';

export const UGImageUI = ({
  classes,
  imageUrl,
  size,
  round,
  cropMetaInfo,
  resizeWidth,
  resizeHeight,
  rotate,
  alt,
  padFacadeURL,
  className,
  imgClassName,
  onLoad,
  onError,
  isLazyLoad,
}) => {
  const loaderHeight = 40;

  const cmi = postMetaInfo(cropMetaInfo);

  let resize = resizeWidth;
  let side = 'width';

  if (resizeHeight) {
    resize = resizeHeight;
    side = 'height';
  }

  const fullUrl = queryImageURL(
    imageUrl,
    padFacadeURL,
    resize,
    cmi,
    side,
    rotate,
  );

  const placeholder = <Loader height={loaderHeight} type="bubbles" />;

  return (
    <div className={classNames(classes.ugImageContainer, className)}>
      {isLazyLoad ? (
        <LazyLoad once placeholder={placeholder} height={loaderHeight}>
          <Img
            className={classNames(
              classes.ugImage,
              classes[size.toLowerCase()],
              { [classes.ugRound]: round },
              imgClassName,
            )}
            src={fullUrl}
            alt={alt}
            onLoad={onLoad}
            onError={onError}
          />
        </LazyLoad>
      ) : (
        <Img
          className={classNames(
            classes.ugImage,
            classes[size.toLowerCase()],
            { [classes.ugRound]: round },
            imgClassName,
          )}
          src={fullUrl}
          alt={alt}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </div>
  );
};

UGImageUI.defaultProps = {
  size: 'custom',
  classes: {},
  round: false,
  cropMetaInfo: {},
  resizeWidth: null,
  resizeHeight: null,
  rotate: 0,
  alt: '',
  padFacadeURL: false,
  className: '',
  imgClassName: '',
  onLoad: null,
  onError: null,
  isLazyLoad: true,
};

UGImageUI.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  size: PropTypes.string,
  classes: PropTypes.object,
  round: PropTypes.bool,
  cropMetaInfo: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  resizeWidth: PropTypes.number,
  resizeHeight: PropTypes.number,
  rotate: PropTypes.oneOf([0, 90, 180, 270]),
  alt: PropTypes.string,
  padFacadeURL: PropTypes.bool,
  className: PropTypes.string,
  imgClassName: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  isLazyLoad: PropTypes.bool,
};

export default withStyles(stylesheet, { name: 'UGImageUI' })(UGImageUI);
