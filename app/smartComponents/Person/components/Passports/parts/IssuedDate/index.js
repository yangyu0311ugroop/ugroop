import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { EditableDateForm } from 'smartComponents/Editables';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Date } from 'smartComponents/Inputs';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { VARIANTS } from 'variantsConstants';

import { CONFIG } from './config';
import styles from './styles';

const label = 'Date of Issue';
export class IssuedDate extends PureComponent {
  getOnSubmit = () => {
    const { onSubmit } = this.props;
    return LOGIC_HELPERS.ifElse(
      onSubmit,
      onSubmit,
      PERSON_DETAIL_HELPER.updatePassport(this.props),
    );
  };

  handleChange = value =>
    LOGIC_HELPERS.ifFunction(this.props.onChange, [value]);

  renderDefault = () => this.renderTextWithLabel();

  renderTextOnly = () => {
    const { issuedDate } = this.props;
    return <span>{issuedDate}</span>;
  };

  renderTextWithLabel = () => {
    const { readOnly, issuedDate } = this.props;
    return (
      <EditableDateForm
        name={USER_PASSPORTS_FIELDS.issuedDate}
        label={label}
        value={issuedDate}
        readOnly={readOnly}
        placeholder="Click to specify date of issue"
        readOnlyPlaceholder="No date of issue"
        onChange={this.handleChange}
        onSubmit={this.getOnSubmit()}
        maxDate={MOMENT_HELPERS.createUtc()}
      />
    );
  };

  renderTextField = () => (
    <Date
      name={USER_PASSPORTS_FIELDS.issuedDate}
      label={label}
      value={this.props.issuedDate}
      onChange={this.handleChange}
      maxDate={MOMENT_HELPERS.createUtc()}
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

IssuedDate.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,

  // resaga props
  issuedDate: PropTypes.string,
};

IssuedDate.defaultProps = {
  variant: '',
  readOnly: false,

  issuedDate: null,
};

export default compose(
  withStyles(styles, { name: 'IssuedDate' }),
  resaga(CONFIG),
)(IssuedDate);
