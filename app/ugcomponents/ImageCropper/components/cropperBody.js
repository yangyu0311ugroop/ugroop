import React, { PureComponent } from 'react';
import ImageUtility from 'utils/imageUtils';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { withStyles } from '@material-ui/core/styles';
import styles from './bodyStyles';

export class CropperBody extends PureComponent {
  state = {
    image: null,
  };

  componentWillMount = () => {
    if (this.props.loadFromUrl && this.props.originalImageBlob) {
      ImageUtility.BlobtoDataURL(this.props.originalImageBlob).then(
        imageData => {
          this.setState({ image: imageData });
        },
      );
    } else if (this.props.fileImage !== null) {
      this.setState({ image: this.props.fileImage.resource });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.fileImage !== null) {
      this.setState({ image: nextProps.fileImage.resource });
    }
  };

  avatarStyle = { cursor: 'move', background: '#000000' };

  render = () => {
    const { classes } = this.props;
    let edWidth;
    let edHeight;

    if (this.props.orientation === 0 || this.props.orientation === 180) {
      edWidth = this.props.canvasWidth;
      edHeight = this.props.canvasHeight;
    } else {
      edWidth = this.props.canvasHeight;
      edHeight = this.props.canvasWidth;
    }

    const content = (
      <AvatarEditor
        ref={this.props.setRef}
        image={this.state.image}
        width={edWidth}
        height={edHeight}
        border={this.props.canvasBorder}
        scale={this.props.scale}
        style={this.avatarStyle}
        onImageReady={this.onImageReady}
        rotate={this.props.orientation}
      />
    );

    return <div className={classes.root}>{content}</div>;
  };
}

CropperBody.propTypes = {
  originalImageBlob: PropTypes.object,
  fileImage: PropTypes.any,
  scale: PropTypes.number,
  setRef: PropTypes.func,
  classes: PropTypes.object.isRequired,
  loadFromUrl: PropTypes.bool,
  orientation: PropTypes.number, // degrees clockwise
  // react avatar props
  canvasHeight: PropTypes.number,
  canvasWidth: PropTypes.number,
  canvasBorder: PropTypes.number,
};
CropperBody.defaultProps = {
  canvasHeight: 500,
  canvasWidth: 500,
  canvasBorder: 25,
  orientation: 0,
};

export default withStyles(styles, { name: 'CropperBody' })(CropperBody);
