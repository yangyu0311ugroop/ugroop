import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { VARIANTS } from 'variantsConstants';
import InlineTextForm from 'smartComponents/Editables/TextForm';

import { CONFIG } from './config';
import styles from './styles';

const label = 'ID Card Number';
export class CardNumber extends PureComponent {
  getOnSubmit = () => {
    const { onSubmit } = this.props;
    return LOGIC_HELPERS.ifElse(
      onSubmit,
      onSubmit,
      PERSON_DETAIL_HELPER.updatePassport(this.props),
    );
  };

  renderDefault = () => this.renderTextWithLabel();

  renderTextOnly = () => {
    const { cardNumber } = this.props;
    return <span>{cardNumber}</span>;
  };

  renderTextWithLabel = () => {
    const { readOnly, cardNumber } = this.props;
    return (
      <InlineTextForm
        label={label}
        value={cardNumber}
        readOnly={readOnly}
        placeholder="Click to specify ID card number"
        readOnlyPlaceholder="No ID card number"
        onSubmit={this.getOnSubmit()}
        name={USER_PASSPORTS_FIELDS.cardNumber}
        TextProps={{
          helperText: 'If applicable on your passport',
        }}
      />
    );
  };

  renderTextField = () => (
    <TextField
      value={this.props.cardNumber}
      name={USER_PASSPORTS_FIELDS.cardNumber}
      type="text"
      label={label}
      helperText="If applicable on your passport"
    />
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_WITH_LABEL]: this.renderTextWithLabel,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

CardNumber.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,

  // resaga props
  cardNumber: PropTypes.string,
};

CardNumber.defaultProps = {
  variant: '',
  readOnly: false,

  cardNumber: '',
};

export default compose(
  withStyles(styles, { name: 'CardNumber' }),
  resaga(CONFIG),
)(CardNumber);
