import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridItem from 'components/GridItem/index';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { Text } from 'ugcomponents/Inputs';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { EditableTextForm } from 'smartComponents/Editables';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';

import { TRANSPORTATION_BOOKEDBY_INPUTS } from './inputs';

export class BookedBy extends PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderField = () => {
    const { bookedBy } = this.props;

    return (
      <GridItem xs={12} sm>
        <Text value={bookedBy} {...TRANSPORTATION_BOOKEDBY_INPUTS.bookedBy} />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { bookedBy, dataId, readOnly } = this.props;

    return (
      <GridItem>
        <EditableTextForm
          value={bookedBy}
          {...TRANSPORTATION_BOOKEDBY_INPUTS.bookedByEditable}
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

    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
      />
    );
  };
}

BookedBy.propTypes = {
  // parent props
  variant: PropTypes.string,
  dataId: PropTypes.number,
  readOnly: PropTypes.bool,

  // resaga props
  bookedBy: PropTypes.string,
};

BookedBy.defaultProps = {
  variant: '',
  bookedBy: '',
  dataId: null,
  readOnly: false,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationDetailBookerName,
    outputProp: 'bookedBy',
  }),
)(BookedBy);
