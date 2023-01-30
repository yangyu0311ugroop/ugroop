import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from 'smartComponents/Node/components/Marker/components/CircleMarker/config';
import styles from 'smartComponents/Node/components/Marker/components/CircleMarker/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export class CircleMarker extends PureComponent {
  renderLine = (bottom, hidden) => {
    const { classes, spacing } = this.props;

    return (
      <GridItem>
        <div
          className={classnames(
            classes.line,
            LOGIC_HELPERS.ifElse(bottom, classes.lineBottom, classes.lineTop),
            LOGIC_HELPERS.ifElse(hidden, classes.lineHidden),
            LOGIC_HELPERS.ifElse(spacing, classes.lineSpacing),
          )}
        />
      </GridItem>
    );
  };

  // renderOrigin = () => {
  //   const {
  //     classes,
  //     hovered,
  //     active,
  //     hideSelected,
  //     offset,
  //     className,
  //     spacing,
  //     interactive,
  //     pinOffset,
  //     line,
  //     size,
  //   } = this.props;
  //
  //   const marker = (
  //     <div
  //       title="Starting Point"
  //       className={classnames(
  //         classes.marker,
  //         interactive && classes.markerHover,
  //         pinOffset && classes.pinOffset,
  //         offset && classes.markerOffset,
  //         spacing && classes.spacing,
  //         classes.originBorder,
  //         (hovered || (active && !hideSelected)) && classes.highlight,
  //         classes[`${size}Origin`],
  //         hovered && classes.hovered,
  //         classes[`${size}MarkerHover`],
  //         className,
  //       )}
  //     >
  //       &nbsp;
  //     </div>
  //   );
  //
  //   if (!line) return marker;
  //
  //   return (
  //     <GridContainer direction="column" spacing={0}>
  //       {line && this.renderLine(false, true)}
  //       <GridItem>{marker}</GridItem>
  //       {line && this.renderLine(true)}
  //     </GridContainer>
  //   );
  // };

  renderDestination = () => {
    const {
      classes,
      size,
      active,
      hovered,
      hideSelected,
      offset,
      spacing,
      className,
      interactive,
      pinOffset,
      line,
    } = this.props;

    const isActive = active && !hideSelected;

    const marker = (
      <div
        title="Destination"
        className={classnames(
          classes.marker,
          LOGIC_HELPERS.ifElse(interactive, classes.markerHover),
          LOGIC_HELPERS.ifElse(pinOffset, classes.pinOffset),
          LOGIC_HELPERS.ifElse(offset, classes.markerOffset),
          LOGIC_HELPERS.ifElse(spacing, classes.spacing),
          LOGIC_HELPERS.ifElse(
            [hovered, isActive],
            classes.highlight,
            undefined,
            true,
          ),
          LOGIC_HELPERS.ifElse(hovered, classes.hovered),
          LOGIC_HELPERS.ifElse(hovered, classes.selectedOrigin),
          LOGIC_HELPERS.ifElse([active, !hideSelected], classes.selectedOrigin),
          classes[`${size}Origin`],
          classes[`${size}MarkerHover`],
          LOGIC_HELPERS.ifElse(interactive, classes.destinationHover),
          className,
        )}
      >
        <div
          className={classnames(
            classes.destinationCircle,
            classes[`${size}DestinationCircle`],
          )}
        />
      </div>
    );

    if (!line) return marker;

    return (
      <GridContainer direction="column" spacing={0}>
        {this.renderLine()}
        <GridItem>{marker}</GridItem>
        {this.renderLine(true, true)}
      </GridContainer>
    );
  };

  renderWaypoint = () => {
    const {
      classes,
      index,
      origin,
      destination,
      active,
      hovered,
      hideSelected,
      offset,
      paddingTop,
      className,
      interactive,
      pinOffset,
      size,
      line,
    } = this.props;

    const markerSize = LOGIC_HELPERS.ifElse(
      [hovered || active, size === 'xs'],
      'sm',
      size,
    );

    const isActive = active && !hideSelected;

    const marker = (
      <div
        title="Waypoint"
        className={classnames(
          classes.marker,
          classes.waypoint,
          classes[`${size}MarkerHover`],
          classes[`${markerSize}Waypoint`],
          LOGIC_HELPERS.ifElse(interactive, classes.markerHover),
          LOGIC_HELPERS.ifElse(pinOffset, classes.pinOffset),
          LOGIC_HELPERS.ifElse(offset, classes.markerOffset),
          LOGIC_HELPERS.ifElse(paddingTop, classes.waypointOffset),
          LOGIC_HELPERS.ifElse(
            [hovered, isActive],
            classes.highlight,
            undefined,
            true,
          ),
          LOGIC_HELPERS.ifElse(hovered, classes.hovered),
          LOGIC_HELPERS.ifElse(hovered, classes.selectedWaypoint),
          LOGIC_HELPERS.ifElse(
            [active, !hideSelected],
            classes.selectedWaypoint,
          ),
          LOGIC_HELPERS.ifElse(
            [index + 1 < 10, size === 'sm'],
            classes.paddingLeft,
          ),
          className,
        )}
      >
        {LOGIC_HELPERS.ifElse(markerSize !== 'xs', index + 1 || '')}
      </div>
    );

    if (!line) return marker;

    return (
      <GridContainer direction="column" spacing={0}>
        {this.renderLine(false, origin)}
        <GridItem>{marker}</GridItem>
        {this.renderLine(true, destination)}
      </GridContainer>
    );
  };

  render = () => {
    const { destination, hovered } = this.props;

    // if (origin && !hovered) {
    //   return this.renderOrigin();
    // }
    if (destination && !hovered) {
      return this.renderDestination();
    }

    return this.renderWaypoint();
  };
}

CircleMarker.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  index: PropTypes.number,
  origin: PropTypes.bool,
  destination: PropTypes.bool,
  active: PropTypes.bool,
  hovered: PropTypes.bool,

  // customisable props
  className: PropTypes.string,
  size: PropTypes.string,
  paddingTop: PropTypes.bool,
  interactive: PropTypes.bool,
  pinOffset: PropTypes.bool,
  line: PropTypes.bool,
  spacing: PropTypes.bool,
  hideSelected: PropTypes.bool,
  offset: PropTypes.bool,
};

CircleMarker.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'CircleMarker' }),
  resaga(CONFIG),
)(CircleMarker);
