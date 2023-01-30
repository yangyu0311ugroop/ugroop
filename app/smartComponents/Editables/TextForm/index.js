import { EMPTY_RTE } from 'appConstants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import classnames from 'classnames';
import { generateFontClass } from 'utils/style-utils';
import Editable, {
  EditableFormActions,
  EditableLabel,
  EditablePlaceholder,
} from 'viewComponents/Editable';
import Button from 'viewComponents/Button';
import Form from 'ugcomponents/Form';
import { InlineText, Text } from 'ugcomponents/Inputs';
import { withStyles, ClickAwayListener } from 'components/material-ui';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import style from '../style';

export const ANONYMOUS_FUNC = () => {};
export const renderDefaultValue = value => value;

/**
 * Wrapper component to make text editable inline with own form.
 */
export class EditableTextForm extends PureComponent {
  state = {
    editing: false,
    loading: false,
    cleared: false,
    showClear: false,
  };

  componentDidMount = () => {
    if (this.props.value) {
      this.setState({ showClear: true });
    }
  };

  handleSubmitSuccess = () => {
    this.setState({ editing: false, loading: false });
  };

  handleSubmitError = () => {
    this.setState({ editing: true, loading: false });
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

  handleEditableClick = () => {
    this.setState({ editing: true, showClear: !!this.props.value });
  };

  handleAutoSaveBlur = () => {
    const { cleared } = this.state;
    const { autoSaveOnBlur, autoSaveOnCancel } = this.props;
    if (cleared) {
      this.setState({ cleared: false });
    } else if (this.form && autoSaveOnBlur) {
      this.form.submitForm();
    } else if (autoSaveOnCancel) {
      this.handleCancel();
    }
  };

  handleBlur = () => {
    // set timeout for onBlur while saving
    setTimeout(
      () => (!this.state.loading ? this.handleAutoSaveBlur() : ''),
      200,
    );
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) onCancel();
    this.setState({ editing: false });
  };

  handleFocus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  createFormRef = ref => {
    this.form = ref;
  };

  createInputRef = ref => {
    this.input = ref;
  };

  cancelOnEscape = e => {
    const { showClear } = this.state;

    if (e.keyCode === 27) {
      this.handleCancel();
    }

    if (this.input) {
      // no input value
      if (!this.input.value) {
        this.setState({ showClear: false });
      } else if (!showClear) {
        // show clear if has input value
        this.setState({ showClear: true });
      }
    }
  };

  clearInput = () => {
    const { name, resetValue, onClear } = this.props;
    this.form.resetForm({ [name]: resetValue });
    this.setState({ showClear: false, cleared: true });
    if (onClear) onClear();
    this.handleFocus();
  };

  typographyClass = (className = '') => {
    const { classes, Typography } = this.props;
    return classnames(generateFontClass(Typography, classes), className);
  };

  renderPlaceholder = () => {
    const {
      placeholder,
      placeholderClassName,
      readOnly,
      readOnlyPlaceholder,
    } = this.props;
    return (
      <EditablePlaceholder
        className={this.typographyClass(placeholderClassName)}
      >
        {readOnly ? readOnlyPlaceholder : placeholder}
      </EditablePlaceholder>
    );
  };

  renderValue = () => {
    const { renderActions, renderValue, value } = this.props;

    return renderActions ? (
      <GridContainer>
        <GridItem>{renderValue(value)}</GridItem>
        <GridItem>{renderActions(value)}</GridItem>
      </GridContainer>
    ) : (
      renderValue(value)
    );
  };

  renderContent = () => {
    const { value, placeholder } = this.props;

    return (value && value !== EMPTY_RTE) || !placeholder
      ? this.renderValue(value)
      : this.renderPlaceholder();
  };

  renderEditable = () => {
    const {
      readOnly,
      fullWidth,
      editableSibling,
      bold,
      Typography,
      editableClass,
    } = this.props;

    return (
      <React.Fragment>
        <Editable
          readOnly={readOnly}
          fullWidth={fullWidth}
          onClick={this.handleEditableClick}
          className={this.typographyClass(editableClass)}
          Typography={Typography}
          bold={bold}
          isEllipsis
        >
          {this.renderContent()}
        </Editable>

        {editableSibling}
      </React.Fragment>
    );
  };

