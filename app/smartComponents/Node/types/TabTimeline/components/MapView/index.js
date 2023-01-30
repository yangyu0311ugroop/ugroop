import { Hidden } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import { MAP_VIEW, ROUTE_CONTENT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import Navigator from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabDayView/components/Navigator';
import RenderDay from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Routes from 'smartComponents/Node/components/Routes';
import Route from 'smartComponents/Node/types/Route';
import LayoutSelect from 'smartComponents/Node/types/TabTimeline/components/LayoutSelect';
import Icon from 'ugcomponents/Icon';
import { ROUTE } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { CONFIG, DAY_IDS_CONFIG } from './config';
import styles from './styles';

export class MapView extends PureComponent {
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

  renderLeft = () => {
    const { id, dayIds } = this.props;

    return (
      <GridContainer direction="column">
        <Routes
          variant={ROUTE_CONTENT}
          id={id}
          parentId={id}
          ids={dayIds}
          showIndex
          showActive
          autoSelect
        />
      </GridContainer>
    );
  };

  renderContent = () => {
    const { classes, templateId, id, dayIds, selectedId, clickId } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer card dense direction="column">
            <GridItem className={classes.relative}>
              <Route // key={selectedId}
                id={selectedId}
                index={dayIds.indexOf(selectedId)}
                parentId={id}
                templateId={templateId}
                className={classes.content}
                variant={MAP_VIEW}
                size="md"
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer alignItems="center" justify="center">
            <GridItem>
              <Navigator
                route
                id={templateId}
                tabId={id}
                clickId="clickId"
                routeId={selectedId}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        {clickId > 0 && dayIds.indexOf(clickId) !== -1 && (
          <GridItem>
            <RenderDay
              tabId={id}
              index={dayIds.indexOf(clickId)}
              dayId={clickId}
              showEventDetail
              marginLeft
            />
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderEmpty = () => {
    const { classes, isPublic } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <Hidden smDown>
            <LayoutSelect isPublic={isPublic} row />
          </Hidden>
          <Hidden mdUp>
            <LayoutSelect isPublic={isPublic} />
          </Hidden>
        </GridItem>
        <GridItem>
          <GridContainer
            card
            direction="column"
            alignItems="center"
            dashed
            className={classes.emptyCard}
          >
            <GridItem>
              <Icon icon="lnr-map-marker" size="large" color="grey" />
            </GridItem>
            {ability.can('create', ROUTE) ? (
              <>
                <GridItem>
                  <div className={classes.subtitle}>
                    Create a route from the location of your days to get
                    detailed, easy-to-follow direction
                  </div>
                </GridItem>
                <GridItem>
                  <Button
                    color="primary"
                    size="xs"
                    weight="bold"
                    className={classes.iphoneWidthBtn}
                    onClick={this.openAddRoute}
                  >
                    <GridContainer
                      direction="row"
                      alignItems="center"
                      justify="center"
                      wrap="noWrap"
                      className={classes.noWrap}
                    >
                      <GridItem>
                        <Icon size="normal" icon="lnr-plus" />
                      </GridItem>
                      <GridItem>Create a route</GridItem>
                    </GridContainer>
                  </Button>
                </GridItem>
              </>
            ) : (
              <GridItem>
                <div className={classes.subtitle}>There are no routes yet</div>
              </GridItem>
            )}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes, routes, isPublic } = this.props;

    if (!routes.length) {
      return this.renderEmpty();
    }

    return (
      <GridContainer direction="column">
        <GridItem>
          <Hidden smDown>
            <LayoutSelect isPublic={isPublic} row />
          </Hidden>
          <Hidden mdUp>
            <LayoutSelect isPublic={isPublic} />
          </Hidden>
        </GridItem>
        <GridItem>
          <GridContainer className={classes.root}>
            <Hidden smDown>
              <GridItem className={classes.left}>{this.renderLeft()}</GridItem>
            </Hidden>
            <Hidden mdUp>
              <GridItem xs={12}>{this.renderLeft()}</GridItem>
            </Hidden>
            <GridItem className={classes.grow}>{this.renderContent()}</GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

MapView.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,
  id: PropTypes.number, // tab id

  // resaga props
  dayIds: PropTypes.array,
  routes: PropTypes.array,
  selectedId: PropTypes.number,
  clickId: PropTypes.number,
  isPublic: PropTypes.bool,

  // customise props
};

MapView.defaultProps = {
  dayIds: [],
  routes: [],
  selectedId: -1,
  clickId: -1,
};

export default compose(
  withStyles(styles, { name: 'MapView' }),
  resaga(DAY_IDS_CONFIG),
  resaga(CONFIG),
)(MapView);
