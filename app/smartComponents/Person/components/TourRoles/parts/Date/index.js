import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import momentHelper from 'utils/helpers/moment';
import DateTimeTooltip from 'viewComponents/Date';
import { CONFIG } from './config';
import styles from './styles';

export class Date extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { date } = this.props;
    return (
      <DateTimeTooltip dateTime={date}>
        <span>{momentHelper.renderCalendarDate(date)}</span>
      </DateTimeTooltip>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Date.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  date: PropTypes.string,
};

Date.defaultProps = {
  variant: '',
  date: '',
};

export default compose(
  withStyles(styles, { name: 'Date' }),
  resaga(CONFIG),
)(Date);
