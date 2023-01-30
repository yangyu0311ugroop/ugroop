import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import {
  CREATE_SUBSCRIPTION_FIRSTTIME,
  GET_CUSTOMER_SUBSCRIPTION,
  SUBSCRIPTION_API,
  UPDATE_SUBSCRIPTION,
} from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class SubscriptionAPI extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [CREATE_SUBSCRIPTION_FIRSTTIME]: {
        onSuccess: this.createSubscriptionSuccess,
      },
      [GET_CUSTOMER_SUBSCRIPTION]: {
        onSuccess: this.getCustomerSubscriptionSuccess,
      },
      [UPDATE_SUBSCRIPTION]: {
        onSuccess: this.updateSubscriptionSuccess,
      },
    });
  };

  createSubscriptionSuccess = data => {
    this.props.resaga.setValue(data);
  };

  updateSubscriptionSuccess = data => {
    this.props.resaga.setValue(data);
  };

  getCustomerSubscriptionSuccess = data => {
    this.props.resaga.setValue(data);
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

SubscriptionAPI.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

SubscriptionAPI.defaultProps = {};

export default compose(
  injectReducer({
    key: SUBSCRIPTION_API,
    reducer: reducer(SUBSCRIPTION_API),
  }),
  resaga(CONFIG),
)(SubscriptionAPI);
