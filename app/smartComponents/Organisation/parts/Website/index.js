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
import { VARIANTS } from '../../../../variantsConstants';

export class Website extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'website', 'id', 'classes', 'variant']);

  renderTextField = () => {
    const { intl } = this.props;
    return (
      <TextField
        name={ORG_FORM_NAME}
        value={this.props.website}
        label={this.props.intl.formatMessage(m.label)}
        InputLabelProps={this.getInputLabelProps}
        placeholder={intl.formatMessage(m.emailPlaceholder)}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderStringOnly = () => this.props.website;

  renderTextOnly = () => {
    const { website } = this.props;
    return <P {...this.getStrippedOwnProps()}>{website}</P>;
  };

  renderDefault = () => {
    const { classes, website } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {website}
        </H1>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Website.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  website: PropTypes.string,
};

Website.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  website: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Website' }),
  resaga(CONFIG),
)(Website);
