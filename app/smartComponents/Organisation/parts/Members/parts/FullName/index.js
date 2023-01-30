import { DEFAULT, TEXT } from 'appConstants';
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

export class FullName extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'fullName', 'id', 'classes']);

  renderTextField = () => (
    <TextField
      name={ORG_FORM_NAME}
      value={this.props.fullName}
      label={this.props.intl.formatMessage(m.label)}
      InputLabelProps={this.getInputLabelProps}
      {...this.getStrippedOwnProps()}
    />
  );

  renderTextOnly = () => {
    const { fullName } = this.props;
    return <P {...this.getStrippedOwnProps()}>{fullName}</P>;
  };

  renderText = () => {
    const { fullName } = this.props;
    return fullName;
  };

  renderDefault = () => {
    const { classes, fullName } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {fullName}
        </H1>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderTextField,
      [TEXT]: this.renderText,
      [DEFAULT]: this.renderDefault,
    });
  };
}

FullName.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  fullName: PropTypes.string,
};

FullName.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  fullName: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'FullName' }),
  resaga(CONFIG),
)(FullName);
