import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { Date } from 'smartComponents/Inputs';
import { VARIANTS } from 'variantsConstants';
import omit from 'lodash/omit';
import { EditableDateForm } from 'smartComponents/Editables';

import { CONFIG } from './config';
import styles from './styles';

const label = 'Date of Birth';
export class BirthDate extends PureComponent {
  stripOwnProps = () =>
    omit(this.props, ['variant', 'classes', 'birthDate', 'id', 'userId']);

  renderDefault = () => this.renderTextWithLabel();

  renderTextOnly = () => {
    const { birthDate } = this.props;
    return <span>{MOMENT_HELPERS.renderDate(birthDate)}</span>;
  };

  renderValue = () => {
    const { birthDate } = this.props;
    return `${MOMENT_HELPERS.renderDate(birthDate)} (${MOMENT_HELPERS.renderAge(
      birthDate,
    )})`;
  };

  renderTextWithLabel = () => (
    <EditableDateForm
      name={USER_FIELDS.birthDate}
      label={label}
      value={this.props.birthDate}
      renderValue={this.renderValue}
      placeholder="Click to specify date of birth"
      onSubmit={PERSON_DETAIL_HELPER.updatePassport(this.props, {
        passportIdKey: 'passportId',
        userIdKey: 'id',
      })}
      maxDate={MOMENT_HELPERS.getDateLastYear()}
      initialFocusedDate={MOMENT_HELPERS.getDateMiddleLastYear()}
    />
  );

  renderTextField = () => (
    <Date
      name={USER_FIELDS.birthDate}
      label={label}
      value={this.props.birthDate}
      maxDate={MOMENT_HELPERS.getDateLastYear()}
      initialFocusedDate={MOMENT_HELPERS.getDateMiddleLastYear()}
      {...this.stripOwnProps()}
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

BirthDate.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  birthDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

BirthDate.defaultProps = {
  birthDate: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'BirthDate' }),
  resaga(CONFIG),
)(BirthDate);
