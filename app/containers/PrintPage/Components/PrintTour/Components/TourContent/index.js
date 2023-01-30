import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import GridItem from 'components/GridItem/index';
import GridContainer from 'components/GridContainer/index';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import Divider from '@material-ui/core/Divider';
import H2 from 'components/H2';
import { CONFIG, DAY_CONFIG, NORMALISED_DAYS_CONFIG } from './config';
import styles from './styles';
import Day from './Components/Day';
import Itinerary from './Components/Itinerary';
import m from '../../messages';

export class TourContent extends PureComponent {
  renderDay = days => {
    const { dayIds, templateId } = this.props;
    return <Day days={days} dayIds={dayIds} templateId={templateId} />;
  };

  renderItinerary = days => {
    const { dayIds, templateId } = this.props;
    return <Itinerary days={days} dayIds={dayIds} templateId={templateId} />;
  };

  renderDivider = () => {
    const { classes } = this.props;
    return (
      <GridContainer spacing={0}>
        <Divider className={classes.divider} />
        <GridItem xs={1} className={classes.col1} />
        <GridItem xs={9}>
          <H2 className={classes.dividerText}>
            {' '}
            <M {...m.ItineraryLabel} />{' '}
          </H2>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { normalisedDays } = this.props;
    const day = this.renderDay(normalisedDays);
    const itinerary = this.renderItinerary(normalisedDays);
    return (
      <GridContainer spacing={0}>
        {this.renderDivider()}
        {itinerary}
        {day}
      </GridContainer>
    );
  };
}

TourContent.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  days: PropTypes.array,
  tabId: PropTypes.number,
  templateId: PropTypes.number,
  // resaga props
  dayIds: PropTypes.array,
  normalisedDays: PropTypes.object,
};

TourContent.defaultProps = {
  days: [],
  dayIds: [],
  tabId: 0,
  templateId: 0,
};

export default compose(
  withStyles(styles, { name: 'TourContent' }),
  resaga(CONFIG),
  resaga(DAY_CONFIG),
  resaga(NORMALISED_DAYS_CONFIG),
)(TourContent);
