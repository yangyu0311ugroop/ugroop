import {
  CREATE_ORGANISATION,
  CREATE_SUBSCRIPTION_FIRSTTIME,
  ORGANISATION_API,
  SUBSCRIPTION_API,
} from 'apis/constants';
import { URL_HELPERS, DO_NOTHING, SUBSCRIPTION_ENTERPRISE } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { makeStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Collapse } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import resagaHOC from 'resaga';
import Type from 'smartComponents/Organisation/parts/Type';
import Form, { Button, TextField } from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import Stepper from 'ugcomponents/Stepper';
import StepLabel from 'ugcomponents/Stepper/StepLabel';
import Step from 'ugcomponents/Stepper/Step';
import NewEnterpriseSeatPlan from 'smartComponents/Plan/NewEnterpriseSeatPlan';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { CONFIG } from './config';
import styles from './styles';
import HelpOrgTypes from '../../../FirstTimeSetup/Organisation/helpOrgTypes';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import {
  selectAccountAttribute,
  selectCognitoPersonAttribute,
} from '../../../../datastore/stormPathStore/selectors';
/* eslint-disable no-param-reassign */

export const ORG_NAME = {
  id: 'name',
  name: 'name',
  label: 'Organisation Name',
  type: 'text',
  validations: {
    minLength: 3,
  },
  validationErrors: {
    minLength: 'too short',
  },
  required: true,
};

