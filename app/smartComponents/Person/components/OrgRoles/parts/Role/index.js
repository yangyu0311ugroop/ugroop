import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { CONFIG } from './config';
import styles from './styles';

export class Role extends PureComponent {
  renderDefault = () => this.renderText();

  renderText = () => (
    <span className={this.props.classes.textOnly}>{this.props.role}</span>
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderText,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Role.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  role: PropTypes.string,
};

Role.defaultProps = {
  variant: '',
  role: '',
};

export default compose(
  withStyles(styles, { name: 'Role' }),
  resaga(CONFIG),
)(Role);
