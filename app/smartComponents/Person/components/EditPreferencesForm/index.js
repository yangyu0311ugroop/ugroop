import {
  DEFAULT,
  DEFAULT_REMINDER_ATTEMPTS,
  DEFAULT_REMINDER_FREQUENCY_DAYS,
  URL_HELPERS,
} from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { withStyles } from '@material-ui/core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { USER_API, UPSERT_PERSONAL_PREFERENCES } from 'apis/constants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Form, { TextField } from 'ugcomponents/Form';
import { Popper, Paper, ClickAwayListener } from 'components/material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import Margin from 'viewComponents/Margin';
import Button from 'viewComponents/Button';
import helper from 'ugcomponents/SnackBar/helpers';
import { SwitchField } from 'viewComponents/Inputs';
import { isEmptyString, pluralizeText } from 'utils/stringAdditions';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import Hr from 'components/Hr';
import JButton from 'viewComponents/Button/variants/JButton';

import { withRouter } from 'react-router-dom';
import { withXSDown } from 'components/material-ui/hocs/withMediaQuery';
import { CONFIG } from './config';
import styles from './styles';

export class EditPreferencesForm extends PureComponent {
  state = {
    anchorElFreq: null,
    anchorElAtmps: null,
    clickAwayFreq: true,
    clickAwayAtmps: true,
    isChanged: false,
  };

  logicWording = (days, count) => {
    const dayText = LOGIC_HELPERS.ifElse(
      days === 1,
      'everyday',
      `every ${days} days`,
    );
    const frequent = ` for ${count} ${pluralizeText('attempt', count)}`;
    return `${dayText} ${frequent}`;
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

  handlePopperClickAwayFreq = () => {
    const { clickAwayFreq } = this.state;
    if (clickAwayFreq) {
      this.closePopperFreq();
    }
  };

  handlePopperClickAwayAtmps = () => {
    const { clickAwayAtmps } = this.state;
    if (clickAwayAtmps) {
      this.closePopperAtmps();
    }
  };

  closePopperFreq = () => {
    this.popperClose = this.setState({ anchorElFreq: null });
  };

  closePopperAtmps = () => {
    this.popperClose = this.setState({ anchorElAtmps: null });
  };

  handleSwitchChange = value => {
    const { userId, reminderAttempts, reminderFrequencyDays } = this.props;
    this.props.resaga.dispatchTo(USER_API, UPSERT_PERSONAL_PREFERENCES, {
      payload: {
        id: userId,
        data: {
          reminderDisabled: value,
          reminderAttempts,
          reminderFrequencyDays,
        },
      },
    });
  };

  handleSwitchChangeSeeMore = value => {
    const { userId } = this.props;
    this.props.resaga.dispatchTo(USER_API, UPSERT_PERSONAL_PREFERENCES, {
      payload: {
        id: userId,
        data: {
          seeMoreDisabled: value,
        },
      },
    });
  };

  toggleReminder = value => {
    this.handleSwitchChange(LOGIC_HELPERS.ifElse(value, '0', '1'));
  };

  toggleReminderSeeMore = value => {
    this.handleSwitchChangeSeeMore(LOGIC_HELPERS.ifElse(value, '0', '1'));
  };

  updatePreferenceSuccess = () => {
    helper.openSuccessSnackbar(
      'Success! Reminder preferences have been updated!',
      this.props.resaga,
    );
  };

  updatePreferencesNoChanges = () => {
    helper.openErrorSnackbar('No changes have been made!', this.props.resaga);
  };

  updatePreferencesInvalidInput = () => {
    helper.openErrorSnackbar('Invalid Input!', this.props.resaga);
  };

  handleChange = (form, isChanged) => {
    this.setState({ isChanged });
  };

  handleDiscard = () => {
    const { isChanged } = this.state;

    if (isChanged && !window.confirm('You will lose your data. Continue?')) {
      return null;
    }

    return this.goPersonalPreference();
  };

  goPersonalPreference = () =>
    URL_HELPERS.goToUrl(
      URL_HELPERS.personalSettingsPreference(this.props.userId),
      this.props,
    )();

  handleValidSubmit = data => {
    const {
      userId,
      reminderDisabled,
      reminderAttempts,
      reminderFrequencyDays,
      seeMoreDisabled,
    } = this.props;
    const { reminderFrequency, reminderNumberOfAttempts } = data;

    const { isChanged } = this.state;
    if (!isChanged) return null;

    const frequency =
      isEmptyString(reminderFrequency) || parseInt(reminderFrequency, 10) === 0
        ? DEFAULT_REMINDER_FREQUENCY_DAYS
        : reminderFrequency;

    const attempts =
      isEmptyString(reminderNumberOfAttempts) ||
      parseInt(reminderNumberOfAttempts, 10) === 0
        ? DEFAULT_REMINDER_ATTEMPTS
        : reminderNumberOfAttempts;

    if (
      parseInt(reminderAttempts, 10) ===
        parseInt(reminderNumberOfAttempts, 10) &&
      parseInt(reminderFrequencyDays, 10) === parseInt(reminderFrequency, 10)
    ) {
      this.updatePreferencesNoChanges();
    } else if (
      parseInt(reminderNumberOfAttempts, 10) < 0 ||
      parseInt(reminderFrequency, 10) < 0
    ) {
      this.updatePreferencesInvalidInput();
    } else {
      this.props.resaga.dispatchTo(USER_API, UPSERT_PERSONAL_PREFERENCES, {
        payload: {
          id: userId,
          data: {
            reminderAttempts: attempts,
            reminderFrequencyDays: frequency,
            reminderDisabled,
            seeMoreDisabled,
          },
        },
        onSuccess: this.updatePreferenceSuccess,
      });
    }
    return null;
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
                <GridItem>time the invitation was sent. </GridItem>
              </GridContainer>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </>
    );
  };

