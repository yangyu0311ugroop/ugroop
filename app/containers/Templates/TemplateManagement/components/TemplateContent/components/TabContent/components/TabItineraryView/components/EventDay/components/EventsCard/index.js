import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import h3 from 'components/H3';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import { compose } from 'redux';
import classNames from 'classnames';
import EventDetails from 'smartComponents/Event/components/EventDetails';
import { withEventsOnDay } from 'smartComponents/Node/hoc';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TRANSPORTATIONS } from 'utils/constants/events';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import styles from './styles';

// TODO: Move to smartComponents/Event
export class EventsCard extends PureComponent {
  renderEventCard = ({ id, position, dayCount }) => {
    const { dense } = this.props;
    return (
      <EventDetails
        key={`${id}.${position}`}
        id={id}
        position={position}
        dense={dense}
        singleDayEvent={!dayCount}
      />
    );
  };

  notFlightEnd = node =>
    !(
      node.subtype === TRANSPORTATIONS.FLIGHT.type &&
      node.position === NODE_CONSTANTS.POSITIONS.end &&
      node.dayCount === 0
    );

  renderLabel = () => {
    const { classes, showLabel, labelClassName } = this.props;
    return (
      showLabel && (
        <h3 className={classNames(classes.texTitle, labelClassName)}>
          Events for the day
        </h3>
      )
    );
  };

  render = () => {
    const { events, rootClassName, noWrapper } = this.props;

    return (
      !!events.length && (
        <GridContainer
          direction="column"
          alignItems="stretch"
          spacing={0}
          className={rootClassName}
          wrap={LOGIC_HELPERS.ifElse(noWrapper, 'nowrap')}
        >
          <GridItem>{this.renderLabel()}</GridItem>
          <GridItem>
            <GridContainer>
              {events.filter(this.notFlightEnd).map(this.renderEventCard)}
            </GridContainer>
          </GridItem>
        </GridContainer>
      )
    );
  };
}

EventsCard.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  events: PropTypes.array,

  // parent
  showLabel: PropTypes.bool,
  noWrapper: PropTypes.bool,
  dense: PropTypes.bool,
  rootClassName: PropTypes.string,
  labelClassName: PropTypes.string,

  // parent for hoc (note: defaultProps won't be passed to hoc)
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
};

EventsCard.defaultProps = {
  showLabel: false,
  noWrapper: false,
  dense: false,
  rootClassName: '',
  labelClassName: '',

  id: null,
};

export default compose(
  withEventsOnDay(),
  withStyles(styles, { name: 'EventsCard' }),
)(EventsCard);
