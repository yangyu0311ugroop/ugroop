import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Checkbox from 'ugcomponents/Inputs/CheckboxField';
import omit from 'lodash/omit';
import GridItem from 'components/GridItem';
import P from 'viewComponents/Typography';
import Icon from 'viewComponents/Icon';
import Margin from 'viewComponents/Margin';
import Badge from 'viewComponents/Badge';
import { CONFIG } from './config';
import styles from './styles';

export class IsDefault extends PureComponent {
  stripOwnProps = () =>
    omit(this.props, ['classes', 'variant', 'isDefault', 'id', 'isChecked']);

  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    if (this.props.isDefault) {
      return (
        <P noMargin weight="bold" success className={this.props.classes.text}>
          <Margin isInline right="sm">
            <Icon size={SIZE_CONSTANTS.XXS} icon="check" />
          </Margin>{' '}
          Primary Passport
        </P>
      );
    }

    return '';
  };

  renderStringOnly = () =>
    this.props.isDefault ? 'Primary' : 'Set as Primary';

  renderCheckboxLabel = ({ isChecked }) => (
    <P noMargin weight="bold" success={isChecked}>
      {this.renderStringOnly()}
    </P>
  );

  renderCheckbox = () => {
    const check = this.props.isChecked
      ? this.props.isChecked
      : this.props.isDefault;

    return (
      <Checkbox
        value={check}
        name={USER_PASSPORTS_FIELDS.isDefault}
        label={this.renderCheckboxLabel}
        color="primary"
        {...this.stripOwnProps()}
      />
    );
  };

  renderBadge = () => {
    const { isDefault } = this.props;
    return (
      isDefault && (
        <GridItem>
          <P dense weight="bold">
            <Badge>Primary</Badge>
          </P>
        </GridItem>
      )
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.CHECKBOX_FIELD]: this.renderCheckbox,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
      [VARIANTS.BADGE]: this.renderBadge,
      [DEFAULT]: this.renderDefault,
    });
  };
}

IsDefault.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  isChecked: PropTypes.bool,

  // resaga props
  isDefault: PropTypes.bool,
};

IsDefault.defaultProps = {
  isDefault: false,
  isChecked: false,
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'IsDefault' }),
  resaga(CONFIG),
)(IsDefault);
