import { UPLOADED, UPLOADING, ATTACHMENT_MODEL_NAME } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import Data from 'ugcomponents/Inputs/DataField';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import isFunction from 'lodash/isFunction';
// import { EditableTextForm } from 'smartComponents/Editables';
// import EditableTextForm from 'smartComponents/Editables/TextForm';
import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { eventAttachment } = props;

  return {
    url: get(eventAttachment, 'link') || get(eventAttachment, 'url'),
    size: get(eventAttachment, 'size') || get(eventAttachment, 'fileSize'),
    type: get(eventAttachment, 'type'),
    name: get(eventAttachment, 'name'),
    isDeleted: false,
  };
};

export class Attachment extends PureComponent {
  state = {
    ...defaultValue(this.props),
  };

  getUploadedFile = () => {
    const { uploadedFile } = this.props;
    const { url, size, type, name } = this.state;

    if (uploadedFile) return uploadedFile;

    return {
      url,
      size,
      requestFile: { type },
      name,
    };
  };

  handleDelete = () => {
    this.setState({ isDeleted: true });
  };

  handleUndoDelete = () => {
    this.setState({ isDeleted: false });
  };

  onInlineSubmit = data => {
    const { id, onSubmit, index } = this.props;
    onSubmit({ id, index, ...data });
  };

  renderInlineDelete = id => {
    const { renderDelete, onRemoveFile } = this.props;
    if (isFunction(renderDelete)) return renderDelete({ id, onRemoveFile });
    return null;
  };

