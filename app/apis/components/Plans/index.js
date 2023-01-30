import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { GET_PLAN_LIST, PLAN_API } from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class Plans extends Component {
  componentDidMount = () => {
    this.props.resaga.dispatch(
      {
        query: JSON.stringify({ limit: 50, active: true }),
      },
      GET_PLAN_LIST,
    );
  };

  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [GET_PLAN_LIST]: {
        onSuccess: this.getPlansSuccess,
      },
    });
  };

  getPlansSuccess = data => {
    this.props.resaga.setValue(data);
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

Plans.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Plans.defaultProps = {};

export default compose(
  injectReducer({
    key: PLAN_API,
    reducer: reducer(PLAN_API),
  }),
  resaga(CONFIG),
)(Plans);
