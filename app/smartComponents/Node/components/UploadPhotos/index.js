import { TEMPLATE_ID_CONFIG } from 'apis/components/Node/config';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { FileDropzone } from 'ugcomponents/File';
import Icon from 'ugcomponents/Icon';
import Button from 'viewComponents/Button';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG, TAB_GALLERY_ID_CONFIG } from './config';
import styles from './styles';

export class UploadPhotos extends PureComponent {
  handleDrop = newFiles => {
    const { id, uploadPhotoDialogId } = this.props;

    // open exist dialog
    if (uploadPhotoDialogId) {
      return PORTAL_HELPERS.openUploadPhotos(
        {
          id,
          newFiles,
        },
        this.props,
        uploadPhotoDialogId,
      );
    }

    // open new dialog
    const dialogId = PORTAL_HELPERS.openUploadPhotos(
      {
        id,
        newFiles,
      },
      this.props,
    );

    return this.props.resaga.setValue({ uploadPhotoDialogId: dialogId });
  };

  renderUploadPhotosButton = () => {
    const { classes, buttonClassName, blankslate, full } = this.props;

    if (full) {
      return (
        <JButton bg="green">
          <GridContainer alignItems="center" spacing={0} wrap="nowrap">
            <GridItem>
              <Icon size="small" icon="lnr-upload2" bold paddingRight />
            </GridItem>
            <GridItem>Upload</GridItem>
          </GridContainer>
        </JButton>
      );
    }

    const buttonProps = LOGIC_HELPERS.ifElse(
      !blankslate,
      {
        color: 'primary',
        size: 'xs',
      },
      {
        size: 'small',
        color: 'primary',
        weight: 'bold',
      },
    );

    const blankItem = LOGIC_HELPERS.ifElse(
      !blankslate,
      null,
      <GridItem className={classes.customPadHorizontal} />,
    );

    return (
      <Button
        onClick={this.openDialog}
        className={classnames(buttonClassName, classes.button)}
        {...buttonProps}
      >
        <GridContainer alignItems="center" wrap="nowrap">
          {blankItem}
          <GridItem>
            <Icon size="small" icon="lnr-plus" />
          </GridItem>
          {blankItem}
        </GridContainer>
      </Button>
    );
  };

  render = () => {
    const {
      classes,
      className,
      children,
      buttonClassName,
      uploadPhotoDialogId,
      ...props
    } = this.props;

    return (
      <>
        <FileDropzone
          className={className || classes.dropzone}
          onDrop={this.handleDrop}
          accept="image/*"
          {...props}
        >
          {this.renderUploadPhotosButton}
        </FileDropzone>
      </>
    );
  };
}

UploadPhotos.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.func,
  blankslate: PropTypes.bool,
  full: PropTypes.bool,

  // resaga props
  id: PropTypes.number, // tab gallery
  uploadPhotoDialogId: PropTypes.number,

  // customisable props
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
};

UploadPhotos.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'UploadPhotos' }),
  resaga(TEMPLATE_ID_CONFIG),
  resaga(TAB_GALLERY_ID_CONFIG),
  resaga(CONFIG),
)(UploadPhotos);
