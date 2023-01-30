import { DEFAULT, TEXT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Name from 'smartComponents/Organisation/parts/Name';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class OrganisationName extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderDefault = () => {
    const { orgId } = this.props;

    if (!orgId) {
      return null;
    }

    return (
      <span className={this.contentClassName()}>
        <Name id={orgId} variant={TEXT} />
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

OrganisationName.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,

  // resaga props
  orgId: PropTypes.number,
};

OrganisationName.defaultProps = {
  variant: '',
  className: '',

  orgId: 0,
};

export default compose(
  withStyles(styles, { name: 'OrganisationName' }),
  resaga(CONFIG),
)(OrganisationName);
