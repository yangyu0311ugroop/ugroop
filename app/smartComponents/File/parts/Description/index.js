import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Description extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { description } = this.props;
    return <span>{description}</span>;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

Description.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  description: PropTypes.string,
};

Description.defaultProps = {
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Description' }),
  resaga(CONFIG),
)(Description);
