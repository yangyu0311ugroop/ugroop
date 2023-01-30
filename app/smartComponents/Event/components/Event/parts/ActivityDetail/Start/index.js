import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { GEOCODE_API, GET_GEO_COUNTRY_CODE } from 'apis/constants';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import EventStartTime from 'smartComponents/Event/components/Event/parts/Event/StartTime';
import { ACTIVITY_DETAIL_KEYS } from 'smartComponents/Event/components/Event/parts/ActivityDetail/constants';
import { withActivityDetailId } from 'smartComponents/Event/hoc/withActivityDetailId';
import { isEmptyString } from 'utils/stringAdditions';
import omit from 'lodash/omit';

import EventLocation from '../../shared/Location';
import { CONFIG } from './config';
import { ACTIVITY_DETAIL_LOCATION_START } from './inputs';

// TODO Paul: Extract the logic to be re-used for both start and end of activity detail
export class Start extends PureComponent {
  componentDidUpdate = ({ value: oldValue }) => {
    const oldParsedValue = this.parseValue(oldValue);
    const { name: prevLocation } = oldParsedValue;

    const newValue = this.parseValue();
    const { name: currLocation, placeId } = newValue;

    if (currLocation !== prevLocation) {
      this.handleSelect('eventPickup')({
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
      detail => detail.key === ACTIVITY_DETAIL_KEYS.startLocation,
    )[0];
    const value = get(targetDetail, 'value', null);
    const parsedValue = this.parseValue(value);
    const description = get(parsedValue, 'name', '');
    const placeId = get(parsedValue, 'placeId', '');

    this.handleSelect('eventPickup')({
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

    const startLocation = get(
      obj,
      ['model', 'data', 'detail', 'activityDetail', 'start'],
      {},
    );

    if (!startLocation.name) {
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
    this.handleSelect('currPickup')(null);
  };

  getProps = () => ({
    inputLocationProps: ACTIVITY_DETAIL_LOCATION_START,
    handleOnClear: this.handleOnClear,
    handleSelect: this.handleSelect('currPickup'),
    handleSubmit: this.handleSubmit,
    EventTime: EventStartTime,
    PatchData: EventPatchData,
    ...this.parseValue(),
    ...omit(this.props, ['resaga', 'value', 'key', 'icon']),
  });

  render = () => <EventLocation {...this.getProps()} />;
}

Start.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,
  templateId: PropTypes.number,

  // resaga props
  value: PropTypes.string,
};

Start.defaultProps = {
  variant: '',
  id: null,
  templateId: null,
  value: '',
};

export default compose(
  withActivityDetailId({
    targetKey: 'start',
  }),
  resaga(CONFIG),
)(Start);
