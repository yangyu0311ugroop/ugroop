import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import { AVATAR, COMPRESSED, DEFAULT, TEXT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Avatar, Name } from 'ugcomponents/Person';
import Icon from 'ugcomponents/Icon/index';
import CompletedAt from '../CompletedAt';
import { CONFIG } from './config';
import styles from './styles';

export class CompletedBy extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderText = () => {
    const { variant, completedBy } = this.props;

    return (
      <span className={this.contentClassName()}>
        <Name id={completedBy} variant={variant} />
      </span>
    );
  };

  renderDefault = () => {
    const { id, completedBy } = this.props;

    return (
      <span className={this.contentClassName()}>
        Completed by <Name id={completedBy} /> <CompletedAt id={id} />
      </span>
    );
  };

  renderCompressed = () => {
    const { component: Component, completedBy } = this.props;

    return (
      <Component className={this.contentClassName()}>
        Completed by <Name id={completedBy} variant={TEXT} />
      </Component>
    );
  };

  renderAvatar = () => {
    const { classes, completedBy, tooltipText } = this.props;

    if (!completedBy) {
      return null;
    }

    return (
      <GridContainer alignItems="center" spacing={0}>
        <GridItem>
          <div className={classes.completedIcon}>
            <Icon icon="lnr-checkmark-circle" color="success" size="normal" />
          </div>
        </GridItem>
        <GridItem>
          <Avatar
            userId={completedBy}
            tooltipText={tooltipText}
            imageSize={IMAGE_SIZES_CONSTANTS.XXXS}
          />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant, completedBy } = this.props;

    if (!completedBy) {
      return null;
    }

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [AVATAR]: this.renderAvatar,
      [COMPRESSED]: this.renderCompressed,
      [TEXT]: this.renderText,
      [DEFAULT]: this.renderDefault,
    });
  };
}

CompletedBy.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.node,
  className: PropTypes.string,
  tooltipText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),

  // resaga props
  completedBy: PropTypes.number,
};

CompletedBy.defaultProps = {
  id: 0,
  variant: '',
  className: '',
  tooltipText: '',
  component: 'span',

  completedBy: 0,
};

export default compose(
  withStyles(styles, { name: 'CompletedBy' }),
  resaga(CONFIG),
)(CompletedBy);
