import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import classNames from 'classnames';
import Button from 'ugcomponents/Buttons/Button';
import Icon from 'ugcomponents/Icon';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import m from './messages';
import styles from './styles';

export class DayCarousel extends PureComponent {
  componentWillReceiveProps = nextProps => {
    if (nextProps.currPage !== this.props.currPage) {
      this.slider.slickGoTo(nextProps.currPage);
    }
  };

  onNext = () => {
    let page;
    const { currPage, totalNum } = this.props;
    const slidesToMove = this.slider.innerSlider.props.slidesToShow;
    page = currPage + slidesToMove;
    if (page > totalNum - 1) {
      page = 0;
    }
    this.slider.slickGoTo(page);
  };

  onPrev = () => {
    let page;
    const { currPage } = this.props;
    const slidesToMove = this.slider.innerSlider.props.slidesToShow;
    page = currPage - slidesToMove;
    if (page < 0) {
      page = 0;
    }
    this.slider.slickGoTo(page);
  };

  LargeScreen = (totalNum, size = 1, maxSlides) => {
    let shouldShow = totalNum > 3 ? 4 : totalNum;
    if (totalNum === 1) {
      shouldShow = 1;
    } else if (totalNum === 2) {
      shouldShow = 2;
    }

    shouldShow = LOGIC_HELPERS.ifElse(
      shouldShow > maxSlides,
      maxSlides,
      shouldShow,
    );

    return {
      breakpoint: 1615 * size,
      settings: {
        slidesToShow: shouldShow,
      },
    };
  };

  NormalScreen = (totalNum, size = 1, maxSlides) => {
    let shouldShow = totalNum > 2 ? 3 : totalNum;
    if (totalNum < 2) {
      shouldShow = 1;
    }

    shouldShow = LOGIC_HELPERS.ifElse(
      shouldShow > maxSlides,
      maxSlides,
      shouldShow,
    );

    return {
      breakpoint: 1415 * size,
      settings: {
        slidesToShow: shouldShow,
      },
    };
  };

  MediumScreen = (totalNum, size = 1, maxSlides) => {
    let shouldShow = 2;
    if (totalNum < 3) {
      shouldShow = 1;
    }

    shouldShow = LOGIC_HELPERS.ifElse(
      shouldShow > maxSlides,
      maxSlides,
      shouldShow,
    );

    return {
      breakpoint: 1215 * size,
      settings: {
        slidesToShow: shouldShow,
      },
    };
  };

  SmallScreen = (size = 1) => ({
    breakpoint: 815 * size,
    settings: {
      slidesToShow: 1,
    },
  });

  slidetoShow = (totalNum, maxSlides) => {
    let shouldShow = totalNum;
    if (totalNum >= 4) {
      shouldShow = 4;
    }
    if (totalNum <= 0) {
      shouldShow = 1;
    }
    shouldShow = LOGIC_HELPERS.ifElse(
      shouldShow > maxSlides,
      maxSlides,
      shouldShow,
    );

    return shouldShow;
  };

  responsiveBreakPoints = (totalNum, size = 1, maxSlides) => [
    this.LargeScreen(totalNum, size, maxSlides),
    this.NormalScreen(totalNum, size, maxSlides),
    this.MediumScreen(totalNum, size, maxSlides),
    this.SmallScreen(size),
  ];

  createSliderRef = c => {
    this.slider = c;
  };

  renderActions = () => {
    const { classes, totalNum } = this.props;
    let actions = <div className={classes.noAction} />;
    if (totalNum) {
      actions = (
        <div className={classes.actionContainer}>
          <Button
            disableRipple
            className={classNames(classes.btn, classes.prevBtn)}
            onClick={this.onPrev}
          >
            <Icon icon="chevron-left" className={classes.icon} />
            <M {...m.prevBtn} />
          </Button>
          <Button
            disableRipple
            className={classNames(classes.btn, classes.nextBtn)}
            onClick={this.onNext}
          >
            <M {...m.nextBtn} />
            <Icon icon="chevron-right" className={classes.icon} />
          </Button>
        </div>
      );
    }
    return actions;
  };

  render = () => {
    // eslint-disable-next-line
    const { classes, onChange, size, currPage, maxSlides, children, totalNum, ...sliderProps } = this.props;
    const actions = this.renderActions();
    return (
      <div className={classes.container}>
        <Slider
          ref={this.createSliderRef}
          className={classes.root}
          afterChange={onChange}
          responsive={this.responsiveBreakPoints(totalNum, size, maxSlides)}
          dots={false}
          arrows={false}
          slidesToShow={this.slidetoShow(totalNum, maxSlides)}
          slidesToScroll={1}
          {...sliderProps}
          swipeToSlide
          draggable
        >
          {children}
        </Slider>
        {actions}
      </div>
    );
  };
}

DayCarousel.propTypes = {
  totalNum: PropTypes.number,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  currPage: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  slideRef: PropTypes.object,
  size: PropTypes.number,
  maxSlides: PropTypes.number,
};

DayCarousel.defaultProps = {
  size: 1,
  currPage: 0,
  totalNum: 0,
  maxSlides: 4,
};

export default withStyles(styles, { name: 'DayCarousel' })(DayCarousel);
