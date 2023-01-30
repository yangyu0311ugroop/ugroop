import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import HeroImage from 'shareAssets/Hero-header.jpg';
import FeatureHeroImage from 'shareAssets/Hero-header-2.jpg';
import stylesheet from './style';

export const BGContentWrapper = ({
  children,
  classes,
  bgImageUrl,
  location,
  rootClassName,
  wrappedItemClassName,
}) => {
  let bgUrl = '';
  let rClassName = classNames(classes.root, rootClassName);

  if (location && location.pathname) {
    rClassName = classNames(rClassName, {
      [classes.fullViewportHeight]: location.pathname === '/',
      [classes.halfViewportHeight]: location.pathname === '/features',
    });
    switch (location.pathname) {
      case '/': {
        bgUrl += `${HeroImage}`;
        break;
      }
      case '/features': {
        bgUrl += `${FeatureHeroImage}`;
        break;
      }
      default:
        bgUrl += `${bgImageUrl}`;
        break;
    }
  } else {
    bgUrl += `${bgImageUrl}`;
  }

  return (
    <div
      className={rClassName}
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className={classes.override} />
      <div className={`${classes.wrappedItem} ${wrappedItemClassName}`}>
        {children}
      </div>
    </div>
  );
};

BGContentWrapper.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  bgImageUrl: PropTypes.string,
  location: PropTypes.object,
  rootClassName: PropTypes.string,
  wrappedItemClassName: PropTypes.string,
};
BGContentWrapper.defaultProps = {};

export default withStyles(stylesheet, { name: 'BGContentWrapper' })(
  BGContentWrapper,
);
