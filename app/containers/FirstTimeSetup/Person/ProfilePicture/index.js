/**
 * Created by edil on 7/25/17.
 */
import React, { PureComponent } from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { config } from 'persistlayer/config';
import { connect, ReactReduxContext } from 'react-redux';
import { PERSON_CONTAINER } from 'appConstants';
import UGImageCropper from 'ugcomponents/ImageCropper';
import { withUploadFile } from 'ugcomponents/File';
import Icon from 'ugcomponents/Icon';
import { createPersistor } from 'redux-persist-immutable';
import { selectCachedAvatar } from 'datastore/stormPathStore/selectors';
import { createStructuredSelector } from 'reselect';
import ImageUtility from 'utils/imageUtils';
import { padFacadeURL, horizontalSide } from 'utils/helpers/request';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { isEmptyString } from 'utils/stringAdditions';
import { parseMetaInfo } from 'utils/avatarUtils';
import { CONFIG } from './defines/config';

export const persist = { createPersistor };

const photoQuerySize = 150;
const canvasSize = { width: 550, height: 550 };
const styles = {
  placeholderIcon: {
    color: '#c4d9e6',
    fontSize: 50,
  },

  placeholderLabel: {
    margin: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderContainer: {
    width: 150,
    height: 150,
  },
};
export class UGProfilePicture extends PureComponent {
  state = {
    uploadImageData: [], // include [{ blob, imageSize, url}, {blob2, imageSize2, url2}]
    editImage: null, // Base64 image calculate via canvas,
    showCropper: true,
    hasUploaded: false,
  };

  static contextType = ReactReduxContext;

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
  }

  componentWillMount = () => {
    this.props.uploadFile.subscribeSuccess(this.handleImageUploadSuccess);
    if (this.props.cachedAvatar && this.props.cachedAvatar.profilePhotoUrl) {
      this.setState({
        hasUploaded: true,
      });
    }
  };

  onStoreLocally = () => {
    persist.createPersistor(this.store, config);
  };

  handleImageUploadSuccess = ({ size, url, blob }) => {
    this.onStoreLocally();
    const uploadImageData = this.state.uploadImageData;
    this.setState({
      showCropper: true,
      uploadImageData: [...uploadImageData, { blob, imageSize: size, url }],
    });
  };

  uploadImage = (blob, file) => {
    const data = ImageUtility.convertFormData(blob, file);
    this.setState(
      {
        showCropper: false,
        editImage: null,
      },
      () => {
        this.props.uploadFile.enqueueData(data, file.name, { blob });
      },
    );
  };

  /**
   * UploadImageData has higher priority, if it's not null, use all info that was set inside the uploadImageData
   * @param cropRect
   * @param scale
   * @param originalImageBlob
   * @param size
   * @param rotate
   */
  saveImagePosition = ({
    cropRect,
    scale,
    originalImageBlob,
    size,
    rotate,
  }) => {
    let imageSize;
    let url;
    if (this.state.uploadImageData.length > 0) {
      const { length } = this.state.uploadImageData;

      const { imageSize: s, url: u } = this.state.uploadImageData[length - 1];
      imageSize = s;
      url = u;
    } else if (originalImageBlob) {
      imageSize = size;
      url = this.props.cachedAvatar.profilePhotoUrl;
    }
    ImageUtility.cropImage(
      padFacadeURL(url),
      imageSize,
      canvasSize,
      scale,
      cropRect,
      rotate,
    ).then(image => {
      this.setState({ editImage: image });
    });
    const metaInfo = { ...cropRect, scale, rotate };
    this.props.resaga.setValue({
      avatar: { profilePhotoUrl: url, metaInfo: JSON.stringify(metaInfo) },
    });
    this.props.handleUploadPhoto({
      url,
      cropRect,
      scale,
      rotate,
    });
    this.setState({
      hasUploaded: true,
    });
  };

  cancelUploadImage = () => {
    const { length } = this.state.uploadImageData;
    const uploadImageData = this.state.uploadImageData;
    const newUpload = uploadImageData.slice(0, length - 1);
    this.setState({ uploadImageData: newUpload });
  };

  render = () => {
    const { hasUploaded, showCropper } = this.state;
    const placeholder = (
      <label
        className={this.props.classes.placeholderLabel}
        htmlFor="profile-pic"
      >
        <Icon className={this.props.classes.placeholderIcon} icon="lnr-plus" />
      </label>
    );

    let url;
    let placeholderProps;
    if (this.state.editImage) {
      const { length } = this.state.uploadImageData;
      if (this.state.uploadImageData.length) {
        const { url: u } = this.state.uploadImageData[length - 1];
        url = u;
      } else {
        url = this.props.cachedAvatar.profilePhotoUrl;
      }
      const { x, y, width, height, rotate } = parseMetaInfo(
        this.props.cachedAvatar.metaInfo,
      );
      placeholderProps = {
        fileId: 'profile-pic',
        imgSrc: url,
        placeholder,
        facadeURLPrefix: true,
        centerIcons: true,
        cropMetaInfo: {
          x,
          y,
          width,
          height,
        },
        rotate,
        resizeSize: photoQuerySize,
        resizeSide: horizontalSide(rotate),
      };
    } else if (
      this.props.cachedAvatar &&
      !isEmptyString(this.props.cachedAvatar.profilePhotoUrl)
    ) {
      url = this.props.cachedAvatar.profilePhotoUrl;
      const { x, y, width, height, rotate } = parseMetaInfo(
        this.props.cachedAvatar.metaInfo,
      );

      placeholderProps = {
        fileId: 'profile-pic',
        imgSrc: url,
        placeholder,
        facadeURLPrefix: true,
        cropMetaInfo: {
          x,
          y,
          width,
          height,
        },
        rotate,
        resizeSize: photoQuerySize,
        resizeSide: horizontalSide(rotate),
        centerIcons: true,
      };
    } else {
      placeholderProps = {
        fileId: 'profile-pic',
        centerIcons: true,
        placeholder,
      };
    }

    return (
      <div>
        <UGImageCropper
          originalImageUrl={url}
          fileId="profile-pic"
          containerStyle={hasUploaded ? 'imgCircle' : 'buttonCircle'}
          show={showCropper}
          placeholderProps={placeholderProps}
          dispatchUpload={this.uploadImage}
          saveImagePosition={this.saveImagePosition}
          cancelUploadImage={this.cancelUploadImage}
          placeholderContainerClassname={
            this.props.classes.placeholderContainer
          }
        />
      </div>
    );
  };
}

UGProfilePicture.contextTypes = {
  store: PropTypes.object,
};

UGProfilePicture.propTypes = {
  resaga: PropTypes.object,
  uploadFile: PropTypes.object.isRequired,
  cachedAvatar: PropTypes.object,
  handleUploadPhoto: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

const mapState = createStructuredSelector({
  cachedAvatar: selectCachedAvatar(),
});

export default compose(
  connect(mapState),
  resaga(CONFIG),
  withUploadFile({ container: PERSON_CONTAINER }),
  withStyles(styles, { name: 'UGProfilePicture' }),
)(UGProfilePicture);
