import {
  GEOCODE_API,
  GET_GEO_COUNTRY_CODE,
  GET_PLACE_IDS,
} from 'apis/constants';
import dotProp from 'dot-prop-immutable';
import { isEmptyString } from 'utils/stringAdditions';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';

import {
  TransportationStart,
  TransportationEnd,
} from 'smartComponents/Event/components/Event/parts';

import Locations from '../../../../Event/Locations';

import { CONFIG } from './config';

export class TransportationLocations extends PureComponent {
  componentDidMount = () => {
    const {
      pickupName,
      pickupPlaceId,
      dropoffName,
      dropoffPlaceId,
    } = this.props;

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

  handleSwapSuccess = ({ raw }) => {
    const startName = get(raw, 'detail.detail.common.start.name', '');
    const endName = get(raw, 'detail.detail.common.end.name', '');

    const startPlaceId = get(raw, 'detail.detail.common.start.placeId', '');
    const endPlaceId = get(raw, 'detail.detail.common.end.placeId', '');

    this.handleSelect('eventPickup')({
      description: startName,
      place_id: startPlaceId,
    });

    this.handleSelect('eventDropoff')({
      description: endName,
      place_id: endPlaceId,
    });

    this.updateTimes();
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

  handleSwap = () => {
    const {
      pickupName,
      pickupPlaceId,
      dropoffName,
      dropoffPlaceId,
      type,
      subtype,
    } = this.props;

    const insertStart = dotProp.set({}, 'data.detail.detail.common.start', {
      name: dropoffName,
      placeId: dropoffPlaceId,
    });
    const insertEnd = dotProp.set(
      insertStart,
      'data.detail.detail.common.end',
      {
        name: pickupName,
        placeId: pickupPlaceId,
      },
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

  render = () => {
    const { setter } = this.props;
    return setter ? null : (
      <Locations
        StartComponent={TransportationStart}
        EndComponent={TransportationEnd}
        handleSwap={this.handleSwap}
        {...this.props}
      />
    );
  };
}

TransportationLocations.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  startLocationLabel: PropTypes.node,
  endLocationLabel: PropTypes.node,
  templateId: PropTypes.number,
  id: PropTypes.number,
  setter: PropTypes.bool,

  // resaga props
  type: PropTypes.string,
  subtype: PropTypes.string,
  pickupName: PropTypes.string,
  pickupPlaceId: PropTypes.string,
  dropoffName: PropTypes.string,
  dropoffPlaceId: PropTypes.string,
};

TransportationLocations.defaultProps = {
  readOnly: false,
  startLocationLabel: '',
  endLocationLabel: '',
  setter: false,
};

export default compose(resaga(CONFIG))(TransportationLocations);
