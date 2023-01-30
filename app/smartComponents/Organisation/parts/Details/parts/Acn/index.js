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

export class Acn extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'website', 'id', 'classes', 'variant']);

  renderTextField = () => {
    const { acn } = this.props;
    return (
      <TextField
        name={ORG_FORM_NAME}
        value={acn}
        label={this.props.intl.formatMessage(m.label)}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderTextOnly = () => {
    const { acn } = this.props;
    return <P {...this.getStrippedOwnProps()}>{acn}</P>;
  };

  renderDefault = () => {
    const { classes, acn } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {acn}
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

Acn.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  acn: PropTypes.string,
};

Acn.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  acn: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Acn' }),
  resaga(CONFIG),
)(Acn);
