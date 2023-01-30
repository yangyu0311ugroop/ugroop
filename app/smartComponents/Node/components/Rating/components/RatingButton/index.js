import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class RatingButton extends PureComponent {
  render = () => {
    const {
      className,
      classes,
      value,
      active,
      title,
      text,
      onClick,
      disabled,
    } = this.props;

    return (
      <Button
        size="xs"
        color="primary"
        onClick={onClick}
        className={classnames(
          classes.level,
          classes[`level${value}`],
          !active && classes.fade,
          className,
        )}
        title={title}
        disabled={disabled}
      >
        {text}
      </Button>
    );
  };
}

RatingButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  className: PropTypes.any,
  value: PropTypes.any,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.node,
  text: PropTypes.node,
  onClick: PropTypes.func,

  // resaga props
};

RatingButton.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'RatingButton' }),
  resaga(CONFIG),
)(RatingButton);
