import { URL_HELPERS } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
/**
 * Created by quando on 21/3/17.
 * LoginPage
 *
 */
import Icon from 'ugcomponents/Icon';
import H5 from 'components/H5';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { parse } from 'qs';
import React from 'react';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';
import { FormattedMessage as M } from 'react-intl';
import { Motion, presets, spring } from 'react-motion';
import { withRouter } from 'react-router-dom';
import UGLink from 'components/Link';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { toLowerCaseIfString } from 'utils/stringAdditions';
import { userLogin } from 'datastore/stormPathStore/actions';
import Form, {
  Button as ButtonLegacy,
  Error,
  SectionHeader,
  TextField,
} from 'ugcomponents/Form';
import Button from 'viewComponents/Button';
import {
  HIDE_DELAY,
  SHOW_DELAY,
  SHOW_LONG_DELAY,
  LOGIN_DELAY,
} from 'ugcomponents/Layout/AuthLayout/constants';
import { TokenResolver } from 'ugcomponents/Notification';
import IconButton from 'ugcomponents/Buttons/IconButton';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';

// import background from 'shareAssets/bg-login.jpg';
import { SIGN_IN, USER_API, RESEND_SIGNUP, ME } from 'apis/constants';
import { CONFIG } from './defines/config';
import { EMAIL, PASSWORD } from './defines/inputs';
import m from './defines/messages';
import {
  INVALID_BUTTON,
  SENDING_BUTTON,
  VALID_BUTTON,
  SUCCESS_BUTTON,
} from './defines/submitButtons';
import styles from './style';
import { VARIANTS } from '../../../variantsConstants';
import {
  USER_NOT_CONFIRMED,
  USER_NOT_CONFIRMED_ERROR,
  USER_NOT_EXISTS,
  USER_NOT_EXISTS_ERROR,
} from './defines/serverErrors';

export class LoginPage extends React.Component {
  state = {
    button: VALID_BUTTON,
    show: false,
    form: false,
    errors: false,
    errorMsg: '',
    loginSuccess: false,
    email: '',
  };

  componentWillMount = () => {
    const { location } = this.props;

    // query /login?email=abc@xyz.com
    const query = parse(location.search.substr(1));
    if (query && query.email) {
      this.setState({ email: query.email });
    }
  };

  componentDidMount = () => {
    this.handleRedirectTo();

    const { config, size, title } = this.props;
    let waitMs = SHOW_DELAY;
    if (size && size !== this.state.size) waitMs = SHOW_LONG_DELAY; // extra time for layout resizing animation

    config({
      size,
      title,
      tinting: false,
      sidebar: '',
    });

    this.formTimeout = setTimeout(() => this.setState({ form: true }), waitMs);
  };

  componentWillUnmount = () => {
    clearTimeout(this.formTimeout);
    clearTimeout(this.loginTimeout);
    clearTimeout(this.registerTimeout);
    clearTimeout(this.forgetTimeout);
  };

  verifySuccess = ({ registered }, { tokenId }) => {
    const { history } = this.props;

    // user not registered yet, redirect to registration
    if (!registered) {
      return history.push(`/registration/${tokenId}`);
    }

    // email is prefilled, focus password instead
    return this.passwordInput.focus();
  };

  verifyFail = (_, { tokenId }) => {
    const { history } = this.props;

    history.push(`/notification/${tokenId}`);
  };

  loginSuccess = () => {
    this.setState({ button: SUCCESS_BUTTON, loginSuccess: true });
    this.fetchMe();
  };

  resendVerficationSuccess = () => {
    this.setState({ errors: false, errorMsg: '' });
  };

  // eslint-disable-next-line no-unused-vars
  loginError = ({ error, msg }) => {
    this.invalidateForm(msg);
    this.password.setValue('');
  };

  invalidateForm = errors => {
    if (errors.indexOf(USER_NOT_CONFIRMED) !== -1) {
      this.setState({
        button: INVALID_BUTTON,
        errors: true,
        errorMsg: USER_NOT_CONFIRMED_ERROR,
      });
    } else if (errors.indexOf(USER_NOT_EXISTS) !== -1) {
      this.setState({
        button: INVALID_BUTTON,
        errors: true,
        errorMsg: USER_NOT_EXISTS_ERROR,
      });
    } else {
      this.setState({ button: INVALID_BUTTON, errors: true, errorMsg: errors });
    }
  };

  fetchMeSuccess = result => {
    this.props.onUserLogin();
    this.props.config({
      title: (
        <span>
          Welcome back,{' '}
          <span style={{ textTransform: 'capitalize' }}>
            {result.givenName}
          </span>
        </span>
      ),
    });
    const browserHistory = this.props.history;
    this.loginTimeout = setTimeout(
      () => browserHistory.push(URL_HELPERS.myTours()),
      LOGIN_DELAY,
    );
  };

  fetchMe = () => {
    this.props.resaga.dispatchTo(USER_API, ME, {
      payload: {},
      onSuccess: this.fetchMeSuccess,
    });
  };

