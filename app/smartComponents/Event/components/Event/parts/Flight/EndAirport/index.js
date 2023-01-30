/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import Airport from 'smartComponents/Event/components/Airport';
import inputs from './inputs';
import m from './messages';

export class EndAirport extends React.PureComponent {
  render = () => {
    const { variant, intl, ...rest } = this.props;
    return (
      <Airport
        variant={variant}
        position={NODE_CONSTANTS.POSITIONS.end}
        valuePath={EVENT_PATHS.endAirportName}
        cityNamePath={EVENT_PATHS.endCityName}
        iataCodePath={EVENT_PATHS.endIataCode}
        timeZoneIdPath={NODE_PATHS.endTimeZoneId}
        placeholder={intl.formatMessage(m.placeholder)}
        editablePlaceholder={intl.formatMessage(m.editablePlaceholder)}
        inputs={inputs.airport}
        {...rest}
      />
    );
  };
}

EndAirport.propTypes = {
  // hoc
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),

  // parent
  variant: PropTypes.string,
};

EndAirport.defaultProps = {
  variant: null,
};

export default compose(injectIntl)(EndAirport);
