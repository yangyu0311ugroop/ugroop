import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { EditableTextForm } from 'smartComponents/Editables';
import { Name } from 'smartComponents/Inputs';

import inputs from './inputs';
import { CONFIG } from './config';

export class MiddleName extends React.PureComponent {
  getEditableName = () =>
    PERSON_STORE_HELPERS.pathToPersonInputName(
      PERSON_PATHS.middleName,
      this.props,
    );

  stripOwnProps = () =>
    omit(this.props, [
      'resaga',
      'id',
      'variant',
      'middleName',
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

  renderTextField = () => (
    <Name
      value={this.props.middleName}
      {...inputs.textField}
      {...this.stripOwnProps()}
    />
  );

  renderEditable = () => {
    const { middleName, readOnly } = this.props;
    return (
      <EditableTextForm
        name={this.getEditableName()}
        value={middleName}
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
      [DEFAULT]: this.renderEditable,
    });
  };
}

MiddleName.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  middleName: PropTypes.string,
};

MiddleName.defaultProps = {
  id: null,
  variant: '',
  readOnly: false,

  middleName: '',
};

export default resaga(CONFIG)(MiddleName);