  renderFields = () => {
    const {
      reminderAttempts,
      reminderFrequencyDays,
      reminderDisabled,
    } = this.props;
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
        <Margin bottom="lg">
          <TextField
            InputProps={frequencyInputProps}
            id="reminderFrequency"
            label="Frequency of Reminders (in Days)"
            name="reminderFrequency"
            fullWidth
            type="number"
            isLabelStatic
            value={reminderFrequencyDays}
            disabled={parseInt(reminderDisabled, 10) === 1}
          />
        </Margin>
        <Margin bottom="lg">
          <TextField
            InputProps={attemptsInputProps}
            id="reminderNumberOfAttempts"
            label="Number of Attempts"
            name="reminderNumberOfAttempts"
            fullWidth
            type="number"
            isLabelStatic
            value={reminderAttempts}
            disabled={parseInt(reminderDisabled, 10) === 1}
          />
        </Margin>
      </React.Fragment>
    );
  };

  renderSwitch = () => {
    const { reminderDisabled } = this.props;
    const toggleText =
      parseInt(reminderDisabled, 10) === 0 || !reminderDisabled
        ? 'enabled'
        : 'disabled';
    return (
      <>
        <GridItem xs={12}>
          <SwitchField
            label={`Reminders ${toggleText}`}
            value={parseInt(reminderDisabled, 10) === 0}
            onChange={this.toggleReminder}
          />
        </GridItem>
      </>
    );
  };

  renderSwitchSeeMore = () => {
    const { seeMoreDisabled, classes } = this.props;
    const toggleText =
      parseInt(seeMoreDisabled, 10) === 0 || !seeMoreDisabled
        ? 'enabled'
        : 'disabled';
    return (
      <>
        <GridItem xs={12} className={classes.seeMore}>
          <SwitchField
            label={`See More ${toggleText}`}
            value={parseInt(seeMoreDisabled, 10) === 0}
            onChange={this.toggleReminderSeeMore}
          />
        </GridItem>
      </>
    );
  };

  renderForm = () => {
    const { classes } = this.props;
    return (
      <div className={classes.offsetGrid}>
        <GridContainer direction="column" spacing={2} className={classes.root}>
          <GridItem>
            <JText gray nowrap={false}>
              Changes to your personal reminders will be reflected across all
              tours.
            </JText>
          </GridItem>

          <GridItem>
            <Hr half />
          </GridItem>

          <GridItem>
            <GridContainer
              card
              highlight
              cardPadding={4}
              alignItems="center"
              direction="column"
              spacing={0}
            >
              <GridItem className={classes.fullWidth}>
                <GridContainer
                  direction="column"
                  spacing={3}
                  className={classes.formWidth}
                >
                  <GridItem>
                    <JText bold gray sm uppercase>
                      CHANGE INVITATION REMINDER
                    </JText>
                  </GridItem>
                  <GridItem className={classes.fullWidth}>
                    {this.renderInputs()}
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  renderSeeMoreSwitch = () => {
    const { classes, seeMoreDisabled } = this.props;
    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem className={classes.grow}>
            <GridContainer
              direction="row"
              alignItems="center"
              justify="flex-start"
              spacing={0}
            >
              <GridItem>
                <JText bold gray sm uppercase>
                  Disable See More
                </JText>
              </GridItem>
              <GridItem xs>
                <GridContainer justify="flex-end" alignItems="center">
                  <GridItem>
                    <SwitchField
                      value={parseInt(seeMoreDisabled, 10) === 0}
                      onChange={this.toggleReminderSeeMore}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderInputs = () => {
    const { reminderDisabled } = this.props;
    const { isChanged } = this.state;
    return (
      <GridContainer direction="column" justify="flex-start">
        <GridItem>
          <Margin bottom="xs">{this.renderSwitch()}</Margin>
        </GridItem>
        <Form
          onValidSubmit={this.handleValidSubmit}
          onChange={this.handleChange}
        >
          <GridItem>{this.renderFields()}</GridItem>
          <GridItem>
            <GridContainer
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <GridItem>
                <JButton padding="lg" bold onClick={this.handleDiscard}>
                  {LOGIC_HELPERS.ifElse(isChanged, 'Cancel', 'Go back')}
                </JButton>
              </GridItem>
              <GridItem>
                <Button
                  color="primary"
                  type="submit"
                  size="small"
                  disabled={parseInt(reminderDisabled, 10) === 1}
                >
                  Save
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </Form>
      </GridContainer>
    );
  };

  renderReadOnly = () => {
    const {
      reminderAttempts,
      reminderDisabled,
      reminderFrequencyDays,
      classes,
      xsDown,
    } = this.props;

    const attempts =
      reminderAttempts || parseInt(DEFAULT_REMINDER_ATTEMPTS, 10);
    const frequency =
      reminderFrequencyDays || parseInt(DEFAULT_REMINDER_FREQUENCY_DAYS, 10);

    const renderReminder = xsDown
      ? !reminderDisabled && (
          <GridItem>
            <GridContainer
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={0}
            >
              <GridItem>
                <JText gray italic className={classes.reminderText}>
                  Email reminder will be send
                </JText>
              </GridItem>
              <GridItem>
                <JText gray italic className={classes.reminderText}>
                  {this.logicWording(frequency, attempts)}
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
        )
      : !reminderDisabled && (
          <JText gray italic className={classes.reminderText}>
            Email reminder will be send be send{' '}
            {this.logicWording(frequency, attempts)}
          </JText>
        );

    return (
      <>
        <GridItem>
          <GridContainer>
            {!reminderDisabled && <div className={classes.live} />}
            <GridItem>
              Reminder is{' '}
              {LOGIC_HELPERS.ifElse(reminderDisabled, 'not active.', 'Active.')}
            </GridItem>
          </GridContainer>
        </GridItem>
        {renderReminder}
      </>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderForm,
      [VARIANTS.READ_ONLY]: this.renderReadOnly,
      [VARIANTS.SEE_MORE_SWITCH]: this.renderSeeMoreSwitch,
    });
  };
}

EditPreferencesForm.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  userId: PropTypes.number,

  // resaga
  reminderFrequencyDays: PropTypes.string,
  reminderAttempts: PropTypes.string,
  reminderDisabled: PropTypes.string,
  seeMoreDisabled: PropTypes.string,

  xsDown: PropTypes.bool,
};

EditPreferencesForm.defaultProps = {
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'EditPreferencesForm' }),
  resaga(CONFIG),
  withXSDown,
  withRouter,
)(EditPreferencesForm);
