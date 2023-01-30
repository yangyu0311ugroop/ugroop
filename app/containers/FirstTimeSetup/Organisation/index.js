/*
 *
 * Organisation
 *
 */

import React, { PureComponent } from 'react';
import resaga, { reducer } from 'resaga';
import { compose } from 'redux';
import H1 from 'components/H1';
import H4 from 'components/H4';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Icon from 'ugcomponents/Icon';
import GridItem from 'components/GridItem';
import Grid from 'components/GridContainer';
import { connect, ReactReduxContext } from 'react-redux';
import { config } from 'persistlayer/config';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage as TEXT, injectIntl } from 'react-intl';
import { createPersistor } from 'redux-persist-immutable';
import injectReducer from 'utils/injectReducer';
import Form, { Button, SelectInput } from 'ugcomponents/Form';
import UGLink from 'components/Link';
import SubmitButton from 'ugcomponents/Buttons/SubmitButton/index';
import {
  selectCurrentUserOrgs,
  selectOrgs,
} from 'datastore/stormPathStore/selectors';
import { SUBSCRIPTION_ENTERPRISE } from 'appConstants';
import { findUnSetupOrg, findOrg } from 'datastore/stormPathStore/helper/index';
import {
  CONFIG,
  GET_ORGTYPES,
  ORGANISATION_SETUP_PAGE,
  ORGANISATION_CUSTOM_REDUCERS,
} from './defines/config';
import styleSheet from '../style';
import m from './defines/messages';
import NewEnterpriseSeatPlan from '../../../smartComponents/Plan/NewEnterpriseSeatPlan';
import { ORG_SYNC, ORGANISATION_API } from '../../../apis/constants';
import HelpOrgTypes from './helpOrgTypes';
import { PlanProvider } from '../../../smartComponents/Plan/context/planProvider';
export const persist = { createPersistor };

export class Organisation extends PureComponent {
  static contextType = ReactReduxContext;

  constructor(props, context) {
    super(props, context);
    this.ref = React.createRef();
    this.text = props.intl.formatMessage;
    this.store = context.store;
    this.state = {
      syncing: true,
      rolling: false,
      creating: false,
      arrOrgTypes: null,
      selectedCountry: 'AUS',
      selectedOrgType: '',
      countryList: [{ name: 'Australia', code: 'AUS' }],
      invalidForm: true,
      showHelp: false,
    };
  }

