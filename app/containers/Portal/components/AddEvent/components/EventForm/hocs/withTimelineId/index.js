import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { TEMPLATE_ID_CONFIG, TAB_ID_CONFIG } from './config';

export const withTimelineId = WrappedComponent => {
  class HOC extends React.PureComponent {
    render = () => {
      const { templateId, timelineId, ...rest } = this.props;

      return (
        <WrappedComponent
          templateId={templateId}
          timelineId={timelineId}
          {...rest}
        />
      );
    };
  }

  HOC.propTypes = {
    templateId: PropTypes.number,
    timelineId: PropTypes.number,
  };

  HOC.defaultProps = {};

  return HOC;
};

export default WrappedComponent =>
  compose(
    resaga(TEMPLATE_ID_CONFIG),
    resaga(TAB_ID_CONFIG),
  )(withTimelineId(WrappedComponent));
