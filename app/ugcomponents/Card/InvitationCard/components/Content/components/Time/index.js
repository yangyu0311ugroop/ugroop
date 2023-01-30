import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { compose } from 'redux';
import { moment } from 'utils';
import resaga from 'resaga';
import { CONFIG } from './config';
import styles from './styles';

export class Time extends PureComponent {
  render = () => {
    const { classes, createdAt } = this.props;

    return (
      <Tooltip
        title={moment.renderDayDateTimeSeconds(createdAt)}
        placement="right"
      >
        <div className={classnames(classes.time)}>
          {moment.renderTime(createdAt)}
        </div>
      </Tooltip>
    );
  };
}

Time.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  createdAt: PropTypes.string,
};

Time.defaultProps = {
  createdAt: '',
};

export default compose(
  withStyles(styles, { name: 'Time' }),
  resaga(CONFIG),
)(Time);
