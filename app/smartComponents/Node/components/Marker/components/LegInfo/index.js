import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  CONFIG,
  PARENT_ID_CONFIG,
} from 'smartComponents/Node/components/Marker/components/LegInfo/config';
import styles from 'smartComponents/Node/components/Marker/components/LegInfo/styles';
import Marker from 'smartComponents/Node/components/Marker/index';
import Location from 'smartComponents/Node/parts/Location';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import Icon from 'ugcomponents/Icon';

export class LegInfo extends PureComponent {
  renderNoLocation = () => {
    const { id, index, prevNodeId, nextNodeId } = this.props;

    if (index === -1) {
      return null;
    }

    return (
      <GridContainer direction="column" alignItems="center">
        <GridItem>
          <GridContainer alignItems="center">
            {prevNodeId > 0 && (
              <>
                <GridItem>
                  <Marker id={prevNodeId} interactive />
                </GridItem>
                <GridItem>
                  <Icon icon="lnr-minus" size="small" />
                </GridItem>
                <GridItem>? km</GridItem>
                <GridItem>
                  <Icon icon="lnr-arrow-right" size="small" />
                </GridItem>
              </>
            )}
            <GridItem>
              <Marker id={id} index={index} />
            </GridItem>
            {nextNodeId > 0 && (
              <>
                <GridItem>
                  <Icon icon="lnr-minus" size="small" />
                </GridItem>
                <GridItem>? km</GridItem>
                <GridItem>
                  <Icon icon="lnr-arrow-right" size="small" />
                </GridItem>
                <GridItem>
                  <Marker id={nextNodeId} interactive />
                </GridItem>
              </>
            )}
          </GridContainer>
        </GridItem>
        <GridItem>
          <Location
            id={id}
            showTooltip={false}
            showIcon={false}
            editable
            noContent="Set a location to alter the route"
          />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const {
      classes,
      location,
      id,
      prevId,
      nextId,
      prevDistance,
      distance,
    } = this.props;

    if (!location) {
      return this.renderNoLocation();
    }

    return (
      <GridContainer
        className={classes.root}
        direction="column"
        spacing={0}
        alignItems="center"
      >
        <GridItem>
          <GridContainer alignItems="center">
            {prevId > 0 && (
              <>
                <GridItem>
                  <Marker id={prevId} interactive />
                </GridItem>
                <GridItem>
                  <Icon icon="lnr-minus" size="small" />
                </GridItem>
                <GridItem>
                  {ROUTE_HELPERS.renderDistance(prevDistance)}
                </GridItem>
                <GridItem>
                  <Icon icon="lnr-arrow-right" size="small" />
                </GridItem>
              </>
            )}
            <GridItem>
              <Marker id={id} interactive />
            </GridItem>
            {nextId > 0 && distance !== -1 && (
              <>
                <GridItem>
                  <Icon icon="lnr-minus" size="small" />
                </GridItem>
                <GridItem>{ROUTE_HELPERS.renderDistance(distance)} </GridItem>
                <GridItem>
                  <Icon icon="lnr-arrow-right" size="small" />
                </GridItem>
                <GridItem>
                  <Marker id={nextId} interactive />
                </GridItem>
              </>
            )}
          </GridContainer>
        </GridItem>
        <GridItem>
          <div>
            <Location id={id} showTooltip={false} showIcon={false} editable />
          </div>
        </GridItem>
      </GridContainer>
    );
  };
}

LegInfo.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  index: PropTypes.number,
  prevId: PropTypes.number,
  prevNodeId: PropTypes.number,
  nextId: PropTypes.number,
  nextNodeId: PropTypes.number,

  // resaga props
  location: PropTypes.string,
  distance: PropTypes.number,
  prevDistance: PropTypes.number,
};

LegInfo.defaultProps = {
  distance: -1,
};

export default compose(
  withStyles(styles, { name: 'LegInfo' }),
  resaga(PARENT_ID_CONFIG),
  resaga(CONFIG),
)(LegInfo);
