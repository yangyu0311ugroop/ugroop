import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles, Hidden } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import UGNavLink from 'components/NavLink';
import { compose } from 'redux';
import classnames from 'classnames';
import styles from './styles';

export class NavLink extends PureComponent {
  componentWillMount = () => {
    const { classes, onClick, className, activeClassName } = this.props;

    this.navLinkProps = {
      className: classnames(classes.link, className),
      activeClassName: classnames(classes.active, activeClassName),
      onClick,
    };
  };

  renderContent = () => {
    const {
      classes,
      heading,
      secondary,
      alwaysShow,
      ellipsis,
      ellipsisClassName,
      fullWidth,
    } = this.props;

    let renderHeading = heading;

    if (ellipsis) {
      renderHeading = (
        <div className={ellipsisClassName}>
          <div className={classes.ellipsis}>{heading}</div>
        </div>
      );
    }

    const content = (
      <GridItem className={classnames(fullWidth && classes.fullWidth)}>
        {renderHeading}
        <div className={classes.role}>{secondary}</div>
      </GridItem>
    );

    if (!alwaysShow) {
      return <Hidden smDown>{content}</Hidden>;
    }

    return content;
  };

  renderLink = () => {
    const { classes, photo, className } = this.props;

    return (
      <GridContainer
        alignItems="center"
        className={classnames(classes.root, className)}
        wrap="nowrap"
      >
        <GridItem className={classnames(classes.photo)}>
          <div className={classes.photoBackground}>{photo}</div>
        </GridItem>
        {this.renderContent()}
      </GridContainer>
    );
  };

  render = () => {
    const {
      classes,
      to,
      gridClassName,
      children,
      actions,
      isActive,
      stopPropogationLink,
    } = this.props;

    let renderLink;

    if (typeof children === 'function') {
      renderLink = children();
    } else if (children) {
      renderLink = children;
    } else {
      renderLink = this.renderLink();
    }

    return (
      <GridContainer
        alignItems="center"
        wrap="nowrap"
        spacing={0}
        className={gridClassName}
      >
        <GridItem className={classes.grow}>
          <UGNavLink
            to={to}
            isActive={isActive}
            stopPropogationLink={stopPropogationLink}
            {...this.navLinkProps}
          >
            {renderLink}
          </UGNavLink>
        </GridItem>
        {actions}
      </GridContainer>
    );
  };
}

NavLink.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  to: PropTypes.string,
  photo: PropTypes.node,
  heading: PropTypes.node,
  secondary: PropTypes.node,
  actions: PropTypes.node,
  fullWidth: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  // resaga props

  // customisable props
  className: PropTypes.string,
  gridClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  NavLinkProps: PropTypes.object,
  reserveLeft: PropTypes.bool,
  alwaysShow: PropTypes.bool,
  paddingLeft: PropTypes.bool,
  hover: PropTypes.bool,
  isActive: PropTypes.func,
  onClick: PropTypes.func,
  ellipsis: PropTypes.bool,
  ellipsisClassName: PropTypes.string,
  stopPropogationLink: PropTypes.bool,
};

NavLink.defaultProps = {
  NavLinkProps: {},
  reserveLeft: true,
  alwaysShow: true,
  fullWidth: false,
};

export default compose(withStyles(styles, { name: 'NavLink' }))(NavLink);
