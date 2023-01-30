import { DEFAULT, TEXT, LINK, VALUE } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import JText from 'components/JText';
import A from 'htmlComponents/A';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { InlineButton } from 'ugcomponents/Buttons';
import { Popover } from 'components/material-ui';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import UserCard from '../UserCard';
import { CONFIG } from './config';
import style from './style';

export class Name extends PureComponent {
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

  renderNameString = () => {
    const { id, knownAs, email } = this.props;
    return knownAs || email || `User ${id}`;
  };

  renderName = () => {
    const { classes, id, knownAs, bold } = this.props;

    return (
      <span
        className={classnames(
          classes.name,
          bold && classes.nameBold,
          id && classes.nameLink,
          knownAs && classes.capitalize,
        )}
      >
        <div className="j-text-ellipsis">{this.renderNameString()}</div>
      </span>
    );
  };

  renderText = () => {
    const {
      component: Component,
      classes,
      knownAs,
      bold,
      className,
      textClassName,
      isEllipsis,
    } = this.props;

    const name = this.renderNameString();

    return (
      <Component
        className={classnames(
          !isEllipsis && 'j-text-ellipsis',
          knownAs && classes.capitalize,
          bold && classes.nameBold,
          className,
        )}
        title={name}
      >
        <div className={textClassName}>{name}</div>
      </Component>
    );
  };

  renderPopover = () => {
    const {
      id,
      email,
      anchorOrigin,
      transformOrigin,
      PopoverProps,
      orgId,
      knownAs,
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
          knownAs={knownAs}
          email={email}
          orgId={orgId}
          close={this.handleClose}
        />
      </Popover>
    );
  };

  renderLink = () => {
    const { className, email, shouldRenderNewLink, classes } = this.props;

    if (shouldRenderNewLink) {
      return (
        <>
          <JText
            link
            onClick={this.handleClick}
            ellipsis
            className={classes.newLink}
          >
            {this.renderNameString()}
          </JText>
          {this.renderPopover()}
        </>
      );
    }

    return (
      <span>
        <A
          href={`mailto:${email}`}
          onClick={this.handleClick}
          className={className}
        >
          {this.renderName()}
        </A>
        {this.renderPopover()}
      </span>
    );
  };

  renderProp = () => {
    const { children } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [this.renderNameString()]);
  };

  renderDefault = () => {
    const { classes, className, id } = this.props;

    const name = this.renderName();
    const renderButton = () => (
      <InlineButton
        title="View person card"
        onClick={this.handleClick}
        className={classnames(classes.inlineFlex, className)}
        offsetLeft
        offsetRight
      >
        {name}
      </InlineButton>
    );

    return (
      <span className={className}>
        {id ? renderButton() : name}
        {this.renderPopover()}
      </span>
    );
  };

  render = () => {
    const { id, email, variant } = this.props;

    if (!id && !email) {
      return null;
    }

    return LOGIC_HELPERS.switchCase(variant, {
      [TEXT]: this.renderText,
      [LINK]: this.renderLink,
      [VALUE]: this.renderNameString,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Name.propTypes = {
  classes: PropTypes.object.isRequired,

  // from parent
  className: PropTypes.string,
  children: PropTypes.any,
  component: PropTypes.any,
  id: PropTypes.number, // userId, could be undefined
  email: PropTypes.string,
  variant: PropTypes.string,
  bold: PropTypes.bool,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  PopoverProps: PropTypes.object,
  shouldRenderNewLink: PropTypes.bool,

  // from resaga
  orgId: PropTypes.number,
  knownAs: PropTypes.string,
  textClassName: PropTypes.string,
  isEllipsis: PropTypes.bool,
};

Name.defaultProps = {
  className: '',
  component: 'span',
  children: null,
  id: 0,
  email: '',
  variant: '',
  bold: true,
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
  textClassName: '',
  isEllipsis: false,
};

export default compose(
  withStyles(style, { name: 'Name' }),
  resaga(CONFIG),
)(Name);
