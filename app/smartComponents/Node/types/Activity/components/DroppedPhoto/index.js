import { AWAITING, UPLOADING } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export const renderFileSize = size => {
  const ONE_MB = 1000000;

  if (size < ONE_MB) {
    return `${Math.round(size / 1000)} KB`;
  }

  const sizeMB = size / ONE_MB;

  // round up to 1 decimal place
  return `${Math.round(sizeMB * 10) / 10} MB`;
};

export class DroppedPhoto extends PureComponent {
  uploading = () => {
    const { status, errorMessage } = this.props;

    return status === UPLOADING && !errorMessage;
  };

  renderImage = () => {
    const {
      classes,
      uploadedURL,
      requestFile,
      status,
      errorMessage,
      rotate,
    } = this.props;

    const uploading = status === UPLOADING && !errorMessage;
    const awaiting = status === AWAITING;

    return (
      <a
        href={LOGIC_HELPERS.ifElse(!errorMessage, uploadedURL)}
        target="_blank"
      >
        <img
          alt={requestFile.name}
          src={requestFile.preview}
          className={classnames(
            classes.img,
            LOGIC_HELPERS.ifElse(awaiting, classes.awaiting),
            LOGIC_HELPERS.ifElse(uploading, classes.uploading),
          )}
          style={LOGIC_HELPERS.ifElse(rotate !== 0, {
            transform: `rotate(${rotate}deg)`,
          })}
        />
      </a>
    );
  };

  renderDeleteButton = () => {
    const { classes, id, addingToGallery, removePhoto } = this.props;

    return (
      !addingToGallery &&
      !this.uploading() && (
        <Button
          color="gray"
          size="xs"
          onClick={removePhoto(id)}
          className={classes.trashIcon}
          buttonTitle="Remove Photo"
        >
          <Icon icon="lnr-cross" size="xsmall" bold />
        </Button>
      )
    );
  };

  renderRotateButtons = () => {
    const {
      classes,
      id,
      errorMessage,
      addingToGallery,
      rotateLeft,
      rotateRight,
    } = this.props;

    return (
      !errorMessage &&
      !addingToGallery && (
        <div className={classes.rotateButtons}>
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>
              <Button
                color="gray"
                size="xs"
                className={classnames(classes.photoButton, classes.marginRight)}
                buttonTitle="Rotate Left"
                onClick={rotateLeft(id)}
              >
                <Icon icon="lnr-picture" size="xsmall" bold />
                <div className={classes.rotateLeftIcon}>
                  <Icon icon="lnr-undo" size="xsmall" bold />
                </div>
              </Button>
            </GridItem>
            <GridItem>
              <Button
                color="gray"
                size="xs"
                className={classnames(classes.photoButton)}
                buttonTitle="Rotate Right"
                onClick={rotateRight(id)}
              >
                <Icon icon="lnr-picture" size="xsmall" bold />
                <div className={classes.rotateRightIcon}>
                  <Icon icon="lnr-redo" size="xsmall" bold />
                </div>
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      )
    );
  };

  render = () => {
    const {
      classes,
      id,
      singlePhoto,
      requestFile,
      errorMessage,
      addingToGallery,
    } = this.props;

    const uploading = this.uploading();
    const renderImage = this.renderImage();

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem
          className={classnames(
            classes.photo,
            LOGIC_HELPERS.ifElse(singlePhoto, classes.singlePhoto),
          )}
        >
          <div className={classes.photoWrapper}>{renderImage}</div>

          {uploading && (
            <div className={classes.loadingIcon}>
              <LoadingText show={uploading} icon />
            </div>
          )}
          {errorMessage && (
            <div className={classes.errorIcon}>{errorMessage}</div>
          )}
          {this.renderDeleteButton()}

          <div className={classes.size}>{renderFileSize(requestFile.size)}</div>

          {this.renderRotateButtons()}
        </GridItem>
        <GridItem tabIndex={0}>
          <SimpleRTE
            id={id}
            name={`${id}.description`}
            value=""
            placeholder="Add a description"
            lines={2}
            className={classes.rte}
            readOnly={addingToGallery || errorMessage}
          />
        </GridItem>
      </GridContainer>
    );
  };
}

DroppedPhoto.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  singlePhoto: PropTypes.bool,
  uploadedURL: PropTypes.string,
  requestFile: PropTypes.object,
  status: PropTypes.string,
  errorMessage: PropTypes.string,
  rotate: PropTypes.number,
  addingToGallery: PropTypes.bool,
  removePhoto: PropTypes.func,
  rotateLeft: PropTypes.func,
  rotateRight: PropTypes.func,

  // resaga props
};

DroppedPhoto.defaultProps = {
  requestFile: {},
  rotate: 0,
};

export default compose(
  withStyles(styles, { name: 'DroppedPhoto' }),
  resaga(CONFIG),
)(DroppedPhoto);
