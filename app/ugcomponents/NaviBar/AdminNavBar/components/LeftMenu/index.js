import { Hidden } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { TEMPLATE_ID_CONFIG } from 'apis/components/Node/config';
import { COMPRESSED, URL_HELPERS } from 'appConstants';
import Button from 'viewComponents/Button';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import Tours from 'containers/Dashboard/components/Tours';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { isMobile } from 'react-device-detect';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import Node from 'smartComponents/Node';
import NewTour from 'smartComponents/Node/components/NewTour';
import Organisation from 'smartComponents/Organisation';
import Person from 'smartComponents/Person';
import Icon from 'ugcomponents/Icon';
import QuickAccessTours from 'ugcomponents/NaviBar/AdminNavBar/components/LeftMenu/components/QuickAccessTours';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { VARIANTS } from 'variantsConstants';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PaxLabel from 'smartComponents/Organisation/parts/Preference/parts/PaxLabel';
import { setRecentChannelDrawStatus } from '../../../../../containers/StreamChat/actions';
import { CONFIG, CONFIG_ID } from './config';
import styles from './styles';
import { Popper } from '../../../../../components/Popper';
import MenuItem from '../../../../../components/Popper/components/MenuItem';

export class LeftMenu extends PureComponent {
  state = {
    anchorEl: null,
  };

  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
  };

  openMoreMenu = () => {
    this.setState({ anchorEl: true });
  };

  closeMoreMenu = () => {
    this.setState({ anchorEl: false });
  };

  toggleDrawerKeepOpen = () => {
    if (this.props.chatDrawerKeepOpen) {
      this.props.resaga.setValue({
        chatDrawerKeepOpen: false,
      });
      this.props.setActiveDraw(false);
    }
    this.props.resaga.setValue({
      drawerKeepOpen: RESAGA_HELPERS.toggleValue,
    });
  };

  handleCloseMoreMenu = () => {
    const { drawerKeepOpen } = this.props;

    if (!drawerKeepOpen) {
      this.closeMoreMenu();
    }
  };

  goTo = url => () => {
    const { history } = this.props;

    history.push(url);
  };

  renderPersonal = () => {
    const { classes, userId } = this.props;
    return (
      <GridItem>
        <Button
          displayBlock
          className={classnames(
            classes.context,
            classes.logo,
            classes.contextLogo,
          )}
          onClick={this.goTo(URL_HELPERS.myTours('personal'))}
          variant="inline"
          noMargin
          noPadding
        >
          <Person id={userId} hiddenSm />
        </Button>
      </GridItem>
    );
  };

  renderMoreOptionsButton = ({ openMenu: om }) => (
    <Button
      icon="chevron-down"
      iconButton
      variant="borderless"
      tooltipProps={{
        placement: 'bottom',
        title: 'more navigate options',
      }}
      onClick={om}
      size="xs"
      noMargin
      noPadding
      color="darkgray"
      className={this.props.classes.optionButton}
    />
  );

  redirect = (orgId, category, closeMenu) => () => {
    this.goTo(`/orgs/${orgId}/${category}`)();
    closeMenu();
  };

  moreOptions = organisationId => ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <MenuItem
          key="Folders"
          onClick={this.redirect(organisationId, 'tours', closeMenu)}
        >
          Folders
        </MenuItem>
        <MenuItem
          key="Checklists"
          onClick={this.redirect(organisationId, 'checklists', closeMenu)}
        >
          Checklists
        </MenuItem>
        <MenuItem
          key="People"
          onClick={this.redirect(organisationId, 'people', closeMenu)}
        >
          Our Team
        </MenuItem>
        <MenuItem
          key="Contact"
          onClick={this.redirect(organisationId, 'contacts', closeMenu)}
        >
          <PaxLabel
            orgId={organisationId}
            variant={VARIANTS.STRING_ONLY}
            defaultValue="PAX"
          />
        </MenuItem>
        <MenuItem
          key="Settings"
          onClick={this.redirect(organisationId, 'settings', closeMenu)}
        >
          Settings
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  renderOrganisation = organisationId => {
    const { classes, organisations, match } = this.props;

    if (organisations.indexOf(organisationId) === -1) {
      return this.renderPersonal();
    }
    let moreOptionsButton = null;
    if (URL_HELPERS.isTourPage(match)) {
      moreOptionsButton = (
        <Popper renderButton={this.renderMoreOptionsButton}>
          {this.moreOptions(organisationId)}
        </Popper>
      );
    }
    return (
      <GridItem>
        <ButtonGroup variant="outlined" color="primary">
          <Button
            noMargin
            noPadding
            displayBlock
            className={classnames(
              classes.context,
              classes.logo,
              classes.contextLogo,
              isMobile ? classes.mobileLogoMargin : {},
            )}
            onClick={this.goTo(URL_HELPERS.myTours(organisationId))}
          >
            <Organisation
              id={organisationId}
              hiddenSm
              ellipsisClassName={classes.leftMenuEllipsis}
            />
          </Button>
          {moreOptionsButton}
        </ButtonGroup>
      </GridItem>
    );
  };

  renderTourNode = id => ({ content }) => (
    <GridItem key={id} xs={12}>
      {content}
    </GridItem>
  );

  renderTour = ({ id, recent, showOrganisation }) => {
    const { classes } = this.props;

    return (
      <Node
        shouldFilter
        recent={recent}
        showOrganisation={showOrganisation}
        variant={COMPRESSED}
        key={id}
        onClick={this.handleCloseMoreMenu}
        minimise
        id={id}
        ellipsisClassName={classnames(classes.ellipsisDiv)}
      >
        {this.renderTourNode(id)}
      </Node>
    );
  };

  renderCurrentOrganisation = () => {
    const { match, organisationIdFromNode, organisationIdFromURL } = this.props;

    if (URL_HELPERS.isTourPage(match)) {
      // tour belongs to organisation
      if (organisationIdFromNode > 0) {
        return this.renderOrganisation(organisationIdFromNode);
      }
      // personal tour
      return this.renderPersonal();
    }
    if (URL_HELPERS.isPersonalPage(match)) {
      // personal pages
      return this.renderPersonal();
    }
    if (URL_HELPERS.isOrganisationPage(match)) {
      // organisation pages
      return this.renderOrganisation(organisationIdFromURL);
    }

    // no data, probably still fetching
    return null;
  };

  renderCurrentOrganisationContainer = () => {
    const { match } = this.props;

    return URL_HELPERS.isDashboardPage(match)
      ? null
      : this.renderCurrentOrganisation();
  };

  renderNewTourButton = ({ onClick }) => {
    const { classes } = this.props;

    return (
      <Button
        className={classes.collapseIcon}
        block
        textAlign="left"
        onClick={onClick}
        variant="inline"
        noMargin
        noPadding
      >
        Create new..
      </Button>
    );
  };

  renderNavigationDrawer = () => {
    const { classes, drawerKeepOpen } = this.props;
    const { anchorEl } = this.state;

    if (!anchorEl && !drawerKeepOpen) return null;

    return (
      <Drawer
        open={!!anchorEl || drawerKeepOpen}
        variant={drawerKeepOpen ? 'permanent' : 'temporary'}
        anchor="left"
        onClose={this.closeMoreMenu}
      >
        <div className={classes.drawer}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <div className={classes.drawerHeader}>
                <GridContainer alignItems="center">
                  <GridItem>Travel List</GridItem>
                  <GridItem
                    className={classnames(
                      classes.grow,
                      classes.minHeaderHeight,
                    )}
                  >
                    &nbsp;
                  </GridItem>
                </GridContainer>
              </div>
            </GridItem>

            <Tours isDrawer minimise maxRender={8}>
              {this.renderTour}
            </Tours>

            <GridItem>
              <hr />
              <NewTour minimise onSuccess={this.handleCloseMoreMenu}>
                {this.renderNewTourButton}
              </NewTour>
            </GridItem>
            <GridItem>
              <Button
                className={classes.collapseIcon}
                block
                noPadding
                noMargin
                textAlign="left"
                variant="inline"
                onClick={this.toggleDrawerKeepOpen}
              >
                {LOGIC_HELPERS.ifElse(
                  drawerKeepOpen,
                  "Don't keep this menu open",
                  'Always keep this menu open',
                )}
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Drawer>
    );
  };

  renderHome = () => {
    const { classes, homepage, match, userId } = this.props;

    const url = LOGIC_HELPERS.ifElse(
      userId,
      URL_HELPERS.home(homepage, match),
      URL_HELPERS.index(),
    );

    return (
      <Hidden smDown>
        <GridItem>
          <Button
            className={classnames(classes.context, classes.contextText)}
            onClick={this.goTo(url)}
            variant="inline"
            size="small"
          >
            {/* <PageLogo text /> */}
            <Icon icon="lnr-home3" size="normal" />
          </Button>
        </GridItem>
      </Hidden>
    );
  };

  renderTours = () => {
    const { drawerKeepOpen } = this.props;

    if (drawerKeepOpen) return null;

    return (
      <GridItem>
        <QuickAccessTours openDrawer={this.openMoreMenu} />
      </GridItem>
    );
  };

  // renderExplore = () => {
  //   const { classes } = this.props;
  //
  //   return (
  //     <GridItem>
  //       <InlineButton
  //         className={classnames(classes.context, classes.contextText)}
  //         onClick={this.goTo(URL_HELPERS.explore())}
  //       >
  //         <GridContainer alignItems="center">
  //           <GridItem>
  //             <Icon icon="lnr-earth" bold size="normal" />
  //           </GridItem>
  //           <Hidden smDown>
  //             <GridItem>Explore</GridItem>
  //           </Hidden>
  //         </GridContainer>
  //       </InlineButton>
  //     </GridItem>
  //   );
  // };

  render = () => {
    const { userId } = this.props;

    return (
      <GridItem key="Top Left Menu">
        <GridContainer alignItems="center" noWrap spacing={0}>
          {userId && this.renderTours()}
          {userId && this.renderCurrentOrganisationContainer()}
        </GridContainer>
        {this.renderNavigationDrawer()}
      </GridItem>
    );
  };
}

LeftMenu.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
  setActiveDraw: PropTypes.func,

  // parent props

  // resaga props
  homepage: PropTypes.string,
  organisations: PropTypes.array,
  userId: PropTypes.number,
  organisationIdFromNode: PropTypes.number,
  organisationIdFromURL: PropTypes.number,

  // isLoading
  drawerKeepOpen: PropTypes.bool,
  chatDrawerKeepOpen: PropTypes.bool,
};

LeftMenu.defaultProps = {
  organisations: [],
  match: {},
  userId: 0,
  homepage: URL_HELPERS.myTours(),
};

export function mapDispatchToProps(dispatch) {
  return {
    setActiveDraw: data => dispatch(setRecentChannelDrawStatus(data)),
  };
}

export default compose(
  withStyles(styles, { name: 'LeftMenu' }),
  withRouter,
  connect(
    null,
    mapDispatchToProps,
  ),
  resaga(TEMPLATE_ID_CONFIG),
  resaga(CONFIG_ID),
  resaga(CONFIG),
)(LeftMenu);
