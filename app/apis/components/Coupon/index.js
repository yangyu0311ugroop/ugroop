import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { GET_COUPON, COUPON_API } from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class CouponAPI extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [GET_COUPON]: {
        onSuccess: this.getCustomerSuccess,
      },
    });
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

CouponAPI.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

CouponAPI.defaultProps = {};

export default compose(
  injectReducer({
    key: COUPON_API,
    reducer: reducer(COUPON_API),
  }),
  resaga(CONFIG),
)(CouponAPI);
