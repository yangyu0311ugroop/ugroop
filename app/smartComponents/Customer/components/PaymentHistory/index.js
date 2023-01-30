import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import WithResaga from 'resaga';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { H4 } from 'viewComponents/Typography';
import Margin from 'viewComponents/Margin';
import { CHARGES_API_HELPERS } from 'apis/components/Charges/helpers';
import { FormattedMessage as M } from 'react-intl';
import { DEFAULT, URL_HELPERS } from 'appConstants';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import ChargeDetails from './components/ChargeDetails';
import styles from './styles';
import m from './messages';
import { makeStyles } from '../../../../components/material-ui';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';
const useStyles = makeStyles(styles);
function PaymentHistory(props) {
  const classes = useStyles();
  const { id, orgId, userId } = props;
  const history = useHistory();
  const [state, setState] = useImmer({
    loading: false,
  });
  useEffect(() => {
    if (id) {
      fetchCharges(id);
    }
  }, [id]);

  const paymentIds = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(store, {
      customerId: id,
      attribute: 'charges',
    }),
  );

  const listChargesHasMore = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(store, {
      customerId: id,
      attribute: 'listChargesHasMore',
    }),
  );

  const lastIdChargesFetched = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(store, {
      customerId: id,
      attribute: 'listChargesHasMore',
    }),
  );
  const fetchCharges = (cid, more = false) => {
    let data = {
      customer: cid,
    };
    if (more && listChargesHasMore && lastIdChargesFetched) {
      data = {
        ...data,
        starting_after: lastIdChargesFetched,
      };
    }
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.loading = true;
    });
    return CHARGES_API_HELPERS.getCustomerCharges(
      {
        data,
        onSuccess: fetchOnSuccess,
        orError: fetchOnError,
      },
      props,
    );
  };

  const viewPaymentHistory = () => {
    let PathName = URL_HELPERS.personalViewPaymentHistory(userId);
    if (orgId) {
      PathName = URL_HELPERS.orgViewPaymentHistory(orgId);
    }

    history.push({
      pathname: PathName,
    });
  };

  const fetchOnSuccess = result => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.loading = false;
    });
    return result;
  };

  const fetchOnError = result => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.loading = false;
    });
    return result;
  };

  const isEmpty = () => {
    if (paymentIds) {
      return paymentIds.length === 0;
    }
    return true;
  };

  const renderIsloading = () => <LoadingText />;
  const renderContent = cid => (
    <ChargeDetails
      id={cid}
      actionButtonPros={{ onClick: viewPaymentHistory }}
      variant={DEFAULT}
    />
  );

  const renderPaymentHistory = () => {
    const lastChargeId = paymentIds[0];
    return (
      <React.Fragment>
        <GridItem>{renderContent(lastChargeId)}</GridItem>
      </React.Fragment>
    );
  };

  const renderBlankSlate = () => (
    <React.Fragment>
      <Margin top="lg">
        <GridItem>
          <H4 dense weight="bolder">
            <M {...m.blankText} />
          </H4>
        </GridItem>
      </Margin>
    </React.Fragment>
  );

  if (state.loading) return renderIsloading();
  return (
    <GridContainer
      direction="column"
      className={classes.noCardInfo}
      spacing={0}
    >
      {isEmpty() && renderBlankSlate()}
      {!isEmpty() && renderPaymentHistory()}
    </GridContainer>
  );
}

PaymentHistory.propTypes = {
  // parent props
  id: PropTypes.string,
  orgId: PropTypes.number,
  userId: PropTypes.number,
};

PaymentHistory.defaultProps = {};

export default compose(WithResaga())(React.memo(PaymentHistory));
