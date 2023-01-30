import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { NODE_HAS_TIMES } from 'utils/constants/nodes';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import EventNoTimeWithEventIds from './components/EventsNoTime/eventNoTimeWithEventIds';
import EventsTimeLinesWithEventIds from './components/EventsTimelines/eventsTimeLinesWithEventIds';
import EventsCard from './components/EventsCard';
import styles from './styles';

export class EventDay extends PureComponent {
  state = {
    open: false,
  };

  onClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  renderDayTitle = () => {
    const { classes, id, editing } = this.props;
    return (
      <GridItem>
        <GridContainer>
          <GridItem>
            <div className={classes.dayTitleContainerPadding}>
              <DayDate id={id} eventSchedule showDayIndex fullDate={!editing} />
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderEventsNoTime = () => {
    const { id } = this.props;
    return <EventNoTimeWithEventIds id={id} />;
  };

  renderEventsTimeline = () => {
    const { classes, id } = this.props;
    const { open } = this.state;
    return (
      <GridItem className={classes.timeline}>
        <GridContainer direction="column">
          <GridItem>
            <EventsTimeLinesWithEventIds
              id={id}
              openCards={this.onClick}
              isCardOpen={open}
            />
          </GridItem>
          {open && (
            <GridItem>
              <EventsCard id={id} hasTime={NODE_HAS_TIMES.withTime} />
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes } = this.props;
    return (
      <GridContainer
        direction="column"
        className={classes.dayContainer}
        spacing={1}
      >
        {this.renderDayTitle()}
        {this.renderEventsTimeline()}
        {this.renderEventsNoTime()}
      </GridContainer>
    );
  };
}

EventDay.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  editing: PropTypes.bool,
};

EventDay.defaultProps = {
  id: 0,
};

export default compose(withStyles(styles, { name: 'EventDay' }))(EventDay);