  handleRedirectTo = () => {
    const { history, switchToken, decline } = this.props;
    if (switchToken) {
      const isDecline = LOGIC_HELPERS.ifElse(decline, '/decline', '');
      this.props.resaga.setValue({ switchToken: null, decline: null });
      return history.push(`/notification/${switchToken}${isDecline}`);
    }
    return '';
  };

  /**
   * update button styling and call onSubmit of resaga
   * @param data
   */
  handleSubmit = ({ username, password }) => {
    const { shareTo } = this.props;
    this.username = toLowerCaseIfString(username || shareTo);
    const payload = {
      username: this.username,
      password,
    };

    this.setState({ button: SENDING_BUTTON });
    this.props.resaga.dispatchTo(USER_API, SIGN_IN, {
      payload,
      onSuccess: this.loginSuccess,
      onError: this.loginError,
    });
  };

  resendVerification = () => {
    this.props.resaga.dispatchTo(USER_API, RESEND_SIGNUP, {
      payload: { username: this.username },
      onSuccess: this.resendVerficationSuccess,
    });
  };

  goToRegister = () => {
    this.setState({ form: false });
    // this.props.config({ title: 'Redirecting..' });
    const browserHistory = this.props.history;
    this.registerTimeout = setTimeout(
      () => browserHistory.push('/registration'),
      HIDE_DELAY,
    );
  };

  goToForgetPassword = () => {
    const { email } = this.state;
    const emailQuery = email ? `?email=${encodeURIComponent(email)}` : '';
    this.setState({ form: false });
    // this.props.config({ title: 'Redirecting..' });
    const browserHistory = this.props.history;
    this.forgetTimeout = setTimeout(
      () => browserHistory.push(`/forgot${emailQuery}`),
      HIDE_DELAY,
    );
  };

