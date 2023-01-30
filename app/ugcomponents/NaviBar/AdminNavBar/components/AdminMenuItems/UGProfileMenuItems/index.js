import {
  URL_HELPERS,
  FEEDBACK_EMAIL,
  VIEW_MODE_COPY,
  DO_NOTHING_FUNC,
} from 'appConstants';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import LogoutLink from 'smartComponents/Authentication/components/LogoutLink';
import { FILE_TYPES } from 'smartComponents/File/constants';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';

import Icon from 'viewComponents/Icon';
import { FormattedMessage } from 'react-intl';
import H4 from 'components/H4';
import Divider from '@material-ui/core/Divider';
import UGLink from 'components/Link';
import List from '@material-ui/core/List';
import { ListItem, ListSubheader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import Email from 'smartComponents/Person/parts/Email';
import { VARIANTS } from 'variantsConstants';

import classnames from 'classnames';
import { CloseButton } from 'ugcomponents/DialogForm/Complex';
import Photo from 'smartComponents/Person/parts/Photo';
import { IntercomAPI } from 'react-intercom';
import JText from 'components/JText';
import messages from './messages';
import styleSheet from './style';
import { CONFIG } from '../../config';

export class UGProfileMenuItems extends PureComponent {
  openInterCom = () => {
    IntercomAPI('show');
    this.onClick();
  };

  onClick = () => {
    this.props.resaga.setValue({
      openMenu: false,
    });
    this.props.onClose();
  };

  generateMenu = () => {
    const { classes } = this.props;
    const MenuItems = this.props.lists.map(item => {
      if (item.type && item.type === 'divider') {
        return <Divider key={item.key} className={classes.listDivider} />;
      }

      const Li = (
        <ListItem button className={classes.listItems}>
          <Icon icon={item.icon} className={classes.icon} /> {item.menuName}
        </ListItem>
      );

      if (item.link.includes(`mailto:${FEEDBACK_EMAIL}`)) {
        return (
          <JText
            className={classes.link}
            key={item.key}
            link
            dark
            noUnderlined
            onClick={this.openInterCom}
          >
            {Li}
          </JText>
        );
      }

      if (item.key === '6') {
        return (
          <a href={item.link} target="_blank" className={classes.link}>
            <JText
              className={classes.link}
              key={item.key}
              link
              dark
              noUnderlined
            >
              {Li}
            </JText>
          </a>
        );
      }

      return (
        <UGLink
          to={item.link}
          key={item.key}
          onClick={this.onClick}
          className={classes.link}
        >
          {Li}
        </UGLink>
      );
    });
    return MenuItems;
  };

  subheader = () => {
    const { classes, fetching, smDown, id } = this.props;
    const profilePicture = (
      <div className={classes.avatarImg}>
        <Photo
          type={FILE_TYPES.PHOTO}
          shape={VARIANTS.ROUND}
          variant={VARIANTS.READ_ONLY}
          size={IMAGE_SIZES_CONSTANTS.MEDIUM}
          letterAvatarClassName={classes.avatarLetter}
          id={id}
        />
      </div>
    );
    return (
      <ListSubheader className={classes.avatarDropdown}>
        {!fetching ? profilePicture : <div />}
        <div>
          <H4 className={classes.profileName}>
            <KnownAs
              variant={VARIANTS.STRING_ONLY}
              className={classes.subHeaderKnownAsEllipsis}
              id={this.props.id}
            />
          </H4>
          <p>
            <Email id={this.props.id} variant={VIEW_MODE_COPY} dark />
          </p>
        </div>
        {smDown ? null : this.renderCloseButton()}
      </ListSubheader>
    );
  };

  handleCloseClick = () => {
    this.props.onClose();
  };

  renderCloseButton = () => {
    const { classes } = this.props;
    return (
      <div className={classnames(classes.closeButton)}>
        <CloseButton onClick={this.handleCloseClick}>
          <Icon icon="lnr-cross2" size="xxs" color="white" />
        </CloseButton>
      </div>
    );
  };

  render() {
    let MenuItems = <ListItem />;
    const { classes } = this.props;
    if (this.props.lists) {
      MenuItems = this.generateMenu();
    }
    return (
      <List subheader={this.subheader()}>
        <UGLink
          to={URL_HELPERS.settings()}
          className={classes.listItems}
          onClick={this.onClick}
        >
          <ListItem button className={classes.listItemLinks}>
            <Icon icon="lnr-user" />
            Settings
          </ListItem>
        </UGLink>
        <div>{MenuItems}</div>
        <LogoutLink className={classes.logoutLink}>
          <ListItem button className={classes.listItemLinks}>
            <i className="lnr-exit-left" />
            <FormattedMessage {...messages.logout} />
          </ListItem>
        </LogoutLink>
      </List>
    );
  }
}

UGProfileMenuItems.propTypes = {
  lists: PropTypes.array,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  id: PropTypes.number,
  smDown: PropTypes.bool,
  // resaga
  knownAs: PropTypes.string,
  email: PropTypes.string,
  photo: PropTypes.string,
  metaInfo: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  onClose: PropTypes.func,
};

UGProfileMenuItems.defaultProps = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  rotate: 0,
  scale: 0,
  onClose: DO_NOTHING_FUNC,
};

export default compose(
  withStyles(styleSheet, { name: 'UGProfileMenuItems' }),
  resaga(CONFIG),
  withSMDown,
)(UGProfileMenuItems);
