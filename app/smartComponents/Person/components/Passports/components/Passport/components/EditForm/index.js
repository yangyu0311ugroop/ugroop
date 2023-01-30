import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import CardNumber from 'smartComponents/Person/components/Passports/parts/CardNumber';
import CountryCode from 'smartComponents/Person/components/Passports/parts/CountryCode';
import ExpiryDate from 'smartComponents/Person/components/Passports/parts/ExpireDate';
import FirstName from 'smartComponents/Person/components/Passports/parts/FirstName';
import IssuedDate from 'smartComponents/Person/components/Passports/parts/IssuedDate';
import IssuingAuthority from 'smartComponents/Person/components/Passports/parts/IssuingAuthority';
import LastName from 'smartComponents/Person/components/Passports/parts/LastName';
import MiddleName from 'smartComponents/Person/components/Passports/parts/MiddleName';
import PassportNumber from 'smartComponents/Person/components/Passports/parts/PassportNumber';
import PassportType from 'smartComponents/Person/components/Passports/parts/PassportType';
import BirthPlace from 'smartComponents/Person/parts/BirthPlace';
import BirthDate from 'smartComponents/Person/parts/BirthDate';
import Photo from 'smartComponents/Person/components/Passports/parts/Photo';
import IsDefault from 'smartComponents/Person/components/Passports/parts/IsDefault';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Margin from 'viewComponents/Margin';
import Form from 'ugcomponents/Form';

import { VARIANTS } from 'variantsConstants';

import { CONFIG } from './config';
import styles from './styles';

export class EditForm extends PureComponent {
  state = {
    issuedDate: this.props.issuedDate,
  };

  handleChange = issuedDate =>
    this.setState({
      issuedDate,
    });

  renderInfo = () => (
    <React.Fragment>
      {/* Passport Number and Type */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <PassportNumber variant={VARIANTS.TEXT_FIELD} id={this.props.id} />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <PassportType variant={VARIANTS.TEXT_FIELD} id={this.props.id} />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6}>
          <CountryCode variant={VARIANTS.TEXT_FIELD} id={this.props.id} />
        </GridItem>
      </GridContainer>

      {/* Name */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <FirstName variant={VARIANTS.TEXT_FIELD} id={this.props.id} />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6}>
          <MiddleName variant={VARIANTS.TEXT_FIELD} id={this.props.id} />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6}>
          <LastName variant={VARIANTS.TEXT_FIELD} id={this.props.id} />
        </GridItem>
      </GridContainer>
      {/* Date and Place of Birth */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <BirthDate variant={VARIANTS.TEXT_FIELD} id={this.props.userId} />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <BirthPlace variant={VARIANTS.TEXT_FIELD} id={this.props.userId} />
        </GridItem>
      </GridContainer>
      {/* Date of Expiry and Issue */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <IssuedDate
            onChange={this.handleChange}
            variant={VARIANTS.TEXT_FIELD}
            id={this.props.id}
          />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <ExpiryDate
            issuedDate={this.state.issuedDate}
            variant={VARIANTS.TEXT_FIELD}
            id={this.props.id}
          />
        </GridItem>
      </GridContainer>
      {/* Card Number and Issuing Authority */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <IssuingAuthority variant={VARIANTS.TEXT_FIELD} id={this.props.id} />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <CardNumber variant={VARIANTS.TEXT_FIELD} id={this.props.id} />
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );

  renderPhoto = () => (
    <React.Fragment>
      <GridContainer spacing={3}>
        <Margin left="md" bottom="md">
          <IsDefault
            isChecked={!(this.props.passports.length > 0)}
            disabled={!(this.props.passports.length > 0)}
            variant={VARIANTS.CHECKBOX_FIELD}
            id={this.props.id}
          />
        </Margin>
      </GridContainer>
      <GridContainer
        alignItems="center"
        justify="flex-end"
        className={this.props.classes.photoContainer}
      >
        <Photo
          editable
          name="photo"
          label="Passport Page Photo"
          isFormsyConnected
          placeholderSize={IMAGE_SIZES_CONSTANTS.LANDSCAPE_MD}
          size={IMAGE_SIZES_CONSTANTS.LANDSCAPE_MD}
          id={this.props.id}
        />
      </GridContainer>
    </React.Fragment>
  );

  renderContent = () => (
    <GridContainer alignItems="baseline" spacing={3}>
      <GridItem
        xs={12}
        sm={LOGIC_HELPERS.ifElse(this.props.withFormWrap, 8, 6)}
      >
        {this.renderInfo()}
      </GridItem>
      <GridItem
        xs={12}
        sm={LOGIC_HELPERS.ifElse(this.props.withFormWrap, 4, 6)}
      >
        {this.renderPhoto()}
      </GridItem>
    </GridContainer>
  );

  render = () =>
    this.props.withFormWrap ? (
      <Form onValidSubmit={this.props.onValidSubmit}>
        {this.renderContent()}
      </Form>
    ) : (
      this.renderContent()
    );
}

EditForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  withFormWrap: PropTypes.bool,
  userId: PropTypes.number,
  id: PropTypes.number,
  onValidSubmit: PropTypes.func,

  // resaga props
  passports: PropTypes.array,
  issuedDate: PropTypes.string,
};

EditForm.defaultProps = {
  id: 0,
  withFormWrap: true,
  userId: 0,
  onValidSubmit: null,
  passports: [],
  issuedDate: '',
};

export default compose(
  withStyles(styles, { name: 'EditForm' }),
  resaga(CONFIG),
)(EditForm);
