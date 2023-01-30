import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';
import { ORG_FORM_NAME } from './constants';

export class Registration extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'website', 'id', 'classes', 'variant']);

  renderTextField = () => {
    const { registration } = this.props;
    return (
      <TextField
        name={ORG_FORM_NAME}
        value={registration}
        label={this.props.intl.formatMessage(m.label)}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderTextOnly = () => {
    const { registration } = this.props;
    return <P {...this.getStrippedOwnProps()}>{registration}</P>;
  };

  renderDefault = () => {
    const { classes, registration } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {registration}
        </H1>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Registration.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  registration: PropTypes.string,
};

Registration.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  registration: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Registration' }),
  resaga(CONFIG),
)(Registration);
