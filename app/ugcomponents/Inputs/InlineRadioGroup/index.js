import { DO_NOTHING, THE_DOT } from 'appConstants';
import classnames from 'classnames';
import { withFormsy } from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { InlineButton } from 'ugcomponents/Buttons';
import Icon from 'ugcomponents/Icon/index';
import Popper from 'components/Popper';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import MenuItem from 'components/Popper/components/MenuItem';
import { FORMATS_DATE_TIME as frmt } from 'utils/constants/dateTime';
import Hidden from '@material-ui/core/Hidden';
import momentHelpers from '../../../utils/helpers/moment';
import style from './styles';

export class InlineRadioGroup extends Component {
  state = {
    saved: false,
  };

  componentWillReceiveProps = nextProps => {
    const { loading, savedTimeoutMs } = this.props;

    if (nextProps.showSaved && loading && !nextProps.loading) {
      this.savedTimeout = setTimeout(this.clearSaved, savedTimeoutMs);
      return this.setState({ saved: true });
    }

    return DO_NOTHING;
  };

  componentWillUnmount = () => {
    this.resetCancelEdit();
    clearTimeout(this.savedTimeout);
  };

  getColor = () => {
    const { loading, color, disabled } = this.props;

    if (loading) {
      return 'default';
    }

    if (color) {
      return color;
    }

    return disabled ? 'primary' : 'success';
  };

  getValueLabel = value => {
    const { valueLabel } = this.props;

    return typeof valueLabel === 'function' ? valueLabel(value) : valueLabel;
  };

  getPostValueLabel = value => {
    const { postValueLabel } = this.props;

    return typeof postValueLabel === 'function'
      ? postValueLabel(value)
      : postValueLabel;
  };

  clearSaved = () => this.setState({ saved: false });

  isDisabled = () => {
    const { loading, disabled, isFormDisabled } = this.props;

    return isFormDisabled() || disabled || loading;
  };

  handleRef = r => {
    this.anchorEl = r;
  };

  handleClick = key => () => {
    const { getValue, setValue, onChange, autoCloseMs, autoClose } = this.props;
    if (!key) {
      this.previousValue = getValue();

      if (autoClose) {
        // debounce 10 sec then cancel edit state if no activity
        this.timeout = setTimeout(this.cancelEdit, autoCloseMs);
      }
    } else {
      this.resetCancelEdit();
    }
    setValue(key);
    if (typeof onChange === 'function') {
      onChange(key);
    }
  };

  resetCancelEdit = () => clearTimeout(this.timeout);

  cancelEdit = () => this.handleClick(this.previousValue)();

  optionClassName = isSelected => {
    const {
      classes,
      highlightSelected,
      optionClassName,
      selectedOptionClassName,
    } = this.props;

    return classnames(
      highlightSelected && !isSelected && classes.fade,
      optionClassName,
      isSelected && selectedOptionClassName,
    );
  };

  renderSeparator = (index, array) => {
    const { classes } = this.props;

    return (
      index < array.length - 1 && (
        <span className={classes.theDot}>{THE_DOT}</span>
      )
    );
  };

  renderEditButton = () => {
    const { loading, classes, padding, disabled } = this.props;
    const { saved } = this.state;

    if (disabled) {
      return '';
    }
    if (loading) {
      return (
        <span className={classes.paddingLeft}>
          <Icon size="xsmall" className={classes.loading} icon="lnr-refresh2" />
        </span>
      );
    }
    if (saved) {
      return (
        <Icon size="xsmall" color="success" icon="lnr-check" paddingLeft />
      );
    }

    return (
      <span>
        <InlineButton
          padding={padding}
          onClick={this.handleClick()}
          className={classes.iconHidden}
        >
          <Icon className={classes.icon} icon="lnr-pencil3" />
        </InlineButton>
      </span>
    );
  };

  renderContent = () => {
    const {
      className,
      getValue,
      selectedOptions,
      options,
      padding,
      classes,
    } = this.props;

    const value = getValue();

    return (
      <span>
        <InlineButton
          padding={padding}
          color={this.getColor()}
          disabled={this.isDisabled()}
          className={className}
          onClick={this.handleClick()}
        >
          <div className={classnames('j-text-ellipsis', classes.roleEllipsis)}>
            {selectedOptions[value] || options[value]}
          </div>
        </InlineButton>
        {this.renderEditButton()}
      </span>
    );
  };

  renderValue = () => {
    const { classes, getValue, tooltip } = this.props;

    const value = getValue();
    const content = this.renderContent();

    if (this.isDisabled()) return content;

    return (
      <span>
        {this.getValueLabel(value)}
        <Tooltip
          placement="top"
          title={tooltip}
          classes={{ tooltip: classes.hover }}
          enterDelay={1000}
        >
          {content}
        </Tooltip>
        {this.getPostValueLabel(value)}
      </span>
    );
  };

  renderOptionTitle = isSelected =>
    isSelected ? this.props.selectedTitle : '';

