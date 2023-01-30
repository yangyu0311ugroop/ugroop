import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { EditableForm } from 'smartComponents/Editables';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import DeleteButton from 'viewComponents/DeleteButton';
import { Severity, Description, Action } from './parts';
import { CONFIG } from './config';
import m from './messages';

export class Medical extends React.PureComponent {
  handleEditableSubmit = ({ model, ...rest }) => {
    const { id: medicalId, personId } = this.props;
    PERSON_DETAIL_HELPER.patchMedical(
      {
        personId,
        medicalId,
        ...model,
        ...rest,
      },
      this.props,
    );
  };

  handleEditableDeleteClick = ({ onLoad, onClose }) => {
    const { id: medicalId, personId } = this.props;
    PERSON_DETAIL_HELPER.removeMedical(
      {
        personId,
        medicalId,
        onSuccess: this.handleEditableDeleteSuccess({
          onLoad,
          onClose,
        }),
        onError: this.handleEditableDeleteError({ onLoad }),
      },
      this.props,
    );
  };

  handleEditableDeleteSuccess = ({ onLoad, onClose }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
    LOGIC_HELPERS.ifFunction(onClose);
  };

  handleEditableDeleteError = ({ onLoad }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
  };

  renderPart = (Component, variant) => (
    <Component {...this.props} variant={variant} />
  );

  renderTextOnly = () => (
    <GridContainer wrap="nowrap" alignItems="baseline">
      <GridItem>{this.renderPart(Severity, VARIANTS.ICON)}</GridItem>
      <GridItem>
        <M
          {...m.textOnly}
          values={{
            description: this.renderPart(Description, VARIANTS.TEXT_ONLY),
            action: this.renderPart(Action, VARIANTS.TEXT_ONLY),
          }}
        />
      </GridItem>
    </GridContainer>
  );

  renderForm = () => (
    <GridContainer direction="column">
      <GridItem>{this.renderPart(Description, VARIANTS.TEXT_FIELD)}</GridItem>
      <GridItem>{this.renderPart(Action, VARIANTS.TEXT_FIELD)}</GridItem>
      <GridItem>{this.renderPart(Severity, VARIANTS.TEXT_FIELD)}</GridItem>
    </GridContainer>
  );

  renderEditableFormActions = () => (
    <DeleteButton
      dialogTitle="Delete this Medical Information"
      headlineText="Are you sure you want to delete this Medical Information?"
      confirmButton="Delete Medical Information"
      onClick={this.handleEditableDeleteClick}
    />
  );

  renderEditable = () => {
    const { id, readOnly } = this.props;
    return (
      <EditableForm
        isRow
        value={id}
        renderValue={this.renderTextOnly}
        renderSecondaryFormActions={this.renderEditableFormActions}
        onSubmit={this.handleEditableSubmit}
        readOnly={readOnly}
      >
        {this.renderForm()}
      </EditableForm>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.FORM]: this.renderForm,
      [DEFAULT]: this.renderEditable,
    });
  };
}

Medical.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  personId: PropTypes.number,
};

Medical.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,

  personId: null,
};

export default resaga(CONFIG)(Medical);
