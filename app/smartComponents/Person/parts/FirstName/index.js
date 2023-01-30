import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { EditableTextForm } from 'smartComponents/Editables';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import omit from 'lodash/omit';
import { VARIANTS } from 'variantsConstants';
import { FIRST_NAME } from 'containers/Authentication/Register/defines/registerInputs';

import inputs from './inputs';
import { CONFIG } from './config';
import styles from './styles';

export class FirstName extends PureComponent {
  getEditableName = () =>
    PERSON_STORE_HELPERS.pathToPersonInputName(
      PERSON_PATHS.firstName,
      this.props,
    );

  stripOwnProps = () =>
    omit(this.props, [
      'resaga',
      'id',
      'variant',
      'firstName',
      'classes',
      'dataStore',
      'variant',
    ]);

  handleEditableSubmit = ({ model, onSuccess, onError }) => {
    const { id } = this.props;
    PERSON_DETAIL_HELPER.updatePerson(
      {
        personId: id,
        ...model,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { firstName } = this.props;
    return <span>{firstName}</span>;
  };

  renderTextField = () => (
    <TextField
      {...FIRST_NAME}
      value={this.props.firstName}
      {...this.stripOwnProps()}
    />
  );

  renderEditable = () => {
    const { firstName, readOnly } = this.props;
    return (
      <EditableTextForm
        name={this.getEditableName()}
        value={firstName}
        {...inputs.editable}
        onSubmit={this.handleEditableSubmit}
        readOnly={readOnly}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [DEFAULT]: this.renderDefault,
    });
  };
}

FirstName.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga props
  firstName: PropTypes.string,
};

FirstName.defaultProps = {
  id: null,
  variant: '',
  readOnly: false,

  firstName: '',
};

export default compose(
  withStyles(styles, { name: 'FirstName' }),
  resaga(CONFIG),
)(FirstName);
