import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridItem from 'components/GridItem/index';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';

import ForEachEventVariant from 'smartComponents/Event/logics/ForEachEventVariant';
import { Select } from 'smartComponents/Inputs';
import { COACH_TYPES, COACH_TYPES_MAPPING } from 'utils/constants/events';
import { EditableSelectForm } from 'smartComponents/Editables';
import { isEmptyString } from 'utils/stringAdditions';

import { TRANSPORTATION_TYPE_INPUTS } from './inputs';
import m from './messages';

export class Type extends PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderField = () => {
    const { transportationType, options } = this.props;

    const value =
      isEmptyString(transportationType) && options.length > 0
        ? options[0].value
        : transportationType;

    return (
      <GridItem>
        <Select
          {...TRANSPORTATION_TYPE_INPUTS.field}
          value={value}
          options={options}
        />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { transportationType, readOnly, dataId, options } = this.props;

    return (
      <GridItem>
        <EditableSelectForm
          value={transportationType}
          options={options}
          readOnly={readOnly}
          onSubmit={this.handleSubmit}
          renderValue={this.renderValue}
          {...TRANSPORTATION_TYPE_INPUTS.editable}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableSelectForm>
      </GridItem>
    );
  };

  // Not yet the final solution :)
  renderValue = value => COACH_TYPES_MAPPING[value] || value;

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

Type.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  dataId: PropTypes.number,
  options: PropTypes.array,

  // resaga props
  transportationType: PropTypes.string,
};

Type.defaultProps = {
  transportationType: '',
  readOnly: false,
  dataId: 0,
  options: [
    {
      children: <M {...m.drive} />,
      value: COACH_TYPES.DRIVE,
    },
    {
      children: <M {...m.escorted} />,
      value: COACH_TYPES.ESCORTED,
    },
    {
      children: <M {...m.selfdrive} />,
      value: COACH_TYPES.SELF_DRIVE,
    },
  ],
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationType,
    outputProp: 'transportationType',
  }),
)(Type);
