import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  ADD_IMAGE_SUCCESS,
  CREATE_CHILD,
  NODE_API,
  TEMPLATE_API,
} from 'apis/constants';
import {
  DROPPED_PHOTO,
  PERSON_CONTAINER,
  UPLOADED,
  UPLOADING,
} from 'appConstants';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import UGDialogAction from 'components/Dialog/UGDialogAction';
import UGDialogContent from 'components/Dialog/UGDialogContent';
import UGDialogTitle from 'components/Dialog/UGDialogTitle';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { DATA_HELPERS } from 'datastore/utils';
import dotProp from 'dot-prop-immutable';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Activity from 'smartComponents/Node/types/Activity';
import { Title } from 'ugcomponents/DialogForm/Complex';
import { FILE_HELPERS, FileDropzone, withUploadFile } from 'ugcomponents/File';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { queryImageURL } from 'utils/helpers/request';
import { TAB_GALLERY } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import { UPLOAD_PHOTO_UTILS } from './helpers';
import styles from './styles';

export class UploadPhotos extends PureComponent {
  state = {
    droppedFiles: {},
    droppedIds: [],
    uploadedFiles: {},
    uploadedIds: [],
    createdIds: [],
    minimise: false,
    addCount: 0,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.drawerClasses = { paper: classes.drawerPaper };
    this.PaperProps = {
      component: this.renderForm,
    };
  };

  componentDidMount = () => {
    this.props.uploadFile.subscribeSuccess(this.handleUploadSuccess);
    this.props.uploadFile.subscribeError(this.handleUploadError);

    const { newFiles } = this.props;

    if (newFiles) {
      this.handleDrop(newFiles);
    }
  };

  componentWillReceiveProps = nextProps => {
    const { newFiles } = this.props;

    if (newFiles !== nextProps.newFiles) {
      this.handleDrop(nextProps.newFiles);
    }
  };

  handleUploadSuccess = file => {
    this.setState(
      ({ uploadedIds, uploadedFiles, droppedFiles, uploadingId }) => ({
        uploadedIds: DATA_HELPERS.arrayAdd(uploadingId)(uploadedIds),
        uploadedFiles: DATA_HELPERS.objectAdd({ [uploadingId]: file })(
          uploadedFiles,
        ),
        droppedFiles: DATA_HELPERS.objectUpdate({
          [uploadingId]: { status: UPLOADED },
        })(droppedFiles),
        uploading: false,
        uploadingId: '',
      }),
      this.uploadNext,
    );
  };

  handleUploadError = error => {
    const { uploadingId } = this.state;

    this.handleUploadErrorState(
      uploadingId,
      `Error: ${dotProp.get(error, 'raw.response.error.message')}`,
    );
  };

  handleUploadErrorState = (id, errorMessage) => {
    const { droppedFiles, uploadedIds } = this.state;

    return this.setState(
      {
        uploadedIds: DATA_HELPERS.arrayAdd(id)(uploadedIds),
        droppedFiles: DATA_HELPERS.objectUpdate({
          [id]: { errorMessage },
        })(droppedFiles),
        uploading: false,
        uploadingId: '',
      },
      this.uploadNext,
    );
  };

  handleCloseDialog = () => {
    this.setState({
      droppedFiles: {},
      uploadedFiles: {},
      droppedIds: [],
      uploadedIds: [],
      uploading: false,
      uploadingId: '',
    });

    return PORTAL_HELPERS.close(this.props);
  };

  handleMinimiseDialog = () => this.setState({ minimise: true });

  handleMaximiseDialog = () => this.setState({ minimise: false });

  uploadedURL = id => {
    const { uploadedFiles } = this.state;

    if (!uploadedFiles[id]) {
      return null;
    }

    return queryImageURL(uploadedFiles[id].url, true);
  };

  handleDrop = newFiles => {
    const normalised = FILE_HELPERS.normaliseDrop(newFiles);

    this.setState(
      ({ droppedFiles, droppedIds }) => ({
        droppedFiles: DATA_HELPERS.objectAdd(normalised.droppedFiles)(
          droppedFiles,
        ),
        droppedIds: DATA_HELPERS.arrayAdd(normalised.droppedIds)(droppedIds),
        minimise: false,
      }),
      this.uploadNext,
    );
  };

  uploadNext = () => {
    const { uploadFile } = this.props;
    const { droppedFiles, droppedIds, uploadedIds, uploading } = this.state;

    // already uploading
    if (uploading) {
      return null;
    }

    for (let i = 0; i < droppedIds.length; i += 1) {
      const id = droppedIds[i];
      const requestFile = dotProp.get(droppedFiles, `${id}.requestFile`);

      // find the first one that not uploaded
      if (uploadedIds.indexOf(id) === -1 && requestFile) {
        this.setState({
          uploadingId: id,
          uploading: true,
          droppedFiles: DATA_HELPERS.objectUpdate({
            [id]: { status: UPLOADING },
          })(droppedFiles),
        });

        return uploadFile.enqueuePhoto(requestFile);
      }
    }

    // no next
    return this.setState({ uploadingId: '', uploading: false });
  };

