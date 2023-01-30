/**
 * Created by paulcedrick on 7/11/17.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga, { reducer } from 'resaga';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { SNACKBAR_TYPE, UGSNACKBAR_DEFAULT_TIME } from './constants';
import Snackbar from './component/UGSnackBar';
import {
  CONFIG,
  SNACKBAR_VIEWSTORE,
  TEXT_STATE,
  OPEN_STATE,
  TYPE_STATE,
  INIT_STATE,
} from './config';

export class UGSnackbarContainer extends PureComponent {
  componentDidMount = () => {
    this.initStore();
  };

  initStore = () => {
    this.props.resaga.setValue(INIT_STATE);
  };

  handleClose = () => {
    this.initStore();
  };

  render = () => {
    const {
      [OPEN_STATE]: open,
      [TEXT_STATE]: text,
      [TYPE_STATE]: type,
    } = this.props;

    return (
      <Snackbar
        isRevealed={open}
        text={text}
        time={UGSNACKBAR_DEFAULT_TIME}
        type={type}
        onClose={this.handleClose}
      />
    );
  };
}

UGSnackbarContainer.propTypes = {
  resaga: PropTypes.object.isRequired,
  text: PropTypes.node,
  time: PropTypes.number,
  type: PropTypes.oneOf([
    SNACKBAR_TYPE.INFO,
    SNACKBAR_TYPE.SUCCESS,
    SNACKBAR_TYPE.CRITICAL,
  ]),
};

UGSnackbarContainer.defaultProps = {
  time: UGSNACKBAR_DEFAULT_TIME,
  type: SNACKBAR_TYPE.INFO,
  text: '',
};

export default compose(
  injectReducer({
    key: SNACKBAR_VIEWSTORE,
    reducer: reducer(SNACKBAR_VIEWSTORE),
  }),
  resaga(CONFIG),
)(UGSnackbarContainer);
