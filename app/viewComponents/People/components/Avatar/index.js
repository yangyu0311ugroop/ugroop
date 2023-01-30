import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import { Popover, withStyles } from 'components/material-ui';
import Tooltip from 'viewComponents/Tooltip';
import MuiAvatar from '@material-ui/core/Avatar';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import { Photo } from 'smartComponents/File/types';
import UserCard from 'ugcomponents/Person/UserCard';
import { InlineButton } from 'ugcomponents/Buttons';
import style from './style';

export class Avatar extends PureComponent {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      anchorEl: event.currentTarget,
    });
    return 0;
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  getStyle = () => {
    const {
      classes,
      className,
      rootClass,
      imgClass,
      xxs,
      xs,
      sm,
      md,
      lg,
    } = this.props;

    // use default styles if not given
    const root = classNames(
      className,
      rootClass || classes.root,
      xxs && classes.xxs,
      xs && classes.xs,
      sm && classes.sm,
      md && classes.md,
      lg && classes.lg,
    );
    const img = classNames(imgClass || classes.img);

    return { root, img };
  };

  getTooltipStyle = () => {
    const { classes, tooltipClass } = this.props;

    return {
      popper: classes.tooltipPopper,
      lightTooltip: tooltipClass || '',
    };
  };

  getFirstAndLastInitials = fullName => {
    const splits = fullName.split(' ');
    const firstInitial = splits[0].slice(0, 1);
    const lastInitial =
      splits.length > 1 ? splits[splits.length - 1].slice(0, 1) : '';
    return `${firstInitial}${lastInitial}`;
  };

  getName = fullName => {
    let name = null;

    if (this.props.displayFirstAndLastInitials) {
      name = this.getFirstAndLastInitials(fullName).toUpperCase();
    } else {
      name = fullName.slice(0, 1).toUpperCase();
    }

    return name || '?';
  };

  renderAvatar = () => {
    const {
      children,
      className,
      fullName,
      profileUrl,
      more,
      showFullName,
      imageSize,
    } = this.props;
    const styles = this.getStyle();
    const name = showFullName ? <p>{fullName}</p> : '';

    // show +N
    if (more) {
      return <MuiAvatar classes={styles}>+{more}</MuiAvatar>;
    }

    if (children) {
      return (
        <div>
          <MuiAvatar classes={styles}>{children}</MuiAvatar>
          {name}
        </div>
      );
    }

    // show Letter Avatar
    if (!profileUrl) {
      return (
        <div>
          <MuiAvatar classes={styles}>{this.getName(fullName)}</MuiAvatar>
          {name}
        </div>
      );
    }

    // Show Profile Picture
    return (
      <div>
        <Photo
          id={profileUrl}
          className={className}
          alt={fullName}
          variant={VARIANTS.READ_ONLY}
          shape={IMAGE_VARIANTS_CONSTANTS.ROUND}
          size={imageSize}
          showImage={this.showPhoto}
        />
        {name}
      </div>
    );
  };

  renderPopover = () => {
    const {
      userId: id,
      updatedEmail,
      anchorOrigin,
      transformOrigin,
      PopoverProps,
      orgId,
      fullName,
      emailBodyLink,
      emailSubjectLink,
      dataStore,
    } = this.props;

    const { anchorEl } = this.state;
    return (
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        disableRestoreFocus
        onClose={this.handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        {...PopoverProps}
      >
        <UserCard
          id={id}
          knownAs={fullName}
          updatedEmail={updatedEmail}
          orgId={orgId}
          close={this.handleClose}
          emailSubjectLink={emailSubjectLink}
          emailBodyLink={emailBodyLink}
          dataStore={dataStore}
        />
      </Popover>
    );
  };

  renderTitleEllipsis = nameString => {
    const { maxCharCountToEllipsis } = this.props;
    const name =
      nameString.length > maxCharCountToEllipsis
        ? `${nameString.substring(0, 30)}...`
        : nameString;
    return name;
  };

  render = () => {
    const {
      classes,
      fullName,
      more,
      enterDelay,
      noTooltip: toolTipProps,
      tooltipText,
      tooltipPlacement,
      showAvatarDetails,
      tooltipClass,
      avatarOnly,
    } = this.props;

    const avatar = this.renderAvatar();

    if (avatarOnly) return avatar;

    const fullname = this.renderTitleEllipsis(fullName);

    let tooltip = LOGIC_HELPERS.ifFunction(
      tooltipText,
      [this.renderTitleEllipsis(fullname)],
      isEmptyString(tooltipText) ? fullname : tooltipText,
    );

    if (more) {
      const plural = more > 0 && 's';
      tooltip = `${more} other${plural}`;
    }

    const renderButton = (
      <InlineButton
        onClick={LOGIC_HELPERS.ifElse(showAvatarDetails, this.handleClick)}
        className={classes.inlineFlex}
        offsetLeft
        offsetRight
      >
        {avatar}
      </InlineButton>
    );

    if (toolTipProps) return <div className={tooltipClass}>{renderButton}</div>;

    return (
      <>
        <Tooltip
          classes={this.getTooltipStyle()}
          placement={tooltipPlacement}
          title={tooltip}
          enterDelay={enterDelay}
          isLight
        >
          {renderButton}
        </Tooltip>
        {this.renderPopover()}
      </>
    );
  };
}

Avatar.propTypes = {
  classes: PropTypes.object.isRequired,

  userId: PropTypes.number, // userId, could be undefined
  email: PropTypes.string,
  personEmail: PropTypes.string,
  updatedEmail: PropTypes.string,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  PopoverProps: PropTypes.object,

  // from resaga
  orgId: PropTypes.number,
  knownAs: PropTypes.string,

  // from parent
  children: PropTypes.any,
  fullName: PropTypes.string,
  profileUrl: PropTypes.string,
  className: PropTypes.string,
  rootClass: PropTypes.string,
  imgClass: PropTypes.string,
  more: PropTypes.number,
  enterDelay: PropTypes.number,
  tooltipClass: PropTypes.string,
  noTooltip: PropTypes.bool,
  showFullName: PropTypes.bool,
  tooltipText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  tooltipPlacement: PropTypes.string,
  displayFirstAndLastInitials: PropTypes.bool,
  imageSize: PropTypes.string,
  showAvatarDetails: PropTypes.bool,
  avatarOnly: PropTypes.bool,
  maxCharCountToEllipsis: PropTypes.number,
  emailSubjectLink: PropTypes.string,
  emailBodyLink: PropTypes.string,
  dataStore: PropTypes.string,

  // size props
  xxs: PropTypes.bool,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
};

Avatar.defaultProps = {
  userId: 0,
  email: '',
  personEmail: '',
  updatedEmail: '',
  children: null,
  fullName: '?',
  profileUrl: '',
  className: null,
  tooltipClass: '',
  rootClass: '',
  imgClass: '',
  more: 0,
  enterDelay: 200,
  noTooltip: false,
  showFullName: false,
  tooltipText: '',
  tooltipPlacement: 'top',
  displayFirstAndLastInitials: true,
  imageSize: IMAGE_SIZES_CONSTANTS.XS,
  maxCharCountToEllipsis: 32,

  anchorOrigin: {
    vertical: 'center',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'center',
    horizontal: 'left',
  },
  PopoverProps: {},

  orgId: 0,
  knownAs: '',

  xxs: true,
  xs: false,
  sm: false,
  md: false,
  lg: false,
};

export default compose(
  withStyles(style, { name: 'smartComponents/People/Avatar' }),
)(Avatar);
