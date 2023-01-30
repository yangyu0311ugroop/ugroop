/**
 * Created by stephenkarpinskyj on 21/11/18.
 */

import { ability } from 'apis/components/Ability/ability';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT } from 'utils/modelConstants';
import { CONFIG } from './config';

export const withCanEditFlightBooking = WrappedComponent => {
  class CanEditFlightBooking extends React.PureComponent {
    render = () => {
      const { createdBy, ...rest } = this.props;
      return (
        <WrappedComponent
          canEditFlightBooking={ability.can('execute', {
            type: EVENT,
            createdBy,
          })}
          {...rest}
        />
      );
    };
  }

  CanEditFlightBooking.propTypes = {
    createdBy: PropTypes.number,
  };

  CanEditFlightBooking.defaultProps = {
    createdBy: 0,
  };

  return CanEditFlightBooking;
};

export default WrappedComponent =>
  compose(resaga(CONFIG))(withCanEditFlightBooking(WrappedComponent));
