import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import GridItem from 'components/GridItem';
import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';
import Badge from 'viewComponents/Badge';
import Checkbox from 'ugcomponents/Inputs/CheckboxField';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class IsDefault extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { isDefault } = this.props;
    return LOGIC_HELPERS.ifElse(
      isDefault,
      <span>
        <strong>Primary</strong>
      </span>,
      '',
    );
  };

  renderEditable = () => {
    const { isDefault, classes } = this.props;
    return (
      <Checkbox
        className={classes.checkbox}
        noMargin
        compact
        value={isDefault}
        name="isDefault"
        label="Primary"
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
      [VARIANTS.CHECKBOX_FIELD]: this.renderEditable,
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

  // resaga props
  isDefault: PropTypes.bool,
};

IsDefault.defaultProps = {
  isDefault: false,
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'IsDefault' }),
  resaga(CONFIG),
)(IsDefault);
