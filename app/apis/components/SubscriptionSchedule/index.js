import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import {
  LIST_SUBSCRIPTION_SCHEDULE,
  UPDATE_SUBSCRIPTION_SCHEDULE,
  CREATE_SUBSCRIPTION_SCHEDULE,
  SUBSCRIPTION_SCHEDULE_API,
  RELEASE_SUBSCRIPTION_SCHEDULE,
} from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class SubscriptionScheduleAPI extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [LIST_SUBSCRIPTION_SCHEDULE]: {
        onSuccess: this.getListScheduleSuccess,
      },
      [CREATE_SUBSCRIPTION_SCHEDULE]: {},
      [UPDATE_SUBSCRIPTION_SCHEDULE]: {},
      [RELEASE_SUBSCRIPTION_SCHEDULE]: {
        onSuccess: this.releaseSubscriptionSchedule,
      },
    });
  };

  getListScheduleSuccess = data => {
    this.props.resaga.setValue(data);
  };

  releaseSubscriptionSchedule = data => {
    this.props.resaga.setValue(data);
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

SubscriptionScheduleAPI.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

SubscriptionScheduleAPI.defaultProps = {};

export default compose(
  injectReducer({
    key: SUBSCRIPTION_SCHEDULE_API,
    reducer: reducer(SUBSCRIPTION_SCHEDULE_API),
  }),
  resaga(CONFIG),
)(SubscriptionScheduleAPI);
