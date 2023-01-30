import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import IsDefault from 'smartComponents/Phone/parts/IsDefault';
import Number from 'smartComponents/Phone/parts/Number';
import CardPhone from 'ugcomponents/Card/PhoneCard';
import Form from 'ugcomponents/Form';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';

import { PHONE_TYPES } from 'smartComponents/Phone/constants';
import { CONFIG } from './config';
import styles from './styles';
import SelectField from '../../../Inputs/SelectField';

export const emptyFunction = () => {};
export class EditPhoneForm extends PureComponent {
  confirmTooltip = {
    title: 'Save',
    placement: 'top',
  };

  cancelTooltip = {
    title: 'Cancel',
    placement: 'top',
  };

  handleCreateForm = form => {
    this.props.phoneCUD.store(form, this.handleCreateSuccess);
  };

  handleCreateSuccess = () => {
    LOGIC_HELPERS.ifFunction(this.props.onCreateSuccess);
  };

  handleCancelCreate = () => {
    LOGIC_HELPERS.ifFunction(this.props.onCancelCreate);
  };

  handleEditForm = form => {
    this.props.phoneCUD.update(form, this.handleEditSuccess);
  };

  handleEditSuccess = () => {
    this.handleCloseEdit();
  };

  handleCloseEdit = () => {
    this.props.resaga.setValue({
      editable: false,
    });
  };

  renderEditActions = () => (
    <GridContainer spacing={1} alignItems="center">
      <GridItem>
        <Button
          tooltipProps={this.cancelTooltip}
          iconButton
          variant={VARIANTS.INLINE}
          icon="cross"
          size="extraSmall"
          color="gray"
          noMargin
          onClick={
            this.props.isCreateForm
              ? this.handleCancelCreate
              : this.handleCloseEdit
          }
        />
      </GridItem>
      <GridItem>
        <Button
          tooltipProps={this.confirmTooltip}
          type="submit"
          iconButton
          icon="check"
          size="extraSmall"
          noMargin
          color="primary"
        />
      </GridItem>
    </GridContainer>
  );

  renderInlineFieldsOnly = () => {
    const { smDown } = this.props;

    const options = [
      {
        value: PHONE_TYPES.mobile,
        children: 'Mobile',
      },
      {
        value: PHONE_TYPES.landline,
        children: 'Landline',
      },
    ];

    const smProps = LOGIC_HELPERS.ifElse(smDown, { xs: 12 }, { xs: true });

    return (
      <GridContainer alignItems="center">
        <GridItem>
          <IsDefault id={this.props.id} variant={VARIANTS.CHECKBOX_FIELD} />
        </GridItem>
        <GridItem>
          <SelectField
            name="type"
            value={PHONE_TYPES.mobile}
            options={options}
          />
        </GridItem>
        <GridItem {...smProps}>
          <Number id={this.props.id} variant={VARIANTS.TEXT_FIELD} />
        </GridItem>
        <GridItem>{this.renderEditActions()}</GridItem>
      </GridContainer>
    );
  };

  renderInlineCardForm = () => (
    <Form
      onValidSubmit={LOGIC_HELPERS.ifElse(
        this.props.isCreateForm,
        this.handleCreateForm,
        this.handleEditForm,
      )}
    >
      <CardPhone form={this.renderInlineFieldsOnly()} isForm />
    </Form>
  );

  renderDefault = () => this.renderInlineFieldsOnly();

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.CARD_FORM]: this.renderInlineCardForm,
      [VARIANTS.FIELDS_ONLY]: this.renderInlineFieldsOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

EditPhoneForm.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  isCreateForm: PropTypes.bool,
  phoneCUD: PropTypes.object,
  onCreateSuccess: PropTypes.func,
  onCancelCreate: PropTypes.func,

  // resaga props
};

EditPhoneForm.defaultProps = {
  id: 0,
  isCreateForm: false,
  phoneCUD: {
    store: emptyFunction,
    update: emptyFunction,
    destroy: emptyFunction,
  },
  onCreateSuccess: null,
  onCancelCreate: null,
};

export default compose(
  withStyles(styles, { name: 'EditPhoneForm' }),
  resaga(CONFIG),
  withSMDown,
)(EditPhoneForm);
