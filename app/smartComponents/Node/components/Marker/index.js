import { CONTENT, DEFAULT, LINK, ROW } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import CircleMarker from 'smartComponents/Node/components/Marker/components/CircleMarker';
import { CONFIG } from 'smartComponents/Node/components/Marker/config';
import styles from 'smartComponents/Node/components/Marker/styles';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Location from 'smartComponents/Node/parts/Location';
import { InlineButton } from 'ugcomponents/Buttons';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export class Marker extends PureComponent {
  state = {
    hovered: false,
  };

  componentWillReceiveProps = nextProps => {
    const { hovered, hoveredElse, leaveDelay } = this.props;
    const { hovered: hoveredState } = this.state;

    if (nextProps.showDetail) {
      // start hovering
      if (!hovered && nextProps.hovered) {
        this.handleHovered(true);
      }

      // // stop hovering something else, hover active when finish
      // if (hoveredElse && !nextProps.hoveredElse && nextProps.active) {
      //   this.handleHovered(true, 1100);
      // }

      // stop hovering
      if (hovered && !nextProps.hovered) {
        this.handleHovered(false, leaveDelay);
      }

      // start hovering something else
      if (hoveredState && !hoveredElse && nextProps.hoveredElse) {
        this.handleHovered(false);
      }

      // // selected
      // if (!active && nextProps.active) {
      //   this.handleHovered(true);
      // }
      //
      // // stop selected
      // if (active && !nextProps.active) {
      //   this.handleHovered(false);
      // }
    }
  };

  componentWillUnmount = () => {
    clearTimeout(this.cancelHover);
  };

  handleHovered = (hovered, delay) => {
    clearTimeout(this.cancelHover);

    if (delay) {
      this.cancelHover = setTimeout(() => this.handleHovered(hovered), delay);
      return false;
    }

    return this.setState({ hovered });
  };

  handleMouseEnter = () => {
    const { id, hovered } = this.props;

    this.mouseEnter = setTimeout(() => {
      if (!hovered) {
        this.props.resaga.setValue({
          hoverId: id,
        });
      }
      this.mouseEnter = null;
    }, 100);
  };

  handleMouseLeave = () => {
    const { hovered } = this.props;

    if (!hovered) {
      return clearTimeout(this.mouseEnter);
    }

    return this.props.resaga.setValue({
      hoverId: undefined,
    });
  };

  handleClose = () => {
    this.props.resaga.setValue({
      clickId: undefined,
      hoverId: undefined,
    });
  };

  handleMinimise = () => {
    this.handleHovered(false);
  };

  handleClick = () => {
    const { id, active } = this.props;

    if (!active) {
      return this.props.resaga.setValue({
        clickId: id,
        hoverId: undefined,
      });
    }

    return this.props.resaga.setValue({
      clickZoom: RESAGA_HELPERS.toggleValue,
    });
  };

  renderRow = () => {
    const { classes, id, active, editable, interactive } = this.props;
    const { hovered } = this.state;

    return (
      <div
        className={classnames(
          classes.item,
          LOGIC_HELPERS.ifElse(interactive, classes.itemHover),
          LOGIC_HELPERS.ifElse(active, classes.active),
          LOGIC_HELPERS.ifElse(hovered, classes.hovered),
        )}
      >
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem>{this.renderCircle()}</GridItem>
          <GridItem className={classes.grow}>
            <Location
              id={id}
              showTooltip={false}
              showIcon={false}
              link={false}
              editable={editable}
              ellipsis
              ellipsisClassName={classes.ellipsisDiv}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  renderCircle = () => {
    const {
      index,
      showDetail,
      active,
      origin,
      destination,
      spacing,
      interactive,
      showLine,
      size,
      geocode,
    } = this.props;
    const { hovered } = this.state;

    return (
      <CircleMarker
        index={index}
        active={active}
        hovered={hovered}
        origin={origin}
        destination={destination}
        showDetail={showDetail}
        spacing={spacing}
        interactive={interactive}
        pinOffset={geocode}
        line={showLine}
        size={size}
      />
    );
  };

  renderDetail = () => {
    const { classes, id } = this.props;
    const { hovered } = this.state;

    if (!hovered) return null;

    return (
      <div
        className={classnames(
          classes.detailOffset,
          LOGIC_HELPERS.ifElse(hovered, classes.detailHoveredIndex),
        )}
      >
        <div className={classes.placementBottom}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <div className={classes.dayContent}>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <NodeProp
                      id={id}
                      valueKey={CONTENT}
                      editable={false}
                      isCustomData={false}
                    />
                  </GridItem>
                  <GridItem>
                    <Location
                      id={id}
                      editable={false}
                      showIcon={false}
                      showTooltip={false}
                    />
                  </GridItem>
                  <GridItem>
                    <Location id={id} variant={LINK} />
                  </GridItem>
                </GridContainer>
              </div>
            </GridItem>
          </GridContainer>

          <div className={classes.closeButton}>
            <InlineButton color="default" onClick={this.handleMinimise}>
              <Icon icon="lnr-cross2" size="xsmall" />
            </InlineButton>
          </div>
        </div>
      </div>
    );
  };

  render = () => {
    const { variant, interactive, showDetail } = this.props;

    let marker = LOGIC_HELPERS.switchCase(variant, {
      [ROW]: this.renderRow,
      [DEFAULT]: this.renderCircle,
    });

    if (showDetail) {
      marker = (
        <>
          {marker}
          {this.renderDetail()}
        </>
      );
    }

    if (!interactive) return marker;

    return (
      <GridContainer
        direction="column"
        spacing={0}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <GridItem>{marker}</GridItem>
      </GridContainer>
    );
  };
}

Marker.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  index: PropTypes.number,

  // resaga props
  origin: PropTypes.bool,
  destination: PropTypes.bool,
  interactive: PropTypes.bool,
  editable: PropTypes.bool,
  active: PropTypes.bool,
  hovered: PropTypes.bool,
  hoveredElse: PropTypes.bool,

  // custom props
  variant: PropTypes.string,
  size: PropTypes.string,
  geocode: PropTypes.bool,
  showLine: PropTypes.bool,
  spacing: PropTypes.bool,
  showDetail: PropTypes.bool,
  leaveDelay: PropTypes.number,
};

Marker.defaultProps = {
  leaveDelay: 800,
};

export default compose(
  withStyles(styles, { name: 'Marker' }),
  resaga(CONFIG),
)(Marker);
