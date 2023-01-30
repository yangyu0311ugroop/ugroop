import { withStyles } from '@material-ui/core/styles';
import { DEFAULT, PERSON_CONTAINER } from 'appConstants';
import classnames from 'classnames';
import { withFormsy } from 'formsy-react';
import omit from 'lodash/omit';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import {
  CANVAS_SIZE,
  CANVAS_SIZE_CONSTANTS,
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
  RESIZE_SIZES,
} from 'smartComponents/File/types/Photo/constants';
import { withUploadFile } from 'ugcomponents/File';
import ImageCropper from 'ugcomponents/ImageCropper';
import { trimContainerScheme } from 'utils/helpers/request';
import { UID_HELPERS } from 'utils/helpers/uid';
import ImageUtility from 'utils/imageUtils';
import { convertStyleClass } from 'utils/style-utils';
import { VARIANTS } from 'variantsConstants';
import PhotoPlaceholder from 'viewComponents/Placeholders/Photo';
import { isEmptyString } from 'utils/stringAdditions';
import { CONFIG } from './config';
import styles from './styles';

// To be refactored in the future : Not yet final implementation.
// Just copy pasted most of the code from the File Photo field.
// Subject for refactor
// TODO Paul - Refactor & wrap in hoc common functions used for uploading photo
export class Photo extends PureComponent {
  state = {
    uploadImageData: [],
    show: true,
    photo: this.props.photo,
    x: this.props.x,
    y: this.props.y,
    scale: this.props.scale,
    rotate: this.props.rotate,
    height: this.props.height,
    width: this.props.width,
    randomId: UID_HELPERS.generateUID(),
  };

  componentDidMount = () => {
    this.props.uploadFile.subscribeSuccess(this.uploadSuccess);
    const defaultVal = !isEmptyString(this.state.photo)
      ? { url: this.state.photo, ...this.getCropMetaInfo() }
      : null;
    this.props.setValue(defaultVal);
  };

  getCanvasSize = () => {
    const { canvasSize } = this.props;
    switch (canvasSize) {
      case CANVAS_SIZE_CONSTANTS.SMALL: {
        return CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.SMALL];
      }
      case CANVAS_SIZE_CONSTANTS.LARGE: {
        return CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.LARGE];
      }
      case CANVAS_SIZE_CONSTANTS.LANDSCAPE_MD: {
        return CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.LANDSCAPE_MD];
      }
      default: {
        return CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.MEDIUM];
      }
    }
  };

  getCropMetaInfo = () => ({
    x: this.state.x,
    y: this.state.y,
    scale: this.state.scale,
    width: this.state.width,
    height: this.state.height,
    rotate: this.state.rotate,
  });

  getContainerStyle = () => {
    const { variant, size, classes } = this.props;
    return classnames(
      classes.root,
      convertStyleClass(classes, variant),
      convertStyleClass(classes, size),
    );
  };

  stripOwnProps = () =>
    omit(this.props, [
      'classes',
      'resaga',
      'onUploadImage',
      'photo',
      'placeholderProps',
      'x',
      'y',
      'height',
      'width',
      'rotate',
    ]);

  cancelUploadImage = () => {
    const { uploadImageData } = this.state;
    this.setState({
      uploadImageData: uploadImageData.slice(0, uploadImageData.length - 1),
    });
  };

  dispatchUpload = (blob, file) => {
    const data = ImageUtility.convertFormData(blob, file);
    this.setState(
      {
        show: false,
      },
      () => {
        this.props.uploadFile.enqueueData(data, file.name, { blob });
      },
    );
  };

  saveImagePosition = () => ({
    cropRect,
    scale,
    originalImageBlob,
    size,
    rotate,
  }) => {
    let imageSize;
    let url;
    if (this.state.uploadImageData.length > 0) {
      const length = this.state.uploadImageData.length;
      imageSize = this.state.uploadImageData[length - 1].imageSize;
      url = this.state.uploadImageData[length - 1].url;
    } else if (originalImageBlob) {
      imageSize = size;
      url = this.props.photo;
    }
    const cropParams = {
      imageSize,
      scale,
      cropRect,
      rotate,
    };
    this.crop(url, cropParams);
  };

  crop = (url, cropImageParam) => {
    const { scale, cropRect, rotate } = cropImageParam;
    if (url) {
      const metaInfo = {
        x: cropRect.x,
        y: cropRect.y,
        width: cropRect.width,
        height: cropRect.height,
        rotate,
        scale,
      };
      this.props.setValue({ url, ...metaInfo });
      this.setState({
        photo: url,
        x: metaInfo.x,
        y: metaInfo.y,
        scale: metaInfo.scale,
        rotate: metaInfo.rotate,
        height: metaInfo.height,
        width: metaInfo.width,
      });
    }
  };

  uploadSuccess = ({ size, url, blob }) => {
    const { uploadImageData } = this.state;
    this.setState({
      show: true,
      uploadImageData: [...uploadImageData, { blob, imageSize: size, url }],
    });
  };

  deleteSuccess = () => {
    const { uploadImageData } = this.state;
    const length = uploadImageData.length;
    const newUpload = uploadImageData.slice(0, length - 1);
    this.setState({
      uploadImageData: newUpload,
      photo: '',
      x: 0,
      y: 0,
      scale: 0,
      rotate: 0,
      height: 0,
      width: 0,
    });
    this.props.setValue(null);
  };

  render = () => {
    const { show, photo } = this.state;
    const { placeholderProps, size, label, placeholderSize } = this.props;

    const id = photo === '' ? this.state.randomId : photo;

    const fileId = `imageUploder-formsy-${id}`;
    const placeholder = (
      <PhotoPlaceholder size={placeholderSize} fileId={fileId} label={label} />
    );
    const metaInfo = this.getCropMetaInfo();

    const canvas = this.getCanvasSize();
    const finalPlaceholder = {
      imgSrc: photo,
      fileId,
      facadeURLPrefix: true,
      rotate: metaInfo.rotate,
      cropMetaInfo: metaInfo,
      placeholder,
      resizeSize: RESIZE_SIZES[size],
      className: this.getContainerStyle(),
      onDeleteClick: this.props.uploadFile.handleDelete(
        trimContainerScheme(photo, PERSON_CONTAINER),
        this.deleteSuccess,
        {
          manual: true,
          handleDelete: this.deleteSuccess,
        },
      ),
      ...placeholderProps,
    };

    return (
      <ImageCropper
        fileId={fileId}
        show={show}
        originalImageUrl={photo}
        dispatchUpload={this.dispatchUpload}
        saveImagePosition={this.saveImagePosition()}
        cancelUploadImage={this.cancelUploadImage}
        placeholderProps={finalPlaceholder}
        imageCropperContainerClassname={this.getContainerStyle()}
        fullWidth
        {...canvas}
        {...this.stripOwnProps()}
      />
    );
  };
}

