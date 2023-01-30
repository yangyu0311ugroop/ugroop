import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';
import Icon from 'ugcomponents/Icon';
import classnames from 'classnames';
import styles from './styles';
import ValidationTextField from '../../../../ugcomponents/Inputs/ValidationTextField';
import Button from '../../../../viewComponents/Button';

import Form from '../../../../ugcomponents/Form';

export const TemplateSearchField = ({
  classes,
  value,
  onChange,
  onPressEnter,
  clearSearch,
}) => (
  <Form>
    <ValidationTextField
      name="searchFolders"
      value={value}
      InputProps={{
        disableUnderline: true,
        classes: { input: classes.input },
        onPressEnter,
      }}
      onChange={onChange}
      placeholder="Search by name..."
      startAdornment={
        <InputAdornment className={classes.adornment} position="start">
          <Icon icon="magnifier" size="small" />
        </InputAdornment>
      }
      endAdornment={
        value && (
          <InputAdornment className={classes.adornment} position="end">
            <Button
              dense
              noPadding
              size="extraSmall"
              onClick={clearSearch}
              className={classnames(classes.navButton)}
            >
              <Icon icon="lnr-cross" size="small" />
            </Button>
          </InputAdornment>
        )
      }
      wrapperClassName={classes.wrapperClass}
    />
  </Form>
);

TemplateSearchField.propTypes = {
  onPressEnter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  clearSearch: PropTypes.func,
};

TemplateSearchField.defaultProps = {
  value: '',
};

export default injectIntl(
  withStyles(styles, { name: 'TemplateSearchField' })(TemplateSearchField),
);
