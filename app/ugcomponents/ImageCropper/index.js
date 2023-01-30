/**
 * Created by edil on 7/27/17.
 */
import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { DEFAULT } from 'appConstants';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import PropTypes from 'prop-types';
/**
 * Updated by Yang on 14/9/2017.
 */
import React, { PureComponent } from 'react';
import resaga from 'resaga';
import { photoType } from 'utils/constant';
import helper from 'utils/helpers/dataUriToBlob';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import ImageUtility from 'utils/imageUtils';
import { ACTIVITY, DAY, TEMPLATE } from 'utils/modelConstants';
import { NODE_API, UPDATE_PHOTO } from 'apis/constants';
import { fetchImage } from 'utils/request';
import ImageInput from '../ImageInput/index';
import Placeholder from '../ImagePlaceholder/index';
import Body from './components/cropperBody';
import Footer from './components/cropperFooter';
import PhotoPlaceHolder from './components/PhotoPlaceHolder';
import styles from './styles';

const defaultScale = 1.0;
const ratio = 100;
const minSlideValue = 32;
const maxSlideValue = 500;
export class UGImageCropper extends PureComponent {
  state = {
    showDialog: false,
    shouldRestInput: 0,
    scale: defaultScale,
    fileImageData: null, // { Base64 Data, size}
    originalImageBlob: null,
    originalImageSize: null,
    orientation: 0, // degrees clockwise
  };

  componentWillMount = () => {
    const { type, createdBy } = this.props;

    this.node = { type, createdBy };
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.type !== this.props.type ||
      prevProps.createdBy !== this.props.createdBy
    ) {
      const { type, createdBy } = this.props;
      this.node = { type, createdBy };
    }
  };

  componentWillUnmount = () => {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel();
    }
  };

  onSave = () => {
    this.props.saveImagePosition({
      cropRect: this.editor.getCroppingRect(),
      scale: this.state.scale,
      originalImageBlob: this.state.originalImageBlob,
      size: this.state.originalImageSize,
      rotate: this.state.orientation,
    });
    this.setState(state => ({
      showDialog: false,
      shouldRestInput: state.shouldRestInput + 1,
      fileImageData: null,
      scale: defaultScale,
      orientation: 0,
    }));
  };

  onSliderChange = value => {
    this.setState({ scale: value / ratio });
  };

  onCloseDialog = () => {
    this.setState(state => ({
      showDialog: false,
      shouldRestInput: state.shouldRestInput + 1,
      fileImageData: null,
      scale: defaultScale,
      orientation: 0,
    }));
  };

  onRotateImage = () => {
    // Rotate 90 degrees clockwise at a time
    this.setState(state => ({ orientation: (state.orientation + 90) % 360 }));
  };

  setEditorRef = editor => {
    this.editor = editor;
  };

  fileInputValueChange = (file, image) => {
    this.setState({ loadFromUrl: false });
    this.cancelablePromise = ImageUtility.resizeImagePromise(image);
    this.cancelablePromise.promise
      .then(resizeImage => {
        const blob = helper.dataUriToBlob(resizeImage.resource, photoType.jpeg);
        this.props.dispatchUpload(blob, file);
        // SK: Need to be careful here, setting dialog.open=true then false quickly seems to be buggy, dialog will be invisible but still block screen
        this.setState({ fileImageData: resizeImage, showDialog: true });
      })
      .catch(({ isCanceled, error }) => {
        if (isCanceled) {
          // TODO: @Yang: Promise is canceled, probably do something about it?
        }
        if (error) {
          this.setState({ showDialog: false });
        }
      });
  };

  reposition = () => {
    if (this.props.originalImageUrl) {
      const promise = fetchImage(
        'GET',
        `/${this.props.originalImageUrl}?width=2048`,
      );
      promise.then(data => {
        data.blob.then(blob => {
          this.setState({
            showDialog: true,
            loadFromUrl: true,
            originalImageBlob: blob,
            originalImageSize: data.size,
          });
        });
      });
    } else {
      this.setState({ showDialog: true });
    }
  };

  classNames = () => {
    const { classes, type, classNames, thumbnail } = this.props;

    const thumbnailClass = LOGIC_HELPERS.ifElse(thumbnail, 'thumbnail', '');

    return {
      imageClassName: classes[`${type}${thumbnailClass}Image`],
      containerClassName: classes[`${type}${thumbnailClass}ImageContainer`],
      updateButtonClassName: classes[`${type}${thumbnailClass}UpdateButton`],
      ...classNames,
    };
  };

  canvas = () => {
    const { type, canvasHeight, canvasWidth, canvasBorder } = this.props;

    return LOGIC_HELPERS.switchCase(type, {
      [TEMPLATE]: { canvasHeight: 200, canvasWidth: 1124, canvasBorder: 0 },
      [DAY]: { canvasHeight: 180, canvasWidth: 490, canvasBorder: 0 },
      [ACTIVITY]: { canvasHeight: 400, canvasWidth: 400, canvasBorder: 0 },
      [DEFAULT]: { canvasHeight, canvasWidth, canvasBorder },
    });
  };

  resizeSize = () => {
    const { type, size, resizeSize } = this.props;

    if (typeof resizeSize === 'number') {
      return { resizeSize, type };
    }

    return LOGIC_HELPERS.switchCase(type, {
      [TEMPLATE]: { resizeSize: 1500, type: TEMPLATE },
      [DAY]: { resizeSize: size * 2, type: DAY },
      [ACTIVITY]: { resizeSize: 72, type: ACTIVITY },
      [DEFAULT]: { resizeSize, type },
    });
  };

  renderPhotoPlaceHolder = () => {
    const {
      type,
      showPreview,
      showDownload,
      placeholderProps,
      overlayClassName,
      customCanEdit,
    } = this.props;

    const props = {
      ...placeholderProps,
      ...this.classNames(),
      ...this.resizeSize(),
      onMoveClick: this.reposition,
      showPreview,
      showDownload,
      overlayClassName,
      editable:
        placeholderProps.editable &&
        (ability.can('update', this.node) || customCanEdit),
    };

    return LOGIC_HELPERS.switchCase(type, {
      [TEMPLATE]: (
        <PhotoPlaceHolder
          deleteTitle="Delete Tour Cover Photo"
          setButton="Set Cover Photo"
          updateButton="Update Cover Photo"
          showOverlay={false}
          {...props}
        />
      ),
      [DAY]: (
        <PhotoPlaceHolder
          deleteTitle="Delete day photo"
          setButton="Upload"
          updateButton="Update"
          {...props}
        />
      ),
      [ACTIVITY]: (
        <PhotoPlaceHolder deleteTitle="Delete Section Photo" {...props} />
      ),
      [DEFAULT]: <Placeholder {...props} deleteTitle="" />,
    });
  };

  render = () => {
    const imageInputProps = {
      fileId: this.props.fileId,
      inputStyle: 'hidden',
      setValueOnChange: this.fileInputValueChange,
      shouldReset: this.state.shouldRestInput,
    };
    const {
      classes,
      url,
      onClose,
      showDialog,
      show,
      fullWidth,
      saveLoading,
      dialogProps,
      fileId,
    } = this.props;

    const dialog = (
      <Dialog
        open={showDialog || (show && this.state.showDialog)}
        onClose={onClose}
        className={classnames(this.props.dialogClassname)}
        {...dialogProps}
      >
        <Body
          image={url}
          originalImageBlob={this.state.originalImageBlob}
          fileImage={this.state.fileImageData}
          loadFromUrl={this.state.loadFromUrl}
          scale={this.state.scale}
          setRef={this.setEditorRef}
          {...this.canvas()}
          orientation={this.state.orientation}
        />
        <Footer
          min={minSlideValue}
          max={maxSlideValue}
          defaultValue={defaultScale * ratio}
          onSave={this.onSave}
          onSliderChange={this.onSliderChange}
          onClose={this.onCloseDialog}
          onRotate={this.onRotateImage}
          saveLoading={saveLoading}
        />
      </Dialog>
    );

    if (showDialog) {
      return dialog;
    }

    return (
      <div
        data-testid={`${fileId}-container`}
        className={classnames(this.props.imageCropperContainerClassname)}
      >
        {dialog}
        <div
          className={classnames(
            { [classes.placeholderAndInputContainer]: fullWidth },
            classes[this.props.containerStyle],
            this.props.placeholderContainerClassname,
          )}
        >
          {this.renderPhotoPlaceHolder()}
          <ImageInput {...imageInputProps} />
        </div>
      </div>
    );
  };
}

