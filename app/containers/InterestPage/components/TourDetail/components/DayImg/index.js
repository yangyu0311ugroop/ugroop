import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { VARIANTS } from 'variantsConstants';
import Logo from 'shareAssets/logo-solo-dark.png';
import Photo from 'smartComponents/File';
import Img from 'components/Img';
import { CONFIG } from './config';
import styles from './styles';

export class DayImg extends PureComponent {
  generateImage = photoId => {
    const { classes, selected, dayCount } = this.props;
    if (photoId) {
      return (
        <Photo
          id={photoId}
          variant={VARIANTS.READ_ONLY}
          className={classnames(
            classes.imgBg,
            classes.normalImg,
            selected && classes.selected,
          )}
          isTemplatePhoto
        />
      );
    }

    const num = (dayCount % 5) + 1;
    const color = `color${num}`;

    return (
      <div
        className={classnames(
          classes.placeholder,
          classes.normalImg,
          classes[color],
          { [classes.selected]: selected },
        )}
      >
        <Img
          alt="logo"
          src={Logo}
          className={classnames(classes.logo, {
            [classes.logoSelected]: selected,
          })}
        />
      </div>
    );
  };

  render() {
    const { photoId, classes } = this.props;

    return <div className={classes.root}>{this.generateImage(photoId)}</div>;
  }
}

DayImg.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  dayCount: PropTypes.number,

  // resaga props
  photoId: PropTypes.string,
};

DayImg.defaultProps = {
  photoId: '',
  dayCount: 1,
};

export default compose(
  withStyles(styles, { name: 'DayImg' }),
  resaga(CONFIG),
)(DayImg);
