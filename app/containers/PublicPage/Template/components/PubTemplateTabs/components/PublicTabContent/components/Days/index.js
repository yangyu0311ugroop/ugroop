import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import classnames from 'classnames';
import EventsCard from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabItineraryView/components/EventDay/components/EventsCard';
import DayCarousel from './components/DayCarousel';
import Sections from './components/Sections';
import Day from './components/Day';
import { CONFIG } from './config';
import styles from './styles';

export class Days extends PureComponent {
  state = {
    currentDayId: -1,
  };

  componentDidMount = () => {
    const { currentQueryDayId } = this.props;
    this.setState({ currentDayId: currentQueryDayId });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.currentQueryDayId !== this.props.currentQueryDayId) {
      this.setState({ currentDayId: nextProps.currentQueryDayId });
    }
  };

  getCurrentDayId = () => {
    const { currentDayId } = this.state;
    let current = currentDayId;
    if (current === -1) {
      const days = this.props.days;
      current = days && days.length > 0 ? days[0] : -1;
    }
    return current;
  };

  renderSections = dayId => {
    const { sections, classes } = this.props;
    return (
      sections.length > 0 && (
        <GridItem xs={12} md={12} className={classes.contentStyle}>
          <Container className={classes.sectionContainer}>
            <Sections dayId={dayId} />
          </Container>
        </GridItem>
      )
    );
  };

  renderEvents = dayId => {
    const { classes } = this.props;
    return (
      <Container>
        <EventsCard
          id={dayId}
          rootClassName={classes.eventsRoot}
          labelClassName={classes.eventsLabel}
          showLabel
          dense
        />
      </Container>
    );
  };

  render = () => {
    const { classes, days } = this.props;
    const dayId = this.getCurrentDayId();
    return (
      <GridContainer className={classes.root} direction="column" spacing={0}>
        <GridItem xs={12} md={12}>
          <DayCarousel currentDayId={dayId} daysId={days} />
        </GridItem>
        <GridItem
          xs={12}
          md={12}
          className={classnames(classes.borderBottom, classes.dayPadding)}
        >
          <Day dayId={dayId} />
        </GridItem>
        {this.renderSections(dayId)}
        {this.renderEvents(dayId)}
      </GridContainer>
    );
  };
}

Days.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  tabId: PropTypes.number,
  currentQueryDayId: PropTypes.number,
  // resaga props
  days: PropTypes.array,
  sections: PropTypes.array,
};

Days.defaultProps = {
  days: [],
  sections: [],
};

export default compose(
  withStyles(styles, { name: 'Days' }),
  resaga(CONFIG),
)(Days);
