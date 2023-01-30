import { withStyles } from '@material-ui/core/styles';
import {
  AVATAR,
  AVATAR_AND_NAME,
  AVATAR_AND_NAME_TEXT,
  DEFAULT,
  TEXT,
  VALUE,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import { Avatar, Name } from 'ugcomponents/Person/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class CreatedBy extends PureComponent {
  ownProps = () => {
    const {
      createdBy,
      bold,
      className,
      classes,
      id,
      resaga: rs,
      variant,
      ...props
    } = this.props;

    return props;
  };

  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderAvatar = () => {
    const { createdBy } = this.props;

    if (!createdBy) {
      return null;
    }

    return <Avatar userId={createdBy} {...this.ownProps()} />;
  };

  renderDefault = () => {
    const { createdBy, variant, bold, className } = this.props;

    if (!createdBy) {
      return null;
    }

    return (
      <span className={this.contentClassName()}>
        <Name
          id={createdBy}
          variant={variant}
          bold={bold}
          className={className}
        />
      </span>
    );
  };

  renderText = () => {
    const { createdBy } = this.props;

    return <Name id={createdBy} variant={VALUE} />;
  };

  renderAvatarAndName = () => {
    const { createdBy } = this.props;

    if (!createdBy) {
      return null;
    }

    return (
      <GridContainer alignItems="center">
        <GridItem>
          <Avatar
            userId={createdBy}
            variant={AVATAR}
            xxs
            imageSize={IMAGE_SIZES_CONSTANTS.XXXS}
          />
        </GridItem>
        <GridItem>{this.renderDefault()}</GridItem>
      </GridContainer>
    );
  };

  renderAvatarAndNameText = () => {
    const {
      createdBy,
      className,
      textClassName,
      children,
      classes,
    } = this.props;

    if (!createdBy) {
      return null;
    }

    return (
      <GridContainer
        alignItems="center"
        className={classnames(className, classes.noWrap)}
        wrap="nowrap"
      >
        <GridItem>
          <Avatar
            userId={createdBy}
            variant={AVATAR}
            xxs
            imageSize={IMAGE_SIZES_CONSTANTS.XXXS}
            avatarOnly
          />
        </GridItem>
        <Name
          id={createdBy}
          variant={TEXT}
          bold={false}
          component={GridItem}
          textClassName={textClassName}
          isEllipsis
        />
        {children}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [AVATAR]: this.renderAvatar,
      [TEXT]: this.renderText,
      [AVATAR_AND_NAME]: this.renderAvatarAndName,
      [AVATAR_AND_NAME_TEXT]: this.renderAvatarAndNameText,
      [DEFAULT]: this.renderDefault,
    });
  };
}

CreatedBy.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // node id
  variant: PropTypes.node,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.any,

  // resaga props
  createdBy: PropTypes.number,
};

CreatedBy.defaultProps = {
  variant: '',
  className: '',
  bold: true,

  createdBy: 0,
};

export default compose(
  withStyles(styles, { name: 'CreatedBy' }),
  resaga(CONFIG),
)(CreatedBy);
