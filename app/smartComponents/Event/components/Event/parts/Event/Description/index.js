/**
 * Created by stephenkarpinskyj on 20/8/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { EVENT_UTILS } from 'utils/events';
import { compose } from 'redux';
import { EMPTY_RTE } from 'appConstants';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import GridItem from 'components/GridItem';
import { EditableTextForm } from 'smartComponents/Editables';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { RichText as RichTextInput } from 'ugcomponents/Inputs';
import RichText from 'ugcomponents/RichTextEditor';

import inputs from './inputs';

export class Description extends React.PureComponent {
  getToolbarId = () => {
    const { id } = this.props;
    return `EventDescriptionRichText${id}`;
  };

  isEmpty = value => !value || value === EMPTY_RTE;

  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderDefault = () => {
    const { value } = this.props;
    return (
      <GridItem>
        <RichTextInput
          value={value}
          editing
          id={this.getToolbarId()}
          {...inputs.description}
        />
      </GridItem>
    );
  };

  renderLabel = () => {
    const { value } = this.props;
    return this.isEmpty(value) ? null : (
      <GridItem>
        <RichText
          initContent={value}
          readOnly
          toolBarId={this.getToolbarId()}
        />
      </GridItem>
    );
  };

  renderValue = value => (
    <RichText initContent={value} readOnly toolBarId={this.getToolbarId()} />
  );

  renderEditable = () => {
    const { value, dataId, readOnly } = this.props;
    if (EVENT_UTILS.participantCannotExecuteEvent(value)) return null;

    return (
      <GridItem>
        <EditableTextForm
          readOnly={readOnly}
          {...inputs.description}
          TextProps={{ editing: true, id: this.getToolbarId() }}
          TextComponent={RichTextInput}
          value={value}
          renderValue={this.renderValue}
          onSubmit={this.handleSubmit}
          hideClearButton
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
        renderDefault={this.renderDefault}
        renderEditableForm={this.renderEditable}
        renderLabel={this.renderLabel}
      />
    );
  };
}

Description.propTypes = {
  // hoc
  value: PropTypes.string,

  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  dataId: PropTypes.number,
  readOnly: PropTypes.bool,
};

Description.defaultProps = {
  value: EMPTY_RTE,

  id: null,
  variant: null,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.description }),
)(Description);
