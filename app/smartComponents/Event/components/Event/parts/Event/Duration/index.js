/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import P, { H5 } from 'viewComponents/Typography';
import { EventHeading, EventIconSublabel } from 'viewComponents/Event';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import {
  ForEachEventType,
  ForEachEventVariant,
} from 'smartComponents/Event/logics';
import FlightDuration from '../../Flight/Duration';
import AccommodationDuration from '../../Accommodation/Duration';
import { CONFIG } from './config';
import m from './messages';

export class Duration extends React.PureComponent {
  getDuration = () => {
    const { startTimeMoment, startMode, endTimeMoment, endMode } = this.props;
    if (NODE_HELPERS.hasDuration(startMode, endMode)) {
      const duration = NODE_HELPERS.calculateDuration(
        startTimeMoment,
        endTimeMoment,
      );
      return MOMENT_HELPERS.stringifyDuration(duration);
    }
    return null;
  };

  renderPart = Component => () => <Component {...this.props} />;

  renderLabelPrefix = () => {
    const { omitPrefix } = this.props;
    return omitPrefix ? null : <M {...m.prefixLabel} />;
  };

  renderLabel = () => {
    const duration = this.getDuration();
    return (
      duration && (
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem>
              <EventHeading Typography={H5}>
                {this.renderLabelPrefix()}
              </EventHeading>
            </GridItem>
            <GridItem>
              <P dense>{duration}</P>
            </GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderLabelValue = () => (
    <EventIconSublabel>{this.getDuration()}</EventIconSublabel>
  );

  renderEvent = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderLabel}
        renderLabelValue={this.renderLabelValue}
      />
    );
  };

  render = () => {
    const { dataId, formType, formSubtype } = this.props;
    return (
      <ForEachEventType
        dataId={dataId}
        type={formType}
        subtype={formSubtype}
        renderEvent={this.renderEvent}
        renderFlight={this.renderPart(FlightDuration)}
        renderAccommodation={this.renderPart(AccommodationDuration)}
      />
    );
  };
}

Duration.propTypes = {
  // parent
  variant: PropTypes.string,
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  dataId: PropTypes.number,
  omitPrefix: PropTypes.bool,

  // resaga value
  startTimeMoment: PropTypes.object,
  startMode: PropTypes.string,
  endTimeMoment: PropTypes.object,
  endMode: PropTypes.string,
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
};

Duration.defaultProps = {
  variant: null,
  id: null,
  dataId: null,
  omitPrefix: false,

  startTimeMoment: null,
  startMode: null,
  endTimeMoment: null,
  endMode: null,
  formType: null,
  formSubtype: null,
};

export default compose(resaga(CONFIG()))(Duration);
