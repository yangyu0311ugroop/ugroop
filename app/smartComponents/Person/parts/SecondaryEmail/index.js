import { DEFAULT } from 'appConstants';
import omit from 'lodash/omit';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { PERSON_VALIDATIONS } from 'smartComponents/Person/parts/validations';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import P from 'viewComponents/Typography';

import { PERSON_SECONDARY_EMAIL_FORM_NAME } from './constants';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class SecondaryEmail extends PureComponent {
  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'secondaryEmail', 'id', 'classes', 'variant']);

  renderDefault = () => this.renderTextOnly();

  renderTextField = () => (
    <TextField
      name={PERSON_SECONDARY_EMAIL_FORM_NAME}
      label={this.props.intl.formatMessage(m.label)}
      value={this.props.secondaryEmail}
      validationErrors={PERSON_VALIDATIONS.email}
      validations="isEmail"
      {...this.getStrippedOwnProps()}
    />
  );

  renderTextOnly = () => (
    <P {...this.getStrippedOwnProps()}>{this.props.secondaryEmail}</P>
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault(),
    });
  };
}

SecondaryEmail.propTypes = {
  // hoc props
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  secondaryEmail: PropTypes.string,

  // resaga props
};

SecondaryEmail.defaultProps = {
  variant: VARIANTS.TEXT_ONLY,
  secondaryEmail: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'SecondaryEmail' }),
  resaga(CONFIG),
)(SecondaryEmail);
