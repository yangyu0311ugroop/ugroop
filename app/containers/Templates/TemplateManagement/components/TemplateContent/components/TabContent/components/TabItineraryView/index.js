import { Hidden } from '@material-ui/core';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Heading from 'smartComponents/Node/parts/Heading';
import LayoutSelect from 'smartComponents/Node/types/TabTimeline/components/LayoutSelect';
import { VARIANTS } from 'variantsConstants';
import Node from 'smartComponents/Node';
import FlightBookings from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/FlightBookings';
import EventsWithoutDay from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/EventsWithoutDay';
import EventDay from './components/EventDay';
import { CONFIG } from './config';
import styles from './styles';

export class TabItineraryView extends PureComponent {
  renderDays = () => {
    const { tabChildren } = this.props;
    return tabChildren.map((id, index) => (
      <GridItem key={id}>
        <GridContainer direction="column" spacing={0}>
          <Heading id={id} component={GridItem} first={index === 0} />
          <GridItem>
            <EventDay id={id} index={index} />
          </GridItem>
        </GridContainer>
        <Node id={id} variant={VARIANTS.LOGIC} />
      </GridItem>
    ));
  };

  render = () => {
    const { classes, templateId, tabId, isPublic } = this.props;
    return (
      <GridContainer direction="column" className={classes.daysRoot}>
        <GridItem>
          <Hidden smDown>
            <LayoutSelect isPublic={isPublic} row />
          </Hidden>
          <Hidden mdUp>
            <LayoutSelect isPublic={isPublic} />
          </Hidden>
        </GridItem>
        {this.renderDays()}
        <FlightBookings card bottom templateId={templateId} />
        <EventsWithoutDay bottom templateId={templateId} tabId={tabId} />
      </GridContainer>
    );
  };
}

TabItineraryView.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,
  tabId: PropTypes.number,

  // resaga props
  tabChildren: PropTypes.array,
  isPublic: PropTypes.bool,
};

TabItineraryView.defaultProps = {
  templateId: null,
  tabId: null,

  tabChildren: [],
};

export default compose(
  withStyles(styles, { name: 'TabItineraryView' }),
  resaga(CONFIG),
)(TabItineraryView);
