import { Can } from 'apis/components/Ability/components/Can';
import { MAP, ROUTE_CARD, ROUTE_DETAILS, URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import UGLink from 'components/Link';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { first } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import Scroll from 'react-scroll/modules';
import { compose } from 'redux';
import resaga from 'resaga';
import Route from 'smartComponents/Node/types/Route';
import LayoutSelect from 'smartComponents/Node/types/TabTimeline/components/LayoutSelect';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { ROUTE } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { CONFIG, TEMPLATE_ID } from './config';
import styles from './styles';

export class RouteCard extends PureComponent {
  state = {};

  componentDidMount = () => {
    const { selectedId, routes, autoSelect } = this.props;

    if (!selectedId && routes.length && autoSelect) {
      this.handleClick(first(routes));
    }
  };

  goToMapView = () => {
    const { location, history } = this.props;

    const parsedQuery = parseQueryParam(location.search);

    parsedQuery.dayView = MAP;
    const param = stringifyParam(parsedQuery);
    history.replace(`${location.pathname}?${param}`);

    this.props.resaga.setValue({ layout: MAP });
  };

  handleClick = routeId => {
    const { onClick, layout, selectedId } = this.props;

    if (routeId !== selectedId) {
      this.props.resaga.setValue({
        selectedId: routeId,
      });
    } else {
      this.handleShowDetail(routeId);
    }

    if (layout !== MAP) {
      this.goToMapView();
    }

    LOGIC_HELPERS.ifFunction(onClick, [routeId]);
  };

  handleShowDetail = showDetail => {
    this.props.resaga.setValue({ showDetail });
  };

  openAddRoute = () => {
    const { templateId, id } = this.props;

    PORTAL_HELPERS.openAddRoute(
      {
        templateId,
        parentId: id,
      },
      this.props,
    );
  };

  renderRoute = (routeId, index) => {
    const {
      classes,
      id,
      selectedId,
      templateId,
      routes,
      showActive,
      onClick,
      ...props
    } = this.props;

    return (
      <GridItem key={routeId}>
        <Route
          {...props}
          id={routeId}
          index={index}
          parentId={id}
          templateId={templateId}
          className={classnames(
            classes.routes,
            classes.singleCard,
            // routes.length === 1 ? classes.singleCard : classes.card,
          )}
          simple
          active={showActive && selectedId === routeId}
          onClick={this.handleClick}
          onShowDetail={this.handleShowDetail}
        />
      </GridItem>
    );
  };

  renderNewRouteButton = () => {
    const { classes } = this.props;

    return (
      <Button
        color="primary"
        size="xs"
        className={classes.smallText}
        onClick={this.openAddRoute}
      >
        <GridContainer alignItems="center">
          <GridItem>
            <Icon size="xsmall" icon="lnr-plus" bold />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderHeader = () => {
    const { classes, showIndex, templateId } = this.props;

    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap">
          {showIndex && (
            <GridItem>
              <div className={classes.index}>#</div>
            </GridItem>
          )}
          <Can do="create" on={ROUTE}>
            <GridItem>{this.renderNewRouteButton()}</GridItem>
          </Can>
          <GridItem
            className={classnames(classes.grow)}
            onClick={this.goToMapView}
          >
            <UGLink
              to={`${URL_HELPERS.tours(templateId)}?dayView=map`}
              title="Go to Routes view"
            >
              <div className={classes.header}>Routes</div>
            </UGLink>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderDetail = () => {
    const { id, showDetail } = this.props;

    return (
      <GridItem>
        <Scroll.Element name="RouteDetails">
          <GridContainer direction="column">
            <GridItem>
              <Route id={showDetail} parentId={id} variant={ROUTE_CARD} />
            </GridItem>
            <Route id={showDetail} parentId={id} variant={ROUTE_DETAILS} />
          </GridContainer>
        </Scroll.Element>
      </GridItem>
    );
  };

  render = () => {
    const {
      classes,
      routes,
      className,
      showDetail,
      layout,
      isPublic,
    } = this.props;

    if (isPublic && routes.length === 0) return null;

    if (showDetail && routes.indexOf(showDetail) !== -1 && layout === MAP) {
      return this.renderDetail();
    }

    return (
      <>
        {!showDetail && layout === MAP && (
          <GridItem>
            <LayoutSelect />
          </GridItem>
        )}
        <GridItem>
          <GridContainer
            card
            className={classnames(classes.root, className)}
            direction="column"
          >
            <GridItem>
              <GridContainer direction="column">
                {this.renderHeader()}
                {routes.length > 0 ? (
                  <GridItem>
                    <GridContainer direction="column" spacing={0}>
                      {routes.map(this.renderRoute)}
                    </GridContainer>
                  </GridItem>
                ) : (
                  <GridItem>
                    <div className={classes.noContent}>
                      Plan your journey with uGroop route planner.
                    </div>
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </>
    );
  };
}

RouteCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // tab id
  onClick: PropTypes.func,
  layout: PropTypes.string,
  className: PropTypes.string,
  showActive: PropTypes.bool,
  showIndex: PropTypes.bool,
  autoSelect: PropTypes.bool,
  isPublic: PropTypes.bool,
  showDetail: PropTypes.number,

  // resaga props
  templateId: PropTypes.number,
  selectedId: PropTypes.number,
  routes: PropTypes.array,
};

RouteCard.defaultProps = {
  routes: [],
};

export default compose(
  withStyles(styles, { name: 'RouteCard' }),
  withRouter,
  resaga(TEMPLATE_ID),
  resaga(CONFIG),
)(RouteCard);
