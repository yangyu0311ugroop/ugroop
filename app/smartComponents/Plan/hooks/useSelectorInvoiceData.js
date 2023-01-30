import { useSelector } from 'react-redux';
import useVigilante from '@mollycule/vigilante';
import { makeSingleSelect } from '../../../datastore/selectUtility';
import { INVOICE_RESELECTOR } from '../../../datastore/invoiceImmerStore/selectors';

export const useSelectorInvoiceData = props => {
  const customerId = props.customerId;
  const currentLineIds = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'lines.data',
    }),
  );

  // const upcomingLineIds = useSelector(state =>
  //   makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
  //     customerId,
  //     attribute: 'lines.data',
  //   }),
  // );

  const upcomingTax = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'tax',
    }),
  );

  const upcomingSubtotal = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'subtotal',
    }),
  );

  const upcomingTotal = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'total',
    }),
  );

  const upcomingPeriodStart = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'period_start',
    }),
  );

  const upcomingTaxPercent = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'tax_percent',
    }),
  );

  const upcomingInvoiceEndBalance = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'ending_balance',
    }),
  );

  const upcomingInvoiceStartBalance = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'starting_balance',
    }),
  );

  const previewedCoupon = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.coupon.id',
    }),
  );

  const previewedCouponMode = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.coupon.duration',
    }),
  );

  const previewedCouponEndTime = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.end',
    }),
  );

  const previewedCouponStartTime = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.start',
    }),
  );

  const previewedCouponPercentOff = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.coupon.percent_off',
    }),
  );

  const amountDue = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'amount_due',
    }),
  );

  const endBalance = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectUpcomingInvoiceAttribute)(state, {
      customerId,
      attribute: 'ending_balance',
    }),
  );

  const subscriptionMetaInfo = useSelector(state =>
    INVOICE_RESELECTOR.makeSelectSubscriptionMetaInfo(state, {
      customerId,
      productType: props.type,
    }),
  );

  const subscriptionProrateMetaInfo = useSelector(state =>
    INVOICE_RESELECTOR.makeSelectProrateMetaInfo(state, {
      customerId,
      productType: props.type,
    }),
  );

  const invoiceLinesType = useSelector(state =>
    INVOICE_RESELECTOR.makeSelectInvoiceTypes(state, {
      customerId,
    }),
  );

  const existedCoupon = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.coupon.id',
    }),
  );

  const existedCouponEnd = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.end',
    }),
  );

  const existedCouponStart = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.start',
    }),
  );

  const existedCouponMode = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.coupon.duration',
    }),
  );

  const existedCouponPercentOff = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.coupon.percent_off',
    }),
  );

  const existedCouponDuration = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.coupon.duration_in_months',
    }),
  );

  const existedCouponDurationInYear = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'discount.coupon.duration_in_years',
    }),
  );

  const currentInvoiceStartingBalance = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId,
      attribute: 'starting_balance',
    }),
  );

  const currentInvoiceProrateAmount = useSelector(state =>
    INVOICE_RESELECTOR.makeSelectCurrentInvoiceProrateMetaInfo(state, {
      customerId,
      planType: props.planType,
    }),
  );

  useVigilante('useSelectorInvoiceData', {
    currentLineIds,
    upcomingTax,
    upcomingSubtotal,
    upcomingTotal,
    upcomingPeriodStart,
    upcomingTaxPercent,
    upcomingInvoiceEndBalance,
    upcomingInvoiceStartBalance,
    previewedCoupon,
    previewedCouponMode,
    previewedCouponEndTime,
    previewedCouponStartTime,
    previewedCouponPercentOff,
    amountDue,
    endBalance,
    subscriptionMetaInfo,
    subscriptionProrateMetaInfo,
    invoiceLinesType,
    existedCouponStart,
    existedCoupon,
    existedCouponEnd,
    existedCouponMode,
    existedCouponPercentOff,
    currentInvoiceStartingBalance,
    currentInvoiceProrateAmount,
  });
  return {
    currentLineIds,
    upcomingTax,
    upcomingSubtotal,
    upcomingTotal,
    upcomingPeriodStart,
    upcomingTaxPercent,
    upcomingInvoiceEndBalance,
    upcomingInvoiceStartBalance,
    previewedCoupon,
    previewedCouponMode,
    previewedCouponEndTime,
    previewedCouponStartTime,
    previewedCouponPercentOff,
    amountDue,
    endBalance,
    subscriptionMetaInfo,
    subscriptionProrateMetaInfo,
    invoiceLinesType,
    existedCoupon,
    existedCouponStart,
    existedCouponEnd,
    existedCouponMode,
    existedCouponPercentOff,
    existedCouponDuration,
    existedCouponDurationInYear,
    currentInvoiceStartingBalance,
    currentInvoiceProrateAmount,
  };
};
