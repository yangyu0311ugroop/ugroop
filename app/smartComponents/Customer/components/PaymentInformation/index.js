import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React from 'react';
import PaymentMethods from 'smartComponents/Customer/components/PaymentMethods';
import PaymentHistory from 'smartComponents/Customer/components/PaymentHistory';
import { FormattedMessage as M } from 'react-intl';
import { useSelector } from 'react-redux';
import m from './messages';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
export const PaymentInformation = props => {
  const { orgId, userId } = props;
  const customerId = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(state, {
      orgId,
      userId,
    }),
  );
  const currentPaymentSource = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(state, {
      customerId,
      attribute: 'default_source',
    }),
  );
  return (
    <GridContainer>
      <GridItem xs={12} md={6}>
        <JText lg bold>
          <M {...m.headerPaymentMethod} />
        </JText>
        <PaymentMethods
          id={customerId}
          orgId={orgId}
          userId={userId}
          currentPaymentSource={currentPaymentSource}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <JText lg bold>
          <M {...m.headerPaymentHistory} />
        </JText>
        <PaymentHistory id={customerId} orgId={orgId} userId={userId} />
      </GridItem>
    </GridContainer>
  );
};

PaymentInformation.propTypes = {
  orgId: PropTypes.any,
  userId: PropTypes.number,
};

PaymentInformation.defaultProps = {};

export default React.memo(PaymentInformation);
