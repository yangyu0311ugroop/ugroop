import TextField from '@material-ui/core/TextField';
import { THE_BIG_DOT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import MiniCalendarSelect from 'components/MiniCalendar/components/MiniCalendarSelect';
import Popper from 'components/Popper';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import moment from 'moment';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class DatesSelect extends PureComponent {
  state = {
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    dates: this.props.dates,
  };

  openDialog = () => {
    const { templateId, range, multiple } = this.props;
    const { startDate, endDate, dates } = this.state;

    PORTAL_HELPERS.openDatesSelect(
      {
        multiple,
        range,
        templateId,
        startDate,
        endDate,
        dates,
        onDatesChange: this.handleDatesChange,
      },
      this.props,
    );
  };

  handleDatesChange = params => {
    const { onDatesChange } = this.props;

    this.setState(params);

    LOGIC_HELPERS.ifFunction(onDatesChange, [params]);
  };

  handleValidSubmit = form => form;

  renderPopperMenu = ({ closeMenu }) => {
    const { templateId, range, multiple } = this.props;
    const { startDate, endDate, dates } = this.state;

    return (
      <Formsy onValidSubmit={this.handleValidSubmit}>
        <GridContainer direction="column">
          <GridItem>
            <MiniCalendarSelect
              range={range}
              multiple={multiple}
              id={templateId}
              startDate={startDate}
              endDate={endDate}
              dates={dates}
              onClose={closeMenu}
              onDatesChange={this.handleDatesChange}
            />
          </GridItem>
        </GridContainer>
      </Formsy>
    );
  };

  renderDates = ({ startDate, endDate, dates = [] } = {}) => {
    const { range, multiple } = this.props;

    if (multiple) {
      if (!dates.length) {
        return 'Select dates';
      }

      return dates
        .map(date => moment(date).format('ddd, D MMM'))
        .join(` ${THE_BIG_DOT} `);
    }

    if (!range) {
      if (!startDate) {
        return 'Select date';
      }

      return startDate.format('ddd, D MMM');
    }

    if (!startDate) {
      return 'Select dates';
    }

    if (!endDate) {
      return `${startDate.format('ddd, D MMM')} - Check out`;
    }

    return `${startDate.format('ddd, D MMM')} - ${endDate.format(
      'ddd, D MMM',
    )}`;
  };

  renderButton = params => ({ openMenu } = {}) => {
    const { smDown, helperText } = this.props;

    return (
      <GridContainer
        direction="column"
        onClick={smDown ? this.openDialog : openMenu}
      >
        <GridItem>
          <TextField
            fullWidth
            value={this.renderDates(params)}
            placeholder="Add dates"
            InputProps={{
              readOnly: true,
            }}
            helperText={helperText}
          />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { smDown, helperText } = this.props;

    if (smDown) {
      return this.renderButton(this.state)();
    }

    return (
      <Popper
        placement="bottom-start"
        renderButton={this.renderButton(this.state)}
        helperText={helperText}
      >
        {this.renderPopperMenu}
      </Popper>
    );
  };
}

DatesSelect.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  helperText: PropTypes.node,
  onDatesChange: PropTypes.func,
  smDown: PropTypes.bool,
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
  withSMDown,
)(DatesSelect);
