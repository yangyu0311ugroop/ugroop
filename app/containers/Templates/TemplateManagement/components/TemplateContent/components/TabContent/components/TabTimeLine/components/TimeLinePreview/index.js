import PropTypes from 'prop-types';
import React from 'react';
import Sticky from 'react-stickynode';
import resaga from 'resaga';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { invisibleDivMark } from 'utils/constant';
import DayListView from './daylistView';
import TimeLineHeader from './timeLineHeader';
import TimeLineFooter from './timeLineFooter';
import { CONFIG } from './config';
import styleSheet from './style';

export const TimeLinePreview = ({ templateId, data, tabId, classes }) => {
  let content = null;
  if (data) {
    content = (
      <div className={classes.timeLinePreview}>
        <TimeLineHeader tabId={tabId} dayId={templateId} />
        <DayListView tabId={tabId} className={classes.border} />
        <TimeLineFooter tabId={tabId} />
      </div>
    );
  }
  return (
    <Sticky enabled top={90} bottomBoundary={`#${invisibleDivMark}`}>
      {content}
    </Sticky>
  );
};

TimeLinePreview.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  data: PropTypes.number,
  tabId: PropTypes.number.isRequired,

  // resaga
  templateId: PropTypes.number,
};

TimeLinePreview.defaultProps = {
  templateId: 0,
};

export default compose(
  resaga(CONFIG),
  withStyles(styleSheet, { name: 'TimeLinePreview' }),
)(TimeLinePreview);
