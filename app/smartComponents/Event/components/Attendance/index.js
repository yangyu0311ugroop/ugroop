/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import P from 'viewComponents/Typography';
import GridItem from 'components/GridItem';
import { EditableToggleForm } from 'smartComponents/Editables/ToggleForm';
import { Checkbox } from 'ugcomponents/Inputs';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { CONFIG } from './config';
import EventPatchData from '../EventPatchData';

export class Attendance extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderField = () => {
    const { value, inputs } = this.props;
    return (
      <GridItem>
        <Checkbox value={value} {...inputs} />
      </GridItem>
    );
  };

  renderEditableValue = value => {
    const { inputs } = this.props;
    const props = {
      dense: true,
      children: inputs.label,
    };
    if (!value) {
      props.weight = 'light';
    } else {
      props.success = true;
    }
    return <P {...props} />;
  };

  renderEditable = () => {
    const { dataId, value, inputs, readOnly } = this.props;
    const { name, label } = inputs;
    return (
      <GridItem>
        <EditableToggleForm
          value={value}
          name={name}
          label={label}
          onSubmit={this.handleSubmit}
          renderValue={this.renderEditableValue}
          readOnly={readOnly}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableToggleForm>
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

Attendance.propTypes = {
  // parent
  dataId: PropTypes.number,
  variant: PropTypes.string,
  valuePath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  inputs: PropTypes.object,
  readOnly: PropTypes.bool,

  // resaga value
  value: PropTypes.bool,
};

Attendance.defaultProps = {
  dataId: null,
  variant: null,
  valuePath: null,
  inputs: {},
  readOnly: false,

  value: false,
};

export default compose(resaga(CONFIG))(Attendance);
