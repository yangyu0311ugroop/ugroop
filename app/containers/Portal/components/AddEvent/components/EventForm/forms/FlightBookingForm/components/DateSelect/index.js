import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import first from 'lodash/first';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import withDayIds from 'smartComponents/Node/types/Template/hocs/withDayIds';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';

import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { value, dayIds } = props;
  // value is dayId

  if (!value || value < 0) return '';

  const index = dayIds.indexOf(value);

  if (index === -1) return '';

  return `P${index}D`;
};

export const defaultIndex = props => {
  const { value } = props;

  if (!value || value < 0) return 0;

  return value;
};

export class DateSelect extends PureComponent {
  state = {
    value: defaultValue(this.props),
  };

  componentDidUpdate = prevProps => {
    const { value } = this.props;

    if (value !== prevProps.value) {
      this.setState({
        value: defaultValue(this.props),
      });
    }
  };

  renderUnanchoredDays = value => {
    const days = EVENT_DATA_HELPERS.durationToDays(value);

    if (days === 0) {
      return 'Same day';
    }

    return `${days} day${LOGIC_HELPERS.ifElse(days > 1, 's', '')} later`;
  };

  renderDayDate = ({ openMenu, open, value }) => dayDate => {
    const { label, placeholder } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem onClick={LOGIC_HELPERS.ifElse(!open, openMenu)}>
          <FilledTextField
            fullWidth
            autoComplete="off"
            onFocus={openMenu}
            readonly
            value={value ? dayDate : ''}
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
    const renderDayDate = this.renderDayDate({ openMenu, open, value });

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

  options = () => {
    const { dayIds } = this.props;

    // const startIndex = dayIds.indexOf(startDayId);
    //
    // if (startIndex !== -1) {
    //   return dayIds.slice(startIndex);
    // }

    return dayIds;
  };

  clickOption = ({ index, dayId, closeMenu }) => e => {
    const { onChange } = this.props;

    const clickedValue = `P${index}D`;

    this.setState({
      value: clickedValue,
    });
    LOGIC_HELPERS.ifFunction(onChange, [dayId, index]);
    return LOGIC_HELPERS.ifFunction(closeMenu, [e]);
  };

  renderOptionContent = ({
    showDate,
    unanchored,
    index,
    active,
    startDayId,
    disabled,
  }) => {
    if (!showDate) {
      return (
        <GridItem>
          <JText gray={!unanchored || disabled} dark={unanchored}>
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
      <GridItem xs>
        <JText bold={active} gray={disabled} dark={!disabled}>
          <DayDate id={startDayId} offset={`P${index}D`} showDayIndex />
        </JText>
      </GridItem>
    );
  };

  renderOption = ({
    closeMenu,
    value,
    startDayId,
    showDate,
    unanchored,
    offsetId,
  }) => (dayId, index) => {
    const { dayIds } = this.props;

    const disabled = offsetId && dayIds.indexOf(offsetId) > index;
    const active = !disabled && value === `P${index}D`;

    return (
      <GridItem key={dayId}>
        <JButton
          disabled={disabled}
          noBorderRadius
          block
          bg={!disabled && LOGIC_HELPERS.ifElse(active, 'gray')}
          textAlign="left"
          onClick={!disabled && this.clickOption({ index, dayId, closeMenu })}
        >
          <GridContainer alignItems="center">
            <GridItem>
              <input
                type="radio"
                name="startDates"
                value="email"
                checked={active}
                disabled={disabled}
              />
            </GridItem>
            {this.renderOptionContent({
              showDate,
              unanchored,
              index,
              active,
              startDayId,
              disabled,
            })}
          </GridContainer>
        </JButton>
      </GridItem>
    );
  };

  renderMenu = ({ closeMenu, value, startDayId, offsetId, batchCreate }) => {
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
              offsetId,
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
    const { data, offsetId } = this.props;
    const { value } = this.state;

    const batchCreate = EVENT_VIEW_HELPERS.batchCreate(data);
    const startDayId = this.startDayId();

    return (
      <Popper
        placement="bottom"
        renderButton={this.renderButton}
        fullWidth
        noPadding
        value={value}
        startDayId={startDayId}
        batchCreate={batchCreate}
        offsetId={offsetId}
      >
        {this.renderMenu}
      </Popper>
    );
  };
}

DateSelect.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  dayIds: PropTypes.array,
  smDown: PropTypes.bool,

  // parent props
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  offsetId: PropTypes.number,
  tabId: PropTypes.number,
  node: PropTypes.object,
  data: PropTypes.number,
  onChange: PropTypes.func,

  // resaga props
};

DateSelect.defaultProps = {
  dayIds: [],
  label: 'Date',
  placeholder: 'Enter date',
};

export default compose(
  withStyles(styles, { name: 'DateSelect' }),
  withDayIds,
  withSMDown,
  resaga(CONFIG),
)(DateSelect);
