import {
  CREATE_PHOTO,
  NODE_API,
  REMOVE_PHOTO,
  UPDATE_PHOTO,
} from 'apis/constants';
import { PERSON_CONTAINER } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import { DATASTORE_UTILS } from 'datastore';
import PhotoStoreHelper from 'datastore/templateManagementStore/helpers/photo';
import TemplateStoreHelper from 'datastore/templateManagementStore/helpers/template';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withUploadFile } from 'ugcomponents/File';
import ImageCropper from 'ugcomponents/ImageCropper';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { horizontalSide, trimContainerScheme } from 'utils/helpers/request';
import ImageUtility from 'utils/imageUtils';
import { isEmptyString } from 'utils/stringAdditions';
import { CONFIG, PHOTO_ID_CONFIG, PHOTOS_CONFIG } from './config';
import styles from './styles';

export class Photo extends PureComponent {
  state = {
    uploadImageData: [], // include [{ blob, imageSize, url}, {blob2, imageSize2, url2}]
    showCropper: true,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.props.uploadFile.subscribeSuccess(this.onUploadSuccessful);
    this.dialogClasses = { paper: classes.paper };
  };

  // region FOR IMAGE UPLOAD
  onUploadDispatch = (blob, file) => {
    const data = ImageUtility.convertFormData(blob, file);
    this.setState(
      {
        showCropper: false,
      },
      () => {
        this.props.uploadFile.enqueueData(data, file.name, { blob });
      },
    );
  };

  onUploadSuccessful = ({ size, url, blob }) => {
    this.setState(current => ({
      showCropper: true,
      uploadImageData: [
        ...current.uploadImageData,
        { blob, imageSize: size, url },
      ],
    }));
  };

  onCropImageSuccess = image => {
    this.props.resaga.setValue({
      photoImg: image,
    });
  };

  onUpdateTemplateImage = (url, metaInfo) => {
    this.props.resaga.dispatchTo(NODE_API, UPDATE_PHOTO, {
      payload: {
        id: this.props.id,
        fk: this.props.templatePhotoForeignKey,
        content: url,
        fileName: url,
        oldPhoto: this.props.photoId,
        metaInfo,
      },
    });
  };

  onInsertTemplateImage = (url, metaInfo) => {
    const fileName = trimContainerScheme(url, PERSON_CONTAINER);

    this.props.resaga.dispatchTo(NODE_API, CREATE_PHOTO, {
      payload: {
        id: this.props.id,
        content: url,
        metaInfo,
        fileName,
      },
    });
  };

