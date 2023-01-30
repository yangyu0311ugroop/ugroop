import { DEFAULT, TEXT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ORG_ROLES } from 'datastore/invitationStore/constants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import a from 'indefinite';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Role extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderDefault = () => {
    const { role, component: Component } = this.props;

    if (!role) {
      return null;
    }

    return (
      <Component className={this.contentClassName()}>
        {this.renderText()}
      </Component>
    );
  };

  renderText = () => {
    const { role, article } = this.props;

    const text = ORG_ROLES[role] || '';

    if (article) {
      return a(text);
    }

    return text;
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [TEXT]: this.renderText,
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

  // customisable props
  article: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

Role.defaultProps = {
  variant: DEFAULT,
  className: '',

  role: '',

  component: 'span',
  article: false,
};

export default compose(
  withStyles(styles, { name: 'Role' }),
  resaga(CONFIG),
)(Role);
