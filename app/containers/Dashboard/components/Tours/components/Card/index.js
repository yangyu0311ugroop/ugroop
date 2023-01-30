import { Hidden } from '@material-ui/core';
import {
  CARD,
  RECENT,
  STARRED,
  URL_HELPERS,
  COMPRESSED,
  FEATURED,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles, Popover } from 'components/material-ui';
import UGNavLink from 'components/NavLink';
import dotProp from 'dot-prop-immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import Node from 'smartComponents/Node';
import NewTour from 'smartComponents/Node/components/NewTour';
import Organisation from 'smartComponents/Organisation';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import Icon from 'ugcomponents/Icon';
import IconVw from 'viewComponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import _ from 'lodash';
import Tooltip from 'viewComponents/Tooltip';
import { CONFIG, CONFIG2 } from './config';
import styles from './styles';
import m from './messages';

export const hideOrganisations = organisationId => (orgs = []) => {
  if (orgs.indexOf(organisationId) !== -1) {
    return dotProp.delete(orgs, orgs.indexOf(organisationId));
  }

  return orgs.concat(organisationId);
};

export class Card extends PureComponent {
  state = {
    anchorEl: null,
  };

  onOpenPopover = event => this.setState({ anchorEl: event.currentTarget });

  onClose = () => this.setState({ anchorEl: null });

  componentWillMount = () => {
    const { classes } = this.props;

    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
    this.navLinkProps = {
      className: classes.link,
    };
  };

  goToMyTours = id => {
    const { history } = this.props;

    history.push(URL_HELPERS.myTours(id));
  };

  toggleCollapsible = () => {
    const { id, toggleId } = this.props;

    this.props.resaga.setValue({
      hideOrganisations: hideOrganisations(toggleId || id),
    });
  };

  showAllTour = () => {
    const { minimise, toggleId } = this.props;

    if (minimise) {
      if (toggleId === FEATURED) {
        this.props.resaga.setValue({ selectedFeaturedMinimise: true });
      }
      return this.props.resaga.setValue({ selectedOrgId: toggleId });
    }

    if (toggleId === FEATURED) {
      this.props.resaga.setValue({ selectedFeatured: true });
    }

    return this.goToMyTours(toggleId);
  };

  collapsed = () => {
    const { collapsed, minimise, search } = this.props;

    if (search || !minimise) return false;

    return collapsed;
  };

  renderTour = id => {
    const { minimise, children, toggleId, isClickable } = this.props;

    const recent = toggleId === RECENT;
    const showOrganisation = toggleId === RECENT || toggleId === STARRED;
    const nodeId = toggleId === FEATURED ? Number.parseInt(id, 10) : id;

    if (typeof children === 'function') {
      return children({ id, showOrganisation, recent });
    }

    return (
      <Node
        shouldFilter
        recent={recent}
        showOrganisation={showOrganisation}
        id={nodeId}
        key={nodeId}
        variant={(!minimise && CARD) || (minimise && COMPRESSED)}
        personal
        minimise={minimise}
        isClickable={isClickable}
      />
    );
  };

  renderShowAll = () => {
    const {
      classes,
      search,
      id,
      maxRender,
      items,
      toggleId,
      minimise,
      active,
    } = this.props;

    if (
      !id ||
      active ||
      search ||
      this.collapsed() ||
      items.length <= maxRender
    )
      return null;

    if (minimise) {
      return (
        <GridItem key={`${id}footer`} className={classes.grow}>
          <Button
            dense
            noPadding
            size="extraSmall"
            onClick={this.showAllTour}
            className={classnames(classes.collapseButton)}
          >
            Show all ({items.length})
          </Button>
        </GridItem>
      );
    }

    return (
      <GridItem key={`${id}footer`} className={classes.grow}>
        <UGNavLink
          to={URL_HELPERS.myTours(
            LOGIC_HELPERS.ifElse(toggleId === -1, 'personal', id),
          )}
        >
          Show all ({items.length})
        </UGNavLink>
      </GridItem>
    );
  };

