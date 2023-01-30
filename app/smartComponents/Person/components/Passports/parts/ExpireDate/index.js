import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Date } from 'smartComponents/Inputs';
import { VARIANTS } from 'variantsConstants';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { EditableDateForm } from 'smartComponents/Editables';

import { CONFIG } from './config';
import styles from './styles';

const label = 'Date of Expiry';

export class ExpireDate extends PureComponent {
  getOnSubmit = () => {
    const { onSubmit } = this.props;
    return LOGIC_HELPERS.ifElse(
      onSubmit,
      onSubmit,
      PERSON_DETAIL_HELPER.updatePassport(this.props),
    );
  };

  renderFromNow = () => {
    const { classes, expireDate, onlyFromNow } = this.props;

    const localExpireDate = MOMENT_HELPERS.createUtc(expireDate)
      .endOf('d')
      .utcOffset(MOMENT_HELPERS.create().utcOffset(), true);
    const diff = MOMENT_HELPERS.create().diff(localExpireDate);
    const past = diff > 0;

    const fromNow = MOMENT_HELPERS.renderFromNowAtLeastDays(localExpireDate);
    const tense = past ? 'Expired' : 'Expires';

    let className;
    const diffMonths = MOMENT_HELPERS.create().diff(localExpireDate, 'M');
    if (diffMonths < 1 && diffMonths > -6) className = classes.caution; // six months
    if (past) className = classes.alert;

    const title = onlyFromNow
      ? MOMENT_HELPERS.renderDate(expireDate)
      : undefined;
    const prefix = onlyFromNow ? '' : ' (';
    const suffix = onlyFromNow ? '' : ')';

    return (
      <span
        className={className}
        title={title}
      >{`${prefix}${tense} ${fromNow}${suffix}`}</span>
    );
  };

  renderTextOnly = () => {
    const { expireDate, onlyFromNow } = this.props;
    if (expireDate) {
      return (
        <React.Fragment>
          {!onlyFromNow && <span>{MOMENT_HELPERS.renderDate(expireDate)}</span>}
          {this.renderFromNow()}
        </React.Fragment>
      );
    }
    return '';
  };

  renderTextWithLabel = () => {
    const { readOnly } = this.props;
    return (
      <EditableDateForm
        name={USER_PASSPORTS_FIELDS.expireDate}
        label={label}
        value={this.props.expireDate}
        renderValue={this.renderTextOnly}
        readOnly={readOnly}
        placeholder="Click to specify date of expiry"
        readOnlyPlaceholder="No date of expiry"
        onSubmit={this.getOnSubmit()}
        minDate={this.props.resagaIssuedDate}
        minDateError="Cannot be before date of issue"
      />
    );
  };

  renderTextField = () => (
    <Date
      name={USER_PASSPORTS_FIELDS.expireDate}
      label={label}
      value={this.props.expireDate}
      minDate={this.props.issuedDate}
      minDateError="Cannot be before date of issue"
    />
  );

  renderProp = () => {
    const { children } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [this.renderTextOnly()]);
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderTextWithLabel,
    });
  };
}

ExpireDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  children: PropTypes.func,
  readOnly: PropTypes.bool,
  issuedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSubmit: PropTypes.func,
  onlyFromNow: PropTypes.bool,

  // resaga props
  expireDate: PropTypes.string,
  resagaIssuedDate: PropTypes.string,
};

ExpireDate.defaultProps = {
  variant: '',
  readOnly: false,
  issuedDate: '',
  onlyFromNow: false,

  expireDate: null,
  resagaIssuedDate: '',
};

export default compose(
  withStyles(styles, { name: 'ExpireDate' }),
  resaga(CONFIG),
)(ExpireDate);
