import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import momentHelpers from 'utils/helpers/moment';
import { FORMATS_DATE_TIME as frmt } from 'utils/constants/dateTime';
import { compose } from 'redux';
import resaga from 'resaga';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { InlineRadioGroup } from 'ugcomponents/Inputs/index';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';
import { ORG_FORM_NAME } from './constants';
import { VARIANTS } from '../../../../../../variantsConstants';

export class DateFormat extends PureComponent {
  state = {
    selectedValue: this.props.optionDropDown
      ? this.props.dateFormat || frmt.DATE
      : null,
  };

  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'dateFormat', 'id', 'classes', 'variant']);

  setFormatFromOption = value => {
    this.setState({ selectedValue: value });
  };

  formatDate = format => {
    const today = momentHelpers.getDateToday(); // moment().toDate();
    return momentHelpers.getDateWithFormat(today, format);
  };

  renderTextOnly = () => {
    const { dateFormat } = this.props;
    return (
      <div>
        <P {...this.getStrippedOwnProps()}>{dateFormat}</P>
        {this.renderOption()}
      </div>
    );
  };

  renderTextField = () => {
    const { selectedValue } = this.state;
    const value =
      selectedValue === null ? this.props.dateFormat : selectedValue;
    return (
      <div>
        <TextField
          name={ORG_FORM_NAME}
          value={value}
          label={this.props.intl.formatMessage(m.label)}
          InputLabelProps={this.getInputLabelProps}
          {...this.getStrippedOwnProps()}
        />
        {this.renderOption()}
      </div>
    );
  };

  renderOption = () => {
    const { classes, dateFormat, optionDropDown, disabled } = this.props;
    const { selectedValue } = this.state;

    if (disabled) return null;

    const options = {
      [frmt.DATE]: `${frmt.DATE} (${this.formatDate(frmt.DATE)})`,
      [frmt.DATE_SHORT]: `${frmt.DATE_SHORT} (${this.formatDate(
        frmt.DATE_SHORT,
      )})`,
      [frmt.DATE_SHORT]: `${frmt.DATE_SHORT} (${this.formatDate(
        frmt.DATE_SHORT,
      )})`,
      [frmt.DATE_SHORTER]: `${frmt.DATE_SHORTER} (${this.formatDate(
        frmt.DATE_SHORTER,
      )})`,
      [frmt.DAY_DATE]: `${frmt.DAY_DATE} (${this.formatDate(frmt.DAY_DATE)})`,
      [frmt.DAY_DATE_SHORT]: `${frmt.DAY_DATE_SHORT} (${this.formatDate(
        frmt.DAY_DATE_SHORT,
      )})`,
    };

    const selectValue = selectedValue === null ? frmt.DATE : selectedValue;

    return (
      <InlineRadioGroup
        loading={false}
        showSaved={false}
        highlightSelected
        required={false}
        autoClose={false}
        color="primary"
        name="option"
        label="Options:"
        tooltip="options"
        valueLabel=""
        value={dateFormat}
        options={options}
        className={classes.newTourRole}
        onChange={this.setFormatFromOption}
        alwaysShowOption
        optionDropDown={optionDropDown}
        valueSelected={selectValue}
      />
    );
  };

  renderStringOnly = () => this.props.dateFormat || frmt.DATE;

  renderDefault = () => {
    const { classes, dateFormat } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {dateFormat}
        </H1>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

DateFormat.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  // resaga props
  dateFormat: PropTypes.string,
  optionDropDown: PropTypes.bool,
};

DateFormat.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  dateFormat: '',
  optionDropDown: false,
  disabled: false,
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'DateFormat' }),
  resaga(CONFIG),
)(DateFormat);
