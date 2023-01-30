/**
 * Created by stephenkarpinskyj on 26/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';

import { PERSON_CONTAINER } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'ugcomponents/Buttons/Button';
import FieldTable from 'ugcomponents/Inputs/FieldTable';
import withFieldTable from 'ugcomponents/Inputs/FieldTable/hoc/withFieldTable';
import { FileDropzone, withUploadFile } from 'ugcomponents/File';
import Field from '../Field';

export class AttachmentList extends React.PureComponent {
  componentWillMount = () => {
    const { uploadFile } = this.props;
    uploadFile.subscribeSuccess(this.handleFileUploadSuccess);
  };

  handleAddLinkButtonClick = () => {
    const { addRow } = this.props;
    addRow({ id: Date.now(), type: 'link' });
  };

  handleFileDrop = files => {
    const { uploadFile } = this.props;
    files.forEach(file => uploadFile.enqueueFile(file));
  };

  handleFileUploadSuccess = ({ name, size, url }) => {
    this.props.addRow({
      id: Date.now(),
      type: 'file',
      name,
      size,
      url,
    });
  };

  handleRenderHeader = () =>
    this.renderRow(
      this.props.readOnly ? null : <span />,
      <GridContainer>
        <GridItem xs={1}>
          <div align="center">Type</div>
        </GridItem>
        <GridItem xs={5}>Info</GridItem>
        <GridItem xs>Description</GridItem>
      </GridContainer>,
    );

  handleRenderFooter = () =>
    this.props.readOnly ? null : (
      <GridContainer>
        <GridItem>
          <FileDropzone onDrop={this.handleFileDrop} />
        </GridItem>
        <GridItem>
          <Button onClick={this.handleAddLinkButtonClick} outline="outLineGrey">
            Add Link
          </Button>
        </GridItem>
      </GridContainer>
    );

  handleRenderRow = (values, index, onRenderRemoveButton) =>
    this.renderRow(onRenderRemoveButton(), this.renderField(values));

  renderField = (values, currentValues) => {
    const {
      onTypeInputs,
      onUrlInputs,
      onNameInputs,
      onSizeInputs,
      onDescriptionInputs,
    } = this.props;
    return (
      <Field
        values={values}
        currentValues={currentValues}
        onTypeInputs={onTypeInputs}
        onUrlInputs={onUrlInputs}
        onNameInputs={onNameInputs}
        onSizeInputs={onSizeInputs}
        onDescriptionInputs={onDescriptionInputs}
      />
    );
  };

  renderRow = (removeButton, attachment) => (
    <GridContainer>
      <GridItem xs>{attachment}</GridItem>
      {removeButton && <GridItem xs={1}>{removeButton}</GridItem>}
    </GridContainer>
  );

  render = () => {
    const { removeRow, values } = this.props;
    return (
      <FieldTable
        values={values}
        onRenderHeader={this.handleRenderHeader}
        onRenderFooter={this.handleRenderFooter}
        onRenderRow={this.handleRenderRow}
        onRemoveRow={removeRow}
      />
    );
  };
}

AttachmentList.propTypes = {
  // hoc
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  uploadFile: PropTypes.object.isRequired,

  // parent
  readOnly: PropTypes.bool,
  values: PropTypes.array,
  onTypeInputs: PropTypes.func.isRequired,
  onUrlInputs: PropTypes.func.isRequired,
  onNameInputs: PropTypes.func.isRequired,
  onSizeInputs: PropTypes.func.isRequired,
  onDescriptionInputs: PropTypes.func.isRequired,
};

AttachmentList.defaultProps = {
  readOnly: false,
  values: null,
};

export default compose(
  withFieldTable(),
  resaga(),
  withUploadFile({ container: PERSON_CONTAINER }), // TODO: Which container?
)(AttachmentList);
