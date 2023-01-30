import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import { pluralizeText } from 'utils/stringAdditions';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import GridItem from 'components/GridItem';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Number as NumberInput } from 'smartComponents/Inputs';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import inputs from './inputs';
import m from './messages';

export class BookingPersonCount extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderEditableValue = value =>
    `${value} ${pluralizeText('people', Number.parseInt(value, 10), true)}`;

  renderEditable = () => {
    const { value, dataId, readOnly, label, placeholder } = this.props;

    return (
      <GridItem>
        <EditableTextForm
          value={value}
          renderValue={this.renderEditableValue}
          TextComponent={NumberInput}
          label={label}
          placeholder={placeholder}
          {...inputs.personCount}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableTextForm>
      </GridItem>
    );
  };

  renderField = () => {
    const { value, label } = this.props;

    return (
      <GridItem xs={12} sm={7}>
        <NumberInput value={value} label={label} {...inputs.personCount} />
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
      />
    );
  };
}

BookingPersonCount.propTypes = {
  // parent props
  variant: PropTypes.string,
  dataId: PropTypes.number,
  readOnly: PropTypes.bool,
  label: PropTypes.node,
  placeholder: PropTypes.string,

  // resaga props
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

BookingPersonCount.defaultProps = {
  variant: '',
  dataId: null,
  readOnly: false,
  label: <M {...m.label} />,
  placeholder: 'Click to specify total people booked',
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.subDetailBookingPersonCount,
  }),
)(BookingPersonCount);
