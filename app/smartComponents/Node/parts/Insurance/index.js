import GridContainer from 'components/GridContainer';
import JText from 'components/JText';
import React from 'react';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { PARTICIPANT_LINKEE } from 'utils/modelConstants';
// import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
// import MOMENT_HELPERS from 'utils/helpers/moment';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
// import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import {
  Text,
  // Date,
  // Select,
} from 'ugcomponents/Inputs';
import NewIcon from 'viewComponents/Icon';
import { INSURANCE_MODES } from './constants';
import { INSURANCE_HELPERS } from './helpers';
import { CONFIG } from './config';
import inputs from './inputs';
import InsuranceEditableMenu from './components/EditableMenu';
// import m from './messages';

export class Insurance extends React.PureComponent {
  state = {
    formMode: undefined,
    value: undefined,
  };

  getValueName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(
      NODE_PATHS.insuranceValue,
      this.props,
    );

  getPropStateValue = (prop, state) => (state === undefined ? prop : state);

  getModeValue = () => {
    const { mode } = this.props;
    return mode || INSURANCE_MODES.pending;
  };

  getCurrentModeValue = () =>
    this.getPropStateValue(this.getModeValue(), this.state.formMode);

  getValue = () => this.getPropStateValue(this.props.value, this.state.value);

  handleModeChange = formMode => {
    const { mode } = this.props;
    const currentMode = this.getCurrentModeValue();
    const isFormDateMode = INSURANCE_HELPERS.isDateMode(formMode);
    const newState = { formMode };

    if (INSURANCE_HELPERS.isDateMode(currentMode) !== isFormDateMode) {
      if (INSURANCE_HELPERS.isDateMode(mode) === isFormDateMode) {
        newState.value = undefined; // Revert to original value
      } else {
        newState.value = LOGIC_HELPERS.ifElse(isFormDateMode, null, '');
      }
    }

    this.setState(newState);
  };

  handleEditableSubmit = ({ model, onSuccess, onError }) => {
    const { id } = this.props;
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  hasEditableValue = ({ mode, value }) =>
    INSURANCE_HELPERS.isDateMode(mode) ? true : !!value;

  renderValueTextOnly = () => {
    const { value } = this.props;
    // if (INSURANCE_HELPERS.isDateMode(this.getModeValue())) {
    //   return MOMENT_HELPERS.renderDate(value);
    // }
    return value;
  };

  renderTextOnly = () => this.renderValueTextOnly();

  renderValueInput = () => {
    const name = this.getValueName();
    const value = this.getValue();
    return <Text name={name} value={value} {...inputs.value} />;
  };

  renderTextField = () => <GridItem>{this.renderValueInput()}</GridItem>;

  renderEditable = () => {
    const { readOnly, userConnected, id, userPersonId, personId } = this.props;
    return (
      <GridItem>
        <InsuranceEditableMenu
          id={id}
          name={this.getValueName()}
          readOnly={readOnly}
          userPersonId={userPersonId}
          personId={personId}
          userConnected={userConnected}
        />
      </GridItem>
      /*     <GridItem>
        {userConnected && userInsurancePolicy ? (
          <InsuranceEditableMenu
            id={id}
            name={this.getValueName()}
            readOnly={readOnly}
          />
        ) : (
          <EditableTextForm
            name={this.getValueName()}
            value={value}
            readOnly={readOnly}
            onSubmit={this.handleEditableSubmit}
            inline
            {...inputs.editable}
          />
        )}
      </GridItem> */
    );
  };

  renderRow = () => {
    const { value } = this.props;
    const insurance = LOGIC_HELPERS.ifElse(
      value,
      <JText ellipsis nowrap>
        {value}
      </JText>,
      <JText italic>Insurance not specified</JText>,
    );

    return (
      <GridContainer wrap="nowrap" alignItems="center">
        <GridItem>
          <NewIcon icon="shield-check" size="extraSmall" color="darkGray" />
        </GridItem>
        <GridItem xs>{insurance}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.ROW]: this.renderRow,
      [DEFAULT]: this.renderEditable,
    });
  };
}

Insurance.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  userConnected: PropTypes.bool,
  personId: PropTypes.number,

  // resaga value
  mode: PropTypes.string,
  value: PropTypes.string,
  userInsurancePolicy: PropTypes.string,
  userPersonId: PropTypes.number,
};

Insurance.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  userConnected: false,

  mode: INSURANCE_MODES.other,
  value: '',
};

export default compose(
  selectLinkedUserData({ nodeIdProp: 'id', roles: [PARTICIPANT_LINKEE] }),
  resaga(CONFIG),
)(Insurance);
