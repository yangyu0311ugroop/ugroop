import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';
import { compose } from 'redux';
import omit from 'lodash/omit';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { UID_HELPERS } from 'utils/helpers/uid';
import { convertStyleClass } from 'utils/style-utils';
import classnames from 'classnames';
import { DEFAULT, PERSON_CONTAINER } from 'appConstants';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
  CANVAS_SIZE_CONSTANTS,
  CANVAS_SIZE,
  RESIZE_SIZES,
} from 'smartComponents/File/types/Photo/constants';
import { withUploadFile } from 'ugcomponents/File';
import ImageCropper from 'ugcomponents/ImageCropper';
import { trimContainerScheme } from 'utils/helpers/request';
import ImageUtility from 'utils/imageUtils';
import Placeholder from 'ugcomponents/ImagePlaceholder';
import { isEmptyString } from 'utils/stringAdditions';
import { VARIANTS } from 'variantsConstants';
import PhotoPlaceholder from 'viewComponents/Placeholders/Photo';

import { CONFIG } from './config';
import styles from './styles';

export class Photo extends PureComponent {
  state = {
    uploadImageData: [],
    show: true,
    randomId: UID_HELPERS.generateUID(),
  };

  componentDidMount = () => {
    this.props.uploadFile.subscribeSuccess(this.uploadSuccess);
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
      case CANVAS_SIZE_CONSTANTS.LANDSCAPE_SM: {
        return CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.LANDSCAPE_SM];
      }
      default: {
        return CANVAS_SIZE[CANVAS_SIZE_CONSTANTS.MEDIUM];
      }
    }
  };

  getCropMetaInfo = () => ({
    x: this.props.x,
    y: this.props.y,
    scale: this.props.scale,
    width: this.props.width,
    height: this.props.height,
    rotate: this.props.rotate,
  });

  getContainerStyle = () => {
    const { shape, size, classes, className } = this.props;
    return classnames(
      classes.root,
      convertStyleClass(classes, shape),
      convertStyleClass(classes, size),
      className,
    );
  };

  getFileId = () =>
    this.props.photo === '' ? this.state.randomId : this.props.photo;

  getPlaceholder = () => {
    const { label, placeholderSize, shape } = this.props;

    const fileId = `imageUploder-${this.getFileId()}`;
    return (
      <PhotoPlaceholder
        shape={shape}
        size={placeholderSize}
        fileId={fileId}
        label={label}
      />
    );
  };

  getFinalPlaceholder = () => {
    const { placeholderProps, deleteTitle, photo, size } = this.props;

    const fileId = `imageUploder-${this.getFileId()}`;
    const placeholder = this.getPlaceholder();
    const metaInfo = this.getCropMetaInfo();

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
      ),
      deleteTitle,
      ...placeholderProps,
    };

    return finalPlaceholder;
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

  saveImagePosition = ({
    cropRect,
    scale,
    originalImageBlob,
    size,
    rotate,
    uploadImageData,
  }) => {
    let imageSize;
    let url;
    const uploadData = uploadImageData || this.state.uploadImageData;
    if (uploadData.length > 0) {
      const length = uploadData.length;
      imageSize = uploadData[length - 1].imageSize;
      url = uploadData[length - 1].url;
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
      LOGIC_HELPERS.ifFunction(this.props.onUpload, [url, metaInfo]);
    }
  };

  uploadSuccess = ({ size, url, blob }) => {
    const { skipDialog } = this.props;
    const { uploadImageData } = this.state;

    if (skipDialog) {
      const uploadData = [...uploadImageData, { blob, imageSize: size, url }];
      const cropRect = {
        x: 0,
        y: 0,
        height: 1,
        width: 1,
      };
      return this.saveImagePosition({
        cropRect,
        rotate: null,
        scale: null,
        originalImageBlob: blob,
        uploadImageData: uploadData,
      });
    }

    return this.setState({
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
    });
    LOGIC_HELPERS.ifFunction(this.props.onDelete);
  };

  renderImageCropper = () => {
    const { show } = this.state;
    const { photo } = this.props;

    const fileId = `imageUploder-${this.getFileId()}`;
    const canvas = this.getCanvasSize();

    const finalPlaceholder = this.getFinalPlaceholder();

    return (
      <ImageCropper
        fileId={fileId}
        show={show}
        originalImageUrl={photo}
        dispatchUpload={this.dispatchUpload}
        saveImagePosition={this.saveImagePosition}
        cancelUploadImage={this.cancelUploadImage}
        placeholderProps={finalPlaceholder}
        imageCropperContainerClassname={this.getContainerStyle()}
        fullWidth
        {...canvas}
        {...this.stripOwnProps()}
      />
    );
  };

  renderImageOnly = () => {
    const finalPlaceholder = this.getFinalPlaceholder();
    const { photo, component: Component } = this.props;
    if (isEmptyString(photo)) {
      return '';
    }
    return (
      <Component>
        <Placeholder {...finalPlaceholder} fileId="" placeholder="" />
      </Component>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderImageCropper,
      [VARIANTS.READ_ONLY]: this.renderImageOnly,
      [DEFAULT]: this.renderImageCropper,
    });
  };
}

Photo.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  uploadFile: PropTypes.object.isRequired,

  // parent props
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,

  photo: PropTypes.string,
  className: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.oneOf([
    IMAGE_SIZES_CONSTANTS.XXXS,
    IMAGE_SIZES_CONSTANTS.XXS,
    IMAGE_SIZES_CONSTANTS.XS,
    IMAGE_SIZES_CONSTANTS.SMALL,
    IMAGE_SIZES_CONSTANTS.MEDIUM,
    IMAGE_SIZES_CONSTANTS.LG,
    IMAGE_SIZES_CONSTANTS.XL,
    IMAGE_SIZES_CONSTANTS.LANDSCAPE_MD,
    IMAGE_SIZES_CONSTANTS.LANDSCAPE_SM,
    IMAGE_SIZES_CONSTANTS.MEDIUM_SMALL,
    IMAGE_SIZES_CONSTANTS.NORMAL,
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
    CANVAS_SIZE_CONSTANTS.LANDSCAPE_SM,
  ]),
  placeholderProps: PropTypes.object,
  editable: PropTypes.bool,
  label: PropTypes.node,
  deleteTitle: PropTypes.string,
  placeholderSize: PropTypes.string,
  skipDialog: PropTypes.bool,

  // resaga props
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
  scale: PropTypes.number,

  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
    PropTypes.symbol,
  ]),
};

Photo.defaultProps = {
  photo: '',
  shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
  variant: DEFAULT,
  size: IMAGE_SIZES_CONSTANTS.MEDIUM,
  rotate: 0,
  canvasSize: CANVAS_SIZE_CONSTANTS.MEDIUM,
  placeholderProps: {
    smallIcons: true,
    deleteIcon: true,
    centerIcons: true,
  },
  editable: false,
  label: '',
  component: Fragment,
  deleteTitle: 'DELETE IMAGE',
  placeholderSize: '',
};

export default compose(
  withStyles(styles, { name: 'Photo' }),
  resaga(CONFIG),
  withUploadFile({ container: PERSON_CONTAINER }),
)(Photo);
