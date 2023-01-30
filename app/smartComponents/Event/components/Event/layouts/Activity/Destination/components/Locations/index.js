import {
  GEOCODE_API,
  GET_GEO_COUNTRY_CODE,
  GET_PLACE_IDS,
} from 'apis/constants';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import dotProp from 'dot-prop-immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withActivityDetailId } from 'smartComponents/Event/hoc/withActivityDetailId';
import { isEmptyString } from 'utils/stringAdditions';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  ActivityDetailStartLocation,
  ActivityDetailEndLocation,
} from 'smartComponents/Event/components/Event/parts';

import Locations from '../../../../Event/Locations';
import { CONFIG } from './config';
import { ACTIVITY_DETAIL_KEYS } from '../../../../../parts/ActivityDetail/constants';

export class ActivityLocations extends PureComponent {
  componentDidMount = () => {
    const { name: pickupName, placeId: pickupPlaceId } = this.getParseValue();
    const { name: dropoffName, placeId: dropoffPlaceId } = this.getParseValue(
      'endValue',
    );

    const data = [];

    if (pickupName) {
      data.push({
        location: pickupName,
        placeId: pickupPlaceId,
      });
    }

    if (dropoffName) {
      data.push({
        location: dropoffName,
        placeId: dropoffPlaceId,
      });
    }

    if (data.length > 0) {
      this.props.resaga.dispatchTo(GEOCODE_API, GET_PLACE_IDS, {
        payload: {
          locations: data,
        },
        onSuccess: this.handleSuccess(pickupPlaceId, dropoffPlaceId),
      });
    }
  };

  transformShape = ({ name, placeId, icon }, key = 'pickup') => ({
    [`${key}Name`]: name,
    [`${key}PlaceId`]: placeId,
    [`${key}Icon`]: icon,
  });

  getParseValue = (key = 'startValue') => {
    const { [key]: value } = this.props;

    return isEmptyString(value) ? {} : JSON.parse(value);
  };

  getProps = () => ({
    ...omit(this.props, ['resaga', 'startValue, endValue']),
    ...this.transformShape(this.getParseValue()),
    ...this.transformShape(this.getParseValue('endValue'), 'dropoff'),
    StartComponent: ActivityDetailStartLocation,
    EndComponent: ActivityDetailEndLocation,
  });

  handleSuccess = (pickupPlaceId, dropoffPlaceId) => ({ geocodes }) => {
    const eventPickup = get(geocodes, pickupPlaceId, {});
    const eventDropoff = get(geocodes, dropoffPlaceId, {});

    this.props.resaga.setValue({
      eventPickup,
      eventDropoff,
      formPickup: eventPickup,
      formDropoff: eventDropoff,
    });
  };

  updateTimes = () => {
    const { templateId, id } = this.props;
    NODE_API_HELPERS.getTimes({ id: templateId, ids: [id] }, this.props);
  };

  // TODO: create a helper for this function
  handleSelect = reduxKey => data => {
    const name = get(data, 'description', '');

    if (isEmptyString(name)) {
      return this.props.resaga.setValue({
        [reduxKey]: null,
      });
    }
    this.props.resaga.dispatchTo(GEOCODE_API, GET_GEO_COUNTRY_CODE, {
      payload: {
        name,
      },
    });

    return this.props.resaga.setValue({
      [reduxKey]: data.place_id,
    });
  };

  parseValue = (value = this.props.value) =>
    isEmptyString(value) ? {} : JSON.parse(value);

  getLocationDetails = (location, raw) => {
    const activityDetails = get(raw, 'detail.activityDetails', []);
    const targetDetail =
      location === 'end'
        ? activityDetails.filter(
            detail => detail.key === ACTIVITY_DETAIL_KEYS.endLocation,
          )[0]
        : activityDetails.filter(
            detail => detail.key === ACTIVITY_DETAIL_KEYS.startLocation,
          )[0];
    const value = get(targetDetail, 'value', null);
    const parsedValue = this.parseValue(value);
    const name = get(parsedValue, 'name', '');
    const placeId = get(name, 'placeId', '');

    return { name, placeId };
  };

  handleSwapSuccess = ({ raw }) => {
    const endDetails = this.getLocationDetails('end', raw);
    const startDetails = this.getLocationDetails('start', raw);

    this.handleSelect('eventDropoff')({
      description: endDetails.name,
      place_id: endDetails.placeId,
    });

    this.handleSelect('eventDropoff')({
      description: startDetails.name,
      place_id: startDetails.placeId,
    });

    this.updateTimes();
  };

  handleSwap = () => {
    const { startValue, endValue, type, subtype } = this.props;

    const parsedStart = JSON.parse(startValue);
    const parsedEnd = JSON.parse(endValue);
    const insertStart = dotProp.set(
      {},
      'data.detail.activityDetails.start',
      parsedEnd,
    );
    const insertEnd = dotProp.set(
      insertStart,
      'data.detail.activityDetails.end',
      parsedStart,
    );
    const insertType = dotProp.set(insertEnd, 'data.type', type);
    const insertSubtype = dotProp.set(insertType, 'data.detail.type', subtype);
    const model = {
      model: {
        ...insertSubtype,
      },
      onSuccess: this.handleSwapSuccess,
    };

    TEMPLATE_API_HELPERS.patchEvent(model, this.props, false);
  };

  render = () => (
    <Locations handleSwap={this.handleSwap} {...this.getProps()} />
  );
}

ActivityLocations.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  templateId: PropTypes.number,
  id: PropTypes.number,
  readOnly: PropTypes.bool,
  startLocationLabel: PropTypes.node,
  endLocationLabel: PropTypes.node,

  // resaga props
  startValue: PropTypes.string,
  endValue: PropTypes.string,
  pickupName: PropTypes.string,
  pickupPlaceId: PropTypes.string,
  dropoffName: PropTypes.string,
  dropoffPlaceId: PropTypes.string,
  type: PropTypes.string,
  subtype: PropTypes.string,
  value: PropTypes.string,
};

ActivityLocations.defaultProps = {
  readOnly: false,
  startLocationLabel: '',
  endLocationLabel: '',
  startValue: '',
  endValue: '',
};

export default compose(
  withActivityDetailId({
    outputProp: 'activityDetailStart',
    targetKey: 'start',
  }),
  withActivityDetailId({
    outputProp: 'activityDetailEnd',
    targetKey: 'end',
  }),
  resaga(CONFIG),
)(ActivityLocations);
