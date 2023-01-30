/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { EventIconLabelFlag, EventIconSublabel } from 'viewComponents/Event';
import m from './messages';

export class Duration extends React.PureComponent {
  getDuration = () => {
    const { startTimeMoment, startMode, endTimeMoment, endMode } = this.props;
    if (NODE_HELPERS.hasDuration(startMode, endMode)) {
      const duration = NODE_HELPERS.calculateDuration(
        startTimeMoment,
        endTimeMoment,
      );
      return MOMENT_HELPERS.renderDurationHoursMinutes(duration);
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
    return duration && <React.Fragment>{duration}</React.Fragment>;
  };

  renderLabelValue = () => (
    <EventIconSublabel>{this.getDuration()}</EventIconSublabel>
  );

  renderLabelValueFlag = () => (
    <EventIconLabelFlag>{this.getDuration()}</EventIconLabelFlag>
  );

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderLabel}
        renderLabelValue={this.renderLabelValue}
        renderLabelValueFlag={this.renderLabelValueFlag}
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
  startTimeMoment: PropTypes.object,
  startMode: PropTypes.string,
  endTimeMoment: PropTypes.object,
  endMode: PropTypes.string,
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
};

export default Duration;