UGImageCropper.defaultProps = {
  placeholderProps: {},
  classNames: {},
  containerStyle: '',
  show: true,
  originalImageUrl: null,
  placeholderContainerClassname: '',
  imageCropperContainerClassname: '',
  dialogClassname: '',
  largeIcons: false,
  fullWidth: false,
  resizeSize: 1000,
};

UGImageCropper.propTypes = {
  fileId: PropTypes.string.isRequired,
  containerStyle: PropTypes.string,
  placeholderProps: PropTypes.object,
  classNames: PropTypes.object,
  show: PropTypes.bool,
  dispatchUpload: PropTypes.func.isRequired,
  saveImagePosition: PropTypes.func.isRequired,
  originalImageUrl: PropTypes.string,
  url: PropTypes.string,
  classes: PropTypes.object.isRequired,
  largeIcons: PropTypes.bool,
  fullWidth: PropTypes.bool,
  coverPhotoPlaceholder: PropTypes.bool,
  showDownload: PropTypes.bool,
  showDialog: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  dialogProps: PropTypes.object,

  // ways to override stuff inside through css
  placeholderContainerClassname: PropTypes.string,
  imageCropperContainerClassname: PropTypes.string,
  dialogClassname: PropTypes.string,
  overlayClassName: PropTypes.string,
  showPreview: PropTypes.bool,

  // ways to override cropper
  canvasHeight: PropTypes.number,
  canvasWidth: PropTypes.number,
  canvasBorder: PropTypes.number,
  resizeSize: PropTypes.number,
  size: PropTypes.number,
  thumbnail: PropTypes.bool,

  // Ways to override the ability
  customCanEdit: PropTypes.bool,

  // resaga
  type: PropTypes.string,
  createdBy: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  saveLoading: PropTypes.bool,
};

UGImageCropper.defaultProps = {
  saveLoading: PropTypes.false,
  dialogProps: {},
  customCanEdit: false,
};

export default resaga({
  value: {
    type: NODE_STORE_SELECTORS.type,
    createdBy: NODE_STORE_SELECTORS.createdBy,
  },
  isLoading: {
    saveLoading: [NODE_API, UPDATE_PHOTO],
  },
})(withStyles(styles, { name: 'UGImageCropper' })(UGImageCropper));
