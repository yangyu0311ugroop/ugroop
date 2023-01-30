import React from 'react';
import PropTypes from 'prop-types';
import { Editable } from 'smartComponents/Editables';
import inputs from '../../inputs';

export class PassportEditable extends React.PureComponent {
  handleClick = () => {
    const { value: id, onPassportView } = this.props;
    onPassportView({ id });
  };

  render = () => {
    const { readOnly, value, renderValue, renderActions } = this.props;
    return (
      <Editable
        value={value}
        renderValue={renderValue}
        renderActions={renderActions}
        onClick={this.handleClick}
        readOnly={readOnly}
        {...inputs.editable}
      />
    );
  };
}

PassportEditable.propTypes = {
  // parent
  value: PropTypes.number,
  readOnly: PropTypes.bool,
  renderValue: PropTypes.func,
  renderActions: PropTypes.func,
  onPassportView: PropTypes.func,
};

PassportEditable.defaultProps = {
  value: null,
  readOnly: false,
  renderValue: () => null,
  renderActions: () => null,
  onPassportView: () => {},
};

export default PassportEditable;
