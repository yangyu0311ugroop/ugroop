import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Editable from 'viewComponents/Editable';
import { InlineSelect } from 'smartComponents/Inputs';

/**
 * Wrapper component to make text option editable inline.
 */
export const ANONYMOUS_FUNC = () => {};
export const renderDefaultValue = value => value;
export class EditableSelect extends PureComponent {
  state = {
    menuOpen: false,
    loading: false,
  };

  stopPropagation = event => event.stopPropagation && event.stopPropagation();

  handleChange = value => {
    this.setState({ menuOpen: false });
    this.props.onChange(value);
  };

  handleEditableClick = () => {
    this.setState({ menuOpen: true });
  };

  handleMenuOpen = event => {
    this.stopPropagation(event);
    this.setState({ menuOpen: true });
  };

  handleMenuClose = event => {
    this.stopPropagation(event);
    this.setState({ menuOpen: false });
    this.props.onClose();
  };

  renderSelect = () => {
    const {
      name,
      value,
      open,
      options,
      renderValue,
      readOnly,
      SelectProps,
    } = this.props;
    const { menuOpen, loading } = this.state;
    return (
      <InlineSelect
        name={name}
        open={open || menuOpen}
        value={value}
        options={options}
        renderValue={renderValue}
        native={false}
        onChange={this.handleChange}
        onOpen={this.handleMenuOpen}
        onClose={this.handleMenuClose}
        disabled={readOnly || loading}
        {...SelectProps}
      />
    );
  };

  render = () => {
    const { readOnly } = this.props;
    return (
      <Editable onClick={this.handleEditableClick} readOnly={readOnly}>
        {this.renderSelect()}
      </Editable>
    );
  };
}

EditableSelect.propTypes = {
  // parent
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  open: PropTypes.bool,
  options: PropTypes.array,
  renderValue: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  SelectProps: PropTypes.object,
  readOnly: PropTypes.bool,
};

EditableSelect.defaultProps = {
  value: '',
  open: false,
  options: [],
  onClose: ANONYMOUS_FUNC,
  onChange: ANONYMOUS_FUNC,
  renderValue: renderDefaultValue,
  SelectProps: {},
  readOnly: false,
};

export default EditableSelect;
