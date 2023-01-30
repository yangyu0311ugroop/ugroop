import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { GET_CUSTOMER, UPDATE_CUSTOMER, CUSTOMER_API } from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class CustomerAPI extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [GET_CUSTOMER]: {
        onSuccess: this.getCustomerSuccess,
      },
      [UPDATE_CUSTOMER]: {
        onSuccess: this.updateCustomerSuccess,
      },
    });
  };

  getCustomerSuccess = data => {
    this.props.resaga.setValue(data);
  };

  updateCustomerSuccess = data => {
    this.props.resaga.setValue(data);
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

CustomerAPI.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

CustomerAPI.defaultProps = {};

export default compose(
  injectReducer({
    key: CUSTOMER_API,
    reducer: reducer(CUSTOMER_API),
  }),
  resaga(CONFIG),
)(CustomerAPI);
