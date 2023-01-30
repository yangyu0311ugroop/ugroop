import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { helpers } from 'datastore/userStore/helpers';
import P from 'viewComponents/Typography';
import Date from 'viewComponents/Date';

import { CONFIG } from './config';
import styles from './styles';

export class Role extends PureComponent {
  renderTextOnly = () => {
    const { role, classes } = this.props;

    return (
      <span className={classes.textOnly}>{helpers.translateRole(role)}</span>
    );
  };

  renderSubtitle = () => {
    const { role, date } = this.props;

    return (
      <Date dateTime={date}>
        <P weight="bold" subtitle>
          {helpers.translateRole(role)}
        </P>
      </Date>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.SUBTITLE_TEXT]: this.renderSubtitle,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

Role.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  role: PropTypes.string,
  date: PropTypes.string,
};

Role.defaultProps = {
  variant: '',
  role: '',
  date: '',
};

export default compose(
  withStyles(styles, { name: 'Role' }),
  resaga(CONFIG),
)(Role);
