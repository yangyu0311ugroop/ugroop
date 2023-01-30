/**
 * Created by stephenkarpinskyj on 15/11/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import {
  EventBookerName,
  EventBookingNumber,
  EventSupplierName,
  EventSupplierPhone,
  EventBookingPersonCount,
} from 'smartComponents/Event/components/Event/parts';
import m from './messages';

export class EventBooking extends React.PureComponent {
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

  renderDefault = () => (
    <React.Fragment>
      {this.renderPart(EventBookerName)}
      {this.renderPart(EventBookingNumber)}
      {this.renderPart(EventSupplierName)}
      {this.renderPart(EventSupplierPhone)}
      {this.renderPart(EventBookingPersonCount, this.getPersonCountProps())}
    </React.Fragment>
  );

  renderField = () => (
    <Section
      title={this.renderTitle()}
      ExpansionPanelProps={{ defaultExpanded: false }}
    >
      <GridContainer direction="column">
        <GridItem>
          <GridContainer>
            {this.renderPart(EventBookerName)}
            {this.renderPart(EventBookingNumber)}
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer>
            {this.renderPart(EventSupplierName)}
            {this.renderPart(EventSupplierPhone)}
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer>
            {this.renderPart(
              EventBookingPersonCount,
              this.getPersonCountProps(),
            )}
          </GridContainer>
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

EventBooking.propTypes = {
  // parent
  variant: PropTypes.string,
  personCountLabel: PropTypes.node,
  personCountPlaceholder: PropTypes.string,
};

EventBooking.defaultProps = {
  variant: null,
  personCountLabel: null,
  personCountPlaceholder: null,
};

export default EventBooking;
