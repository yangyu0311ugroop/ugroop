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
import { ORG_FORM_NAME, SCHOOL_GENDERS } from './constants';
import { VARIANTS } from '../../../../../../variantsConstants';

export class SchoolGender extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, [
      'resaga',
      'schoolGender',
      'subTypes',
      'id',
      'classes',
      'variant',
    ]);

  renderSelectField = () => {
    const { schoolGender } = this.props;
    const subTypesStrip = SCHOOL_GENDERS.map(
      ({ code: value, name: children }) => ({
        value,
        children,
      }),
    );
    return (
      <Select
        name={ORG_FORM_NAME}
        label={this.props.intl.formatMessage(m.label)}
        value={schoolGender}
        options={subTypesStrip}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderTextOnly = () => {
    const { schoolGender } = this.props;
    return <P {...this.getStrippedOwnProps()}>{schoolGender}</P>;
  };

  renderStringOnly = () => {
    const { schoolGender } = this.props;
    const vallArr = SCHOOL_GENDERS.filter(itm => itm.code === schoolGender);
    if (!vallArr.length) {
      return SCHOOL_GENDERS[0].name;
    }
    return vallArr[0].name;
  };

  renderDefault = () => {
    const { classes, schoolGender } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {schoolGender}
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

SchoolGender.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  schoolGender: PropTypes.string,
  subTypes: PropTypes.array,
};

SchoolGender.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  schoolGender: '',
  subTypes: [],
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'OrgType' }),
  resaga(CONFIG),
)(SchoolGender);
