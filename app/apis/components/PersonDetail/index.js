import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import {
  PERSON_DETAIL_API,
  CREATE_PERSON_FACADE,
  GET_PERSON_DETAIL,
  PATCH_PERSON_FACADE,
  UPDATE_PERSON,
  REMOVE_PHONE,
  ADD_PHONE,
  PATCH_PHONE,
  REMOVE_PASSPORT,
  ADD_PASSPORT,
  PATCH_PASSPORT,
  GET_PASSPORTS_FACADE,
  REMOVE_PASSPORT_FACADE,
  CREATE_PASSPORT_FACADE,
  PATCH_PASSPORT_FACADE,
  ADD_MEDICAL,
  PATCH_MEDICAL,
  REMOVE_MEDICAL,
  ADD_DIETARY,
  PATCH_DIETARY,
  REMOVE_DIETARY,
  ADD_STUDENT_DETAIL,
  PATCH_STUDENT_DETAIL,
  REMOVE_STUDENT_DETAIL,
  ADD_INSURANCE_POLICY,
  PATCH_INSURANCE_POLICY,
  REMOVE_INSURANCE_POLICY,
} from 'apis/constants';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class PersonDetail extends Component {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [CREATE_PERSON_FACADE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [GET_PERSON_DETAIL]: {
        onSuccess: this.props.resaga.setValue,
      },
      [PATCH_PERSON_FACADE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [UPDATE_PERSON]: {
        onSuccess: this.props.resaga.setValue,
      },
      [REMOVE_PHONE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [ADD_PHONE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [PATCH_PHONE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [REMOVE_PASSPORT]: {
        onSuccess: this.props.resaga.setValue,
      },
      [ADD_PASSPORT]: {
        onSuccess: this.props.resaga.setValue,
      },
      [PATCH_PASSPORT]: {
        onSuccess: this.props.resaga.setValue,
      },
      [GET_PASSPORTS_FACADE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [REMOVE_PASSPORT_FACADE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [CREATE_PASSPORT_FACADE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [PATCH_PASSPORT_FACADE]: {
        onSuccess: this.props.resaga.setValue,
      },
      [ADD_MEDICAL]: {
        onSuccess: this.props.resaga.setValue,
      },
      [PATCH_MEDICAL]: {
        onSuccess: this.props.resaga.setValue,
      },
      [REMOVE_MEDICAL]: {
        onSuccess: this.props.resaga.setValue,
      },
      [ADD_DIETARY]: {
        onSuccess: this.props.resaga.setValue,
      },
      [PATCH_DIETARY]: {
        onSuccess: this.props.resaga.setValue,
      },
      [REMOVE_DIETARY]: {
        onSuccess: this.props.resaga.setValue,
      },
      [ADD_STUDENT_DETAIL]: {
        onSuccess: this.props.resaga.setValue,
      },
      [PATCH_STUDENT_DETAIL]: {
        onSuccess: this.props.resaga.setValue,
      },
      [REMOVE_STUDENT_DETAIL]: {
        onSuccess: this.props.resaga.setValue,
      },
      [ADD_INSURANCE_POLICY]: {
        onSuccess: this.props.resaga.setValue,
      },
      [PATCH_INSURANCE_POLICY]: {
        onSuccess: this.props.resaga.setValue,
      },
      [REMOVE_INSURANCE_POLICY]: {
        onSuccess: this.props.resaga.setValue,
      },
    });
  };

  shouldComponentUpdate = () => false;

  render = () => null;
}

PersonDetail.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

PersonDetail.defaultProps = {};

export default compose(
  injectReducer({
    key: PERSON_DETAIL_API,
    reducer: reducer(PERSON_DETAIL_API),
  }),
  resaga(CONFIG),
)(PersonDetail);
