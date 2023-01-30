import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';
import _ from 'lodash';
import GridItem from 'components/GridItem/index';
import GridContainer from 'components/GridContainer/index';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Content from './Components/Content';

export class Itinerary extends PureComponent {
  getDayDescription = dayId => {
    const { days } = this.props;
    const day = Object.values(days).filter(o => o.id === dayId);
    const content = dotProp.get(day[0], 'content', '');
    const customData = dotProp.get(day[0], 'customData', '');
    const location = dotProp.get(customData, 'location', '');
    return `${content} ${location}`;
  };

  mergeDays = () => {
    const { dayIds } = this.props;
    let a = '';
    let ctr = 0;
    const daysMerge = dayIds.reduce((acc, curr) => {
      const b = this.getDayDescription(curr);
      ctr += 1;
      if (a !== b || ctr === 1) {
        a = b;
        return acc.concat({
          id: curr,
          content: b,
          endIdx: 0,
          dayNum: ctr,
        });
      }
      const idx = _.findLastIndex(acc);
      acc[idx].endIdx = ctr;
      a = b;
      return acc;
    }, []);
    return daysMerge;
  };

  renderItinerary = () => {
    const { classes, templateId } = this.props;
    const dayMerge = this.mergeDays();
    const array = dayMerge.map((day, index) => {
      const dayIndex = index + 1;
      return (
        <GridItem key={day.id}>
          <Content
            dayId={day.id}
            endId={day.endIdx}
            index={dayIndex}
            dayNum={day.dayNum}
            dayCount={dayMerge.length}
            templateId={templateId}
          />
        </GridItem>
      );
    });
    return (
      <GridContainer spacing={0}>
        <GridItem xs={1} className={classes.col1} />
        <GridItem xs={9}>
          <GridContainer spacing={0} direction="column">
            {array}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes } = this.props;
    const itinerary = this.renderItinerary();
    return <GridItem className={classes.colWith}>{itinerary}</GridItem>;
  };
}

Itinerary.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  dayIds: PropTypes.array,
  days: PropTypes.object,
  templateId: PropTypes.number,
  // resaga props
};

Itinerary.defaultProps = {
  dayIds: [],
  days: {},
  templateId: 0,
};

export default compose(
  withStyles(styles, { name: 'Itinerary' }),
  // resaga(CONFIG)
)(Itinerary);
