import React from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';
import { DatePicker } from 'material-ui-pickers';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import inputConstants from 'ugcomponents/Inputs/constants';
import Icon from 'ugcomponents/Icon';

export class DateField extends React.PureComponent {
  componentDidMount = () => {
    this.moment = this.getMomentValue();
    this.forceUpdate(); // HACK: So current picker value gets updated
    this.props.inputRef(this);
  };

  componentWillUnmount = () => {
    this.props.inputRef(null);
  };

  getMomentValue = () => {
    const { value } = this.props;
    return this.stringToMoment(value);
  };

  getPickerValue = () => this.moment || this.getMomentValue();

  getMinDate = () => {
    const { minDate } = this.props;
    return minDate ? MOMENT_HELPERS.createUtc(minDate) : minDate;
  };

  getMaxDate = () => {
    const { maxDate } = this.props;
    return maxDate ? MOMENT_HELPERS.createUtc(maxDate) : maxDate;
  };

  setValue = m => {
    this.moment = m;
    const value = this.momentToString(m);
    this.props.setValue(value);
    this.props.onChange(value);
    this.forceUpdate(); // HACK: So current picker value gets updated
  };

  moment = null;

  stringToMoment = s =>
    s ? MOMENT_HELPERS.createUtc(s, this.props.inputFormats, true) : null;

  momentToString = m => (m ? m.toISOString() : null);

  handlePickerRef = ref => {
    this.picker = ref;
  };

  handlePickerChange = m => {
    this.setValue(m ? m.utcOffset(0, true) : m);
    return this.props.onPickerClose();
  };

  renderHiddenPickerTextField = () => null;

  renderPickerTextField = () => {
    const { type } = this.props;
    const hidden = type === 'hidden';
    return hidden ? this.renderHiddenPickerTextField : undefined;
  };

  render = () => {
    const {
      label,
      placeholder,
      displayFormat,
      leftArrowIcon,
      rightArrowIcon,
      initialFocusedDate,
      minDateMessage,
      maxDateMessage,
      onPickerOpen,
      onPickerClose,
      disabled,
      InputProps,
    } = this.props;
    return (
      <DatePicker
        ref={this.handlePickerRef}
        onChange={this.handlePickerChange}
        onOpen={onPickerOpen}
        onClose={onPickerClose}
        value={this.getPickerValue()}
        label={label}
        placeholder={placeholder}
        TextFieldComponent={this.renderPickerTextField()}
        disabled={disabled}
        clearable
        minDate={this.getMinDate()}
        minDateMessage={minDateMessage}
        maxDate={this.getMaxDate()}
        maxDateMessage={maxDateMessage}
        leftArrowIcon={leftArrowIcon}
        rightArrowIcon={rightArrowIcon}
        initialFocusedDate={initialFocusedDate}
        format={displayFormat}
        fullWidth
        InputProps={InputProps}
      />
    );
  };
}

DateField.propTypes = {
  // hoc
  setValue: PropTypes.func.isRequired,

  // parent
  value: PropTypes.string,
  inputRef: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onPickerOpen: PropTypes.func,
  onPickerClose: PropTypes.func,
  disabled: PropTypes.bool,
  displayFormat: PropTypes.string,
  inputFormats: PropTypes.arrayOf(PropTypes.string),
  InputProps: PropTypes.object,

  minDate: PropTypes.any,
  minDateMessage: PropTypes.any,
  maxDate: PropTypes.any,
  maxDateMessage: PropTypes.any,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  initialFocusedDate: PropTypes.any,
};

DateField.defaultProps = {
  inputRef: () => {},
  label: null,
  placeholder: null,
  onChange: () => {},
  onPickerOpen: () => {},
  onPickerClose: () => {},
  disabled: false,
  displayFormat: inputConstants.DATE_DISPLAY_FORMAT,

  leftArrowIcon: <Icon icon="arrow-left" />,
  rightArrowIcon: <Icon icon="arrow-right" />,
  initialFocusedDate: MOMENT_HELPERS.create().startOf('d'),
};

export default withFormsy(DateField);
