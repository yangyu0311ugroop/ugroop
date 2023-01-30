import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import _ from 'lodash';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import { PHONE_HELPERS } from 'utils/helpers/phone';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import GridItem from 'components/GridItem';
import { VARIANTS } from 'variantsConstants';
import {
  EditableMenuItemClear,
  EditableMenuItemInput,
  EditableMenuItemSubmit,
  EditableMenuItemValue,
} from 'viewComponents/Editable';
import Flag from 'viewComponents/Flag';
import { EditableMenuForm } from 'smartComponents/Editables';
import { Phone, PhoneActionButtons } from 'smartComponents/Inputs';
import IsDefault from 'smartComponents/Phone/parts/IsDefault';
import inputs from '../../inputs';
import m from '../../messages';
import { CONFIG } from './config';

export class PhoneEditableMenu extends React.PureComponent {
  state = {
    picker: false,
    saving: false,
  };

  getValueName = () => inputs.editableMenuInput.name;

  getUserPhoneIdName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.userPhoneId, this.props);

  getUserValue = id => {
    const { userValues } = this.props;
    const userValue = _.find(userValues, ([i]) => i === id);
    return userValue ? userValue[1] : null;
  };

  getDefaultUserValueId = () => {
    const { userValues } = this.props;
    return userValues.length ? userValues[0][0] : null;
  };

  getDefaultUserValue = () => {
    const { userValues } = this.props;
    return userValues.length ? userValues[0][1] : null;
  };

  getMenuItemProps = (disabled = false) => {
    const { saving } = this.state;
    return {
      disabled: saving || disabled,
    };
  };

  getCloseOnClickAway = () => {
    const { saving, picker } = this.state;
    return !saving && !picker;
  };

  patchNode = (model, obj) => {
    const { id } = this.props;
    this.setState({ saving: true });
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess: this.handleUpdateNodeSuccess(obj),
        onError: this.handleUpdateNodeError,
      },
      this.props,
    );
  };

  handleUpdateNodeSuccess = ({ closeMenu }) => () => {
    this.setState({ saving: false });
    closeMenu();
  };

  handleUpdateNodeError = () => {
    this.setState({ saving: false });
  };

  handleSubmit = ({ model }, obj) => {
    const newModel = dotProp.set(model, this.getUserPhoneIdName(), null);
    this.patchNode(newModel, obj);
  };

  handleUserSelect = (id, obj) => () => {
    const model = dotProp.set({}, this.getUserPhoneIdName(), id);
    this.patchNode(model, obj);
  };

  handleNodeSelect = obj => () => {
    const model = dotProp.set({}, this.getUserPhoneIdName(), null);
    this.patchNode(model, obj);
  };

  handleClearValue = obj => () => {
    let model = {};
    model = dotProp.set(model, this.getValueName(), null);
    model = dotProp.set(model, this.getUserPhoneIdName(), null);
    this.patchNode(model, obj);
  };

  handlePickerOpen = () => {
    this.setState({ picker: true });
  };

  handlePickerClose = () => {
    this.setState({ picker: false });
  };

  renderNonInputValue = value => {
    const result = PHONE_HELPERS.parseNumber(value);
    return result ? (
      <React.Fragment>
        <Flag country={result.country} paddingRight />
        {PHONE_HELPERS.renderNumberInternational(value)}
      </React.Fragment>
    ) : (
      value
    );
  };

  renderMenuItemInput = () => (
    <EditableMenuItemInput>
      <Phone {...inputs.editableMenuInput} />
    </EditableMenuItemInput>
  );

  renderIsDefault = id => () => <IsDefault id={id} variant={VARIANTS.BADGE} />;

  renderMenuItemUserValue = (id, value, isDefault, obj) => {
    const { userPhoneId, userId } = this.props;
    return (
      <EditableMenuItemValue
        selected={userPhoneId === id || (isDefault && userPhoneId === 0)}
        onClick={this.handleUserSelect(id, obj)}
        userId={userId}
        renderTail={isDefault ? this.renderIsDefault(id) : undefined}
        {...this.getMenuItemProps()}
      >
        {this.renderNonInputValue(value)}
      </EditableMenuItemValue>
    );
  };

  renderMenuItemUserValues = obj => {
    const { userValues } = this.props;
    const defaultUserValueId = this.getDefaultUserValueId();
    return userValues.map(
      ([id, value]) =>
        !!id && (
          <GridItem key={id}>
            {this.renderMenuItemUserValue(
              id,
              value,
              id === defaultUserValueId,
              obj,
            )}
          </GridItem>
        ),
    );
  };

  renderMenuItemNodeValue = obj => {
    const { value, userPhoneId } = this.props;
    return (
      value && (
        <GridItem>
          <EditableMenuItemValue
            selected={userPhoneId === null}
            onClick={this.handleNodeSelect(obj)}
            {...this.getMenuItemProps()}
          >
            {this.renderNonInputValue(value)}
          </EditableMenuItemValue>
        </GridItem>
      )
    );
  };

  renderMenuItemClear = obj => {
    const { value, userPhoneId } = this.props;
    return (
      (value || userPhoneId || userPhoneId === 0) && (
        <GridItem>
          <EditableMenuItemClear onClick={this.handleClearValue(obj)}>
            {'Clear phone number'}
          </EditableMenuItemClear>
        </GridItem>
      )
    );
  };

  renderMenu = obj => (
    <React.Fragment>
      <GridItem>{this.renderMenuItemInput()}</GridItem>
      {this.renderMenuItemUserValues(obj)}
      {this.renderMenuItemNodeValue(obj)}
      {this.renderMenuItemClear(obj)}
    </React.Fragment>
  );

  renderMenuItemSubmit = (value, valid) => {
    const rendered = valid
      ? PHONE_HELPERS.renderNumberInternational(value)
      : value;
    return (
      <GridItem>
        <EditableMenuItemSubmit {...this.getMenuItemProps(!valid)}>
          <M {...m.menuItemSubmit} values={{ value: rendered }} />
        </EditableMenuItemSubmit>
      </GridItem>
    );
  };

  renderMenuSubmit = ({ values }) => {
    if (values) {
      const value = values[this.getValueName()];
      if (value) {
        const valid = PHONE_HELPERS.isValidNumber(value);
        return this.renderMenuItemSubmit(value, valid);
      }
    }
    return null;
  };

  renderValue = () => {
    const { userPhoneId, value, renderValue } = this.props;
    if (userPhoneId) {
      return renderValue(this.getUserValue(userPhoneId));
    }
    if (userPhoneId === 0) {
      return renderValue(this.getDefaultUserValue());
    }
    return renderValue(value);
  };

  renderActions = () => {
    const { userPhoneId, value } = this.props;
    if (userPhoneId) {
      return <PhoneActionButtons value={this.getUserValue(userPhoneId)} />;
    }
    if (userPhoneId === 0) {
      return <PhoneActionButtons value={this.getDefaultUserValue()} />;
    }
    return <PhoneActionButtons value={value} />;
  };

  render = () => {
    const { readOnly } = this.props;
    return (
      <EditableMenuForm
        renderValue={this.renderValue}
        renderActions={this.renderActions}
        renderMenuSubmit={this.renderMenuSubmit}
        readOnly={readOnly}
        onSubmit={this.handleSubmit}
        closeOnClickAway={this.getCloseOnClickAway()}
        {...inputs.editableMenu}
      >
        {this.renderMenu}
      </EditableMenuForm>
    );
  };
}

PhoneEditableMenu.propTypes = {
  // parent
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  userPhoneId: PropTypes.number,
  userValues: PropTypes.array,
  userId: PropTypes.number,
  readOnly: PropTypes.bool,
  renderValue: PropTypes.func,
};

PhoneEditableMenu.defaultProps = {
  id: null,
  name: null,
  value: null,
  userPhoneId: null,
  userValues: [],
  userId: null,
  readOnly: false,
  renderValue: () => null,
};

export default resaga(CONFIG)(PhoneEditableMenu);
