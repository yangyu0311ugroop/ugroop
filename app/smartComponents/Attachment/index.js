import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { withStyles } from 'components/material-ui';
import { compose } from 'redux';
import classNames from 'classnames';
import { DEFAULT, EMPTY_RTE } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React from 'react';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { Description } from 'smartComponents/Attachment/parts';
import { EditableForm } from 'smartComponents/Editables';
import { File } from 'smartComponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import AttachmentView, { AttachmentBorder } from 'viewComponents/Attachment';
import DeleteButton from 'viewComponents/DeleteButton';
import { CONFIG } from './config';
import inputs from './inputs';
import styles from './styles';

export class Attachment extends React.PureComponent {
  hasDescription = () => {
    const { description } = this.props;
    return description !== EMPTY_RTE && !!description;
  };

  handleEditableSubmit = ({ model: { attachment }, ...rest }) => {
    const { parentNodeId: id, id: attachmentId } = this.props;

    if (!attachmentId) {
      return NODE_API_HELPERS.createAttachment(
        {
          id,
          file: attachment,
          ...rest,
        },
        this.props,
      );
    }

    return NODE_API_HELPERS.updateAttachment(
      {
        id,
        attachmentId,
        ...attachment,
        ...rest,
      },
      this.props,
    );
  };

  handleEditableDeleteClick = ({ onCancel }) => ({ onLoad, onClose }) => {
    const { parentNodeId: id } = this.props;
    NODE_API_HELPERS.removeAttachment(
      {
        id,
        onSuccess: this.handleRemoveAttachmentSuccess({
          onCancel,
          onLoad,
          onClose,
        }),
        onError: this.handleRemoveAttachmentError({ onLoad }),
      },
      this.props,
    );
  };

  handleRemoveAttachmentSuccess = ({ onCancel, onLoad, onClose }) => {
    LOGIC_HELPERS.ifFunction(onCancel);
    LOGIC_HELPERS.ifFunction(onLoad);
    LOGIC_HELPERS.ifFunction(onClose);
  };

  handleRemoveAttachmentError = ({ onLoad }) => {
    LOGIC_HELPERS.ifFunction(onLoad);
  };

  renderPart = (Component, variant, props = {}) => (
    <Component {...this.props} variant={variant} {...props} />
  );

  renderDescription = () =>
    this.hasDescription() &&
    this.renderPart(Description, VARIANTS.TEXT_ONLY, {
      width: SIZE_CONSTANTS.XXS,
    });

  renderTextOnly = () => {
    const { url, classes, ...rest } = this.props;
    return (
      <AttachmentView
        link={url}
        renderDescription={this.renderDescription}
        {...rest}
      />
    );
  };

  renderTextField = () => {
    const { url, name, fileSize } = this.props;
    return <File value={{ url, name, fileSize }} {...inputs.base} showClear />;
  };

  renderForm = () => {
    const { hasMaxWidth, classes } = this.props;
    return (
      <AttachmentBorder>
        <GridContainer direction="column">
          <GridItem
            className={classNames(
              classes.dropzoneContainer,
              hasMaxWidth && classes.fileContainer,
            )}
          >
            {this.renderTextField()}
          </GridItem>
          {this.renderPart(Description, VARIANTS.TEXT_FIELD, {
            width: SIZE_CONSTANTS.XXS,
          })}
        </GridContainer>
      </AttachmentBorder>
    );
  };

  renderEditableFormActions = (...editableProps) => () => {
    const { id } = this.props;
    return (
      !!id && (
        <DeleteButton
          dialogTitle="Delete this Attachment"
          headlineText="Are you sure you want to delete this Attachment?"
          confirmButton="Delete Attachment"
          onClick={this.handleEditableDeleteClick(...editableProps)}
        />
      )
    );
  };

  renderEditable = () => {
    const { id, showEmpty, readOnly, placeholder } = this.props;

    if (!id && !showEmpty) return null;

    return (
      <EditableForm
        value={id}
        renderValue={this.renderTextOnly}
        renderSecondaryFormActionsWithProps={this.renderEditableFormActions}
        onSubmit={this.handleEditableSubmit}
        readOnly={readOnly}
        placeholder={placeholder}
      >
        {this.renderForm()}
      </EditableForm>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.FORM]: this.renderForm,
      [VARIANTS.THUMBNAIL]: this.renderThumbnail,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

Attachment.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  parentNodeId: PropTypes.number,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  showEmpty: PropTypes.bool,
  hasMaxWidth: PropTypes.bool,

  // resaga value
  url: PropTypes.string,
  name: PropTypes.string,
  fileSize: PropTypes.number,
  description: PropTypes.string,
};

Attachment.defaultProps = {
  id: null,
  parentNodeId: null,
  variant: null,
  hasMaxWidth: false,

  url: null,
  name: null,
  fileSize: null,
  description: null,
  readOnly: null,
};

// export default resaga(CONFIG)(Attachment);
export default compose(
  withStyles(styles, { name: 'Attachment' }),
  resaga(CONFIG),
)(Attachment);