export const makeOrganisationPayload = ({
  address,
  placeId,
  ...organisation
}) => ({
  data: { ...organisation, location: { address, placeId } },
});
const useStyles = makeStyles(styles);
function CreateOrganisation(props) {
  const [state, setState] = useImmer({
    error: '',
    activeStep: 0,
    orgId: 0,
    orgName: '',
  });
  const classes = useStyles();
  const { children, dispatchState, placeId, resaga } = props;
  const userId = useSelector(store =>
    makeSingleSelect(selectAccountAttribute)(store, {
      attribute: 'id',
    }),
  );
  const knownAs = useSelector(store =>
    makeSingleSelect(selectCognitoPersonAttribute)(store, {
      attribute: 'knownAs',
    }),
  );
  const firstName = useSelector(store =>
    makeSingleSelect(selectCognitoPersonAttribute)(store, {
      attribute: 'firstName',
    }),
  );

  const lastName = useSelector(store =>
    makeSingleSelect(selectCognitoPersonAttribute)(store, {
      attribute: 'lastName',
    }),
  );

  const email = useSelector(store =>
    makeSingleSelect(selectCognitoPersonAttribute)(store, {
      attribute: 'email',
    }),
  );
  const ref = React.createRef();
  const history = useHistory();
  const goToOrganisationPage = ({ id }) =>
    history.push(URL_HELPERS.orgIndex(id));

  const onCreateSubscriptionSuccess = () => {
    goToOrganisationPage({ id: state.orgId });
  };

  const onCreateSubscriptionFail = data => {
    if (data.response) {
      const error = data.response.error.message;
      const e = error.replace(
        'BillingSvcContract.Command.Customers.ICreateCustomer request faulted: ',
        '',
      );
      dispatchState.setStripeError(e);
    }
  };

  const toggleHelp = value => () => {
    setState(draft => {
      draft.showHelp = value;
    });
  };

  const submitSubscription = async () => {
    const data = await ref.current.collectPaymentInfo();
    const {
      planId,
      stripeData,
      freePlanId,
      planFirstPurchase,
      bundlePlanId,
    } = data;
    const selectPlan = stripeData ? planId : freePlanId;
    if (stripeData && stripeData.error) {
      // Do something about the error
      return;
    }
    const quantity = planFirstPurchase;

    const subscription = {
      userId,
      name: knownAs && knownAs !== '' ? knownAs : `${firstName} ${lastName}`,
      planIds: [selectPlan, bundlePlanId],
      source: stripeData ? stripeData.token.id : null,
      email,
      orgId: state.orgId,
      orgName: state.orgName,
      quantity: parseInt(quantity, 10) > 1 ? parseInt(quantity, 10) : 1,
    };
    resaga.dispatchTo(SUBSCRIPTION_API, CREATE_SUBSCRIPTION_FIRSTTIME, {
      payload: subscription,
      onSuccess: onCreateSubscriptionSuccess,
      onError: onCreateSubscriptionFail,
    });
  };

  const createNewOrganisation = formData => {
    resaga.dispatchTo(ORGANISATION_API, CREATE_ORGANISATION, {
      payload: makeOrganisationPayload({
        ...formData,
        placeId,
      }),
      onSuccess: result => {
        setState(draft => {
          draft.activeStep = 1;
          draft.orgId = result.id;
          draft.orgName = result.name;
        });
      },
    });
  };

  const handleValid = () => {
    setState(draft => {
      draft.error = '';
    });
  };

  const handleInvalidSubmit = data => {
    if (!data.type) {
      return setState(draft => {
        draft.error = 'Organisation type is required.';
      });
    }

    return DO_NOTHING;
  };

  const getSteps = () => [
    'Create an organisation ',
    'Select your Subscription Plan',
  ];

  const getContent = (activeStep, error) => {
    if (activeStep === 0) {
      return getCreateOrgPage(error);
    }
    return generateSubscriptionPlan();
  };

  const generateSubscriptionPlan = () => (
    <NewEnterpriseSeatPlan
      ref={ref}
      type={SUBSCRIPTION_ENTERPRISE}
      onSubmit={submitSubscription}
      isUpgrade
      showDurationSwitch
    />
  );

  const getCreateOrgSteps = () => {
    const steps = getSteps();
    return (
      <Stepper activeStep={state.activeStep} alternativeLabel>
        {steps.map(label => {
          const stepProps = {};
          const labelProps = {
            className: classes.stepLabel,
          };
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  };

  const getCreateOrgPage = error => (
    <Form
      onValid={handleValid}
      onValidSubmit={createNewOrganisation}
      onInvalidSubmit={handleInvalidSubmit}
    >
      <GridContainer direction="column">
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <b>
                Please tell us some information about your organisation/company
              </b>
            </GridItem>
            <GridItem>
              <GridContainer spacing={0} alignItems="center" justify="center">
                <GridItem md={11} xs={11}>
                  <Type variant="textField" type="Business" />
                </GridItem>
                <GridItem md={1} xs={1}>
                  <Button
                    className={classes.infoButton}
                    onClick={toggleHelp(true)}
                    data-testid="orgType-InfoButton"
                  >
                    <Icon
                      icon="lnr-question-circle"
                      className={classes.iconCaret}
                      size="medium"
                    />
                  </Button>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <Collapse in={!!error}>
          <GridItem
            className={classnames(
              error ? classes.error : classes.good,
              classes.errorPadding,
            )}
            data-testid="helperGridItem"
          >
            {error || 'All good!'}
          </GridItem>
        </Collapse>
        <GridItem>
          <TextField {...ORG_NAME} />
        </GridItem>
        <GridItem>{children}</GridItem>
        <GridItem>
          <Button
            type="submit"
            color="green"
            noMargin
            loading={state.loading}
            data-testid="createOrgButton"
          >
            Create organisation
          </Button>
        </GridItem>
      </GridContainer>
    </Form>
  );

  const renderHelp = () => (
    <HelpOrgTypes open={state.showHelp} onClose={toggleHelp(false)} />
  );

  const error = state.error;
  return (
    <>
      {renderHelp()}
      <GridContainer justify="center" alignItems="center">
        <GridItem>
          <GridContainer
            card
            highlight
            dense
            direction="column"
            cardClassName={classnames(classes.card)}
          >
            <GridItem>
              <div className={classes.icons}>
                <GridContainer direction="column">
                  <GridItem>
                    <GridContainer
                      alignItems="center"
                      justify="center"
                      spacing={2}
                    >
                      <GridItem>
                        <Icon
                          darkMode
                          size="extraMedium"
                          color="success"
                          icon="lnr-document"
                        />
                      </GridItem>
                      <GridItem>
                        <Icon
                          darkMode
                          size="extraMedium"
                          color="lavender"
                          icon="lnr-group-work"
                        />
                      </GridItem>
                      <GridItem>
                        <Icon
                          darkMode
                          size="extraMedium"
                          color="yellow"
                          icon="lnr-bubbles"
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem>
                    Create an organisation to host your tours, invite your team
                    and start collaborating
                  </GridItem>
                </GridContainer>
              </div>
            </GridItem>
            <GridItem>{getCreateOrgSteps()}</GridItem>
            <GridItem>{getContent(state.activeStep, error)}</GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </>
  );
}

CreateOrganisation.propTypes = {
  resaga: PropTypes.object,
  placeId: PropTypes.string,
  children: PropTypes.node,
  dispatchState: PropTypes.any,
};

CreateOrganisation.defaultProps = {};

export default compose(resagaHOC(CONFIG))(React.memo(CreateOrganisation));
