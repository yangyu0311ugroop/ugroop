import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { DatePicker } from 'material-ui-pickers';
import { FormControl, FormLabel } from '@material-ui/core';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import H5 from 'components/H5';
import TextField from 'ugcomponents/Inputs/ValidationTextField/index';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from 'ugcomponents/Icon';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { FormattedMessage } from 'react-intl';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import inputs from '../../defines/inputs';
import { DAY_OPTIONS as options } from '../../constants';
import m from '../../defines/messages';
import stylesheet from './styles';

export const AddTemplateModalBody = ({
  dateVal,
  dayVal,
  errors,
  onTitleChange,
  onDescriptionChange,
  onDurationChange,
  onDateChange,
  onDayChange,
  onClearLine,
  classes,
  isDateValid,
  dateValidationText,
}) => {
  const serverError = errors ? (
    <div className="text-danger">
      <i>{errors}</i>
    </div>
  ) : (
    ''
  );

  const items = Object.keys(options).map(key => (
    <MenuItem key={key} value={options[key].code}>
      {options[key].name}
    </MenuItem>
  ));

  const dateErrorCls = classNames({
    [classes.dateError]: isDateValid === false,
  });

  return (
    <Fragment>
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <H5 className={classes.label}>
            What would you like to call this tour, trip or journey?
          </H5>
          <TextField
            className={classes.inputText}
            onChange={onTitleChange}
            label={<FormattedMessage {...m.titleLabel} />}
            {...inputs.TITLE}
          />
        </GridItem>
        <GridItem>
          <H5 className={classes.label}>
            And now some words describing the tour?
          </H5>
          <RichTextEditor
            toolBarId="add-template-modal"
            onChange={onDescriptionChange}
            wrapperClassname={classes.editor}
          />
        </GridItem>
        <GridItem>
          <GridContainer>
            <GridItem xs={12} md={10}>
              <H5 className={classes.label}>
                How many days is this going to be? Don{`'`}t worry, you can
                always change it later
              </H5>
              <TextField
                className={classes.durationInput}
                label={<FormattedMessage {...m.durationLabel} />}
                onChange={onDurationChange}
                {...inputs.DURATION}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer spacing={0}>
            <GridItem xs={12} md={5}>
              <H5 className={classes.label}>
                Do you know when this tour starts?
              </H5>
              <FormLabel className={dateErrorCls}>
                Exact Date for Tour
              </FormLabel>
              <DatePicker
                className={classes.datePicker}
                fullWidth
                onBlur={null}
                value={dateVal}
                onChange={onDateChange}
                invalidLabel=" "
                format={FORMATS_DATE_TIME.DATE}
                disablePast={false}
                leftArrowIcon={<Icon icon="arrow-left" />}
                rightArrowIcon={<Icon icon="arrow-right" />}
                helperText={dateValidationText}
                FormHelperTextProps={{ classes: { error: dateErrorCls } }}
              />
            </GridItem>
            <GridItem xs={12} md={1} className={classes.middleOr}>
              <p className={classes.label}>OR</p>
            </GridItem>
            <GridItem xs={12} md={6}>
              <H5 className={classes.label}>
                Which day of the week will the tour start?
              </H5>
              <FormControl className={classes.selectSpecific}>
                <FormLabel>Day of Week for Tour</FormLabel>
                <Select
                  disabled={dateVal !== null}
                  value={dayVal}
                  onChange={onDayChange}
                  placeholder="Day of Week for Tour"
                  className={classes.selectSpecific}
                  IconComponent="span"
                >
                  {items}
                </Select>
                <Button
                  variant={VARIANTS.INLINE}
                  onClick={onClearLine}
                  className={classes.clearLineBtn}
                >
                  Clear line
                </Button>
              </FormControl>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <br />
      {serverError}
    </Fragment>
  );
};

AddTemplateModalBody.propTypes = {
  errors: PropTypes.string,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onDurationChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onDayChange: PropTypes.func.isRequired,
  onClearLine: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dateVal: PropTypes.string,
  dayVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isDateValid: PropTypes.bool,
  dateValidationText: PropTypes.string,
};
AddTemplateModalBody.defaultProps = {
  dateVal: null,
  isDateValid: null,
  dateValidationText: '',
};

export default withStyles(stylesheet, { name: 'AddTemplateModalBody' })(
  AddTemplateModalBody,
);
