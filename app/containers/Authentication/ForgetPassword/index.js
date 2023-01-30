/**
 * Created by Yang on 5/4/17.
 */
import Icon from 'ugcomponents/Icon';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { parse } from 'qs';
import { FormattedMessage as M } from 'react-intl';
import BlockUi from 'react-block-ui';
import { Motion, presets, spring } from 'react-motion';
import { withRouter } from 'react-router-dom';
import resaga from 'resaga';
import { compose } from 'redux';
import { toLowerCaseIfString } from 'utils/stringAdditions';
import Form, {
  Button,
  Error,
  SectionHeader,
  TextField,
} from 'ugcomponents/Form';

import { SHOW_DELAY } from 'ugcomponents/Layout/AuthLayout/constants';

import H4 from 'components/H4';
import { CONFIG } from './defines/config';
import { EMAIL } from './defines/inputs';
import {
  REQUIRED_BUTTON,
  SENDING_BUTTON,
  VALID_BUTTON,
} from './defines/submitButtons';
import ResetPassword from './resetPasswordForm';
import m from './defines/messages';
import { USER_API, FORGET_PWD } from '../../../apis/constants';

const style = {
  btn: {
    padding: '16px',
  },
  subTitle: {
    color: '#c9ccd6',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
    color: '#ACB2C1',
  },
};

export class ForgetPasswordPage extends React.Component {
  state = {
    button: VALID_BUTTON,
    errors: '',
    hasSecurityCode: false,
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
    const { config, size, title } = this.props;
    config({
      size,
      title,
      tinting: false,
      sidebar: '',
    });
    this.formTimeout = setTimeout(
      () => this.setState({ form: true }),
      SHOW_DELAY,
    );
  };

  componentWillUnmount = () => {
    clearTimeout(this.formTimeout);
  };

  sendResetCodeSuccess = () => this.setState({ hasSecurityCode: true });

  // eslint-disable-next-line no-unused-vars
  sendResetCodeFail = ({ error, msg }) => {
    this.invalidateForm(msg);
  };

  invalidateForm = msg => {
    this.setState({
      errors: msg,
    });
    this.disableButton();
  };

  enableButton = () => this.setState({ button: VALID_BUTTON, errors: false });

  disableButton = () => this.setState({ button: REQUIRED_BUTTON });

  handleSubmit = data => {
    this.setState({ button: SENDING_BUTTON, email: data.email });
    this.props.resaga.dispatchTo(USER_API, FORGET_PWD, {
      payload: { username: toLowerCaseIfString(data.email) },
      onSuccess: this.sendResetCodeSuccess,
      onError: this.sendResetCodeFail,
    });
  };

  handleEmailChange = email => this.setState({ email });

  goToLogin = () => {
    const { email } = this.state;
    const emailQuery = email ? `?email=${encodeURIComponent(email)}` : '';
    this.setState({ form: false });
    const browserHistory = this.props.history;
    browserHistory.push(`/login${emailQuery}`);
  };

  renderForm = ({ opacity, translateX }) => {
    const { button, errors } = this.state;
    const { email } = this.state;
    const { classes, sendForgetPwdCodeLoading } = this.props;
    const isLoading = sendForgetPwdCodeLoading;
    const isLoadingOrErrors = isLoading || errors;
    const buttonType = isLoadingOrErrors ? 'button' : 'submit';

    return (
      <BlockUi
        style={{
          opacity,
          transform: `translateX(${translateX}px)`,
        }}
        tag="div"
        blocking={isLoading}
      >
        <H4 className={classes.subTitle}>
          <M {...m.subTitle} />
        </H4>
        <Form
          onValidSubmit={this.handleSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
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
            <M {...m.emailLabel} />
          </SectionHeader>
          <TextField
            {...EMAIL}
            value={email}
            onChange={this.handleEmailChange}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <Icon className={classes.icon} icon="user" size="normal" />
              ),
            }}
          />
          <div>
            <Error>{errors}</Error>
            <Button
              className={classes.btn}
              type={buttonType}
              loading={isLoadingOrErrors}
              color="blue"
              block
            >
              <i className={`fa fa-${button.icon}`} />{' '}
              <span className={button.textClass}>{button.text}</span>
            </Button>
          </div>
          <hr />
          <div>
            <Button
              className={classes.btn}
              disableRipple
              type="button"
              color="outLineBlue"
              block
              onClick={this.goToLogin}
            >
              <M {...m.login} />
            </Button>
          </div>
        </Form>
      </BlockUi>
    );
  };

  render() {
    const { hasSecurityCode, form, email } = this.state;

    if (hasSecurityCode) {
      return <ResetPassword email={email} config={this.props.config} />;
    }
    return (
      <Motion
        style={{
          opacity: spring(form ? 1 : 0, presets.stiff),
          translateX: spring(form ? 0 : 50, presets.stiff),
        }}
      >
        {this.renderForm}
      </Motion>
    );
  }
}

ForgetPasswordPage.propTypes = {
  config: PropTypes.func,
  size: PropTypes.number,
  title: PropTypes.string,
  resaga: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object,
  sendForgetPwdCodeLoading: PropTypes.bool,
};

ForgetPasswordPage.defaultProps = {
  size: 5,
  title: 'Forgotten Password',
  location: { search: '' },
};

export default compose(
  withRouter,
  withStyles(style, { name: 'ForgetPasswordPage' }),
  resaga(CONFIG),
)(ForgetPasswordPage);
