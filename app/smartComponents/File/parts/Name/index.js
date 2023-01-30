import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Name extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { name } = this.props;
    return <span>{name}</span>;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
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
};

Name.defaultProps = {
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Name' }),
  resaga(CONFIG),
)(Name);
