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

export class CreatedAt extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { createdAt } = this.props;
    return <span>{MomentHelper.renderDate(createdAt)}</span>;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

CreatedAt.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  createdAt: PropTypes.string,
};

CreatedAt.defaultProps = {
  createdAt: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'CreatedAt' }),
  resaga(CONFIG),
)(CreatedAt);
