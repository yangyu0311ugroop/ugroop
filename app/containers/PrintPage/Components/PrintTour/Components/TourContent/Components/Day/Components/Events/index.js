import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import EventCardWithEventIds from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabItineraryView/components/EventDay/components/EventsCard/eventCardwithEventIds';
import styles from './styles';

export class Events extends PureComponent {
  render = () => {
    const { dayId, classes } = this.props;
    return (
      <GridContainer spacing={0} className={classes.root}>
        <GridItem xs={1} className={classes.col1} />
        <GridItem xs={10} className={classes.line}>
          <GridContainer
            spacing={0}
            direction="column"
            className={classes.eventContainer}
          >
            <EventCardWithEventIds id={dayId} showLabel />
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

Events.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  dayId: PropTypes.number.isRequired,
};

Events.defaultProps = {};

export default compose(withStyles(styles, { name: 'Events' }))(Events);
