import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { GEOCODE_API, GET_GEO_COUNTRY_CODE } from 'apis/constants';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import get from 'lodash/get';
import EventEndTime from 'smartComponents/Event/components/Event/parts/Event/EndTime';
import { isEmptyString } from 'utils/stringAdditions';

import EventLocation from '../../shared/Location';
import { TRANSPORTATION_END_LOC_INPUTS } from './inputs';
import { CONFIG } from './config';

// TODO Paul: Extract the logic to be re-used for both start and end of transportation
export class End extends PureComponent {
  componentDidUpdate = ({ name: prevLocation }) => {
    const { name: currLocation, placeId } = this.props;

    if (currLocation !== prevLocation) {
      this.handleSelect('eventDropoff')({
        description: currLocation,
        place_id: placeId,
      });
    }
  };

  updateTimes = () => {
    const { templateId, id } = this.props;
    NODE_API_HELPERS.getTimes({ id: templateId, ids: [id] }, this.props);
  };

  handleSubmitSuccess = onSuccess => ({ raw }) => {
    const description = get(raw, 'detail.detail.common.end.name', '');
    const placeId = get(raw, 'detail.detail.common.end.placeId', '');

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
      ['model', 'data', 'detail', 'detail', 'common', 'end'],
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

  handleOnClear = () => {
    this.handleSelect('currDropoff')(null);
  };

  getProps = () => ({
    inputLocationProps: TRANSPORTATION_END_LOC_INPUTS,
    handleOnClear: this.handleOnClear,
    handleSelect: this.handleSelect('currDropoff'),
    handleSubmit: this.handleSubmit,
    EventTime: EventEndTime,
    ...omit(this.props, ['resaga']),
  });

  render = () => <EventLocation {...this.getProps()} />;
}

End.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  readOnly: PropTypes.bool,
  label: PropTypes.node,
  labelSibling: PropTypes.node,
  linkClassName: PropTypes.string,
  labelDirection: PropTypes.string,
  showLabel: PropTypes.bool,
  // resaga props
  placeId: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  timeZoneId: PropTypes.string,
};

End.defaultProps = {
  variant: '',
  placeId: '',
  name: '',
  id: null,
  dataId: null,
  templateId: null,
  readOnly: false,
  icon: '',
  label: '',
  timeZoneId: null,
  labelSibling: null,
  linkClassName: '',
  labelDirection: 'column',
  showLabel: true,
};

export default compose(resaga(CONFIG))(End);
