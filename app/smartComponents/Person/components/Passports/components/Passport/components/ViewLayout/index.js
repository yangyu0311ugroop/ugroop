import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { compose } from 'redux';
import resaga from 'resaga';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import CardNumber from 'smartComponents/Person/components/Passports/parts/CardNumber';
import ExpiryDate from 'smartComponents/Person/components/Passports/parts/ExpireDate';
import FirstName from 'smartComponents/Person/components/Passports/parts/FirstName';
import IssuedDate from 'smartComponents/Person/components/Passports/parts/IssuedDate';
import IssuingAuthority from 'smartComponents/Person/components/Passports/parts/IssuingAuthority';
import LastName from 'smartComponents/Person/components/Passports/parts/LastName';
import MiddleName from 'smartComponents/Person/components/Passports/parts/MiddleName';
import PassportNumber from 'smartComponents/Person/components/Passports/parts/PassportNumber';
import PassportType from 'smartComponents/Person/components/Passports/parts/PassportType';
import Photo from 'smartComponents/Person/components/Passports/parts/Photo';
import BirthDate from 'smartComponents/Person/parts/BirthDate';
import BirthPlace from 'smartComponents/Person/parts/BirthPlace';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';

import { CONFIG } from './config';
import styles from './styles';

export class ViewLayout extends PureComponent {
  state = {
    showOtherFields: false,
  };

  // getButtonLabel = () => `Show ${this.state.showOtherFields ? 'Less' : 'More'}`;

  handleShowMore = () =>
    this.setState(prevState => ({
      showOtherFields: !prevState.showOtherFields,
    }));

  shouldNotShowPhoto = () =>
    isEmptyString(this.props.photo) || this.props.hidePhoto;

  renderInfo = () => (
    <GridItem
      xs={12}
      md={LOGIC_HELPERS.ifElse(this.shouldNotShowPhoto(), 12, 7)}
    >
      {/* Passport Number and Type */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <PassportNumber id={this.props.id} userId={this.props.userId} />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <PassportType id={this.props.id} userId={this.props.userId} />
        </GridItem>
      </GridContainer>

      {/* Name */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <FirstName id={this.props.id} userId={this.props.userId} />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6}>
          <MiddleName id={this.props.id} userId={this.props.userId} />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6}>
          <LastName id={this.props.id} userId={this.props.userId} />
        </GridItem>
      </GridContainer>

      {/* Date and Place of Birth */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <BirthDate id={this.props.userId} passportId={this.props.id} />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <BirthPlace id={this.props.userId} passportId={this.props.id} />
        </GridItem>
      </GridContainer>
      {/* Date of Expiry and Issue */}
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <IssuedDate
            onChange={this.handleChange}
            id={this.props.id}
            userId={this.props.userId}
          />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <ExpiryDate
            issuedDate={this.state.issuedDate}
            id={this.props.id}
            userId={this.props.userId}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6}>
          <IssuingAuthority id={this.props.id} userId={this.props.userId} />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <CardNumber id={this.props.id} userId={this.props.userId} />
        </GridItem>
      </GridContainer>

      {/* Card Number and Issuing Authority */}
    </GridItem>
  );
  /**
 * Collapsible Field
 <Collapse
 in={this.state.showOtherFields}
 className={
  classnames(
    this.props.classes.collapse,
    { [this.props.classes.collapseOpened]: this.state.showOtherFields }
  )
}
 >
 <GridContainer>
 <GridItem xs={12} sm={6}>
 <IssuingAuthority id={this.props.id} userId={this.props.userId} />
 </GridItem>
 <GridItem xs={12} sm={6}>
 <CardNumber id={this.props.id} userId={this.props.userId} />
 </GridItem>
 </GridContainer>
 </Collapse>
 */

  renderPhoto = () => {
    if (this.shouldNotShowPhoto()) {
      return null;
    }
    return (
      <GridItem xs={12} md={5}>
        <GridContainer
          alignItems="center"
          justify="flex-end"
          className={this.props.classes.photoContainer}
        >
          <Photo
            size={IMAGE_SIZES_CONSTANTS.LG}
            id={this.props.id}
            label="Passport Photo"
          />
        </GridContainer>
      </GridItem>
    );
  };

  render = () => (
    <div>
      <GridContainer>
        {this.renderInfo()}
        {this.renderPhoto()}
      </GridContainer>
    </div>
  );
}

/**
 * Collapsible Button
  <Button
    className={classnames(this.props.classes.showMore)}
    variant={VARIANTS.INLINE}
    color="black"
    noPadding
    weight="bold"
    onClick={this.handleShowMore}
  >
    {this.getButtonLabel()}
  </Button>
* */

ViewLayout.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  userId: PropTypes.number,
  hidePhoto: PropTypes.bool,

  // resaga props
  photo: PropTypes.string,
};

ViewLayout.defaultProps = {
  id: 0,
  photo: '',
  userId: 0,
  hidePhoto: false,
};

export default compose(
  withStyles(styles, { name: 'ViewLayout' }),
  resaga(CONFIG),
)(ViewLayout);
