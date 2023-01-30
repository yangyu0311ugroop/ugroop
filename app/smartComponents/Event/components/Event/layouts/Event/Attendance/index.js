/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import { THE_DOT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { H5 } from 'viewComponents/Typography';
import { EventHeading } from 'viewComponents/Event';
import { Section } from 'ugcomponents/DialogForm/Complex';
// import { ForEachEventVariant } from 'smartComponents/Event/logics';
import {
  EventStartAttendance,
  EventEndAttendance,
  EventDailyAttendance,
} from 'smartComponents/Event/components/Event/parts';
import m from './messages';
import { CONFIG } from './config';

export class EventAttendance extends React.PureComponent {
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

  renderSeparator = () => <GridItem>{THE_DOT}</GridItem>;

  renderEditable = () => {
    const { dailyAttendance, hasAttendance, readOnly } = this.props;
    return (
      (hasAttendance || !readOnly) && (
        <GridItem>
          <GridContainer alignItems="baseline">
            {this.renderEditableHeading(m.editableHeadingLabel)}
            {this.renderPart(EventStartAttendance)}
            {this.renderSeparator()}
            {this.renderPart(EventEndAttendance)}
            {dailyAttendance && (
              <React.Fragment>
                {this.renderSeparator()}
                {this.renderPart(EventDailyAttendance)}
              </React.Fragment>
            )}
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderTitle = () => <M {...m.sectionLabel} />;

  renderField = () => {
    const { dailyAttendance } = this.props;
    return (
      <Section
        title={this.renderTitle()}
        ExpansionPanelProps={{ defaultExpanded: false }}
      >
        <GridContainer>
          {this.renderPart(EventStartAttendance)}
          {this.renderPart(EventEndAttendance)}
          {dailyAttendance && this.renderPart(EventDailyAttendance)}
        </GridContainer>
      </Section>
    );
  };

  // render = () => {
  //   const { variant } = this.props;
  //   return (
  //     <ForEachEventVariant
  //       variant={variant}
  //       renderDefault={this.renderEditable}
  //       renderField={this.renderField}
  //     />
  //   );
  // };

  render = () => null;
}

EventAttendance.propTypes = {
  // parent
  variant: PropTypes.string,
  dailyAttendance: PropTypes.bool,
  readOnly: PropTypes.bool,

  // resaga value
  hasAttendance: PropTypes.bool,
};

EventAttendance.defaultProps = {
  variant: null,
  dailyAttendance: false,
  readOnly: false,
};

export default resaga(CONFIG())(EventAttendance);
