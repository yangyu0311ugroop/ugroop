/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_UTILS } from 'utils/events';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { Text } from 'ugcomponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import P from 'viewComponents/Typography';
import { isEmptyString } from 'utils/stringAdditions';
import inputs from './inputs';

export class Terminal extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderField = () => {
    const { value } = this.props;
    return (
      <GridItem xs={12} sm>
        <Text value={value} {...inputs.terminal} />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { value, dataId, readOnly } = this.props;
    if (EVENT_UTILS.participantCannotExecuteEvent(value)) return null;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          {...inputs.terminal}
          {...inputs.terminalEditable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableTextForm>
      </GridItem>
    );
  };

  renderLabel = () => {
    const { value } = this.props;
    if (isEmptyString(value)) {
      return null;
    }
    return (
      <GridItem>
        <GridContainer>
          <GridItem>
            <P dense weight="bold">
              {inputs.terminal.label}:
            </P>
          </GridItem>
          <GridItem>
            <P dense>{value}</P>
          </GridItem>
        </GridContainer>
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
        renderLabel={this.renderLabel}
      />
    );
  };
}

Terminal.propTypes = {
  // hoc
  value: PropTypes.string,

  // parent
  dataId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
};

Terminal.defaultProps = {
  value: '',

  dataId: null,
  variant: null,
  readOnly: false,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.terminal }),
)(Terminal);
