import GridContainer from 'components/GridContainer';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import includes from 'lodash/includes';
import Tooltip from 'viewComponents/Tooltip';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { PASSPORT } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import GridItem from 'components/GridItem';
import Icon from 'viewComponents/Icon';
import { EditableAction, EditableActions } from 'viewComponents/Editable';
import PassportDialogLayout from 'smartComponents/Person/components/Passports/components/Passport/components/DialogLayout';
import PassportNumber from 'smartComponents/Person/components/Passports/parts/PassportNumber';

import EditableMenu from './components/EditableMenu';
import Editable from './components/Editable';
import Modals from './components/Modals';
import { CONFIG_1, CONFIG_2, CONFIG_3 } from './config';
import styles from './styles';

export class Passport extends React.PureComponent {
  state = {
    saving: false,
  };

  componentDidUpdate = prevProps => {
    const {
      passportCreateOpen,
      passportCreateCreatedId,
      passportViewOpen,
      passportViewDeletedId,
    } = this.props;
    if (prevProps.passportCreateOpen && !passportCreateOpen) {
      this.handlePassportCreateClose(passportCreateCreatedId);
    }
    if (prevProps.passportViewOpen && !passportViewOpen) {
      this.handlePassportViewClose(passportViewDeletedId);
    }
  };

  getValue = () => {
    const {
      value,
      defaultUserValue,
      userValues,
      nodeValues,
      passportNodeId,
    } = this.props;
    const exists = includes(userValues, value) || includes(nodeValues, value);
    if (exists) return value;
    return !passportNodeId ? defaultUserValue : null;
  };

  getViewReadOnly = id => {
    const { readOnly, userId, userValues, myId } = this.props;
    // HACK: Determine whether user's person's passport is readOnly via abilities
    if (includes(userValues, id) && userId !== myId) {
      return true;
    }
    return readOnly;
  };

