import React from 'react';
import H5 from 'components/H5';
import PropTypes from 'prop-types';
import Tooltip from 'viewComponents/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import resaga from 'resaga';
import { isEmptyString, pluralizeText } from 'utils/stringAdditions';
import styleSheet from './style';
import { CONFIG } from './defines/timeLineHeaderConfig';

export class TimeLineHeader extends React.PureComponent {
  state = {};

  renderBadge = () => {
    const { classes, unresolvedFeedbackCount: count } = this.props;

    if (!count) {
      return '';
    }

    const discussion = pluralizeText('Tour Discussion', count);
    const title = `You have ${count} unresolved ${discussion}`;

    return (
      <Tooltip title={title} placement="top">
        <div className={classes.headerBadge} />
      </Tooltip>
    );
  };

  render() {
    const { dayIds, dateTitle, classes } = this.props;

    if (dayIds.length !== 0) {
      if (isEmptyString(dateTitle)) {
        return (
          <AppBar position="static" className={classes.timeLineHeader}>
            <div />
          </AppBar>
        );
      }

      return (
        <AppBar position="static" className={classes.timeLineHeader}>
          <H5 dense className={classes.startDate}>
            Start Date
          </H5>
          <div className={classes.relative}>
            <H5 dense className={classes.dateTitle}>
              {dateTitle}
            </H5>
            {this.renderBadge()}
          </div>
        </AppBar>
      );
    }
    return <div />;
  }
}

TimeLineHeader.propTypes = {
  unresolvedFeedbackCount: PropTypes.number,
  dayIds: PropTypes.array,
  classes: PropTypes.object.isRequired,
  // resaga value
  dateTitle: PropTypes.string,
};

TimeLineHeader.defaultProps = {
  dayIds: [],
};

export default compose(
  withStyles(styleSheet, { name: 'TimeLineHeader' }),
  resaga(CONFIG),
)(TimeLineHeader);