  renderModePopper = valueSelected => {
    const { label, classes } = this.props;

    return (
      <GridContainer
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <GridItem className={classes.labelStyle}>{label}</GridItem>
        <GridItem>
          <Popper
            placement="bottom"
            stopPropagation
            renderButton={this.renderModePopperButton(valueSelected)}
          >
            {this.renderModePopperOptions(valueSelected)}
          </Popper>
        </GridItem>
      </GridContainer>
    );
  };

  formatDate = format => {
    const today = momentHelpers.getDateToday(); // moment().toDate();
    return momentHelpers.getDateWithFormat(today, format);
  };

  renderModePopperButton = valueSelected => ({ openMenu }) => {
    const { classes } = this.props;
    const iconDropDown = (
      <>
        <Hidden xsDown>
          <GridItem>
            <Icon size="xxxsmall" color="black" bold icon="lnr-chevron-down" />
          </GridItem>
        </Hidden>
        {valueSelected !== frmt.DAY_DATE && (
          <Hidden smUp>
            <GridItem>
              <Icon
                size="xxxsmall"
                color="black"
                bold
                icon="lnr-chevron-down"
              />
            </GridItem>
          </Hidden>
        )}
      </>
    );

    return (
      <Button
        variant={VARIANTS.INLINE}
        dense
        size="xs"
        block
        onClick={openMenu}
      >
        <GridContainer
          direction="row"
          justify="flex-start"
          alignItems="center"
          noWrap
          className={classes.noWrap}
        >
          <GridItem
            style={{ fontSize: 12 }}
          >{`${valueSelected} (${this.formatDate(valueSelected)})`}</GridItem>
          {iconDropDown}
        </GridContainer>
      </Button>
    );
  };

  renderModePopperOptions = valueSelected => ({ closeMenu }) => {
    const { options, excludeOptions } = this.props;
    let keys = Object.keys(options);
    if (excludeOptions) {
      keys = keys.filter(item => !excludeOptions.includes(item));
    }

    const content = keys.map(key => (
      <GridItem>
        <MenuItem
          selected={valueSelected === key}
          closeMenu={closeMenu}
          onClick={this.handleClick(key)}
        >
          {options[key]}
        </MenuItem>
      </GridItem>
    ));
    return (
      <GridContainer direction="column" spacing={0}>
        {content}
      </GridContainer>
    );
  };

  renderOptions = () => {
    const {
      label,
      postLabel,
      options,
      padding,
      excludeOptions,
      optionDropDown,
      valueSelected,
    } = this.props;

    let keys = Object.keys(options);
    if (excludeOptions) {
      keys = keys.filter(item => !excludeOptions.includes(item));
    }

    if (optionDropDown) {
      return this.renderModePopper(valueSelected);
    }

    const content = keys.map((key, index) => {
      const isSelected = key === this.previousValue;

      return (
        <Fragment key={key}>
          <InlineButton
            padding={padding}
            className={this.optionClassName(isSelected)}
            title={this.renderOptionTitle(isSelected)}
            disabled={this.isDisabled()}
            color={this.getColor()}
            onClick={this.handleClick(key)}
          >
            {options[key]}
          </InlineButton>
          {this.renderSeparator(index, keys)}
        </Fragment>
      );
    });

    return (
      <span ref={this.handleRef}>
        {label} {content} {postLabel}
      </span>
    );
  };

  render() {
    const { type, classes, getValue, alwaysShowOption } = this.props;
    if (type === 'hidden') return null;

    let content;

    if (!getValue() || alwaysShowOption) {
      content = this.renderOptions();
    } else {
      content = this.renderValue();
    }

    return <span className={classes.root}>{content}</span>;
  }
}

InlineRadioGroup.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,

  // parent
  name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  options: PropTypes.object.isRequired,
  selectedOptions: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  label: PropTypes.node,
  postLabel: PropTypes.node,
  valueLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  postValueLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  tooltip: PropTypes.node,
  color: PropTypes.string,

  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  padding: PropTypes.string,

  // customisable options
  highlightSelected: PropTypes.bool,
  loading: PropTypes.bool,
  autoClose: PropTypes.bool,
  showSaved: PropTypes.bool,
  selectedTitle: PropTypes.string,
  autoCloseMs: PropTypes.number,
  savedTimeoutMs: PropTypes.number,

  optionClassName: PropTypes.string,
  selectedOptionClassName: PropTypes.string,
  alwaysShowOption: PropTypes.bool,
  excludeOptions: PropTypes.array,
  optionDropDown: PropTypes.bool,
  valueSelected: PropTypes.string,
};

InlineRadioGroup.defaultProps = {
  selectedOptions: {},
  type: null,
  value: '',
  label: 'Select',
  postLabel: '',
  valueLabel: '',
  postValueLabel: '',
  className: '',
  color: '',
  tooltip: 'Change',
  autoClose: false,
  showSaved: false,
  selectedTitle: 'Current value',

  highlightSelected: false,
  loading: false,
  autoCloseMs: 10000,
  savedTimeoutMs: 1000,
  disabled: false,
  onChange: null,

  optionClassName: '',
  selectedOptionClassName: '',
  alwaysShowOption: false,
  optionDropDown: false,
  valueSelected: frmt.DATE,
};

export default compose(
  withStyles(style),
  withFormsy,
)(InlineRadioGroup);
