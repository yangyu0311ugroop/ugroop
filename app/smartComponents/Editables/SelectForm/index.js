import classnames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Editable, {
  EditableLabel,
  EditablePlaceholder,
} from 'viewComponents/Editable';
import { generateFontClass } from 'utils/style-utils';
import { InlineSelect } from 'smartComponents/Inputs';
import { withStyles } from 'components/material-ui';
import Form from 'ugcomponents/Form';
import style from '../style';

/**
 * Wrapper component to make text option editable inline with own form.
 */
export const ANONYMOUS_FUNC = () => {};
export const renderDefaultValue = value => value;
export class EditableSelectForm extends PureComponent {
  state = {
    menuOpen: false,
    loading: false,
  };

  stopPropagation = event => event.stopPropagation && event.stopPropagation();

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

  handleChange = (_, isChanged) => {
    this.setState({ menuOpen: false });
    if (isChanged) this.form.form.submit();
  };

  handleFormRef = ref => {
    this.form = ref;
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
  };

  typographyClass = (className = '') => {
    const { classes, bold, Typography } = this.props;
    return classnames(
      generateFontClass(Typography, classes),
      bold && classes.bold,
      className,
    );
  };

  renderOptions = () => {
    const { options } = this.props;
    return options.map(o => ({ ...o, className: this.typographyClass() }));
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

  renderSelect = () => {
    const {
      name,
      value,
      readOnly,
      fullWidth,
      SelectProps,
      customSelectClass,
    } = this.props;
    const { menuOpen, loading } = this.state;

    return (
      <InlineSelect
        name={name}
        open={menuOpen}
        value={value}
        currentValue={value}
        options={this.renderOptions()}
        renderValue={this.renderValue}
        native={false}
        displayEmpty
        onOpen={this.handleMenuOpen}
        onClose={this.handleMenuClose}
        disabled={readOnly || loading}
        fullWidth={fullWidth}
        className={this.typographyClass()}
        customSelectClass={customSelectClass}
        {...SelectProps}
      />
    );
  };

  renderLabel = () => {
    const { label, classes } = this.props;
    return <EditableLabel className={classes.label}>{label}</EditableLabel>;
  };

  renderEditable = () => {
    const {
      value,
      readOnly,
      fullWidth,
      Typography,
      bold,
      displayFlex,
      renderEditable,
    } = this.props;
    const editable = (
      <Editable
        onClick={this.handleEditableClick}
        Typography={Typography}
        fullWidth={fullWidth}
        readOnly={readOnly}
        bold={bold}
        displayFlex={displayFlex}
      >
        {this.renderSelect()}
      </Editable>
    );
    return LOGIC_HELPERS.ifFunction(
      renderEditable,
      [value, editable],
      editable,
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
        {this.renderLabel()}
        {this.renderEditable()}
        {children}
      </Form>
    );
  };
}

EditableSelectForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  renderValue: PropTypes.func,
  onSubmit: PropTypes.func,
  SelectProps: PropTypes.object,
  readOnly: PropTypes.bool,
  readOnlyPlaceholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  bold: PropTypes.bool,
  Typography: PropTypes.string,
  displayFlex: PropTypes.bool,
  renderEditable: PropTypes.func,
  customSelectClass: PropTypes.string,
};

EditableSelectForm.defaultProps = {
  children: null,
  value: '',
  options: [],
  label: null,
  placeholder: 'Click to specify',
  renderValue: renderDefaultValue,
  onSubmit: ANONYMOUS_FUNC,
  SelectProps: {},
  Typography: 'P',
  bold: false,
  readOnly: false,
  readOnlyPlaceholder: 'None',
  fullWidth: false,
  displayFlex: false,
  renderEditable: null,
};

export default withStyles(style, { name: 'EditableSelectForm' })(
  EditableSelectForm,
);
