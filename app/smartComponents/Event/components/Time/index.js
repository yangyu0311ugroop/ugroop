/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import { EVENT_NO_TIME } from 'appConstants';
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import {
  EventHomeTimeLabel,
  EventTimeLabel,
  EventIconSublabel,
} from 'viewComponents/Event';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EditableForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import EventParentNodeId from 'smartComponents/Event/components/Event/parts/Event/ParentNodeId';
import { Data } from 'ugcomponents/Inputs';
import DurationInput from './components/DurationInput';
import DayTimeInput from './components/DayTimeInput';
import MultiInput from './components/MultiInput';
import timeUtils from './utils';
import { CONFIG } from './config';

export class Time extends React.PureComponent {
  getMode = () => {
    const { mode, defaultMode } = this.props;
    return mode || defaultMode;
  };

  getDayIndex = () => {
    const {
      calculatedTimeValue,
      calculatedTemplateStartTimeValue,
    } = this.props;
    return MOMENT_HELPERS.diffInUnit(
      calculatedTemplateStartTimeValue,
      calculatedTimeValue,
      'd',
    );
  };

  getOtherCalculatedTimeValue = () => {
    const {
      otherCalculatedTimeValue,
      otherFormCalculatedTimeValue,
    } = this.props;
    return otherFormCalculatedTimeValue || otherCalculatedTimeValue;
  };

  getInputComponent = mode => {
    const { position, multiMode, formBatchCreate } = this.props;

    if (formBatchCreate) {
      return DayTimeInput;
    }

    if (multiMode && NODE_HELPERS.isRelative(mode)) {
      return MultiInput;
    }

    if (timeUtils.relativeToStart(mode, position)) {
      return DurationInput;
    }

    return DayTimeInput;
  };

  hasEditableValue = () => {
    const { value, calculatedTimeMode } = this.props;
    return value && calculatedTimeMode !== NODE_CONSTANTS.TIME_MODES.unanchored;
  };

  updateTimes = () => {
    const { templateId, id } = this.props;
    NODE_API_HELPERS.getTimes({ id: templateId, ids: [id] }, this.props);
  };

