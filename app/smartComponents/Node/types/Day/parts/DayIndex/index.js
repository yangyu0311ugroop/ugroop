import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class DayIndex extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { dayIndex } = this.props;
    return <span>{dayIndex + 1}</span>;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

DayIndex.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.oneOf(['', 'textOnly']),

  // resaga props
  dayIndex: PropTypes.number,
};

DayIndex.defaultProps = {
  dayIndex: 0,
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'DayIndex' }),
  resaga(CONFIG),
)(DayIndex);
