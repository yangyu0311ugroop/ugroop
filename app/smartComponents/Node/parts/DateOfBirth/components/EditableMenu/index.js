import React from 'react';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import GridItem from 'components/GridItem';
import {
  EditableMenuItemClear,
  EditableMenuItemInput,
  EditableMenuItemSubmit,
  EditableMenuItemValue,
} from 'viewComponents/Editable';
import { EditableMenuForm } from 'smartComponents/Editables';
import { Date } from 'smartComponents/Inputs';
import inputs from '../../inputs';
import { CONFIG } from './config';

export class DateOfBirthEditableMenu extends React.PureComponent {
  state = {
    picker: false,
    saving: false,
  };

  getModeName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(
      NODE_PATHS.dateOfBirthMode,
      this.props,
    );

  getMenuItemProps = () => {
    const { saving } = this.state;
    return {
      disabled: saving,
    };
  };

  getCloseOnClickAway = () => {
    const { saving, picker } = this.state;
    return !saving && !picker;
  };

  getCurrentValue = () => {
    const { value, mode, userValue } = this.props;
    switch (mode) {
      case 'user':
        return userValue;
      default:
        return value;
    }
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

  patchPerson = model => {
    const { personId } = this.props;
    PERSON_DETAIL_HELPER.updatePerson({ personId, ...model }, this.props);
  };

  handleUpdateNodeSuccess = ({ closeMenu }) => () => {
    this.setState({ saving: false });
    closeMenu();
  };

  handleUpdateNodeError = () => {
    this.setState({ saving: false });
  };

  handleSubmit = ({ model: personModel }, obj) => {
    const model = dotProp.set({}, this.getModeName(), null);
    // TODO: Either avoid multiple patches or convert to saga
    this.patchPerson(personModel);
    this.patchNode(model, obj);
  };

  handleUserSelect = obj => () => {
    const model = dotProp.set({}, this.getModeName(), 'user');
    this.patchNode(model, obj);
  };

  handlePersonSelect = obj => () => {
    const model = dotProp.set({}, this.getModeName(), null);
    this.patchNode(model, obj);
  };

  handleClearValue = obj => () => {
    const { name } = this.props;
    const model = dotProp.set({}, this.getModeName(), null);
    const personModel = dotProp.set({}, name, null);
    // TODO: Either avoid multiple patches or convert to saga
    this.patchPerson(personModel);
    this.patchNode(model, obj);
  };

  handlePickerOpen = () => {
    this.setState({ picker: true });
  };

  handlePickerClose = () => {
    this.setState({ picker: false });
  };

  renderMenuItemInput = () => {
    const { name } = this.props;
    const initialFocusedDate =
      this.getCurrentValue() || MOMENT_HELPERS.getDateMiddleLastYear();
    return (
      <EditableMenuItemInput>
        <Date
          name={name}
          onPickerOpen={this.handlePickerOpen}
          onPickerClose={this.handlePickerClose}
          maxDate={MOMENT_HELPERS.getDateLastYear()}
          initialFocusedDate={initialFocusedDate}
          {...inputs.editableInput}
        />
      </EditableMenuItemInput>
    );
  };

  renderMenuItemUserValue = obj => {
    const { mode, userValue, userId } = this.props;
    return (
      <EditableMenuItemValue
        selected={mode === 'user'}
        onClick={this.handleUserSelect(obj)}
        userId={userId}
        {...this.getMenuItemProps()}
      >
        {MOMENT_HELPERS.renderDate(userValue)}
      </EditableMenuItemValue>
    );
  };

  renderMenuItemPersonValue = obj => {
    const { value, mode } = this.props;
    return (
      value && (
        <GridItem>
          <EditableMenuItemValue
            selected={!mode}
            onClick={this.handlePersonSelect(obj)}
            {...this.getMenuItemProps()}
          >
            {MOMENT_HELPERS.renderDate(value)}
          </EditableMenuItemValue>
        </GridItem>
      )
    );
  };

  renderMenuItemClear = obj => {
    const { value, mode } = this.props;
    return (
      (value || mode) && (
        <GridItem>
          <EditableMenuItemClear onClick={this.handleClearValue(obj)}>
            {'Clear date of birth'}
          </EditableMenuItemClear>
        </GridItem>
      )
    );
  };

  renderMenu = obj => (
    <React.Fragment>
      <GridItem>{this.renderMenuItemInput()}</GridItem>
      <GridItem>{this.renderMenuItemUserValue(obj)}</GridItem>
      {this.renderMenuItemPersonValue(obj)}
      {this.renderMenuItemClear(obj)}
    </React.Fragment>
  );

  renderMenuItemSubmit = date => (
    <GridItem>
      <EditableMenuItemSubmit {...this.getMenuItemProps()}>
        {`Set new date "${MOMENT_HELPERS.renderDate(date)}"`}
      </EditableMenuItemSubmit>
    </GridItem>
  );

  renderMenuSubmit = ({ values }) => {
    const { name } = this.props;
    if (values) {
      const date = values[name];
      if (date) {
        return this.renderMenuItemSubmit(date);
      }
    }
    return null;
  };

  renderValue = () => {
    const { renderValue } = this.props;
    return renderValue(this.getCurrentValue());
  };

  render = () => {
    const { readOnly } = this.props;
    return (
      <EditableMenuForm
        renderValue={this.renderValue}
        renderMenuSubmit={this.renderMenuSubmit}
        onSubmit={this.handleSubmit}
        closeOnClickAway={this.getCloseOnClickAway()}
        readOnly={readOnly}
        {...inputs.editable}
      >
        {this.renderMenu}
      </EditableMenuForm>
    );
  };
}

DateOfBirthEditableMenu.propTypes = {
  // parent
  id: PropTypes.number,
  personId: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  mode: PropTypes.string,
  userValue: PropTypes.string,
  userId: PropTypes.number,
  readOnly: PropTypes.bool,
  renderValue: PropTypes.func,
};

DateOfBirthEditableMenu.defaultProps = {
  id: null,
  personId: null,
  name: null,
  value: null,
  mode: 'user',
  userValue: null,
  userId: null,
  readOnly: false,
  renderValue: arg => arg,
};

export default resaga(CONFIG)(DateOfBirthEditableMenu);
