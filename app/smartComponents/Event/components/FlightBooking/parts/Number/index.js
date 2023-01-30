/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import GridContainer from 'components/GridContainer';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from 'components/material-ui';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import GridItem from 'components/GridItem';
import { Text } from 'smartComponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import inputs from './inputs';
import styles from './styles';

export class Number extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchFlightBooking(obj, this.props);
  };

  renderEditable = () => {
    const { value, readOnly } = this.props;
    return (
      <EditableTextForm
        Typography="H2"
        value={value}
        {...inputs.numberEditable}
        onSubmit={this.handleSubmit}
        readOnly={readOnly}
      />
    );
  };

  renderField = () => {
    const { value, classes } = this.props;
    return (
      <GridItem xs={4}>
        <Text
          value={value}
          {...inputs.number}
          className={classes.referenceStyles}
        />
      </GridItem>
    );
  };

  renderLabelValue = () => {
    const { value, renderEmpty } = this.props;

    if (!value) {
      return LOGIC_HELPERS.ifFunction(renderEmpty);
    }

    return <GridItem>{value}</GridItem>;
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
                paddingRight
              />
            </GridItem>
            <GridItem>
              <JText blue uppercase ellipsis sm>
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
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderLabelValue={this.renderLabelValue}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

Number.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  component: PropTypes.string,
  className: PropTypes.string,
  renderEmpty: PropTypes.func,

  // resaga value
  value: PropTypes.string,
};

Number.defaultProps = {
  component: 'span',
  variant: null,
  readOnly: false,
};

export default compose(
  withStyles(styles, { name: 'FlightBooking/Number' }),
  EVENT_STORE_HOC.selectFlightBookingProp({
    path: FLIGHT_BOOKING_PATHS.number,
  }),
)(Number);
