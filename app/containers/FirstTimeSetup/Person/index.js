/*
 *
 * Person
 *
 */

import React from 'react';
import resagaHoc, { reducer } from 'resaga';
import { get } from 'lodash';
import { compose } from 'redux';
import H1 from 'components/H1';
import H4 from 'components/H4';
import H5 from 'components/H5';
import classnames from 'classnames';
import Icon from 'ugcomponents/Icon';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import UGLink from 'components/Link';
import Grid from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Form from 'ugcomponents/Form';
import SubmitButton from 'ugcomponents/Buttons/SubmitButton';
import RadioGroup from 'ugcomponents/Inputs/ValidationRadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { Phone } from 'smartComponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { createPersistor } from 'redux-persist-immutable';
import { FormattedMessage as TEXT, injectIntl } from 'react-intl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from 'ugcomponents/Buttons/Button';
import injectReducer from 'utils/injectReducer';
import { parseMetaInfo } from 'utils/avatarUtils';
import IndividualSeatPlan from 'smartComponents/Plan/NewIndividualSeatPlan';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { PERSON_SETUP_PAGE, PERSON_CUSTOM_REDUCERS } from './defines/config';
import m from './defines/messages';
import styleSheet from '../style';
import UGProfilePicture from './ProfilePicture';
import { UPLOAD_PROFILE_COMPONENT } from './ProfilePicture/defines/config';
import { PERSON_SYNC, USER_API } from '../../../apis/constants';
import utils from '../../../routeProtectionV2/helpers/utils';
import { SUBSCRIPTION_INDIVIDUAL } from '../../../appConstants';
import { USER_API_HELPERS } from '../../../apis/components/User/helpers';
import { isEmptyString } from '../../../utils/stringAdditions';
import { PlanProvider } from '../../../smartComponents/Plan/context/planProvider';
import { makeStyles } from '../../../components/material-ui';
import { makeSingleSelect } from '../../../datastore/selectUtility';
import {
  selectAccountAttribute,
  selectAccRelatedOrgs,
  selectCognitoAvatar,
  selectCognitoPersonAttribute,
} from '../../../datastore/stormPathStore/selectors';
import { makeSelectProductIdFilterByName } from '../../../datastore/productDataImmerStore/selectors';
import { makeSelectFreePlanId } from '../../../datastore/planDataImmerStore/selectors';
/* eslint-disable no-param-reassign */

export const persist = { createPersistor };

export const SELECT_GENDER = {
  name: 'gender',
  isValid: () => {},
  options: {
    male: <TEXT {...m.male} />,
    female: <TEXT {...m.female} />,
    other: <TEXT {...m.other} />,
    unknown: <TEXT {...m.preferNotToSay} />,
  },
};
const useStyles = makeStyles(styleSheet);

