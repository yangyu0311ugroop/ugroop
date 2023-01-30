import {
  CREATE_ORG_USER,
  USER_API,
  CREATE_USER_VIA_INVITE,
  CREATE_PERSONAL_REGISTRATION,
} from 'apis/constants';
import classnames from 'classnames';
import H1 from 'components/H1';
import H4 from 'components/H4';
import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import Role from 'smartComponents/InvitationNotification/types/JoinOrganisation/parts/Role';
import { H5 } from 'viewComponents/Typography';
import GridContainer from 'components/GridContainer';
import { FormControlLabel } from '@material-ui/core';
import IconButton from 'ugcomponents/Buttons/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { parse } from 'qs';
import React from 'react';
import BlockUi from 'react-block-ui';
import { FormattedMessage as M } from 'react-intl';
import { withRouter } from 'react-router-dom';
import UGLink from 'components/Link';
import { compose } from 'redux';
import resaga from 'resaga';
import Form, { Button, SectionHeader, TextField } from 'ugcomponents/Form';
import Location from 'ugcomponents/Inputs/Location';
import Icon from 'ugcomponents/Icon';
import {
  HIDE_DELAY,
  SHOW_LONG_DELAY,
} from 'ugcomponents/Layout/AuthLayout/constants';
import RadioGroup from 'ugcomponents/Inputs/ValidationRadioGroup';
import { isNonContributor } from 'datastore/userStore/helpers';
import GridItem from 'components/GridItem/index';
import { REGISTRATION_OPTIONS, REGISTRATION_TYPE_DEFAULT } from 'appConstants';
import { get } from 'lodash';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  ORG_NAME,
  PASSWORD,
} from './defines/registerInputs';
import { HTTP_STATUS_CODE } from '../../../utils/http-constant';
import { CONFIG } from './defines/config';
import m from './defines/messages';
import {
  EMAIL_DUPLICATED,
  EMAIL_EXISTS,
  EMAIL_EXISTS_ERROR,
  EMAIL_INVALID,
  EMAIL_INVALID_ERROR,
  INVITATION_TOKEN_NOT_FOUND,
  ORG_NAME_EXISTS,
  ORG_NAME_EXISTS_ERROR,
  COGNITO_EXISTS,
  PERSON_SERVICE_ERROR,
  OTHER_ERROR,
} from './defines/serverErrors';
import {
  INVALID_BUTTON,
  REQUIRED_BUTTON,
  SENDING_BUTTON,
  VALID_BUTTON,
} from './defines/submitButton';
import style from './style';

export class RegisterForm extends React.PureComponent {
  state = {
    button: REQUIRED_BUTTON,
    showPassword: false,
    hasPassword: false,
    form: false,
    email: '',
    countryShort: '',
    countryLong: '',
    optionError: false,
    registrationType: null,
  };

  componentWillMount = () => {
    const { location } = this.props;

    // query /registration?email=abc@xyz.com
    const query = parse(location.search.substr(1));
    if (query && query.email) {
      this.setState({ email: query.email });
    }
  };

  componentDidMount = () => {
    const {
      config,
      size,
      title,
      classes,
      isRegisterByOrgInvitation,
    } = this.props;

    config({
      size,
      title: isRegisterByOrgInvitation ? 'Join an Organisation' : title,
      tinting: true,
    });
    this.formTimeout = setTimeout(() => {
      this.setState({ form: true });
    }, SHOW_LONG_DELAY);

    // TODO: changing background is heavy work and currently cause flickering, not changing background for now
    // setTimeout(() => config({ background }), SHOW_LONG_DELAY);

    this.sidebarTimeout = setTimeout(() => {
      config({
        sidebar: (
          <div className={classes.sidebar}>
            <H4>
              <M {...m.registrationSidebarHeading} />
            </H4>
            <H1>
              <M {...m.planTogether} />
            </H1>
            <hr />
          </div>
        ),
      });
    }, SHOW_LONG_DELAY * 2);
  };

  componentWillUnmount = () => {
    clearTimeout(this.formTimeout);
    clearTimeout(this.sidebarTimeout);
    clearTimeout(this.loginTimeout);
  };

  isRegisterByInvitation = () => {
    const {
      isRegisterByOrgInvitation,
      isRegisterByTourInvitation,
    } = this.props;
    return isRegisterByOrgInvitation || isRegisterByTourInvitation;
  };

