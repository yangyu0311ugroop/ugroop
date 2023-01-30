import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import classnames from 'classnames';
import { CONFIG } from './config';
import styles from './styles';

export class Name extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { className } = this.props;
    return (
      <div className={classnames('j-text-ellipsis', className)}>
        {this.props.name}
      </div>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Name.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  name: PropTypes.string,
  className: PropTypes.object,
};

Name.defaultProps = {
  name: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Name' }),
  resaga(CONFIG),
)(Name);
