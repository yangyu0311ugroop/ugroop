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
import { Time } from 'smartComponents/Inputs';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import { isEmptyString } from 'utils/stringAdditions';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';
import { ORG_FORM_NAME } from './constants';

export class StartTime extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'website', 'id', 'classes']);

  getTempDate = () => new Date().toLocaleDateString();

  getValue = () => {
    const { startTime } = this.props;
    if (isEmptyString(startTime)) return null;
    return `${this.getTempDate()} ${startTime}`;
  };

  renderTimeInput = () => (
    <Time
      name={ORG_FORM_NAME}
      value={this.getValue()}
      label={this.props.intl.formatMessage(m.label)}
    />
  );

  renderTextOnly = () => {
    const { startTime } = this.props;
    return <P {...this.getStrippedOwnProps()}>{startTime}</P>;
  };

  renderDefault = () => {
    const { classes, startTime } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {startTime}
        </H1>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderTimeInput,
      [DEFAULT]: this.renderDefault,
    });
  };
}

StartTime.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  startTime: PropTypes.string,
};

StartTime.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  startTime: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'StartTime' }),
  resaga(CONFIG),
)(StartTime);
