import { PERSON_CONTAINER, UPLOADED, UPLOADING } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { DATA_HELPERS } from 'datastore/utils';
import dotProp from 'dot-prop-immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Attachment from 'smartComponents/Inputs/Attachments/components/Attachment';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { FILE_HELPERS, FileDropzone, withUploadFile } from 'ugcomponents/File';
import Data from 'ugcomponents/Inputs/DataField';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { queryImageURL } from 'utils/helpers/request';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

const defaultIds = props => {
  const { data, parentDefaultIds } = props;

  return parentDefaultIds || EVENT_VIEW_HELPERS.eventAttachments(data);
};
const DEFAULT_LABEL =
  'Upload PDFs, documents, booking confirmations, tickets, ' +
  'vouchers, boarding passes, rental agreements and anything ' +
  'else you might need when travelling.';

export class Attachments extends PureComponent {
  state = {
    droppedFiles: {},
    droppedIds: defaultIds(this.props),
    uploadedFiles: {},
    uploadedIds: defaultIds(this.props),
    uploadProgress: 0,
    uploadSpeed: 0,
    remainingTime: 0,
  };

  componentDidMount = () => {
    const { valueRef } = this.props;

    this.props.uploadFile.subscribeSuccess(this.handleUploadSuccess);
    this.props.uploadFile.subscribeError(this.handleUploadError);

    LOGIC_HELPERS.ifFunction(valueRef, [this.value]);
  };

  componentWillUnmount = () => {
    const { valueRef } = this.props;

    LOGIC_HELPERS.ifFunction(valueRef, [null]);
  };

  value = () => {
    const { uploadedIds, uploadedFiles } = this.state;

    return { uploadedIds, uploadedFiles };
  };

  handleUploadProgress = ({ uploadProgress, uploadSpeed, remainingTime }) => {
    this.setState({
      uploadProgress,
      uploadSpeed,
      remainingTime,
    });
  };

  inlineAfterUpload = ({
    uploadedIds,
    uploadedFiles,
    droppedFiles,
    uploadingId,
    file,
    droppedIds,
  }) => attachmentId => {
    const removedDroppedIds = droppedIds.map(id =>
      LOGIC_HELPERS.ifElse(id === uploadingId, attachmentId, id),
    );
    this.setState(
      {
        uploadedIds: DATA_HELPERS.arrayAdd(attachmentId)(uploadedIds),

        uploadedFiles: DATA_HELPERS.objectAdd({
          [uploadingId]: file,
        })(uploadedFiles),
        droppedFiles: {
          ...DATA_HELPERS.objectUpdate({
            [uploadingId]: { status: UPLOADED },
          })(droppedFiles),
        },
        uploading: false,
        droppedIds: [...removedDroppedIds],
        uploadingId: '',
      },
      this.uploadNext,
    );
  };

  handleUploadSuccess = file => {
    const { onUpload, uploadFileSuccess, inline } = this.props;
    const { uploadingId: id } = this.state;
    const { url: link, name } = file;
    LOGIC_HELPERS.ifFunction(onUpload, [id, { link, name }]);

    if (inline) {
      LOGIC_HELPERS.ifFunction(uploadFileSuccess, [
        file,
        id,
        this.inlineAfterUpload(this.state),
      ]);
    } else {
      this.setState(
        ({ uploadedIds, uploadedFiles, droppedFiles, uploadingId }) => ({
          uploadedIds: DATA_HELPERS.arrayAdd(uploadingId)(uploadedIds),
          uploadedFiles: DATA_HELPERS.objectAdd({
            [uploadingId]: file,
          })(uploadedFiles),
          droppedFiles: DATA_HELPERS.objectUpdate({
            [uploadingId]: { status: UPLOADED },
          })(droppedFiles),
          uploading: false,
          uploadingId: '',
        }),
        this.uploadNext,
      );
    }
  };

  handleEnqueueError = id => error => {
    this.handleUploadErrorState(id, error);
  };

