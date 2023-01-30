import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { makeStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import AmountsForm from 'containers/Portal/components/AddEvent/components/EventForm/parts/Reservation/components/AmountsForm';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withCanEditEvent } from 'smartComponents/Event/hoc';
import AmountsBar from 'smartComponents/Node/types/Event/components/AmountsCard/components/AmountsBar';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Form from 'ugcomponents/Form';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import Tooltip from 'viewComponents/Tooltip';
import styles from './styles';

const useStyles = makeStyles(styles);

function SmartAmounts(props) {
  const {
    component: Component,
    templateId,
    data,
    showEmpty,
    flightBooking,
    canEditEvent,
  } = props;

  const classes = useStyles();
  const [changed, setChanged] = useState(false);
  const [changing, setChanging] = useState(false);

  if (!canEditEvent) return null;

  const eventAmounts = get(data, 'eventAmounts');
  const flightBookingAmounts = get(data, 'bookingAmounts');

  const amount = eventAmounts || flightBookingAmounts || {};

  const { actualAmount, budgetAmount, currency } = amount;
  if ((!actualAmount || !currency) && !showEmpty) return null;

  const handleResetState = closeMenu => () => {
    LOGIC_HELPERS.ifFunction(closeMenu, []);
    setChanging(false);
    setChanged(false);
  };

  const handleChange = (form, isChanged) => {
    setChanged(isChanged);
  };

  const handleSubmit = closeMenu => model => {
    TEMPLATE_API_HELPERS.patchAmount({
      model,
      onSuccess: handleResetState(closeMenu),
      onError: handleResetState(closeMenu),
      ...props,
    });
  };

  // eslint-disable-next-line react/prop-types
  const renderButton = ({ openMenu }) => (
    <Tooltip
      isLight
      placement="top"
      title={
        <GridContainer card direction="column">
          <GridItem>
            <AmountsBar
              actualAmount={actualAmount}
              budgetAmount={budgetAmount}
              currency={currency}
            />
          </GridItem>
        </GridContainer>
      }
      enterDelay={700}
    >
      <JText
        link
        sm
        bold={!!actualAmount}
        dark={!!actualAmount}
        onClick={openMenu}
      >
        {actualAmount
          ? EVENT_VIEW_HELPERS.normaliseAmount(actualAmount, currency)
          : 'Set amount'}
      </JText>
    </Tooltip>
  );

  // eslint-disable-next-line react/prop-types
  const renderMenu = ({ closeMenu }) => (
    <div className={classes.amountsForm}>
      <Form onValidSubmit={handleSubmit(closeMenu)} onChange={handleChange}>
        <GridContainer direction="column">
          <GridItem>
            <AmountsForm
              flightBooking={flightBooking}
              templateId={templateId}
              data={data}
              popper
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
  );

  return (
    <Component>
      <Popper
        renderButton={renderButton}
        currency={currency}
        actualAmount={actualAmount}
        budgetAmount={budgetAmount}
        disablePortal
      >
        {renderMenu}
      </Popper>
    </Component>
  );
}

SmartAmounts.propTypes = {
  canEditEvent: PropTypes.bool,
  templateId: PropTypes.number,
  flightBooking: PropTypes.bool,
  showEmpty: PropTypes.bool,
  data: PropTypes.object,
  component: PropTypes.node,
};
SmartAmounts.defaultProps = {
  data: {},
  component: 'span',
};

export default compose(
  withCanEditEvent,
  resaga({}),
)(SmartAmounts);
