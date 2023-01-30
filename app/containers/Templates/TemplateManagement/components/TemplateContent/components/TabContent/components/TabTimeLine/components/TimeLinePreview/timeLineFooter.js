import React from 'react';
import H5 from 'components/H5';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import resaga from 'resaga';
import { isEmptyString } from 'utils/stringAdditions';
import styleSheet from './style';
import { CONFIG } from './defines/timeLineFooterConfig';
export class TimeLineFooter extends React.PureComponent {
  state = {};

  render() {
    const { dayIds, classes } = this.props;
    if (dayIds.length !== 0) {
      if (isEmptyString(this.props.dateTitle)) {
        return (
          <AppBar position="static" className={classes.timeLineFooter}>
            <div />
          </AppBar>
        );
      }
      const dateTitle = (
        <H5 className={classes.dateTitle}>{this.props.dateTitle}</H5>
      );
      return (
        <AppBar position="static" className={classes.timeLineFooter}>
          <H5 className={classes.endDate}>End Date</H5>
          {dateTitle}
        </AppBar>
      );
    }
    return <div />;
  }
}

TimeLineFooter.propTypes = {
  dayIds: PropTypes.array,
  classes: PropTypes.object.isRequired,
  // resaga
  dateTitle: PropTypes.string,
};

TimeLineFooter.defaultProps = {
  dayIds: [],
};

export default compose(
  withStyles(styleSheet, { name: 'TimeLineFooter' }),
  resaga(CONFIG),
)(TimeLineFooter);
