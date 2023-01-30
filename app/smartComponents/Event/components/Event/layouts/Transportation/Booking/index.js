import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  TransportationBookingPersonCount,
  TransportationBookedBy,
  TransportationBookingNumber,
  TransportationSupplierName,
  TransportationSupplierPhoneNumber,
} from 'smartComponents/Event/components/Event/parts';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { CONFIG } from './config';
import m from './messages';
import { ability } from '../../../../../../../apis/components/Ability/ability';
import { PARTICIPANT } from '../../../../../../../utils/modelConstants';

export class Booking extends PureComponent {
  getPersonCountProps = () => {
    const {
      personCountLabel: label,
      personCountPlaceholder: placeholder,
    } = this.props;
    return { label, placeholder };
  };

  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderTitle = () => <M {...m.sectionLabel} />;

  renderDefault = () => {
    if (!ability.can('execute', PARTICIPANT)) return null;
    return (
      <React.Fragment>
        {this.renderPart(TransportationBookedBy)}
        {this.renderPart(TransportationBookingNumber)}
        {this.renderPart(TransportationSupplierName)}
        {this.renderPart(TransportationSupplierPhoneNumber)}
        {this.renderPart(
          TransportationBookingPersonCount,
          this.getPersonCountProps(),
        )}
      </React.Fragment>
    );
  };

  renderField = () => (
    <Section
      title={this.renderTitle()}
      ExpansionPanelProps={{ defaultExpanded: false }}
    >
      <GridContainer direction="column">
        <GridItem>
          <GridContainer>
            {this.renderPart(TransportationBookedBy)}
            {this.renderPart(TransportationBookingNumber)}
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer>
            {this.renderPart(TransportationSupplierName)}
            {this.renderPart(TransportationSupplierPhoneNumber)}
          </GridContainer>
        </GridItem>
        <GridItem>
          {this.renderPart(
            TransportationBookingPersonCount,
            this.getPersonCountProps(),
          )}
        </GridItem>
      </GridContainer>
    </Section>
  );

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderDefault}
        renderField={this.renderField}
      />
    );
  };
}

Booking.propTypes = {
  variant: PropTypes.string,
  personCountLabel: PropTypes.node,
  personCountPlaceholder: PropTypes.string,
};

Booking.defaultProps = {
  variant: null,
};

export default compose(resaga(CONFIG))(Booking);
