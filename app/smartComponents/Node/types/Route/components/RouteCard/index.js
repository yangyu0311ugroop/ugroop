import { Can } from 'apis/components/Ability/components/Can';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { MAP } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { ROUTE } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class RouteCard extends PureComponent {
  componentWillMount = () => {
    const { createdBy } = this.props;

    this.route = {
      createdBy,
      type: ROUTE,
    };
  };

  handleShowDetail = showDetail => {
    this.props.resaga.setValue({ showDetail });
  };

  showAllRoutes = () => {
    this.handleShowDetail();
    this.props.resaga.setValue({
      clickId: null,
    });
  };

  openChangeRoute = () => {
    const { templateId, id, parentId } = this.props;

    PORTAL_HELPERS.openAddRoute(
      {
        id,
        templateId,
        parentId,
      },
      this.props,
    );
  };

  confirmDeleteRoute = () => {
    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDeleteRoute(
      {
        onConfirm: this.handleDeleteRoute,
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  handleDeleteRoute = () => {
    const { id, parentId } = this.props;

    return NODE_API_HELPERS.deleteNode(
      {
        nodeId: id,
        parent: parentId,
        childKey: 'routes',
        onSuccess: this.deleteRouteSuccess,
        onError: this.deleteRouteError,
      },
      this.props,
    );
  };

  deleteRouteSuccess = () => {
    const { routes } = this.props;
    const { confirmDeleteDialogId } = this.state;

    this.handleShowDetail();

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);

    if (routes.length) {
      this.handleClick(routes[0]);
    }
  };

  deleteRouteError = () => {
    const { confirmDeleteDialogId } = this.state;

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);
  };

  handleClick = routeId => {
    const { layout, selectedId } = this.props;

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
  };

  goToMapView = () => {
    const { location, history } = this.props;

    const parsedQuery = parseQueryParam(location.search);

    parsedQuery.dayView = MAP;
    const param = stringifyParam(parsedQuery);
    history.replace(`${location.pathname}?${param}`);

    this.props.resaga.setValue({ layout: MAP });
  };

  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer alignItems="center" className={classes.routesNav}>
        <GridItem className={classes.grow}>
          <Button
            dense
            noPadding
            size="extraSmall"
            onClick={this.showAllRoutes}
            className={classnames(classes.routeButton)}
          >
            <GridContainer alignItems="center">
              <GridItem>
                <Icon size="xsmall" icon="lnr-chevron-left" />
              </GridItem>
              <GridItem>Routes</GridItem>
            </GridContainer>
          </Button>
        </GridItem>

        <Can do="update" on={this.route}>
          <GridItem>
            <GridContainer alignItems="center">
              <GridItem>
                <Button
                  size="xs"
                  color="black"
                  onClick={this.openChangeRoute}
                  className={classnames(classes.routeButton)}
                >
                  <Icon icon="lnr-register" size="xsmall" />
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  size="xs"
                  color="black"
                  onClick={this.confirmDeleteRoute}
                  className={classnames(classes.routeButton)}
                >
                  <Icon icon="lnr-trash2" size="xsmall" />
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </Can>
      </GridContainer>
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
  templateId: PropTypes.number,
  id: PropTypes.number,
  parentId: PropTypes.number,

  // resaga props
  selectedId: PropTypes.number,
  createdBy: PropTypes.number,
  routes: PropTypes.array,
  layout: PropTypes.string,
};

RouteCard.defaultProps = {
  routes: [],
};

export default compose(
  withStyles(styles, { name: 'RouteCard' }),
  withRouter,
  resaga(CONFIG),
)(RouteCard);
