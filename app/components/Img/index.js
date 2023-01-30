/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';

function Img({ ...props }) {
  const { className, src, alt, onLoad, onError, ...rest } = props;
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      {...onError && { onError }}
      {...onLoad && { onLoad }}
      {...rest}
    />
  );
}

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onError: PropTypes.func,
  onFocus: PropTypes.func,
  onLoad: PropTypes.func,
  onScroll: PropTypes.func,
};

export default Img;
