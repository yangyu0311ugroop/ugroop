/**
 * Created by stephenkarpinskyj on 3/9/18.
 */

import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { withStyles } from 'components/material-ui';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import style from './style';

export class EventHomeTimeLabel extends React.PureComponent {
  renderText = children => (
    <JText darkgreen halfPaddingRight sm>
      {children}
    </JText>
  );

  renderPrefix = () => <GridItem>{this.renderText('@home')}</GridItem>;

  renderValue = value => <GridItem>{this.renderText(value)}</GridItem>;

  renderHomeTime = () => {
    const { calculatedMode, calculatedTime, timeZoneId } = this.props;
    if (NODE_HELPERS.hasTimeComponent(calculatedMode)) {
      return EVENT_STORE_HELPERS.renderHomeTime(calculatedTime, timeZoneId);
    }
    return null;
  };

  render = () => {
    const homeTime = this.renderHomeTime();
    return (
      !!homeTime && (
        <GridItem>
          <GridContainer alignItems="baseline" spacing={0}>
            {this.renderPrefix()}
            {this.renderValue(homeTime)}
          </GridContainer>
        </GridItem>
      )
    );
  };
}

EventHomeTimeLabel.propTypes = {
  // hoc
  // classes: PropTypes.object.isRequired,

  // parent
  calculatedMode: PropTypes.string,
  calculatedTime: PropTypes.object,
  timeZoneId: PropTypes.string,
};

EventHomeTimeLabel.defaultProps = {
  calculatedMode: null,
  calculatedTime: null,
  timeZoneId: null, // TODO: Get user's timeZoneId from preferences
};

export default compose(
  withStyles(style, { name: 'viewComponents/Event/HomeTimeLabel' }),
)(EventHomeTimeLabel);
