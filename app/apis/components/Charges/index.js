import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { CHARGES_API, GET_CUSTOMER_CHARGES } from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class ChargesAPI extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [GET_CUSTOMER_CHARGES]: { onSuccess: this.props.resaga.setValue },
    });
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

ChargesAPI.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

ChargesAPI.defaultProps = {};

export default compose(
  injectReducer({
    key: CHARGES_API,
    reducer: reducer(CHARGES_API),
  }),
  resaga(CONFIG),
)(ChargesAPI);
