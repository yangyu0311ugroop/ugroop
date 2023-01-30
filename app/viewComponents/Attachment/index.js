import { DEFAULT, ICON, POPPER, LIST, LINK } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import Button from 'viewComponents/Button';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { Hidden } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { padFacadeURL } from 'utils/helpers/request';
import AttachmentIcon from './components/Icon';
import styles from './styles';
import Icon from '../Icon';
import Thumbnail from './components/Thumbnail';
import { VARIANTS } from '../../variantsConstants';

export AttachmentIcon from './components/Icon';
export AttachmentBorder from './components/Border';

export class Attachment extends PureComponent {
  state = {
    anchorEl: null,
  };

  componentWillUnmount = () => {
    clearTimeout(this.handleCloseMenu);
  };

  handleClickMenu = ev => {
    if (this.state.anchorEl) {
      this.handleCloseMenu();
    } else {
      this.setState({
        anchorEl: ev.currentTarget,
      });
    }
  };

  handleCloseMenu = () => setTimeout(this.handleClose, 100);

  handleClose = () => this.setState({ anchorEl: null });

  getSeparatorClassName = () => {
    const { classes, darkSeparator } = this.props;
    return classNames(
      classes.separator,
      darkSeparator && classes.darkSeparator,
    );
  };

  handleLinkClick = ev => {
    ev.stopPropagation();
  };

  renderName = () => {
    const { classes, name, link, compact } = this.props;
    return !link ? (
      name || 'No file'
    ) : (
      <a
        className={classNames(classes.link, compact && classes.compact)}
        target="_blank"
        href={padFacadeURL(link)}
        onClick={this.handleLinkClick}
      >
        {name}
      </a>
    );
  };

  renderNameOrDescription = () => {
    const { classes, name, link, compact, description } = this.props;
    return !link ? (
      name || 'No file'
    ) : (
      <a
        className={classNames(classes.link, compact && classes.compact)}
        target="_blank"
        href={padFacadeURL(link)}
        onClick={this.handleLinkClick}
      >
        {description || name}
      </a>
    );
  };

  renderItemLink = (name, link) => {
    const { classes, compact } = this.props;
    return !link ? (
      name || 'No file'
    ) : (
      <a
        className={classNames(classes.link, compact && classes.compact)}
        target="_blank"
        href={`${padFacadeURL(link)}?filename=${name}`}
        onClick={this.handleLinkClick}
      >
        {name}
      </a>
    );
  };

  renderDescription = () => {
    const { description, renderDescription } = this.props;
    return renderDescription ? renderDescription(description) : description;
  };

  renderOneLine = (description, name) => {
    const { classes, createdAt } = this.props;
    return (
      <GridContainer wrap="nowrap" justify="space-between">
        {!!description && (
          <React.Fragment>
            <GridItem className={classes.description}>{description}</GridItem>
            <GridItem className={this.getSeparatorClassName()} />
          </React.Fragment>
        )}
        <GridItem className={classes.name}>{name}</GridItem>
        <GridItem className={classes.name}>{createdAt}</GridItem>
      </GridContainer>
    );
  };

  renderTwoLine = (description, name) => {
    const { classes, createdAt } = this.props;
    return (
      <GridContainer direction="column">
        {!!description && (
          <GridItem className={classes.description}>{description}</GridItem>
        )}
        <GridItem>
          <GridContainer>
            <GridItem className={classes.name}>{name}</GridItem>
            <GridItem className={classes.name}>{createdAt}</GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderIcon = () => {
    const { classes, link } = this.props;
    return (
      <Tooltip title="Open this attachment" placement="top">
        <a
          target="_blank"
          href={padFacadeURL(link)}
          onClick={this.handleLinkClick}
          className={classes.anchorTag}
        >
          <Icon
            icon="paperclip"
            className={classes.checkmark}
            size="small"
            color="lavender"
          />
        </a>
      </Tooltip>
    );
  };

  renderMenuItems = () => {
    const { names, links } = this.props;
    return links.map((link, index) => (
      <MenuItem compact>{this.renderItemLink(names[index], link)}</MenuItem>
    ));
  };

  renderList = () => this.renderMenuItems();

  renderPopperButton = () => (
    <Button
      icon="paperclip"
      iconButton
      variant="borderless"
      color="base"
      size="small"
      onClick={this.handleClickMenu}
      tooltipProps={{
        placement: 'top',
        title: 'Click to see Attachments',
      }}
    />
  );

  renderPopper = () => {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <Popper
        className={classes.popper}
        placement="bottom-start"
        renderButton={this.renderPopperButton}
        anchorEl={anchorEl}
        onClose={this.handleCloseMenu}
      >
        {this.renderMenuItems()}
      </Popper>
    );
  };

  renderThumbnail = () => {
    const { description, name, link, createdAt } = this.props;
    return (
      <Thumbnail
        name={name}
        type=""
        link={link}
        description={description}
        createdAt={createdAt}
      />
    );
  };

  renderDefault = () => {
    const { showIcon, classes, iconSize } = this.props;
    const description = this.renderDescription();
    const name = this.renderName();

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        {showIcon && (
          <GridItem>
            <AttachmentIcon iconSize={iconSize} />
          </GridItem>
        )}
        <GridItem className={classes.grow}>
          <Hidden xsDown>{this.renderOneLine(description, name)}</Hidden>
          <Hidden smUp>{this.renderTwoLine(description, name)}</Hidden>
        </GridItem>
      </GridContainer>
    );
  };

  renderLink = () => {
    const { showIcon, classes, iconSize } = this.props;
    const name = this.renderNameOrDescription();
    return (
      <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
        {showIcon && (
          <GridItem className={classes.linkIconPos}>
            <AttachmentIcon iconSize={iconSize} />
          </GridItem>
        )}
        <GridItem className={classes.links}>{name}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
      [ICON]: this.renderIcon,
      [LIST]: this.renderList,
      [LINK]: this.renderLink,
      [POPPER]: this.renderPopper,
      [VARIANTS.THUMBNAIL]: this.renderThumbnail,
    });
  };
}

Attachment.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  name: PropTypes.any,
  link: PropTypes.any,
  description: PropTypes.any,
  renderDescription: PropTypes.func,
  showIcon: PropTypes.bool,
  compact: PropTypes.bool,
  darkSeparator: PropTypes.bool,
  createdAt: PropTypes.node,
  names: PropTypes.array,
  links: PropTypes.array,
  iconSize: PropTypes.string,
};

Attachment.defaultProps = {
  name: null,
  link: null,
  description: null,
  renderDescription: null,
  showIcon: true,
  compact: false,
  darkSeparator: false,
  names: [],
  links: [],
  iconSize: 'extraSmall',
};

export default compose(withStyles(styles, { name: 'Attachment' }))(Attachment);