  handleSubmit = ({ onSuccess, ...rest }) => {
    const obj = {
      onSuccess: () => {
        this.updateTimes();
        if (onSuccess) onSuccess();
      },
      ...rest,
    };
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderParentNodeId = () => {
    const { id, position } = this.props;
    return (
      position === NODE_CONSTANTS.POSITIONS.start && (
        <EventParentNodeId id={id} />
      )
    );
  };

  renderTimeZoneId = () => {
    const { inputs, timeZoneId } = this.props;
    return <Data value={timeZoneId} {...inputs.timeZoneId} />;
  };

  renderEditableValue = () => {
    const { calculatedTime, calculatedTimeMode, displayDate } = this.props;
    const opts = { displayDate, index: this.getDayIndex() };
    return (
      <GridContainer alignItems="baseline">
        <GridItem>
          {NODE_HELPERS.renderTime(calculatedTime, calculatedTimeMode, opts)}
        </GridItem>
        {this.renderHomeTimeLabel()}
      </GridContainer>
    );
  };

  renderEditablePlaceholder = () => this.props.editablePlaceholder;

  renderHomeTimeLabel = () => {
    const { calculatedTimeMode, calculatedTime } = this.props;

    return (
      <EventHomeTimeLabel
        calculatedMode={calculatedTimeMode}
        calculatedTime={calculatedTime}
      />
    );
  };

  renderInput = (props = {}) => {
    const { displayDate, renderDate } = this.props;
    const mode = this.getMode();
    const Component = this.getInputComponent(mode);
    return (
      <React.Fragment>
        <Component
          {...this.props}
          {...props}
          mode={mode}
          otherCalculatedTimeValue={this.getOtherCalculatedTimeValue()}
          renderDate={renderDate({ displayDate })}
        />
        {this.renderParentNodeId()}
      </React.Fragment>
    );
  };

  renderEditable = () => {
    const {
      id,
      calculatedTimeValue,
      readOnly,
      readOnlyEditablePlaceholder,
      className,
    } = this.props;
    return (
      <GridItem className={className}>
        <EditableForm
          value={calculatedTimeValue}
          hasValue={this.hasEditableValue}
          renderValue={this.renderEditableValue}
          placeholder={this.renderEditablePlaceholder()}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
          readOnlyPlaceholder={readOnlyEditablePlaceholder}
        >
          {this.renderInput({ singleColumn: true })}
          {this.renderTimeZoneId()}
          <EventPatchData id={id} />
        </EditableForm>
      </GridItem>
    );
  };

  renderField = this.renderInput;

  renderLabel = () => (
    <EventTimeLabel {...this.props} index={this.getDayIndex()} />
  );

  renderLabelValue = () => {
    const { calculatedTime, calculatedTimeMode } = this.props;

    if (!NODE_HELPERS.hasTimeComponent(calculatedTimeMode))
      return <EventIconSublabel>{EVENT_NO_TIME}</EventIconSublabel>;

    return (
      <EventIconSublabel>
        {MOMENT_HELPERS.renderTime(calculatedTime)}
      </EventIconSublabel>
    );
  };

  renderData = () => {
    const { inputs, value, mode } = this.props;
    return (
      <React.Fragment>
        <Data value={value} {...inputs.value} />
        <Data value={mode} {...inputs.mode} />
      </React.Fragment>
    );
  };

  renderValueOnly = () => {
    const {
      component: Component,
      calculatedTime,
      calculatedTimeMode,
      className,
      prefix,
    } = this.props;

    if (!NODE_HELPERS.hasTimeComponent(calculatedTimeMode)) return null;

    return (
      <>
        {prefix}
        <Component className={className}>
          {MOMENT_HELPERS.renderTime(calculatedTime)}
        </Component>
      </>
    );
  };

  renderProp = () => {
    const { children, calculatedTime, calculatedTimeMode } = this.props;

    return children(
      calculatedTime,
      NODE_HELPERS.hasTimeComponent(calculatedTimeMode),
      this.renderHomeTimeLabel(),
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderLabel={this.renderLabel}
        renderLabelValue={this.renderLabelValue}
        renderLabelValueWithInfo={this.renderEditableValue}
        renderData={this.renderData}
        renderValueOnly={this.renderValueOnly}
        renderProp={this.renderProp}
      />
    );
  };
}

Time.propTypes = {
  // parent
  id: PropTypes.number,
  templateId: PropTypes.number,
  variant: PropTypes.string,
  valuePath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  modePath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  timeZoneIdPath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  otherValuePath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  inputs: PropTypes.object,
  position: PropTypes.string,
  editablePlaceholder: PropTypes.node,
  calculatedTime: PropTypes.object,
  renderDate: PropTypes.func,
  defaultMode: PropTypes.string,
  multiMode: PropTypes.bool,
  readOnly: PropTypes.bool,
  readOnlyEditablePlaceholder: PropTypes.string,
  className: PropTypes.string,
  component: PropTypes.string,
  prefix: PropTypes.node,
  children: PropTypes.func,

  // resaga value
  value: PropTypes.string,
  mode: PropTypes.string,
  timeZoneId: PropTypes.string,
  otherValue: PropTypes.string,
  otherCalculatedTimeValue: PropTypes.string,
  otherFormCalculatedTimeValue: PropTypes.string,
  displayDate: PropTypes.string,
  calculatedTimeValue: PropTypes.string,
  calculatedTimeMode: PropTypes.string,
  calculatedTemplateStartTimeValue: PropTypes.string,
  formBatchCreate: PropTypes.bool,
};

Time.defaultProps = {
  id: null,
  templateId: null,
  variant: null,
  valuePath: null,
  modePath: null,
  timeZoneIdPath: null,
  otherValuePath: null,
  inputs: {},
  position: null,
  editablePlaceholder: null,
  calculatedTime: null,
  renderDate: timeUtils.renderDate,
  defaultMode: NODE_CONSTANTS.TIME_MODES.relative,
  multiMode: false,
  readOnly: false,
  readOnlyEditablePlaceholder: 'No time set',
  className: null,
  component: 'span',

  value: '',
  mode: null,
  timeZoneId: null,
  otherValue: '',
  otherCalculatedTimeValue: '',
  otherFormCalculatedTimeValue: '',
  displayDate: null,
  calculatedTimeValue: null,
  calculatedTimeMode: null,
  calculatedTemplateStartTimeValue: null,
  formBatchCreate: false,
};

export default compose(resaga(CONFIG))(Time);