Photo.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  uploadFile: PropTypes.object.isRequired,
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,

  // parent props

  photo: PropTypes.string,
  size: PropTypes.oneOf([
    IMAGE_SIZES_CONSTANTS.XXXS,
    IMAGE_SIZES_CONSTANTS.XXS,
    IMAGE_SIZES_CONSTANTS.XS,
    IMAGE_SIZES_CONSTANTS.SMALL,
    IMAGE_SIZES_CONSTANTS.MEDIUM,
    IMAGE_SIZES_CONSTANTS.LG,
    IMAGE_SIZES_CONSTANTS.XL,
    IMAGE_SIZES_CONSTANTS.LANDSCAPE_MD,
  ]),
  variant: PropTypes.oneOf([
    IMAGE_VARIANTS_CONSTANTS.ROUND,
    IMAGE_VARIANTS_CONSTANTS.SQUARE,
    VARIANTS.READ_ONLY,
    VARIANTS.EDITABLE,
    DEFAULT,
    '',
  ]),
  canvasSize: PropTypes.oneOf([
    CANVAS_SIZE_CONSTANTS.SMALL,
    CANVAS_SIZE_CONSTANTS.MEDIUM,
    CANVAS_SIZE_CONSTANTS.LARGE,
    CANVAS_SIZE_CONSTANTS.LANDSCAPE_MD,
  ]),
  placeholderProps: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  label: PropTypes.node,
  placeholderSize: PropTypes.string,

  // resaga props
};

Photo.defaultProps = {
  photo: null,
  variant: IMAGE_VARIANTS_CONSTANTS.ROUND,
  size: IMAGE_SIZES_CONSTANTS.MEDIUM,
  rotate: 0,
  canvasSize: CANVAS_SIZE_CONSTANTS.MEDIUM,
  placeholderProps: {
    smallIcons: true,
    deleteIcon: true,
    centerIcons: true,
  },
  label: '',
  placeholderSize: '',
};

export default compose(
  withStyles(styles, { name: 'Photo' }),
  resaga(CONFIG),
  withUploadFile({ container: PERSON_CONTAINER }),
  withFormsy,
)(Photo);
