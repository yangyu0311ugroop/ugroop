import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { FormControl, InputAdornment } from '@material-ui/core';
import Icon from 'ugcomponents/Icon';
import m from './messages';
import styles from './styles';

export const SearchField = ({
  classes,
  value,
  onChange,
  intl,
  onPressEnter,
}) => (
  <FormControl className={classes.root}>
    <Input
      classes={{
        input: classes.input,
        underline: classes.inputLine,
      }}
      inputProps={{
        onKeyPress: onPressEnter,
      }}
      id="template-search"
      value={value}
      onChange={onChange}
      placeholder={intl.formatMessage(m.searchPlaceholder)}
      startAdornment={
        <InputAdornment className={classes.adornment} position="start">
          <Icon icon="magnifier" />
        </InputAdornment>
      }
    />
  </FormControl>
);

SearchField.propTypes = {
  onPressEnter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

SearchField.defaultProps = {
  value: '',
};

export default injectIntl(
  withStyles(styles, { name: 'SearchField' })(SearchField),
);
