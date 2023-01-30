import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import first from 'lodash/first';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import endInputs from 'smartComponents/Event/components/Event/parts/Event/EndTime/inputs';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import withDayIds from 'smartComponents/Node/types/Template/hocs/withDayIds';
import { Data } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';

import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { node, data } = props;

  let tempEndDay;

  const endTimeValue = EVENT_VIEW_HELPERS.endTimeValue(node);

  if (endTimeValue) {
    const days = moment.duration(endTimeValue).days();
    tempEndDay = `P${days}D`;
  } else {
    tempEndDay = EVENT_VIEW_HELPERS.tempEndDay(node);
  }

  if (tempEndDay) {
    return tempEndDay;
  }

  return LOGIC_HELPERS.ifElse(
    EVENT_VIEW_HELPERS.isAccommodation(data),
    'P1D',
    'P0D',
  );
};

export class EndDate extends PureComponent {
  state = {
    value: defaultValue(this.props),
  };

  renderUnanchoredDays = value => {
    const days = EVENT_DATA_HELPERS.durationToDays(value);

    if (days === 0) {
      return 'Same day';
    }

    return `${days} day${LOGIC_HELPERS.ifElse(days > 1, 's', '')} later`;
  };

  renderDayDate = ({ openMenu, open }) => value => {
    const { label, placeholder } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem onClick={LOGIC_HELPERS.ifElse(!open, openMenu)}>
          <FilledTextField
            fullWidth
            autoComplete="off"
            onFocus={openMenu}
            readonly
            value={value}
            label={label}
            placeholder={placeholder}
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderButton = ({ openMenu, open, value, startDayId, batchCreate }) => {
    const { tabId } = this.props;

    const unanchored = startDayId === tabId;
    const renderDayDate = this.renderDayDate({ openMenu, open });

    // if unanchored or batch create, only show relative days count
    // i.e. Same day, 1 day later, etc.
    if (unanchored || batchCreate) {
      const renderDays = this.renderUnanchoredDays(value);

      return renderDayDate(renderDays);
    }

    // otherwise render the end date

    return (
      <DayDate id={startDayId} offset={value} showDayIndex>
        {renderDayDate}
      </DayDate>
    );
  };

  options = startDayId => {
    const { dayIds } = this.props;

    const startIndex = dayIds.indexOf(startDayId);

    if (startIndex !== -1) {
      return dayIds.slice(startIndex);
    }

    return dayIds;
  };

  clickOption = ({ index, closeMenu }) => e => {
    this.setState({
      value: `P${index}D`,
    });
    return LOGIC_HELPERS.ifFunction(closeMenu, [e]);
  };

  renderOptionContent = ({
    showDate,
    unanchored,
    index,
    active,
    startDayId,
  }) => {
    if (!showDate) {
      return (
        <GridItem>
          <JText gray={!unanchored} dark={unanchored}>
            {LOGIC_HELPERS.ifElse(
              index === 0,
              'Same day',
              `${index} day${LOGIC_HELPERS.ifElse(index > 1, 's', '')} later`,
            )}
          </JText>
        </GridItem>
      );
    }

    return (
      <>
        <GridItem xs>
          <JText bold={active} dark>
            <DayDate id={startDayId} offset={`P${index}D`} showDayIndex />
          </JText>
        </GridItem>

        {index > 0 && (
          <GridItem>
            <JText gray={!unanchored} dark={unanchored}>
              {index} d
            </JText>
          </GridItem>
        )}
      </>
    );
  };

  renderOption = ({ closeMenu, value, startDayId, showDate, unanchored }) => (
    dayId,
    index,
  ) => {
    const active = value === `P${index}D`;

    return (
      <GridItem key={dayId}>
        <JButton
          noBorderRadius
          block
          bg={LOGIC_HELPERS.ifElse(active, 'gray')}
          textAlign="left"
          onClick={this.clickOption({ index, closeMenu })}
        >
          <GridContainer alignItems="center">
            <GridItem>
              <input
                type="radio"
                name="startDates"
                value="email"
                checked={active}
              />
            </GridItem>
            {this.renderOptionContent({
              showDate,
              unanchored,
              index,
              active,
              startDayId,
            })}
          </GridContainer>
        </JButton>
      </GridItem>
    );
  };

  renderMenu = ({ closeMenu, value, startDayId, batchCreate }) => {
    const { classes, tabId, smDown } = this.props;

    const options = this.options(startDayId);
    const unanchored = startDayId === tabId;
    const showDate = LOGIC_HELPERS.ifElse([!unanchored, !batchCreate], true);

    return (
      <div
        className={classnames(LOGIC_HELPERS.ifElse(!smDown, classes.popper))}
      >
        <GridContainer direction="column" spacing={0}>
          {options.map(
            this.renderOption({
              showDate,
              unanchored,
              closeMenu,
              value,
              startDayId,
              batchCreate,
            }),
          )}
        </GridContainer>
      </div>
    );
  };

  startDayId = () => {
    const { node, dayIds } = this.props;

    const startDay =
      EVENT_VIEW_HELPERS.tempStartDay(node) ||
      EVENT_VIEW_HELPERS.parentNodeId(node);

    if (!startDay) return first(dayIds);

    return Number.parseInt(`${startDay}`, 10);
  };

  render = () => {
    const { data } = this.props;
    const { value } = this.state;

    const batchCreate = EVENT_VIEW_HELPERS.batchCreate(data);
    const startDayId = this.startDayId();

    return (
      <>
        <Popper
          placement="bottom"
          renderButton={this.renderButton}
          fullWidth
          noPadding
          value={value}
          startDayId={startDayId}
          batchCreate={batchCreate}
        >
          {this.renderMenu}
        </Popper>

        <Data currentValue={value} {...endInputs.tempDay} />
      </>
    );
  };
}

EndDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  dayIds: PropTypes.array,
  smDown: PropTypes.bool,

  // parent props
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.number,
  dayOffset: PropTypes.number,
  tabId: PropTypes.number,
  node: PropTypes.object,
  data: PropTypes.number,

  // resaga props
};

EndDate.defaultProps = {
  dayIds: [],
  label: 'End date',
  placeholder: 'Enter end date',

  dayOffset: 0,
};

export default compose(
  withStyles(styles, { name: 'EndDate' }),
  withDayIds,
  withSMDown,
  resaga(CONFIG),
)(EndDate);
