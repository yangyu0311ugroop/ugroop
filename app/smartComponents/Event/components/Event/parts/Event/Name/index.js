/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { EVENT_UTILS } from 'utils/events';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { withStyles } from 'components/material-ui';
import GridItem from 'components/GridItem';
import { H5 } from 'viewComponents/Typography';
import { EventHeading } from 'viewComponents/Event/components/Heading';
import { Text } from 'ugcomponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import inputs from './inputs';
import style from './style';

export class Name extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderLabelValue = () => {
    const { classes, value, Typography } = this.props;
    return (
      value && (
        <GridItem>
          <Typography className={classes.labelValueItem} dense weight="bold">
            {value}
          </Typography>
        </GridItem>
      )
    );
  };

  renderHeadingValue = value => <EventHeading>{value}</EventHeading>;

  renderPlaceholder = () => this.props.editablePlaceholder;

  renderField = () => {
    const { value } = this.props;
    return (
      <GridItem>
        <Text value={value} {...inputs.name} {...inputs.nameField} />
      </GridItem>
    );
  };

  renderValueOnly = () => this.props.value;

  renderEditableHeadingForm = () => {
    const { dataId, value, readOnly, readOnlyEditablePlaceholder } = this.props;
    if (EVENT_UTILS.participantCannotExecuteEvent(value)) return null;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          Typography="H2"
          placeholder={this.renderPlaceholder()}
          renderValue={this.renderHeadingValue}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
          readOnlyPlaceholder={readOnlyEditablePlaceholder}
          {...inputs.name}
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
        renderDefault={this.renderField}
        renderEditableHeadingForm={this.renderEditableHeadingForm}
        renderLabelValue={this.renderLabelValue}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

Name.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  dataId: PropTypes.number,
  value: PropTypes.string,

  // parent
  variant: PropTypes.string,
  editablePlaceholder: PropTypes.string,
  readOnly: PropTypes.bool,
  readOnlyEditablePlaceholder: PropTypes.string,
  Typography: PropTypes.func,
};

Name.defaultProps = {
  dataId: null,
  value: '',

  variant: null,
  editablePlaceholder: 'Click to specify event title',
  readOnly: false,
  readOnlyEditablePlaceholder: 'Untitled',
  Typography: H5,
};

export default compose(
  withStyles(style, { name: 'Event/parts/Event/Name' }),
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.name }),
)(Name);
