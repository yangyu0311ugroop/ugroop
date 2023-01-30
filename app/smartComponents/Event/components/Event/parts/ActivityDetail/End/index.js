import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { GEOCODE_API, GET_GEO_COUNTRY_CODE } from 'apis/constants';
import get from 'lodash/get';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ACTIVITY_DETAIL_KEYS } from 'smartComponents/Event/components/Event/parts/ActivityDetail/constants';
import { withActivityDetailId } from 'smartComponents/Event/hoc/withActivityDetailId';
import { isEmptyString } from 'utils/stringAdditions';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import EventEndTime from 'smartComponents/Event/components/Event/parts/Event/EndTime';

import EventLocation from '../../shared/Location';
import { CONFIG } from './config';

import { ACTIVITY_DETAIL_LOCATION_END } from './inputs';

// TODO Paul: Extract the logic to be re-used for both start and end of activity detail
export class End extends PureComponent {
  componentDidUpdate = ({ value: oldValue }) => {
    const oldParsedValue = this.parseValue(oldValue);
    const { name: prevLocation } = oldParsedValue;

    const newValue = this.parseValue();
    const { name: currLocation, placeId } = newValue;

    if (currLocation !== prevLocation) {
      this.handleSelect('eventDropoff')({
        description: currLocation,
        place_id: placeId,
      });
    }
  };

  parseValue = (value = this.props.value) =>
    isEmptyString(value) ? {} : JSON.parse(value);

  updateTimes = () => {
    const { templateId, id } = this.props;
    NODE_API_HELPERS.getTimes({ id: templateId, ids: [id] }, this.props);
  };

  handleSubmitSuccess = onSuccess => ({ raw }) => {
    const activityDetails = get(raw, 'detail.activityDetails', []);
    const targetDetail = activityDetails.filter(
      detail => detail.key === ACTIVITY_DETAIL_KEYS.endLocation,
    )[0];
    const value = get(targetDetail, 'value', null);
    const parsedValue = this.parseValue(value);
    const description = get(parsedValue, 'name', '');
    const placeId = get(parsedValue, 'placeId', '');

    this.handleSelect('eventDropoff')({
      description,
      place_id: placeId,
    });

    this.updateTimes();
    onSuccess();
  };

  handleSubmit = ({ onSuccess, ...rest }) => {
    const obj = {
      ...rest,
      onSuccess: this.handleSubmitSuccess(onSuccess),
    };

    TEMPLATE_API_HELPERS.patchEvent(obj, this.props, false);

    const endLocation = get(
      obj,
      ['model', 'data', 'detail', 'activityDetails', 'end'],
      {},
    );

    if (!endLocation.name) {
      this.props.resaga.setValue({
        formDistance: null,
        eventDistance: null,
      });
    }
  };

  handleSelect = reduxKey => data => {
    const location = get(data, 'description', '');

    if (isEmptyString(location)) {
      return this.props.resaga.setValue({
        [reduxKey]: null,
      });
    }
    this.props.resaga.dispatchTo(GEOCODE_API, GET_GEO_COUNTRY_CODE, {
      payload: {
        location,
      },
    });

    return this.props.resaga.setValue({
      [reduxKey]: data.place_id,
    });
  };

  handleOnClear = () => {
    this.handleSelect('currDropoff')(null);
  };

  getProps = () => ({
    inputLocationProps: ACTIVITY_DETAIL_LOCATION_END,
    handleOnClear: this.handleOnClear,
    handleSelect: this.handleSelect('currDropoff'),
    handleSubmit: this.handleSubmit,
    EventTime: EventEndTime,
    PatchData: EventPatchData,
    ...this.parseValue(),
    ...omit(this.props, ['resaga', 'value', 'key', 'icon']),
  });

  render = () => <EventLocation {...this.getProps()} />;
}

End.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  id: PropTypes.number,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  label: PropTypes.node,
  labelSibling: PropTypes.node,
  linkClassName: PropTypes.string,
  labelDirection: PropTypes.string,
  showLabel: PropTypes.bool,

  // resaga props
  value: PropTypes.string,
  timeZoneId: PropTypes.string,
};

End.defaultProps = {
  variant: '',
  id: null,
  dataId: null,
  templateId: null,
  readOnly: false,
  label: '',
  timeZoneId: null,
  labelSibling: null,
  linkClassName: '',
  labelDirection: 'column',
  showLabel: true,
  value: '',
};

export default compose(
  withActivityDetailId({
    targetKey: 'end',
  }),
  resaga(CONFIG),
)(End);
