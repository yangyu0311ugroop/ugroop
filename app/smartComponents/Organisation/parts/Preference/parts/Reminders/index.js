import {
  DEFAULT_REMINDER_ATTEMPTS,
  DEFAULT_REMINDER_FREQUENCY_DAYS,
  DEFAULT_REMINDER_DISABLED,
  DEFAULT,
} from 'appConstants';
import { Popper, Paper, ClickAwayListener } from 'components/material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ORGANISATION_API, PATCH_ORG } from 'apis/constants';
import { withStyles } from '@material-ui/core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Margin from 'viewComponents/Margin';
import { TextField } from 'ugcomponents/Form';
import { SwitchField } from 'viewComponents/Inputs';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import { pluralizeText } from 'utils/stringAdditions';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import styles from './styles';
import { CONFIG } from './config';
import JText from '../../../../../../components/JText';

export class Reminders extends PureComponent {
  state = {
    anchorElAtmps: null,
    anchorElFreq: null,
    clickAwayAtmps: true,
    clickAwayFreq: true,
  };

  openPopperFreq = event => {
    const { anchorElFreq } = this.state;
    this.setState({
      anchorElFreq: anchorElFreq ? null : event.currentTarget,
    });
  };

  openPopperAtmps = event => {
    const { anchorElAtmps } = this.state;
    this.setState({
      anchorElAtmps: anchorElAtmps ? null : event.currentTarget,
    });
  };

  handlePopperClickAwayAtmps = () => {
    const { clickAwayAtmps } = this.state;
    if (clickAwayAtmps) {
      this.closePopperAtmps();
    }
  };

  handlePopperClickAwayFreq = () => {
    const { clickAwayFreq } = this.state;
    if (clickAwayFreq) {
      this.closePopperFreq();
    }
  };

  closePopperAtmps = () => {
    this.popperClose = this.setState({ anchorElAtmps: null });
  };

  closePopperFreq = () => {
    this.popperClose = this.setState({ anchorElFreq: null });
  };

