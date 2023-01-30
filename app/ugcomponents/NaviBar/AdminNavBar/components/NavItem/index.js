import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Tooltip from 'viewComponents/Tooltip';
import isFunction from 'lodash/isFunction';
import styles from './styles';

export class NavItem extends PureComponent {
  state = {
    tooltipOpen: false,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.popper = { topIndex: classes.topIndex };
  };

  componentWillReceiveProps = nextProps => {
    const { count } = this.props;

    if (count !== nextProps.count) {
      this.handleCountChange(nextProps.count);
    }
  };

  openTooltip = () => {
    this.setState({
      tooltipOpen: true,
    });
  };

  closeTooltip = () => {
    this.setState({
      tooltipOpen: false,
    });
  };

  handleCountChange = count => {
    clearTimeout(this.autoClose);
    if (count > 0) {
      this.openTooltip();
      this.closeDelay();
    } else {
      this.closeTooltip();
    }
  };

  closeDelay = () => {
    this.autoClose = setTimeout(() => {
      this.closeTooltip();
    }, 7000);
  };

  renderTooltipTitle = () => {
    const { renderTooltip } = this.props;

    return LOGIC_HELPERS.ifFunction(
      renderTooltip,
      [{ closeTooltip: this.closeTooltip }],
      renderTooltip,
    );
  };

  renderContent = () => {
    const {
      children,
      popper,
      icon,
      count,
      renderButton,
      renderMenu,
    } = this.props;

    if (children) {
      return LOGIC_HELPERS.ifFunction(children, [count], children);
    }

    if (popper) {
      return (
        <Popper renderButton={renderButton} noPadding classes={this.popper}>
          {renderMenu}
        </Popper>
      );
    }

    return <Icon icon={icon} />;
  };

  renderButton = () => {
    const { classes, count, renderTooltip, renderCount } = this.props;
    const { tooltipOpen } = this.state;
    const badge = isFunction(renderCount) ? (
      renderCount()
    ) : (
      <div className={classnames(classes.badge, classes.active)}>
        {LOGIC_HELPERS.ifElse(count > 99, '99+', count)}
      </div>
    );

    let renderChildren = this.renderContent();

    renderChildren = (
      <GridContainer alignItems="center">
        <GridItem>
          {renderChildren}
          {count > 0 && badge}
        </GridItem>
      </GridContainer>
    );

    if (!renderTooltip) {
      return renderChildren;
    }

    return (
      <Tooltip open={tooltipOpen} title={this.renderTooltipTitle()} isLight>
        {renderChildren}
      </Tooltip>
    );
  };

  render = () => {
    const { classes, title, count, onClick } = this.props;

    return (
      <GridContainer
        direction="column"
        className={classnames(
          classes.button,
          LOGIC_HELPERS.ifElse(
            count > 0,
            classes.active,
            classes.buttonInactive,
          ),
        )}
        title={title}
        onClick={onClick}
        spacing={0}
      >
        <GridItem>{this.renderButton()}</GridItem>
      </GridContainer>
    );
  };
}

NavItem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  count: PropTypes.number,
  icon: PropTypes.string,
  title: PropTypes.string,
  popper: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
  renderMenu: PropTypes.func,
  renderTooltip: PropTypes.func,
  renderButton: PropTypes.func,
  renderCount: PropTypes.func,

  // resaga props
};

NavItem.defaultProps = {
  count: 0,
};

export default compose(withStyles(styles, { name: 'NavItem' }))(NavItem);
