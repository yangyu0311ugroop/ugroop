import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Icon from 'ugcomponents/Icon/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button/index';
import styles from './styles';

export class MenuItem extends PureComponent {
  handleClickMenu = event => {
    const { closeMenu, onClick, stopPropagation, ...props } = this.props;

    if (stopPropagation) {
      event.stopPropagation();
    }

    LOGIC_HELPERS.ifFunction(closeMenu, [event, props]);
    LOGIC_HELPERS.ifFunction(onClick, [event, props]);
  };

  renderIcon = () => {
    const { icon, IconProps, color, iconClassName } = this.props;

    if (!icon) return null;

    return (
      <GridItem>
        <Icon
          color={color}
          icon={icon}
          size="small"
          paddingRight
          className={iconClassName}
          {...IconProps}
        />
      </GridItem>
    );
  };

  renderMenuItem = () => {
    const { classes, children, alignItems, compact } = this.props;

    return (
      <GridContainer
        alignItems={alignItems}
        wrap="nowrap"
        className={classes.noWrap}
      >
        {this.renderIcon()}
        <GridItem
          className={classnames(classes.grow, compact && classes.compact)}
        >
          {children}
        </GridItem>
      </GridContainer>
    );
  };

  renderDefault = () => {
    const {
      classes,
      onClick,
      className,
      button,
      hover,
      color,
      disabled,
      block,
      type,
      selected,
    } = this.props;

    const renderMenuItem = this.renderMenuItem();

    const typeObj = LOGIC_HELPERS.ifElse(
      ['submit', 'reset', 'button'].indexOf(type) !== -1,
      { type },
      {},
    );

    if (!onClick && type !== 'submit') {
      return (
        <div
          className={classnames(
            classes.menuButton,
            classes[color],
            LOGIC_HELPERS.ifElse(hover, classes.menuButtonHover),
            LOGIC_HELPERS.ifElse(button, classes.button),
            LOGIC_HELPERS.ifElse(selected, classes.selected),
            className,
          )}
        >
          {renderMenuItem}
        </div>
      );
    }

    return (
      <Button
        dense
        noPadding
        size="extraSmall"
        color="black"
        variant={VARIANTS.BORDERLESS}
        className={classnames(
          classes.menuButton,
          classes[color],
          LOGIC_HELPERS.ifElse(hover, classes.menuButtonHover),
          LOGIC_HELPERS.ifElse(onClick, classes.menuButtonHover),
          LOGIC_HELPERS.ifElse(button, classes.button),
          LOGIC_HELPERS.ifElse(selected, classes.selected),
          className,
        )}
        onClick={this.handleClickMenu}
        block={block}
        disabled={disabled}
        {...typeObj}
      >
        {renderMenuItem}
      </Button>
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

MenuItem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.string,
  IconProps: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  compact: PropTypes.bool,

  closeMenu: PropTypes.func,
  onClick: PropTypes.func,
  stopPropagation: PropTypes.bool,

  // resaga props

  // customisable props
  iconClassName: PropTypes.string,
  alignItems: PropTypes.string,
  block: PropTypes.bool,
  button: PropTypes.bool,
  hover: PropTypes.bool,
  selected: PropTypes.bool,
  color: PropTypes.oneOf(['default', 'danger', 'clear']),
};

MenuItem.defaultProps = {
  variant: '',
  className: '',
  icon: null,
  IconProps: {},
  disabled: false,
  type: null,

  alignItems: 'center',
  color: 'default',
  stopPropagation: true,
  block: true,
  compact: false,
};

export default compose(withStyles(styles, { name: 'MenuItem' }))(MenuItem);
