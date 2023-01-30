import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import { moment } from 'utils';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

// viewComponents
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { VARIANTS } from 'variantsConstants';

import { CONFIG } from './config';
import styles from './styles';

export class UpdatedAt extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { classes, updatedAt, lowercase } = this.props;

    return (
      <span
        title={this.renderTitle()}
        className={classnames(
          LOGIC_HELPERS.ifElse(lowercase, classes.lowercase),
        )}
      >
        {MOMENT_HELPERS.timeSinceAtLeast(updatedAt, false, undefined, {
          postfix: ' ago',
        })}
      </span>
    );
  };

  renderTitle = () => {
    const { updatedAt } = this.props;

    return `${moment.renderDayDate(updatedAt)} at ${moment.renderTime(
      updatedAt,
    )}`;
  };

  renderSimpleTooltip = () => {
    const { children, wrapper: Component } = this.props;

    return <Component title={this.renderTitle()}>{children}</Component>;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.SIMPLE_TOOLTIP]: this.renderSimpleTooltip,
      [DEFAULT]: this.renderDefault,
    });
  };
}

UpdatedAt.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // wrapper props
  variant: PropTypes.string,
  wrapper: PropTypes.node,
  children: PropTypes.node,
  lowercase: PropTypes.bool,

  // resaga props
  updatedAt: PropTypes.string,
};

UpdatedAt.defaultProps = {
  updatedAt: '',
  variant: '',
  wrapper: 'div',
};

export default compose(
  withStyles(styles, { name: 'UpdatedAt' }),
  resaga(CONFIG),
)(UpdatedAt);
