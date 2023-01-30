import { DEFAULT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { moment } from 'utils/index';
import { CONFIG } from './config';
import styles from './styles';

export class CompletedAt extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderDefault = () => {
    const { completedAt, placement } = this.props;

    if (!completedAt) {
      return null;
    }

    return (
      <Tooltip
        title={moment.renderCurrentDayDateTimeZone(completedAt)}
        placement={placement}
        enterDelay={1000}
      >
        <span className={this.contentClassName()}>
          {moment.renderFromNow(completedAt)}
        </span>
      </Tooltip>
    );
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

CompletedAt.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,
  placement: PropTypes.string,

  // resaga props
  completedAt: PropTypes.string,
};

CompletedAt.defaultProps = {
  variant: '',
  className: '',
  placement: 'top',

  completedAt: '',
};

export default compose(
  withStyles(styles, { name: 'CompletedAt' }),
  resaga(CONFIG),
)(CompletedAt);
