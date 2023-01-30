import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Margin from 'viewComponents/Margin';
import { H4 } from 'viewComponents/Typography';
import { CHARGES_API_HELPERS } from 'apis/components/Charges/helpers';
import { FormattedMessage as M } from 'react-intl';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import ChargeItems from 'smartComponents/Customer/components/PaymentHistory/components/ChargeItems';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { useHistory } from 'react-router-dom';
import styles from './styles';
import m from './messages';
import { makeStyles } from '../../../../../../components/material-ui';
import { makeSingleSelect } from '../../../../../../datastore/selectUtility';
import { CUSTOMER_RESELECTOR } from '../../../../../../datastore/customerDataImmerStore/selectors';

const useStyles = makeStyles(styles);
function PaymentList(props) {
  const classes = useStyles();
  const [state, setState] = useImmer({
    loading: false,
  });
  const history = useHistory();
  const { id: customerId } = props;
  useEffect(() => {
    if (customerId) {
      fetchCharges(customerId);
    }
  }, [customerId]);

  const paymentIds = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(store, {
      customerId,
      attribute: 'charges',
    }),
  );

  const listChargesHasMore = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(store, {
      customerId,
      attribute: 'listChargesHasMore',
    }),
  );

  const lastIdChargesFetched = useSelector(store =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCustomerAttribute)(store, {
      customerId,
      attribute: 'listChargesHasMore',
    }),
  );
  const fetchCharges = (id, more = false) => {
    let data = {
      customer: id,
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

  const showMoreClick = () => {
    const { id } = props;
    fetchCharges(id, true);
  };

  const renderContent = () => <ChargeItems ids={paymentIds} />;

  const renderShowMore = () => {
    const buttonPros = {
      variant: VARIANTS.INLINE,
      size: 'xs',
      dense: true,
    };
    return (
      <GridItem>
        <Button {...buttonPros} onClick={showMoreClick}>
          <M {...m.showMore} />
        </Button>
      </GridItem>
    );
  };

  const renderFooter = () => (
    <GridItem className={classes.footerText}>
      <M
        {...m.dialogFooter}
        values={{ countValue: paymentIds ? paymentIds.length : 0 }}
      />
      {listChargesHasMore && renderShowMore()}
    </GridItem>
  );

  const handleGoBack = () => history.go(-1);

  const renderBackButton = () => (
    <GridItem>
      <Button size="small" variant="outline" onClick={handleGoBack} dense>
        <H4 dense weight="bold">
          Back
        </H4>
      </Button>
    </GridItem>
  );

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
      spacing={2}
    >
      {isEmpty() && renderBlankSlate()}
      {!isEmpty() && renderContent()}
      {renderFooter()}
      {renderBackButton()}
    </GridContainer>
  );
}

PaymentList.propTypes = {
  id: PropTypes.string,
};

PaymentList.defaultProps = {};

export default compose(resaga())(React.memo(PaymentList));
