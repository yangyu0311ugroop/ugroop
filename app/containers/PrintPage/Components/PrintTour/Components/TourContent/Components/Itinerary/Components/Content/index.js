import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import classNames from 'classnames';
import GridItem from 'components/GridItem/index';
import GridContainer from 'components/GridContainer/index';
import DayDateDisplay from 'containers/Templates/TemplateManagement/components/DayDateDisplay';
import { H4 } from 'viewComponents/Typography';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import { isEmptyString } from 'utils/stringAdditions';
import { CONFIG } from './config';
import styles from './styles';
import m from '../../../../../../messages';

export class Content extends PureComponent {
  render = () => {
    const {
      classes,
      dayId,
      location,
      content,
      index,
      dayCount,
      endId,
      dayNum,
    } = this.props;
    const isLastItem = dayCount === index && dayCount > 1;
    const isFirstItem = index === 1;
    let title;
    if (isEmptyString(content)) {
      title = <M {...m.dayNoTitle} />;
    } else {
      title = location ? `${content}  |  ` : content;
    }
    const stepper = (
      <GridItem>
        <div
          className={classNames(
            { [classes.firstItemNocontent]: isFirstItem },
            { [classes.lastItem]: isLastItem },
            { [classes.middleContent]: !isLastItem && !isFirstItem },
          )}
        />
        <div
          className={classNames(
            { [classes.firstItem]: isFirstItem },
            { [classes.lastItemNocontent]: isLastItem },
            { [classes.middleContent]: !isLastItem && !isFirstItem },
          )}
        />
      </GridItem>
    );
    const LocationDesc = <strong>{location}</strong>;
    const titleLocation = (
      <GridItem xs={8}>
        <p className={classes.dayTitleContent}>
          {title}
          {LocationDesc}
        </p>
      </GridItem>
    );
    const dayDate = (
      <DayDateDisplay
        id={dayId}
        index={dayNum - 1}
        customClass={classes}
        dayDateFormat={FORMATS_DATE_TIME.DAY_DATE_SHORT}
      />
    );
    const dayNumStr =
      endId === 0 ? (
        dayDate
      ) : (
        <H4 className={classes.dayNotSet}>{`Day ${dayNum} - ${endId}`}</H4>
      );
    return (
      <GridContainer spacing={0} className={classes.itinerary} direction="row">
        <GridItem
          className={classNames(classes.dayNum, {
            [classes.daystepLine]: dayCount > 1,
            [classes.dayNumLast]: isLastItem,
          })}
          xs={3}
        >
          {dayNumStr}
        </GridItem>
        {stepper}
        {titleLocation}
      </GridContainer>
    );
  };
}

Content.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  dayId: PropTypes.number,
  endId: PropTypes.number,
  index: PropTypes.number,
  dayCount: PropTypes.number,
  dayNum: PropTypes.number,
  // resaga props
  content: PropTypes.string,
  location: PropTypes.string,
};

Content.defaultProps = {
  dayId: 0,
  endId: 0,
  index: 0,
  content: '',
  location: '',
  dayCount: 0,
  dayNum: 0,
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(Content);
