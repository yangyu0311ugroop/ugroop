/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from 'components/material-ui';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { pluralizeText } from 'utils/stringAdditions';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Number as NumberInput } from 'smartComponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import inputs from './inputs';
import styles from './styles';

export class PassengerCount extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchFlightBooking(obj, this.props);
  };

  renderEditableValue = value =>
    `${value} ${pluralizeText('people', Number.parseInt(value, 10), true)}`;

  renderEditable = () => {
    const { value, readOnly } = this.props;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          renderValue={this.renderEditableValue}
          TextComponent={NumberInput}
          inline
          {...inputs.passengerCount}
          {...inputs.passengerCountEditable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        />
      </GridItem>
    );
  };

  renderField = () => {
    const { value, classes } = this.props;
    return (
      <GridItem xs={4}>
        <NumberInput
          value={value}
          {...inputs.passengerCount}
          className={classes.passengerCountStyles}
        />
      </GridItem>
    );
  };

  renderLabelValue = () => {
    const { value, renderEmpty } = this.props;

    if (!value) {
      return LOGIC_HELPERS.ifFunction(renderEmpty);
    }

    const icon = LOGIC_HELPERS.ifElse(
      [value === 1, value === '1'],
      'lnr-user',
      'lnr-users',
      true,
    );

    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
          <GridItem>
            <Icon icon={icon} size="xsmall" paddingRight />
          </GridItem>
          <GridItem>{value} pax</GridItem>
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
        renderLabelValue={this.renderLabelValue}
        renderValueOnly={this.renderLabelValue}
      />
    );
  };
}

PassengerCount.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  renderEmpty: PropTypes.func,

  // resaga value
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PassengerCount.defaultProps = {
  variant: null,
  readOnly: false,
};

export default compose(
  withStyles(styles, { name: 'FlightBooking/PassengerCount' }),
  EVENT_STORE_HOC.selectFlightBookingProp({
    path: FLIGHT_BOOKING_PATHS.passengerCount,
  }),
)(PassengerCount);
