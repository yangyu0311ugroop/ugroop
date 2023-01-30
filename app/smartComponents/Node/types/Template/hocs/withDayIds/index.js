import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { TEMPLATE_ID_CONFIG, TAB_ID_CONFIG, CONFIG } from './config';

export const withDayIds = WrappedComponent => {
  class DayIds extends React.PureComponent {
    render = () => {
      const { templateId, tabId, dayIds, ...rest } = this.props;

      return (
        <WrappedComponent
          templateId={templateId}
          tabId={tabId}
          dayIds={dayIds}
          {...rest}
        />
      );
    };
  }

  DayIds.propTypes = {
    templateId: PropTypes.number,
    tabId: PropTypes.number,
    dayIds: PropTypes.array,
  };

  DayIds.defaultProps = {
    dayIds: [],
  };

  return DayIds;
};

export default WrappedComponent =>
  compose(
    resaga(TEMPLATE_ID_CONFIG),
    resaga(TAB_ID_CONFIG),
    resaga(CONFIG),
  )(withDayIds(WrappedComponent));
