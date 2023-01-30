import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { EditableTextForm } from 'smartComponents/Editables';
import { TRANSPORATION_BOOKING_NUBMER_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/BookingNumber/inputs';

import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Text } from 'smartComponents/Inputs';
import { FormattedMessage as M } from 'react-intl';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import Icon from 'ugcomponents/Icon';
import m from './messages';
import styles from './styles';

export class BookingNumber extends PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  handleField = () => {
    const { value } = this.props;

    return (
      <GridItem sm={5}>
        <Text value={value} {...TRANSPORATION_BOOKING_NUBMER_INPUTS.field} />
      </GridItem>
    );
  };

  renderLabelValue = () => {
    const { classes, value } = this.props;
    return (
      value && (
        <GridContainer className={classes.cardRoot} alignItems="center">
          <GridItem>
            <M {...m.bookingLabel} />
            {value}
          </GridItem>
          <GridItem>
            <Icon size="normal" icon="checkmark-circle" />
          </GridItem>
        </GridContainer>
      )
    );
  };

  handleEditable = () => {
    const { value, dataId, readOnly } = this.props;

    return (
      <GridItem>
        <EditableTextForm
          value={value}
          {...TRANSPORATION_BOOKING_NUBMER_INPUTS.editable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableTextForm>
      </GridItem>
    );
  };

  renderValueOnly = () => {
    const { component: Component, value, className } = this.props;

    return (
      value && (
        <Component className={className}>
          <GridContainer alignItems="center" spacing={0} wrap="nowrap">
            <GridItem>
              <Icon
                icon="lnr-checkmark-circle"
                size="xsmall"
                color="blue"
                bold
                paddingRight
              />
            </GridItem>
            <GridItem>
              <JText blue uppercase ellipsis sm paddingRight>
                {value}
              </JText>
            </GridItem>
          </GridContainer>
        </Component>
      )
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderField={this.handleField}
        renderDefault={this.handleEditable}
        renderLabelValue={this.renderLabelValue}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

BookingNumber.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  className: PropTypes.string,
  dataId: PropTypes.number,
  readOnly: PropTypes.bool,
  component: PropTypes.node,

  // resaga props
  value: PropTypes.string,
};

BookingNumber.defaultProps = {
  variant: '',
  dataId: null,
  readOnly: false,
  value: '',
  component: 'span',
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationDetailBookingNumber,
  }),
  withStyles(styles, { name: 'TransportationBookingNumber' }),
)(BookingNumber);
