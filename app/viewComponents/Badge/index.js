import { DEFAULT } from 'appConstants';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { COLOR_CONSTANTS } from 'theme/colorConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import styles from './styles';

export const BadgeColor = online => {
  if (online) {
    return COLOR_CONSTANTS.PRIMARY;
  }
  return COLOR_CONSTANTS.SECONDARY;
};

export const Badge = ({ classes, Component, children, color, variant }) => {
  const Base = () => (
    <Component
      className={classnames(
        classes.root,
        LOGIC_HELPERS.switchCase(color, {
          [COLOR_CONSTANTS.TRANSLUCENT]: classes.translucent,
          [COLOR_CONSTANTS.BASE]: classes.blue,
          [COLOR_CONSTANTS.SECONDARY]: classes.gray,
          [COLOR_CONSTANTS.PRIMARY]: classes.primary,
          [COLOR_CONSTANTS.YELLOW]: classes.pending,
          [DEFAULT]: classes.blue,
        }),
      )}
      data-testid="badgeTestId"
    >
      {children}
    </Component>
  );

  const Square = () => (
    <Component
      className={classnames(
        classes.square,
        LOGIC_HELPERS.switchCase(color, {
          [COLOR_CONSTANTS.TRANSLUCENT]: classes.translucent,
          [COLOR_CONSTANTS.BASE]: classes.blue,
          [COLOR_CONSTANTS.PRIMARY]: classes.primary,
          [COLOR_CONSTANTS.SECONDARY]: classes.gray,
          [DEFAULT]: classes.blue,
        }),
      )}
      data-testid="badgeTestId"
    >
      {children}
    </Component>
  );

  const Circle = () => (
    <Component
      className={classnames(
        classes.circle,
        LOGIC_HELPERS.switchCase(color, {
          [COLOR_CONSTANTS.TRANSLUCENT]: classes.translucent,
          [COLOR_CONSTANTS.BASE]: classes.blue,
          [COLOR_CONSTANTS.SECONDARY]: classes.gray,
          [COLOR_CONSTANTS.PRIMARY]: classes.primary,
          [COLOR_CONSTANTS.YELLOW]: classes.pending,
          [DEFAULT]: classes.blue,
        }),
      )}
      data-testid="badgeTestId"
    >
      {children}
    </Component>
  );

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.SQUARE]: Square,
    [DEFAULT]: Base,
    [VARIANTS.ROUND]: Circle,
  });
};

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  Component: PropTypes.node,
  color: PropTypes.string,
  variant: PropTypes.string,
};

Badge.defaultProps = {
  Component: 'span',
  children: '',
  color: '',
  variant: '',
};

export default withStyles(styles, { name: 'Badge' })(Badge);
