import { DO_NOTHING } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
/**
 * Created by Yang on 31/10/16.
 */
import React from 'react';
import { compose } from 'redux';
import { TokenResolver } from 'ugcomponents/Notification';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import RegisterForm from './registerForm';
import RegisterSucceed from './registerSucceed';

const stylesheet = {};

export class RegisterPage extends React.Component {
  state = {
    isRegisterSuccess: false,
    data: {},
  };

  verifySuccess = ({ registered }, { tokenId }) => {
    const { history } = this.props;

    // user already registered using this token, redirect to login
    if (registered) {
      return history.push(`/login/${tokenId}`);
    }

    return DO_NOTHING;
  };

  verifyFail = (_, { tokenId }) => {
    const { history } = this.props;

    history.push(`/notification/${tokenId}`);
  };

  registerSuccess = data => {
    this.setState({ isRegisterSuccess: true, data });
  };

  render() {
    const {
      classes, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const { error, isRegisterSuccess, data } = this.state;

    if (error) return error;

    let content = (
      <RegisterForm
        requireCaptcha
        registerSuccess={this.registerSuccess}
        {...props}
      />
    );
    if (isRegisterSuccess) {
      content = <RegisterSucceed {...props} data={data} />;
    }
    return (
      <div>
        <Helmet
          title="Register"
          meta={[
            { name: 'description', content: 'Description of Registration' },
          ]}
        />
        <TokenResolver
          onError={this.verifyFail}
          onSuccess={this.verifySuccess}
        />
        {content}
      </div>
    );
  }
}
RegisterPage.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export const Register = RegisterPage;

export default compose(
  withRouter,
  withStyles(stylesheet, { name: 'RegisterPage' }),
)(RegisterPage);
