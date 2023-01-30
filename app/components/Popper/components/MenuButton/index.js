import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import styles from './styles';

export class MenuButton extends PureComponent {
  render = () => {
    const {
      classes,
      children,
      onClick,
      className,
      dense,
      title,
      disabled,
    } = this.props;

    return (
      <Button
        size="xs"
        color="black"
        className={classnames(
          classes.routeButton,
          LOGIC_HELPERS.ifElse(dense, classes.denseButton),
          className,
        )}
        onClick={onClick}
        title={title}
        disabled={disabled}
      >
        {children}
      </Button>
    );
  };
}

MenuButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.any,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,

  // resaga props
};

MenuButton.defaultProps = {
  dense: true,
  disabled: false,
};

export default compose(withStyles(styles, { name: 'MenuButton' }))(MenuButton);
