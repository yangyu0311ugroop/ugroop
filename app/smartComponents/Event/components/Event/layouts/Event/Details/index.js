/**
 * Created by stephenkarpinskyj on 7/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import {
  EventName,
  EventLocation,
  EventDescription,
  EventUrl,
} from 'smartComponents/Event/components/Event/parts';
import m from './messages';

export class EventDetails extends React.PureComponent {
  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderTitle = () => {
    const { descriptionOnly } = this.props;
    const message = descriptionOnly
      ? m.descriptionOnlySectionLabel
      : m.sectionLabel;
    return <M {...message} />;
  };

  renderDefault = () => {
    const { descriptionOnly, showEventLocation } = this.props;
    if (descriptionOnly) {
      return this.renderPart(EventDescription);
    }
    return (
      <GridItem>
        <GridContainer direction="column" wrap="nowrap">
          {this.renderPart(EventName, {
            variant: EVENT_CONSTANTS.VARIANTS.editableHeadingForm,
          })}
          {showEventLocation && this.renderPart(EventLocation)}
          {this.renderPart(EventUrl)}
          {this.renderPart(EventDescription, {
            variant: EVENT_CONSTANTS.VARIANTS.editableForm,
          })}
        </GridContainer>
      </GridItem>
    );
  };

  renderField = () => {
    const { descriptionOnly, defaultExpanded, showEventLocation } = this.props;
    return (
      <Section
        title={this.renderTitle()}
        ExpansionPanelProps={{ defaultExpanded }}
      >
        <GridContainer direction="column">
          {!descriptionOnly && this.renderPart(EventName)}
          {!descriptionOnly &&
            showEventLocation &&
            this.renderPart(EventLocation)}
          {this.renderPart(EventUrl)}
          {this.renderPart(EventDescription)}
        </GridContainer>
      </Section>
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderDefault}
        renderField={this.renderField}
      />
    );
  };
}

EventDetails.propTypes = {
  // parent
  variant: PropTypes.string,
  descriptionOnly: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  showEventLocation: PropTypes.bool,
};

EventDetails.defaultProps = {
  variant: null,
  descriptionOnly: false,
  defaultExpanded: true,
  showEventLocation: true,
};

export default EventDetails;
