/**
 * Created by stephenkarpinskyj on 19/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { withStyles, Hidden } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { H4, H5 } from 'viewComponents/Typography';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import {
  FlightStartAirport,
  FlightEndAirport,
  EventStartTime,
  EventEndTime,
  EventDuration,
} from 'smartComponents/Event/components/Event/parts';
import m from './messages';
import style from './style';

export class FlightStartEnd extends React.PureComponent {
  state = {
    start: {},
    end: {},
  };

  handleStartAirportChange = change => {
    this.setState({ start: { ...change } });
  };

  handleEndAirportChange = change => {
    this.setState({ end: { ...change } });
  };

  renderPart = (Component, props = {}) => {
    const { classes, ...rest } = this.props;
    return <Component {...rest} {...props} />;
  };

  renderEditable = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            {this.renderPart(FlightStartAirport)}
            {this.renderPart(EventStartTime, { className: classes.time })}
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            {this.renderPart(FlightEndAirport)}
            {this.renderPart(EventEndTime, { className: classes.time })}
          </GridContainer>
        </GridItem>
        {this.renderPart(EventDuration, {
          variant: EVENT_CONSTANTS.VARIANTS.label,
        })}
      </React.Fragment>
    );
  };

  renderFieldTitle = () => <M {...m.sectionLabel} />;

  renderFieldRowItem = (title, subtitle) => {
    const { classes } = this.props;
    const separator = title && subtitle ? ' ' : '';
    return (
      <React.Fragment>
        <Hidden only={SIZE_CONSTANTS.XS}>
          <GridItem sm>
            <GridContainer direction="column" spacing={0}>
              <GridItem classes={{ item: classes.fieldRowTitleItem }}>
                {this.renderFieldRowTitle(title)}
              </GridItem>
              <GridItem>{this.renderFieldRowSubtitle(subtitle)}</GridItem>
            </GridContainer>
          </GridItem>
        </Hidden>
        <Hidden smUp>
          <GridItem xs>
            {this.renderFieldRowTitle(
              <React.Fragment>
                {title}
                {separator}
                {subtitle}
              </React.Fragment>,
            )}
          </GridItem>
        </Hidden>
      </React.Fragment>
    );
  };

  renderFieldRowTitle = title =>
    title && (
      <H4 dense weight="bold" fontStyle="italic">
        {title}
      </H4>
    );

  renderFieldRowSubtitle = subtitle => subtitle && <H5 dense>{subtitle}</H5>;

  renderFieldRow = (title, subtitle, airport, time) => (
    <GridItem xs={12}>
      <GridContainer>
        {this.renderFieldRowItem(title, subtitle)}
        <GridItem xs={12} sm={10}>
          <GridContainer direction="column">
            {airport}
            <GridItem xs>{time}</GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  renderField = () => (
    <Section title={this.renderFieldTitle()}>
      <GridContainer spacing={2}>
        {this.renderFieldRow(
          <M {...m.startSectionLabel} />,
          this.state.start.cityName,
          this.renderPart(FlightStartAirport, {
            onChange: this.handleStartAirportChange,
          }),
          this.renderPart(EventStartTime),
        )}
        {this.renderFieldRow(
          <M {...m.endSectionLabel} />,
          this.state.end.cityName,
          this.renderPart(FlightEndAirport, {
            onChange: this.handleEndAirportChange,
          }),
          this.renderPart(EventEndTime),
        )}
      </GridContainer>
    </Section>
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

FlightStartEnd.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
};

FlightStartEnd.defaultProps = {
  variant: null,
};

export default withStyles(style, { name: 'Event/layouts/Flight/StartEnd' })(
  FlightStartEnd,
);
