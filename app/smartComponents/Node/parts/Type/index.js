import { DEFAULT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Data } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import inputs from './inputs';
import { CONFIG } from './config';
import styles from './styles';

export class Type extends PureComponent {
  renderDefault = () => {
    const { classes, type, className } = this.props;

    if (!type) {
      return null;
    }

    return (
      <span className={classnames(classes.default, className)}>
        {NODE_STORE_HELPERS.translateType(type)}
      </span>
    );
  };

  renderData = () => {
    const { type, defaultType } = this.props;
    return <Data value={type || defaultType} {...inputs.type} />;
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
      [VARIANTS.DATA]: this.renderData,
    });
  };
}

Type.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  type: PropTypes.string,
  defaultType: PropTypes.string,
  className: PropTypes.string,

  // resaga props
};

Type.defaultProps = {
  variant: '',
  type: '',
  className: '',
};

export default compose(
  withStyles(styles, { name: 'Type' }),
  resaga(CONFIG),
)(Type);
