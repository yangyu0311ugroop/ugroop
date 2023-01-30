import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import momentHelper from 'utils/helpers/moment';
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

export class CreatedDate extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'createdDate', 'id', 'classes']);

  renderTextField = () => (
    <TextField
      name={ORG_FORM_NAME}
      value={this.props.createdDate}
      label={this.props.intl.formatMessage(m.label)}
      InputLabelProps={this.getInputLabelProps}
      {...this.getStrippedOwnProps()}
    />
  );

  renderTextOnly = () => {
    const { createdDate } = this.props;
    const createdDateFormated = momentHelper.getDateWithFormat(
      createdDate,
      'MMMM DD, YYYY',
    );
    return <P {...this.getStrippedOwnProps()}>{createdDateFormated}</P>;
  };

  renderDefault = () => {
    const { classes, createdDate } = this.props;
    const createdDateFormated = momentHelper.getDateWithFormat(
      createdDate,
      'MMMM DD, YYYY',
    );
    return (
      <React.Fragment>
        <H1
          className={classes.createddate}
          noMargin
          {...this.getStrippedOwnProps()}
        >
          {`Created ${createdDateFormated}`}
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

CreatedDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  createdDate: PropTypes.string,
};

CreatedDate.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  createdDate: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'CreatedDate' }),
  resaga(CONFIG),
)(CreatedDate);
