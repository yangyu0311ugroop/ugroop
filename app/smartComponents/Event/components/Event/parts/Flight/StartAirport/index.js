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

export class StartAirport extends React.PureComponent {
  render = () => {
    const { variant, intl, ...rest } = this.props;
    return (
      <Airport
        variant={variant}
        position={NODE_CONSTANTS.POSITIONS.start}
        valuePath={EVENT_PATHS.startAirportName}
        cityNamePath={EVENT_PATHS.startCityName}
        iataCodePath={EVENT_PATHS.startIataCode}
        timeZoneIdPath={NODE_PATHS.startTimeZoneId}
        placeholder={intl.formatMessage(m.placeholder)}
        editablePlaceholder={intl.formatMessage(m.editablePlaceholder)}
        inputs={inputs.airport}
        {...rest}
      />
    );
  };
}

StartAirport.propTypes = {
  // hoc
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),

  // parent
  variant: PropTypes.string,
};

StartAirport.defaultProps = {
  variant: null,
};

export default compose(injectIntl)(StartAirport);
