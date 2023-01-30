import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MCheckbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import { FormControlLabel } from '@material-ui/core';
import Icon from 'ugcomponents/Icon';
import PropTypes from 'prop-types';
import styles from './styles';

export class Checkbox extends PureComponent {
  render() {
    const { classes, checkboxContainer, label, ...props } = this.props;
    const MuiCheckboxClasses = {
      root: classNames(classes.default, checkboxContainer),
    };

    if (label !== '') {
      return (
        <FormControlLabel
          control={<MCheckbox classes={MuiCheckboxClasses} {...props} />}
          label={label}
        />
      );
    }
    return (
      <MCheckbox
        icon={<i />}
        disableRipple
        color="primary"
        indeterminateIcon={
          <Icon icon="minus" className={classes.iconChecked} />
        }
        checkedIcon={<Icon icon="check" className={classes.iconChecked} />}
        classes={MuiCheckboxClasses}
        {...props}
      />
    );
  }
}

Checkbox.propTypes = {
  classes: PropTypes.object.isRequired,

  // parent
  label: PropTypes.string,
  checkboxContainer: PropTypes.string,
};

Checkbox.defaultProps = {
  label: '',
  checkboxContainer: '',
};

export default withStyles(styles, { name: 'UGCheckbox' })(Checkbox);
