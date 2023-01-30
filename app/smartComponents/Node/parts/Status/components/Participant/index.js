import React from 'react';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { PARTICIPANT } from 'utils/modelConstants';
import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { H5 } from 'viewComponents/Typography';
import { EditableSelectForm } from 'smartComponents/Editables';
import { Select } from 'smartComponents/Inputs';
import { SelectButton } from 'viewComponents/Inputs';
import Type from 'smartComponents/Node/parts/Type';
import helpers from './helpers';
import inputs from './inputs';

export class Participant extends React.PureComponent {
  state = {
    isEmptyParticipantStatusState: false,
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      isEmptyParticipantStatusState: nextProps.isEmptyParticipantStatus,
    });
  };

  handleSubmit = ({ model, onSuccess, onError }) => {
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

  handleSelectFieldChange = ({ target: { value } }) => {
    let model = {};
    model = dotProp.set(
      model,
      NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.status),
      value,
    );
    model = dotProp.set(
      model,
      NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.type),
      PARTICIPANT,
    );
    this.handleSubmit({ model });
  };

  renderPart = (Component, variant) => {
    const { id, readOnly } = this.props;
    return <Component id={id} variant={variant} readOnly={readOnly} />;
  };

  checkUpdateValue = value => {
    if (value !== '') {
      this.setState({ isEmptyParticipantStatusState: false });
    }
  };

  renderTextField = () => {
    const { status, showLabel, readOnly, required } = this.props;
    const { isEmptyParticipantStatusState } = this.state;

    const requiredProps = LOGIC_HELPERS.ifElse(
      required,
      inputs.required,
      inputs.label,
    );

    return (
      <GridItem xs>
        <Select
          required
          value={status}
          label={showLabel && requiredProps}
          options={helpers.makeOptions(required)}
          disabled={readOnly}
          error={isEmptyParticipantStatusState}
          onChange={this.checkUpdateValue}
          {...inputs.base}
        />
      </GridItem>
    );
  };

  renderValue = value => {
    const { Typography } = this.props;
    const confirmed = value === PARTICIPANT_STATUSES.confirmed;
    const weight = confirmed ? 'bold' : null;
    return (
      <Typography dense primary={confirmed} weight={weight} lineHeight1>
        <GridContainer>
          <GridItem>{helpers.renderValue(value)}</GridItem>
        </GridContainer>
      </Typography>
    );
  };

  renderEditable = () => {
    const {
      status,
      readOnly,
      showLabel,
      customSelectClass,
      required,
    } = this.props;
    return (
      <GridItem>
        <EditableSelectForm
          value={status}
          renderValue={this.renderValue}
          label={showLabel && inputs.label}
          {...inputs.base}
          {...inputs.editable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
          customSelectClass={customSelectClass}
          options={helpers.makeOptions(required)}
        >
          {this.renderPart(Type, VARIANTS.DATA)}
        </EditableSelectForm>
      </GridItem>
    );
  };

  renderSelectField = () => {
    const { status } = this.props;
    const confirmed = status === PARTICIPANT_STATUSES.confirmed;
    const color = confirmed ? 'primary' : 'gray';
    return (
      <GridItem>
        <SelectButton
          value={status}
          options={helpers.makeOptions()}
          renderValue={this.renderValue}
          onChange={this.handleSelectFieldChange}
          displayEmpty
          ButtonProps={{ color }}
        />
      </GridItem>
    );
  };

  renderTextOnly = () => {
    const { status } = this.props;
    return <GridItem>{this.renderValue(status)}</GridItem>;
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.SELECT_FIELD]: this.renderSelectField,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

Participant.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  status: PropTypes.string,
  readOnly: PropTypes.bool,
  showLabel: PropTypes.bool,
  Typography: PropTypes.any,
  customSelectClass: PropTypes.string,
  required: PropTypes.bool,
  isEmptyParticipantStatus: PropTypes.bool,
};

Participant.defaultProps = {
  id: null,
  variant: null,
  status: PARTICIPANT_STATUSES.pending,
  readOnly: false,
  showLabel: true,
  Typography: H5,
  required: false,
  isEmptyParticipantStatus: false,
};

export default Participant;
