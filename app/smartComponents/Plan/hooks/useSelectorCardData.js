import { useSelector } from 'react-redux';
import { CUSTOMER_RESELECTOR } from '../../../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../../../datastore/selectUtility';

function useSelectorCardData(props) {
  const cardId = props.cardId;

  const brand = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'brand',
    }),
  );

  const cardNo = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'last4',
    }),
  );

  const expYear = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'exp_year',
    }),
  );

  const expMonth = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'exp_month',
    }),
  );
  const city = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'address_city',
    }),
  );

  const country = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'address_country',
    }),
  );

  const line1 = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'address_line1',
    }),
  );

  const line2 = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'address_line2',
    }),
  );

  const postalCode = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(state, {
      cardId,
      attribute: 'address_zip',
    }),
  );

  const state = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectPaymentSourceAttribute)(store, {
      cardId,
      attribute: 'address_state',
    }),
  );

  return {
    brand,
    cardNo,
    expYear,
    expMonth,
    city,
    country,
    line1,
    line2,
    postalCode,
    state,
  };
}

export default useSelectorCardData;
