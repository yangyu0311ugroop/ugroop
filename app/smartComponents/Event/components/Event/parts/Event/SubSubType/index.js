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
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';

import { COACH_TYPE_INPUTS } from './inputs';
import m from './messages';

export class SubSubType extends PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderField = () => {
    const { subSubType, options } = this.props;

    const value = LOGIC_HELPERS.ifElse(
      isEmptyString(subSubType),
      options[0].value,
      subSubType,
    );

    return (
      <GridItem>
        <Select {...COACH_TYPE_INPUTS.field} value={value} options={options} />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { subSubType, readOnly, dataId, options } = this.props;

    return (
      <GridItem>
        <EditableSelectForm
          value={subSubType}
          options={options}
          readOnly={readOnly}
          onSubmit={this.handleSubmit}
          renderValue={this.renderValue}
          {...COACH_TYPE_INPUTS.editable}
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

SubSubType.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  dataId: PropTypes.number,
  options: PropTypes.array,

  // resaga props
  subSubType: PropTypes.string,
};

SubSubType.defaultProps = {
  subSubType: '',
  readOnly: false,
  dataId: 0,
  options: [
    {
      children: <M {...m.escorted} />,
      value: COACH_TYPES.ESCORTED,
    },
    {
      children: <M {...m.selfdrive} />,
      value: COACH_TYPES.SELF_DRIVE,
    },
    {
      children: <M {...m.drive} />,
      value: COACH_TYPES.DRIVE,
    },
  ],
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.subSubType,
    outputProp: 'subSubType',
  }),
)(SubSubType);