  handleLocationChange = key => value => {
    if (key === 'countryShort') {
      this.setState({
        countryShort: value,
      });
    } else if (key === 'countryLong') {
      this.setState({
        countryLong: value,
      });
    }
  };

  // region Request CallBack
  registerSuccess = (result, payload) => {
    const {
      password, // eslint-disable-line no-unused-vars
      ...data
    } = payload;

    this.props.registerSuccess({
      isRegisterByInvitation: this.isRegisterByInvitation(), // to be used to render different success message
      ...data,
    });
  };

  registerError = ({ error, msg }) => {
    if (this.isRegisterByInvitation() && msg.indexOf(EMAIL_EXISTS) !== -1) {
      this.setState({ existError: 'You have already registered.' });
    } else if (
      get(error, 'status', '') === HTTP_STATUS_CODE.STATUS_RESOURCE_NOT_FOUND
    ) {
      this.setState({ existError: INVITATION_TOKEN_NOT_FOUND });
    } else {
      this.setState({
        existError: OTHER_ERROR,
      });
    }
    if (!this.isRegisterByInvitation()) {
      this.invalidateForm(msg);
    }
  };
  // endregion

  // region Request API Call
  registerViaInvite = formData => {
    const { shareTo, token } = this.props;
    const data = {
      user: {
        email: shareTo,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
      },
      org: { orgInvitationToken: token },
    };

    this.props.resaga.dispatchTo(USER_API, CREATE_USER_VIA_INVITE, {
      payload: data,
      onSuccess: this.registerSuccess,
      onError: this.registerError,
    });
  };

  userRegister = data => {
    const { countryLong, countryShort } = this.state;
    const { token: tourInvitationToken } = this.props;
    let payload = LOGIC_HELPERS.ifElse(!tourInvitationToken, data, {
      ...data,
      tourInvitationToken,
    });

    if (countryLong && countryShort) {
      payload = {
        countryLong,
        countryShort,
        ...payload,
      };
    }

    this.props.resaga.dispatchTo(USER_API, CREATE_ORG_USER, {
      payload,
      onSuccess: this.registerSuccess,
      onError: this.registerError,
    });
  };

  registerPersonal = formData => {
    const { shareTo, token: tourInvitationToken } = this.props;
    const data = {
      email: formData.email || shareTo,
      givenName: formData.firstName,
      surname: formData.lastName,
      password: formData.password,
      personal: true,
    };

    this.props.resaga.dispatchTo(USER_API, CREATE_PERSONAL_REGISTRATION, {
      payload: LOGIC_HELPERS.ifElse(!tourInvitationToken, data, {
        ...data,
        tourInvitationToken,
      }),
      onSuccess: this.registerSuccess,
      onError: this.registerError,
    });
  };

  // endregion

  enableButton = () =>
    this.setState({ button: VALID_BUTTON, errors: false, optionError: false });

  disableButton = () => this.setState({ button: REQUIRED_BUTTON });

  invalidateButton = () => this.setState({ button: INVALID_BUTTON });

  handleClickSubmit = () => this.registerForm.submit();

  invalidateForm = errors => {
    this.setState({ errors });
    this.invalidateButton();
    if (
      errors.indexOf(EMAIL_EXISTS) !== -1 ||
      errors.indexOf(EMAIL_DUPLICATED) !== -1 ||
      errors.indexOf(COGNITO_EXISTS) !== -1
    ) {
      this.registerForm.updateInputsWithError({ email: EMAIL_EXISTS_ERROR });
    } else if (errors.indexOf(PERSON_SERVICE_ERROR) !== -1) {
      this.registerForm.updateInputsWithError({ email: PERSON_SERVICE_ERROR });
    } else if (errors.indexOf(EMAIL_INVALID) !== -1) {
      this.registerForm.updateInputsWithError({ email: EMAIL_INVALID_ERROR });
    } else if (errors.indexOf(ORG_NAME_EXISTS) !== -1) {
      this.registerForm.updateInputsWithError({
        orgName: ORG_NAME_EXISTS_ERROR,
      });
    } else {
      this.registerForm.updateInputsWithError({
        email: OTHER_ERROR,
      });
    }
  };

