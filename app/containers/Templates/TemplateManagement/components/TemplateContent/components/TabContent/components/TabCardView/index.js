import { Hidden } from '@material-ui/core';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React from 'react';
import slice from 'lodash/slice';
import { compose } from 'redux';
import resaga from 'resaga';
import Heading from 'smartComponents/Node/parts/Heading';
import LayoutSelect from 'smartComponents/Node/types/TabTimeline/components/LayoutSelect';
import momentHelper from 'utils/helpers/moment';
import { isEmptyString } from 'utils/stringAdditions';
import ReactResizeDetector from 'react-resize-detector';
import HRWithText from 'ugcomponents/HRWithText';
import { withXSDown } from 'components/material-ui/hocs/withMediaQuery';
import classnames from 'classnames';
import DayCard from './components/DayCard';
import { CONFIG } from './config';
import { makeStyles } from '../../../../../../../../../components/material-ui';
import { useMarketplaceContext } from '../../../../../../../../MarketPlace/context/marketPlaceStateContext';

const useStyles = (image, height) =>
  // eslint-disable-next-line no-unused-vars
  makeStyles(({ colors }) => ({
    root: {},
    grow: {
      flex: '1',
    },
    containerSize: {
      height: '100%',
      width: '100%',
    },
    imageBackground: {
      backgroundImage: `url(${image})`,
      height: height + 20,
      width: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: 5,
    },
    blur: {
      background: 'rgba(255, 255, 255, 0.2)', // Make sure this color has an opacity of less than 1
      backdropFilter: 'blur(8px)',
      height: '100%',
      width: '100%',
      padding: 16,
      borderRadius: 5,
    },
    divisionHeader: {
      display: 'flex',
      alignItems: 'center',
    },
    xsFont: {
      fontSize: 14,
    },
    dot: {
      height: '4px',
      width: '4px',
      backgroundColor: '#93aeee',
      borderRadius: '100%',
      margin: '2px 8px 0 8px',
    },
  }));

export function TabCardView(props) {
  /**
   * Create day sections
   * @param {Array} tabChildren
   * @param {Array} divisions
   * @return {Array}
   */
  const [state, dispatchCtx] = useMarketplaceContext();
  const classes = useStyles(
    props.image,
    state && state.tabCardViewDetectHeight,
  )();
  const {
    templateId,
    tabChildren,
    startDate,
    displayDate,
    isPublic,
    showLayout,
    isLazyLoad,
    xsDown,
  } = props;

  const createSections = divisions => {
    let offset = 0;
    return divisions.map((division, index) => {
      if (index === 0) {
        offset += division.count;
        return {
          month: `${division.month}`,
          year: `${division.year}`,
          children: slice(tabChildren, 0, division.count),
        };
      }
      if (index === divisions.length - 1) {
        return {
          month: `${division.month}`,
          year: `${division.year}`,
          children: slice(tabChildren, offset, tabChildren.length),
        };
      }
      offset += division.count;
      return {
        month: `${division.month}`,
        year: `${division.year}`,
        children: slice(
          tabChildren,
          offset - division.count,
          division.count + 1,
        ),
      };
    });
  };

  const renderHeading = heading => (
    <>
      <GridItem xs={12} />
      <GridItem xs={12}>{heading}</GridItem>
    </>
  );

  const renderSingleMonth = (currMonth = '') => {
    const splittedDate = currMonth.split(' ');
    const headerText = isEmptyString(currMonth) ? (
      ''
    ) : (
      <div
        className={classnames(xsDown && classes.xsFont, classes.divisionHeader)}
      >
        {splittedDate[0]}
        <div className={classes.dot} />
        {splittedDate[1]}
      </div>
    );

    const header = isEmptyString(currMonth) ? (
      ''
    ) : (
      <HRWithText content={headerText} noHr={!showLayout} />
    );

    const days = tabChildren.map((id, index) => (
      <>
        <Heading id={id} key={`heading-${id}`} first={index === 0}>
          {renderHeading}
        </Heading>
        <GridItem xs={12} sm={6} md={4} key={id}>
          <DayCard
            key={id}
            dayId={id}
            dayCount={index + 1}
            startDate={startDate}
            displayDate={displayDate}
            templateId={templateId}
            isLazyLoad={isLazyLoad}
          />
        </GridItem>
      </>
    ));

    return (
      <React.Fragment>
        {header}
        <GridContainer>{days}</GridContainer>
      </React.Fragment>
    );
  };

  const renderMultiMonth = divisions => {
    const daysSections = createSections(divisions);
    let dayCount = 0;

    return daysSections.map(daysSection => {
      const days = daysSection.children.map((id, index) => {
        dayCount += 1;
        return (
          <>
            <Heading id={id} key={`heading-${id}`} first={index === 0}>
              {renderHeading}
            </Heading>
            <GridItem xs={12} sm={6} md={4} key={id}>
              <DayCard
                startDate={startDate}
                dayId={id}
                dayCount={dayCount}
                displayDate={displayDate}
                templateId={templateId}
                isLazyLoad={isLazyLoad}
              />
            </GridItem>
          </>
        );
      });
      const headerText = (
        <div className={classes.divisionHeader}>
          {daysSection.month}
          <div className={classes.dot} />
          {daysSection.year}
        </div>
      );
      return (
        <React.Fragment key={`${daysSection.month}-${daysSection.year}`}>
          <HRWithText content={headerText} />
          <GridContainer>{days}</GridContainer>
        </React.Fragment>
      );
    });
  };

  const renderDays = () => {
    const currMonth = momentHelper.getDateWithFormat(startDate, 'MMMM YYYY');

    if (startDate === null) {
      return renderSingleMonth();
    }

    const addedDaysMonth = momentHelper.addDayThenGetDate(
      tabChildren.length,
      startDate,
      'MMMM YYYY',
    );

    if (addedDaysMonth !== currMonth) {
      const division = momentHelper.trackStartDateUpToAddedDay(
        startDate,
        tabChildren.length,
      );
      return renderMultiMonth(division);
    }

    return renderSingleMonth(currMonth);
  };

  const renderLayout = () => {
    if (showLayout) {
      return (
        <GridItem>
          <Hidden smDown>
            <LayoutSelect isPublic={isPublic} row />
          </Hidden>
          <Hidden mdUp>
            <LayoutSelect isPublic={isPublic} />
          </Hidden>
        </GridItem>
      );
    }
    return null;
  };

  const wrapImageBackground = children => {
    if (showLayout) {
      return children;
    }
    return (
      <div className={classes.containerSize}>
        <div className={classes.imageBackground}>
          <div className={classes.blur}>{children}</div>
        </div>
      </div>
    );
  };

  const onResize = (width, height) => {
    dispatchCtx.setDetectTabCardHeight(height);
  };

  const renderChildren = () => (
    <GridContainer direction="column" className={classes.root}>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      {renderLayout()}
      <GridItem xs={12}>{renderDays()}</GridItem>
    </GridContainer>
  );
  return wrapImageBackground(renderChildren());
}

TabCardView.propTypes = {
  // parent props
  templateId: PropTypes.number,
  showLayout: PropTypes.bool,
  // resaga props
  tabChildren: PropTypes.array,
  startDate: PropTypes.string,
  displayDate: PropTypes.string,
  isPublic: PropTypes.bool,
  image: PropTypes.string,
  isLazyLoad: PropTypes.bool,
  xsDown: PropTypes.bool,
};

TabCardView.defaultProps = {
  tabChildren: [],
  startDate: '',
  showLayout: true,
  isLazyLoad: true,
};

export default compose(
  resaga(CONFIG),
  withXSDown,
)(React.memo(TabCardView));
