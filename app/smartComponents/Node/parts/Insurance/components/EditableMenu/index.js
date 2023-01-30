import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage as M } from 'react-intl';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import resaga from 'resaga';
import { compose } from 'redux';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import GridItem from 'components/GridItem';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import { PARTICIPANT_LINKEE } from 'utils/modelConstants';
import {
  EditableAction,
  EditableActions,
  EditableMenuItemClear,
  EditableMenuItemInput,
  EditableMenuItemSubmit,
  EditableMenuItemValue,
} from 'viewComponents/Editable';
import {
  Editable,
  EditableMenuForm,
  EditableTextForm,
} from 'smartComponents/Editables';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import InsurancePolicy from 'smartComponents/Person/components/InsurancePolicy';
import inputs from './inputs';
import m from '../../messages';
import { CONFIG } from './config';
import { VARIANTS } from '../../../../../../variantsConstants';
import Hr from '../../../../../../components/Hr';
import { LOGIC_HELPERS } from '../../../../../../utils/helpers/logic';

export class InsuranceEditableMenu extends React.PureComponent {
  state = {
    picker: false,
    saving: false,
    input: '',
    closeMenuState: () => {},
  };

  getUserInsurance = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(
      NODE_PATHS.insuranceValue,
      this.props,
    );

  handlePickerOpen = () => {
    this.setState({ picker: true });
  };

  handlePickerClose = () => {
    this.setState({ picker: false });
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
    if (closeMenu) {
      closeMenu();
    } else {
      this.state.closeMenuState();
    }
  };

  handleUpdateNodeError = () => {
    this.setState({ saving: false });
  };

  getValues = () => {
    const {
      personInsurancePolicies,
      userInsurancePolicies,
      userConnected,
    } = this.props;
    return [
      ...personInsurancePolicies,
      ...LOGIC_HELPERS.ifElse(userConnected, userInsurancePolicies, []),
    ];
  };

