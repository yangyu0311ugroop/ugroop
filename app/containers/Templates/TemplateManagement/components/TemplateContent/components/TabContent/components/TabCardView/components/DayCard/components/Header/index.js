import { withStyles } from '@material-ui/core/styles';
import { Can } from 'apis/components/Ability/components/Can';
import { FLAT_BUTTON } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import H4 from 'components/H4';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import IconButton from 'ugcomponents/Buttons/IconButton';
import Icon from 'ugcomponents/Icon';
import Menu from 'ugcomponents/Menu/index';
import MenuItem from 'ugcomponents/Menu/MenuItem/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import momentHelper from 'utils/helpers/moment';
import { isEmptyString } from 'utils/stringAdditions';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class Header extends PureComponent {
  state = {
    open: false,
    anchorEl: null,
  };

  displayCardAddInfo = () => {
    const { classes, dayCount, startDate, displayDate, startTime } = this.props;

    let cardAddInfo = '';
    let isWeekend = false;

    if (displayDate === 'weekDay') {
      const date = moment.utc(startTime);
      isWeekend = LOGIC_HELPERS.ifElse(
        startTime,
        momentHelper.isWeekend(date),
        false,
      );
      cardAddInfo = this.displayDayOnly(classes, isWeekend, date);
    }

    if (!isEmptyString(startDate)) {
      const date = momentHelper.addDayThenGetDate(
        dayCount - 1,
        startDate,
        'YYYY-MM-DDTHH:mm:ssZ',
      );
      isWeekend = momentHelper.isWeekend(date);
      cardAddInfo = this.displayWithDate(classes, isWeekend, date);
    }

    return cardAddInfo;
  };

  displayWithDate = (classes, isWeekend, date) => (
    <React.Fragment>
      <div className={classnames(classes.dot, isWeekend && classes.whiteDot)} />
      <H4
        className={classnames(classes.header, isWeekend && classes.whiteColor)}
      >
        {momentHelper.getDateWithFormat(date, 'ddd, Do')}
      </H4>
    </React.Fragment>
  );

  displayDayOnly = (classes, isWeekend, date) => (
    <React.Fragment>
      <div className={classnames(classes.dot, isWeekend && classes.whiteDot)} />
      <H4
        className={classnames(classes.header, isWeekend && classes.whiteColor)}
      >
        {momentHelper.getDateWithFormat(date, 'ddd')}
      </H4>
    </React.Fragment>
  );

  handleCreateEvent = () => {
    const { id } = this.props;
    this.hideAddSectionMenu();

    this.props.resaga.setValue({
      eventCreate: EVENT_STORE_HELPERS.setEventCreate(true, id),
    });
  };

  showAddSectionMenu = event => {
    if (!this.state.open) {
      this.setState({ open: true, anchorEl: event.currentTarget });
    }
  };

  hideAddSectionMenu = () => this.state.open && this.setState({ open: false });

  renderCreateEvent = () => (
    <MenuItem onClick={this.handleCreateEvent}>Add new Event</MenuItem>
  );

  render = () => {
    const {
      classes,
      dayCount,
      startDate,
      displayDate,
      startTime,
      editable,
    } = this.props;
    let isWeekend = false;
    if (displayDate === 'weekDay') {
      const date = moment.utc(startTime);
      isWeekend = LOGIC_HELPERS.ifElse(
        startTime,
        momentHelper.isWeekend(date),
        false,
      );
    }

    if (!isEmptyString(startDate)) {
      const date = momentHelper.addDayThenGetDate(
        dayCount - 1,
        startDate,
        'YYYY-MM-DDTHH:mm:ssZ',
      );
      isWeekend = momentHelper.isWeekend(date);
    }

    return (
      <div
        className={classnames(classes.root, isWeekend && classes.weekendHeader)}
      >
        <GridContainer
          spacing={0}
          alignItems="center"
          className={classnames(classes.container)}
        >
          <GridItem
            className={classes.grow}
            container
            alignItems="center"
            spacing={0}
          >
            <H4
              className={classnames(
                classes.header,
                isWeekend && classes.whiteColor,
              )}
            >
              <M {...m.dayLabel} /> {dayCount}
            </H4>
            {this.displayCardAddInfo()}
          </GridItem>

          {editable && (
            <Can do="create" on="event">
              <GridItem>
                <IconButton
                  onClick={this.showAddSectionMenu}
                  tooltip="Add"
                  variant={FLAT_BUTTON}
                  transparent
                >
                  <Icon
                    icon="lnr-plus"
                    className={classnames({ [classes.whiteColor]: isWeekend })}
                  />
                </IconButton>
              </GridItem>
            </Can>
          )}

          <Menu
            id="add-day-options"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onClose={this.hideAddSectionMenu}
          >
            {this.renderCreateEvent()}
          </Menu>
        </GridContainer>
      </div>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  dayCount: PropTypes.number,
  startTime: PropTypes.string,
  startDate: PropTypes.string,
  id: PropTypes.number.isRequired,
  displayDate: PropTypes.string,

  // resaga props
  editable: PropTypes.bool,
};

Header.defaultProps = {
  dayCount: 0,
};

export default compose(
  withStyles(styles, { name: 'Header' }),
  resaga(CONFIG),
)(Header);
