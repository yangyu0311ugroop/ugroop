import { withStyles } from '@material-ui/core/styles';
import Container from 'components/Container';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import classNames from 'classnames';
import Carousel from 'containers/PublicPage/Components/Carousel/index';
import DayCard from 'containers/PublicPage/Components/DayCard/index';
import momentHelper from 'utils/helpers/moment';
import { postMetaInfo, queryImageURL } from 'utils/helpers/request';
import { isEmptyString } from 'utils/stringAdditions';
import { CONFIG } from './config';
import styles from './styles';

export class DayCarousel extends PureComponent {
  state = {
    page: 0,
    currPage: 0,
    slide: null,
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.daysId !== this.props.daysId) {
      const { daysId, currentDayId } = nextProps;
      const current = daysId.indexOf(currentDayId);
      if (current > -1) {
        this.setState({ page: current, currPage: current });
      }
    }
  };

  onChange = index => {
    this.setState({
      page: index,
      currPage: index,
    });
    if (this.props.days && this.props.days.length > 0) {
      const day = this.props.days[index];
      this.props.resaga.setValue({
        currentQueryDayId: day.id,
      });
    }
  };

  generateDate = (days, startDate) => {
    if (!isEmptyString(startDate)) {
      const isoDate = momentHelper.addDayThenGetDate(days, startDate, '');
      const date = momentHelper.getDateWithFormat(isoDate, 'MMMM D, YYYY');
      const week = momentHelper.getDateWithFormat(isoDate, 'ddd');
      return `${week} - ${date}`;
    }
    return '';
  };

  renderList = () => {
    const { classes, days, templateDate } = this.props;
    const { page } = this.state;
    if (days.length > 0) {
      return days.map((day, index) => {
        const isFirstItem = page === index;
        const meta = day.photos
          ? postMetaInfo({
              x: day.photos.metaInfo.x,
              y: day.photos.metaInfo.y,
              width: day.photos.metaInfo.width,
              height: day.photos.metaInfo.height,
            })
          : '';
        const rotate = day.photos ? day.photos.metaInfo.rotate : 0;
        const photoUrl = day.photos
          ? queryImageURL(day.photos.content, true, 1000, meta, 'width', rotate)
          : '';
        const datePosition = index + 1;
        const generateDate = this.generateDate(index, templateDate);
        return (
          <div className={classNames(classes.dayCardContainer)} key={day.id}>
            <DayCard
              id={day.id}
              dayCount={datePosition}
              dateText={generateDate}
              placeText={day.content}
              imgSrc={photoUrl}
              selected={isFirstItem}
              rotate={rotate}
            />
          </div>
        );
      });
    }

    return <div />;
  };

  render = () => {
    const items = this.renderList();

    return (
      <Container>
        <Carousel
          totalNum={items.length}
          onChange={this.onChange}
          focusOnSelect
          slideRef={this.state.slide}
          currPage={this.state.currPage}
        >
          {items}
        </Carousel>
      </Container>
    );
  };
}

DayCarousel.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  currentDayId: PropTypes.number,
  daysId: PropTypes.array,

  // resaga props
  days: PropTypes.array,
  templateDate: PropTypes.string,
  resaga: PropTypes.object,
};

DayCarousel.defaultProps = {
  days: [],
  daysId: [],
  currentDayId: 0,
  templateDate: '',
};

export default compose(
  withStyles(styles, { name: 'DayCarousel' }),
  resaga(CONFIG),
)(DayCarousel);