  handleSubmit = (_, obj) => {
    const { input } = this.state;
    this.setState({ saving: true });
    const model = {
      node: { customData: { insuranceValue: input } },
    };
    const { id } = this.props;
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess: this.handleUpdateNodeSuccess(obj),
      },
      this.props,
    );
  };

  handleUserSelect = (obj, value) => () => {
    this.setState({ saving: true });
    const model = {
      node: { customData: { insuranceValue: value } },
    };
    const { id } = this.props;
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess: this.handleUpdateNodeSuccess(obj),
      },
      this.props,
    );
  };

  handleClearValue = obj => () => {
    this.setState({ saving: true });
    const model = {
      node: {
        customData: { insuranceValue: '', insuranceMode: inputs.mode.cleared },
      },
    };
    const { id } = this.props;
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess: this.handleUpdateNodeSuccess(obj),
      },
      this.props,
    );
  };

  onCreateSuccess = ({ addResult }) => {
    this.handleUserSelect({}, addResult.id)();
  };

  handleViewClick = id => () => {
    const { personId, userId, userInsurancePolicies } = this.props;
    const insurancecPolicyId = this.getId();
    return PORTAL_HELPERS.showAddEditInsurance(
      {
        id,
        personId,
        onSuccess: this.onCreateSuccess,
        onDeleteSuccess: this.handleClearValue({}),
        canEdit: id && this.props.personInsurancePolicies.includes(id),
        canDelete: id && this.props.personInsurancePolicies.includes(id),
        userId,
        isUserOwned: userInsurancePolicies.includes(insurancecPolicyId),
        showOwnerShip: true,
      },
      this.props,
    );
  };

  createInsurancePolicy = () => {
    PORTAL_HELPERS.showAddEditInsurance(
      {
        personId: this.props.personId,
        onSuccess: this.onCreateSuccess,
        canEdit: true,
        showOwnerShip: true,
      },
      this.props,
    );
  };

  renderMenuItemInput = () => {
    const { userInsurancePolicy } = this.props;
    if (userInsurancePolicy) {
      return (
        <EditableMenuItemInput>
          <TextField
            name="insurancePolicy"
            label={this.props.intl.formatMessage(m.label)}
          />
        </EditableMenuItemInput>
      );
    }
    return (
      <EditableMenuItemInput>
        <TextField
          name="insurancePolicy"
          label={this.props.intl.formatMessage(m.label)}
        />
      </EditableMenuItemInput>
    );
  };

  getId = () => {
    const { value, userInsurancePolicies, userConnected, mode } = this.props;
    const values = this.getValues();
    let parsed = Number.parseInt(value, 10);
    if (
      !value ||
      Number.isNaN(parsed) ||
      parsed === 0 ||
      !values.includes(parsed)
    ) {
      parsed = null;
    }
    // get default
    if (
      !parsed &&
      userConnected &&
      userInsurancePolicies.length &&
      mode !== inputs.mode.cleared
    )
      return userInsurancePolicies[0];
    return parsed;
  };

  renderMenuItemUserValue = (obj, id) => (
    <GridItem>
      <EditableMenuItemValue
        selected={this.getId() === id}
        onClick={this.handleUserSelect(obj, id)}
        {...this.getMenuItemProps()}
      >
        {this.renderRow(id)}
      </EditableMenuItemValue>
    </GridItem>
  );

  renderMenuItemClear = obj =>
    !!this.getId() && (
      <GridItem>
        <EditableMenuItemClear onClick={this.handleClearValue(obj)}>
          {'Clear Insurance Policy'}
        </EditableMenuItemClear>
      </GridItem>
    );

  renderMenuAdd = () => (
    <GridItem>
      <EditableMenuItemValue
        selected={false}
        hideIcon
        onClick={this.createInsurancePolicy}
        {...this.getMenuItemProps()}
      >
        Add new insurance policy?
      </EditableMenuItemValue>
    </GridItem>
  );

  renderMenu = obj => {
    const { closeMenu } = obj;
    const { personInsurancePolicies } = this.props;
    this.setState({ closeMenuState: closeMenu });
    const values = this.getValues();
    return (
      <React.Fragment>
        {values.map(id => this.renderMenuItemUserValue(obj, id))}
        <Hr halfMarginBottom halfMarginTop />
        {this.renderMenuItemClear(obj)}
        {!personInsurancePolicies.length && this.renderMenuAdd()}
      </React.Fragment>
    );
  };

  renderMenuItemSubmit = (value, valid) => (
    <GridItem>
      <EditableMenuItemSubmit {...this.getMenuItemProps(!valid)}>
        <M {...m.menuItemSubmit} values={{ value }} />
      </EditableMenuItemSubmit>
    </GridItem>
  );

  renderMenuSubmit = ({ values }) => {
    if (values) {
      const { insurancePolicy: value } = values;
      if (value) {
        this.setState({ input: value });
        return this.renderMenuItemSubmit(value, true);
      }
    }
    return null;
  };

  renderInsurancePolicy = parmId =>
    LOGIC_HELPERS.ifElse(
      parmId,
      <InsurancePolicy variant={VARIANTS.TEXT_ONLY} id={parmId} />,
      null,
    );

  renderRow = parmId =>
    LOGIC_HELPERS.ifElse(
      parmId,
      <InsurancePolicy variant={VARIANTS.ROW} id={parmId} />,
      null,
    );

  renderValue = () => {
    const { name } = this.props;

    return (
      <EditableTextForm
        value={this.renderInsurancePolicy(this.getId())}
        name={name}
        readOnly
        readOnlyPlaceholder="Click to specify Insurance Policy"
        placeholder="Click to specify Insurance Policy"
      />
    );
  };

  renderActionButton = () => {
    const id = this.getId();
    if (!id) return null;
    return (
      <EditableActions>
        <EditableAction
          title="View Insurance Policy Details"
          onClick={this.handleViewClick(id)}
        />
      </EditableActions>
    );
  };

  renderEditable = () => (
    <Editable
      value={this.getId()}
      renderValue={this.renderValue}
      renderActions={this.renderActionButton}
      onClick={this.createInsurancePolicy}
      // readOnly={readOnly}
      {...inputs.editableMenu}
    />
  );

  render = () => {
    const { readOnly } = this.props;
    const values = this.getValues();
    if (!this.getId() && !values.length) return this.renderEditable();
    return (
      <EditableMenuForm
        renderValue={this.renderValue}
        renderMenuSubmit={this.renderMenuSubmit}
        readOnly={readOnly}
        onSubmit={this.handleSubmit}
        closeOnClickAway={this.getCloseOnClickAway()}
        renderActions={this.renderActionButton}
        {...inputs.editableMenu}
      >
        {this.renderMenu}
      </EditableMenuForm>
    );
  };
}

InsuranceEditableMenu.propTypes = {
  intl: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  userInsurancePolicy: PropTypes.number,
  readOnly: PropTypes.bool,
  userConnected: PropTypes.bool,

  personInsurancePolicies: PropTypes.array,
  userInsurancePolicies: PropTypes.array,
  personId: PropTypes.number,
  mode: PropTypes.string,
  userId: PropTypes.string,
};

InsuranceEditableMenu.defaultProps = {
  id: null,
  name: null,
  value: null,
  userInsurancePolicy: null,
  readOnly: false,
  personInsurancePolicies: [],
  userInsurancePolicies: [],
};

export default compose(
  injectIntl,
  selectLinkedUserData({ nodeIdProp: 'id', roles: [PARTICIPANT_LINKEE] }),
  resaga(CONFIG),
)(InsuranceEditableMenu);
