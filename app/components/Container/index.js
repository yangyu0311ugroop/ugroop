import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const stylesheet = {
  root: {
    // 88% was a magic obsoleted number since we have maxWidth now
    // always add extra 44px padding to reserve space for important stuffs
    width: '100%',
    margin: '0 auto',
    maxWidth: 1140,
  },
  reading: {
    maxWidth: 980,
  },
  medium: {
    maxWidth: 1224,
  },
  large: {
    maxWidth: 1280,
  },
  xl: {
    maxWidth: 1440,
  },
  maxSize: {
    width: '100%',
    maxWidth: '100%',
  },
  padding: {
    paddingRight: 8,
    paddingLeft: 8,
  },
  paddingLeft: {
    paddingLeft: 55,
  },
  paddingMaxSize: {
    paddingLeft: 8,
  },
  isPublic: {
    marginLeft: 0,
    maxWidth: 1140,
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
  },
};

export const Container = ({
  children,
  classes,
  medium,
  large,
  xl,
  reading,
  maxSize,
  className,
  padding,
  paddingLeft,
  isPublic,
}) => (
  <div
    className={classnames(
      classes.root,
      medium && classes.medium,
      large && classes.large,
      LOGIC_HELPERS.ifElse(xl, classes.xl),
      reading && classes.reading,
      maxSize && classes.maxSize,
      padding && classes.padding,
      paddingLeft && classes.paddingLeft,
      isPublic && classes.isPublic,
      LOGIC_HELPERS.ifElse([padding, maxSize], classes.paddingMaxSize),
      className,
    )}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  xl: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  reading: PropTypes.bool,
  maxSize: PropTypes.bool,
  padding: PropTypes.bool,
  paddingLeft: PropTypes.bool,
  isPublic: PropTypes.bool,
};

Container.defaultProps = {
  large: false,
  reading: false,
  maxSize: false,
  isPublic: false,
  padding: true,
};

export default withStyles(stylesheet, { name: 'Container' })(Container);
