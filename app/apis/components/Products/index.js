import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { GET_PRODUCT_LIST, PRODUCT_API } from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class Products extends Component {
  componentDidMount = () => {
    this.props.resaga.dispatch({}, GET_PRODUCT_LIST);
  };

  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [GET_PRODUCT_LIST]: {
        onSuccess: this.getProductSuccess,
      },
    });
  };

  getProductSuccess = data => {
    this.props.resaga.setValue(data);
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

Products.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Products.defaultProps = {};

export default compose(
  injectReducer({
    key: PRODUCT_API,
    reducer: reducer(PRODUCT_API),
  }),
  resaga(CONFIG),
)(Products);
