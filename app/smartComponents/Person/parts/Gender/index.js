import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import omit from 'lodash/omit';
import { withStyles } from '@material-ui/core/styles';
import dotProp from 'dot-prop-immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { EditableSelectForm } from 'smartComponents/Editables';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import RadioGroup from 'ugcomponents/Inputs/ValidationRadioGroup';
import P from 'viewComponents/Typography';

import { PERSON_GENDER_FORM_NAME, GENDER_OPTIONS } from './constants';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class Gender extends PureComponent {
  getEditableName = () =>
    PERSON_STORE_HELPERS.pathToPersonInputName(PERSON_PATHS.gender, this.props);

  getFormValue = () => {
    const { gender } = this.props;
    return gender || 'unknown';
  };

  getEditableValue = () => {
    const { gender } = this.props;
    return gender || '';
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'gender', 'id', 'classes']);

  handleEditableSubmit = ({ model, onSuccess, onError }) => {
    const { id } = this.props;

    const value = dotProp.get(model, this.getEditableName(), null);
    const newModel = !value
      ? dotProp.set(model, this.getEditableName(), null)
      : model;

    PERSON_DETAIL_HELPER.updatePerson(
      {
        personId: id,
        ...newModel,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  renderLabel = () =>
    !this.props.hideLabel && this.props.intl.formatMessage(m.label);

  renderEditableOptions = () => {
    const { extraOptions } = this.props;
    return [
      ...extraOptions,
      ...Object.entries(GENDER_OPTIONS).map(([value, children]) => ({
        value,
        children,
      })),
    ];
  };

  renderEditableValue = value => {
    const { renderEditableValue } = this.props;
    if (renderEditableValue) {
      return renderEditableValue(value);
    }
    return GENDER_OPTIONS[value];
  };

  renderDefault = () => this.renderTextOnly();

  renderRadioField = () => (
    <RadioGroup
      name={PERSON_GENDER_FORM_NAME}
      value={this.getFormValue()}
      options={GENDER_OPTIONS}
      label={this.renderLabel()}
      noMargin
      className={this.props.classes.radioGroup}
      formLabelClassName={this.props.classes.formLabel}
      {...this.getStrippedOwnProps()}
    />
  );

  renderTextOnly = () => (
    <P {...this.getStrippedOwnProps()}>{this.props.gender}</P>
  );

  renderEditable = () => {
    const { readOnly, placeholder } = this.props;
    return (
      <EditableSelectForm
        value={this.getEditableValue()}
        name={this.getEditableName()}
        label={this.renderLabel()}
        renderValue={this.renderEditableValue}
        placeholder={placeholder}
        options={this.renderEditableOptions()}
        onSubmit={this.handleEditableSubmit}
        readOnly={readOnly}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.RADIO_FIELD]: this.renderRadioField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [DEFAULT]: this.renderDefault(),
    });
  };
}

Gender.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  hideLabel: PropTypes.bool,
  extraOptions: PropTypes.array,
  renderEditableValue: PropTypes.func,
  placeholder: PropTypes.string,

  // resaga props
  gender: PropTypes.string,
};

Gender.defaultProps = {
  id: null,
  variant: VARIANTS.TEXT_ONLY,
  readOnly: false,
  extraOptions: [],
  renderEditableValue: null,
  placeholder: 'Click to specify gender',

  gender: null,
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Gender' }),
  resaga(CONFIG),
)(Gender);
