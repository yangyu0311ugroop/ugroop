import { InputAdornment } from '@material-ui/core';
import {
  ABILITY_API,
  FIND_MY_TOURS,
  GET_DETAILS,
  GET_RECENT_ACTIVITY,
  PUB_API,
  USER_API,
} from 'apis/constants';
import {
  DO_NOTHING,
  RECENT,
  STARRED,
  URL_HELPERS,
  FEATURED,
  PAGE_HELMETS,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import _, { debounce } from 'lodash';
import intersection from 'lodash/intersection';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import NewTour from 'smartComponents/Node/components/NewTour';
import withStars from 'smartComponents/Node/hoc/withStars';
import withRecent from 'smartComponents/Node/hoc/withRecent';
import OrganisationList from 'smartComponents/Users/components/OrganisationList';
import Form from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import ValidationTextField from 'ugcomponents/Inputs/ValidationTextField';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { Helmet } from 'react-helmet';
import Card from './components/Card';
import { CONFIG } from './config';
import styles from './styles';

export const MAXIMUM_RENDER = 11;

export class Tours extends PureComponent {
  state = {
    loadedOnce: false,
    delayed: false,
  };

  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
  };

  componentDidMount = () => {
    const { minimise } = this.props;
    const { loadedOnce } = this.state;

    // call fetch if never fetched before, or in full view
    if (!minimise || !loadedOnce) {
      this.fetchToursHandler();
    }

    this.delayRender = setTimeout(this.handleDelayed, 1000);
  };

  componentWillUnmount = () => {
    clearTimeout(this.delayRender);
  };

  handleDelayed = () => {
    this.setState({ delayed: true });
  };

  fetchToursHandler = () => {
    const { getRecentActivity } = this.props;

    if (!getRecentActivity) {
      return this.props.resaga.dispatchTo(USER_API, GET_RECENT_ACTIVITY, {
        onSuccess: this.fetchRecentActivity,
      });
    }

    return this.fetchRecentActivity();
  };

  fetchRecentActivity = () => {
    const { loading } = this.props;

    if (!loading) {
      return this.props.resaga.dispatchTo(ABILITY_API, FIND_MY_TOURS, {
        onSuccess: this.handleFindToursSuccess,
      });
    }

    return DO_NOTHING;
  };

  cleanUp = (ids = []) => (store = []) =>
    store.filter(node => ids.includes(node));

  handleFindToursSuccess = ({ require }) => {
    if (!require) return null;

    const { userIds = [], organisationIds = [], nodeIds = [] } = require;
    if (!userIds.length && !organisationIds.length) return null;
    // Cleanup stars
    this.props.resaga.setValue({
      stars: this.cleanUp(nodeIds),
    });

    return this.props.resaga.dispatchTo(PUB_API, GET_DETAILS, {
      payload: require,
      onSuccess: this.loadedOnce,
    });
  };

  loadedOnce = () => {
    this.setState({ loadedOnce: true });
  };

  handleSearch = value => {
    if (!this.debouncedChangeSearch) {
      this.debouncedChangeSearch = debounce(this.changeSearch, 300);
    }
    // will debounce
    this.debouncedChangeSearch(value);
  };

  changeSearch = search => {
    this.props.resaga.setValue({ search });
  };

  clearSearch = () => {
    this.props.resaga.setValue({ search: '' });
  };

  clearSelectedOrg = () => {
    const {
      minimise,
      history,
      selectedFeatured,
      selectedFeaturedMinimise,
    } = this.props;

    if (minimise) {
      if (selectedFeatured) {
        this.props.resaga.setValue({ selectedFeatured: false });
      }
      return this.props.resaga.setValue({ selectedOrgId: undefined });
    }

    if (selectedFeatured) {
      this.props.resaga.setValue({ selectedFeatured: false });
    }

    if (selectedFeaturedMinimise) {
      this.props.resaga.setValue({ selectedFeaturedMinimise: false });
    }

    return history.push(URL_HELPERS.myTours());
  };

  selectedOrgId = () => {
    const { organisationIdFromURL, selectedOrgId, minimise } = this.props;

    return LOGIC_HELPERS.ifElse(minimise, selectedOrgId, organisationIdFromURL);
  };

  parseId = id => Number(id);

  renderOrganisation = active => id => {
    const {
      children,
      userId,
      minimise,
      maxRender,
      hideOrganisations,
      isDrawer,
    } = this.props;

    let content;

    const props = {
      maxRender,
      minimise,
      active,
      collapsed: hideOrganisations.indexOf(id) !== -1,
    };

    // personal organisation
    if (id === -1) {
      content = (
        <Card
          personal
          id={userId}
          key={`user${id}`}
          toggleId={id}
          renderStars={this.renderStarredCard(true, true)}
          isDrawer={isDrawer}
          isClickable
          {...props}
        >
          {children}
        </Card>
      );
    } else {
      content = (
        <Card
          key={id}
          id={id}
          toggleId={id}
          renderStars={this.renderStarredCard(true, true)}
          isDrawer={isDrawer}
          isClickable
          {...props}
        >
          {children}
        </Card>
      );
    }

    return <Fragment key={id}>{content}</Fragment>;
  };

  renderOrganisations = ({ organisations }) =>
    organisations.map(this.renderOrganisation());

  renderSearchInput = () => {
    const { classes, search } = this.props;

    return (
      <GridItem>
        <div className={classes.searchContainer}>
          <GridContainer alignItems="center">
            <GridItem className={classes.grow}>
              <Form>
                <ValidationTextField
                  name="search"
                  value={search}
                  onChange={this.handleSearch}
                  placeholder="Search by name..."
                  startAdornment={
                    <InputAdornment
                      className={classes.adornment}
                      position="start"
                    >
                      <Icon icon="magnifier" size="small" />
                    </InputAdornment>
                  }
                  endAdornment={
                    search && (
                      <InputAdornment
                        className={classes.adornment}
                        position="end"
                      >
                        <Button
                          dense
                          noPadding
                          size="extraSmall"
                          onClick={this.clearSearch}
                          className={classnames(classes.navButton)}
                        >
                          <Icon icon="lnr-cross" size="small" />
                        </Button>
                      </InputAdornment>
                    )
                  }
                />
              </Form>
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderNewTourButton = ({ onClick }) => (
    <Button color="primary" size="xs" onClick={onClick}>
      New
    </Button>
  );

  renderSearch = () => {
    const { minimise, userId } = this.props;

    if (minimise) {
      return this.renderSearchInput();
    }

    const toggleId = this.selectedOrgId();

    return (
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem>
            <NewTour
              organisationId={LOGIC_HELPERS.ifElse(toggleId !== -1, toggleId)}
              userId={LOGIC_HELPERS.ifElse(toggleId === -1, userId)}
            >
              {this.renderNewTourButton}
            </NewTour>
          </GridItem>
          <GridItem>{this.renderSearchInput()}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderStarredCard = (active, scoped) => ({ scope = [] } = {}) => {
    const {
      search,
      stars,
      children,
      minimise,
      hideOrganisations,
      featuredTours,
      selectedFeatured,
    } = this.props;

    const orgId = this.selectedOrgId();

    const tourIds = featuredTours ? _.sortBy(Object.keys(featuredTours)) : [];
    const parsed = tourIds.map(this.parseId);
    const starredFeatured = scoped ? intersection(stars, parsed) : stars;

    if (!active && search) return null;

    const items = scoped ? intersection(stars, scope) : stars;

    if ((!active && !items.length) || (!active && !starredFeatured.length))
      return null;

    const renderStarredFeatured = orgId === FEATURED || selectedFeatured;

    return (
      <Card
        toggleId={STARRED}
        showOrganisation
        active={active}
        scoped={scoped}
        items={orgId === FEATURED ? starredFeatured : items}
        minimise={minimise}
        collapsed={hideOrganisations.indexOf(STARRED) !== -1}
        hasStarredFeatured={renderStarredFeatured}
        starredFeatured={renderStarredFeatured ? starredFeatured : []}
        isClickable
      >
        {children}
      </Card>
    );
  };

  renderRecentCard = active => {
    const {
      search,
      recent,
      children,
      minimise,
      hideOrganisations,
    } = this.props;

    if (!active && search) return null;
    if (!active && !recent.length) return null;

    return (
      <Card
        toggleId={RECENT}
        showOrganisation
        active={active}
        items={recent}
        minimise={minimise}
        collapsed={hideOrganisations.indexOf(RECENT) !== -1}
        maxRender={LOGIC_HELPERS.ifElse(minimise, 8, 4)}
        isClickable
      >
        {children}
      </Card>
    );
  };

  renderFeaturedCard = active => {
    const { recent, minimise, hideOrganisations, userId } = this.props;

    return (
      <Card
        userId={userId}
        toggleId={FEATURED}
        renderStars={this.renderStarredCard(true, true)}
        showOrganisation
        active={active}
        items={recent}
        minimise={minimise}
        collapsed={hideOrganisations.indexOf(FEATURED) !== -1}
        maxRender={LOGIC_HELPERS.ifElse(minimise, 8, 4)}
        isClickable
      />
    );
  };

  renderBack = orgId => {
    const { classes, minimise, selectedFeatured } = this.props;

    if (!orgId && !selectedFeatured) {
      return null;
    }

    return (
      <GridItem>
        <Button
          dense
          noPadding
          size="extraSmall"
          onClick={this.clearSelectedOrg}
          className={classnames(
            classes.navButton,
            LOGIC_HELPERS.ifElse(minimise, classes.marginTop),
          )}
        >
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Icon size="xsmall" icon="lnr-chevron-left" />
            </GridItem>
            <GridItem>
              <JText dark>Itineraries</JText>
            </GridItem>
          </GridContainer>
        </Button>
      </GridItem>
    );
  };

  renderWhole = () => {
    const { children, minimise, hideOrganisations } = this.props;
    const { delayed } = this.state;

    return (
      <>
        {this.renderStarredCard()()}
        {this.renderRecentCard()}

        {delayed && (
          <OrganisationList
            minimise={minimise}
            renderTour={children}
            hideOrganisations={hideOrganisations}
          >
            {this.renderOrganisations}
          </OrganisationList>
        )}
        {/* {this.renderFeaturedCard()} */}
      </>
    );
  };

  renderContent = orgId => {
    const { selectedFeatured } = this.props;
    if (orgId === STARRED) {
      return this.renderStarredCard(true)();
    }
    if (orgId === RECENT) {
      return this.renderRecentCard(true);
    }
    if (selectedFeatured || orgId === FEATURED) {
      return this.renderFeaturedCard(true);
    }
    if (orgId) {
      return this.renderOrganisation(true)(Number.parseInt(orgId, 10));
    }

    return this.renderWhole();
  };

  renderPesonaTitle = () => {
    const { location } = this.props;
    return LOGIC_HELPERS.ifElse(
      location.pathname === URL_HELPERS.myTours(-1),
      PAGE_HELMETS.PERSONAL_TOURS,
      PAGE_HELMETS.TRAVEL_BOARDS,
    );
  };

  render = () => {
    const { minimise, orgName } = this.props;

    const orgId = this.selectedOrgId();

    const isHelmetTitle = Number.isNaN(orgId)
      ? PAGE_HELMETS.MY_TOURS
      : orgId === -1;
    const helmetTitle = isHelmetTitle
      ? this.renderPesonaTitle()
      : `${orgName} Tours`;

    return (
      <GridContainer
        direction="column"
        spacing={LOGIC_HELPERS.ifElse(minimise, 0)}
      >
        <Helmet
          title={helmetTitle}
          meta={[
            { name: 'description', content: `Description of ${helmetTitle}` },
          ]}
        />
        {this.renderBack(orgId)}

        {this.renderSearch()}

        {this.renderContent(orgId)}
      </GridContainer>
    );
  };
}

Tours.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.func,
  isDrawer: PropTypes.bool,

  // resaga props
  selectedFeatured: PropTypes.bool,
  selectedFeaturedMinimise: PropTypes.bool,
  userId: PropTypes.number,
  stars: PropTypes.array,
  recent: PropTypes.array,
  hideOrganisations: PropTypes.array,
  selectedOrgId: PropTypes.any,
  organisationIdFromURL: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  search: PropTypes.string,
  loading: PropTypes.bool,
  getRecentActivity: PropTypes.bool,
  featuredTours: PropTypes.object,

  // customisable props
  minimise: PropTypes.bool,
  maxRender: PropTypes.number,
  orgName: PropTypes.string,
};

Tours.defaultProps = {
  selectedFeatured: false,
  selectedFeaturedMinimise: false,
  isDrawer: false,
  stars: [],
  recent: [],
  hideOrganisations: [],
  maxRender: MAXIMUM_RENDER,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'Tours' }),
  withStars,
  withRecent,
  resaga(CONFIG),
)(Tours);
