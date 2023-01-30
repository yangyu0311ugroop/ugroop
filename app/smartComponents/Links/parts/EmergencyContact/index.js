import { DEFAULT, EMERGENCY_CONTACT_VALUES } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import isFunction from 'lodash/isFunction';

import { CONFIG } from './config';
import styles from './styles';
import { SIZE_CONSTANTS } from '../../../../sizeConstants';
import { Checkbox } from '../../../../ugcomponents/Inputs';

export class EmergencyContact extends PureComponent {
  renderField = () => {
    const { emergencyContact } = this.props;
    const contactValue = emergencyContact || EMERGENCY_CONTACT_VALUES.NO;
    return (
      <GridContainer direction="column">
        <GridItem>
          <Checkbox
            name="emergencyContact"
            value={contactValue === EMERGENCY_CONTACT_VALUES.YES}
            label="Emergency Contact?"
            size={SIZE_CONSTANTS.SM}
            autoFocus
            compact
            onChange={this.props.onChange}
          />
        </GridItem>
      </GridContainer>
    );
  };

  onChange = val => {
    const { onChange } = this.props;
    if (isFunction(onChange)) return onChange(val);
    return null;
  };

  renderTextOnly = () => {
    const { emergencyContact } = this.props;

    return emergencyContact;
  };

  renderBadge = () => {
    const { emergencyContact } = this.props;
    return LOGIC_HELPERS.ifElse(
      emergencyContact === EMERGENCY_CONTACT_VALUES.YES,
      '(Emergency Contact)',
      '',
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.BADGE]: this.renderBadge,
      [DEFAULT]: this.renderField,
    });
  };
}

EmergencyContact.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  onChange: PropTypes.func,

  // resaga props
  emergencyContact: PropTypes.string,
};

EmergencyContact.defaultProps = {
  emergencyContact: null,
};

export default compose(
  withStyles(styles, { name: 'EmergencyContact' }),
  resaga(CONFIG),
)(EmergencyContact);
