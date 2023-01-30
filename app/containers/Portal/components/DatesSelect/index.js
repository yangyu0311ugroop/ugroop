import { Slide } from '@material-ui/core';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import MiniCalendarSelect from 'components/MiniCalendar/components/MiniCalendarSelect';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import JDialog from 'ugcomponents/JDialog';
import { CONFIG } from './config';
import styles from './styles';

export class DatesSelect extends PureComponent {
  handleCloseDialog = () => PORTAL_HELPERS.close(this.props);

  handleValidSubmit = form => form;

  render = () => {
    const {
      classes,
      templateId,
      startDate,
      endDate,
      onDatesChange,
      range,
      dates,
      multiple,
    } = this.props;

    return (
      <JDialog
        open
        fullWidth
        fullScreen={false}
        onClose={this.handleCloseDialog}
        overrideClasses={{
          scrollPaper: classes.scrollPaper,
        }}
        onValidSubmit={this.handleValidSubmit}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
        hideSubmitButton
      >
        <GridContainer alignItems="center" direction="column">
          <GridItem>
            <MiniCalendarSelect
              id={templateId}
              startDate={startDate}
              endDate={endDate}
              dates={dates}
              multiple={multiple}
              range={range}
              onDatesChange={onDatesChange}
              onClose={this.handleCloseDialog}
            />
          </GridItem>
        </GridContainer>
      </JDialog>
    );
  };
}

DatesSelect.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  onDatesChange: PropTypes.func,
  range: PropTypes.bool,
  multiple: PropTypes.bool,
  dates: PropTypes.array,

  // resaga props
};

DatesSelect.defaultProps = {
  dates: [],
};

export default compose(
  withStyles(styles, { name: 'DatesSelect' }),
  resaga(CONFIG),
)(DatesSelect);
