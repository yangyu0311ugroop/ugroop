import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import {
  CARDS_API,
  GET_CUSTOMER_CARDS,
  CREATE_CUSTOMER_CARD,
  DELETE_CUSTOMER_CARD,
  UPDATE_CUSTOMER_CARD,
} from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class CardsAPI extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [GET_CUSTOMER_CARDS]: { onSuccess: this.props.resaga.setValue },
      [CREATE_CUSTOMER_CARD]: { onSuccess: this.props.resaga.setValue },
      [DELETE_CUSTOMER_CARD]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_CUSTOMER_CARD]: { onSuccess: this.props.resaga.setValue },
    });
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

CardsAPI.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

CardsAPI.defaultProps = {};

export default compose(
  injectReducer({
    key: CARDS_API,
    reducer: reducer(CARDS_API),
  }),
  resaga(CONFIG),
)(CardsAPI);
