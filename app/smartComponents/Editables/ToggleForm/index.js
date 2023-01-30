import React from 'react';
import PropTypes from 'prop-types';
import Editable from 'viewComponents/Editable';
import Form from 'ugcomponents/Form';
import { Data } from 'ugcomponents/Inputs';

export const ANONYMOUS_FUNC = () => {};
export const renderDefaultValue = value => value;

/**
 * Wrapper component to make bool/switch editable inline with own form.
 */
export class EditableToggleForm extends React.PureComponent {
  state = {
    value: false,
    loading: false,
  };

  componentDidMount = () => {
    const { value } = this.props;
    this.setState({ value });
  };

  componentDidUpdate = prevProps => {
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.setState({ value });
    }
  };

  handleSubmitSuccess = () => {
    this.setState({ loading: false });
  };

  handleSubmitError = () => {
    this.setState({ loading: false });
  };

  handleValidSubmit = model => {
    const { onSubmit } = this.props;
    this.setState({ loading: true });
    onSubmit({
      model,
      onSuccess: this.handleSubmitSuccess,
      onError: this.handleSubmitError,
    });
  };

  handleChange = () => {
    this.form.form.submit();
  };

  handleFormRef = ref => {
    this.form = ref;
  };

  handleEditableClick = () => {
    const { loading, value } = this.state;
    if (!loading) {
      this.setState({ value: !value });
    }
  };

  renderValue = () => {
    const { value } = this.state;
    return this.props.renderValue(value);
  };

  renderFormInput = () => {
    const { name, value } = this.props;
    const { value: currentValue } = this.state;
    return <Data name={name} value={value} currentValue={currentValue} />;
  };

  renderEditable = () => {
    const { readOnly, fullWidth } = this.props;
    return (
      <Editable
        onClick={this.handleEditableClick}
        fullWidth={fullWidth}
        readOnly={readOnly}
      >
        {this.renderValue()}
      </Editable>
    );
  };

  render = () => {
    const { children } = this.props;
    return (
      <Form
        ref={this.handleFormRef}
        onChange={this.handleChange}
        onValidSubmit={this.handleValidSubmit}
      >
        {this.renderFormInput()}
        {this.renderEditable()}
        {children}
      </Form>
    );
  };
}

EditableToggleForm.propTypes = {
  // parent
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  renderValue: PropTypes.func,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

EditableToggleForm.defaultProps = {
  children: null,
  value: '',
  renderValue: renderDefaultValue,
  onSubmit: ANONYMOUS_FUNC,
  readOnly: false,
  fullWidth: false,
};

export default EditableToggleForm;
