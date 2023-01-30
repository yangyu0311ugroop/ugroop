import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Hidden } from '@material-ui/core';
import { InlineButton } from 'ugcomponents/Buttons';
import DialogCom from 'components/Dialog';
import Dialog from 'ugcomponents/Dialog';
import Icon from 'ugcomponents/Icon';
import { postMetaInfo, queryImageURL } from 'utils/helpers/request';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { H4, H6, H5 } from 'viewComponents/Typography';
import PreviewPhoto from '../PreviewPhoto';
import styles from './style';

export class PhotoPlaceHolder extends PureComponent {
  state = {
    open: false,
    preview: false,
    previewError: false,
  };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  openPreview = () => {
    const { onClick, showPreview } = this.props;

    if (typeof onClick === 'function') {
      return onClick();
    }

    return showPreview && this.setState({ preview: true, previewError: false });
  };

  closePreview = () => this.setState({ preview: false });

  showPreviewError = () => {
    this.setState({ previewError: true });
  };

  handleDelete = () => {
    this.close();
    this.props.onDeleteClick();
  };

  imgSrc = () => {
    const { imgSrc, facadeURLPrefix, cropMetaInfo, resizeSide } = this.props;

    const { rotate } = cropMetaInfo || {};

    const cropMeta = postMetaInfo(cropMetaInfo);
    return queryImageURL(
      imgSrc,
      facadeURLPrefix,
      0,
      cropMeta,
      resizeSide,
      rotate,
    );
  };

  deleteDialog = () => (
    <Dialog
      type="image"
      template="delete"
      open={this.state.open}
      headlineIcon="lnr-picture3"
      headlineTitle={this.props.deleteTitle}
      cancelFunc={this.close}
      confirmFunc={this.handleDelete}
    />
  );

  renderButton = ({ openMenu }) => {
    const {
      fileId,
      imgSrc,
      classes,
      setButton,
      updateButton,
      updateButtonClassName,
    } = this.props;

    if (!imgSrc) {
      return (
        <div
          className={classnames(
            classes.actionButton,
            classes.actionButtonsNoImage,
            classes.actionButtonFade,
            updateButtonClassName,
          )}
        >
          <label htmlFor={fileId} className={classnames(classes.defaultLabel)}>
            <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
              <GridItem>
                <Icon icon="lnr-camera2" size="small" />
              </GridItem>
              <Hidden smDown>
                <GridItem>
                  <H6 dense white className={classes.button}>
                    {setButton}
                  </H6>
                </GridItem>
              </Hidden>
            </GridContainer>
          </label>
        </div>
      );
    }

    return (
      <div className={classes.actionButtons}>
        <Button
          dense
          noPadding
          size="extraSmall"
          color="black"
          variant={VARIANTS.BORDERLESS}
          className={classnames(
            classes.actionButton,
            classes.actionButtonFade,
            updateButtonClassName,
          )}
          onClick={openMenu}
        >
          <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
            <GridItem>
              <Icon icon="lnr-camera2" size="small" />
            </GridItem>
            <GridItem>
              <H5 dense white className={classes.button}>
                {updateButton}
              </H5>
            </GridItem>
          </GridContainer>
        </Button>
      </div>
    );
  };

