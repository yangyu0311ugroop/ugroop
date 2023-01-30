/**
 * Created by paulcedrick on 6/20/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { padFacadeURL } from 'utils/helpers/request';
import UGImageItem from './UGImageItem/index';
import stylesheet from './styles';

export const UGCardHeaderImage = ({ classes, className, images }) => {
  const imgSpanStyle = {
    width: '100%',
    height: 35,
    display: 'inline-block',
  };

  let imageItems;

  if (images.length === 0) {
    imageItems = <span style={imgSpanStyle} />;
  } else {
    imageItems = images.map(image => {
      if (image.url) {
        return (
          <UGImageItem
            key={image.key}
            imageUrl={`${padFacadeURL(
              image.url,
            )}?x=0&y=0.2&w=1&h=0.3&width=500`}
            alt=""
          />
        );
      }

      return <span key={`image-${image.key}`} style={imgSpanStyle} />;
    });
  }

  return (
    <div className={classNames(classes.ugCardImageHeader, className)}>
      <div className={classes.ugCardHeaderOverlay} />
      <div className={classes.ugCardImageList}>{imageItems}</div>
    </div>
  );
};

UGCardHeaderImage.defaultProps = {
  className: '',
  images: [],
};

UGCardHeaderImage.propTypes = {
  className: PropTypes.string,
  images: PropTypes.array,
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesheet, { name: 'UGCardHeaderImage' })(
  UGCardHeaderImage,
);
