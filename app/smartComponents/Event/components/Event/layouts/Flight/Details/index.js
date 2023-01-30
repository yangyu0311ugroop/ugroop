/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import {
  FlightAirline,
  FlightNumber,
  FlightGate,
  FlightTerminal,
  FlightTravelClass,
} from 'smartComponents/Event/components/Event/parts';
import m from './messages';

export class FlightDetails extends React.PureComponent {
  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderTitle = () => <M {...m.sectionLabel} />;

  renderEditable = () => (
    <GridItem>
      <GridContainer direction="column">
        {this.renderPart(FlightTravelClass)}
        {this.renderPart(FlightAirline)}
        {this.renderPart(FlightNumber)}
        {this.renderPart(FlightTerminal)}
        {this.renderPart(FlightGate)}
      </GridContainer>
    </GridItem>
  );

  renderField = () => (
    <Section
      title={this.renderTitle()}
      ExpansionPanelProps={{ defaultExpanded: false }}
    >
      <GridContainer direction="column">
        <GridItem>
          <GridContainer>{this.renderPart(FlightTravelClass)}</GridContainer>
          <GridContainer>
            {this.renderPart(FlightAirline)}
            {this.renderPart(FlightNumber)}
          </GridContainer>
          <GridContainer>
            {this.renderPart(FlightTerminal)}
            {this.renderPart(FlightGate)}
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
        renderDefault={this.renderEditable}
        renderField={this.renderField}
      />
    );
  };
}

FlightDetails.propTypes = {
  // parent
  variant: PropTypes.string,
};

FlightDetails.defaultProps = {
  variant: null,
};

export default FlightDetails;
