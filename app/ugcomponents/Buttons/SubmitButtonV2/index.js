import { DO_NOTHING } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'ugcomponents/Buttons/Button/index';
import Icon from 'ugcomponents/Icon/index';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class SubmitButton extends PureComponent {
  handleClick = (...props) => {
    const { onClick } = this.props;

    if (onClick) return onClick(...props);

    return DO_NOTHING;
  };

  renderLoading = () => {
    const { classes } = this.props;

    return (
      <Button color="blue" dense size="small">
        <Icon
          className={classnames(classes.iconNext, classes.loading)}
          icon="lnr-refresh2"
        />
        <span className={classes.textLoading}>
          <M {...m.loading} />
        </span>
      </Button>
    );
  };

  renderValid = () => {
    const { classes, disabled, children, icon, type } = this.props;

    return (
      <Button
        type={type}
        color="green"
        dense
        size="small"
        disabled={disabled}
        onClick={this.handleClick}
      >
        <Icon className={classes.iconNext} icon={icon} />
        <span className={classes.textLoading}>{children}</span>
      </Button>
    );
  };

  render = () => {
    const { loading } = this.props;

    let content;
    if (loading) {
      content = this.renderLoading();
    } else {
      content = this.renderValid();
    }

    return <Fragment>{content}</Fragment>;
  };
}

SubmitButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  icon: PropTypes.string,
  type: PropTypes.string,

  onClick: PropTypes.func,

  // resaga props
};

SubmitButton.defaultProps = {
  loading: false,
  disabled: false,
  children: 'Submit',
  icon: 'lnr-magnifier',
  type: 'submit',
};

export default compose(
  withStyles(styles, { name: 'SubmitButton' }),
  resaga(CONFIG),
)(SubmitButton);
