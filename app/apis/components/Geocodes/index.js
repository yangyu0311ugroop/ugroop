import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';
import {
  GEOCODE_API,
  GET_PLACE_IDS,
  GET_LAT_LONG,
  GET_GEO_COUNTRY_CODE,
  GET_GEO_CURRENT_LOCATION,
} from 'apis/constants';
import { CONFIG } from './config';

export class Geocodes extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [GET_PLACE_IDS]: { onSuccess: this.props.resaga.setValue },
      [GET_LAT_LONG]: { onSuccess: this.props.resaga.setValue },
      [GET_GEO_COUNTRY_CODE]: { onSuccess: this.props.resaga.setValue },
      [GET_GEO_CURRENT_LOCATION]: { onSuccess: this.props.resaga.setValue },
    });

  shouldComponentUpdate = () => false;

  render = () => null;
}

Geocodes.propTypes = {
  resaga: PropTypes.object.isRequired,
};

export default compose(
  injectReducer({ key: GEOCODE_API, reducer: reducer(GEOCODE_API) }),
  resaga(CONFIG),
)(Geocodes);
