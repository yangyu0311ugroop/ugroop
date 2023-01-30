import { Hidden } from '@material-ui/core';
import { CONTENT, ROW } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { first } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { scroller } from 'react-scroll/modules';
import { compose } from 'redux';
import resaga from 'resaga';
import Marker from 'smartComponents/Node/components/Marker';
import CircleMarker from 'smartComponents/Node/components/Marker/components/CircleMarker';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Description from 'smartComponents/Node/parts/Description';
import RouteContent from 'smartComponents/Node/types/Route/components/RouteContent';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { STRING_HELPERS } from 'utils/stringAdditions';
import { CONFIG } from './config';
import styles from './styles';

export class RouteDetails extends PureComponent {
  state = {
    brokenIds: [],
  };

  componentDidMount = () => {
    scroller.scrollTo('RouteDetails');

    const { clickId, markerIds } = this.props;

    if (!clickId && markerIds.length) {
      this.props.resaga.setValue({
        clickId: first(markerIds),
      });
    }
  };

  routeIds = () => {
    const { ids, origin, destination } = this.props;

    return ROUTE_HELPERS.routeIds({ ids, origin, destination });
  };

  renderMarker = (markerId, index) => {
    const { ids, origin } = this.props;
    const originIndex = ids.indexOf(origin);

    return (
      <GridItem key={markerId}>
        <Marker
          variant={ROW}
          id={markerId}
          index={originIndex + index}
          interactive
          showLine
          size="sm"
        />
      </GridItem>
    );
  };

  renderBrokenDay = markerId => (
    <GridItem key={markerId}>
      <Marker variant={ROW} id={markerId} editable />
    </GridItem>
  );

  render = () => {
    const {
      classes,
      id,
      ids,
      origin,
      destination,
      distance,
      markerIds,
    } = this.props;
    const { brokenIds } = this.state;

    const originIndex = ids.indexOf(origin);
    const destinationIndex = ids.indexOf(destination);

    const validRoute = originIndex !== -1 && destinationIndex !== -1;
    const routeIds = this.routeIds();

    return (
      <>
        <GridItem>
          <GridContainer card direction="column">
            <GridItem>
              <NodeProp
                id={id}
                valueKey={CONTENT}
                isCustomData={false}
                showEmpty
              />
            </GridItem>
            <Description id={id} component={GridItem} />
            {!validRoute && (
              <GridItem>
                <GridContainer alignItems="center" className={classes.warning}>
                  <GridItem>
                    <Icon
                      icon="lnr-warning"
                      size="xsmall"
                      color="warning"
                      bold
                    />
                  </GridItem>
                  <GridItem>
                    {LOGIC_HELPERS.ifElse(
                      originIndex === -1,
                      'Origin',
                      'Destination',
                    )}{' '}
                    not found
                  </GridItem>
                </GridContainer>
              </GridItem>
            )}
          </GridContainer>
        </GridItem>

        {brokenIds && brokenIds.length > 0 && (
          <GridItem>
            <GridContainer card dense spacing={0} direction="column">
              <GridItem>
                <GridContainer alignItems="center" className={classes.warning}>
                  <GridItem>
                    <Icon
                      icon="lnr-warning"
                      size="xsmall"
                      color="warning"
                      bold
                    />
                  </GridItem>
                  <GridItem>
                    <div className={classes.heading}>
                      Unrecognised Locations
                    </div>
                  </GridItem>
                </GridContainer>
              </GridItem>
              {brokenIds.map(this.renderBrokenDay)}
            </GridContainer>
          </GridItem>
        )}

        {markerIds && markerIds.length > 0 && (
          <GridItem>
            <GridContainer
              card
              dense
              className={classes.root}
              spacing={0}
              direction="column"
            >
              <GridItem className={classes.heading}>Route Details</GridItem>
              <Hidden smDown>
                <GridItem>
                  <div className={classes.routes}>
                    <GridContainer direction="column" spacing={0}>
                      {routeIds.map(this.renderMarker)}
                    </GridContainer>
                  </div>
                </GridItem>
              </Hidden>
              <Hidden mdUp>
                <GridItem>
                  <GridContainer direction="column" spacing={0}>
                    {this.renderMarker(origin, 0)}
                    <GridItem className={classes.stops}>
                      <GridContainer alignItems="center">
                        <GridItem>
                          <CircleMarker size="sm" line />
                        </GridItem>
                        <GridItem>
                          {routeIds.length}{' '}
                          {STRING_HELPERS.pluralise('stop', routeIds.length)}
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    {this.renderMarker(destination, routeIds.length - 1)}
                  </GridContainer>
                </GridItem>
              </Hidden>
              {validRoute && distance && (
                <GridItem>
                  <RouteContent
                    originIndex={originIndex}
                    destinationIndex={destinationIndex}
                    distance={distance}
                    className={classes.subtitle}
                  />
                </GridItem>
              )}
            </GridContainer>
          </GridItem>
        )}
      </>
    );
  };
}

RouteDetails.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // route id

  // resaga props
  distance: PropTypes.number,
  clickId: PropTypes.number,
  origin: PropTypes.number,
  destination: PropTypes.number,
  ids: PropTypes.array,
  markerIds: PropTypes.array,
};

RouteDetails.defaultProps = {
  ids: [],
  markerIds: [],
};

export default compose(
  withStyles(styles, { name: 'RouteDetails' }),
  resaga(CONFIG),
)(RouteDetails);
