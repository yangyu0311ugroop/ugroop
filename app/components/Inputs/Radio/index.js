import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MRadio from '@material-ui/core/Radio';
import { FormControlLabel } from '@material-ui/core';
import Icon from 'ugcomponents/Icon';
import PropTypes from 'prop-types';
import styles from './styles';

export class Radio extends PureComponent {
  render() {
    const { classes, label, ...props } = this.props;
    const MuiRadioClasses = {
      root: null,
    };

    if (label !== '') {
      return (
        <FormControlLabel
          control={<MRadio classes={MuiRadioClasses} {...props} />}
          label={label}
        />
      );
    }
    return (
      <MRadio
        icon={<i />}
        disableRipple
        color="primary"
        indeterminateIcon={
          <Icon icon="minus" className={classes.iconChecked} />
        }
        classes={MuiRadioClasses}
        {...props}
      />
    );
  }
}

Radio.propTypes = {
  classes: PropTypes.object.isRequired,

  // parent
  label: PropTypes.string,
};

Radio.defaultProps = {
  label: '',
};

export default withStyles(styles, { name: 'UGRadio' })(Radio);
