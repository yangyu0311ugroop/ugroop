import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Step1 from 'containers/Portal/components/AddEvent/components/EventForm/forms/FlightBookingForm/components/Step1';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class FlightBookingForm extends PureComponent {
  state = {};

  render = () => {
    const {
      renderFormHeader,
      formValue,
      onClose,
      selectedDayId,
      timelineId,
    } = this.props;
    const { step1Values } = this.state;

    const node = get(formValue, 'node');

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>{LOGIC_HELPERS.ifFunction(renderFormHeader)}</GridItem>

        <GridItem>
          <Step1
            onClose={onClose}
            node={node}
            data={node}
            selectedDayId={selectedDayId}
            timelineId={timelineId}
            defaultValues={step1Values}
          />
        </GridItem>
      </GridContainer>
    );
  };
}

FlightBookingForm.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  formValue: PropTypes.object,
  renderFormHeader: PropTypes.func,
  onClose: PropTypes.func,
  selectedDayId: PropTypes.number,
  timelineId: PropTypes.number,

  // resaga props
};

FlightBookingForm.defaultProps = {
  formValue: {},
};

export default compose(withStyles(styles, { name: 'FlightBookingForm' }))(
  FlightBookingForm,
);

// resaga(CONFIG),
