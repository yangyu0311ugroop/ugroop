import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import Icon from 'viewComponents/Icon';
import style from './style';

export class DietaryIcon extends React.PureComponent {
  render = () => {
    const { classes, noDietary, ...rest } = this.props;
    return (
      <div className={classes.gridIcon}>
        <Icon
          icon="lnr-chef"
          className={classes.dietaryIcon}
          title="Dietary Requirement"
          {...rest}
        />
        {noDietary && (
          <Icon
            icon="lnr-cross2"
            className={classes.cross}
            title="No dietary requirements specified"
          />
        )}
      </div>
    );
  };
}

DietaryIcon.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  noDietary: PropTypes.bool,
};

DietaryIcon.defaultProps = {};

export default withStyles(style, { name: 'viewComponents/People/DietaryIcon' })(
  DietaryIcon,
);
