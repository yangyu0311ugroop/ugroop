import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridItem from 'components/GridItem/index';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { TRANSPORTATION_SUPPLIER_NUM_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/SupplierNumber/inputs';

import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Phone } from 'smartComponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import ActionButtons from 'smartComponents/Inputs/PhoneTextField/components/ActionButtons';
import Form from 'ugcomponents/Form';
import resaga from 'resaga';
import { GEOCODE_API, GET_GEO_COUNTRY_CODE } from 'apis/constants';
import {
  CONFIG,
  COUNTRY_CONFIG,
  PARENT_ID_CONFIG,
  ORGANISATION_CONFIG,
} from './config';

export class SupplierNumber extends PureComponent {
  componentDidMount = () => {
    const { countryCode } = this.props;
    const data = this.getDefaultCountryParam();
    if (!countryCode && data.placeId) this.cacheCountry(data);
  };

  componentDidUpdate = prevProps => {
    if (prevProps.placeId !== this.props.placeId) {
      const { placeId, location } = this.props;
      if (this.props.placeId && !this.props.countryCode)
        this.cacheCountry({ placeId, location });
    }
  };

  getTextProps = () => {
    const { countryCode: country } = this.props;
    if (!this.TextProps) {
      this.TextProps = {
        inline: true,
        inputProps: undefined,
      };
    }
    return { ...this.TextProps, country };
  };

  getDefaultCountryParam = () => {
    const { placeId, location } = this.props;
    return { placeId, location };
  };

  cacheCountry = data =>
    this.props.resaga.dispatchTo(GEOCODE_API, GET_GEO_COUNTRY_CODE, {
      payload: {
        location: data.location,
      },
    });

  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderInput = (value, props) => {
    const { countryCode: country } = this.props;
    return (
      <Phone
        value={value}
        {...TRANSPORTATION_SUPPLIER_NUM_INPUTS.field}
        {...props}
        country={country}
      />
    );
  };

  renderEditable = () => {
    const { value, dataId, readOnly } = this.props;

    return (
      <GridItem>
        <EditableTextForm
          value={value}
          onSubmit={this.handleSubmit}
          TextComponent={Phone}
          TextProps={{ ...this.getTextProps() }}
          renderValue={this.renderValue}
          renderActions={this.renderActions}
          {...TRANSPORTATION_SUPPLIER_NUM_INPUTS.editable}
          readOnly={readOnly}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableTextForm>
      </GridItem>
    );
  };

  renderField = () => {
    const { value, countryCode: country } = this.props;
    return (
      <GridItem xs={12} sm={5}>
        {this.renderInput(
          value,
          TRANSPORTATION_SUPPLIER_NUM_INPUTS.field,
          country,
        )}
      </GridItem>
    );
  };

  renderValue = value => (
    <Form>{this.renderInput(value, { readOnly: true, label: null })}</Form>
  );

  renderActions = () => {
    const { value } = this.props;

    return <ActionButtons value={value} showDialButton={false} />;
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderField={this.renderField}
        renderDefault={this.renderEditable}
      />
    );
  };
}

SupplierNumber.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  eventPlaceId: PropTypes.string,
  eventLocation: PropTypes.string,

  // parent props
  variant: PropTypes.string,
  dataId: PropTypes.number,
  readOnly: PropTypes.bool,

  // resaga props
  value: PropTypes.string,
  placeId: PropTypes.string,
  location: PropTypes.string,
  countryCode: PropTypes.string,
};

SupplierNumber.defaultProps = {
  variant: '',
  dataId: null,
  readOnly: false,
  value: '',
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationDetailSupplierPhone,
  }),
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationDetailStartPlaceId,
    outputProp: 'eventPlaceId',
  }),
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationDetailStartName,
    outputProp: 'eventLocation',
  }),
  resaga(PARENT_ID_CONFIG),
  resaga(ORGANISATION_CONFIG),
  resaga(CONFIG),
  resaga(COUNTRY_CONFIG),
)(SupplierNumber);
