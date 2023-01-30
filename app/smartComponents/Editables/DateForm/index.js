import React from 'react';
import PropTypes from 'prop-types';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import Editable, {
  EditableLabel,
  EditablePlaceholder,
} from 'viewComponents/Editable';
import Form from 'ugcomponents/Form';
import { Date } from 'smartComponents/Inputs';

export const ANONYMOUS_FUNC = () => {};

export class EditableDateForm extends React.PureComponent {
  state = {
    loading: false,
  };

  submitForm = () => {
    this.form.form.submit();
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

  handleChange = (...args) => {
    const { onChange } = this.props;
    setTimeout(this.submitForm, 10);
    onChange(...args);
  };

  handleFormRef = ref => {
    this.form = ref;
  };

  handleDateRef = ref => {
    this.date = ref;
  };

  handleEditableClick = () => {
    const { loading } = this.state;
    if (!loading) {
      this.date.picker.open();
    }
  };

  renderPlaceholder = () => {
    const { placeholder, readOnly, readOnlyPlaceholder } = this.props;
    return (
      <EditablePlaceholder>
        {readOnly ? readOnlyPlaceholder : placeholder}
      </EditablePlaceholder>
    );
  };

  renderValue = () => {
    const { value, renderValue, placeholder } = this.props;
    return value || !placeholder
      ? renderValue(value)
      : this.renderPlaceholder();
  };

  renderDate = () => {
    const {
      children,
      label,
      renderValue,
      placeholder,
      readOnlyPlaceholder,
      onChange,
      onSubmit,
      readOnly,
      ...rest
    } = this.props;
    return (
      <Date
        inputRef={this.handleDateRef}
        onChange={this.handleChange}
        type="hidden"
        {...rest}
      />
    );
  };

  renderLabel = () => {
    const { label } = this.props;
    return <EditableLabel>{label}</EditableLabel>;
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
      <Form ref={this.handleFormRef} onValidSubmit={this.handleValidSubmit}>
        {this.renderDate()}
        {this.renderLabel()}
        {this.renderEditable()}
        {children}
      </Form>
    );
  };
}

EditableDateForm.propTypes = {
  // parent
  children: PropTypes.any,
  label: PropTypes.any,
  value: PropTypes.any,
  renderValue: PropTypes.func,
  placeholder: PropTypes.string,
  readOnlyPlaceholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

EditableDateForm.defaultProps = {
  children: null,
  label: null,
  value: null,
  renderValue: MOMENT_HELPERS.renderDateUtc,
  onChange: ANONYMOUS_FUNC,
  onSubmit: ANONYMOUS_FUNC,
  readOnly: false,
  placeholder: 'Click to specify',
  readOnlyPlaceholder: 'No date',
  fullWidth: false,
};

export default EditableDateForm;
