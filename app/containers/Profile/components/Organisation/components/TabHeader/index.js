import PropTypes from 'prop-types';
import {
  TAB_ITEMS_ORGANISATION,
  DEFAULT_ORGANISATION_TAB_INDEX,
  ORGANISATION_TAB_ITEM_KEYS,
  SCHOOL_ORG_TYPE,
} from 'containers/Profile/constants';
import { stringifyParam, parseQueryParam } from 'utils/helpers/url';
import { withRouter } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { withStyles } from '@material-ui/core/styles';
import { URL_HELPERS } from 'appConstants';
import GridItem from 'components/GridItem';
import { VARIANTS } from 'variantsConstants';
import MenuItem from 'components/Popper/components/MenuItem';
import OrganisationList from 'smartComponents/Users/components/OrganisationList';
import { Hidden } from '@material-ui/core';
import Popper from 'components/Popper';
import GridContainer from 'components/GridContainer';
import Icon from 'ugcomponents/Icon';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import TourCount from 'smartComponents/Organisation/parts/TourCount';
import styles from './styles';
import { CONFIG } from './config';

export class ProfileTabHeader extends PureComponent {
  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
  };

  handleTabChange = item => () => {
    const { history, location } = this.props;
    const index = item.id;
    const parsedParams = parseQueryParam(location.search);

    parsedParams.tab = index;

    const stringified = stringifyParam(parsedParams);
    history.push(`${location.pathname}?${stringified}`);
  };

  onClickRenderPage = item => () => {
    const { history, location } = this.props;
    const index = item.id;
    const parsedParams = parseQueryParam(location.search);
    parsedParams.tab = index;
    const stringified = stringifyParam(parsedParams);

    history.push(`${location.pathname}?${stringified}`);
  };

  getTabItems = () => {
    const { orgType, userId, orgCreatedBy, orgOwnerIdViaNode } = this.props;
    const orgOwner = orgCreatedBy != null ? orgCreatedBy : orgOwnerIdViaNode;
    const tabItems = TAB_ITEMS_ORGANISATION.filter(items => items);
    tabItems[ORGANISATION_TAB_ITEM_KEYS.SCHOOL].hidden =
      orgType !== SCHOOL_ORG_TYPE;
    tabItems[ORGANISATION_TAB_ITEM_KEYS.SUBSCRIPTION].hidden =
      userId !== orgOwner;
    return tabItems.filter(item => !item.hidden);
  };

  renderItems = (closeMenu, isMobile) => {
    const { location, classes } = this.props;
    const parsedUrl = parseQueryParam(location.search);
    const activeLink = Number(parsedUrl.tab) || DEFAULT_ORGANISATION_TAB_INDEX;
    const tabItems = this.getTabItems();
    const activeLinkText = tabItems.map(item =>
      activeLink === item.id ? item.label : '',
    );

    if (isMobile) {
      return tabItems.map(item => (
        <GridItem key={item.id}>
          <MenuItem
            onClick={this.onClickRenderPage(item)}
            closeMenu={closeMenu}
            selected={activeLinkText.includes(item.label)}
          >
            {item.label}
          </MenuItem>
        </GridItem>
      ));
    }

    return tabItems.map(item => (
      <GridItem xs={6} sm={6} md={12} key={item.id}>
        <Button
          onClick={this.handleTabChange(item)}
          variant={VARIANTS.INLINE}
          dense
          className={activeLink === item.id ? classes.active : classes.link}
        >
          {item.label}
        </Button>
      </GridItem>
    ));
  };

  renderOrgList = () => {
    const { classes, id } = this.props;
    return (
      <>
        <GridItem xs={6} sm={6} md={12} className={classes.orgHeaderTitle}>
          Other Organisations
        </GridItem>
        <GridItem xs={6} sm={6} md={12}>
          <OrganisationList
            overlay
            canCreate={false}
            excludeOrg={[id, -1]}
            redirectToUrl={URL_HELPERS.orgSettings}
          />
        </GridItem>
      </>
    );
  };

  renderSettingTabDropDownButton = ({ openMenu }) => {
    const { classes, location } = this.props;
    const parsedUrl = parseQueryParam(location.search);
    const activeLink = Number(parsedUrl.tab) || DEFAULT_ORGANISATION_TAB_INDEX;
    const tabItems = this.getTabItems();
    const activeLinkText = tabItems.map(item =>
      activeLink === item.id ? item.label : '',
    );
    return (
      <GridContainer
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        card
        spacing={0}
        dense
      >
        <GridItem xs={12}>
          <Button
            noMargin
            size="base"
            color="normal"
            onClick={openMenu}
            className={classes.menuButton}
          >
            {activeLinkText}
            <Icon
              size="xsmall"
              icon="lnr-chevron-down"
              className={classes.addMarginLeft}
            />
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  renderSettingTabDropDownMenu = ({ closeMenu }) => (
    <>{this.renderItems(closeMenu, true)}</>
  );

  renderSettingTabDropDown = () => (
    <Popper
      placement="bottom-end"
      renderButton={this.renderSettingTabDropDownButton}
      quarterPadding
      locationProps={this.props.location}
    >
      {this.renderSettingTabDropDownMenu}
    </Popper>
  );

  renderMobile = () => {
    const { classes } = this.props;
    return (
      <>
        <GridItem className={classes.grow}>
          {this.renderSettingTabDropDown()}
        </GridItem>
      </>
    );
  };

  renderOrganisationNameLogo = () => {
    const { id, classes } = this.props;
    return (
      <GridContainer
        spacing={0}
        alignItems="center"
        className={classes.headerOrgTitle}
      >
        <GridItem className={classes.photo}>
          <div className={classes.photoBackground}>
            <OrganisationPhoto
              size={24}
              id={id}
              {...this.photoProps}
              component={GridItem}
            />
          </div>
        </GridItem>
        <GridItem xs>
          <GridContainer
            spacing={2}
            justify="left"
            className={classes.orgCount}
          >
            <GridItem xs className={classes.orgName}>
              <TourCount id={id} variant={VARIANTS.WITH_NAME} />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderOrganisation = () => {
    const { classes } = this.props;
    return (
      <>
        <GridItem xs={6} sm={6} md={12}>
          {this.renderOrganisationNameLogo()}
        </GridItem>
        <GridItem xs={6} sm={6} md={12} className={classes.headerTitle}>
          <GridContainer spacing={0} wrap="wrap" alignItems="center">
            <GridItem>Organisation Settings</GridItem>
          </GridContainer>
        </GridItem>
        {this.renderItems()}
        {this.renderOrgList()}
      </>
    );
  };

  render = () => (
    <>
      <Hidden smDown>{this.renderOrganisation()}</Hidden>
      <Hidden mdUp>{this.renderMobile()}</Hidden>
    </>
  );
}
ProfileTabHeader.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
  orgType: PropTypes.string,
  orgCreatedBy: PropTypes.number,
  orgOwnerIdViaNode: PropTypes.number,
  userId: PropTypes.number,
};

ProfileTabHeader.defaultProps = {
  orgType: '',
  orgCreatedBy: 0,
  userId: 0,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'ProfileTabHeader' }),
  resaga(CONFIG),
)(ProfileTabHeader);
