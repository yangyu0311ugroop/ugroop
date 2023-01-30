/**
 * Created by quando on 5/4/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Form, {
  Button,
  TextField,
  SectionHeader,
} from 'ugcomponents/Form/index';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import { FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import BlockUi from 'react-block-ui';
import { isEmptyString, toLowerCaseIfString } from 'utils/stringAdditions';
import { CONFIG } from './defines/config';
import { PASSWORD, ResetPasswordCode } from './defines/inputs';
import { SENDING_BUTTON, VALID_RESET_BUTTON } from './defines/submitButtons';
import { INVALID_CODE, INVALID_CODE_ERROR } from './defines/serverErrors';
import ResetSucceed from './resetSuccess';
import m from './defines/messages';
import { HIDE_SHORT_DELAY } from '../../../ugcomponents/Layout/AuthLayout/constants';
import { RESET_PWD, USER_API } from '../../../apis/constants';

const style = {
  btn: {
    padding: '16px',
  },
};

export class ResetPasswordForm extends React.Component {
  state = {
    button: VALID_RESET_BUTTON,
    showPassword: false,
    hasPassword: false,
    serverError: '',
    isSuccess: false,
  };

  componentWillMount = () => {
    this.props.resizeLayout(this.props.size);
    this.props.setTitle(this.props.title);
  };

  /**
   * focus on Email when finish mounting
   */
  componentDidMount = () => {
    const { config, size, title } = this.props;
    config({
      size,
      title,
      tinting: false,
      sidebar: '',
    });
  };

  componentWillUnmount = () => {
    clearTimeout(this.loginTimeout);
  };

  resetSuccess = () => {
    this.setState({ isSuccess: true });
  };

  // eslint-disable-next-line no-unused-vars
  resetFail = ({ error, msg }) => {
    this.invalidateForm(msg);
  };

  invalidateButton = err => this.setState({ button: err });

  invalidateForm = errors => {
    let error;
    let errorButton = SENDING_BUTTON;
    if (errors.indexOf(INVALID_CODE) !== -1) {
      if (this.resetPwdForm) {
        this.resetPwdForm.updateInputsWithError({ code: INVALID_CODE_ERROR });
      }
      error = INVALID_CODE_ERROR;
      errorButton = VALID_RESET_BUTTON;
    }
    this.setState({ serverError: error });
    this.invalidateButton(errorButton);
  };

  enableButton = () => {
    this.setState({ button: VALID_RESET_BUTTON, serverError: '' });
  };

  handleSubmit = data => {
    this.setState({ button: SENDING_BUTTON });
    this.props.resaga.dispatchTo(USER_API, RESET_PWD, {
      payload: {
        username: toLowerCaseIfString(this.props.email),
        code: data.code,
        password: data.password,
      },
      onSuccess: this.resetSuccess,
      onError: this.resetFail,
    });
  };

  handlePassword = (value = '') =>
    this.setState({ hasPassword: !!value.length, serverError: '' });

  handleShowPassword = () =>
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));

  goToLogin = () => {
    const { email } = this.props;
    const emailQuery = email ? `?email=${encodeURIComponent(email)}` : '';
    const browserHistory = this.props.history;
    this.loginTimeout = setTimeout(() => {
      browserHistory.push(`/login${emailQuery}`);
    }, HIDE_SHORT_DELAY);
  };

  /**
   * refs
   * @param r
   */
  handleResetPwdFormRef = r => {
    this.resetPwdForm = r ? r.form : null;
  };

  resetForm = () => {
    const { button, serverError, hasPassword, showPassword } = this.state;
    const isLoading = this.props.resetPasswordLoading;
    const isLoadingOrErrors = isLoading || !isEmptyString(serverError);
    const buttonType = isLoadingOrErrors ? 'button' : 'submit';
    const showPasswordButton = hasPassword && {
      actions: (
        <FormControlLabel
          control={
            <Switch
              tabIndex={-1}
              checked={showPassword}
              onChange={this.handleShowPassword}
            />
          }
          label="show password"
        />
      ),
    };
    return (
      <BlockUi tag="div" blocking={isLoading}>
        <Form
          ref={this.handleResetPwdFormRef}
          onValidSubmit={this.handleSubmit}
          onValid={this.enableButton}
        >
          <SectionHeader>Enter your security code</SectionHeader>
          <TextField
            {...ResetPasswordCode}
            serverError={this.state.serverError}
            alwaysVisible
            type="text"
            disabled={isLoading}
          />
          <SectionHeader {...showPasswordButton}>
            Enter your new password
          </SectionHeader>
          <TextField
            {...PASSWORD}
            serverError={this.state.serverError}
            alwaysVisible
            type={showPassword ? 'text' : 'password'}
            onChange={this.handlePassword}
            disabled={isLoading}
          />
          <div>
            <Button
              className={this.props.classes.btn}
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
              className={this.props.classes.btn}
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
    const isSuccess = this.state.isSuccess;
    let content;
    if (isSuccess) {
      content = <ResetSucceed email={this.props.email} />;
    } else {
      content = this.resetForm();
    }
    return content;
  }
}

ResetPasswordForm.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  resizeLayout: PropTypes.func,
  setTitle: PropTypes.func,
  size: PropTypes.number,
  title: PropTypes.node,
  code: PropTypes.string,
  config: PropTypes.func,
  resetPasswordLoading: PropTypes.bool,
  email: PropTypes.string,
  history: PropTypes.object.isRequired,
};

ResetPasswordForm.defaultProps = {
  resizeLayout: () => {},
  setTitle: () => {},
  size: 7,
  title: <span>Change Password</span>,
};

export default compose(
  withRouter,
  withStyles(style, { name: 'ResetPasswordForm' }),
  resaga(CONFIG),
)(ResetPasswordForm);
