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
import { Text } from 'ugcomponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import inputs from './inputs';

export class BookerName extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderField = () => {
    const { value } = this.props;

    return (
      <GridItem xs={12} sm>
        <Text value={value} {...inputs.bookerName} />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { value, dataId, readOnly } = this.props;

    return (
      <GridItem>
        <EditableTextForm
          value={value}
          {...inputs.bookerName}
          {...inputs.bookerNameEditable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
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

BookerName.propTypes = {
  // hoc
  value: PropTypes.string,

  // parent
  dataId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
};

BookerName.defaultProps = {
  value: '',

  dataId: null,
  variant: null,
  readOnly: false,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.bookerName }),
)(BookerName);
