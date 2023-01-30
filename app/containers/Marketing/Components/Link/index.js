import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UGLink from 'components/Link';
import classNames from 'classnames';
import stylesheet from './style';

export const UGMarketingLink = ({
  children,
  classes,
  isButton,
  outline,
  ...props
}) => {
  const cls = classNames(
    classes.notActive,
    { [classes.btnLink]: isButton },
    {
      [classes.outlineOrange]: outline === 'orange',
    },
  );

  return (
    <UGLink className={cls} {...props}>
      {children}
    </UGLink>
  );
};

UGMarketingLink.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  isButton: PropTypes.bool,
  outline: PropTypes.string,
};
UGMarketingLink.defaultProps = {};

export default withStyles(stylesheet, { name: 'UGMarketingLink' })(
  UGMarketingLink,
);
