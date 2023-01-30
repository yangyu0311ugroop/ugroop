import { GET_UGROOP_NOTIFICATION, NOTIFICATION_API } from 'apis/constants';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class Notification extends Component {
  componentDidMount() {
    this.props.resaga.dispatchTo(NOTIFICATION_API, GET_UGROOP_NOTIFICATION, {});
  }

  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [GET_UGROOP_NOTIFICATION]: {
        onSuccess: this.notificationReceivedSuccess,
      },
    });

  shouldComponentUpdate = () => false;

  notificationReceivedSuccess = processedResult => {
    this.props.resaga.setValue(processedResult);
  };

  render = () => false;
}

Notification.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Notification.defaultProps = {};

export default compose(
  injectReducer({ key: NOTIFICATION_API, reducer: reducer(NOTIFICATION_API) }),
  resaga(CONFIG),
)(Notification);
