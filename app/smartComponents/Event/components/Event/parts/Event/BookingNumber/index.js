/**
 * Created by stephenkarpinskyj on 15/11/18.
 */

import JText from 'components/JText';
import React from 'react';
import { withStyles } from 'components/material-ui';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { Text } from 'ugcomponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { ability } from 'apis/components/Ability/ability';
import { PARTICIPANT } from 'utils/modelConstants';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import Icon from 'ugcomponents/Icon';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';
import inputs from './inputs';
import styles from './styles';

export class BookingNumber extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderField = () => {
    const { value } = this.props;

    return (
      <GridItem xs={12} sm={5}>
        <Text value={value} {...inputs.bookingNumber} />
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

  renderEditable = () => {
    const { value, dataId, readOnly } = this.props;
    if (!ability.can('execute', PARTICIPANT)) return null;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          {...inputs.bookingNumber}
          {...inputs.bookingNumberEditable}
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
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderLabelValue={this.renderLabelValue}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

BookingNumber.propTypes = {
  // hoc
  value: PropTypes.string,
  classes: PropTypes.object.isRequired,

  // parent
  dataId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  component: PropTypes.string,
  className: PropTypes.string,
};

BookingNumber.defaultProps = {
  value: '',
  component: 'span',

  dataId: null,
  variant: null,
  readOnly: false,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.bookingNumber }),
  withStyles(styles, { name: 'EventBookingNumber' }),
)(BookingNumber);
