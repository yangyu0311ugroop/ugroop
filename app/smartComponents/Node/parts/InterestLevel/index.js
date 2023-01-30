import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import GridItem from 'components/GridItem';
import { H5 } from 'viewComponents/Typography';
import { EditableSelectForm } from 'smartComponents/Editables';
import { Select } from 'smartComponents/Inputs';
import helpers from './helpers';
import inputs from './inputs';
import { INTEREST_LEVELS } from './constants';
import { CONFIG } from './config';

export class InterestLevel extends React.PureComponent {
  state = {
    isEmptyInterestLevelState: false,
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      isEmptyInterestLevelState: nextProps.isEmptyInterestLevel,
    });
  };

  getValue = () => {
    const { value, required } = this.props;
    if (value === undefined) {
      return required ? INTEREST_LEVELS.interested : '';
    }
    return value;
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

  checkUpdateValue = value => {
    const { onChange } = this.props;
    if (value !== '') {
      this.setState({ isEmptyInterestLevelState: false });
      onChange(false);
    }
  };

  renderTextField = () => {
    const { required } = this.props;
    const { isEmptyInterestLevelState } = this.state;
    return (
      <GridItem xs>
        <Select
          value={this.getValue()}
          options={helpers.makeOptions(required)}
          onChange={this.checkUpdateValue}
          error={isEmptyInterestLevelState}
          {...inputs.base}
        />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { readOnly, required } = this.props;
    return (
      <GridItem>
        <EditableSelectForm
          value={this.getValue()}
          options={helpers.makeOptions(required)}
          renderValue={helpers.renderValue}
          {...inputs.base}
          {...inputs.editable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        />
      </GridItem>
    );
  };

  renderTextOnly = () => {
    const value = this.getValue();
    return (
      !!value && (
        <GridItem>
          <H5 dense>{helpers.renderValue()}</H5>
        </GridItem>
      )
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

InterestLevel.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
  isEmptyInterestLevel: PropTypes.bool,
  onChange: PropTypes.func,
};

InterestLevel.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  required: false,
  isEmptyInterestLevel: false,
};

export default resaga(CONFIG)(InterestLevel);
