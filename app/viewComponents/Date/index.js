import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MomentHelper from 'utils/helpers/moment';
import Tooltip from '../Tooltip/index';
import styles from './styles';

export const DateTimeTooltip = ({ children, dateTime }) => (
  <Tooltip title={MomentHelper.renderDayDateTimeSeconds(dateTime)}>
    {children}
  </Tooltip>
);

DateTimeTooltip.propTypes = {
  dateTime: PropTypes.string,
  children: PropTypes.node,
};

DateTimeTooltip.defaultProps = {
  children: '',
  dateTime: null,
};

export default withStyles(styles, { name: 'DateTimeTooltip' })(DateTimeTooltip);
