import React from 'react';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { CONSENT } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import CreatedAt from 'smartComponents/Node/parts/CreatedAt';
import Hr from 'components/Hr';
import { AttachmentBorder } from 'viewComponents/Attachment';
import { INPUT_UTILS } from 'ugcomponents/Inputs';
import { EditableForm } from 'smartComponents/Editables';
import Type from 'smartComponents/Node/parts/Type';
import RequiresConsent from 'smartComponents/Node/parts/RequiresConsent';
import Attachment from 'smartComponents/Attachment';
import { Description, File } from 'smartComponents/Attachment/parts';
import ConsentedBy from 'smartComponents/Node/parts/ConsentedBy';
import l from 'lodash';
import DeleteButton from './components/DeleteButton';
import ConsentConfirmation from './components/ConsentConfirmation';
import { CONFIG } from './config';
import styles from './styles';
import JText from '../../../../components/JText';

export class Form extends React.PureComponent {
  state = {
    requiresConsent: false,
  };

  getRestProps = () => l.omit(this.props, ['classes']);

  handleRequiresConsentChange = (_, checked) => {
    this.setState({ requiresConsent: checked });
  };

  handleRowOpen = () => {
    const { requiresConsent } = this.props;
    this.setState({ requiresConsent });
  };

  handleRowSubmit = ({
    model: { node, attachment, consentConfirmation, consentChanged },
    onSuccess,
    ...rest
  }) => {
    const { id: nodeId, attachmentId } = this.props;
    NODE_API_HELPERS.updateNodeAndAttachment(
      {
        nodeId,
        node,
        attachmentId,
        attachment,
        // TODO: Combine in one api call?
        onSuccess: this.handleConsentChange({
          consentConfirmation,
          consentChanged,
          onSuccess,
          ...rest,
        }),
        ...rest,
      },
      this.props,
    );
  };

  handleConsentChange = ({
    consentConfirmation,
    consentChanged,
    ...rest
  }) => () => {
    const { id, myId, consentId } = this.props;

    if (consentChanged) {
      if (consentConfirmation) {
        let node = { type: CONSENT };
        node = dotProp.set(
          node,
          INPUT_UTILS.storePathToInputName(NODE_PATHS.consentedBy),
          myId,
        );
        if (!consentId) {
          return NODE_API_HELPERS.createNode(
            { node, parentNodeId: id, ...rest },
            this.props,
          );
        }
        return NODE_API_HELPERS.updateNode(
          { nodeId: consentId, node, ...rest },
          this.props,
        );
      }
      if (consentId) {
        return NODE_API_HELPERS.deleteNode(
          { nodeId: consentId, parent: id, ...rest },
          this.props,
        );
      }
    }

    return rest.onSuccess();
  };

  renderPart = (Component, variant, props = {}) => (
    <Component {...this.getRestProps()} variant={variant} {...props} />
  );

  renderAttachmentPart = (Component, variant, props = {}) => {
    const { attachmentId: id } = this.props;
    return (
      <Component
        {...this.getRestProps()}
        id={id}
        variant={variant}
        {...props}
      />
    );
  };

  renderConsentPart = (Component, variant, props = {}) => {
    const { consentId: id } = this.props;
    return (
      <Component
        {...this.getRestProps()}
        id={id}
        variant={variant}
        {...props}
      />
    );
  };

  renderConsentConfirmation = () => {
    const { requiresConsent } = this.state;
    return (
      requiresConsent && (
        <GridItem style={{ maxWidth: 320 }}>
          <ConsentConfirmation {...this.getRestProps()} />
        </GridItem>
      )
    );
  };

  renderForm = (variant = VARIANTS.TEXT_FIELD) => () => (
    <GridContainer direction="column">
      <GridItem>
        <AttachmentBorder>
          <GridContainer direction="column">
            <GridItem>
              {this.renderAttachmentPart(File, variant, { showClear: false })}
            </GridItem>
            {this.renderAttachmentPart(Description, variant, {
              maxWidth: SIZE_CONSTANTS.XXS,
            })}
          </GridContainer>
        </AttachmentBorder>
      </GridItem>
      <GridItem>
        {this.renderPart(RequiresConsent, variant, {
          onChange: this.handleRequiresConsentChange,
        })}
      </GridItem>
      {this.renderPart(Type, VARIANTS.DATA)}
      {this.renderConsentConfirmation()}
    </GridContainer>
  );

  renderRowFormActions = () => {
    const { id } = this.props;
    return <DeleteButton id={id} />;
  };

  renderRowValue = () => {
    const { iconPadding, requiresConsent, id, classes } = this.props;
    return (
      <GridContainer wrap="nowrap" alignItems="center" className={classes.grow}>
        {iconPadding && <GridItem style={{ width: 2 }} />}
        <GridItem>
          {this.renderConsentPart(ConsentedBy, VARIANTS.ICON, {
            requiresConsent,
          })}
        </GridItem>
        {iconPadding && <GridItem />}
        <GridItem className={classes.grow}>
          {this.renderAttachmentPart(Attachment, null, {
            showIcon: false,
            createdAt: (
              <React.Fragment>
                <JText italic gray>
                  Added <CreatedAt id={id} showFromNow />
                </JText>
              </React.Fragment>
            ),
            compact: false,
            hasMaxWidth: true,
            variant: VARIANTS.THUMBNAIL,
          })}
        </GridItem>
      </GridContainer>
    );
  };

  renderRow = () => () => {
    const { attachmentId, readOnly, separator } = this.props;
    return (
      !!attachmentId && (
        <GridItem>
          {separator && <Hr noMarginTop halfMarginBottom />}
          <EditableForm
            isRow
            value={attachmentId}
            renderValue={this.renderRowValue}
            renderSecondaryFormActions={this.renderRowFormActions}
            onOpen={this.handleRowOpen}
            onSubmit={this.handleRowSubmit}
            readOnly={readOnly}
          >
            {this.renderForm()()}
          </EditableForm>
        </GridItem>
      )
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.FORM]: this.renderForm(),
      [DEFAULT]: this.renderRow(),
    });
  };
}

Form.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  separator: PropTypes.bool,
  iconPadding: PropTypes.bool,

  // resaga value
  attachmentId: PropTypes.number,
  requiresConsent: PropTypes.bool,
  myId: PropTypes.number,
  consentId: PropTypes.number,
};

Form.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  separator: false,
  iconPadding: false,

  attachmentId: null,
  requiresConsent: null,
  myId: null,
  consentId: null,
};

export default compose(
  withStyles(styles),
  resaga(CONFIG),
)(Form);
