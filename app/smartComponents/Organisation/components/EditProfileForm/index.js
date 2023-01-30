import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { ORGANISATION_API, PATCH_ORG } from 'apis/constants';
import { DEFAULT } from 'appConstants';

// parts
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import Name from 'smartComponents/Organisation/parts/Name';
import Address from 'smartComponents/Organisation/parts/Location/parts/Address';
import Type from 'smartComponents/Organisation/parts/Type';
import Website from 'smartComponents/Organisation/parts/Website';
import CreatedDate from 'smartComponents/Organisation/parts/CreatedDate';

// View Components
import Button from 'viewComponents/Button';
import Margin from 'viewComponents/Margin';
import Form from 'ugcomponents/Form';

import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';

import { CONFIG } from './config';
import { LOCATION_CONFIG } from './locationConfig';
import m from './messages';
import styles from './styles';

export class EditProfileForm extends PureComponent {
  componentDidMount = () => {
    this.finishEdit();
    this.placeId = this.props.placeId;
  };

  handleChange = key => value => {
    if (key === 'placeId') {
      this.placeId = value;
      this.locationChanged = true;
    } else if (key === 'timeZoneId') {
      this.timezoneId = value;
    }
  };

  finishEdit = () => {
    this.placeId = null;
    this.timezoneId = null;
    this.locationChanged = false;
  };

  handleSubmitSuccess = () => {
    SnackbarHelpers.openSuccessSnackbar(
      'Successfully updated your information',
      this.props.resaga,
    );
    this.finishEdit();
  };

  handleSubmit = formData => {
    const { id, placeId, timezone } = this.props;
    const placeIdChanged = this.placeId !== placeId;
    this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id,
        data: {
          location: {
            address: formData.address,
            placeId: this.locationChanged ? this.placeId : placeId,
          },
          website: formData.website,
          preference: {
            timezone: placeIdChanged ? this.timezoneId || timezone : timezone,
          },
          typeId: id,
          name: formData.name,
        },
      },
      onSuccess: this.handleSubmitSuccess,
    });
  };

  render = () => {
    const { classes, id, locationId, readOnly } = this.props;
    return (
      <Form
        onValidSubmit={this.handleSubmit}
        className={classes.root}
        showChangeRoutePrompt
      >
        <Margin bottom="lg">
          <Name
            disabled={readOnly}
            id={id}
            variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
          />
          <CreatedDate id={id} className={classes.createAt} variant={DEFAULT} />
        </Margin>
        <Margin bottom="lg">
          <Address
            id={locationId}
            variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
            handleChange={this.handleChange}
            required
            autoFocus
            textFieldProps={{
              disabled: readOnly,
            }}
          />
        </Margin>
        <Margin bottom="lg">
          <Type id={id} variant={ORG_FIELD_VARIANTS.TEXT_WITH_LABEL} />
        </Margin>
        <Margin bottom="lg">
          <Website
            disabled={readOnly}
            id={id}
            variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
          />
        </Margin>
        {!readOnly && (
          <GridContainer spacing={0}>
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

EditProfileForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,

  // resaga props
  locationId: PropTypes.number,
  placeId: PropTypes.string,
  timezone: PropTypes.string,
};

EditProfileForm.defaultProps = {
  locationId: 0,
  placeId: '',
  timezone: '',
};

export default compose(
  withStyles(styles, { name: 'EditProfileForm' }),
  resaga(CONFIG),
  resaga(LOCATION_CONFIG),
)(EditProfileForm);
