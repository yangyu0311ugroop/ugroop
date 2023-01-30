import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import { H6 } from 'viewComponents/Typography';
import {
  EditableMenuItemInput,
  EditableMenuItemValue,
} from 'viewComponents/Editable';
import { EditableMenuForm } from 'smartComponents/Editables';
import SortPassport from 'smartComponents/Person/components/Passports/logic/SortPassport';
import IsDefault from 'smartComponents/Person/components/Passports/parts/IsDefault';
import m from '../../messages';
import inputs from '../../inputs';

export class PassportEditableMenu extends React.PureComponent {
  state = {
    viewing: false,
  };

  getMenuItemProps = (disabled = false) => {
    const { saving } = this.props;
    return {
      disabled: saving || disabled,
    };
  };

  getCloseOnClickAway = () => {
    const { saving } = this.props;
    const { viewing } = this.state;
    return !saving && !viewing;
  };

  selectPassport = (passportId, obj) => {
    const { onPassportSelect } = this.props;
    onPassportSelect(passportId, {
      onSuccess: this.handlePassportSelectSuccess(obj),
    });
  };

  openPassportView = (id, obj) => {
    const { onPassportView } = this.props;
    this.setState({ viewing: true });
    onPassportView({ id, onClose: this.handlePassportClose(obj) });
  };

  handlePassportClose = ({ closeMenu } = {}) => passportId => {
    this.setState({ viewing: false });
    if (passportId && closeMenu) closeMenu();
  };

  handlePassportSelectSuccess = ({ closeMenu }) => () => {
    closeMenu();
  };

  handleValueClick = id => () => {
    this.openPassportView(id);
  };

  handleValueSelect = (id, obj) => selected => {
    this.selectPassport(selected ? id : null, obj);
  };

  handleNodeValueCreateClick = obj => () => {
    this.openPassportView(null, obj);
  };

  renderNonInputValue = value => {
    const { renderValue } = this.props;
    return renderValue(value);
  };

  renderMenuItemValue = (id, obj, props = {}) => {
    const { value } = this.props;
    return (
      <EditableMenuItemValue
        selected={value === id}
        onClick={this.handleValueClick(id)}
        onSelect={this.handleValueSelect(id, obj)}
        {...props}
        {...this.getMenuItemProps()}
      >
        {this.renderNonInputValue(id)}
      </EditableMenuItemValue>
    );
  };

  renderMenuItem = obj => id => {
    const { userId } = this.props;
    return (
      <GridItem key={id}>
        {this.renderMenuItemValue(id, obj, {
          userId,
          renderTail: this.renderIsDefault(id),
        })}
      </GridItem>
    );
  };

  renderIsDefault = id => () => <IsDefault id={id} variant={VARIANTS.BADGE} />;

  renderSortedMenuItemUserValues = obj => ({ sortedIds }) =>
    sortedIds.map(this.renderMenuItem(obj));

  renderMenuItemUserValues = obj => {
    const { userValues } = this.props;
    return (
      <SortPassport ids={userValues}>
        {this.renderSortedMenuItemUserValues(obj)}
      </SortPassport>
    );
  };

  renderMenuItemNodeValues = obj => {
    const { nodeValues } = this.props;
    return nodeValues.map(id => (
      <GridItem key={id}>{this.renderMenuItemValue(id, obj)}</GridItem>
    ));
  };

  renderMenuItemNodeValueCreate = obj => {
    const { nodeValues } = this.props;
    return (
      !nodeValues.length && (
        <GridItem>
          <EditableMenuItemValue
            selected={false}
            hideIcon
            onClick={this.handleNodeValueCreateClick(obj)}
            {...this.getMenuItemProps()}
          >
            <M {...m.createLabel} />
          </EditableMenuItemValue>
        </GridItem>
      )
    );
  };

  renderMenuItemHeading = () => (
    <GridItem>
      <EditableMenuItemInput>
        <H6 dense weight="bold">
          <M {...m.heading} />
        </H6>
      </EditableMenuItemInput>
    </GridItem>
  );

  renderMenu = () => obj => (
    <React.Fragment>
      {this.renderMenuItemHeading()}
      {this.renderMenuItemUserValues(obj)}
      {this.renderMenuItemNodeValues(obj)}
      {this.renderMenuItemNodeValueCreate(obj)}
    </React.Fragment>
  );

  renderValue = () => {
    const { value, renderValue } = this.props;
    return renderValue(value);
  };

  render = () => {
    const { readOnly, renderActions, saving } = this.props;
    return (
      <EditableMenuForm
        renderValue={this.renderValue}
        renderActions={renderActions}
        readOnly={readOnly}
        closeOnClickAway={this.getCloseOnClickAway()}
        {...inputs.editableMenu}
      >
        {this.renderMenu(saving)}
      </EditableMenuForm>
    );
  };
}

PassportEditableMenu.propTypes = {
  // parent
  value: PropTypes.number,
  nodeValues: PropTypes.array,
  userValues: PropTypes.array,
  userId: PropTypes.number,
  readOnly: PropTypes.bool,
  renderValue: PropTypes.func,
  renderActions: PropTypes.func,
  onPassportSelect: PropTypes.func,
  onPassportView: PropTypes.func,
  saving: PropTypes.bool,
};

PassportEditableMenu.defaultProps = {
  value: null,
  nodeValues: [],
  userValues: [],
  userId: null,
  readOnly: false,
  renderValue: () => null,
  renderActions: () => null,
  onPassportSelect: () => {},
  onPassportView: () => {},
  saving: false,
};

export default PassportEditableMenu;
