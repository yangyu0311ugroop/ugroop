/**
 * Created by stephenkarpinskyj on 15/11/18.
 */
import { ability } from 'apis/components/Ability/ability';
import { PARTICIPANT } from 'utils/modelConstants';
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import GridItem from 'components/GridItem';
import { Phone } from 'smartComponents/Inputs';
import ActionButtons from 'smartComponents/Inputs/PhoneTextField/components/ActionButtons';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import Form from 'ugcomponents/Form';
import resaga from 'resaga';
import { GEOCODE_API, GET_GEO_COUNTRY_CODE } from 'apis/constants';
import inputs from './inputs';
import {
  CONFIG,
  COUNTRY_CONFIG,
  PARENT_ID_CONFIG,
  ORGANISATION_CONFIG,
} from './config';

export class SupplierPhone extends React.PureComponent {
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
        {...inputs.supplierPhone}
        {...props}
        country={country}
      />
    );
  };

  renderField = () => {
    const { value, countryCode: country } = this.props;
    return (
      <GridItem xs={12} sm={5}>
        {this.renderInput(value, { ...inputs.supplierPhoneField, country })}
      </GridItem>
    );
  };

  renderValue = value => (
    <Form>{this.renderInput(value, { readOnly: true })}</Form>
  );

  renderActions = () => {
    const { value } = this.props;

    return <ActionButtons value={value} showDialButton={false} />;
  };

  renderEditable = () => {
    const { value, dataId, readOnly } = this.props;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          renderValue={this.renderValue}
          TextComponent={Phone}
          TextProps={{ ...this.getTextProps() }}
          {...inputs.supplierPhone}
          {...inputs.supplierPhoneField}
          {...inputs.supplierPhoneEditable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
          renderActions={this.renderActions}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableTextForm>
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    if (!ability.can('execute', PARTICIPANT)) return null;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
      />
    );
  };
}

SupplierPhone.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  value: PropTypes.string,
  eventPlaceId: PropTypes.string,
  eventLocation: PropTypes.string,

  // parent
  dataId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,

  // resaga
  countryCode: PropTypes.string,
  placeId: PropTypes.string,
  location: PropTypes.string,
};

SupplierPhone.defaultProps = {
  value: '',

  dataId: null,
  variant: null,
  readOnly: false,
  type: '',
  eventPlaceId: null,
  countryCode: null,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.supplierPhone }),
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.placeId,
    outputProp: 'eventPlaceId',
  }),
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.locationName,
    outputProp: 'eventLocation',
  }),
  resaga(PARENT_ID_CONFIG),
  resaga(ORGANISATION_CONFIG),
  resaga(CONFIG),
  resaga(COUNTRY_CONFIG),
)(SupplierPhone);