  errorAction = errMsg => {
    if (errMsg !== USER_NOT_CONFIRMED_ERROR) {
      return (
        <GridItem>
          <UGLink to="/forgot" tabIndex={-1}>
            <M {...m.forgetPassword} />
          </UGLink>
        </GridItem>
      );
    }
    const resendButton = (
      <GridItem className={this.props.classes.resend}>
        <Button
          textAlign="left"
          onClick={this.resendVerification}
          noPadding
          variant={VARIANTS.INLINE}
          size="extraSmall"
        >
          <M {...m.noValidationEmail} />
        </Button>
      </GridItem>
    );
    return resendButton;
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordHOCRef = r => {
    this.password = r;
  };

  handlePasswordInputRef = r => {
    this.passwordInput = r;
  };

  enableButton = () => this.setState({ errors: false });

  toggleShowPassword = e => {
    e.preventDefault();
    this.setState(prevState => ({ show: !prevState.show }));
  };

  renderPasswordHelper = ({ value }) => {
    const { show } = this.state;
    const { classes } = this.props;

    return (
      <div>
        {value && (
          <IconButton
            tooltip={show ? 'Hide Password' : 'Show Password'}
            onClick={this.toggleShowPassword}
            className={classNames(classes.endAdornmentBtn)}
          >
            <Icon
              size="small"
              icon={show ? 'eye-crossed' : 'eye'}
              className={classes.endAdornmentIcon}
            />
          </IconButton>
        )}
      </div>
    );
  };

  renderErrorMessage = errorMsg => {
    const { classes } = this.props;
    const errorMessage =
      errorMsg === USER_NOT_CONFIRMED_ERROR ? (
        <GridItem className={classes.verificationError}>
          <M {...m.verificationMessageError} />
        </GridItem>
      ) : (
        <GridItem>{errorMsg}</GridItem>
      );

    return errorMessage;
  };

  handleEmailInputRef = r => {
    this.emailInput = r;
  };

  changeEmail = (email = '') => {
    this.setState({ email });

    this.emailInput.focus();
  };

  clearEmail = () => {
    this.changeEmail();
    this.password.setValue('');
  };

  renderForm = ({ opacity, translateX }) => {
    const { button, errors, show, loginSuccess, email, errorMsg } = this.state;
    const { classes, shareTo, signInLoading } = this.props;
    const isLoading = signInLoading;
    const isLoadingOrErrors = isLoading || errors;
    const isLoadingOrLoginSuccess = isLoading || loginSuccess;
    const buttonType = isLoadingOrErrors || loginSuccess ? 'button' : 'submit';

    return (
      <BlockUi
        style={{
          opacity,
          transform: `translateX(${translateX}px)`,
        }}
        tag="div"
        blocking={isLoadingOrLoginSuccess}
      >
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Registration' },
          ]}
        />
        <TokenResolver
          onSuccess={this.verifySuccess}
          onError={this.verifyFail}
        />
        {this.renderInvitationMessage()}
        <Form onValidSubmit={this.handleSubmit} onValid={this.enableButton}>
          {!shareTo && (
            <React.Fragment>
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
                <M {...m.subTitle} />
              </SectionHeader>
              <TextField
                {...EMAIL}
                value={email}
                onChange={this.changeEmail}
                disabled={isLoadingOrLoginSuccess}
                inputRef={this.handleEmailInputRef}
                InputProps={{
                  className: classes.input,
                  startAdornment: (
                    <Icon
                      size="small"
                      icon="user"
                      className={classes.startAdornmentIcon}
                    />
                  ),
                  endAdornment: email && (
                    <IconButton
                      tooltip="Clear"
                      onClick={this.clearEmail}
                      className={classNames(classes.endAdornmentBtn)}
                    >
                      <Icon
                        size="small"
                        icon="lnr-cross"
                        className={classes.endAdornmentIcon}
                      />
                    </IconButton>
                  ),
                }}
              />
            </React.Fragment>
          )}
          <div className={classes.passwordContainer}>
            <TextField
              {...PASSWORD}
              type={show ? 'text' : 'password'}
              innerRef={this.handlePasswordHOCRef}
              inputRef={this.handlePasswordInputRef}
              disabled={isLoadingOrLoginSuccess}
              InputProps={{
                className: classes.input,
                startAdornment: (
                  <Icon
                    icon="key"
                    size="small"
                    className={classes.startAdornmentIcon}
                  />
                ),
                endAdornment: (
                  <IconButton
                    tooltip={show ? 'Hide Password' : 'Show Password'}
                    onClick={this.toggleShowPassword}
                    className={classNames(classes.endAdornmentBtn)}
                  >
                    <Icon
                      size="small"
                      icon={show ? 'eye-crossed' : 'eye'}
                      className={classes.endAdornmentIcon}
                    />
                  </IconButton>
                ),
              }}
            />
          </div>
          <div>
            {!errors && (
              <button
                type="button"
                onClick={this.goToForgetPassword}
                tabIndex={-1}
                className={classes.textHelper}
              >
                <M {...m.forgetPassword} />
              </button>
            )}
          </div>
          <Error>
            {errors && (
              <GridContainer>
                {this.renderErrorMessage(errorMsg)}
                {this.errorAction(errorMsg)}
              </GridContainer>
            )}
          </Error>
          <div>
            <ButtonLegacy
              className={classes.btn}
              type={buttonType}
              loading={isLoadingOrErrors}
              color="blue"
              block
            >
              {button.text}
            </ButtonLegacy>
          </div>
        </Form>
        <div>
          <H5>
            <M {...m.noAccount} />
          </H5>
          <ButtonLegacy
            className={classes.btn}
            loading={isLoadingOrLoginSuccess}
            type="button"
            color="green"
            block
            onClick={this.goToRegister}
          >
            Register
          </ButtonLegacy>
        </div>
      </BlockUi>
    );
  };

  renderInvitationMessage = () => {
    const {
      classes,
      isRegisterByInvitation,
      shareTo,
      senderName,
      senderEmail,
      nodeContent,
      roleName,
      organisationName,
    } = this.props;

    if (!isRegisterByInvitation) {
      return null;
    }

    const invitee = <b>{shareTo}</b>;
    const tourRole = <b>{roleName}</b>;
    const tourName = <b>{nodeContent}</b>;
    const org = <b>{organisationName}</b>;
    const sender = (
      <a href={`mailto:${senderEmail}`}>
        <b>{senderName}</b>
      </a>
    );

    return (
      <div className={classes.info}>
        <H5 className={classes.lineHeight}>
          <M {...m.invitationSender} values={{ sender, org }} />
          <M {...m.invitationInfo} values={{ tourName, tourRole }} />
        </H5>
        <H5 className={classes.loginAs}>
          <M {...m.loginAs} values={{ invitee }} />
          <UGLink to="/login">
            <b>Not you?</b>
          </UGLink>
        </H5>
      </div>
    );
  };

  render() {
    const { error, form } = this.state;

    if (error) return error;

    return (
      <Motion
        style={{
          opacity: spring(form ? 1 : 0, presets.stiff),
          translateX: spring(form ? 0 : -50, presets.stiff),
        }}
      >
        {this.renderForm}
      </Motion>
    );
  }
}

LoginPage.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  config: PropTypes.func,
  size: PropTypes.number,
  title: PropTypes.node,
  location: PropTypes.object,
  history: PropTypes.object,
  switchToken: PropTypes.string,
  signInLoading: PropTypes.bool,
  // notification info, all optional
  shareTo: PropTypes.string,
  senderName: PropTypes.string,
  senderEmail: PropTypes.string,
  organisationName: PropTypes.string,
  nodeContent: PropTypes.string,
  roleName: PropTypes.string,
  isRegisterByInvitation: PropTypes.bool,
  onUserLogin: PropTypes.func,

  // resaga
  decline: PropTypes.bool,
};

LoginPage.defaultProps = {
  size: 5,
  title: 'Login to your account',
  location: { search: '' },
  history: {},
  config: () => false,

  shareTo: '',
  senderName: '',
  senderEmail: '',
  organisationName: '',
  nodeContent: '',
  roleName: '',
  isRegisterByInvitation: false,
};

export function mapDispatchToProps(dispatch) {
  return {
    onUserLogin: () => dispatch(userLogin()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  withStyles(styles, { name: 'LoginPage' }),
  resaga(CONFIG),
)(LoginPage);
