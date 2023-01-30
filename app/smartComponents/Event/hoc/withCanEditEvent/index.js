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

export const withCanEditEvent = WrappedComponent => {
  class CanEditEvent extends React.PureComponent {
    render = () => {
      const { createdBy, ...rest } = this.props;
      return (
        <WrappedComponent
          canEditEvent={ability.can('execute', { type: EVENT, createdBy })}
          {...rest}
        />
      );
    };
  }

  CanEditEvent.propTypes = {
    createdBy: PropTypes.number,
  };

  CanEditEvent.defaultProps = {
    createdBy: 0,
  };

  return CanEditEvent;
};

export default WrappedComponent =>
  compose(resaga(CONFIG))(withCanEditEvent(WrappedComponent));
