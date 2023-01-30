/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import { DO_NOTHING } from 'appConstants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FIRST_DATE } from 'utils/constants/dateTime';
import momentHelpers from 'utils/helpers/moment';
import { withStyles } from '@material-ui/core/styles';
import { TimePicker } from 'material-ui-pickers';
import Text from 'ugcomponents/Inputs/ValidationTextField';
import inputConstants from 'ugcomponents/Inputs/constants';
import Icon from 'ugcomponents/Icon';
import Button from 'ugcomponents/Buttons/Button';

const style = {
  pickerButton: {
    margin: 'unset',
    padding: 'unset',
    paddingTop: 4,
    minWidth: 40,
    minHeight: 20,
    borderRadius: '50%',

    '&:hover': {
      background: 'transparent',
    },
  },
};

export class TimeField extends PureComponent {
  componentDidMount = () => {
    this.moment = this.getMomentValue();
    this.forceUpdate(); // HACK: So current picker value gets updated
  };

  getInputProps = disabled => {
    if (disabled) return null;

    if (!this.inputProps) {
      this.inputProps = {
        endAdornment: this.renderPickerButton(),
        ...this.props.InputProps,
      };
    }

    return this.inputProps;
  };

  getMomentValue = () => {
    const { value } = this.props;
    return typeof value === 'string' ? this.stringToMoment(value) : value;
  };

  getStringValue = () => {
    const { value } = this.props;
    return typeof value === 'string' ? value : this.momentToString(value);
  };

  getPickerValue = () => this.moment || this.props.defaultValue;

  setValue = (value, setText) => {
    const { onChange } = this.props;
    if (setText) this.text.setValue(value);
    this.moment = this.stringToMoment(value);
    if (onChange) onChange(value);
    if (setText) this.forceUpdate(); // HACK: So current picker value gets updated
  };

  moment = null;

  isFormDisabled = () => this.text && this.text.props.isFormDisabled();

  isDisabled = () => this.isFormDisabled() || this.props.disabled;

  stringToMoment = s =>
    s && s.length ? moment.utc(s, this.props.inputFormats, true) : null;

  momentToString = m => (m ? m.format(this.props.displayFormat) : '');

  handlePickerRef = ref => {
    this.picker = ref;
  };

  handleTextRef = ref => {
    this.text = ref;
    if (this.props.inputRef) this.props.inputRef(ref);
  };

  handlePickerButtonClick = () => {
    const { onPickerOpen } = this.props;

    this.picker.open();

    if (onPickerOpen) return onPickerOpen();

    return DO_NOTHING;
  };

  handlePickerChange = m => {
    const { onPickerClose } = this.props;

    this.setValue(this.momentToString(m), true);

    if (onPickerClose) return onPickerClose();

    return DO_NOTHING;
  };

  handleTextChange = value => {
    this.setValue(value, false);
  };

  handleTextBlur = value => {
    const m = this.stringToMoment(value);
    let s = '';
    if (m) s = m.isValid() ? this.momentToString(m) : value;
    this.setValue(s, true);
  };

  renderPickerButton = () => {
    const { classes, iconSize } = this.props;
    return (
      <Button
        className={classes.pickerButton}
        tabIndex={-1}
        disableRipple
        dense
        onClick={this.handlePickerButtonClick}
      >
        <Icon size={iconSize} icon="lnr-clock3" />
      </Button>
    );
  };

  renderPickerTextField = () => null;

  render = () => {
    const {
      classes,
      InputProps,
      value,
      onChange,
      displayFormat,
      inputFormats,
      onPickerOpen,
      onPickerClose,
      iconSize,
      minDate,
      defaultValue,
      ampm,
      PickerProps, // picker
      textComponent: TextComponent,
      ...props
    } = this.props;
    if (props.type === 'hidden') return null;
    return (
      <React.Fragment>
        <TextComponent
          innerRef={this.handleTextRef}
          onChange={this.handleTextChange}
          onBlur={this.handleTextBlur}
          value={this.getStringValue()}
          InputProps={this.getInputProps(this.isDisabled())}
          {...props}
        />
        <TimePicker
          ref={this.handlePickerRef}
          onChange={this.handlePickerChange}
          value={this.getPickerValue()}
          TextFieldComponent={this.renderPickerTextField}
          clearable
          minDate={minDate}
          ampm={ampm}
          {...PickerProps}
        />
      </React.Fragment>
    );
  };
}

TimeField.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  onPickerOpen: PropTypes.func,
  onPickerClose: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.any,
  helperText: PropTypes.node,
  autoComplete: PropTypes.string,
  displayFormat: PropTypes.string,
  iconSize: PropTypes.string,
  inputFormats: PropTypes.arrayOf(PropTypes.string),
  InputProps: PropTypes.object,
  textComponent: PropTypes.node,

  minDate: PropTypes.object,
  defaultValue: PropTypes.object,
  ampm: PropTypes.bool,
  PickerProps: PropTypes.object,
};

TimeField.defaultProps = {
  textComponent: Text,
  value: null,
  inputRef: null,
  onChange: null,
  disabled: false,
  label: null,
  helperText: null,
  autoComplete: 'off',
  displayFormat: inputConstants.TIME_DISPLAY_FORMAT,
  inputFormats: inputConstants.TIME_INPUT_FORMATS,
  InputProps: {},

  minDate: momentHelpers.createUtc(FIRST_DATE), // For some reason minDate is applied to time fields...
  defaultValue: moment
    .utc()
    .startOf('d')
    .add(12, 'h'), // for picker when value is null
  ampm: false,
  PickerProps: {},
};

export default withStyles(style, { name: 'TimeField' })(TimeField);