  renderFormActions = () => {
    const { loading } = this.state;
    const { saveContent, cancelContent, inline, classes } = this.props;
    const inlineStyle = LOGIC_HELPERS.ifElse(inline, classes.inlineAction, '');

    return (
      <GridItem className={classnames(classes.actionItem, inlineStyle)}>
        <EditableFormActions
          noGrid
          inline={inline}
          loading={loading}
          renderSecondaryActions={this.renderClearAction}
          onCancel={this.handleCancel}
          saveContent={saveContent}
          cancelContent={cancelContent}
        />
      </GridItem>
    );
  };

  renderClearAction = () => {
    const { showClear } = this.state;
    const { classes, clearContent, hideClearButton } = this.props;

    if (!showClear || hideClearButton) {
      return null;
    }

    const buttonProps = LOGIC_HELPERS.ifElse(
      clearContent,
      {},
      { icon: 'broom', iconButton: true },
    );

    return (
      <Button
        className={classes.clearBtn}
        onClick={this.clearInput}
        {...buttonProps}
        size="extraSmall"
        color="gray"
        dense
        square
      >
        {clearContent}
      </Button>
    );
  };

  renderFormInput = () => {
    const {
      name,
      value,
      required,
      textClassName,
      TextComponent,
      TextProps,
      Typography,
      classes,
      mouseEvent,
    } = this.props;
    return (
      <GridItem xs>
        <ClickAwayListener
          onClickAway={this.handleBlur}
          mouseEvent={mouseEvent}
        >
          <InlineText
            inputRef={this.createInputRef}
            name={name}
            value={value}
            required={required}
            autoComplete="off"
            autoFocus
            TextComponent={TextComponent}
            Typography={Typography}
            onKeyUp={this.cancelOnEscape}
            textClassName={classnames(textClassName, classes.text)}
            {...TextProps}
          />
        </ClickAwayListener>
      </GridItem>
    );
  };

  renderBody = () => {
    const { editing } = this.state;

    if (editing) {
      return this.renderForm();
    }

    return this.renderEditable();
  };

  renderForm = () => {
    const { children, classes, fullWidth } = this.props;
    return (
      <div className={classnames(classes.root, fullWidth && classes.grow)}>
        <Form onValidSubmit={this.handleValidSubmit} ref={this.createFormRef}>
          <GridContainer spacing={0} className={classes.relative}>
            {this.renderFormInput()}
            {this.renderFormActions()}
          </GridContainer>
          {children}
        </Form>
      </div>
    );
  };

  renderLabel = () => {
    const { label } = this.props;
    return <EditableLabel>{label}</EditableLabel>;
  };

  render = () => (
    <React.Fragment>
      {this.renderLabel()}
      {this.renderBody()}
    </React.Fragment>
  );
}

EditableTextForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  resetValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  children: PropTypes.any,
  editableSibling: PropTypes.any,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  renderValue: PropTypes.func,
  label: PropTypes.node,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  placeholderClassName: PropTypes.string,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  TextComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  autoSaveOnBlur: PropTypes.bool,
  autoSaveOnCancel: PropTypes.bool,
  TextProps: PropTypes.object,
  readOnly: PropTypes.bool,
  readOnlyPlaceholder: PropTypes.string,
  editableClass: PropTypes.string,
  fullWidth: PropTypes.bool,
  Typography: PropTypes.string,
  mouseEvent: PropTypes.string,
  saveContent: PropTypes.node,
  cancelContent: PropTypes.node,
  clearContent: PropTypes.node,
  inline: PropTypes.bool,
  bold: PropTypes.bool,
  renderActions: PropTypes.func,
  onCancel: PropTypes.func,
  onClear: PropTypes.func,
  hideClearButton: PropTypes.bool,
};

EditableTextForm.defaultProps = {
  children: null,
  editableSibling: null,
  value: '',
  renderValue: renderDefaultValue,
  label: null,
  required: false,
  placeholder: 'Click to specify',
  placeholderClassName: null,
  TextComponent: Text,
  TextProps: {},
  readOnly: false,
  readOnlyPlaceholder: 'None',
  mouseEvent: 'onMouseDown',
  Typography: 'P',
  inline: false,
  bold: false,
  autoSaveOnBlur: true,
  autoSaveOnCancel: true,
  resetValue: null,
  onCancel: () => {},
  hideClearButton: false,
};

export default withStyles(style, { name: 'EditableTextForm' })(
  EditableTextForm,
);
