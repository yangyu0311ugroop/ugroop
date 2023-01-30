import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import H1 from 'components/H1';
import H2 from 'components/H2';
import H3 from 'components/H3';
import H4 from 'components/H4';
import H5 from 'components/H5';
import H6 from 'components/H6';
import classNames from 'classnames';
import stylesheet from './style';

export const Header = ({
  classes,
  className,
  children,
  as,
  color,
  isThin,
  isUpperCase,
}) => {
  const cls = classNames(
    { [classes.headerThin]: isThin },
    { [classes.headerDefault]: !isThin },
    { [classes.uppercase]: isUpperCase },
    {
      [classes.offWhiteColor]: color === 'offwhite',
      [classes.orangeColor]: color === 'orange',
      [classes.primaryColor]:
        !color ||
        color === 'black' ||
        (color !== 'offwhite' && color !== 'orange'),
    },
    className,
  );

  switch (as) {
    case 'h1': {
      return <H1 className={cls}>{children}</H1>;
    }
    case 'h2': {
      return <H2 className={cls}>{children}</H2>;
    }
    case 'h3': {
      return <H3 className={cls}>{children}</H3>;
    }
    case 'h4': {
      return <H4 className={cls}>{children}</H4>;
    }
    case 'h5': {
      return <H5 className={cls}>{children}</H5>;
    }
    case 'h6': {
      return <H6 className={cls}>{children}</H6>;
    }
    default: {
      return <H1 className={cls}>{children}</H1>;
    }
  }
};

Header.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  color: PropTypes.string,
  isThin: PropTypes.bool,
  as: PropTypes.string,
  className: PropTypes.string,
  isUpperCase: PropTypes.bool,
};

Header.defaultProps = {
  as: 'h1',
  color: 'primary',
};

export default withStyles(stylesheet, { name: 'UGHeader' })(Header);
