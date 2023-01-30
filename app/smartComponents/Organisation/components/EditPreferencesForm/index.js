import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { ORGANISATION_API, PATCH_ORG } from 'apis/constants';
import { isEmptyString } from 'utils/stringAdditions';

// parts
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';

import Timezone from 'smartComponents/Organisation/parts/Preference/parts/Timezone';
import DateFormat from 'smartComponents/Organisation/parts/Preference/parts/DateFormat';
import Reminders from 'smartComponents/Organisation/parts/Preference/parts/Reminders';
import PaxLabel from 'smartComponents/Organisation/parts/Preference/parts/PaxLabel';

// View Components
import Button from 'viewComponents/Button';
import Margin from 'viewComponents/Margin';
import Form from 'ugcomponents/Form';

import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class EditPreferencesForm extends PureComponent {
  handleSubmitSuccess = () => {
    SnackbarHelpers.openSuccessSnackbar(
      'Successfully updated your information',
      this.props.resaga,
    );
  };

  handleSubmit = formData => {
    const { id } = this.props;

    const attempts =
      isEmptyString(formData.reminderNumberOfAttempts) ||
      parseInt(formData.reminderNumberOfAttempts, 10) === 0
        ? 5
        : formData.reminderNumberOfAttempts;

    const frequency =
      isEmptyString(formData.reminderFrequency) ||
      parseInt(formData.reminderFrequency, 10) === 0
        ? 1
        : formData.reminderFrequency;
    this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id,
        data: {
          preference: {
            format: formData.format,
            timezone: formData.timezone,
            reminderAttempts: attempts,
            reminderFrequencyDays: frequency,
            paxLabel: formData.paxLabel,
          },
        },
      },
      onSuccess: this.handleSubmitSuccess,
    });
  };

  render = () => {
    const { classes, preferenceId, readOnly, id } = this.props;

    return (
      <Form
        onValidSubmit={this.handleSubmit}
        className={classes.root}
        showChangeRoutePrompt
      >
        <Margin bottom="lg" className={classes.timezone}>
          <Timezone
            disabled={readOnly}
            id={preferenceId}
            variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
          />
        </Margin>
        <Margin bottom="lg" className={classes.timezoneMsg}>
          <M {...m.timezoneMsg} />
        </Margin>
        <Margin bottom="lg">
          <DateFormat
            disabled={readOnly}
            id={preferenceId}
            variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
            optionDropDown
          />
        </Margin>
        <Reminders disabled={readOnly} id={preferenceId} orgId={id} />
        <Margin bottom="lg" className={classes.timezone}>
          <PaxLabel
            disabled={readOnly}
            id={preferenceId}
            variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
          />
        </Margin>
        <Margin bottom="lg" className={classes.timezoneMsg}>
          <M {...m.paxLabelMsg} />
        </Margin>
        {!readOnly && (
          <GridContainer spacing={0} justify="flex-end">
            <GridItem>
              <Button color="primary" type="submit" size="small">
                <M {...m.submitBtn} />
              </Button>
            </GridItem>
          </GridContainer>
        )}
      </Form>
    );
  };
}

EditPreferencesForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  // resaga props
  preferenceId: PropTypes.number,
};

EditPreferencesForm.defaultProps = {
  preferenceId: 0,
  readOnly: false,
};

export default compose(
  withStyles(styles, { name: 'EditPreferencesForm' }),
  resaga(CONFIG),
)(EditPreferencesForm);
