import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { SHOW_ERROR_IN_SNACKBAR } from 'error-messages';
import { PAYMENT_METHOD_API, UPDATE_PAYMENT_METHOD } from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class PaymentMethodAPI extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [UPDATE_PAYMENT_METHOD]: {
        onSuccess: this.props.resaga.setValue,
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
    });
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

PaymentMethodAPI.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

PaymentMethodAPI.defaultProps = {};

export default compose(
  injectReducer({
    key: PAYMENT_METHOD_API,
    reducer: reducer(PAYMENT_METHOD_API),
  }),
  resaga(CONFIG),
)(PaymentMethodAPI);