  onCrop = (url, cropImageParam) => {
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
      if (this.props.templatePhotoId) {
        this.onUpdateTemplateImage(url, metaInfo);
      } else {
        this.onInsertTemplateImage(url, metaInfo);
      }
    }
  };

  onUploadTemplateImage = ({
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
      url = this.props.templatePhotoUrl;
    }
    const cropParams = {
      imageSize,
      scale,
      cropRect,
      rotate,
    };
    this.onCrop(url, cropParams);
  };

  onUpdateImageSuccess = photo => {
    this.props.resaga.setValue({
      photos: PhotoStoreHelper.upsert(photo, {}),
      templates: TemplateStoreHelper.upsertPhoto(this.props.id, photo.id),
    });
  };

  onInsertUploadSuccess = photo => {
    this.props.resaga.setValue({
      photos: PhotoStoreHelper.upsert(photo, {}),
      templates: TemplateStoreHelper.upsertPhoto(this.props.id, photo.id),
    });
  };

  onUploadCancel = () => {
    const length = this.state.uploadImageData.length;
    this.setState(state => ({
      uploadImageData: state.uploadImageData.slice(0, length - 1),
    }));
  };
  // endregion END FOR IMAGE UPLOAD

  handleDelete = () => {
    const { id, templatePhotoId, templatePhotoForeignKey } = this.props;

    this.props.resaga.setValue({
      templatePhoto: DATASTORE_UTILS.removeItemsInArray(templatePhotoId),
      photos: DATASTORE_UTILS.removeObjectById(templatePhotoId),
    });
    this.props.resaga.dispatchTo(NODE_API, REMOVE_PHOTO, {
      payload: {
        fk: templatePhotoForeignKey,
        id,
      },
    });
  };

  fileId = () => {
    const { id } = this.props;

    return `photo-${id}`;
  };

  render = () => {
    const {
      classes,
      id,
      templatePhotoUrl,
      photoId,
      templateMetaInfo,
      editable,
      w,
      h,
      type,
      component: Component,
      renderEmpty,
      classNames,
      size,
      resizeSize,
      placeholderProps,
      thumbnail,
      showPreview,
      showDownload,
      hideFrame,
      overlayClassName,
      fullWidth,
      borderRadius,
      className,
      dialogProps,
      customCanEdit,
    } = this.props;
    const { showCropper } = this.state;

    if (!editable && !templatePhotoUrl && !renderEmpty) return null;

    let placeProps;

    if (!isEmptyString(templatePhotoUrl)) {
      placeProps = {
        fileId: this.fileId(),
        imgSrc: templatePhotoUrl,
        rotate: 0,
        facadeURLPrefix: true,
        photoId,
        cropMetaInfo: templateMetaInfo,
        resizeSize: 1000,
        resizeSide: horizontalSide(0),
        onDeleteClick: this.handleDelete,
        editable,
        ...placeholderProps,
      };
    } else {
      placeProps = {
        fileId: this.fileId(),
        facadeURLPrefix: false,
        editable,
        ...placeholderProps,
      };
    }

    let rendered = (
      <ImageCropper
        id={id}
        originalImageUrl={templatePhotoUrl}
        fileId={this.fileId()}
        show={showCropper}
        cancelUploadImage={this.onUploadCancel}
        dispatchUpload={this.onUploadDispatch}
        saveImagePosition={this.onUploadTemplateImage}
        placeholderProps={placeProps}
        imageCropperContainerClassname={classes.imageCropperContainer}
        placeholderContainerClassname={classnames(
          classes.placeholderCropper,
          LOGIC_HELPERS.ifElse(hideFrame, classes.hideFramePlaceholder),
        )}
        dialogClassname={classnames(classes.dialogContainer, classes[type])}
        canvasWidth={w}
        canvasHeight={h}
        canvasBorder={0}
        classNames={classNames}
        resizeSize={resizeSize}
        thumbnail={thumbnail}
        showPreview={showPreview}
        showDownload={showDownload}
        overlayClassName={overlayClassName}
        dialogProps={dialogProps}
        customCanEdit={customCanEdit}
        size={size}
      />
    );

    if (resizeSize || size || fullWidth) {
      rendered = (
        <div
          className={classnames(
            classes.resize,
            LOGIC_HELPERS.ifElse(hideFrame, classes.hideFrameResize),
            borderRadius && classes.borderRadius,
            classes[`resize${size}`],
            LOGIC_HELPERS.ifElse(fullWidth, classes.fullWidth),
            className,
          )}
        >
          {rendered}
        </div>
      );
    }

    return <Component className={classes.root}>{rendered}</Component>;
  };
}

Photo.propTypes = {
  resaga: PropTypes.object,
  classes: PropTypes.object.isRequired,
  uploadFile: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  photoId: PropTypes.string,
  templatePhotoUrl: PropTypes.string,
  // Date and days props

  // parent props
  component: PropTypes.any,
  renderEmpty: PropTypes.bool,
  showPreview: PropTypes.bool,
  showDownload: PropTypes.bool,
  thumbnail: PropTypes.bool,
  borderRadius: PropTypes.bool,
  hideFrame: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  classNames: PropTypes.object,
  placeholderProps: PropTypes.object,
  resizeSize: PropTypes.number,
  size: PropTypes.number,
  dialogProps: PropTypes.object,
  customCanEdit: PropTypes.bool,

  // resaga props
  w: PropTypes.number,
  h: PropTypes.number,
  templatePhotoId: PropTypes.string,
  templateMetaInfo: PropTypes.object,
  templatePhotoForeignKey: PropTypes.number,
  editable: PropTypes.bool,
};

Photo.defaultProps = {
  templatePhotoUrl: null,
  showPreview: true,
  borderRadius: true,
  templatePhotoId: '',
  photoId: '',
  templateMetaInfo: {},
  templatePhotoForeignKey: -1,
  component: 'span',
  dialogProps: {},
  customCanEdit: false,
};

export default compose(
  withStyles(styles),
  resaga(PHOTOS_CONFIG),
  resaga(PHOTO_ID_CONFIG),
  resaga(CONFIG),
  withUploadFile({ container: PERSON_CONTAINER }),
)(Photo);
