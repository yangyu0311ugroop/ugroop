import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import { CONFIG, CONFIG_ID } from './config';
import { ORGNAME_FORM_NAME } from './constants';
import m from './messages';
import styles from './styles';
import { VARIANTS } from '../../../../../../variantsConstants';
import JText from '../../../../../../components/JText';

export class PaxLabel extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'label', 'id', 'classes', 'variant']);

  renderTextField = () => (
    <div>
      <TextField
        name={ORGNAME_FORM_NAME}
        value={this.props.label}
        label={this.props.intl.formatMessage(m.label)}
        InputLabelProps={this.getInputLabelProps}
        placeholder={this.props.intl.formatMessage(m.txtPlaceholder)}
        validations="minLength:2,maxLength:15"
        {...this.getStrippedOwnProps()}
        // required
      />
      <JText gray italic sm>
        (Maximum 15 chars)
      </JText>
    </div>
  );

  renderTextOnly = () => {
    const { label } = this.props;
    return <P {...this.getStrippedOwnProps()}>{label}</P>;
  };

  renderStringOnly = () => this.props.label || this.props.defaultValue;

  renderDefault = () => {
    const { classes, label } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1
          className={classnames('j-text-ellipsis', classes.name)}
          noMargin
          {...this.getStrippedOwnProps()}
        >
          {label}
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
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
    });
  };
}

PaxLabel.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  className: PropTypes.string,
  ellipsisClassName: PropTypes.string,
  prefix: PropTypes.string,
  defaultValue: PropTypes.string,
  // resaga props
  label: PropTypes.string,

  // customisable props
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

PaxLabel.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  label: '',
  component: 'span',
  defaultValue: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'PaxLabel' }),
  resaga(CONFIG_ID),
  resaga(CONFIG),
)(PaxLabel);
