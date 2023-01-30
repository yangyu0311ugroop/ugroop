import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import resaga from 'resaga';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import { TooltipIconButton } from 'containers/Templates/TemplateManagement/components/Event/components/Buttons';
import styles from './styles';
import { CONFIG } from './config';
import NonSingleDayEvents from './components/nonSingleDayEvents';
import SingleDayEventsWithTime from './components/singleDayEventsWithTime';
import SingleDayEventsWithoutTime from './components/singleDayEventsWithoutTime';

export class Events extends React.PureComponent {
  state = {
    hasNonSingleDayEvents: false,
    hasSingleDayEventWithTime: false,
    hasSingleDayEventWithoutTime: false,
  };

  getContainerClassName = () => {
    const { classes } = this.props;
    return classNames(classes.root, !this.hasAnyEvents() && classes.noMargin);
  };

  hasSingleDayEventsWithoutTime = () => this.state.hasSingleDayEventWithoutTime;

  hasNonSingleDayEvents = () => this.state.hasNonSingleDayEvents;

  hasSingleDayEvents = () => {
    const {
      hasSingleDayEventWithTime,
      hasSingleDayEventWithoutTime,
    } = this.state;
    return hasSingleDayEventWithTime || hasSingleDayEventWithoutTime;
  };

  hasAnyEvents = () =>
    this.hasSingleDayEvents() || this.hasNonSingleDayEvents();

  hasAllEvents = () =>
    this.hasSingleDayEvents() && this.hasNonSingleDayEvents();

  handleClick = () => {
    const { id } = this.props;

    this.props.resaga.setValue({
      eventCreate: EVENT_STORE_HELPERS.setEventCreate(true, id),
    });
  };

  setHasSingleDayEventWithoutTime = value => {
    this.setState({
      hasSingleDayEventWithoutTime: value,
    });
  };

  setHasSingleDayEventWithTime = value => {
    this.setState({
      hasSingleDayEventWithTime: value,
    });
  };

  setHasNonSingleDayEvents = value => {
    this.setState({
      hasNonSingleDayEvents: value,
    });
  };

  renderEventIcon = ({ id, position, dayCount }) => {
    const { classes, id: dayId } = this.props;
    return (
      <div className={classes.btns} key={`${id}.${position}`}>
        <TooltipIconButton
          size="xs"
          id={id}
          dayId={dayId}
          position={position}
          showSublabel
          showSubIcon={dayCount > 0}
        />
      </div>
    );
  };

  renderNonSingleDayEventsSeparator = () => {
    const { classes } = this.props;
    return this.hasAllEvents() && <div className={classes.separator} />;
  };

  renderEventIcons = () => {
    const { id, eventIds } = this.props;
    return (
      <React.Fragment>
        <NonSingleDayEvents
          id={id}
          eventIds={eventIds}
          hasEvents={this.setHasNonSingleDayEvents}
          renderEventIcon={this.renderEventIcon}
        />
        {this.renderNonSingleDayEventsSeparator()}
        <SingleDayEventsWithTime
          id={id}
          eventIds={eventIds}
          hasEvents={this.setHasSingleDayEventWithTime}
          renderEventIcon={this.renderEventIcon}
        />
        <SingleDayEventsWithoutTime
          id={id}
          eventIds={eventIds}
          hasEvents={this.setHasSingleDayEventWithoutTime}
          renderEventIcon={this.renderEventIcon}
        />
      </React.Fragment>
    );
  };

  render = () => (
    <GridContainer
      className={this.getContainerClassName()}
      spacing={0}
      alignItems="flex-start"
    >
      {this.renderEventIcons()}
    </GridContainer>
  );
}

Events.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  eventIds: PropTypes.array,
  // parent props
  id: PropTypes.number.isRequired,
};

Events.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Template/TabCardView/DayCard/Events' }),
  resaga(CONFIG),
)(Events);