  handleSwitchChange = value => {
    const { orgId, reminderFrequencyDays, reminderAttempts } = this.props;

    this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id: orgId,
        data: {
          preference: {
            reminderDisabled: value,
            reminderFrequencyDays,
            reminderAttempts,
          },
        },
      },
    });
  };

  toggleReminder = value => {
    this.handleSwitchChange(LOGIC_HELPERS.ifElse(value, 0, 1));
  };

  renderSwitch = () => {
    const { reminderDisabled, disabled: disableProp } = this.props;
    const toggleText =
      parseInt(reminderDisabled, 10) === 0 || !reminderDisabled
        ? 'enabled'
        : 'disabled';
    const disabled = reminderDisabled || DEFAULT_REMINDER_DISABLED;
    return (
      <SwitchField
        label={`Reminders ${toggleText}`}
        value={parseInt(disabled, 10) === 0}
        onChange={this.toggleReminder}
        disabled={disableProp}
      />
    );
  };

  renderPopperPaperAtmps = () => {
    const { classes } = this.props;
    const { anchorElAtmps } = this.state;
    const open = Boolean(anchorElAtmps);
    return (
      <>
        <Button
          size="extraSmall"
          variant={VARIANTS.BORDERLESS}
          onClick={this.openPopperAtmps}
          iconButton
          icon="lnr-question-circle"
          color="gray"
        />
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorElAtmps}
          placement="right-start"
          disablePortal
        >
          <ClickAwayListener
            onClickAway={this.handlePopperClickAwayAtmps}
            mouseEvent="onMouseDown"
          >
            <Paper className={classes.popperContainer}>
              <GridContainer>
                <GridItem>The maximum number of times a user will </GridItem>
                <GridItem>be reminded of the invitation.</GridItem>
              </GridContainer>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </>
    );
  };

  renderPopperPaperFreq = () => {
    const { classes } = this.props;
    const { anchorElFreq } = this.state;
    const open = Boolean(anchorElFreq);
    return (
      <>
        <Button
          size="extraSmall"
          variant={VARIANTS.BORDERLESS}
          onClick={this.openPopperFreq}
          iconButton
          icon="lnr-question-circle"
          color="gray"
        />
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorElFreq}
          placement="right-start"
          disablePortal
        >
          <ClickAwayListener
            onClickAway={this.handlePopperClickAwayFreq}
            mouseEvent="onMouseDown"
          >
            <Paper className={classes.popperContainer}>
              <GridContainer>
                <GridItem>Every how many days a reminder should be</GridItem>
                <GridItem>sent, counting from the date and</GridItem>
                <GridItem>time the invitation was sent.</GridItem>
              </GridContainer>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </>
    );
  };

  renderReminderFields = () => {
    const {
      reminderAttempts,
      reminderDisabled,
      reminderFrequencyDays,
      disabled,
    } = this.props;
    const attempts =
      reminderAttempts || parseInt(DEFAULT_REMINDER_ATTEMPTS, 10);
    const frequency =
      reminderFrequencyDays || parseInt(DEFAULT_REMINDER_FREQUENCY_DAYS, 10);

    const frequencyInputProps = {
      endAdornment: (
        <InputAdornment position="end">
          {this.renderPopperPaperFreq()}
        </InputAdornment>
      ),
    };
    const attemptsInputProps = {
      endAdornment: (
        <InputAdornment position="end">
          {this.renderPopperPaperAtmps()}
        </InputAdornment>
      ),
    };

    return (
      <React.Fragment>
        <Margin bottom="xs">{this.renderSwitch()}</Margin>
        <Margin bottom="lg">
          <TextField
            InputProps={frequencyInputProps}
            id="reminderFrequency"
            label="Frequency of Reminders (in Days)"
            name="reminderFrequency"
            fullWidth
            isLabelStatic
            value={frequency}
            disabled={parseInt(reminderDisabled, 10) === 1 || disabled}
          />
        </Margin>
        <Margin bottom="lg">
          <TextField
            InputProps={attemptsInputProps}
            id="reminderNumberOfAttempts"
            label="Number of Attempts"
            name="reminderNumberOfAttempts"
            fullWidth
            isLabelStatic
            value={attempts}
            disabled={parseInt(reminderDisabled, 10) === 1 || disabled}
          />
        </Margin>
      </React.Fragment>
    );
  };

  logicWording = (days, count) => {
    /*  const dayText = LOGIC_HELPERS.ifElse(
      days === 1,
      'once a day',
      `${days} times daily`,
    ); */
    const dayText = LOGIC_HELPERS.ifElse(
      days === 1,
      'everyday',
      `every ${days} days`,
    );
    const frequent = ` for ${count} ${pluralizeText('attempt', count)}`;
    /* const frequent = LOGIC_HELPERS.ifElse(
      count <= 1,
      '',
      ` for ${count} ${pluralizeText('attempt', count)}`,
    ); */
    return `${dayText} ${frequent}`;
  };

  renderReadOnly = () => {
    const {
      reminderAttempts,
      reminderDisabled,
      reminderFrequencyDays,
      classes,
    } = this.props;

    const attempts =
      reminderAttempts || parseInt(DEFAULT_REMINDER_ATTEMPTS, 10);
    const frequency =
      reminderFrequencyDays || parseInt(DEFAULT_REMINDER_FREQUENCY_DAYS, 10);

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer>
            {!reminderDisabled && <div className={classes.live} />}
            <GridItem>
              Reminder is{' '}
              {LOGIC_HELPERS.ifElse(reminderDisabled, 'not active.', 'Active.')}
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer>
            <GridItem>
              {!reminderDisabled && (
                <GridItem>
                  <JText gray italic className={classes.reminderText}>
                    Email reminder will be send{' '}
                    {this.logicWording(frequency, attempts)}
                  </JText>
                </GridItem>
              )}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderReminderFields,
      [VARIANTS.READ_ONLY]: this.renderReadOnly,
    });
  };
}

Reminders.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  orgId: PropTypes.number,
  disabled: PropTypes.bool,

  // resaga
  reminderFrequencyDays: PropTypes.string,
  reminderAttempts: PropTypes.string,
  reminderDisabled: PropTypes.string,
};

Reminders.defaultProps = {
  variant: '',
  disabled: false,
};

export default compose(
  withStyles(styles, { name: 'OrganisationReminderPreferences' }),
  resaga(CONFIG),
)(Reminders);
