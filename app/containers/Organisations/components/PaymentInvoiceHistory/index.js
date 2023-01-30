import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Margin from 'viewComponents/Margin';
import { H2 } from 'viewComponents/Typography';
import { FormattedMessage as M } from 'react-intl';
import PaymentList from 'smartComponents/Customer/components/PaymentHistory/components/PaymentList';
import Container from 'components/Container';
import { useSelector } from 'react-redux';
import styles from './styles';
import m from './messages';
import { makeStyles } from '../../../../components/material-ui';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';

const useStyles = makeStyles(styles);
function PaymentInvoiceHistory(props) {
  const { orgId } = props;
  const id = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(state, {
      orgId,
    }),
  );

  const classes = useStyles();
  const renderTitle = () => (
    <GridItem>
      <H2>
        <M {...m.title} />
      </H2>
    </GridItem>
  );

  return (
    <Container>
      <Margin bottom="lg">
        <GridContainer
          direction="column"
          className={classes.noCardInfo}
          spacing={0}
        >
          {renderTitle()}
          <PaymentList id={id} />
        </GridContainer>
      </Margin>
    </Container>
  );
}

PaymentInvoiceHistory.propTypes = {
  orgId: PropTypes.number,
};

PaymentInvoiceHistory.defaultProps = {};

export default compose(resaga())(React.memo(PaymentInvoiceHistory));
