import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { moment } from 'utils';
import { H6 } from 'viewComponents/Typography';
import classnames from 'classnames';
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
        <div>
          <H6
            className={classnames(classes.content, {
              [classes.noTopMargin]: first,
            })}
          >
            {moment.renderCalendarDate(createdAt)}
          </H6>
        </div>
      </Tooltip>
    );

    return (
      <div
        className={classnames(classes.root, {
          [classes.noTopMargin]: this.props.first,
          [classes.textAlignLeft]: this.props.isTextAlignLeft,
        })}
      >
        {hrContent}
      </div>
    );
  };
}

DaySeparator.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  first: PropTypes.bool,
  createdAt: PropTypes.string,
  previousCreatedAt: PropTypes.string,
  isTextAlignLeft: PropTypes.bool,

  // resaga props
};

DaySeparator.defaultProps = {
  first: false,
  createdAt: '',
  previousCreatedAt: '',
  isTextAlignLeft: false,
};

export default compose(withStyles(styles, { name: 'DaySeparator' }))(
  DaySeparator,
);
