import { DEFAULT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import OrganisationRole from 'smartComponents/Organisation/parts/Role';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Role extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderDefault = () => {
    const { role, variant, article } = this.props;

    if (!role) {
      return null;
    }

    return (
      <span className={this.contentClassName()}>
        <OrganisationRole role={role} variant={variant} article={article} />
      </span>
    );
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

Role.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,

  // resaga props
  role: PropTypes.string,

  article: PropTypes.bool,
};

Role.defaultProps = {
  className: '',

  role: '',
  article: false,
};

export default compose(
  withStyles(styles, { name: 'Role' }),
  resaga(CONFIG),
)(Role);
