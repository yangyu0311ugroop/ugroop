import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import {
  FILE_CONTAINER_API,
  NODE_API,
  REMOVE_ATTACHMENT,
  UPDATE_ATTACHMENT,
  UPLOAD_FILE,
} from 'apis/constants';
import { PERSON_CONTAINER } from 'appConstants';
import GridItem from 'components/GridItem/index';
import SectionAttachment from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/RenderActivity/components/SectionAttachment';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import AttachmentSmart from 'smartComponents/Attachment';
import { uploadStatus } from 'utils/constant';
import { padFacadeURL } from 'utils/helpers/request';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class Attachment extends PureComponent {
  state = {
    fileUploadStatus: uploadStatus.pending,
    newDescription: this.props.description,
  };

  onUploadFileSuccess = file => response => {
    const { id, sectionId } = this.props;

    let url = null;
    if (response) {
      url = response.result.files['file-to-upload'].downloadURL;
      this.setState({
        fileUploadStatus: uploadStatus.success,
      });
      this.handleChange('attachment')({
        id,
        name: file.name,
        url,
        fileSize: file.size,
        removed: false,
        nodeId: sectionId,
      });
    }
  };

  uploadFile = file => {
    const { sectionId, id } = this.props;
    this.setState({
      fileUploadStatus: uploadStatus.pending,
    });
    const data = new FormData();
    data.append('file-to-upload', file);
    const payload = {
      id: sectionId,
      container: PERSON_CONTAINER,
      data,
      setValueToStore: true,
      isSection: true,
    };
    if (id) {
      this.props.resaga.dispatchTo(NODE_API, REMOVE_ATTACHMENT, {
        payload: {
          id: sectionId,
          isSection: true,
        },
      });
    }
    this.props.resaga.dispatchTo(FILE_CONTAINER_API, UPLOAD_FILE, {
      payload: {
        ...payload,
        description: this.state.newDescription,
        fileName: file.name,
      },
      onSuccess: this.onUploadFileSuccess(file),
    });
  };

  removeFile = () => {
    const { sectionId, description, id } = this.props;
    const payload = {
      name: '',
      description,
      url: '',
      fileSize: 0,
    };

    this.props.resaga.dispatchTo(NODE_API, UPDATE_ATTACHMENT, {
      payload: {
        id: sectionId,
        attachmentId: id,
        isSection: true,
        ...payload,
      },
    });
  };

  handleChange = key => value => {
    const { sectionId } = this.props;

    this.props.resaga.setValue({
      editSections: sections.upsert(
        { id: sectionId },
        { node: { [key]: value } },
      ),
    });
  };

  renderEditMode = () => {
    const { classes, id } = this.props;

    return (
      <GridItem>
        <SectionAttachment
          className={classes.attachment}
          attachmentId={id}
          uploadFile={this.uploadFile}
          removeAttachment={this.removeFile}
          onChangeAttachDescription={this.handleChange('attachmentDescription')}
          uploadStatus={this.state.fileUploadStatus}
        />
      </GridItem>
    );
  };

  renderFileName = () => {
    const { classes, name, attachmentURL, fileSize } = this.props;

    if (fileSize) {
      return (
        <Tooltip placement="top" title="Click to Download">
          <div>
            <a
              className={classes.fileName}
              href={padFacadeURL(attachmentURL)}
              target="_blank"
            >
              {name}
            </a>
          </div>
        </Tooltip>
      );
    }

    return <div className={classes.filePending}>File Pending</div>;
  };

  renderReadOnly = () => {
    const {
      classes,
      id,
      showHr,
      sectionId,
      canUpdate,
      showEmpty,
      placeholder,
    } = this.props;

    return (
      <GridItem className={classes.view}>
        {showHr && <hr className={classes.hr} />}
        <AttachmentSmart
          id={id}
          parentNodeId={sectionId}
          variant={VARIANTS.EDITABLE}
          readOnly={!canUpdate}
          placeholder={placeholder}
          showEmpty={showEmpty}
        />
      </GridItem>
    );
  };

  render = () => {
    const { readonly } = this.props;

    return readonly ? this.renderReadOnly() : this.renderEditMode();
  };
}

Attachment.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // attachment id
  sectionId: PropTypes.number.isRequired, // section id
  readonly: PropTypes.bool,
  canUpdate: PropTypes.bool,
  showEmpty: PropTypes.bool,
  showHr: PropTypes.bool,
  placeholder: PropTypes.string,

  // resaga props
  attachmentURL: PropTypes.string, // attachment url
  name: PropTypes.string,
  fileSize: PropTypes.number,
  description: PropTypes.string,
};

Attachment.defaultProps = {
  readonly: false,
  canUpdate: false,
  name: '',
  attachmentURL: '',
  fileSize: 0,
  description: '',
  placeholder: 'Add an attachment',
};

export default compose(
  withStyles(styles, { name: 'Attachment' }),
  resaga(CONFIG),
)(Attachment);
