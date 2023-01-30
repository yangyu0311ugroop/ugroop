import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DEFAULT, HIDDEN } from 'appConstants';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Visibility extends PureComponent {
  hidden = () => {
    const { status } = this.props;

    return status === HIDDEN;
  };

  onSuccess = status => () => {
    const { id, onSuccess } = this.props;

    LOGIC_HELPERS.ifFunction(onSuccess, [id, status]);
  };

  toggle = () => {
    const { id, type } = this.props;

    const status = LOGIC_HELPERS.ifElse(this.hidden(), '', HIDDEN);

    const node = {
      type,
      status,
    };

    NODE_API_HELPERS.updateNode(
      { nodeId: id, node, onSuccess: this.onSuccess(status) },
      this.props,
    );
  };

  renderCheckbox = () => {
    const { disabled, updating } = this.props;

    return (
      <input
        type="checkbox"
        checked={!this.hidden()}
        onChange={this.toggle}
        disabled={disabled || updating}
      />
    );
  };

  render = () => {
    const { status, variant, children } = this.props;

    if (children) {
      if (status === HIDDEN) {
        return null;
      }

      return LOGIC_HELPERS.ifFunction(children, [status], children);
    }

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderCheckbox,
    });
  };
}

Visibility.propTypes = {
  // hoc props
  // resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  disabled: PropTypes.bool,
  onSuccess: PropTypes.func,
  variant: PropTypes.string,
  children: PropTypes.any,

  // resaga props
  status: PropTypes.string,
  type: PropTypes.string,
  updating: PropTypes.bool,
};

Visibility.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Visibility' }),
  resaga(CONFIG),
)(Visibility);
