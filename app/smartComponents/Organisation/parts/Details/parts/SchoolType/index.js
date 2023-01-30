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
import { Select } from 'ugcomponents/Inputs';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';
import { ORG_FORM_NAME, SCHOOL_TYPES } from './constants';
import { VARIANTS } from '../../../../../../variantsConstants';

export class SchoolType extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'schoolType', 'id', 'classes', 'variant']);

  renderSelectField = () => {
    const { schoolType } = this.props;
    const subTypesStrip = SCHOOL_TYPES.map(value => ({
      value,
      children: value,
    }));
    return (
      <Select
        name={ORG_FORM_NAME}
        label={this.props.intl.formatMessage(m.label)}
        value={schoolType}
        options={subTypesStrip}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderTextOnly = () => {
    const { schoolType } = this.props;
    return <P {...this.getStrippedOwnProps()}>{schoolType}</P>;
  };

  renderStringOnly = () => {
    const { schoolType } = this.props;
    const val = LOGIC_HELPERS.ifElse(
      SCHOOL_TYPES.includes(schoolType),
      schoolType,
      SCHOOL_TYPES[0],
    );
    return val;
  };

  renderDefault = () => {
    const { classes, schoolType } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {schoolType}
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

SchoolType.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  schoolType: PropTypes.string,
};

SchoolType.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  schoolType: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'OrgType' }),
  resaga(CONFIG),
)(SchoolType);