  removePhoto = id => () => {
    const { droppedIds, uploadedIds } = this.state;

    this.setState({
      droppedIds: DATA_HELPERS.arrayRemove(id)(droppedIds),
      uploadedIds: DATA_HELPERS.arrayRemove(id)(uploadedIds),
    });
  };

  rotateLeft = id => () => {
    this.setState(({ droppedFiles }) => ({
      droppedFiles: dotProp.set(
        droppedFiles,
        `${id}.rotate`,
        UPLOAD_PHOTO_UTILS.rotateLeftFn,
      ),
    }));
  };

  rotateRight = id => () => {
    this.setState(({ droppedFiles }) => ({
      droppedFiles: dotProp.set(
        droppedFiles,
        `${id}.rotate`,
        UPLOAD_PHOTO_UTILS.rotateRightFn,
      ),
    }));
  };

  confirmCancel = event => {
    const { droppedIds } = this.state;

    event.stopPropagation();

    if (!droppedIds.length) {
      return this.handleCloseDialog();
    }

    return PORTAL_HELPERS.confirmCancelUploadPhotos(
      {
        onConfirm: this.handleCloseDialog,
      },
      this.props,
    );
  };

  handleValidSubmit = form => {
    const { id } = this.props;
    const { droppedIds, uploadedFiles, droppedFiles, creating } = this.state;

    if (creating) return null;

    const data = droppedIds.reduce(
      UPLOAD_PHOTO_UTILS.normaliseSubmitData({
        id,
        form,
        uploadedFiles,
        droppedFiles,
      }),
      [],
    );
    if (!data.length) {
      return this.handleCloseDialog();
    }

    return this.setState(
      {
        creating: true,
      },
      this.createNext(data),
    );
  };

  createNext = data => () => {
    const { id } = this.props;
    const { addCount } = this.state;

    if (addCount === 0) {
      this.setState({ adding: true });
    }

    if (addCount >= data.length) {
      return this.handleSubmitSuccess();
    }

    return this.props.resaga.dispatchTo(NODE_API, CREATE_CHILD, {
      payload: {
        keyPath: `${id}.children`,
        nodeId: id,
        node: data[addCount],
      },
      onSuccess: this.handleCreateSuccess(data),
      onError: this.handleCreateSuccess(data),
    });
  };

  handleCreateSuccess = data => ({ node }) => {
    this.setState(
      ({ addCount, createdIds }) => ({
        addCount: addCount + 1,
        createdIds: createdIds.concat(node.id),
      }),
      this.createNext(data),
    );
  };

  notifyAddImageSuccess = createdIds => {
    const { tourId } = this.props;

    if (createdIds && createdIds.length > 0) {
      this.props.resaga.dispatchTo(TEMPLATE_API, ADD_IMAGE_SUCCESS, {
        payload: {
          id: tourId,
          ids: createdIds,
        },
      });
    }
  };

  handleSubmitSuccess = () => {
    const { createdIds } = this.state;

    this.setState({
      addingToGallery: false,
      adding: false,
      creating: false,
      addCount: 0,
      createdIds: [],
    });
    this.notifyAddImageSuccess(createdIds);
    this.fetchTabGallery();

    return this.handleCloseDialog();
  };

  handleSubmitError = () => {
    this.setState({ addingToGallery: false });
  };

  fetchTabGallery = () => {
    const { id } = this.props;

    NODE_API_HELPERS.getNode(
      { id, type: TAB_GALLERY, updateParent: false },
      this.props,
    );
  };

  renderPhoto = id => {
    const { classes } = this.props;
    const { droppedIds, droppedFiles, addingToGallery } = this.state;

    const { requestFile, status, errorMessage, rotate = 0 } = droppedFiles[id];
    const uploadedURL = this.uploadedURL(id);

    return (
      <GridItem key={id} {...UPLOAD_PHOTO_UTILS.gridSize(droppedIds.length)}>
        <div className={classes.photoCard}>
          <Activity
            variant={DROPPED_PHOTO}
            id={id}
            singlePhoto={droppedIds.length === 1}
            uploadedURL={uploadedURL}
            requestFile={requestFile}
            errorMessage={errorMessage}
            status={status}
            rotate={rotate}
            addingToGallery={addingToGallery}
            removePhoto={this.removePhoto}
            rotateLeft={this.rotateLeft}
            rotateRight={this.rotateRight}
          />
        </div>
      </GridItem>
    );
  };

  renderUploadButton = () => {
    const { classes } = this.props;

    return <div className={classes.selectButton}>click to select</div>;
  };