function Person(props) {
  const text = props.intl.formatMessage;
  const { handleLoading, country, resaga } = props;
  const orgs = useSelector(store =>
    makeSingleSelect(selectAccRelatedOrgs)(store),
  );

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
    makeSingleSelect(selectAccountAttribute)(store, {
      attribute: 'email',
    }),
  );

  const cachedAvatar = useSelector(store =>
    makeSingleSelect(selectCognitoAvatar)(store),
  );

  const productId = useSelector(state =>
    makeSelectProductIdFilterByName(state, {
      name: props.type,
    }),
  );

  const freePlan = useSelector(state =>
    makeSelectFreePlanId(state, {
      id: productId,
      interval: props.interval,
      isChangeDuration: false,
    }),
  );
  const ref = React.createRef();
  const [state, setState] = useImmer({
    creating: false,
    syncing: false,
    rolling: false,
    uploading: false,
    gender: 'unknown',
    receiveAlerts: false,
    hasGenderPhoneSupport: false,
    photoInfo: {},
  });
  const classes = useStyles();

  const getSaveButtonText = (creating, syncing, rolling, uploading, error) => {
    let saveButton = text(m.saveAndContinue);
    if (syncing) {
      saveButton = text(m.syncingWithServer);
    } else if (creating) {
      saveButton = text(m.settingUpPersonDetail);
    } else if (rolling) {
      saveButton = text(m.rollingBackData);
    } else if (uploading) {
      saveButton = text(m.uploadingImage);
    } else if (error) {
      saveButton = text(m.tryAgain);
    } else {
      saveButton = text(m.saveAndContinue);
    }
    return saveButton;
  };

  const getPhotoInfo = () => {
    if (state.photoInfo) {
      return state.photoInfo;
    }
    if (cachedAvatar) {
      return {
        url: cachedAvatar.profilePhotoUrl,
        metaInfo: parseMetaInfo(cachedAvatar.metaInfo),
      };
    }
    return null;
  };

  const syncSuccess = () => {
    handleLoading(false);
    USER_API_HELPERS.fetchMe(
      {},
      {
        resaga,
      },
    );
  };

  const syncFail = error => {
    handleLoading(false);
    setState(draft => {
      draft.creating = false;
      draft.error =
        get(error, 'response.error.message') || text(m.cantConnectToServer);
    });
  };

  const handleOnUploading = uploading => {
    setState(draft => {
      draft.uploading = uploading;
    });
  };

  const handleOnErrorUpload = error => {
    setState(draft => {
      draft.error = error;
    });
  };

  const handleOnSuccessUpload = () => {
    setState(draft => {
      draft.error = '';
    });
  };

  const handleReceiveAlerts = () => {
    const { receiveAlerts, hasGenderPhoneSupport } = state;
    setState(draft => {
      draft.receiveAlerts = !receiveAlerts;
      draft.hasGenderPhoneSupport = !hasGenderPhoneSupport;
    });
  };

  const handleUploadPhoto = data => {
    if (data) {
      const { url, cropRect, scale, rotate } = data;
      if (url) {
        setState(draft => {
          draft.photoInfo = {
            url,
            metaInfo: {
              x: cropRect.x,
              y: cropRect.y,
              width: cropRect.width,
              height: cropRect.height,
              scale,
              rotate,
            },
          };
        });
      }
    }
  };

  const handleSubmit = async formData => {
    let stripeData = null;
    let planId = null;
    let data = null;
    let selectPlan = null;
    if (ref.current) {
      data = await ref.current.collectPaymentInfo();
      console.log('data', data);
      planId = data.planId;
      stripeData = data.stripeData;
      if (stripeData && stripeData.error) {
        // Do something about the error
        console.log(stripeData.error.message);
        return;
      }
      selectPlan = stripeData ? planId : data.freePlanId;
    } else {
      selectPlan = freePlan;
    }

    let photo = null;

    const photoInfo = getPhotoInfo();
    if (photoInfo) {
      const { url, metaInfo: meta } = photoInfo;
      photo = {
        url,
        ...meta,
      };
    }
    const personData = {
      knownAs,
      firstName,
      lastName,
      email,
      userId,
      smsAlertsEnabled: !!formData.txtMobile,
      gender: formData.gender === 'unknown' ? null : formData.gender,
      photo,
    };
    const subscription = {
      userId,
      name: !isEmptyString(knownAs) ? knownAs : `${firstName} ${lastName}`,
      planIds: [selectPlan],
      source: stripeData ? stripeData.token.id : null,
      email,
    };
    setState(draft => {
      draft.error = '';
    });
    handleLoading(true);
    if (state.hasGenderPhoneSupport) {
      if (formData.txtMobile || formData.txtLandline) {
        const mobile = {
          type: 'mobile',
          number: formData.txtMobile,
          isDefault: LOGIC_HELPERS.ifElse(formData.txtLandline, false, true),
        };
        const landline = {
          type: 'landline',
          number: formData.txtLandline,
          isDefault: LOGIC_HELPERS.ifElse(formData.txtMobile, false, true),
        };
        personData.phone = [
          formData.txtMobile ? mobile : null,
          formData.txtLandline ? landline : null,
        ].filter(Boolean);
        setState(draft => {
          draft.creating = true;
        });
        patchPersonSync(userId, { personData, subscription });
      } else {
        handleLoading();
        setState(draft => {
          draft.error = text(m.enterAtLeastOneNumber);
        });
      }
    } else {
      setState(draft => {
        draft.creating = true;
      });
      patchPersonSync(userId, { personData, subscription });
    }
  };

  const patchPersonSync = (id, data) => {
    resaga.dispatchTo(USER_API, PERSON_SYNC, {
      payload: {
        id,
        data,
      },
      onSuccess: syncSuccess,
      onError: syncFail,
    });
  };

  const generatePhoneInputs = receiveAlerts => {
    const orgCountry = LOGIC_HELPERS.ifElse(country === 'AUS', 'AU', country);

    if (receiveAlerts) {
      return (
        <FormGroup>
          <div className={classes.headers}>
            <H4>
              <TEXT {...m.ifYesPleaseEnterMobile} />
            </H4>
          </div>
          <Phone
            name="txtMobile"
            placeholder="Mobile Number"
            country={orgCountry}
          />
          <div className={classes.headers}>
            <H4>
              <TEXT {...m.doYouHaveALandline} />
            </H4>
          </div>
          <Phone
            name="txtLandline"
            placeholder="Landline Number"
            country={orgCountry}
          />
        </FormGroup>
      );
    }
    return <div />;
  };

  const generatePersonalSubscription = () => {
    if (Array.isArray(orgs) && orgs.length === 0) {
      // Person setup

      return (
        <IndividualSeatPlan
          type={SUBSCRIPTION_INDIVIDUAL}
          ref={ref}
          isUpgrade
          hideInnerSubmitButton
          showDurationSwitch
        />
      );
    }
    // if already has org setup then skip personal subscription
    if (utils.hasOrgSetup(orgs)) {
      return <GridItem />;
    }
    return <GridItem />;
  };

  const { creating, syncing, rolling, uploading, error, receiveAlerts } = state;

  const saveButton = getSaveButtonText(
    creating,
    syncing,
    rolling,
    uploading,
    error,
  );
  const radioLabel = (
    <div className={classes.headers}>
      <H4>
        <TEXT {...m.whatIsYourGender} />
      </H4>
    </div>
  );
  return (
    <PlanProvider>
      <div>
        <Helmet
          title={text(m.person)}
          meta={[{ name: 'description', content: 'Description of Person' }]}
        />
        <Form onValidSubmit={handleSubmit}>
          <Grid>
            <Grid
              justify="center"
              direction="row-reverse"
              alignItems="flex-start"
              className={classnames(classes.container, classes.personContainer)}
            >
              <GridItem xs={12}>
                <H1 className={classes.welcome} weight="h1FontSize">
                  <Icon
                    icon="lnr-users-plus"
                    className={classes.iconWaving}
                    size="large"
                  />
                  <TEXT {...m.tellUsAboutYourself} />
                </H1>
                <FormGroup>
                  <H4>
                    <TEXT {...m.pleaseUploadProfilePic} />
                    &nbsp;{' '}
                    <span role="img" aria-label="smiley">
                      🙂
                    </span>
                  </H4>
                </FormGroup>
              </GridItem>
              <GridItem xs={11} md={3} className={classes.profilePicGrid}>
                <FormGroup>
                  <H4 className={classes.profilePic}>Profile Picture</H4>
                  <UGProfilePicture
                    onUploading={handleOnUploading}
                    onErrorUpload={handleOnErrorUpload}
                    onSuccessUpload={handleOnSuccessUpload}
                    handleUploadPhoto={handleUploadPhoto}
                  />
                </FormGroup>
              </GridItem>
              <GridItem className={classes.genderPhoneGrid} xs={11} md={9}>
                <FormGroup>
                  <RadioGroup
                    label={radioLabel}
                    value={state.gender}
                    className={classes.radioGroup}
                    styleLabel={classes.radioButton}
                    {...SELECT_GENDER}
                    noMargin
                    radioClass={classes.radioClass}
                  />
                </FormGroup>
                <FormGroup>
                  <div className={classes.receiveAlerts}>
                    <Checkbox
                      checked={receiveAlerts}
                      onChange={handleReceiveAlerts}
                      value="receiveAlerts"
                      classes={{ checked: classes.checkbox }}
                    />
                    <H5>
                      <TEXT {...m.wouldYouLikeToReceiveAlerts} />
                    </H5>
                  </div>
                  {generatePhoneInputs(receiveAlerts)}
                  {generatePersonalSubscription()}
                </FormGroup>
                <div className="text-danger">
                  <em>{error}</em>
                </div>
              </GridItem>
            </Grid>
            <div className={classes.orgPersonNavigations}>
              <UGLink to="/admin/setup" className={classes.backButton}>
                <Button
                  size="medium"
                  onClick={handleLoading}
                  disabled={creating || syncing || rolling || uploading}
                >
                  <TEXT {...m.back} />
                </Button>
              </UGLink>
              <div className={classes.submitButton}>
                <SubmitButton
                  type="submit"
                  disabled={creating || syncing || rolling || uploading}
                >
                  {saveButton}
                </SubmitButton>
              </div>
            </div>
          </Grid>
        </Form>
      </div>
    </PlanProvider>
  );
}

Person.contextTypes = {
  store: PropTypes.object,
};

Person.propTypes = {
  cachedAvatar: PropTypes.object,
  resaga: PropTypes.object,
  handleLoading: PropTypes.func,
  intl: PropTypes.shape({ formatMessage: PropTypes.func.isRequired }),
  role: PropTypes.string,
  country: PropTypes.string,
  name: PropTypes.string,
  orgId: PropTypes.number,
  fetching: PropTypes.bool,
  type: PropTypes.string,
  interval: PropTypes.string,
};

Person.defaultProps = {
  name: '',
  orgId: 0,
  country: '',
  role: 'admin',
  fetching: true,
};

const withReducer = injectReducer({
  key: PERSON_SETUP_PAGE,
  reducer: reducer(PERSON_SETUP_PAGE, PERSON_CUSTOM_REDUCERS),
});
const withUploadReducer = injectReducer({
  key: UPLOAD_PROFILE_COMPONENT,
  reducer: reducer(UPLOAD_PROFILE_COMPONENT),
});

export default compose(
  withReducer,
  withUploadReducer,
  resagaHoc(),
)(injectIntl(Person));
