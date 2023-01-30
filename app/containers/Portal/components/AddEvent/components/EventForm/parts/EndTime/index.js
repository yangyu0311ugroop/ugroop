import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FilledVTextField } from 'components/Inputs/TextField/components/FilledInputs';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import endInputs from 'smartComponents/Event/components/Event/parts/Event/EndTime/inputs';
import startInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import { Time } from 'smartComponents/Inputs';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { node } = props;

  const endTimeValue = EVENT_VIEW_HELPERS.endTimeValue(node);
  const endTimeMode = EVENT_VIEW_HELPERS.endTimeMode(node);

  if (endTimeValue) {
    if (!NODE_HELPERS.withTime(endTimeMode)) return null;

    const duration = moment.duration(endTimeValue);

    return moment
      .utc()
      .startOf('day')
      .add(duration);
  }

  const tempEndTime = EVENT_VIEW_HELPERS.tempEndTime(node);

  if (tempEndTime) {
    return moment.utc(tempEndTime, 'HH:mm');
  }

  return null;
};

export class EndTime extends PureComponent {
  state = {
    value: defaultValue(this.props),
  };

  handleChange = value => {
    const { value: currentValue } = this.state;

    const newValue = EVENT_DATA_HELPERS.checkTimeChange(value, currentValue);

    // do nothing
    if (newValue === undefined) {
      return null;
    }

    return this.setState({ value: newValue });
  };

  renderButton = ({ openMenu, value, tempStartTime }) => {
    const { label, placeholder } = this.props;

    return (
      <Time
        value={value}
        minTimeField={[startInputs.tempTime.name, endInputs.tempDay.name]}
        minTimeFieldError="Time is before start time"
        {...endInputs.tempTime}
        label={label}
        placeholder={placeholder}
        textComponent={FilledVTextField}
        onChange={this.handleChange}
        onFocus={LOGIC_HELPERS.ifElse(tempStartTime, openMenu)}
      />
    );
  };

  handleClickOption = ({ closeMenu, rendered }) => e => {
    this.handleChange(rendered);
    LOGIC_HELPERS.ifFunction(closeMenu, [e]);
  };

  currentValue = value => value && value.format('HH:mm');

  renderOption = (
    { closeMenu, tempStartTime, value },
    offsetMinutes,
    offsetText,
  ) => {
    const { classes } = this.props;

    const optionMoment = moment
      .utc(tempStartTime, 'HH:mm')
      .add(offsetMinutes, 'm');

    const rendered = optionMoment.format('HH:mm');
    const currentValue = this.currentValue(value);

    const active = rendered === currentValue;

    return (
      <GridItem key={offsetMinutes}>
        <JButton
          noBorderRadius
          block
          bg={LOGIC_HELPERS.ifElse(active, 'gray')}
          textAlign="left"
          onClick={this.handleClickOption({ closeMenu, rendered })}
        >
          <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
            <GridItem className={classes.activeIcon}>
              {LOGIC_HELPERS.ifElse(
                active,
                <Icon icon="lnr-check" size="xsmall" />,
                ' ',
              )}
            </GridItem>
            <GridItem xs className={classes.hourText}>
              <JText dark bold={active}>
                {rendered}
              </JText>
            </GridItem>
            <GridItem>
              <JText sm gray>
                {offsetText}
              </JText>
            </GridItem>
          </GridContainer>
        </JButton>
      </GridItem>
    );
  };

  renderMenu = params => {
    if (!params.tempStartTime) return null;

    return (
      <GridContainer direction="column" spacing={0}>
        {this.renderOption(params, 30, '30 minutes')}
        {this.renderOption(params, 60, '1 hour')}
        {this.renderOption(params, 90, '1.5 hours')}
        {this.renderOption(params, 120, '2 hours')}
        {this.renderOption(params, 150, '2.5 hours')}
        {this.renderOption(params, 180, '3 hours')}
      </GridContainer>
    );
  };

  render = () => {
    const { node } = this.props;
    const { value } = this.state;

    const tempStartTime = EVENT_VIEW_HELPERS.startTime(node);
    const tempEndDay = EVENT_VIEW_HELPERS.tempEndDay(node);

    const showPopper = tempStartTime && (!tempEndDay || tempEndDay === 'P0D');

    if (!showPopper) {
      return this.renderButton({ value });
    }

    return (
      <Popper
        placement="bottom-start"
        renderButton={this.renderButton}
        value={value}
        tempStartTime={tempStartTime}
        noPadding
      >
        {this.renderMenu}
      </Popper>
    );
  };
}

EndTime.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  label: PropTypes.string,
  placeholder: PropTypes.string,
  node: PropTypes.object,

  // resaga props
};

EndTime.defaultProps = {
  label: 'End time',
  placeholder: 'Enter end time',
};

export default compose(
  withStyles(styles, { name: 'EndTime' }),
  resaga(CONFIG),
)(EndTime);
