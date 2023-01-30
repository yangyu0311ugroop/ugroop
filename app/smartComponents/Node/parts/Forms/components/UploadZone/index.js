import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  ATTACHMENT_DATASTORE,
  PERSON_CONTAINER,
  ATTACHMENT_MODEL_NAME,
} from 'appConstants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { FileDropzone, withUploadFile } from 'ugcomponents/File';
import { FORMS, FORM } from 'utils/modelConstants';
import AttachmentsInput from 'smartComponents/Inputs/Attachments';
import Formsy from 'formsy-react';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import ldCcompact from 'lodash/compact';
import { get } from 'lodash';
import DeleteButton from 'smartComponents/Node/types/Form/components/DeleteButton';
import { EditableTextForm } from 'smartComponents/Editables';
import { CONFIG } from './config';
import { LOGIC_HELPERS } from '../../../../../../utils/helpers/logic';

export class FormsUploadZone extends PureComponent {
  componentDidMount = () => {
    this.props.uploadFile.subscribeSuccess(this.handleUploadSuccess);
  };

  handleUploadSuccess = (file, uploadfileId, afterUpload) => {
    const { id: parentNodeId } = this.props;
    NODE_API_HELPERS.createNodeAndAttachment(
      {
        node: { type: FORM },
        parentNodeId,
        childKey: FORMS,
        file,
        onSuccess: this.uploadSuccess(file, uploadfileId, afterUpload),
      },
      this.props,
    );
  };

  uploadSuccess = (file, uploadfileId, afterUpload) => data => {
    const { fileResult = {} } = data;
    const { id } = fileResult;
    afterUpload(id);
  };

  handleDrop = files => {
    const { uploadFile } = this.props;
    files.forEach(file => uploadFile.enqueueFile(file, file.name));
  };

  onSubmit = data => {
    const { id, model, onSuccess, onError, index } = data;
    const { attachmentIds, formIds } = this.props;
    const idx = attachmentIds.indexOf(id);

    const formId = formIds[idx];
    const description = get(
      model,
      `${ATTACHMENT_MODEL_NAME}.${index}.description`,
      '',
    );
    // onSuccess();
    NODE_API_HELPERS.updateAttachment(
      {
        description,
        attachmentId: id,
        id: formId,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  removeAttachment = ({ id, onRemoveFile }) => () => onRemoveFile(id);

  renderDelete = ({ id, onRemoveFile }) => {
    const { formIds, attachmentIds, id: parentNodeId } = this.props;
    const idx = attachmentIds.indexOf(id);

    const formId = formIds[idx];
    return (
      <DeleteButton
        id={formId}
        parentNodeId={parentNodeId}
        parentOnSuccess={this.removeAttachment({ id, onRemoveFile })}
        simple
      />
    );
  };

  renderEditableAttachment = () => (
    <Formsy>
      <GridContainer direction="column">
        <GridItem>
          <AttachmentsInput
            parentDefaultIds={ldCcompact(this.props.attachmentIds)}
            card
            selector={ATTACHMENT_DATASTORE}
            hideHeader
            uploadFileSuccess={this.handleUploadSuccess}
            inline
            onSubmit={this.onSubmit}
            renderDelete={this.renderDelete}
            // editing={!this.props.formIds.length}
            onClose={this.props.onCancel}
            cancelButtonLabel={LOGIC_HELPERS.ifElse(
              this.props.formIds.length,
              'Back to Preview',
              'Cancel',
            )}
            inlineComponent={EditableTextForm}
            label={this.props.label}
          />
        </GridItem>
      </GridContainer>
    </Formsy>
  );

  render = () => {
    const { compact, simple } = this.props;
    if (!simple) {
      return this.renderEditableAttachment();
    }
    return (
      <FileDropzone
        hasTextWidth={false}
        onDrop={this.handleDrop}
        compact={compact}
        compactText="Upload"
      />
    );
  };
}

FormsUploadZone.propTypes = {
  // hoc props
  // resaga: PropTypes.object.isRequired,
  uploadFile: PropTypes.object.isRequired,
  attachmentIds: PropTypes.array,

  // parent props
  id: PropTypes.number,
  compact: PropTypes.bool,
  simple: PropTypes.bool,
  formIds: PropTypes.array,
  onCancel: PropTypes.func,
  label: PropTypes.string,
};

FormsUploadZone.defaultProps = {
  id: null,
  compact: false,
  simple: true,
  attachmentIds: [],
  formIds: [],
};

export default compose(
  resaga(CONFIG),
  withUploadFile({ container: PERSON_CONTAINER }),
)(FormsUploadZone);
