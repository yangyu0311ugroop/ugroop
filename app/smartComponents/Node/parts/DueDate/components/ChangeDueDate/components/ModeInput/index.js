import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { DO_NOTHING } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { List, ListItem, withStyles } from 'components/material-ui';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import Form from 'ugcomponents/Form/index';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  CUSTOM,
  DUE_DATE_HELPERS,
  DUE_DATE_RELATIVE_OPTIONS,
  FIXED,
  UNSET,
} from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import timestring from 'timestring';
import { InlineButton } from 'ugcomponents/Buttons';
import { isDuration } from 'ugcomponents/Form/rules/duration';
import Icon from 'ugcomponents/Icon';
import { Date, InlineText, Time } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class ModeInput extends PureComponent {
  state = {
    customDuration: '',
    fixedDate: '',
    fixedTime: '',
  };

  stopPropagation = event =>
    event && event.stopPropagation && event.stopPropagation();

  selectedRelative = () => {
    const { dueDate, parentType } = this.props;

    if (
      parentType &&
      dueDate &&
      DUE_DATE_RELATIVE_OPTIONS[parentType].indexOf(dueDate.value) === -1
    ) {
      return DUE_DATE_HELPERS.makeSelectedRelativeDateOption(
        dueDate,
        parentType,
        true,
      );
    }

    return null;
  };

  inputDuration = () => {
    const { parentType } = this.props;
    const { customDuration } = this.state;

    if (
      parentType &&
      DUE_DATE_RELATIVE_OPTIONS[parentType].indexOf(customDuration) === -1
    ) {
      return DUE_DATE_HELPERS.makeCustomDurationOption(
        customDuration,
        parentType,
        true,
        true,
      );
    }

    return null;
  };

  modeOptions = () => {
    const { dueDate, parentType } = this.props;

    return [
      {
        mode: UNSET,
        key: UNSET,
        value: 'No due date',
        noIndent: true,
      },
      DUE_DATE_HELPERS.makeHeadingOption('Fixed date:'),
      DUE_DATE_HELPERS.makeSelectedFixedDateOption(dueDate),
      { mode: FIXED, key: FIXED },
      DUE_DATE_HELPERS.makeSelectedFixedDateOptionState(this.state),
      DUE_DATE_HELPERS.makeHeadingOption('Relative date:'),
      DUE_DATE_HELPERS.makeNoOffsetOption(parentType),
      ...DUE_DATE_HELPERS.makeOptionsByType(parentType),
      this.selectedRelative(),
      { mode: CUSTOM, key: CUSTOM },
      this.inputDuration(),
    ];
  };

  handleShowHelp = () => {
    alert(`Duration guidelines:
- 'd': day. i.e. input '2d' for 2 days after
- '-': Negative offset. i.e. input '-2d' for 2 days before
- etc.
    `);
  };

  handleClickItem = (item, selected) => () => {
    // click heading, shouldn't do anything
    if (
      DUE_DATE_HELPERS.isFixed(item.key) ||
      DUE_DATE_HELPERS.isCustom(item.key)
    ) {
      return null;
    }

    const { onClose } = this.props;

    // dispatch if value has changed
    if (!selected) {
      this.changeDueDate(item);
    }

    if (onClose) onClose();

    return true;
  };

  changeDueDate = ({ mode, key }) => {
    const { id, type } = this.props;

    return this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node: {
          customData: {
            dueDate: {
              mode,
              value: key,
              parentNodeId: id,
            },
          },
          type,
        },
      },
      onSuccess: this.updateSuccess,
    });
  };

  updateSuccess = () => {
    const { id, onUpdateSuccess: onSuccess } = this.props;
    NODE_API_HELPERS.getTreeAndTimes({ id, onSuccess }, this.props);
  };

  handleChangeCustom = customDuration => {
    if (!customDuration) {
      return null;
    }

    const offset = LOGIC_HELPERS.ifElse(
      customDuration.indexOf('-') !== -1,
      -1,
      1,
    );

    try {
      const seconds = timestring(customDuration);
      if (isDuration(customDuration) && seconds) {
        this.setState({
          customDuration: momentjs
            .duration(seconds * offset, 'second')
            .toISOString(),
        });
      }
    } catch (err) {
      // do nothing
    }
    return true;
  };

  handleChangeFixed = fixedDate => {
    if (fixedDate) {
      this.setState({ fixedDate });
    }
  };

  handleChangeFixedTime = fixedTime => {
    this.setState({ fixedTime });
  };

  handlePickerOpen = () => {
    const { closeOnClickAway } = this.props;

    if (closeOnClickAway) return closeOnClickAway(false);

    return DO_NOTHING;
  };

  handlePickerClose = () => {
    const { closeOnClickAway } = this.props;

    if (closeOnClickAway) return closeOnClickAway(true);

    return DO_NOTHING;
  };

  // TODO: update value onSubmit
  handleSubmitCustom = () => {};

  handleSubmitFixed = () => {};

  renderCustom = () => {
    const { classes } = this.props;

    return (
      <GridContainer alignItems="center" spacing={0}>
        <GridItem className={classnames(classes.check)}>&nbsp;</GridItem>
        <GridItem className={classes.grow}>
          <Form onValidSubmit={this.handleSubmitCustom}>
            <InlineText
              name="value"
              placeholder="custom offset: 3d, -3d, etc."
              onChange={this.handleChangeCustom}
              autoComplete="off"
            />
          </Form>
        </GridItem>
        <GridItem>
          <InlineButton onClick={this.handleShowHelp}>
            <Icon size="xsmall" icon="lnr-question-circle" />
          </InlineButton>
        </GridItem>
      </GridContainer>
    );
  };

  renderFixed = () => {
    const { classes } = this.props;

    return (
      <Form onValidSubmit={this.handleSubmitFixed}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem className={classnames(classes.check)}>&nbsp;</GridItem>
          <GridItem className={classes.grow}>
            <Date
              onPickerOpen={this.handlePickerOpen}
              onPickerClose={this.handlePickerClose}
              name="dueDate"
              placeholder="input a date"
              value=""
              iconSize="xsmall"
              onChange={this.handleChangeFixed}
            />
          </GridItem>
          <GridItem className={classes.time}>
            <Time
              onPickerOpen={this.handlePickerOpen}
              onPickerClose={this.handlePickerClose}
              name="dueTime"
              placeholder="time"
              iconSize="xsmall"
              onChange={this.handleChangeFixedTime}
            />
          </GridItem>
        </GridContainer>
      </Form>
    );
  };

  renderListItem = (item, index) => {
    const { classes, dueDate, parentType, anchorDate } = this.props;

    if (!item) {
      return item;
    }

    const { key, value, disabled, mode, heading, noIndent } = item;
    const selected = dueDate && dueDate.value === key;

    let renderListContent;
    const className = classnames(
      classes.listItem,
      disabled && classes.disabled,
      heading && classes.heading,
      LOGIC_HELPERS.ifElse(selected, classes.selectedContainer),
    );
    let listItemProps = {
      className,
      disabled,
    };

    if (mode === CUSTOM) {
      renderListContent = this.renderCustom(item);
    } else if (key === FIXED) {
      renderListContent = this.renderFixed(item);
    } else {
      const calculatedDate = DUE_DATE_HELPERS.calculateDate({
        dueDate: { mode, value: key },
        parentType,
        anchorDate,
      });
      const renderCalculatedDate = LOGIC_HELPERS.ifElse(
        DUE_DATE_HELPERS.isRelative(mode) && calculatedDate,
        <GridItem
          className={classnames(
            classes.secondary,
            LOGIC_HELPERS.ifElse(selected, classes.selectedSecondaryText),
          )}
        >
          {DUE_DATE_HELPERS.renderCalculatedDate({
            value,
            parentType,
            calculatedDate,
          })}
        </GridItem>,
      );

      listItemProps = {
        ...listItemProps,
        onClick: this.handleClickItem(item, selected),
        button: true,
        className: classnames(
          className,
          !disabled && classes.selectableListItem,
          LOGIC_HELPERS.ifElse(
            !selected,
            classes.hoverableListItem,
            classes.hoverSelectedListItem,
          ),
        ),
      };
      renderListContent = (
        <GridContainer alignItems="center" spacing={0}>
          {!heading && !noIndent && (
            <GridItem
              className={classnames(
                classes.check,
                LOGIC_HELPERS.ifElse(selected, classes.selectedSecondaryText),
              )}
            >
              {LOGIC_HELPERS.ifElse(
                selected,
                <Icon bold size="xsmall" icon="lnr-check" />,
                <span>&nbsp;</span>,
              )}
            </GridItem>
          )}
          <GridItem
            className={classnames(
              classes.grow,
              LOGIC_HELPERS.ifElse(selected, classes.selectedText),
            )}
          >
            {value}
          </GridItem>
          {renderCalculatedDate}
        </GridContainer>
      );
    }

    return (
      <ListItem key={`${key}${index}`} {...listItemProps}>
        {renderListContent}
      </ListItem>
    );
  };

  render = () => {
    const options = this.modeOptions();

    return <List>{options.map(this.renderListItem)}</List>;
  };
}

ModeInput.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  name: PropTypes.string,
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  closeOnClickAway: PropTypes.func,
  anchorDate: PropTypes.string,
  onUpdateSuccess: PropTypes.func,

  // resaga props
  dueDate: PropTypes.object,
  type: PropTypes.string,
  parentType: PropTypes.string,
  translateType: PropTypes.string,

  // customisable props
  className: PropTypes.string,
  defaultDate: PropTypes.object,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

ModeInput.defaultProps = {
  id: 0,
  component: 'div',
  name: 'mode',
  dueDate: {},
  type: '',
  parentType: '',
  translateType: '',
  anchorDate: '',
  className: '',
  defaultDate: momentjs().add(1, 'd'),
};

export default compose(
  withStyles(styles, { name: 'ModeInput' }),
  resaga(CONFIG),
)(ModeInput);
