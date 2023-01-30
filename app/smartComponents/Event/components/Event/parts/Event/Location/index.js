/**
 * Created by stephenkarpinskyj on 10/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import LocationComponent from 'smartComponents/Event/components/Location';
import inputs from './inputs';
import m from './messages';

export class Location extends React.PureComponent {
  render = () => {
    const { variant, intl, ...rest } = this.props;
    return (
      <LocationComponent
        variant={variant}
        valuePath={EVENT_PATHS.locationName}
        iconPath={EVENT_PATHS.locationIcon}
        placeIdPath={EVENT_PATHS.placeId}
        timeZoneIdPath={NODE_PATHS.startTimeZoneId}
        placeholder={intl.formatMessage(m.locationPlaceholder)}
        editablePlaceholder={intl.formatMessage(m.editableLocationPlaceholder)}
        inputs={inputs.location}
        fieldInputs={inputs.fieldLocation}
        editableInputs={inputs.editableLocation}
        {...rest}
      />
    );
  };
}

Location.propTypes = {
  // hoc
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),

  // parent
  variant: PropTypes.string,
};

Location.defaultProps = {
  variant: null,
};

export default compose(injectIntl)(Location);