  renderDropZone = () => {
    const { classes } = this.props;
    const { droppedIds } = this.state;

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer alignItems="center" spacing={2}>
            {droppedIds.map(this.renderPhoto)}
          </GridContainer>
        </GridItem>
        <GridItem className={classes.subtitle}>
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>Drag and drop images here or&nbsp;</GridItem>
            <GridItem>
              <FileDropzone
                onDrop={this.handleDrop}
                accept="image/*"
                className={classes.dropzone}
              >
                {this.renderUploadButton}
              </FileDropzone>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderDropZoneCard = () => {
    const { classes } = this.props;
    const { droppedIds, droppedFiles } = this.state;

    return (
      <UGDialogContent className={classnames(classes.dialogContent)}>
        <FileDropzone
          onDrop={this.handleDrop}
          accept="image/*"
          disableClick
          className={classes.dropzone}
          activeClassName={classes.activeClassName}
          droppedIds={droppedIds}
          droppedFiles={droppedFiles}
        >
          {this.renderDropZone}
        </FileDropzone>
      </UGDialogContent>
    );
  };

  renderForm = props => (
    <Formsy onValidSubmit={this.handleValidSubmit} {...props} />
  );

  renderDialog = () => {
    const { droppedIds } = this.state;
    const { galleryContent } = this.props;

    return (
      <Dialog
        open
        onClose={this.confirmCancel}
        fullWidth
        maxWidth={UPLOAD_PHOTO_UTILS.maxWidth(droppedIds.length)}
        PaperProps={this.PaperProps}
      >
        <UGDialogTitle>
          <Title
            heading={`${galleryContent}: Upload`}
            subheading="Upload more photos and images along with a description"
            headingBackground="GALLERY"
          />
        </UGDialogTitle>
        {this.renderDropZoneCard()}
        <UGDialogAction>{this.renderSaveCancelButton()}</UGDialogAction>
      </Dialog>
    );
  };

  renderSaveCancelButton = () => {
    const { galleryContent, classes } = this.props;
    const {
      uploading,
      droppedIds,
      uploadedIds,
      addingToGallery,
      creating,
      adding,
    } = this.state;

    return (
      <GridContainer
        alignItems="center"
        justify="flex-end"
        nowrap
        wrap="nowrap"
        className={classes.noWrap}
      >
        <GridItem>
          <Button
            size="xs"
            color="gray"
            onClick={this.confirmCancel}
            disabled={addingToGallery}
          >
            Discard
          </Button>
        </GridItem>
        {droppedIds.length > 0 && (
          <GridItem>
            <Button size="xs" color="gray" onClick={this.handleMinimiseDialog}>
              Minimise
            </Button>
          </GridItem>
        )}
        {uploading ? (
          <GridItem>
            <Button size="xs" color="gray">
              Uploading {uploadedIds.length} of {droppedIds.length}
            </Button>
          </GridItem>
        ) : (
          <GridItem>
            <Button
              color="primary"
              size="xs"
              type="submit"
              loading={addingToGallery}
              disabled={
                creating ||
                adding ||
                addingToGallery ||
                !droppedIds.length ||
                uploadedIds.length < droppedIds.length
              }
            >
              Add to {galleryContent}
            </Button>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderMinimiseUploadPhotos = () => {
    const { classes } = this.props;
    const { uploadedIds, droppedIds } = this.state;

    const finish = uploadedIds.length === droppedIds.length;

    return (
      <Drawer
        open
        variant="permanent"
        anchor="bottom"
        classes={this.drawerClasses}
      >
        <GridContainer alignItems="center" justify="flex-end" spacing={0}>
          <GridItem>
            <div
              className={classnames(
                classes.uploadPhotosDock,
                LOGIC_HELPERS.ifElse(finish, classes.uploadPhotosDockFinish),
              )}
            >
              <GridContainer
                alignItems="center"
                onClick={this.handleMaximiseDialog}
                wrap="nowrap"
              >
                <GridItem>
                  <Icon
                    icon={LOGIC_HELPERS.ifElse(
                      finish,
                      'lnr-cloud-check',
                      'lnr-cloud-upload',
                    )}
                    size="normal"
                    color={LOGIC_HELPERS.ifElse(finish, 'success', 'blue')}
                    bold={finish}
                    paddingRight
                  />
                </GridItem>
                <GridItem>
                  <span>
                    Uploaded {uploadedIds.length} of {droppedIds.length}
                  </span>
                </GridItem>
                <GridItem>
                  <Button size="xs" color="inline" onClick={this.confirmCancel}>
                    <Icon icon="lnr-cross" size="xsmall" />
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
        </GridContainer>
      </Drawer>
    );
  };

  render = () => {
    const { minimise } = this.state;

    if (!minimise) {
      return this.renderDialog();
    }

    return this.renderMinimiseUploadPhotos();
  };
}

UploadPhotos.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  uploadFile: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  portalId: PropTypes.number,
  onClose: PropTypes.func,
  newFiles: PropTypes.array,
  droppedFiles: PropTypes.object,
  droppedIds: PropTypes.array,
  loading: PropTypes.bool,

  // resaga props
  tourId: PropTypes.number,
  galleryContent: PropTypes.string,
  // customisable props
};

UploadPhotos.defaultProps = {
  droppedFiles: {},
  droppedIds: [],

  galleryContent: 'Gallery',
};

export default compose(
  withStyles(styles, { name: 'UploadPhotos' }),
  resaga(CONFIG),
  withUploadFile({ container: PERSON_CONTAINER, hideUploading: true }),
)(UploadPhotos);
