import {
  ADD_PHONE,
  PATCH_PHONE,
  PERSON_DETAIL_API,
  REMOVE_PHONE,
} from 'apis/constants';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';

import { CONFIG } from './config';

export class PhoneCUD extends PureComponent {
  handleUpdateSuccess = onSuccess => () => {
    SnackbarHelpers.openSuccessSnackbar(
      'Successfully updated the contact',
      this.props.resaga,
    );
    LOGIC_HELPERS.ifFunction(onSuccess);
  };

  handleStoreSuccess = onSuccess => () => {
    SnackbarHelpers.openSuccessSnackbar(
      'Successfully created a contact',
      this.props.resaga,
    );
    LOGIC_HELPERS.ifFunction(onSuccess);
  };

  handleDestroySuccess = onSuccess => () => {
    SnackbarHelpers.openSuccessSnackbar(
      'Successfully deleted contact',
      this.props.resaga,
    );
    LOGIC_HELPERS.ifFunction(onSuccess);
  };

  /**
   * This is just for the meantime. This is to be refactored or replaced.
   */
  genericHandlerError = () => {
    SnackbarHelpers.openErrorSnackbar(
      'Something goes wrong doing the action, please try again',
      this.props.resaga,
    );
  };

  handleUpdateAndCreate = ({ response }) => {
    const message = response.error.message;
    SnackbarHelpers.openErrorSnackbar(message, this.props.resaga);
  };

  update = (form, onSuccess) => {
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PHONE, {
      payload: {
        data: form,
        userId: this.props.userId,
        phoneId: this.props.phoneId,
      },
      onSuccess: this.handleUpdateSuccess(onSuccess),
      onError: this.handleUpdateAndCreate,
    });
  };

  store = (form, onSuccess) => {
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, ADD_PHONE, {
      payload: {
        data: form,
        userId: this.props.userId,
        phoneId: this.props.phoneId,
      },
      onSuccess: this.handleStoreSuccess(onSuccess),
      onError: this.handleUpdateAndCreate,
    });
  };

  destroy = onSuccess => {
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, REMOVE_PHONE, {
      payload: {
        phoneId: this.props.phoneId,
        userId: this.props.userId,
      },
      onSuccess: this.handleDestroySuccess(onSuccess),
      onError: this.genericHandlerError,
    });
  };

  render = () => {
    const { children } = this.props;

    return LOGIC_HELPERS.ifFunction(children, [
      {
        update: this.update,
        store: this.store,
        destroy: this.destroy,
      },
    ]);
  };
}

PhoneCUD.propTypes = {
  // PhoneCUD props
  resaga: PropTypes.object.isRequired,

  // parent props
  userId: PropTypes.number,
  phoneId: PropTypes.number,
  children: PropTypes.func,

  // resaga props
};

PhoneCUD.defaultProps = {
  userId: 0,
  phoneId: 0,
  children: null,
};

export default compose(resaga(CONFIG))(PhoneCUD);
