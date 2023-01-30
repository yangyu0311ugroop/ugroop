import { DEFAULT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { moment } from 'utils/index';
import { CONFIG } from './config';
import styles from './styles';

export class CreatedAt extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderTitle = () => {
    const { createdAt } = this.props;

    return `${moment.renderDayDate(createdAt)} at ${moment.renderTime(
      createdAt,
    )}`;
  };

  renderDefault = () => {
    const { createdAt } = this.props;

    if (!createdAt) {
      return null;
    }

    return (
      <span title={this.renderTitle()} className={this.contentClassName()}>
        {moment.renderTimeAgo(createdAt)}
      </span>
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

CreatedAt.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,

  // resaga props
  createdAt: PropTypes.string,
};

CreatedAt.defaultProps = {
  variant: '',
  className: '',

  createdAt: '',
};

export default compose(
  withStyles(styles, { name: 'CreatedAt' }),
  resaga(CONFIG),
)(CreatedAt);
