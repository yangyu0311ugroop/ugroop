import Hidden from '@material-ui/core/Hidden';
import { ability } from 'apis/components/Ability/ability';
import { CARD, DEFAULT, DO_NOTHING } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import EventsWithoutDay from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/EventsWithoutDay';
// import PeopleCard from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/PeopleCard';
import RenderDay from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay';
import DayCheckList from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabChecklistView/components/Day';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import TabGallery from 'smartComponents/Node/types/TabGallery';
import { TEMPLATE } from 'utils/modelConstants';
import { LEFT, RIGHT } from 'react-swipeable';
import Swipeable from 'ugcomponents/Swipeable';
import { scroller } from 'react-scroll';
import { scrollFurtherOptions } from 'utils/constant';
import Navigator from './components/Navigator';
import { CONFIG } from './config';
import styles from './styles';
import { LOGIC_HELPERS } from '../../../../../../../../../utils/helpers/logic';

const SWIPE_DELTA_THRESHOLD = 180;

export class TabDayView extends PureComponent {
  state = {
    swiping: false,
    deltaX: 0,
  };

  componentWillMount = () => {
    this.selectDay(this.props);
  };

  componentWillReceiveProps = nextProps => {
    this.selectDay(nextProps);
  };

  componentWillUnmount = () => {
    clearTimeout(this.scrollTo);
  };

  selectDay = ({ startDate, selectedId, dayIds = [] }) => {
    if (!dayIds.length) return null;

    if (selectedId > 0) return null;

    return this.selectToday(undefined, { startDate, dayIds });
  };

  nextDay = () => {
    const { dayIds } = this.props;
    const dayId = this.selectedDayId();
    let i = dayIds.indexOf(dayId) + 1;
    i %= dayIds.length;
    const selectedId = dayIds[i];

    this.props.resaga.setValue({ selectedId });
    this.scrollTo = setTimeout(this.scrolling(selectedId), 100);
  };

  prevDay = () => {
    const { dayIds } = this.props;
    const dayId = this.selectedDayId();
    let i = dayIds.indexOf(dayId);
    if (i === 0) {
      i = dayIds.length;
    }
    i -= 1;
    const selectedId = dayIds[i];
    this.props.resaga.setValue({ selectedId });
    this.scrollTo = setTimeout(this.scrolling(selectedId), 100);
  };

  scrolling = selectedId => () => {
    scroller.scrollTo(`scroller-node-${selectedId}`, scrollFurtherOptions);
  };

  onSwiped = (data = {}) => {
    const { dir } = data;
    const { deltaX, swiping } = this.state;
    if (Math.abs(deltaX) >= SWIPE_DELTA_THRESHOLD && swiping) {
      LOGIC_HELPERS.switchCase(dir, {
        [LEFT]: this.nextDay,
        [RIGHT]: this.prevDay,
        [DEFAULT]: DO_NOTHING,
      });
    }
    this.setState({ deltaX: 0, swiping: false });
  };

  onSwiping = data => {
    const { deltaX } = data;
    this.setState({ swiping: true, deltaX });
  };

  todayIndex = (
    { startDate, dayIds = [] } = this.props,
    today = momentjs(),
  ) => {
    if (!dayIds.length) return null;

    if (startDate) {
      const startDay = momentjs(startDate)
        .hour(0)
        .minute(0)
        .second(0);

      const diff = today.diff(startDay, 'days');

      if (diff > -1 && diff < dayIds.length) {
        return diff;
      }
    }

    return -1;
  };

  selectToday = (_, { startDate, dayIds = [] } = this.props) => {
    if (!dayIds.length) return null;

    if (startDate) {
      const todayIndex = this.todayIndex({ startDate, dayIds });

      if (todayIndex !== -1) {
        return this.handleClick(dayIds[todayIndex])();
      }
    }

    return this.handleClick(dayIds[0])();
  };

  canEdit = () => this.props.editable && ability.can('update', TEMPLATE);

  handleClick = selectedId => () => {
    this.props.resaga.setValue({ selectedId });
  };

  selected = () => {
    const { dayIds, selectedId } = this.props;

    return selectedId > 0 && dayIds.indexOf(selectedId) !== -1;
  };

  selectedIndex = () => {
    const { dayIds, selectedId } = this.props;

    return this.selected() ? dayIds.indexOf(selectedId) : 0;
  };

  selectedDayId = () => {
    const { dayIds, selectedId } = this.props;

    return this.selected() ? selectedId : dayIds[0];
  };

  render = () => {
    const {
      classes,
      templateId,
      secondChild,
      id,
      dayIds,
      renderChecklistView,
      isPublic,
    } = this.props;

    if (!dayIds.length) return null;

    const index = this.selectedIndex();
    const dayId = this.selectedDayId();

    return (
      <GridContainer direction="column" spacing={0} className={classes.root}>
        <GridItem className={classes.contentWidth}>
          {!renderChecklistView && (
            <Swipeable onSwiped={this.onSwiped} onSwiping={this.onSwiping}>
              <RenderDay
                tabId={id}
                index={index}
                dayId={dayId}
                showEventDetail
                isPublic={isPublic}
                isDayView
              />
            </Swipeable>
          )}
          {renderChecklistView && (
            <DayCheckList
              templateId={templateId}
              tabId={id}
              dayId={dayId}
              index={index}
            />
          )}
        </GridItem>

        <Hidden mdUp>
          {/* <GridItem className={classes.peopleCardXs}>
            <PeopleCard templateId={templateId} />
          </GridItem> */}
          <GridItem className={classes.peopleCardXs}>
            <EventsWithoutDay templateId={templateId} tabId={id} smDown />
          </GridItem>

          <GridItem className={classes.peopleCardXs}>
            <TabGallery
              variant={CARD}
              id={secondChild}
              templateId={templateId}
              filtered
            />
          </GridItem>
        </Hidden>

        <GridItem>
          <hr />
          <Navigator id={templateId} dayIds={dayIds} />
        </GridItem>
      </GridContainer>
    );
  };
}

TabDayView.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,
  id: PropTypes.number,
  selectedId: PropTypes.number,
  secondChild: PropTypes.number,
  renderChecklistView: PropTypes.bool,
  isPublic: PropTypes.bool,

  // resaga props
  editable: PropTypes.bool,
  dayIds: PropTypes.array,
};

TabDayView.defaultProps = {
  dayIds: [],
  renderChecklistView: false,
  isPublic: false,
};

export default compose(
  withStyles(styles, { name: 'TabDayView' }),
  resaga(CONFIG),
)(TabDayView);
