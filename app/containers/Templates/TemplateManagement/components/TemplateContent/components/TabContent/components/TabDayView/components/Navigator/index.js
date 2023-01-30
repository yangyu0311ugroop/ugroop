import { PREVIOUS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import DayNavigator from 'smartComponents/Node/components/DayNavigator';
import LegInfo from 'smartComponents/Node/components/Marker/components/LegInfo';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Navigator extends PureComponent {
  selected = () => {
    const { dayIds, selectedId } = this.props;

    return selectedId > 0 && dayIds.indexOf(selectedId) !== -1;
  };

  selectedIndex = () => {
    const { dayIds, selectedId } = this.props;

    return this.selected() ? dayIds.indexOf(selectedId) : 0;
  };

  renderBottomNavigation = () => {
    const { startDate, dayIds } = this.props;

    const index = this.selectedIndex();
    const showPrev = index > 0;
    const showNext = index < dayIds.length - 1;

    return (
      <GridContainer alignItems="center">
        {showPrev && (
          <GridItem xs={12} sm={LOGIC_HELPERS.ifElse(showNext, 6, 12)}>
            <DayNavigator
              id={dayIds[index - 1]}
              index={index - 1}
              startDate={startDate}
              direction={PREVIOUS}
            />
          </GridItem>
        )}
        {showNext && (
          <GridItem xs={12} sm={LOGIC_HELPERS.ifElse(showPrev, 6, 12)}>
            <DayNavigator
              id={dayIds[index + 1]}
              index={index + 1}
              startDate={startDate}
            />
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderTopNavigation = () => {
    const { classes, dayIds, ongoing, startDate, todayIndex } = this.props;

    const index = this.selectedIndex();

    const buttons = (
      <GridContainer alignItems="center" spacing={0} className={classes.border}>
        <GridItem>
          <DayNavigator
            id={dayIds[index - 1]}
            index={index - 1}
            disabled={index < 1}
            startDate={startDate}
            direction={PREVIOUS}
            className={classes.noBorderLeft}
            minimise
          />
        </GridItem>
        {ongoing && todayIndex !== -1 && (
          <GridItem>
            <DayNavigator
              id={dayIds[todayIndex]}
              index={todayIndex}
              startDate={startDate}
              label="Today"
              minimise
            />
          </GridItem>
        )}
        <GridItem>
          <DayNavigator
            disabled={index > dayIds.length - 2}
            id={dayIds[index + 1]}
            index={index + 1}
            startDate={startDate}
            minimise
          />
        </GridItem>
      </GridContainer>
    );

    return (
      <GridContainer alignItems="center">
        <GridItem xs />
        <GridItem>{buttons}</GridItem>
      </GridContainer>
    );
  };

  renderRouteNavigation = () => {
    const { tabId, dayIds, clickId, hoverId, routeId, markerIds } = this.props;

    const showingId = clickId || hoverId;
    const showingIndex = LOGIC_HELPERS.ifElse(
      markerIds,
      markerIds.indexOf(showingId),
    );

    const prevId = LOGIC_HELPERS.ifElse(
      showingIndex > 0,
      markerIds[showingIndex - 1],
      0,
    );
    const nextId = LOGIC_HELPERS.ifElse(
      showingIndex < markerIds.length,
      markerIds[showingIndex + 1],
      0,
    );

    return (
      <LegInfo
        id={showingId}
        parentId={tabId}
        index={dayIds.indexOf(showingId)}
        routeId={routeId}
        prevId={prevId}
        prevIndex={dayIds.indexOf(prevId)}
        nextId={nextId}
        nextIndex={dayIds.indexOf(nextId)}
      />
    );
  };

  render = () => {
    const { top, route } = this.props;

    if (route) {
      return this.renderRouteNavigation();
    }

    if (top) {
      return this.renderTopNavigation();
    }

    return this.renderBottomNavigation();
  };
}

Navigator.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  top: PropTypes.bool,
  route: PropTypes.bool,

  dayIds: PropTypes.array,
  todayIndex: PropTypes.number,

  // resaga props
  tabId: PropTypes.number,
  clickId: PropTypes.number,
  hoverId: PropTypes.number,
  routeId: PropTypes.number,
  markerIds: PropTypes.array,
  ongoing: PropTypes.bool,
  startDate: PropTypes.string,
  selectedId: PropTypes.number,
};

Navigator.defaultProps = {
  dayIds: [],
  markerIds: [],
  todayIndex: -1,
};

export default compose(
  withStyles(styles, { name: 'Navigator' }),
  withRouter,
  resaga(CONFIG),
)(Navigator);
