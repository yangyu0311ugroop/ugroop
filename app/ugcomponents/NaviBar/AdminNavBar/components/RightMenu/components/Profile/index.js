import { ClickAwayListener, Hidden } from '@material-ui/core';
import { FEEDBACK_EMAIL, URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import Icon from 'ugcomponents/Icon';
import UGProfileMenuItems from 'ugcomponents/NaviBar/AdminNavBar/components/AdminMenuItems/UGProfileMenuItems';
import NavItem from 'ugcomponents/NaviBar/AdminNavBar/components/NavItem';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class Profile extends PureComponent {
  componentWillMount = () => {
    this.personPhotoProps = {
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
    this.list = [
      {
        icon: 'lnr-earth',
        link: `mailto:${FEEDBACK_EMAIL}`,
        key: '5',
        menuName: 'Contact Us',
      },
      {
        icon: 'lnr-phone-outgoing',
        link: URL_HELPERS.ugroopHelpCenter(),
        key: '6',
        menuName: 'Help Center',
      },
    ];
  };

  renderButton = ({ openMenu }) => {
    const { userId } = this.props;

    return (
      <GridContainer alignItems="center" onClick={openMenu} noWrap>
        <GridItem>
          <PersonPhoto id={userId} {...this.personPhotoProps} />
        </GridItem>
        <Hidden smDown>
          <GridItem>
            <GridContainer alignItems="center" spacing={0} noWrap>
              <GridItem>
                <JText dark>
                  <KnownAs id={userId} variant={VARIANTS.VALUE_ONLY} />
                </JText>
              </GridItem>
              <GridItem>
                <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
              </GridItem>
            </GridContainer>
          </GridItem>
        </Hidden>
      </GridContainer>
    );
  };

  renderMenu = ({ closeMenu }) => {
    const { userId } = this.props;

    return (
      <ClickAwayListener onClickAway={closeMenu} mouseEvent="onMouseDown">
        <UGProfileMenuItems id={userId} lists={this.list} onClose={closeMenu} />
      </ClickAwayListener>
    );
  };

  render = () => (
    <NavItem
      title="Profile"
      popper
      renderButton={this.renderButton}
      renderMenu={this.renderMenu}
    />
  );
}

Profile.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  userId: PropTypes.number,
};

Profile.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Profile' }),
  resaga(CONFIG),
)(Profile);
