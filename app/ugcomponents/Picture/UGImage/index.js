import React from 'react';
import PropTypes from 'prop-types';
import UGImageUI from './ugimage';

export const UGImage = ({
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
}) => (
  <UGImageUI
    imageUrl={imageUrl}
    size={size}
    round={round}
    cropMetaInfo={cropMetaInfo}
    resizeWidth={resizeWidth}
    resizeHeight={resizeHeight}
    rotate={rotate}
    alt={alt}
    padFacadeURL={padFacadeURL}
    className={className}
    imgClassName={imgClassName}
    onLoad={onLoad}
    onError={onError}
    isLazyLoad={isLazyLoad}
  />
);

UGImage.defaultProps = {
  size: 'custom',
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

UGImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['custom', 'extrasmall', 'small', 'medium', 'large']),
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

export default UGImage;
