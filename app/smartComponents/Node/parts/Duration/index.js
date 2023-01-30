import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import momentjs from 'moment';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Duration extends PureComponent {
  render = () => {
    const { startDate, duration, className, showIcon } = this.props;

    if (!startDate)
      return (
        <GridItem className={className}>
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>
              <Icon icon="lnr-history2" size="xsmall" paddingLeft flipX />
            </GridItem>
            <GridItem>
              {duration}
              -day tour
            </GridItem>
          </GridContainer>
        </GridItem>
      );

    const start = momentjs(startDate);
    const end = momentjs(startDate)
      .add(duration - 1, 'day')
      .hour(23)
      .minute(59)
      .second(59);

    return (
      <GridItem className={className}>
        <GridContainer alignItems="center" spacing={0} noWrap>
          {showIcon && (
            <GridItem>
              <Icon icon="lnr-calendar-full" size="xsmall" paddingLeft flipX />
            </GridItem>
          )}
          <GridItem>
            {start.format('D MMM')} – {end.format('D MMM YYYY')} ({duration} day
            {LOGIC_HELPERS.ifElse(duration > 1, 's')})
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

Duration.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  className: PropTypes.string,
  showIcon: PropTypes.bool,

  // resaga props
  startDate: PropTypes.any,
  duration: PropTypes.number,
};

Duration.defaultProps = {
  showIcon: true,
};

export default compose(
  withStyles(styles, { name: 'Duration' }),
  resaga(CONFIG),
)(Duration);
