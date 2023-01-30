import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { makeStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import AmountsForm from 'containers/Portal/components/AddEvent/components/EventForm/parts/Reservation/components/AmountsForm';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Form from 'ugcomponents/Form';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import styles from './styles';

const useStyles = makeStyles(styles);

function ViewAmounts(props) {
  const classes = useStyles();
  const {
    id,
    amount,
    templateId,
    data,
    showAmounts,
    currency,
    flightBooking,
    popper,
  } = props;

  const [changed, setChanged] = useState(false);
  const [changing, setChanging] = useState(false);

  if (!showAmounts) return null;

  const handlePatchEventSuccess = closeMenu => () => {
    LOGIC_HELPERS.ifFunction(closeMenu, []);
    setChanging(false);

    return NODE_API_HELPERS.getTimes(
      {
        id: templateId,
        ids: [id],
      },
      props,
    );
  };

  const handleResetState = closeMenu => {
    LOGIC_HELPERS.ifFunction(closeMenu, []);
    setChanging(false);
    setChanged(false);
  };

  const saveEventAmounts = ({
    model: {
      data: { eventAmounts },
    },
    closeMenu,
  }) => {
    const type = EVENT_VIEW_HELPERS.type(data);
    const subtype = EVENT_VIEW_HELPERS.subtype(data);
    const eventAmountId = EVENT_VIEW_HELPERS.eventAmountId(data);

    return TEMPLATE_API_HELPERS.patchEvent(
      {
        model: {
          data: {
            detail: { type: subtype },
            type,
            eventAmounts: {
              ...eventAmounts,
              id: eventAmountId,
            },
          },
        },
        onSuccess: handlePatchEventSuccess(closeMenu),
        onError: handleResetState(closeMenu),
      },
      props,
    );
  };

  const saveFlightBookingAmounts = ({
    model: {
      bookingAmounts: { actualAmount, budgetAmount, currency: cur },
    },
    closeMenu,
  }) => {
    const amountId = EVENT_VIEW_HELPERS.bookingAmountId(data);

    const model = {
      bookingAmounts: {
        id: amountId,
        budgetAmount,
        actualAmount,
        currency: cur,
      },
    };

    LOGIC_HELPERS.ifElse(closeMenu, []);

    TEMPLATE_API_HELPERS.patchFlightBooking(
      {
        model,
        onSuccess: handleResetState(closeMenu),
        onError: handleResetState(closeMenu),
      },
      { ...props, dataId: id },
    );
  };

  const handleSubmit = closeMenu => model => {
    setChanging(true);
    if (flightBooking) {
      saveFlightBookingAmounts({ model, closeMenu });
    } else {
      saveEventAmounts({ model, closeMenu });
    }
  };

  const handleChange = (form, isChanged) => {
    setChanged(isChanged);
  };

  // eslint-disable-next-line react/prop-types
  const renderButton = ({ openMenu }) => (
    <GridItem>
      <GridContainer direction="column" spacing={0} alignItems="flex-end">
        {amount && currency && (
          <GridItem>
            <JText gray sm>
              {LOGIC_HELPERS.ifElse(
                showAmounts === 'budgetAmounts',
                'Budget',
                'Amount',
              )}
            </JText>
          </GridItem>
        )}
        <GridItem>
          <JText link sm={!amount || !currency} onClick={openMenu}>
            {LOGIC_HELPERS.ifElse(
              [amount, currency],
              EVENT_VIEW_HELPERS.prettifyAmount(amount, currency),
              LOGIC_HELPERS.ifElse(
                showAmounts === 'budgetAmounts',
                'Set budget',
                'Set amount',
              ),
            )}
          </JText>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  // eslint-disable-next-line react/prop-types
  const renderMenu = ({ closeMenu }) => (
    <GridItem>
      <div className={classes.amountsForm}>
        <Form onValidSubmit={handleSubmit(closeMenu)} onChange={handleChange}>
          <GridContainer direction="column">
            <GridItem>
              <AmountsForm
                flightBooking={flightBooking}
                templateId={templateId}
                data={data}
                popper={popper}
              />
            </GridItem>
            <GridItem>
              <GridContainer alignItems="center">
                <GridItem>
                  <JButton bg="gray" padding="lg" bold onClick={closeMenu}>
                    Close
                  </JButton>
                </GridItem>
                <GridItem xs>
                  <JButton
                    block
                    bg="blue"
                    padding="lg"
                    bold
                    type="submit"
                    disabled={!changed || changing}
                  >
                    Save
                  </JButton>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </Form>
      </div>
    </GridItem>
  );

  return (
    <GridItem>
      <Popper
        stopPropagation
        disablePortal
        renderButton={renderButton}
        amount={amount}
        currency={currency}
      >
        {renderMenu}
      </Popper>
    </GridItem>
  );
}

ViewAmounts.propTypes = {
  id: PropTypes.number,
  templateId: PropTypes.number,
  amount: PropTypes.number,
  showAmounts: PropTypes.string,
  currency: PropTypes.string,
  flightBooking: PropTypes.bool,
  popper: PropTypes.bool,
  data: PropTypes.object,
};
ViewAmounts.defaultProps = {
  data: {},
};

export default compose(resaga({}))(ViewAmounts);
