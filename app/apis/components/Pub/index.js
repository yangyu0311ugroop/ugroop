import {
  PUB_API,
  GET_PUB_TEMPLATE_TIMES,
  GET_PUB_TEMPLATE_EVENTS,
  GET_PUB_TEMPLATE_PEOPLE,
  GET_PUB_TEMPLATE_HEADER,
  GET_PUB_TEMPLATE_TAB,
  BATCH_GET_PUB_TEMPLATE_TAB,
  PUB_CREATE_INTEREST,
  GET_DETAILS,
} from 'apis/constants';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
// import { FormattedMessage as M } from 'react-intl';
import resaga, { reducer } from 'resaga';
import { SHOW_ERROR_IN_SNACKBAR } from 'error-messages';
// import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import injectReducer from 'utils/injectReducer';
import { NODE_API_UTILS } from 'apis/components/Node/utils';
import { TEMPLATE_API_EVENT_UTILS } from 'apis/components/Template/utils/events';

// import m from './messages';
import { CONFIG } from './config';

export class Pub extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [GET_PUB_TEMPLATE_TIMES]: {
        onSuccess: NODE_API_UTILS.upsertCalculatedTimes(this.props),
      },
      [GET_PUB_TEMPLATE_EVENTS]: {
        onSuccess: TEMPLATE_API_EVENT_UTILS.upsertEvents(this.props),
      },
      [GET_PUB_TEMPLATE_PEOPLE]: { onSuccess: this.props.resaga.setValue },
      [GET_PUB_TEMPLATE_HEADER]: { onSuccess: this.props.resaga.setValue },
      [GET_PUB_TEMPLATE_TAB]: { onSuccess: this.props.resaga.setValue },
      [BATCH_GET_PUB_TEMPLATE_TAB]: { onSuccess: this.props.resaga.setValue },
      [PUB_CREATE_INTEREST]: {
        onSuccess: this.props.resaga.setValue,
        onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
      },
      [GET_DETAILS]: { onSuccess: this.props.resaga.setValue },
    });

  shouldComponentUpdate = () => false;

  render = () => null;
}

Pub.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent

  // resaga value
};

Pub.defaultProps = {};

export default compose(
  injectReducer({ key: PUB_API, reducer: reducer(PUB_API) }),
  resaga(CONFIG),
)(Pub);
