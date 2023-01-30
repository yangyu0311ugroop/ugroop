import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EventDuration } from 'smartComponents/Event/components/Event/parts';
import { TooltipIconButton } from 'containers/Templates/TemplateManagement/components/Event/components/Buttons';

export class EventView extends PureComponent {
  renderDuration = () => {
    const { event } = this.props;
    if (
      event.type === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type &&
      event.subtype === EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type &&
      event.position === NODE_CONSTANTS.POSITIONS.start
    ) {
      return (
        <EventDuration
          id={event.id}
          dataId={event.dataId}
          position={event.position}
          variant={EVENT_CONSTANTS.VARIANTS.labelValueFlag}
          background
        />
      );
    }
    return null;
  };

  render = () => {
    const { event } = this.props;
    return (
      <React.Fragment>
        {this.renderDuration()}
        <TooltipIconButton
          key={event.id}
          id={event.id}
          dayId={event.dayId}
          position={event.position}
          showLabel={event.showLabel}
          showTick={false}
          enableOffset={event.enableOffset}
          showTriangle={event.showTriangle}
          showSubIcon={event.showTriangle}
          showButton={!event.showTriangle}
          size="small"
        />
      </React.Fragment>
    );
  };
}

EventView.propTypes = {
  // parent props
  event: PropTypes.object,
};

EventView.defaultProps = {
  event: {},
};

export default EventView;
