import {
  REMOVE_PASSPORT_FACADE,
  CREATE_PASSPORT_FACADE,
  PATCH_PASSPORT_FACADE,
  PERSON_DETAIL_API,
} from 'apis/constants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { PASSPORT_UTILS } from 'smartComponents/Person/components/Passports/utils';
import Dialog from 'ugcomponents/Dialog';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import has from 'lodash/has';
import omit from 'lodash/omit';
import { CONFIG } from './config';

export class PassportCUD extends PureComponent {
  state = {
    showDialog: false,
  };

  setIsPrimary = (value, opts = {}) => () => {
    const data = {
      isDefault: value,
    };
    this.update(opts)(data, true);
  };

  validateData = data => {
    let formData = data;
    if (has(data, 'passportOtherType')) {
      formData.passportType = data.passportOtherType;
      formData = omit(formData, ['passportOtherType']);
    }
    if (has(data, 'birthDate')) {
      formData.birthDate = isEmptyString(data.birthDate)
        ? null
        : data.birthDate;
    }
    if (has(data, 'issuedDate')) {
      formData.issuedDate = isEmptyString(data.issuedDate)
        ? null
        : data.issuedDate;
    }
    if (has(data, 'expireDate')) {
      formData.expireDate = isEmptyString(data.expireDate)
        ? null
        : data.expireDate;
    }
    return formData;
  };

  genericError = () => {
    SnackbarHelper.openErrorSnackbar(
      'Something went wrong. Please try again or contact us if still persist.',
      this.props.resaga,
    );
  };

  store = (opts = {}) => data => {
    const formData = PASSPORT_UTILS.validateData(data);
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, CREATE_PASSPORT_FACADE, {
      payload: {
        data: formData,
        userId: this.props.userId,
        rawData: data,
      },
      onSuccess: this.createSuccess(opts.onSuccess),
      onError: this.genericError,
    });
  };

  destroy = () => {
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, REMOVE_PASSPORT_FACADE, {
      payload: {
        userId: this.props.userId,
        passportId: this.props.id,
      },
      onSuccess: this.destroySuccess,
      onError: this.genericError,
    });
  };

  update = (opts = {}) => (data, isChanged) => {
    if (isChanged) {
      const formData = this.validateData(data);
      this.props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PASSPORT_FACADE, {
        payload: {
          userId: this.props.userId,
          passportId: this.props.id,
          data: formData,
          rawData: data,
        },
        onSuccess: this.updateSuccess(opts.onSuccess),
        onError: this.genericError,
      });
    }
  };

  destroySuccess = () => {
    SnackbarHelper.openSuccessSnackbar(
      'Successfully deleted a passport',
      this.props.resaga,
    );
  };

  createSuccess = hook => () => {
    SnackbarHelper.openSuccessSnackbar(
      'Successfully added a passport',
      this.props.resaga,
    );
    LOGIC_HELPERS.ifFunction(hook);
  };

  updateSuccess = hook => () => {
    SnackbarHelper.openSuccessSnackbar(
      'Successfully updated a passport',
      this.props.resaga,
    );
    LOGIC_HELPERS.ifFunction(hook);
    this.closeEditMode();
  };

  confirmDelete = () =>
    this.setState({
      showDialog: true,
    });

  closeDialog = () =>
    this.setState({
      showDialog: false,
    });

  openEdit = () =>
    this.props.resaga.setValue({
      editable: true,
    });

  closeEditMode = () =>
    this.props.resaga.setValue({
      editable: false,
    });

  render = () => (
    <React.Fragment>
      {this.props.children({
        store: this.store,
        destroy: this.confirmDelete,
        update: this.update,
        openEdit: this.openEdit,
        closeEdit: this.closeEditMode,
        setIsPrimary: this.setIsPrimary,
      })}
      <Dialog
        type="passport"
        headlineTitle={this.props.passportNumber}
        open={this.state.showDialog}
        template="delete"
        confirmFunc={this.destroy}
        cancelFunc={this.closeDialog}
      />
    </React.Fragment>
  );
}

PassportCUD.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.func.isRequired,
  id: PropTypes.number,
  userId: PropTypes.number,

  // resaga props
  passportNumber: PropTypes.string,
};

PassportCUD.defaultProps = {
  id: 0,
  userId: 0,
  passportNumber: '',
};

export default compose(resaga(CONFIG))(PassportCUD);
