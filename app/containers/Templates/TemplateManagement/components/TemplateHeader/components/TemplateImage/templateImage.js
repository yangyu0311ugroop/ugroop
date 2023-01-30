import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import resaga from 'resaga';

export const stylesheet = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    background:
      'linear-gradient(to bottom, rgba(255, 255, 255, 0) 40%,rgba(0, 0, 0, 0.95) 100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    objectFit: 'cover',
  },
  marginBottomNegative: {},
  hasImg: {},
  noImg: {},
};

export class TemplateImage extends PureComponent {
  render = () => {
    const { imgSrc, classes } = this.props;

    return (
      <div
        className={classNames(
          classes.container,
          imgSrc ? classes.hasImg : classes.noImg,
          {
            [classes.marginBottomNegative]: imgSrc,
          },
        )}
      >
        <div className={classes.overlay} />
      </div>
    );
  };
}

TemplateImage.propTypes = {
  imgSrc: PropTypes.string,
  classes: PropTypes.object.isRequired,
};
TemplateImage.defaultProps = {
  imgSrc: '',
};

export default resaga({
  value: {},
  setValue: {},
})(withStyles(stylesheet, { name: 'TemplateImage' })(TemplateImage));
