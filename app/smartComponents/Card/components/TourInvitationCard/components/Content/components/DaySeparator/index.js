import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { moment } from 'utils';
import { CONFIG } from './config';
import styles from './styles';

export class DaySeparator extends PureComponent {
  isSameDay = () => {
    const { createdAt, previousCreatedAt } = this.props;

    if (!previousCreatedAt) {
      return false;
    }

    return moment.isSameDay(createdAt, previousCreatedAt);
  };

  render = () => {
    const { classes, createdAt, first } = this.props;

    if (this.isSameDay()) {
      return null;
    }

    const hrContent = (
      <Tooltip title={moment.renderDayDate(createdAt)} placement="top">
        <div>{moment.renderCalendarDate(createdAt)}</div>
      </Tooltip>
    );

    return (
      <div className={classes.root}>
        <div className={classnames(classes.hr, first && classes.hrFirst)}>
          {hrContent}
        </div>
      </div>
    );
  };
}

DaySeparator.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  first: PropTypes.bool,

  // resaga props
  createdAt: PropTypes.string,
  previousCreatedAt: PropTypes.string,
};

DaySeparator.defaultProps = {
  first: false,
  createdAt: '',
  previousCreatedAt: '',
};

export default compose(
  withStyles(styles, { name: 'DaySeparator' }),
  resaga(CONFIG),
)(DaySeparator);
