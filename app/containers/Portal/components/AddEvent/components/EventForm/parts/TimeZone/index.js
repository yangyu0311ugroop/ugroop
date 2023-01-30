import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import moment from 'moment';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class TimeZone extends PureComponent {
  timezone = () => {
    const { timeZoneOffset } = this.props;

    return Number.isInteger(timeZoneOffset)
      ? moment.duration(Math.abs(timeZoneOffset), 's')
      : moment.duration(Math.abs(moment().utcOffset()), 'm');
  };

  timeZoneOffset = () => {
    const { timeZoneOffset } = this.props;

    if (!timeZoneOffset) return null;

    return LOGIC_HELPERS.ifElse(timeZoneOffset < 0, '-', '+', true);
  };

  renderEmpty = () => {
    const { component: Component, showTimeZone } = this.props;

    if (!showTimeZone) return null;

    return <Component>Time zone set by the location</Component>;
  };

  render = () => {
    const { component: Component, timeZoneName, className } = this.props;

    if (!timeZoneName) {
      return this.renderEmpty();
    }

    const timezone = this.timezone();
    const timezoneMoment = moment.utc(timezone.as('ms'));
    const renderZone = timezoneMoment.format(
      LOGIC_HELPERS.ifElse(timezoneMoment.minute() === 0, 'H', 'H:mm'),
    );

    return (
      <Component className={className}>
        <GridContainer alignItems="center" spacing={0} wrap="nowrap">
          <GridItem>
            <Icon icon="lnr-network" size="xsmall" color="blue" paddingRight />
          </GridItem>
          <GridItem>
            <JText gray ellipsis>
              {timeZoneName} (GMT
              {this.timeZoneOffset()}
              {renderZone})
            </JText>
          </GridItem>
        </GridContainer>
      </Component>
    );
  };
}

TimeZone.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  component: PropTypes.node,
  timeZoneOffset: PropTypes.number,
  timeZoneName: PropTypes.string,
  showTimeZone: PropTypes.bool,
  className: PropTypes.string,

  // resaga props
};

TimeZone.defaultProps = {
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'TimeZone' }),
  resaga(CONFIG),
)(TimeZone);
