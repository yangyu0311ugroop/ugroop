import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import FlightMap from './components/FlightMap';
import SinglePlaceMap from './components/SinglePlaceMap';
import TransportationMap from './components/TransportationMap';

export class MapCard extends PureComponent {
  renderFlightMap = () => {
    const { event } = this.props;

    const start = EVENT_VIEW_HELPERS.airportStart(event);
    const end = EVENT_VIEW_HELPERS.airportEnd(event);

    return <FlightMap key={`${start}___${end}`} {...this.props} />;
  };

  renderTransportationMap = () => {
    const { event } = this.props;

    const start = EVENT_VIEW_HELPERS.placeIdStart(event);
    const end = EVENT_VIEW_HELPERS.placeIdEnd(event);
    const subtype = EVENT_VIEW_HELPERS.subtype(event);

    return (
      <TransportationMap
        key={`${start}___${end}__${subtype}`}
        {...this.props}
      />
    );
  };

  renderDefault = () => <SinglePlaceMap {...this.props} />;

  renderMap = () => {
    const { event } = this.props;

    if (EVENT_VIEW_HELPERS.isFlight(event)) {
      return this.renderFlightMap();
    }

    if (EVENT_VIEW_HELPERS.isTransportation(event)) {
      return this.renderTransportationMap();
    }

    return this.renderDefault();
  };

  render = () => {
    const { renderEmpty } = this.props;

    const rendered = this.renderMap();

    if (!rendered) {
      return LOGIC_HELPERS.ifFunction(renderEmpty, [], null);
    }

    return rendered;
  };
}

MapCard.propTypes = {
  // hoc props

  // parent props
  event: PropTypes.object.isRequired,
  renderEmpty: PropTypes.func,

  // resaga props
};

MapCard.defaultProps = {};

export default compose()(MapCard);
