import React, { PureComponent } from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { templateDayIdAnchor, scrollOptions } from 'utils/constant';
import { scroller } from 'react-scroll';
import { isEmptyString } from 'utils/stringAdditions';
import { CONFIG } from './defines/dayCellConfig';
import UGItemCell from './UIItemCell';

export class DayCell extends PureComponent {
  didSelectRowAt = () => {
    this.dispatchSelectRow(this.props.dayId);
    scroller.scrollTo(templateDayIdAnchor(this.props.dayId), scrollOptions);
  };

  dispatchSelectRow = dayId => {
    this.props.resaga.setValue({ selectDayId: dayId });
  };

  render() {
    let subTitle = 'No Title Yet';
    let showTooltip = false;
    const { unresolvedFeedbackCount } = this.props;
    if (!isEmptyString(this.props.dayContent)) {
      subTitle = this.props.dayContent;
      showTooltip = true;
    }
    let active = false;
    if (!this.props.selectDayId && this.props.row === 0) {
      active = true;
    } else if (this.props.selectDayId === this.props.dayId) {
      active = true;
    }
    return (
      <UGItemCell
        row={this.props.row}
        Title={this.props.dateTitle}
        SubTitle={subTitle}
        active={active}
        showTooltip={showTooltip}
        didSelectRowAt={this.didSelectRowAt}
        hasBadge={unresolvedFeedbackCount > 0}
      />
    );
  }
}

DayCell.propTypes = {
  dayId: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  // resaga
  dateTitle: PropTypes.string,
  dayContent: PropTypes.string,
  resaga: PropTypes.object,
  selectDayId: PropTypes.number,
  unresolvedFeedbackCount: PropTypes.number,
};

export default compose(resaga(CONFIG))(DayCell);
