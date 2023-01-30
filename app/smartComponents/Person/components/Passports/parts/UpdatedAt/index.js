import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MomentHelper from 'utils/helpers/moment';

import { CONFIG } from './config';
import styles from './styles';

export class UpdatedAt extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { updatedAt } = this.props;
    return <span>{MomentHelper.renderDate(updatedAt)}</span>;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

UpdatedAt.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  updatedAt: PropTypes.string,
};

UpdatedAt.defaultProps = {
  updatedAt: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'UpdatedAt' }),
  resaga(CONFIG),
)(UpdatedAt);
