/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { H4, H5 } from 'viewComponents/Typography';
import { withStyles, Hidden } from 'components/material-ui';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { IATASearch } from 'smartComponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import EventStartTime from 'smartComponents/Event/components/Event/parts/Event/StartTime';
import EventEndTime from 'smartComponents/Event/components/Event/parts/Event/EndTime';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';
import { CONFIG } from './config';
import style from './style';

export class Airport extends React.PureComponent {
  static makeInitialState = () => ({
    cityName: undefined,
  });

  state = Airport.makeInitialState();

  componentDidMount = () => {
    this.handleChange({ cityName: this.getCityName() });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.iataCode !== this.props.iataCode) {
      this.setState(Airport.makeInitialState());
    }
  };

  getValue = key => {
    const s = this.state[key];
    return s === undefined ? this.props[key] : s;
  };

  getCityName = () => this.getValue('cityName');

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
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props, false);
  };

  handleChange = ({ cityName }) => {
    this.setState({ cityName });
    this.props.onChange({ cityName });
  };

  renderValue = () => {
    const { classes, value } = this.props;
    return <div className={classes.label}>{value}</div>;
  };

  renderLabel = () => {
    const { value, iataCode } = this.props;
    if (iataCode) {
      return (
        <GridItem>
          <GridContainer alignItems="baseline" direction="row">
            <GridItem>
              <H5 dense weight="bold">
                <M {...m.label} />
              </H5>
            </GridItem>
            <GridItem>{value}</GridItem>
          </GridContainer>
        </GridItem>
      );
    }
    return null;
  };

  renderLabelHeading = () => {
    const { value, iataCode } = this.props;
    if (iataCode) {
      return (
        <GridItem>
          <H4 dense weight="bold">
            {value}
          </H4>
        </GridItem>
      );
    }
    return null;
  };

  renderLabelValue = () => {
    const { value, iataCode } = this.props;
    if (iataCode) {
      return (
        <GridItem>
          <Hidden xsDown>{this.renderValue()}</Hidden>
          <Hidden smUp>
            <div title={value}>{iataCode}</div>
          </Hidden>
        </GridItem>
      );
    }
    return null;
  };

  renderField = () => {
    const {
      inputs,
      placeholder,
      value,
      cityName,
      iataCode,
      timeZoneId,
    } = this.props;
    const { label, ...restInputs } = inputs;
    return (
      <GridItem xs>
        <IATASearch
          value={value}
          cityName={cityName}
          iataCode={iataCode}
          timeZoneId={timeZoneId}
          onChange={this.handleChange}
          placeholder={placeholder}
          {...restInputs}
        />
      </GridItem>
    );
  };

  renderEditableLabel = label => {
    const cityName = this.getCityName();
    return (
      (label || cityName) && (
        <GridItem>
          {label}
          {` ${cityName}`}
        </GridItem>
      )
    );
  };

  renderCard = () => {
    const { iataCode, classes } = this.props;
    if (iataCode) {
      return (
        <GridItem className={classes.item}>
          <H5 dense weight="bold">
            {this.renderValue()}
          </H5>
        </GridItem>
      );
    }
    return null;
  };

  renderData = Component => {
    const { id, dataId } = this.props;
    return (
      <Component
        id={id}
        dataId={dataId}
        variant={EVENT_CONSTANTS.VARIANTS.data}
      />
    );
  };

  renderTimeData = () => {
    const { position } = this.props;
    switch (position) {
      case NODE_CONSTANTS.POSITIONS.start:
        return this.renderData(EventStartTime);

      case NODE_CONSTANTS.POSITIONS.end:
        return this.renderData(EventEndTime);

      default:
        return null;
    }
  };

  renderEditable = () => {
    const {
      id,
      dataId,
      value,
      inputs,
      editablePlaceholder,
      editableInputs,
      readOnly,
      readOnlyEditablePlaceholder,
      cityName,
      iataCode,
      timeZoneId,
      classes,
    } = this.props;
    const { name, label, ...restInputs } = inputs;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          name={name}
          label={this.renderEditableLabel(label)}
          placeholder={editablePlaceholder}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
          readOnlyPlaceholder={readOnlyEditablePlaceholder}
          TextComponent={IATASearch}
          TextProps={{
            cityName,
            iataCode,
            timeZoneId,
            onChange: this.handleChange,
            wrapperClassName: classes.wrapperClassname,
            ...restInputs,
            ...editableInputs,
          }}
        >
          <EventPatchData id={id} dataId={dataId} subtype />
          {this.renderTimeData()}
        </EditableTextForm>
      </GridItem>
    );
  };

  renderProp = () => {
    const { children, iataCode } = this.props;
    return children(iataCode, this.renderLabelValue());
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderLabel={this.renderLabel}
        renderLabelHeading={this.renderLabelHeading}
        renderLabelValue={this.renderLabelValue}
        renderCard={this.renderCard}
        renderProp={this.renderProp}
      />
    );
  };
}

Airport.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  variant: PropTypes.string,
  children: PropTypes.any,
  position: PropTypes.string,
  valuePath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  cityNamePath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  iataCodePath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  timeZoneIdPath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  inputs: PropTypes.object,
  editablePlaceholder: PropTypes.string,
  editableInputs: PropTypes.object,
  readOnly: PropTypes.bool,
  readOnlyEditablePlaceholder: PropTypes.string,

  // resaga value
  value: PropTypes.string,
  cityName: PropTypes.string,
  iataCode: PropTypes.string,
  timeZoneId: PropTypes.string,
};

Airport.defaultProps = {
  id: null,
  dataId: null,
  templateId: null,
  variant: null,
  children: null,
  position: null,
  valuePath: null,
  cityNamePath: null,
  iataCodePath: null,
  timeZoneIdPath: null,
  placeholder: null,
  onChange: () => {},
  inputs: {},
  editablePlaceholder: null,
  editableInputs: {},
  readOnly: false,
  readOnlyEditablePlaceholder: 'No airport',

  value: '',
  cityName: '',
  iataCode: '',
  timeZoneId: '',
};

export default compose(
  withStyles(style, { name: 'smartComponents/Event/Airport' }),
  resaga(CONFIG),
)(Airport);
