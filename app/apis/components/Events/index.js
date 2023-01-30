import { EVENTS_API, GET_EVENTS_BY_ID } from 'apis/constants';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';

import { CONFIG } from './config';

export class EventsApi extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [GET_EVENTS_BY_ID]: {
        onSuccess: this.props.resaga.setValue,
      },
    });

  shouldComponentUpdate = () => false;

  render = () => null;
}

EventsApi.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

EventsApi.defaultProps = {};

export default compose(
  injectReducer({
    key: EVENTS_API,
    reducer: reducer(EVENTS_API),
  }),
  resaga(CONFIG),
)(EventsApi);