  renderTours = () => {
    const {
      search,
      active,
      toggleId,
      items,
      maxRender,
      featuredTours,
      selectedFeatured,
      selectedFeaturedMinimise,
      starredFeatured,
      hasStarredFeatured,
    } = this.props;
    const tourIds = featuredTours ? _.sortBy(Object.keys(featuredTours)) : [];

    if (!tourIds.length && !items.length) {
      return null;
    }

    const starred = toggleId === STARRED;
    const featured = toggleId === FEATURED;

    // show all tours if card is starred or active, or user is searching
    if (starred || search || active) {
      if (
        featured ||
        selectedFeatured ||
        (selectedFeaturedMinimise && !toggleId)
      ) {
        if (hasStarredFeatured) {
          return starredFeatured.map(this.renderTour);
        }
        return tourIds.map(this.renderTour);
      }
      return items.map(this.renderTour);
    }

    if (featured) {
      return tourIds.map(this.renderTour);
    }

    // otherwise show a subset of tours
    return items.slice(0, maxRender).map(this.renderTour);
  };

  renderNewTourButton = ({ onClick }) => {
    const { classes, id, minimise, personal } = this.props;

    if (!id) return null;

    const gridProps = LOGIC_HELPERS.ifElse(
      minimise,
      { xs: 12 },
      { xs: 12, sm: 6, md: 4, lg: 3 },
    );

    const buttonContent = personal ? (
      <M {...m.shareToPersonal} />
    ) : (
      <M {...m.shareToTeam} />
    );

    return (
      <GridItem {...gridProps}>
        <Button
          textAlign="left"
          block
          dense
          noPadding
          size="extraSmall"
          className={classnames(classes.grid, classes.newTourGrid)}
          onClick={onClick}
        >
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <GridContainer alignItems="center">
                <GridItem>
                  <Icon color="success" size="xsmall" bold icon="lnr-plus" />
                </GridItem>
                <GridItem>
                  <span className={classes.newTour}>
                    <M {...m.createNewTour} />
                  </span>
                </GridItem>
              </GridContainer>
            </GridItem>

            <GridItem>
              <span className={classes.newTourSubTitle}>{buttonContent}</span>
            </GridItem>
          </GridContainer>
        </Button>
      </GridItem>
    );
  };

  renderNewTour = () => {
    const { search, toggleId, minimise, id } = this.props;

    // do not show create tour button if searching, or in small view
    if (minimise || search) return null;

    return (
      <NewTour
        organisationId={LOGIC_HELPERS.ifElse(toggleId !== -1, id)}
        userId={LOGIC_HELPERS.ifElse(toggleId === -1, id)}
      >
        {this.renderNewTourButton}
      </NewTour>
    );
  };

  renderCollapseButton = () => {
    const { classes, minimise } = this.props;

    const collapsed = this.collapsed();

    // not collapsible if card is in full mode
    // if somehow card is already collapsed, we need to show it
    if (!minimise && !collapsed) return null;

    const icon = LOGIC_HELPERS.ifElse(
      collapsed,
      'lnr-chevron-right',
      'lnr-chevron-down',
    );
    const title = LOGIC_HELPERS.ifElse(collapsed, 'Expand', 'Collapse');

    return (
      <GridItem title={title}>
        <Button
          dense
          noPadding
          size="extraSmall"
          onClick={this.toggleCollapsible}
          className={classnames(classes.collapseButton)}
        >
          <Icon icon={icon} size="xsmall" bold />
        </Button>
      </GridItem>
    );
  };