  handleUploadError = (id, error) => {
    const { onUpload } = this.props;

    LOGIC_HELPERS.ifFunction(onUpload, [this.state]);

    const errorMessage = dotProp.get(
      error,
      'raw.response.error.message',
      error,
    );

    this.handleUploadErrorState(id, errorMessage);
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

  handleDrop = newFiles => {
    const normalised = FILE_HELPERS.normaliseDrop(newFiles);

    this.setState(
      ({ droppedFiles, droppedIds }) => ({
        droppedFiles: DATA_HELPERS.objectAdd(normalised.droppedFiles)(
          droppedFiles,
        ),
        droppedIds: DATA_HELPERS.arrayAdd(normalised.droppedIds)(droppedIds),
      }),
      this.uploadNext,
    );
  };

  uploadNext = () => {
    const { uploadFile, onChange } = this.props;
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

        return uploadFile.enqueueFile(requestFile, undefined, undefined, {
          onUploadProgress: this.handleUploadProgress,
          onUploadError: this.handleEnqueueError(id),
        });
      }
    }

    // no next
    LOGIC_HELPERS.ifFunction(onChange, [this.value()]);
    return this.setState({ uploadingId: '', uploading: false });
  };

  uploadedURL = id => {
    const { uploadedFiles } = this.state;

    if (!uploadedFiles[id]) {
      return null;
    }

    return queryImageURL(uploadedFiles[id].url, true);
  };

  handleRemoveFile = id => () => {
    const { onRemove, onChange } = this.props;
    const { droppedIds, uploadedIds } = this.state;

    LOGIC_HELPERS.ifFunction(onRemove, [id]);

    this.setState(
      {
        droppedIds: DATA_HELPERS.arrayRemove(id)(droppedIds),
        uploadedIds: DATA_HELPERS.arrayRemove(id)(uploadedIds),
      },
      () => {
        LOGIC_HELPERS.ifFunction(onChange, [this.value()]);
      },
    );
  };

  renderDroppedFile = (id, index) => {
    const {
      droppedFiles,
      uploadedFiles,
      uploadProgress,
      remainingTime,
    } = this.state;
    const {
      inline,
      onSubmit,
      selector,
      renderDelete,
      inlineComponent,
    } = this.props;

    return (
      <Attachment
        key={id}
        id={id}
        index={index}
        Browse
        file={droppedFiles[id]}
        uploadedFile={uploadedFiles[id]}
        uploadProgress={uploadProgress}
        remainingTime={remainingTime}
        onRemoveFile={this.handleRemoveFile(id)}
        selector={selector}
        inline={inline}
        onSubmit={onSubmit}
        renderDelete={renderDelete}
        inlineComponent={inlineComponent}
      />
    );
  };

  renderUploadButton = () => (
    <JText underline link>
      browse
    </JText>
  );

  renderBrowserButton = () => (
    <JButton padding="lg" borderGray block>
      <JText blue uppercase bold>
        Browse files from your device
      </JText>
    </JButton>
  );

  renderDropZone = () => {
    const { classes } = this.props;
    const { droppedIds } = this.state;

    if (!droppedIds.length) {
      return (
        <div className={classes.rootEmpty}>
          <GridContainer direction="column" alignItems="center">
            <GridItem>
              <div className={classes.border}>
                <JText blue uppercase bold>
                  Drag and drop files here
                </JText>
              </div>
            </GridItem>
            <GridItem>
              <JText dark uppercase>
                Or
              </JText>
            </GridItem>
            <GridItem>
              <FileDropzone
                onDrop={this.handleDrop}
                className={classes.dropzone}
              >
                {this.renderBrowserButton}
              </FileDropzone>
            </GridItem>
          </GridContainer>
        </div>
      );
    }

    // formsy doesnt trigger onChange on remove component
    // temp.eventAttachmentsLength to trigger onChange on delete file
    return (
      <div className={classes.root}>
        <GridContainer direction="column">
          <Data
            currentValue={droppedIds.length}
            name="temp.eventAttachmentsLength"
          />

          {droppedIds.length > 0 && (
            <>
              <GridItem>
                <GridContainer direction="column">
                  {droppedIds.map(this.renderDroppedFile)}
                </GridContainer>
              </GridItem>

              <Hr half />
            </>
          )}
          <GridItem>
            <JText gray italic>
              <GridContainer alignItems="center" spacing={0}>
                <GridItem>Drag and drop files here or&nbsp;</GridItem>
                <GridItem>
                  <FileDropzone
                    onDrop={this.handleDrop}
                    className={classes.dropzone}
                  >
                    {this.renderUploadButton}
                  </FileDropzone>
                </GridItem>
                <GridItem>&nbsp;to upload</GridItem>
              </GridContainer>
            </JText>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  renderSimpleDropZone = id => {
    const { uploadLabel } = this.props;

    return (
      <GridContainer direction="column">
        <>
          <GridItem>{uploadLabel}</GridItem>
          <GridItem>
            <GridContainer direction="column">
              {this.renderDroppedFile(id)}
            </GridContainer>
          </GridItem>
          <Hr half />
        </>
      </GridContainer>
    );
  };

  render = () => {
    const {
      classes,
      headingClassName,
      children,
      simple,
      uploadLabel,
      disableClick,
      accept,
      allowPaste,
      onClose,
      editing,
      hideHeader,
      cancelButtonLabel,
      label,
    } = this.props;
    const {
      droppedIds,
      droppedFiles,
      uploadProgress,
      uploadSpeed,
      uploadingId,
    } = this.state;

    if (simple) {
      return (
        <FileDropzone
          onDrop={this.handleDrop}
          className={classes.dropzoneSimple}
          activeClassName={classes.activeClassName}
          droppedIds={droppedIds}
          droppedFiles={droppedFiles}
          uploadProgress={uploadProgress}
          simple
          disableClick={disableClick}
          accept={accept}
          allowPaste={allowPaste}
        >
          {children}
          {uploadingId && this.renderSimpleDropZone(uploadingId)}
        </FileDropzone>
      );
    }

    return (
      <GridContainer direction="column" spacing={2}>
        <GridItem>
          <GridContainer alignItems="center" className={headingClassName}>
            <GridItem xs>
              <GridContainer direction="column" spacing={1}>
                <GridItem>
                  <GridContainer alignItems="center" spacing={0}>
                    {!hideHeader && (
                      <GridItem xs>
                        <JText bold black>
                          {uploadLabel}
                        </JText>
                      </GridItem>
                    )}

                    {uploadProgress < 100 && uploadSpeed > 0 && (
                      <GridItem>
                        <JText xs gray>
                          Upload Speed: {uploadSpeed}kB/s
                        </JText>
                      </GridItem>
                    )}

                    {!editing &&
                      !(this.state.uploading && this.props.inline) &&
                      LOGIC_HELPERS.ifElse(
                        onClose,
                        <GridItem>
                          <JText blue onClick={onClose}>
                            {cancelButtonLabel}
                          </JText>
                        </GridItem>,
                      )}
                  </GridContainer>
                </GridItem>
                <GridItem>
                  <JText gray nowrap={false}>
                    {LOGIC_HELPERS.ifElse(label, label, DEFAULT_LABEL)}
                  </JText>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <FileDropzone
            onDrop={this.handleDrop}
            disableClick
            className={classes.dropzone}
            activeClassName={classes.activeClassName}
            droppedIds={droppedIds}
            droppedFiles={droppedFiles}
            uploadProgress={uploadProgress}
            allowPaste={allowPaste}
          >
            {this.renderDropZone}
          </FileDropzone>
        </GridItem>

        <GridItem>
          <JText gray nowrap={false}>
            Click on the file name after the upload has been done to enter a
            meaningful description.
          </JText>
        </GridItem>
      </GridContainer>
    );
  };
}

Attachments.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  uploadFile: PropTypes.object.isRequired,

  // parent props
  headingClassName: PropTypes.string,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
  valueRef: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  simple: PropTypes.bool,
  children: PropTypes.any,
  uploadLabel: PropTypes.string,
  disableClick: PropTypes.bool,
  accept: PropTypes.string,
  allowPaste: PropTypes.bool,
  editing: PropTypes.bool,
  selector: PropTypes.string,
  hideHeader: PropTypes.array,
  uploadFileSuccess: PropTypes.func,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func,
  renderDelete: PropTypes.func,
  cancelButtonLabel: PropTypes.string,
  inlineComponent: PropTypes.any,
  label: PropTypes.string,
  // resaga props
};

Attachments.defaultProps = {
  uploadLabel: 'Attachments',
  cancelButtonLabel: 'Cancel',
};

export default compose(
  withStyles(styles, { name: 'Attachments' }),
  resaga(CONFIG),
  withUploadFile({ container: PERSON_CONTAINER, hideUploading: true }),
)(Attachments);
