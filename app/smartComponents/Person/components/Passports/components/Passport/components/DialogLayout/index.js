import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT, THE_DOT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { COUNTRY_LIST_HELPERS } from 'utils/countrylist';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import ShowMore from 'viewComponents/ShowMore';
import { EditableLabel } from 'viewComponents/Editable';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import PassportNumber from '../../../../parts/PassportNumber';
import CountryCode from '../../../../parts/CountryCode';
import ExpiryDate from '../../../../parts/ExpireDate';
import PassportType from '../../../../parts/PassportType';
import IssueDate from '../../../../parts/IssuedDate';
import IssuingAuthority from '../../../../parts/IssuingAuthority';
import CardNumber from '../../../../parts/CardNumber';
import Photo from '../../../../parts/Photo';
import { CONFIG } from './config';

export class PassportDialogLayout extends React.PureComponent {
  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderRowCountryCode = value =>
    value && COUNTRY_LIST_HELPERS.getCountryByCode(value);

  renderRowPassportNumber = value =>
    value && (
      <React.Fragment>
        <span> {THE_DOT} </span>
        {value}
      </React.Fragment>
    );

  renderRowExpiryDate = value =>
    value && (
      <React.Fragment>
        <span> {THE_DOT} </span>
        {value}
      </React.Fragment>
    );

  renderRow = () => (
    <React.Fragment>
      {this.renderPart(CountryCode, {
        variant: VARIANTS.RENDER_PROP,
        children: this.renderRowCountryCode,
      })}
      {this.renderPart(PassportNumber, {
        variant: VARIANTS.RENDER_PROP,
        children: this.renderRowPassportNumber,
      })}
      {this.renderPart(ExpiryDate, {
        variant: VARIANTS.RENDER_PROP,
        children: this.renderRowExpiryDate,
        onlyFromNow: true,
      })}
    </React.Fragment>
  );

  renderPhoto = () => {
    const { id, readOnly, onSubmitPhoto, photo } = this.props;
    const showPhoto = !!photo || !readOnly;
    return (
      showPhoto && (
        <GridItem>
          <EditableLabel>Passport page photo</EditableLabel>
          <Photo
            id={id}
            size={IMAGE_SIZES_CONSTANTS.LANDSCAPE_MD}
            label="Passport Page Photo"
            variant={readOnly ? VARIANTS.READ_ONLY : DEFAULT}
            onUpload={onSubmitPhoto}
            onDelete={onSubmitPhoto}
          />
        </GridItem>
      )
    );
  };

  renderMore = () => (
    <GridContainer direction="column">
      <GridItem>{this.renderPart(PassportType)}</GridItem>
      <GridItem>{this.renderPart(IssueDate)}</GridItem>
      <GridItem>{this.renderPart(IssuingAuthority)}</GridItem>
      <GridItem>{this.renderPart(CardNumber)}</GridItem>
      {this.renderPhoto()}
    </GridContainer>
  );

  renderTextField = () => (
    <React.Fragment>
      <GridItem>
        {this.renderPart(CountryCode, { typography: 'P', autoFocus: true })}
      </GridItem>
      <GridItem>{this.renderPart(PassportNumber)}</GridItem>
      <GridItem>{this.renderPart(ExpiryDate)}</GridItem>
    </React.Fragment>
  );

  renderDefault = () => (
    <React.Fragment>
      {this.renderTextField()}
      <GridItem>
        <ShowMore renderMore={this.renderMore} />
      </GridItem>
    </React.Fragment>
  );

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.ROW]: this.renderRow,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderDefault,
    });
  };
}

PassportDialogLayout.propTypes = {
  // parent
  variant: PropTypes.string,
  id: PropTypes.number,
  readOnly: PropTypes.bool,
  onSubmitPhoto: PropTypes.func,

  // resaga value
  photo: PropTypes.string,
};

PassportDialogLayout.defaultProps = {
  variant: null,
  id: null,
  readOnly: null,

  photo: null,
};

export default resaga(CONFIG)(PassportDialogLayout);
