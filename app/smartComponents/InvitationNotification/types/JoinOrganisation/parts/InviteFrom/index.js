import { DEFAULT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Name } from 'ugcomponents/Person/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class InviteFrom extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderDefault = () => {
    const { inviteFrom, variant } = this.props;

    if (!inviteFrom) {
      return null;
    }

    return (
      <span className={this.contentClassName()}>
        <Name id={inviteFrom} variant={variant} />
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

InviteFrom.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,

  // resaga props
  inviteFrom: PropTypes.number,
};

InviteFrom.defaultProps = {
  variant: '',
  className: '',

  inviteFrom: 0,
};

export default compose(
  withStyles(styles, { name: 'InviteFrom' }),
  resaga(CONFIG),
)(InviteFrom);
