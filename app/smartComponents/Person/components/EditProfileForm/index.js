import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { PERSON_DETAIL_API, PATCH_PERSON_FACADE } from 'apis/constants';
import { VARIANTS } from 'variantsConstants';
import has from 'lodash/has';
import { isEmptyString } from 'utils/stringAdditions';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

// parts
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import Email from 'smartComponents/Person/parts/Email';
import SecondaryEmail from 'smartComponents/Person/parts/SecondaryEmail';
import Gender from 'smartComponents/Person/parts/Gender';
import FirstName from 'smartComponents/Person/parts/FirstName';
import LastName from 'smartComponents/Person/parts/LastName';
import InsurancePolicy from 'smartComponents/Person/parts/InsurancePolicy';
import BirthDate from 'smartComponents/Person/parts/BirthDate';

// View Components
import Button from 'viewComponents/Button';
import Margin from 'viewComponents/Margin';
import Form from 'ugcomponents/Form';

import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class EditProfileForm extends PureComponent {
  handleSubmitSuccess = () => {
    SnackbarHelpers.openSuccessSnackbar(
      'Successfully updated your information',
      this.props.resaga,
    );
  };

  validateData = data => {
    const formData = data;
    if (has(formData, 'birthDate') && isEmptyString(formData.birthDate)) {
      formData.birthDate = null;
    }

    return formData;
  };

  handleSubmit = data => {
    if (isEmptyString(data.knownAs)) {
      this.props.resaga.setValue({ knownAs: '' });
    }
    const validatedData = LOGIC_HELPERS.ifElse(
      isEmptyString(data.knownAs),
      { ...data, knownAs: `${data.firstName} ${data.lastName}` },
      data,
    );
    const formData = this.validateData(validatedData);
    // remove once the fields are supported in the patch of PersonDetails
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PERSON_FACADE, {
      payload: {
        data: formData,
        userId: this.props.id,
      },
      onSuccess: this.handleSubmitSuccess,
    });
  };

  render = () => {
    const { classes, id } = this.props;

    return (
      <Form onValidSubmit={this.handleSubmit} className={classes.root}>
        <Margin bottom="lg">
          <KnownAs id={id} variant={VARIANTS.TEXT_FIELD} />
        </Margin>
        <Margin bottom="lg">
          <FirstName id={id} variant={VARIANTS.TEXT_FIELD} />
        </Margin>
        <Margin bottom="lg">
          <LastName id={id} variant={VARIANTS.TEXT_FIELD} />
        </Margin>
        <Margin bottom="lg">
          <Email id={id} variant={VARIANTS.TEXT_FIELD} disabled />
        </Margin>
        <Margin bottom="lg">
          <SecondaryEmail id={id} variant={VARIANTS.TEXT_FIELD} />
        </Margin>
        <Margin bottom="lg">
          <Gender id={id} variant={VARIANTS.RADIO_FIELD} />
        </Margin>
        <Margin bottom="lg">
          <BirthDate id={id} variant={VARIANTS.TEXT_FIELD} />
        </Margin>
        <Margin bottom="lg">
          <InsurancePolicy id={id} variant={VARIANTS.TEXT_FIELD} />
        </Margin>
        <GridContainer spacing={0}>
          <GridItem>
            <Button color="primary" type="submit" size="small">
              <M {...m.submitBtn} />
            </Button>
          </GridItem>
        </GridContainer>
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

  // resaga props
};

EditProfileForm.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'EditProfileForm' }),
  resaga(CONFIG),
)(EditProfileForm);