  renderMenu = ({ closeMenu }) => {
    const {
      classes,
      fileId,
      largeIcons,
      onMoveClick,
      showDelete,
      replaceButton,
    } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem icon="lnr-camera2" closeMenu={closeMenu} hover>
            <label
              htmlFor={fileId}
              className={classnames(classes.defaultLabel, {
                [classes.imgLabel]: !largeIcons,
                [classes.iconCameraPositionLarge]: largeIcons,
              })}
            >
              {replaceButton}
            </label>
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem icon="lnr-move" closeMenu={closeMenu} onClick={onMoveClick}>
            Reposition
          </MenuItem>
        </GridItem>
        {showDelete && (
          <GridItem>
            <MenuItem
              icon="lnr-trash2"
              closeMenu={closeMenu}
              onClick={this.open}
            >
              Remove
            </MenuItem>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderDownload = () => {
    const { classes, showDownload, downloadButtonClassName } = this.props;

    if (!showDownload) return null;

    const newImageSrc = this.imgSrc();

    return (
      <a target="_blank" href={newImageSrc} download>
        <div
          className={classnames(
            classes.downloadButton,
            downloadButtonClassName,
          )}
        >
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>
              <Icon icon="lnr-download2" size="xsmall" paddingRight />
            </GridItem>
            <GridItem>Download</GridItem>
          </GridContainer>
        </div>
      </a>
    );
  };

  renderCoverPhotoPopper = () => {
    const { imgSrc, editable } = this.props;

    if (!editable) return null;

    return (
      <Popper
        placement="bottom-start"
        renderButton={this.renderButton}
        value={imgSrc}
      >
        {this.renderMenu}
      </Popper>
    );
  };

  renderImagePreview = () => {
    const {
      classes,
      isReadOnly,
      rotate,
      photoId,
      cropMetaInfo,
      type,
      showPreview,
    } = this.props;

    if (!showPreview) return null;

    const { previewError } = this.state;

    const id = Date.now();

    return previewError ? (
      <GridContainer
        className={classes.imagePreviewError}
        direction="column"
        alignItems="center"
      >
        <GridItem>
          <H4 dense weight="bold" textAlign="center">
            Sorry, your image could not be previewed.
          </H4>
        </GridItem>
        <GridItem>
          <H4 dense textAlign="center">
            If this problem persists, please reupload the original image.
          </H4>
        </GridItem>
      </GridContainer>
    ) : (
      <div className={classes.previewModal}>
        <PreviewPhoto
          key={id}
          id={id}
          onClose={this.closePreview}
          onError={this.showPreviewError}
          onImageModal={this.onImageClick}
          isReadOnly={isReadOnly}
          metaInfo={cropMetaInfo}
          dayPhotoId={photoId}
          rotate={rotate}
          type={type}
        />
      </div>
    );
  };

  renderDialog = () => {
    const { classes, photoId, renderPreview } = this.props;
    const { preview } = this.state;

    if (!photoId) return null;

    let content;

    if (typeof renderPreview === 'function') {
      const src = this.imgSrc();

      content = renderPreview({ src });
    } else {
      content = this.renderImagePreview();
    }

    return (
      <DialogCom
        maxWidth="md"
        open={preview}
        disabled={false}
        onClose={this.closePreview}
        classes={this.dialogClasses}
      >
        <div className={classes.closeButton}>
          <InlineButton color="default" onClick={this.closePreview}>
            <Icon icon="lnr-cross2" />
          </InlineButton>
        </div>
        {content}
      </DialogCom>
    );
  };

  renderImage = () => {
    const {
      imgSrc,
      onLoaded,
      facadeURLPrefix,
      largeIcons,
      classes,
      className,
      style,
      resizeSize,
      cropMetaInfo,
      resizeSide,
      imageClassName,
    } = this.props;

    const { rotate } = cropMetaInfo || {};

    const cropMeta = postMetaInfo(cropMetaInfo);
    const newImageSrc = queryImageURL(
      imgSrc,
      facadeURLPrefix,
      resizeSize,
      cropMeta,
      resizeSide,
      rotate,
    );

    if (!imgSrc) return null;

    return (
      <GridContainer
        spacing={0}
        direction="column"
        onClick={this.openPreview}
        className={classes.image}
      >
        <GridItem className={classes.grow}>
          <img
            src={newImageSrc}
            alt="Loading..."
            onLoad={onLoaded}
            style={style}
            className={classnames(
              classes.roundImg,
              { [className]: !largeIcons },
              imageClassName,
            )}
          />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const {
      editable,
      largeIcons,
      classes,
      showIconOnHover,
      imgSrc,
      containerClassName,
      overlayClassName,
      showOverlay,
      showPreview,
      onClick,
    } = this.props;

    if (!editable && !imgSrc) {
      return (
        <div className={classes.noImageContainer}>
          {showOverlay && (
            <div className={classnames(classes.overlay, overlayClassName)} />
          )}
        </div>
      );
    }

    const imagePlaceholder = (
      <div
        className={classnames(
          classes.imgContainerRoot,
          {
            [classes.imgContainer]: !largeIcons,
            [classes.imgContainerLarge]: largeIcons,
            [classes.hover]: showIconOnHover,
            [classes.clickable]: showPreview || onClick,
          },
          containerClassName,
        )}
      >
        {this.renderDownload()}
        {this.renderCoverPhotoPopper()}
        {this.renderImage()}
        {this.renderDialog()}
      </div>
    );

    return (
      <div className={classes.root}>
        {this.deleteDialog()}
        {imagePlaceholder}

        {showOverlay && (
          <div className={classnames(classes.overlay, overlayClassName)} />
        )}
      </div>
    );
  };
}

PhotoPlaceHolder.propTypes = {
  imgSrc: PropTypes.any,
  fileId: PropTypes.string,
  photoId: PropTypes.string,
  onLoaded: PropTypes.func,
  renderPreview: PropTypes.func,
  onMoveClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onClick: PropTypes.func,
  updateButton: PropTypes.string,
  replaceButton: PropTypes.string,
  setButton: PropTypes.string,
  deleteTitle: PropTypes.string,
  containerClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  updateButtonClassName: PropTypes.string,
  downloadButtonClassName: PropTypes.string,
  overlayClassName: PropTypes.string,

  isReadOnly: PropTypes.bool,
  showOverlay: PropTypes.bool,
  facadeURLPrefix: PropTypes.bool,
  style: PropTypes.object,
  largeIcons: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  resizeSize: PropTypes.number,
  rotate: PropTypes.number,
  cropMetaInfo: PropTypes.object,
  resizeSide: PropTypes.oneOf(['width', 'height']),
  showIconOnHover: PropTypes.bool,
  editable: PropTypes.bool,
  showPreview: PropTypes.bool,
  showDelete: PropTypes.bool,
  showDownload: PropTypes.bool,
  type: PropTypes.string,
};

PhotoPlaceHolder.defaultProps = {
  fileId: '',
  className: '',
  facadeURLPrefix: false,
  cropMetaInfo: {},
  resizeSide: 'width',
  rotate: 0,
  largeIcons: false,
  showIconOnHover: false,
  showPreview: true,
  showDelete: true,
  deleteTitle: 'DELETE IMAGE',

  setButton: 'Upload',
  updateButton: 'Update',
  replaceButton: 'Upload photo',
};

export default withStyles(styles, { name: 'PhotoPlaceHolder' })(
  PhotoPlaceHolder,
);
