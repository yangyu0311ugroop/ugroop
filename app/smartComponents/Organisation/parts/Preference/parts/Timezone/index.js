import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Select } from 'ugcomponents/Inputs';
import { H1, P } from 'viewComponents/Typography';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import momentTimezone from 'moment-timezone';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';
import { ORG_FORM_NAME } from './constants';
import { VARIANTS } from '../../../../../../variantsConstants';

export class Timezone extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'timezone', 'id', 'classes', 'variant']);

  renderSelectField = () => {
    const { timezone } = this.props;
    const timezones = momentTimezone.tz.names();
    let timezoneStrip = [{ value: null, children: '' }];
    timezoneStrip = timezoneStrip.concat(
      timezones.map(value => ({ value, children: value })),
    );
    return (
      <Select
        name={ORG_FORM_NAME}
        label={this.props.intl.formatMessage(m.label)}
        value={timezone}
        options={timezoneStrip}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderTextOnly = () => {
    const { timezone } = this.props;
    return <P {...this.getStrippedOwnProps()}>{timezone}</P>;
  };

  renderStringOnly = () => this.props.timezone;

  renderDefault = () => {
    const { classes, timezone } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {timezone}
        </H1>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderSelectField,
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Timezone.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  timezone: PropTypes.string,
};

Timezone.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  timezone: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Timezone' }),
  resaga(CONFIG),
)(Timezone);
