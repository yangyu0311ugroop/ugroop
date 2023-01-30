import InputAdornment from '@material-ui/core/InputAdornment';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import SelectCurrency from 'containers/Portal/components/AddEvent/components/EventForm/parts/Reservation/components/AmountsForm/components/SelectCurrency';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Icon from 'ugcomponents/Icon';
import { Data } from 'ugcomponents/Inputs';
import JButton from 'viewComponents/Button/variants/JButton';

function AmountsForm(props) {
  const { flightBooking, templateId, data, popper } = props;
  const [adding, setAdding] = useState(popper);

  if (!adding) {
    return (
      <JButton onClick={() => setAdding(true)}>
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem>
            <Icon icon="lnr-plus" size="xsmall" color="blue" bold />
          </GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText blue>Amounts</JText>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </JButton>
    );
  }

  const eventAmounts = get(data, 'eventAmounts');
  const flightBookingAmounts = get(data, 'bookingAmounts');

  const amount = eventAmounts || flightBookingAmounts || {};

  const { currency, id, budgetAmount, actualAmount } = amount;

  const name = flightBooking ? 'bookingAmounts' : 'data.eventAmounts';

  return (
    <GridContainer direction="column">
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem xs>
            <JText dark bold>
              Amounts
            </JText>
          </GridItem>
          {!popper && (
            <GridItem>
              <JText blue onClick={() => setAdding(false)}>
                Cancel
              </JText>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>

      <Data currentValue={id} name={`${name}.id`} />

      <SelectCurrency
        templateId={templateId}
        name={`${name}.currency`}
        required
        value={currency}
      />

      <GridItem>
        <FText
          type="number"
          name={`${name}.budgetAmount`}
          label="Budget Amount"
          placeholder="Enter budget amount"
          value={budgetAmount}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{currency}</InputAdornment>
            ),
          }}
        />
      </GridItem>
      <GridItem>
        <FText
          type="number"
          name={`${name}.actualAmount`}
          label="Actual Amount"
          placeholder="Enter actual amount"
          value={actualAmount}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{currency}</InputAdornment>
            ),
          }}
        />
      </GridItem>
    </GridContainer>
  );
}

AmountsForm.propTypes = {
  templateId: PropTypes.number,
  data: PropTypes.object,
  popper: PropTypes.bool,
  flightBooking: PropTypes.bool,
};
AmountsForm.defaultProps = {};

export default AmountsForm;