  render = () => {
    const {
      id,
      index,
      file,
      uploadedFile,
      onRemoveFile,
      uploadProgress,
      remainingTime,
      eventAttachment,
      inline,
      classes,
      inlineComponent: InlineComponent,
    } = this.props;
    const { url, size, type, name, isDeleted } = this.state;

    const status = LOGIC_HELPERS.ifElse(
      eventAttachment,
      UPLOADED,
      get(file, 'status'),
    );

    const errorMessage = get(
      uploadedFile,
      'errorMessage',
      get(file, 'errorMessage'),
    );
    const fileName = get(file, 'requestFile.name', name);
    const fileSize = get(
      uploadedFile,
      'size',
      get(file, 'requestFile.size', size),
    );

    const renderFileSize = LOGIC_HELPERS.renderFileSize(fileSize);

    return (
      <>
        {LOGIC_HELPERS.ifElse(
          !!eventAttachment,
          <>
            <Data
              currentValue={id}
              name={`${ATTACHMENT_MODEL_NAME}.${index}.id`}
            />
            <Data
              currentValue={isDeleted}
              name={`${ATTACHMENT_MODEL_NAME}.${index}.isDeleted`}
            />
          </>,
        )}
        <Data
          currentValue={get(uploadedFile, 'url', url)}
          name={`${ATTACHMENT_MODEL_NAME}.${index}.link`}
        />
        <Data
          currentValue={fileSize}
          name={`${ATTACHMENT_MODEL_NAME}.${index}.size`}
        />
        <Data
          currentValue={get(uploadedFile, 'requestFile.type', type)}
          name={`${ATTACHMENT_MODEL_NAME}.${index}.type`}
        />
        <Data
          currentValue={fileName}
          name={`${ATTACHMENT_MODEL_NAME}.${index}.name`}
        />
        {LOGIC_HELPERS.ifElse(
          errorMessage,
          <Data
            currentValue={errorMessage}
            name={`${ATTACHMENT_MODEL_NAME}.${index}.errorMessage`}
          />,
        )}

        <GridItem>
          <GridContainer alignItems="center" spacing={2} wrap="nowrap">
            <GridItem>
              <JText gray xs bold>
                {index + 1}
              </JText>
            </GridItem>
            <GridItem xs>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer alignItems="center" wrap="nowrap">
                    <GridItem />
                    <GridItem xs className={inline && classes.filledEffect}>
                      {LOGIC_HELPERS.ifElse(
                        [status === UPLOADED, !errorMessage],
                        inline ? (
                          <InlineComponent
                            // TextComponent={FText}
                            value={get(eventAttachment, 'description')}
                            name={`${ATTACHMENT_MODEL_NAME}.${index}.description`}
                            placeholder="Enter file description"
                            TextProps={{
                              InputProps: { disableUnderline: true },
                            }}
                            label={
                              <JText gray sm nowrap={false}>
                                {fileName} ({renderFileSize})
                              </JText>
                            }
                            // TextProps={}
                            inline
                            onSubmit={this.onInlineSubmit}
                            readOnly={isDeleted}
                          />
                        ) : (
                          <FText
                            disabled={isDeleted}
                            name={`${ATTACHMENT_MODEL_NAME}.${index}.description`}
                            label={
                              <JText
                                gray
                                sm
                                nowrap={false}
                                className={classes.marginTop}
                                ellipsis
                              >
                                {fileName} ({renderFileSize})
                              </JText>
                            }
                            placeholder="Enter file description"
                            value={get(eventAttachment, 'description')}
                          />
                        ),
                        // <a href={this.uploadedURL(id)} target="_blank">
                        //   {requestFile.name}
                        // </a>
                        <GridContainer direction="column" spacing={0}>
                          {LOGIC_HELPERS.ifElse(
                            [
                              status === UPLOADING,
                              !errorMessage,
                              remainingTime > 0,
                            ],
                            <GridItem>
                              <JText blue xs uppercase>
                                Uploading {Math.round(uploadProgress)}% /{' '}
                                {remainingTime}s
                              </JText>
                            </GridItem>,
                            <GridItem>
                              {LOGIC_HELPERS.ifElse(
                                !errorMessage,
                                <JText warning xs uppercase>
                                  Pending
                                </JText>,
                              )}
                            </GridItem>,
                          )}
                          <GridItem>
                            <JText dark ellipsis>
                              {fileName} ({renderFileSize})
                            </JText>
                          </GridItem>
                        </GridContainer>,
                      )}
                    </GridItem>
                    {inline && !errorMessage
                      ? this.renderInlineDelete(id)
                      : LOGIC_HELPERS.ifElse(
                          status !== UPLOADING,
                          <GridItem>
                            {LOGIC_HELPERS.ifElse(
                              !isDeleted,
                              <JText
                                onClick={LOGIC_HELPERS.ifElse(
                                  eventAttachment,
                                  this.handleDelete,
                                  onRemoveFile,
                                )}
                              >
                                <Icon size="small" icon="lnr-cross" />
                              </JText>,
                              <GridContainer direction="column" spacing={0}>
                                <GridItem>
                                  <JText gray>Deleted</JText>
                                </GridItem>
                                <GridItem>
                                  <JText link onClick={this.handleUndoDelete}>
                                    Undo?
                                  </JText>
                                </GridItem>
                              </GridContainer>,
                            )}
                          </GridItem>,
                        )}

                    {/* {LOGIC_HELPERS.ifElse(
                      status !== UPLOADING,
                      <GridItem>
                        {LOGIC_HELPERS.ifElse(
                          !isDeleted,
                          <JText
                            onClick={LOGIC_HELPERS.ifElse(
                              eventAttachment,
                              this.handleDelete,
                              onRemoveFile,
                            )}
                          >
                            <Icon size="small" icon="lnr-cross" />
                          </JText>,
                          <GridContainer direction="column" spacing={0}>
                            <GridItem>
                              <JText gray>Deleted</JText>
                            </GridItem>
                            <GridItem>
                              <JText link onClick={this.handleUndoDelete}>
                                Undo?
                              </JText>
                            </GridItem>
                          </GridContainer>,
                        )}
                      </GridItem>,
                    )} */}
                  </GridContainer>
                </GridItem>
                {LOGIC_HELPERS.ifElse(
                  errorMessage,
                  <GridItem>
                    <JText danger italic>
                      Upload Failed: {errorMessage}
                    </JText>
                  </GridItem>,
                )}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </>
    );
  };
}

Attachment.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  index: PropTypes.number,
  file: PropTypes.object,
  uploadedFile: PropTypes.object,
  eventAttachment: PropTypes.object,
  onRemoveFile: PropTypes.func,
  uploadProgress: PropTypes.any,
  remainingTime: PropTypes.any,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func,
  renderDelete: PropTypes.func,
  inlineComponent: PropTypes.any,

  // resaga props
};

Attachment.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Attachment' }),
  resaga(CONFIG),
)(Attachment);