  componentDidMount = () => {
    this.getOrgTypesThenSetState();
    this.props.handleLoading(true);
  };

  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [GET_ORGTYPES]: {
        onSuccess: this.orgTypesSuccess,
        onError: this.orgTypesFail,
      },
      [ORG_SYNC]: { onSuccess: this.syncSuccess, onError: this.syncFail },
    });

  getOrgTypesThenSetState = () => this.props.resaga.dispatch('', GET_ORGTYPES);

  getSaveButtonText = (creating, syncing, rolling, error) => {
    let saveButton = this.text(m.saveAndContinue);
    if (syncing) {
      saveButton = this.text(m.syncingWithServer);
    } else if (creating) {
      saveButton = this.text(m.settingUpOrganisation);
    } else if (rolling) {
      saveButton = this.text(m.rollingBackData);
    } else if (error) {
      saveButton = this.text(m.tryAgain);
    } else {
      saveButton = this.text(m.saveAndContinue);
    }

    return saveButton;
  };

  toggleHelp = value => () => {
    this.setState({
      showHelp: value,
    });
  };

  generateCountrySelection = () => {
    const { classes } = this.props;
    const { countryList, selectedCountry } = this.state;
    if (countryList) {
      const labelText = this.text(m.selectYourCountry);
      const label = (
        <div className={classes.headers}>
          <H4>{labelText}</H4>
        </div>
      );
      return (
        <SelectInput
          id="selectedCountry"
          name="country"
          label={label}
          options={countryList}
          value={selectedCountry}
          inputText={classes.group}
          inputStyle={classes.selection}
          formStyle={classes.formControl}
          required
        />
      );
    }
    return <div />;
  };

  generateOrgTypeSelection = () => {
    const { classes } = this.props;
    const { arrOrgTypes, selectedOrgType } = this.state;
    if (arrOrgTypes) {
      const labelText = this.text(m.pickYourOrganisationType);
      const label = (
        <div className={classes.headers}>
          <H4>{labelText}</H4>
          <Button
            className={this.props.classes.infoButton}
            onClick={this.toggleHelp(true)}
          >
            <Icon
              icon="lnr-question-circle"
              className={classes.iconCaret}
              size="medium"
            />
          </Button>
        </div>
      );
      const options = [
        { code: '', name: 'Select Organisation Type...' },
        ...arrOrgTypes,
      ];
      return (
        <SelectInput
          id="selectedOrgType"
          name="orgtype"
          label={label}
          options={options}
          value={selectedOrgType}
          inputText={classes.group}
          inputStyle={classes.selection}
          formStyle={classes.formControl}
          displayEmpty
          required
        />
      );
    }
    return <div />;
  };

  generateSubscriptionPlan = () => (
    <NewEnterpriseSeatPlan
      type={SUBSCRIPTION_ENTERPRISE}
      showDurationSwitch
      ref={this.ref}
      isUpgrade
      hideInnerSubmitButton
    />
  );

  searchOrgType = (selectedOrgType, orgTypes) => {
    let org = null;
    orgTypes.forEach(item => {
      if (item.code === selectedOrgType) {
        org = item;
      }
    });
    return org;
  };

  orgTypesSuccess = data => {
    this.props.handleLoading();
    this.setState({ arrOrgTypes: data, syncing: false });
  };

  orgTypesFail = () => {
    this.props.handleLoading();
    this.setState({ error: this.text(m.somethingWentWrong), syncing: false });
  };

  syncSuccess = () => {
    this.setState({ creating: false, syncing: false });
    this.props.handleLoading();
    persist.createPersistor(this.store, config);
  };

  syncFail = () => {
    this.props.handleLoading();
    this.setState({
      creating: false,
      syncing: false,
      error: this.text(m.somethingWentWrong),
    });
  };

  handleSubmit = userOrgs => async formData => {
    if (formData && formData.country) {
      const {
        orgList,
        userId,
        knownAs,
        firstName,
        lastName,
        email,
      } = this.props;
      const userOrg = findUnSetupOrg(userOrgs);
      const org = findOrg(orgList, userOrg.orgId);
      const {
        planId,
        stripeData,
        freePlanId,
        bundlePlanId,
        planFirstPurchase,
      } = await this.ref.current.collectPaymentInfo();
      const selectPlan = stripeData ? planId : freePlanId;
      if (stripeData && stripeData.error) {
        // Do something about the error
        return;
      }
      this.props.handleLoading(true);
      this.setState({ error: '' }, () => {
        const data = {
          country: formData.country,
          type: formData.orgtype,
          subscription: {
            userId,
            name:
              knownAs && knownAs !== '' ? knownAs : `${firstName} ${lastName}`,
            planIds: [selectPlan, bundlePlanId],
            source: stripeData ? stripeData.token.id : null,
            email,
            orgId: org.id,
            orgName: org.name,
            quantity:
              parseInt(planFirstPurchase, 10) > 1
                ? parseInt(planFirstPurchase, 10)
                : 1,
          },
          createdBy: this.props.userId,
        };
        this.props.resaga.dispatchTo(ORGANISATION_API, ORG_SYNC, {
          payload: {
            id: org.id,
            data,
          },
          onSuccess: this.syncSuccess,
          onError: this.syncFail,
        });
      });
    }
  };

  handleValid = () => {
    this.setState({ invalid: '', invalidForm: false });
  };

  handleInvalid = () => {
    this.setState({ invalidForm: true });
  };

  onButtonClick = () => {
    const { invalidForm } = this.state;
    if (invalidForm) {
      this.setState({ invalid: this.text(m.pleaseProvideRequiredInfo) });
    }
  };

  renderHelp = () => (
    <HelpOrgTypes open={this.state.showHelp} onClose={this.toggleHelp(false)} />
  );

  render() {
    const { firstName, userOrgs, orgList, classes, handleLoading } = this.props;
    const userOrg = findUnSetupOrg(userOrgs);
    const org = findOrg(orgList, userOrg.orgId);
    const { creating, syncing, rolling, invalid, error } = this.state;
    const saveButton = this.getSaveButtonText(
      creating,
      syncing,
      rolling,
      error,
    );
    const givenName = <span className={classes.capital}>{firstName}</span>;
    const orgName = <span className={classes.capital}>{org.name}</span>;
    return (
      <div>
        <Helmet
          title={this.text(m.organisation)}
          meta={[
            { name: 'description', content: 'Description of Organisation' },
          ]}
        />
        {this.renderHelp()}
        <PlanProvider>
          <Form
            onValidSubmit={this.handleSubmit(this.props.userOrgs)}
            onValid={this.handleValid}
            onInvalid={this.handleInvalid}
          >
            <Grid>
              <Grid
                justify="space-between"
                direction="row"
                alignItems="center"
                className={classes.container}
              >
                <GridItem xs={11} md={11}>
                  <H1 className={classes.welcome} weight="h1FontSize">
                    <Icon
                      icon="lnr-walk"
                      className={classes.iconWaving}
                      size="large"
                    />
                    <TEXT {...m.okLetsGetStarted} />
                  </H1>
                  <H4>
                    <TEXT
                      {...m.thankYouForYourFirstTimeLogin}
                      values={{ givenName }}
                    />
                  </H4>
                  <H4>
                    <TEXT
                      {...m.pleaseTellUsAboutYourOrganisation}
                      values={{ orgName }}
                    />
                  </H4>
                  {this.generateCountrySelection()}
                  {this.generateOrgTypeSelection()}
                  <p className="text-danger">{invalid}</p>
                  <p className="text-danger">{error}</p>
                </GridItem>
                <GridItem xs={11} md={11}>
                  {this.generateSubscriptionPlan()}
                </GridItem>
              </Grid>
              <div className={classes.orgPersonNavigations}>
                <UGLink to="/admin/setup" className={classes.backButton}>
                  <Button
                    size="medium"
                    onClick={handleLoading}
                    disabled={creating || syncing || rolling}
                  >
                    <TEXT {...m.back} />
                  </Button>
                </UGLink>
                <div className={classes.submitButton}>
                  <SubmitButton
                    type="submit"
                    disabled={creating || syncing || rolling}
                    onClick={this.onButtonClick}
                  >
                    {saveButton}
                  </SubmitButton>
                </div>
              </div>
            </Grid>
          </Form>
        </PlanProvider>
      </div>
    );
  }
}

Organisation.contextTypes = {
  store: PropTypes.object,
};

Organisation.propTypes = {
  userOrgs: PropTypes.array,
  orgList: PropTypes.array,
  resaga: PropTypes.object,
  handleLoading: PropTypes.func,
  classes: PropTypes.object.isRequired,
  intl: PropTypes.shape({ formatMessage: PropTypes.func.isRequired }),
  type: PropTypes.string,
  knownAs: PropTypes.string,
  email: PropTypes.string,
  userId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

Organisation.defaultProps = {
  type: SUBSCRIPTION_ENTERPRISE, // this will match the actual string value from stripe product name
};

const mapState = createStructuredSelector({
  userOrgs: selectCurrentUserOrgs(),
  orgList: selectOrgs(),
});

const withReducer = injectReducer({
  key: ORGANISATION_SETUP_PAGE,
  reducer: reducer(ORGANISATION_SETUP_PAGE, ORGANISATION_CUSTOM_REDUCERS),
});

export default compose(
  connect(
    mapState,
    {},
  ),
  withStyles(styleSheet, { name: 'OrganisationSetup' }),
  withReducer,
  resaga(CONFIG),
)(injectIntl(Organisation));