  handleSubmit = data => {
    const { token, shareTo, isRegisterByOrgInvitation, role } = this.props;
    this.setState({ button: SENDING_BUTTON });
    if (isRegisterByOrgInvitation && token) {
      this.registerViaInvite(data);
    } else if (
      this.state.registrationType !== REGISTRATION_TYPE_DEFAULT ||
      this.checkIfContributor(role)
    ) {
      this.registerPersonal(data);
    } else {
      const payload = {
        ...data,
        email: data.email || shareTo,
      };

      this.userRegister(payload);
    }
  };

  onSubmit = () => {
    const { registrationType } = this.state;
    this.setState({ optionError: !registrationType });
  };

  handleShowPassword = () =>
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));

  handlePassword = (value = '') =>
    this.setState({ hasPassword: !!value.length });

  loginPath = () => {
    const { shareTo } = this.props;

    if (shareTo) {
      return `/login?email=${encodeURIComponent(shareTo)}`;
    }

    return '/login';
  };

  goToLogin = () => {
    this.setState({ form: false });
    this.props.config({ sidebar: '' });
    const browserHistory = this.props.history;
    this.loginTimeout = setTimeout(
      () => browserHistory.push(this.loginPath()),
      HIDE_DELAY,
    );
  };

  handleCaptchaRef = r => {
    this.captcha = r;
  };

  handleCaptchaChange = () => this.handleClickSubmit();

  handleRegisterFormRef = r => {
    this.registerForm = r ? r.form : null;
  };

  handleOrgOptionChange = type => {
    this.setState({ registrationType: type, optionError: false });
  };

  checkIfContributor = role => isNonContributor(role);

  isTransfer = () => !!this.props.transferTo;

  renderJoinTour = () => {
    const {
      classes,
      shareTo,
      senderName,
      senderEmail,
      organisationName,
      roleName,
      nodeContent,
    } = this.props;

    const invitee = <b>{shareTo}</b>;
    const org = <b>{organisationName}</b>;
    const tour = <b>{nodeContent}</b>;
    const role = roleName;
    const sender = (
      <a href={`mailto:${senderEmail}`}>
        <b>{senderName}</b>
      </a>
    );
    const senderLight = <a href={`mailto:${senderEmail}`}>{senderName}</a>;

    return (
      <div className={classes.info}>
        <H5 className={classes.lineHeight}>
          {role === TOUR_ROLES.tour_interested ? (
            <React.Fragment>
              <M {...m.inviteFollowerSender} values={{ sender }} />
              <M {...m.inviteFollower} values={{ org, tour }} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <M {...m.tourInvitationSender} values={{ sender, org }} />
              {this.isTransfer() && (
                <M {...m.inviteYouToOwnTour} values={{ tour, role }} />
              )}
              {!this.isTransfer() && (
                <M {...m.inviteYouToJoinTour} values={{ tour, role }} />
              )}
            </React.Fragment>
          )}
        </H5>
        <H5 className={classes.space}>
          <M {...m.invitationInfoTour} />
        </H5>
        <H5>
          <M {...m.loginAs} />
        </H5>
        <H5 dense textAlign="center">
          {invitee}
        </H5>
        <H5 className={classes.space} fontStyle="italic">
          <M {...m.loginAsWarning} values={{ sender: senderLight }} />
        </H5>
      </div>
    );
  };

  renderJoinOrg = () => {
    const {
      classes,
      role: roleName,
      shareTo,
      senderName,
      senderEmail,
      organisationName,
    } = this.props;

    const invitee = <b>{shareTo}</b>;
    const org = <b>{organisationName}</b>;
    const role = <Role role={roleName} article />;
    const sender = (
      <a href={`mailto:${senderEmail}`}>
        <b>{senderName}</b>
      </a>
    );
    const senderLight = <a href={`mailto:${senderEmail}`}>{senderName}</a>;

    return (
      <div className={classes.info}>
        <H5 className={classes.lineHeight}>
          <M {...m.inviteYouToJoinOrg} values={{ sender, role, org }} />
        </H5>
        <H5>
          <M {...m.loginAs} />
        </H5>
        <H5 dense textAlign="center">
          {invitee}
        </H5>
        <H5 className={classes.space} fontStyle="italic">
          <M {...m.loginAsWarning} values={{ sender: senderLight }} />
        </H5>
      </div>
    );
  };

  renderError = () => {
    const { classes } = this.props;
    const { existError } = this.state;

    return (
      <div className={classes.errors}>
        {existError}
        <br />
        <UGLink to={this.loginPath()} tabIndex={-1}>
          <M {...m.goToLoginQuestion} />
        </UGLink>
      </div>
    );
  };

  renderInformation = () => {
    const { isRegisterByOrgInvitation } = this.props;
    const { existError } = this.state;

    if (!this.isRegisterByInvitation()) {
      return null;
    }

    if (existError) {
      return this.renderError();
    }

    if (isRegisterByOrgInvitation) {
      return this.renderJoinOrg();
    }

    return this.renderJoinTour();
  };

  renderShowPassword = ({ value }) => {
    const { classes } = this.props;
    const { showPassword } = this.state;

    return (
      <React.Fragment>
        {value && (
          <IconButton
            tooltip={showPassword ? 'Hide Password' : 'Show Password'}
            onClick={this.handleShowPassword}
            className={classnames(classes.endAdornmentBtn)}
          >
            <Icon
              size="normal"
              icon={showPassword ? 'eye-crossed' : 'eye'}
              className={classes.endAdornmentIcon}
            />
          </IconButton>
        )}
      </React.Fragment>
    );
  };

  renderHasPassword = () => {
    const { showPassword } = this.state;
    const { classes } = this.props;

    return (
      <GridContainer alignItems="flex-end">
        <FormControlLabel
          control={
            <Switch
              tabIndex={-1}
              checked={showPassword}
              onChange={this.handleShowPassword}
            />
          }
          className={classes.fontWeightLight}
          label="show password"
        />
        <Icon
          icon="lnr-chevron-down-circle"
          className={classes.iconCaret}
          size="medium"
          color="gray"
        />
      </GridContainer>
    );
  };

  renderHasNoPassword = () => {
    const { classes } = this.props;

    return (
      <GridContainer alignItems="flex-end">
        <Icon
          icon="lnr-chevron-down-circle"
          className={classes.iconCaret}
          size="medium"
          color="gray"
        />
      </GridContainer>
    );
  };

  renderShareTo = () => {
    const { classes, isLoading } = this.props;
    const { email } = this.state;
    return (
      <React.Fragment>
        <SectionHeader
          actions={
            <Icon
              icon="lnr-chevron-down-circle"
              className={classes.iconCaret}
              size="medium"
              color="gray"
            />
          }
        >
          <M {...m.registrationEnterEmail} />
        </SectionHeader>
        <TextField
          {...EMAIL}
          value={email}
          disabled={!!email || isLoading}
          InputProps={{
            className: classes.inputWithAdornment,
            startAdornment: (
              <Icon size="normal" icon="user" className={classes.icon} />
            ),
          }}
        />
      </React.Fragment>
    );
  };

  renderInviteToOrganisation = () => {
    const { classes, isLoading } = this.props;
    if (this.state.registrationType !== REGISTRATION_TYPE_DEFAULT) return '';
    return (
      <React.Fragment>
        <SectionHeader
          actions={
            <Icon
              icon="lnr-chevron-down-circle"
              className={classes.iconCaret}
              size="medium"
              color="gray"
            />
          }
          noWrap
        >
          <M {...m.aboutOrganisation} />
        </SectionHeader>
        <TextField {...ORG_NAME} disabled={isLoading} />
        <Location
          editing
          locationKey="orgAddress"
          locationLabel={<M {...m.siteAddressLabel} />}
          handleChange={this.handleLocationChange}
        />
      </React.Fragment>
    );
  };

  renderRegisterButtonDiv = () => {
    const { classes, isLoading } = this.props;
    const { button, errors } = this.state;

    const isLoadingOrErrors = isLoading || !!errors;
    const buttonType = isLoadingOrErrors ? 'button' : 'submit';

    const privacy = (
      <UGLink to="/privacy" target="_blank">
        <M {...m.privacy} />
      </UGLink>
    );
    const tos = (
      <UGLink to="/terms-of-service" target="_blank">
        <M {...m.tos} />
      </UGLink>
    );

    return (
      <div className={classes.registerContainer}>
        <H5>
          <M {...m.bySigninUp} values={{ privacy, tos }} />
        </H5>
        <Button
          className={classes.btn}
          type={buttonType}
          loading={isLoadingOrErrors}
          color="blue"
          block
        >
          {button.text}
        </Button>
      </div>
    );
  };

  renderNameTextFields = () => {
    const { isLoading } = this.props;
    return (
      <div>
        <TextField {...FIRST_NAME} autoFocus disabled={isLoading} />
        <TextField {...LAST_NAME} disabled={isLoading} />
      </div>
    );
  };

  renderOrgOption = () => {
    const { classes, role } = this.props;
    const { optionError } = this.state;
    if (this.checkIfContributor(role)) return '';

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <RadioGroup
            name="ORGANISATION_OPTION"
            value={this.state.registrationType}
            options={REGISTRATION_OPTIONS}
            label={
              <H5
                className={classnames(
                  classes.labelHeight,
                  optionError && classes.overrideColor,
                )}
              >
                <M {...m.registrationTypeLabel} />{' '}
              </H5>
            }
            noMargin
            className={this.props.classes.radioGroup}
            formLabelClassName={this.props.classes.formLabel}
            onChange={this.handleOrgOptionChange}
            radioClass={this.props.classes.radioClass}
            required
            formError={optionError}
            showIndicator={false}
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderForm = () => {
    const {
      classes,
      shareTo,
      isRegisterByOrgInvitation,
      isLoading,
      role,
    } = this.props;

    const { showPassword, hasPassword } = this.state;

    const showPasswordButton = hasPassword
      ? {
          actions: this.renderHasPassword(),
        }
      : {
          actions: this.renderHasNoPassword(),
        };

    return (
      <Form
        ref={this.handleRegisterFormRef}
        onValidSubmit={this.handleSubmit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onSubmit={this.onSubmit}
      >
        <SectionHeader
          first
          actions={
            <Icon
              icon="lnr-chevron-down-circle"
              className={classes.iconCaret}
              size="medium"
              color="gray"
            />
          }
        >
          {' '}
          <M {...m.registrationAskName} />{' '}
        </SectionHeader>
        {this.renderNameTextFields()}

        {!shareTo && this.renderShareTo()}

        <SectionHeader {...showPasswordButton}>
          <M {...m.registrationEnterPassword} />
        </SectionHeader>
        <TextField
          {...PASSWORD}
          type={showPassword ? 'text' : 'password'}
          onChange={this.handlePassword}
          disabled={isLoading}
          InputProps={{
            className: classes.inputWithAdornment,
            startAdornment: (
              <Icon size="normal" icon="key" className={classes.icon} />
            ),
          }}
        />
        {!isRegisterByOrgInvitation && this.renderOrgOption()}
        {!isRegisterByOrgInvitation &&
          !this.checkIfContributor(role) &&
          this.renderInviteToOrganisation()}
        {this.renderRegisterButtonDiv()}
      </Form>
    );
  };

  renderGoToLoginButton = () => {
    const { classes } = this.props;
    const login = (
      <UGLink to={this.loginPath()}>
        <M {...m.goToLogin} />
      </UGLink>
    );
    return (
      <H5 className={classes.goToLoginContainer}>
        <M {...m.alreadyRegister} values={{ login }} />
      </H5>
    );
  };

  render() {
    const { classes, isLoading } = this.props;
    const { form } = this.state;
    return (
      <div>
        <BlockUi
          tag="div"
          blocking={isLoading}
          className={classnames(
            classes.form,
            form ? classes.fadeIn : classes.fadeOut,
          )}
        >
          {this.renderInformation()}
          {this.renderForm()}
          {this.renderGoToLoginButton()}
        </BlockUi>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  config: PropTypes.func,
  registerSuccess: PropTypes.func,
  size: PropTypes.number,
  title: PropTypes.node,
  location: PropTypes.any,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,

  // notification info, all optional
  shareTo: PropTypes.string,
  token: PropTypes.string,
  senderName: PropTypes.string,
  senderEmail: PropTypes.string,
  organisationName: PropTypes.string,
  nodeContent: PropTypes.string,
  roleName: PropTypes.string,
  isRegisterByTourInvitation: PropTypes.bool,
  isRegisterByOrgInvitation: PropTypes.bool,
  role: PropTypes.string,
  transferTo: PropTypes.string,
};

RegisterForm.defaultProps = {
  size: 7,
  title: 'Register an account',
  location: { search: '' },

  shareTo: '',
  token: null,
  senderName: '',
  senderEmail: '',
  organisationName: '',
  nodeContent: '',
  roleName: '',
  isRegisterByTourInvitation: false,
  isRegisterByOrgInvitation: false,
  role: '',
  transferTo: '',
};

export default compose(
  withRouter,
  withStyles(style, { name: 'RegisterForm' }),
  resaga(CONFIG),
)(RegisterForm);
