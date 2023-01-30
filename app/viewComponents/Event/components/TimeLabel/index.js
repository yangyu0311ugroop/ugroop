/**
 * Created by stephenkarpinskyj on 3/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import P, { H5 } from 'viewComponents/Typography';

export class EventTimeLabel extends React.PureComponent {
  renderPrefix = () => {
    const { renderPrefix } = this.props;
    const prefix = renderPrefix();
    return (
      !!prefix && (
        <GridItem>
          <H5 dense weight="bold">
            {prefix}
          </H5>
        </GridItem>
      )
    );
  };

  renderTime = () => {
    const {
      calculatedTime,
      calculatedTimeMode,
      omitDate,
      showEmpty,
      displayDate,
      index,
    } = this.props;
    const opts = { omitDate, displayDate, index };
    const time = NODE_HELPERS.renderTime(
      calculatedTime,
      calculatedTimeMode,
      opts,
    );
    if (time)
      return (
        <GridItem>
          <P dense>{time}</P>
        </GridItem>
      );
    if (showEmpty)
      return (
        <GridItem>
          <P dense>Not set</P>
        </GridItem>
      );
    return null;
  };

  render = () => {
    const time = this.renderTime();
    return (
      !!time && (
        <GridItem>
          <GridContainer alignItems="center">
            {this.renderPrefix()}
            {time}
          </GridContainer>
        </GridItem>
      )
    );
  };
}

EventTimeLabel.propTypes = {
  // parent
  calculatedTime: PropTypes.object,
  calculatedTimeMode: PropTypes.string,
  omitDate: PropTypes.bool,
  showEmpty: PropTypes.bool,
  displayDate: PropTypes.string,
  index: PropTypes.number,
  renderPrefix: PropTypes.func,
};

EventTimeLabel.defaultProps = {
  calculatedTime: null,
  calculatedTimeMode: null,
  omitDate: false,
  showEmpty: false,
  displayDate: null,
  index: null,
  renderPrefix: () => null,
};

export default EventTimeLabel;
