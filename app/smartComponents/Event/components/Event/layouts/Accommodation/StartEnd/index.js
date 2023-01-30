/**
 * Created by stephenkarpinskyj on 19/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { H4, H5 } from 'viewComponents/Typography';
import { EventHeading } from 'viewComponents/Event';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import {
  EventStartTime,
  EventEndTime,
  EventDuration,
} from 'smartComponents/Event/components/Event/parts';
import m from './messages';

export class AccommodationStartEnd extends React.PureComponent {
  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderEditableHeading = label => (
    <GridItem>
      <EventHeading Typography={H5}>
        <M {...label} />
      </EventHeading>
    </GridItem>
  );

  renderEditable = () => (
    <React.Fragment>
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          {this.renderEditableHeading(m.startSectionLabel)}
          {this.renderPart(EventStartTime)}
        </GridContainer>
      </GridItem>
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          {this.renderEditableHeading(m.endSectionLabel)}
          {this.renderPart(EventEndTime)}
        </GridContainer>
      </GridItem>
      {this.renderPart(EventDuration, {
        variant: EVENT_CONSTANTS.VARIANTS.label,
      })}
    </React.Fragment>
  );

  renderFieldTitle = () => <M {...m.sectionLabel} />;

  renderFieldRowTitle = title =>
    title && (
      <H4 dense weight="bold" fontStyle="italic">
        {title}
      </H4>
    );

  renderFieldRow = (title, value) => (
    <GridItem xs={12}>
      <GridContainer alignItems="baseline">
        <GridItem sm={2}>{this.renderFieldRowTitle(title)}</GridItem>
        <GridItem xs={12} sm>
          {value}
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  renderField = () => (
    <React.Fragment>
      <Section title={this.renderFieldTitle()}>
        <GridContainer spacing={3}>
          {this.renderFieldRow(
            <M {...m.startSectionLabel} />,
            this.renderPart(EventStartTime),
          )}
          {this.renderFieldRow(
            <M {...m.endSectionLabel} />,
            this.renderPart(EventEndTime),
          )}
        </GridContainer>
      </Section>
    </React.Fragment>
  );

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
      />
    );
  };
}

AccommodationStartEnd.propTypes = {
  // parent
  variant: PropTypes.string,
};

AccommodationStartEnd.defaultProps = {
  variant: null,
};

export default AccommodationStartEnd;
