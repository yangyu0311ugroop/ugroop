import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ACTIVITY, DAY } from 'utils/modelConstants';
import Image from 'containers/Templates/TemplateManagement/components/Image';
import styles from './styles';

export class PreviewPhoto extends PureComponent {
  imageClicked = () => {
    const { id, onImageModal } = this.props;
    onImageModal(id);
  };

  renderPhoto = () => {
    const { classes, rotate, metaInfo, dayPhotoId, type, onError } = this.props;
    const { x, y, width, height } = metaInfo || {};

    const imageClass =
      type === DAY || type === ACTIVITY ? classes.image : classes.templateImage;

    return (
      <Image
        imgClassName={imageClass}
        photoId={dayPhotoId}
        x={x}
        y={y}
        width={width}
        height={height}
        rotate={rotate}
        onError={onError}
      />
    );
  };

  render() {
    const { classes } = this.props;
    const photo = this.renderPhoto();

    return <div className={classes.root}>{photo}</div>;
  }
}

PreviewPhoto.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  metaInfo: PropTypes.object,
  dayPhotoId: PropTypes.string,
  type: PropTypes.string,
  onError: PropTypes.func,

  // resaga
  rotate: PropTypes.number,
  // resaga
  onImageModal: PropTypes.func,
};

PreviewPhoto.defaultProps = {
  rotate: 0,
};

export default withStyles(styles, { name: 'PreviewPhoto' })(PreviewPhoto);
