import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Hidden, withStyles } from 'components/material-ui';
import UGNavLink from 'components/NavLink';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import styles from './styles';

export class Item extends PureComponent {
  componentWillMount = () => {
    const {
      classes,
      darkMode,
      onClick,
      className,
      activeClassName,
    } = this.props;

    this.navLinkProps = {
      className: classnames(
        className || classes.link,
        darkMode && classes.darkMode,
      ),
      activeClassName: classnames(
        activeClassName || classes.active,
        darkMode && classes.activeDarkMode,
      ),
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
      <GridItem>
        {renderHeading}
        <div className={classes.role}>{secondary}</div>
      </GridItem>
    );

    if (!alwaysShow) {
      return <Hidden smDown>{content}</Hidden>;
    }

    return content;
  };

  renderImage = () => {
    const { classes, photo, reserveLeft, showImage } = this.props;
    if (showImage) {
      return (
        <GridItem className={classnames(reserveLeft && classes.photo)}>
          <div className={classes.photoBackground}>{photo}</div>
        </GridItem>
      );
    }
    return null;
  };

  render = () => {
    const {
      classes,
      url,
      className,
      hover,
      paddingLeft,
      isActive,
      useNaviLink,
    } = this.props;

    const content = (
      <GridContainer
        alignItems="center"
        className={classnames(
          classes.root,
          hover && classes.hover,
          paddingLeft && classes.paddingLeft,
          className,
        )}
        wrap="nowrap"
      >
        {this.renderImage()}
        {this.renderContent()}
      </GridContainer>
    );
    if (useNaviLink) {
      return (
        <UGNavLink to={url} isActive={isActive} {...this.navLinkProps}>
          {content}
        </UGNavLink>
      );
    }
    return content;
  };
}

Item.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  url: PropTypes.string,
  photo: PropTypes.node,
  heading: PropTypes.node,
  secondary: PropTypes.node,

  // resaga props

  // customisable props
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  NavLinkProps: PropTypes.object,
  darkMode: PropTypes.bool,
  reserveLeft: PropTypes.bool,
  alwaysShow: PropTypes.bool,
  paddingLeft: PropTypes.bool,
  hover: PropTypes.bool,
  isActive: PropTypes.func,
  onClick: PropTypes.func,
  ellipsis: PropTypes.bool,
  ellipsisClassName: PropTypes.string,
  useNaviLink: PropTypes.bool,
  showImage: PropTypes.bool,
};

Item.defaultProps = {
  NavLinkProps: {},
  reserveLeft: true,
  alwaysShow: true,
  useNaviLink: true,
  showImage: true,
};

export default compose(withStyles(styles, { name: 'Item' }))(Item);
