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
import { LAST_NAME } from 'containers/Authentication/Register/defines/registerInputs';

import inputs from './inputs';
import { CONFIG } from './config';
import styles from './styles';

export class LastName extends PureComponent {
  getEditableName = () =>
    PERSON_STORE_HELPERS.pathToPersonInputName(
      PERSON_PATHS.lastName,
      this.props,
    );

  stripOwnProps = () =>
    omit(this.props, [
      'resaga',
      'id',
      'variant',
      'lastName',
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
    const { lastName } = this.props;
    return <span>{lastName}</span>;
  };

  renderTextField = () => (
    <TextField
      {...LAST_NAME}
      value={this.props.lastName}
      {...this.stripOwnProps()}
    />
  );

  renderEditable = () => {
    const { lastName, readOnly } = this.props;
    return (
      <EditableTextForm
        name={this.getEditableName()}
        value={lastName}
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

LastName.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga props
  lastName: PropTypes.string,
};

LastName.defaultProps = {
  id: null,
  variant: '',
  readOnly: false,

  lastName: '',
};

export default compose(
  withStyles(styles, { name: 'LastName' }),
  resaga(CONFIG),
)(LastName);
