import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { PHONE_TYPES } from 'smartComponents/Phone/constants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Select from 'ugcomponents/Inputs/SelectField';
import P from 'viewComponents/Typography';

import Icon from 'viewComponents/Icon';

import { CONFIG } from './config';
import styles from './styles';

export class Type extends PureComponent {
  renderDefault = () => this.renderIconOnly();

  renderIconOnly = () => {
    const { type } = this.props;
    switch (type) {
      case PHONE_TYPES.mobile: {
        return <Icon size="extraSmall" icon="phone" />;
      }
      case PHONE_TYPES.landline: {
        return <Icon size="extraSmall" icon="telephone" />;
      }
      default: {
        return <Icon size="extraSmall" icon="question" />;
      }
    }
  };

  renderTextOnly = () => {
    const { type } = this.props;
    return <P noMargin>{type}</P>;
  };

  renderEditable = () => {
    const { type } = this.props;
    const options = [
      {
        value: PHONE_TYPES.mobile,
        children: 'Mobile',
      },
      {
        value: PHONE_TYPES.landline,
        children: 'Landline',
      },
    ];
    return <Select name="type" options={options} value={type} />;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.ICON]: this.renderIconOnly,
      [VARIANTS.SELECT_FIELD]: this.renderEditable,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Type.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  type: PropTypes.string,
};

Type.defaultProps = {
  type: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Type' }),
  resaga(CONFIG),
)(Type);
