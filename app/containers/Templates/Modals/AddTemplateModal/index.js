import { CREATE_NODE, NODE_API } from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import DialogFlow from './components/Wrapper';
import AddTemplateTitle from './components/Title';
import AddTemplateModalBody from './components/Body';
import { CONFIG } from './defines/config';

export class AddTemplateModalContainer extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    closeModal: PropTypes.func,
    organisationId: PropTypes.number,
    parentNodeId: PropTypes.number.isRequired,
    resaga: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    templateQueryParam: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    tourOwnerAbilities: PropTypes.array,
  };

  static defaultProps = {
    tourOwnerAbilities: [],
    templateQueryParam: {},
  };

  state = {
    isSaveDisabled: true,
    title: '',
    duration: 1,
    description: '',
    shortDescription: '',
    isDateValidText: '',
    isDateValid: null,
    date: null,
    day: 'none',
  };

  onCreateSuccess = ({ node }) => {
    const { tourOwnerAbilities, templateQueryParam } = this.props;

    if (!tourOwnerAbilities.length) {
      return false;
    }

    // add owner abilities to newly created `id`
    this.props.resaga.setValue({
      tours: DATASTORE_UTILS.upsertArray(`${node.id}`, tourOwnerAbilities),
      nodes: DATASTORE_UTILS.upsertArray(
        `${node.parentNodeId}.calculated.sortedIds`,
        node.id,
        {
          isAppendedFirst: true,
        },
      ),
      editable: true,
    });

    const browserHistory = this.props.history;
    return browserHistory.push(
      `${URL_HELPERS.tours(node.id)}?${templateQueryParam}`,
    );
  };

  onCreateError = err => {
    if (err.status === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED) {
      SnackbarHelper.openErrorSnackbar(
        'You are not authorized in doing the action',
        this.props.resaga,
      );
      this.onCloseModal();
    }
    this.setState({
      isSaveDisabled: false,
    });
  };

  onFormSubmit = () => {
    const { organisationId } = this.props;

    this.setState({
      isSaveDisabled: true,
    });
    const startDate = this.state.date;
    const weekDay = this.state.day === 'none' ? null : this.state.day;
    let displayDate = 'none';
    if (startDate !== null) {
      displayDate = 'startDate';
    } else if (weekDay !== null) {
      displayDate = 'weekDay';
    }

    const { parentNodeId } = this.props;
    const template = {
      content: this.state.title,
      customData: {
        displayDate,
        startDate,
        weekDay,
        description: this.state.description,
        shortDescription: this.state.shortDescription,
        duration: this.state.duration,
        organisationId,
      },
      parentNodeId,
      type: 'template',
    };

    this.props.resaga.dispatchTo(NODE_API, CREATE_NODE, {
      payload: {
        node: template,
        keyPath: `${this.props.parentNodeId}.children`,
      },
      onSuccess: this.onCreateSuccess,
      onError: this.onCreateError,
    });
  };

  onClearLine = () => {
    this.setState({
      date: null,
      day: 'none',
      isDateValidText: '',
      isDateValid: null,
    });
  };

  onDateChange = val => {
    val.utcOffset(0, true).startOf('d');
    this.setState({
      date: val.format(),
      day: val.day().toString(),
      isDateValid: true,
      isDateValidText: '',
    });
  };

  onDayChange = val => {
    this.setState({
      day: val.target.value,
      isDateValid: null,
      isDateValidText: '',
    });
  };

  onTitleChange = val => {
    this.setState(
      {
        title: val,
      },
      () => {
        this.onValidateInput();
      },
    );
  };

  onDurationChange = val => {
    const duration = parseInt(val, 10);
    if (!Number.isNaN(duration)) {
      this.setState(
        {
          duration,
        },
        () => {
          this.onValidateInput();
        },
      );
    } else {
      this.setState(
        {
          duration: null,
        },
        () => {
          this.onValidateInput();
        },
      );
    }
  };

  onDescriptionChange = (val, o) => {
    this.setState(
      {
        description: val,
        shortDescription: o.plainText,
      },
      () => {
        this.onValidateInput();
      },
    );
  };

  onValidateInput = () => {
    let flag = true;
    // List of values that are required.
    // If one in this values are not present,
    // save button will be disabled.
    const valueToValidate = {
      title: this.state.title,
      duration: this.state.duration,
    };
    const keys = Object.keys(valueToValidate);
    for (let i = 0; i < keys.length; i += 1) {
      if (!this.isValid(keys[i], valueToValidate[keys[i]])) {
        flag = false;
        break;
      }
    }
    // If all required inputs are present, isSaveDisabled = false
    // else disable save button
    if (flag) {
      this.setState({ isSaveDisabled: false });
    } else {
      this.setState({ isSaveDisabled: true });
    }
  };

  onCloseModal = () => {
    this.setState({
      title: '',
      duration: 1,
      description: '',
      isSaveDisabled: true,
    });
    this.props.closeModal();
  };

  isValid = (field, val) => {
    let flag;
    switch (field) {
      case 'title': {
        flag = !(val === '' || val === null);
        break;
      }
      case 'duration': {
        flag = !(val <= 0 || val > 50);
        break;
      }
      default:
        flag = true;
        break;
    }
    return flag;
  };

  // duration should be greater than 0
  durationValidator = (input, keyName, originalResult) => {
    if (keyName === 'duration') {
      return input > 1;
    }

    if (keyName === 'day') {
      return input !== 'none';
    }

    return originalResult;
  };

  render = () => {
    const { active } = this.props;

    const toBeValidated = {
      title: this.state.title,
      duration: this.state.duration,
      date: this.state.date,
      day: this.state.day,
    };

    return (
      <div>
        <DialogFlow
          isOpen={active}
          isFullWidth
          onClose={this.onCloseModal}
          actionBtnSize="small"
          onFormSubmit={this.onFormSubmit}
          onHookSingleValidation={this.durationValidator}
          checkAllInput={false}
          inputToBeValidated={toBeValidated}
          isSaveDisabled={this.state.isSaveDisabled}
        >
          <AddTemplateTitle />
          <AddTemplateModalBody
            onTitleChange={this.onTitleChange}
            onDescriptionChange={this.onDescriptionChange}
            onDurationChange={this.onDurationChange}
            onDateChange={this.onDateChange}
            onDayChange={this.onDayChange}
            dayVal={this.state.day}
            dateVal={this.state.date}
            onClearLine={this.onClearLine}
            isDateValid={this.state.isDateValid}
            dateValidationText={this.state.isDateValidText}
          />
        </DialogFlow>
      </div>
    );
  };
}

export default compose(
  withRouter,
  resaga(CONFIG),
)(AddTemplateModalContainer);
