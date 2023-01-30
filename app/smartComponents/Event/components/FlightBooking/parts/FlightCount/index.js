/**
 * Created by stephenkarpinskyj on 30/9/18.
 */

import GridContainer from 'components/GridContainer';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ugcomponents/Icon';
import { pluralizeText } from 'utils/stringAdditions';
import { THE_DOT } from 'appConstants';
import GridItem from 'components/GridItem';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { FlightIds } from 'smartComponents/Node/logics';

export class FlightBookingFlightCount extends React.PureComponent {
  renderFlightCount = flightIds => {
    const flightCount = flightIds.length;

    const suffix = pluralizeText('flight', flightCount, true);
    return <GridItem>{`${flightCount} ${suffix}`}</GridItem>;
  };

  renderLabelValue = () => {
    const { dataId } = this.props;
    return (
      <React.Fragment>
        <GridItem>{THE_DOT}</GridItem>
        <FlightIds flightBookingDataId={dataId}>
          {this.renderFlightCount}
        </FlightIds>
      </React.Fragment>
    );
  };

  renderFlightCountValueOnly = flightIds => {
    const flightCount = flightIds.length;

    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
          <GridItem>
            <Icon icon="ug-departure3" size="small" paddingRight />
          </GridItem>
          <GridItem>
            <JText dark>{flightCount}</JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderValueOnly = () => {
    const { dataId } = this.props;

    return (
      <React.Fragment>
        <FlightIds flightBookingDataId={dataId}>
          {this.renderFlightCountValueOnly}
        </FlightIds>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderLabelValue}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

FlightBookingFlightCount.propTypes = {
  // parent
  dataId: PropTypes.number,
  variant: PropTypes.string,
};

FlightBookingFlightCount.defaultProps = {
  dataId: 0,
  variant: null,
};

export default FlightBookingFlightCount;
