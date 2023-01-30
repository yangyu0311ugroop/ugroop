import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React from 'react';
import Margin from 'viewComponents/Margin';
import { H2 } from 'viewComponents/Typography';
import { FormattedMessage as M } from 'react-intl';
import PaymentList from 'smartComponents/Customer/components/PaymentHistory/components/PaymentList';
import Container from 'components/Container';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import m from './messages';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';
function PaymentInvoiceHistory(props) {
  const id = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(state, {
      userId: props.userId,
    }),
  );
  const renderTitle = () => (
    <GridItem>
      <H2>
        <M {...m.title} />
      </H2>
    </GridItem>
  );

  return (
    <PlanProvider>
      <Helmet
        title="Payment History | Subscription"
        meta={[
          {
            name: 'description',
            content: 'Payment History ',
          },
        ]}
      />
      <Container>
        <Margin bottom="lg">
          <GridContainer direction="column" spacing={0}>
            {renderTitle()}
            <PaymentList id={id} />
          </GridContainer>
        </Margin>
      </Container>
    </PlanProvider>
  );
}

PaymentInvoiceHistory.propTypes = {
  userId: PropTypes.number,
};

PaymentInvoiceHistory.defaultProps = {};

export default React.memo(PaymentInvoiceHistory);
