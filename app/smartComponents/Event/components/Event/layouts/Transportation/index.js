import GridContainer from 'components/GridContainer/index';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { BUS_TYPES, EVENT_CONSTANTS } from 'utils/constants/events';

import Destination from './Destination';
import Booking from './Booking';
import Details from './Details';
import Attachment from '../Event/Attachments';

import m from './messages';
import { CONFIG } from './config';

export class Transportation extends PureComponent {
  getOptions = () => {
    const { subtype } = this.props;

    switch (subtype) {
      case EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type:
        return [
          {
            children: <M {...m.publicLabel} />,
            value: BUS_TYPES.PUBLIC,
          },
          {
            children: <M {...m.privateLabel} />,
            value: BUS_TYPES.PRIVATE,
          },
          {
            children: <M {...m.charterLabel} />,
            value: BUS_TYPES.CHARTER,
          },
        ];
      default:
        return undefined;
    }
  };

  getDestinationProps = () => {
    const { subtype } = this.props;

    switch (subtype) {
      case EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type:
        return {
          startLocationLabel: <M {...m.startLabel} />,
          endLocationLabel: <M {...m.endLabel} />,
        };
      default:
        return {};
    }
  };

  getRestProps = () =>
    omit(this.props, ['personCountLabel', 'personCountPlaceholder']);

  getBookingProps = () =>
    pick(this.props, ['personCountLabel', 'personCountPlaceholder']);

  hasType = () => {
    const { subtype } = this.props;

    switch (subtype) {
      case EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type:
      case EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type:
        return true;

      default:
        return false;
    }
  };

  renderPart = (Component, props = {}) => (
    <Component {...this.getRestProps()} {...props} />
  );

  renderEditable = () => (
    <GridContainer direction="column" wrap="nowrap">
      {this.renderPart(Details, {
        variant: EVENT_CONSTANTS.VARIANTS.editableHeadingForm,
        hasType: this.hasType(),
        options: this.getOptions(),
        subtype: this.props.subtype,
      })}
      {this.renderPart(Destination, this.getDestinationProps())}
      {this.renderPart(Booking, this.getBookingProps())}
      {this.renderPart(Attachment)}
    </GridContainer>
  );

  renderField = () => (
    <GridContainer direction="column">
      {this.renderPart(Details, {
        hasType: this.hasType(),
        options: this.getOptions(),
      })}
      {this.renderPart(Destination, this.getDestinationProps())}
      {this.renderPart(Booking, this.getBookingProps())}
    </GridContainer>
  );

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderField={this.renderField}
        renderDefault={this.renderEditable}
      />
    );
  };
}

Transportation.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  subtype: PropTypes.string,

  // resaga props
};

Transportation.defaultProps = {
  subtype: '',
};

export default compose(resaga(CONFIG))(Transportation);
