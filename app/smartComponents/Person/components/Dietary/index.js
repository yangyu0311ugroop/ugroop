import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { EditableForm } from 'smartComponents/Editables';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { DietaryIcon } from 'viewComponents/People';
import DeleteButton from 'viewComponents/DeleteButton';
import { Description } from './parts';
import { CONFIG } from './config';

export class Dietary extends React.PureComponent {
  handleEditableSubmit = ({ model, ...rest }) => {
    const { id: dietaryId, personId } = this.props;
    PERSON_DETAIL_HELPER.patchDietary(
      {
        personId,
        dietaryId,
        ...model,
        ...rest,
      },
      this.props,
    );
  };

  handleEditableDeleteClick = ({ onLoad, onClose }) => {
    const { id: dietaryId, personId } = this.props;
    PERSON_DETAIL_HELPER.removeDietary(
      {
        personId,
        dietaryId,
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
      <GridItem>
        <DietaryIcon />
      </GridItem>
      <GridItem>{this.renderPart(Description, VARIANTS.TEXT_ONLY)}</GridItem>
    </GridContainer>
  );

  renderForm = () => this.renderPart(Description, VARIANTS.TEXT_FIELD);

  renderEditableFormActions = () => (
    <DeleteButton
      dialogTitle="Delete this Dietary Information"
      headlineText="Are you sure you want to delete this Dietary Information?"
      confirmButton="Delete Dietary Information"
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

Dietary.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  personId: PropTypes.number,
};

Dietary.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,

  personId: null,
};

export default resaga(CONFIG)(Dietary);
