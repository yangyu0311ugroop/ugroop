import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import JText from 'components/JText';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'ugcomponents/Icon';
import { SNACKBAR_HELPER } from 'ugcomponents/SnackBar/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { H5 } from 'viewComponents/Typography';
import { EditableForm } from 'smartComponents/Editables';
import Attachment, { AttachmentBorder } from 'viewComponents/Attachment';
import Description from 'smartComponents/Event/components/Event/parts/Attachment/Description';
import Name from 'smartComponents/Event/components/Event/parts/Attachment/Name';
import AttachmentLink from 'smartComponents/Event/components/Event/parts/Attachment/Link';
import { FormattedMessage as M } from 'react-intl';

import m from './messages';
import DeleteButton from './components/DeleteButton';
import UploadButton from './components/UploadButton';
import styles from './styles';

export class Attachments extends PureComponent {
  handleSuccess = () => {
    SNACKBAR_HELPER.openSuccessSnackbar(
      <M {...m.successMessage} />,
      this.props.resaga,
    );
  };

  handleError = () => {
    SNACKBAR_HELPER.openErrorSnackbar(
      <M {...m.errorMessage} />,
      this.props.resaga,
    );
  };

  handleSubmit = attachmentId => ({ model, onSuccess }) => {
    const { link, description } = model;
    const data = {
      link: link.url,
      name: link.name,
      description,
    };
    const payload = {
      attachmentId,
      data,
      eventId: this.props.dataId,
      templateId: this.props.templateId,
      onSuccess: this.handleSuccess,
      onError: this.handleError,
    };

    TEMPLATE_API_HELPERS.patchEventAttachment(payload, this.props.resaga);
    onSuccess();
  };

  renderDescription = attachmentId => description => (
    <Name dataId={attachmentId} variant={VARIANTS.RENDER_PROP}>
      {this.renderName(attachmentId, description)}
    </Name>
  );

  renderName = (attachmentId, description) => name => (
    <AttachmentLink dataId={attachmentId} variant={VARIANTS.RENDER_PROP}>
      {this.renderLink(attachmentId, description, name)}
    </AttachmentLink>
  );

  renderLink = (attachmentId, description, name) => link => (
    <Attachment
      name={name}
      description={description}
      link={link}
      darkSeparator
    />
  );

  renderValue = attachmentId => (
    <Description dataId={attachmentId} variant={VARIANTS.RENDER_PROP}>
      {this.renderDescription(attachmentId)}
    </Description>
  );

  renderFormActions = attachmentId => () => {
    const { readOnly } = this.props;
    if (readOnly) {
      return null;
    }

    return (
      <DeleteButton
        attachmentId={attachmentId}
        eventId={this.props.dataId}
        templateId={this.props.templateId}
      />
    );
  };

  renderAttachmentListHeader = () => {
    const { attachments, readOnly } = this.props;

    if (attachments <= 0 && readOnly) return null;

    return (
      <GridContainer alignItems="center">
        <GridItem>
          <H5 dense weight="bold">
            Attachments
          </H5>
        </GridItem>
      </GridContainer>
    );
  };

  renderAttachment = attachmentId => (
    <GridItem xs={12} key={attachmentId}>
      <EditableForm
        onSubmit={this.handleSubmit(attachmentId)}
        value={attachmentId}
        renderValue={this.renderValue}
        renderSecondaryFormActions={this.renderFormActions(attachmentId)}
        readOnly={this.props.readOnly}
      >
        <AttachmentBorder>
          <GridContainer direction="column">
            <AttachmentLink
              dataId={attachmentId}
              variant={VARIANTS.FIELDS_ONLY}
            />
            <GridItem>
              <Description
                dataId={attachmentId}
                variant={VARIANTS.TEXT_FIELD}
              />
            </GridItem>
          </GridContainer>
        </AttachmentBorder>
      </EditableForm>
    </GridItem>
  );

  renderUploadButton = () =>
    LOGIC_HELPERS.ifElse(
      this.props.readOnly,
      null,
      <GridItem xs={12}>
        <UploadButton
          templateId={this.props.templateId}
          eventId={this.props.dataId}
        />
      </GridItem>,
    );

  renderDefault = () => {
    const { attachments } = this.props;

    const attachmentList = attachments.map(attachmentId =>
      this.renderAttachment(attachmentId),
    );

    return (
      <React.Fragment>
        <GridItem>
          {this.renderAttachmentListHeader()}
          <GridContainer>
            {attachmentList}
            {this.renderUploadButton()}
          </GridContainer>
        </GridItem>
      </React.Fragment>
    );
  };

  renderValueOnly = () => {
    const { component: Component, attachments, className } = this.props;

    return (
      attachments.length > 0 && (
        <Component className={className}>
          <GridContainer alignItems="center" spacing={0} wrap="nowrap">
            <GridItem>
              <Icon
                icon="lnr-paperclip"
                size="xsmall"
                color="blue"
                paddingRight
              />
            </GridItem>
            <GridItem>
              <JText sm blue ellipsis>
                {attachments.length === 1 ? (
                  <Description
                    dataId={attachments[0]}
                    variant={VARIANTS.RENDER_PROP}
                  >
                    {description =>
                      description ? (
                        ` ${description}`
                      ) : (
                        <Name
                          dataId={attachments[0]}
                          variant={VARIANTS.RENDER_PROP}
                        >
                          {name => (name ? ` ${name}` : '1 attachment')}
                        </Name>
                      )
                    }
                  </Description>
                ) : (
                  `${attachments.length} attachment${attachments.length > 1 &&
                    's'}`
                )}
              </JText>
            </GridItem>
          </GridContainer>
        </Component>
      )
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [EVENT_CONSTANTS.VARIANTS.valueOnly]: this.renderValueOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Attachments.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  component: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  readOnly: PropTypes.bool,

  // resaga props
  attachments: PropTypes.array,
};

Attachments.defaultProps = {
  attachments: [],
  component: 'string',
  variant: '',
  dataId: 0,
  templateId: 0,
  readOnly: false,
};

export default compose(
  withStyles(styles, { name: 'Attachments' }),
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.eventAttachments,
    outputProp: 'attachments',
  }),
)(Attachments);
