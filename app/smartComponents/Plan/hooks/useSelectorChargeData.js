import { useSelector } from 'react-redux';
import { CUSTOMER_RESELECTOR } from '../../../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../../../datastore/selectUtility';

function useSelectorChargeData(props) {
  const chargeId = props.chargeId;

  const receiptURL = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectChargeAttribute)(state, {
      chargeId,
      attribute: 'receipt_url',
    }),
  );
  const brand = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectChargeAttribute)(state, {
      chargeId,
      attribute: 'payment_method_details.card.brand',
    }),
  );

  const last4 = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectChargeAttribute)(state, {
      chargeId,
      attribute: 'payment_method_details.card.last4',
    }),
  );

  const created = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectChargeAttribute)(state, {
      chargeId,
      attribute: 'created',
    }),
  );

  const amount = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectChargeAttribute)(state, {
      chargeId,
      attribute: 'amount',
    }),
  );

  const currency = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectChargeAttribute)(state, {
      chargeId,
      attribute: 'currency',
    }),
  );

  const status = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectChargeAttribute)(state, {
      chargeId,
      attribute: 'status',
    }),
  );

  const message = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectChargeAttribute)(state, {
      chargeId,
      attribute: 'outcome.seller_message',
    }),
  );

  return {
    receiptURL,
    brand,
    last4,
    created,
    amount,
    status,
    currency,
    message,
  };
}

export default useSelectorChargeData;