  getPassportIdName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.passportId, this.props);

  getNodeTypeName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.type, this.props);

  selectPassport = (passportId, obj) => {
    const { id: nodeId, value, passportNodeId } = this.props;
    if (value !== passportId) {
      this.setState({ saving: true });
      let model = dotProp.set({}, this.getPassportIdName(), passportId);
      if (passportNodeId) {
        NODE_API_HELPERS.updateNode(
          {
            nodeId: passportNodeId,
            ...model,
            onSuccess: this.handleSelectPassportSuccess(passportId, obj),
            onError: this.handleSelectPassportError(obj),
          },
          this.props,
        );
      } else if (passportId) {
        model = dotProp.set(model, this.getNodeTypeName(), PASSPORT);
        NODE_API_HELPERS.createNode(
          {
            parentNodeId: nodeId,
            ...model,
            onSuccess: this.handleSelectPassportSuccess(passportId, obj),
            onError: this.handleSelectPassportError(obj),
          },
          this.props,
        );
      }
    } else if (this.onClose) {
      this.onClose(passportId);
    }
  };

  handleSelectPassportSuccess = (passportId, { onSuccess } = {}) => () => {
    this.setState({ saving: false });
    if (onSuccess) onSuccess();
    if (this.onClose) this.onClose(passportId);
  };

  handleSelectPassportError = ({ onError } = {}) => () => {
    this.setState({ saving: false });
    if (onError) onError();
  };

  handlePassportCreateClose = createdId => {
    if (createdId) {
      this.selectPassport(createdId);
    } else if (this.onClose) {
      this.onClose(createdId);
    }
  };

  handlePassportViewClose = deletedId => {
    const { value } = this.props;
    if (value === deletedId) {
      this.selectPassport(null);
    } else if (this.onClose) {
      this.onClose();
    }
  };

  handlePassportView = ({ id, onClose }) => {
    const { personId } = this.props;
    this.onClose = onClose;
    // TODO: Move setValue's to helpers for reuse
    if (id) {
      this.props.resaga.setValue({
        passportViewOpen: true,
        passportViewId: id,
        passportViewReadOnly: this.getViewReadOnly(id),
        passportViewDeletedId: undefined,
      });
    } else {
      this.props.resaga.setValue({
        passportCreateOpen: true,
        passportCreatePersonId: personId,
        passportCreateCreatedId: undefined,
      });
    }
  };

  handleViewClick = id => () => this.handlePassportView({ id });

  renderValue = value =>
    value ? <PassportDialogLayout id={value} variant={VARIANTS.ROW} /> : value;

  renderActions = value => () =>
    value ? (
      <EditableActions>
        <EditableAction
          title="View Passport Details"
          onClick={this.handleViewClick(value)}
        />
      </EditableActions>
    ) : (
      value
    );

  renderEditable = saving => () => {
    const {
      readOnly,
      userConnected,
      nodeValues,
      userValues,
      userId,
    } = this.props;
    const value = this.getValue();
    return (
      <GridItem>
        {userConnected && userValues.length ? (
          <EditableMenu
            value={value}
            nodeValues={nodeValues}
            userValues={userValues}
            userId={userId}
            readOnly={readOnly}
            renderValue={this.renderValue}
            renderActions={this.renderActions(value)}
            onPassportSelect={this.selectPassport}
            onPassportView={this.handlePassportView}
            saving={saving}
          />
        ) : (
          <Editable
            value={value}
            readOnly={readOnly}
            renderValue={this.renderValue}
            onPassportView={this.handlePassportView}
            saving={saving}
          />
        )}
      </GridItem>
    );
  };

  renderIcon = () => {
    const { passportNodeId, classes } = this.props;
    const value = this.getValue();
    return passportNodeId && value ? (
      <GridItem className={classes.passportIconContainer}>
        <Tooltip placement="bottom" title="Participant has a passport">
          <Icon size="extraSmall" icon="lnr-document2" />
        </Tooltip>
      </GridItem>
    ) : null;
  };

  renderProp = () => {
    const { children, passportNodeId } = this.props;
    return children({ id: passportNodeId });
  };

  renderPassportNumber = passportNumber => {
    const renderVal = LOGIC_HELPERS.ifElse(
      passportNumber,
      <PassportDialogLayout id={this.props.value} variant={VARIANTS.ROW} />,
      <JText italic>Passport not specified</JText>,
    );
    return (
      <JText ellipsis nowrap>
        {renderVal}
      </JText>
    );
  };

  renderRow = () => {
    const { value } = this.props;
    const passport = LOGIC_HELPERS.ifElse(
      value,
      <PassportNumber id={value} variant={VARIANTS.RENDER_PROP}>
        {this.renderPassportNumber}
      </PassportNumber>,
      <JText italic>Passport not specified</JText>,
    );

    return (
      <GridContainer wrap="nowrap" alignItems="center">
        <GridItem>
          <Icon icon="profile" size="extraSmall" color="darkGray" />
        </GridItem>
        <GridItem xs>{passport}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    const { saving } = this.state;

    if (variant === VARIANTS.ICON) {
      return this.renderIcon();
    }

    if (variant === VARIANTS.ROW) {
      return this.renderRow();
    }

    const rendered = LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderEditable(saving),
    });
    return (
      <React.Fragment>
        {rendered}
        <Modals />
      </React.Fragment>
    );
  };
}

Passport.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  personId: PropTypes.number,
  userId: PropTypes.number,
  userConnected: PropTypes.bool,
  children: PropTypes.any,

  // resaga value
  value: PropTypes.number,
  nodeValues: PropTypes.array,
  userValues: PropTypes.array,
  defaultUserValue: PropTypes.number,
  myId: PropTypes.number,
  passportNodeId: PropTypes.number,
  passportCreateOpen: PropTypes.bool,
  passportCreateCreatedId: PropTypes.number,
  passportViewOpen: PropTypes.bool,
  passportViewDeletedId: PropTypes.number,
};

Passport.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  personId: null,
  userId: null,
  userConnected: false,

  value: null,
  nodeValues: [],
  userValues: [],
  defaultUserValue: null,
  myId: null,
  passportNodeId: null,
  passportCreateOpen: false,
  passportCreateCreatedId: null,
  passportViewOpen: false,
  passportViewDeletedId: null,
};

export default compose(
  withStyles(styles, { name: 'PassportType' }),
  resaga(CONFIG_1),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
)(Passport);