  renderStarredHeader = () => {
    const {
      scoped,
      items,
      location,
      hasStarredFeatured,
      starredFeatured,
      classes,
    } = this.props;

    if (!items.length && !starredFeatured.length) {
      return null;
    }

    const collapsed = this.collapsed();

    const starredHeaderText =
      location.pathname === URL_HELPERS.myTours(-1)
        ? 'Starred in personal'
        : 'Starred in organisation';

    const headerText = hasStarredFeatured
      ? 'Starred in featured'
      : starredHeaderText;

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <Icon
            color={LOGIC_HELPERS.ifElse(!collapsed, 'star')}
            size="normal"
            bold
            icon="lnr-star"
          />
        </GridItem>
        <GridItem wrap="nowrap" className={classes.noWrap}>
          {LOGIC_HELPERS.ifElse(scoped, headerText, 'Starred')}
        </GridItem>
      </GridContainer>
    );
  };

  renderRecentHeader = () => {
    const collapsed = this.collapsed();

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <Icon
            color={LOGIC_HELPERS.ifElse(!collapsed, 'success')}
            size="normal"
            bold
            icon="lnr-eye"
          />
        </GridItem>
        <GridItem className="j-text-ellipsis">Recently Viewed</GridItem>
      </GridContainer>
    );
  };

  renderFeaturedHeader = () => {
    const collapsed = this.collapsed();

    return (
      <GridContainer alignItems="center">
        <GridItem>
          <Icon
            color={LOGIC_HELPERS.ifElse(!collapsed, 'success')}
            size="normal"
            bold
            icon="lnr-earth"
          />
        </GridItem>
        <GridItem>Featured Tours</GridItem>
      </GridContainer>
    );
  };

  renderPersonalHeader = () => {
    const { id, minimise, classes } = this.props;

    return (
      <GridContainer alignItems="center">
        {!minimise && (
          <GridItem>
            <PersonPhoto id={id} {...this.photoProps} />
          </GridItem>
        )}
        <GridItem className={classes.orgNameContainer}>
          <KnownAs
            id={id}
            variant={VARIANTS.STRING_ONLY}
            className={classes.cardKnownAsEllipsis}
            ellipsis
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderPersonalButtons = () => {
    const { classes, minimise } = this.props;

    const folderTooltip =
      'Save time and organise your travel in folders just like you would all your other stuff';
    const checklistTooltip =
      'Remember to tick of all the things to do and by when and use them again and again with master checklists.';
    const settingsTooltip = 'Manage your personal settings';

    // no buttons if card is in minimise mode
    if (minimise) return null;

    const collapsed = this.collapsed();

    return (
      <>
        <GridItem>
          <UGNavLink to={URL_HELPERS.tours()} {...this.navLinkProps}>
            <Button
              dense
              noPadding
              size="extraSmall"
              className={classnames(
                classes.navButton,
                LOGIC_HELPERS.ifElse(collapsed, classes.gray),
              )}
            >
              <Tooltip placement="top" title={folderTooltip}>
                {this.renderButtonLabel('Folders', 'lnr-folder')}
              </Tooltip>
            </Button>
          </UGNavLink>
        </GridItem>
        <Hidden xsDown>
          <GridItem wrap="nowrap">
            <UGNavLink to={URL_HELPERS.settings()} {...this.navLinkProps}>
              <Button
                dense
                noPadding
                size="extraSmall"
                className={classnames(
                  classes.navButton,
                  LOGIC_HELPERS.ifElse(collapsed, classes.gray),
                )}
              >
                <Tooltip placement="top" title={settingsTooltip}>
                  {this.renderButtonLabel('Settings', 'lnr-cog')}
                </Tooltip>
              </Button>
            </UGNavLink>
          </GridItem>
        </Hidden>
        <Hidden xsDown>
          <GridItem>
            <UGNavLink to={URL_HELPERS.checklists()} {...this.navLinkProps}>
              <Button
                dense
                noPadding
                size="extraSmall"
                className={classnames(
                  classes.navButton,
                  LOGIC_HELPERS.ifElse(collapsed, classes.gray),
                )}
              >
                <Tooltip placement="top" title={checklistTooltip}>
                  {this.renderButtonLabel('Checklists', 'ug-pin-3')}
                </Tooltip>
              </Button>
            </UGNavLink>
          </GridItem>
        </Hidden>
      </>
    );
  };

  renderOrganisationHeader = () => {
    const { id, minimise } = this.props;

    return <Organisation id={id} minimise={minimise} />;
  };

  renderMorePopper = (organisation = true) => {
    const { classes, id } = this.props;
    const { anchorEl } = this.state;
    const collapsed = this.collapsed();

    return (
      <React.Fragment>
        <Button
          dense
          noPadding
          size="extraSmall"
          className={classnames(
            classes.navButton,
            LOGIC_HELPERS.ifElse(collapsed, classes.gray),
          )}
          onClick={this.onOpenPopover}
        >
          ...
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {organisation && (
            <GridItem wrap="nowrap">
              <UGNavLink to={URL_HELPERS.orgPeople(id)} {...this.navLinkProps}>
                <Button dense size="extraSmall" className={classes.popOverItem}>
                  {this.renderButtonLabel('People', 'lnr-users-plus')}
                </Button>
              </UGNavLink>
            </GridItem>
          )}
          <GridItem>
            <UGNavLink
              to={
                organisation
                  ? URL_HELPERS.orgSettings(id)
                  : URL_HELPERS.settings()
              }
              {...this.navLinkProps}
            >
              <Button dense size="extraSmall" className={classes.popOverItem}>
                {this.renderButtonLabel('Settings', 'lnr-cog')}
              </Button>
            </UGNavLink>
          </GridItem>
          <GridItem wrap="nowrap">
            <UGNavLink
              to={
                organisation
                  ? URL_HELPERS.orgChecklists(id)
                  : URL_HELPERS.checklists()
              }
              {...this.navLinkProps}
            >
              <Button dense size="extraSmall" className={classes.popOverItem}>
                {this.renderButtonLabel('Checklists', 'ug-pin-3')}
              </Button>
            </UGNavLink>
          </GridItem>
        </Popover>
      </React.Fragment>
    );
  };

  renderButtonLabel = (label, icon) => {
    const { classes } = this.props;
    return (
      <GridContainer wrap="nowrap">
        <GridItem>
          <IconVw color="blue" size="xsmall" bold icon={icon} />
        </GridItem>
        <GridItem className={classes.noWrap}>{label}</GridItem>
      </GridContainer>
    );
  };

  // no buttons if card is in minimise mode
  renderOrganisationButtons = () => {
    const { classes, id, minimise, paxLabel } = this.props;

    const folderTooltip =
      'Save time and organise your travel in folders just like you would all your other stuff';
    const checklistTooltip =
      'Remember to tick of all the things to do and by when and use them again and again with master checklists.';
    const peopleTooltip =
      'Manage your team in your organisation as they come and go into the workflow.';
    const settingsTooltip = 'Manage your settings for this organisation';
    const contactToolTip = `Manage your ${paxLabel}`;

    if (minimise) return null;

    const collapsed = this.collapsed();

    return (
      <>
        <GridItem>
          <UGNavLink to={URL_HELPERS.orgTours(id)} {...this.navLinkProps}>
            <Button
              dense
              noPadding
              size="extraSmall"
              className={classnames(
                classes.navButton,
                LOGIC_HELPERS.ifElse(collapsed, classes.gray),
              )}
            >
              <Tooltip placement="top" title={folderTooltip}>
                {this.renderButtonLabel('Folders', 'lnr-folder')}
              </Tooltip>
            </Button>
          </UGNavLink>
        </GridItem>
        <Hidden xsDown>
          <GridItem wrap="nowrap">
            <UGNavLink
              to={URL_HELPERS.orgChecklists(id)}
              {...this.navLinkProps}
            >
              <Button
                dense
                noPadding
                size="extraSmall"
                className={classnames(
                  classes.navButton,
                  LOGIC_HELPERS.ifElse(collapsed, classes.gray),
                )}
              >
                <Tooltip placement="top" title={checklistTooltip}>
                  {this.renderButtonLabel('Checklists', 'ug-pin-3')}
                </Tooltip>
              </Button>
            </UGNavLink>
          </GridItem>
          <GridItem wrap="nowrap">
            <UGNavLink to={URL_HELPERS.orgPeople(id)} {...this.navLinkProps}>
              <Button
                dense
                noPadding
                size="extraSmall"
                className={classnames(
                  classes.navButton,
                  LOGIC_HELPERS.ifElse(collapsed, classes.gray),
                )}
              >
                <Tooltip placement="top" title={peopleTooltip}>
                  {this.renderButtonLabel('Our Team', 'lnr-users-plus')}
                </Tooltip>
              </Button>
            </UGNavLink>
          </GridItem>
          <GridItem wrap="nowrap">
            <UGNavLink to={URL_HELPERS.orgContacts(id)} {...this.navLinkProps}>
              <Button
                dense
                noPadding
                size="extraSmall"
                className={classnames(
                  classes.navButton,
                  LOGIC_HELPERS.ifElse(collapsed, classes.gray),
                )}
              >
                <Tooltip placement="top" title={contactToolTip}>
                  {this.renderButtonLabel(paxLabel, 'lnr-contacts')}
                </Tooltip>
              </Button>
            </UGNavLink>
          </GridItem>
          <GridItem wrap="nowrap">
            <UGNavLink to={URL_HELPERS.orgSettings(id)} {...this.navLinkProps}>
              <Button
                dense
                noPadding
                size="extraSmall"
                className={classnames(
                  classes.navButton,
                  LOGIC_HELPERS.ifElse(collapsed, classes.gray),
                )}
              >
                <Tooltip placement="top" title={settingsTooltip}>
                  {this.renderButtonLabel('Settings', 'lnr-cog')}
                </Tooltip>
              </Button>
            </UGNavLink>
          </GridItem>
        </Hidden>
      </>
    );
  };

  renderOrganisationButtonsView = () => {
    const { isDrawer } = this.props;
    return (
      <React.Fragment>
        {this.renderOrganisationButtons()}
        <Hidden smUp>{isDrawer ? null : this.renderMorePopper()}</Hidden>
      </React.Fragment>
    );
  };

  renderPersonalButtonView = () => {
    const { isDrawer } = this.props;
    return (
      <React.Fragment>
        {this.renderPersonalButtons()}
        <Hidden smUp>{isDrawer ? null : this.renderMorePopper(false)}</Hidden>
      </React.Fragment>
    );
  };

  renderUpdatedAt = () => {
    const { classes, toggleId, minimise, updatedAt } = this.props;

    if (!updatedAt) return null;
    if (minimise) return null;

    return (
      (toggleId === -1 || toggleId > 0) && (
        <Hidden smDown>
          <>
            <GridItem xs />
            <GridItem
              title={`Last tour updated: ${MOMENT_HELPERS.renderDayDate(
                updatedAt,
              )} at ${MOMENT_HELPERS.renderTime(updatedAt)}`}
              className={classes.tourSubTitle}
            >
              {MOMENT_HELPERS.timeSinceAtLeast(
                updatedAt,
                undefined,
                undefined,
                {
                  prefix: 'Updated ',
                  postfix: ' ago',
                  hour: 24 * 30, // follow github to show up to 30 days
                  renderFn: MOMENT_HELPERS.renderTimeSinceCalendar,
                },
              )}
            </GridItem>
          </>
        </Hidden>
      )
    );
  };

  renderHeader = () => {
    const {
      classes,
      active,
      toggleId,
      renderHeader,
      first,
      minimise,
      featuredTours,
      selectedFeaturedMinimise,
    } = this.props;
    const tourIds = featuredTours ? _.sortBy(Object.keys(featuredTours)) : [];

    const collapsed = this.collapsed();
    let header;
    let buttons;

    if (typeof renderHeader === 'function') {
      header = renderHeader({ collapsed });
    } else if (
      (selectedFeaturedMinimise && toggleId === STARRED) ||
      toggleId === STARRED
    ) {
      header = this.renderStarredHeader();
      if (!header) {
        return null;
      }
    } else if (
      toggleId === FEATURED ||
      (selectedFeaturedMinimise && !toggleId)
    ) {
      if (!tourIds.length) {
        return null;
      }
      header = this.renderFeaturedHeader();
    } else if (toggleId === RECENT) {
      header = this.renderRecentHeader();
    } else if (toggleId === -1) {
      header = this.renderPersonalHeader();
      buttons = this.renderPersonalButtonView();
    } else {
      header = this.renderOrganisationHeader();
      buttons = this.renderOrganisationButtonsView();
    }

    header = (
      <div
        className={classnames(
          classes.heading,
          LOGIC_HELPERS.ifElse(collapsed, classes.gray),
        )}
      >
        {header}
      </div>
    );

    // only clickable if card is not active
    if (!active) {
      header = (
        <Button
          textAlign="left"
          dense
          noPadding
          size="extraSmall"
          onClick={this.showAllTour}
          className={classnames(classes.collapseButton)}
        >
          {header}
        </Button>
      );
    }

    return (
      <GridContainer
        alignItems="center"
        className={classnames(
          LOGIC_HELPERS.ifElse(
            minimise,
            classes.minimiseHeadingGrid,
            classes.headingGrid,
          ),
          LOGIC_HELPERS.ifElse(first, classes.firstHeading),
        )}
        wrap="nowrap"
        spacing={LOGIC_HELPERS.ifElse(minimise, 0, 1)}
      >
        {this.renderCollapseButton()}
        <GridItem>{header}</GridItem>
        {buttons}
        {this.renderUpdatedAt()}
      </GridContainer>
    );
  };

  render = () => {
    const {
      classes,
      active,
      renderStars,
      items,
      id,
      minimise,
      featuredTours,
    } = this.props;

    const tourIds = featuredTours ? _.sortBy(Object.keys(featuredTours)) : [];

    // do not show empty card in minimise mode
    if (minimise && !items.length && !tourIds.length) {
      return null;
    }

    const collapsed = this.collapsed();
    const stars =
      active && LOGIC_HELPERS.ifFunction(renderStars, [{ scope: items }]);

    return (
      <>
        {stars}
        <GridItem key={`${id}header`}>{this.renderHeader()}</GridItem>
        {!collapsed && (
          <GridItem
            key={`${id}body`}
            className={classnames(classes.grow, classes.width100)}
          >
            <GridContainer spacing={LOGIC_HELPERS.ifElse(minimise, 0, 2)}>
              {this.renderTours()}
              {this.renderNewTour()}
            </GridContainer>
          </GridItem>
        )}
        {this.renderShowAll()}
      </>
    );
  };
}

Card.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object,

  // parent props
  id: PropTypes.number,
  children: PropTypes.func,
  renderStars: PropTypes.func,
  content: PropTypes.node,
  renderHeader: PropTypes.func,
  collapsed: PropTypes.bool,
  active: PropTypes.bool,
  scoped: PropTypes.bool,
  toggleId: PropTypes.any,
  personal: PropTypes.bool,
  hasStarredFeatured: PropTypes.bool,
  isDrawer: PropTypes.bool,
  isClickable: PropTypes.bool,

  // resaga props
  ids: PropTypes.array,
  items: PropTypes.array,
  search: PropTypes.string,
  updatedAt: PropTypes.string,
  featuredTours: PropTypes.object,
  selectedFeatured: PropTypes.bool,
  selectedFeaturedMinimise: PropTypes.bool,
  starredTours: PropTypes.array,
  starredFeatured: PropTypes.array,

  maxRender: PropTypes.number,
  first: PropTypes.bool,
  minimise: PropTypes.bool,
  showOrganisation: PropTypes.bool,
  paxLabel: PropTypes.string,
};

Card.defaultProps = {
  selectedFeaturedMinimise: false,
  selectedFeatured: false,
  ids: [],
  items: [],
  paxLabel: 'PAX',
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'Card' }),
  resaga(CONFIG),
  resaga(CONFIG2),
)(Card);
