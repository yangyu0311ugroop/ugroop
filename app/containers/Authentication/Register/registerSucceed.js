import H4 from 'components/H4';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import { withStyles } from '@material-ui/core/styles';
// import { FEEDBACK_EMAIL } from 'appConstants';
import PropTypes from 'prop-types';
/**
 * Created by quando on 6/3/17.
 * RegisterSucceed
 *
 */
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { Motion, presets, spring } from 'react-motion';
import UGLink from 'components/Link';
import { HIDE_DELAY } from 'ugcomponents/Layout/AuthLayout/constants';
import get from 'lodash/get';
import m from './defines/messages';

const stylesheet = {
  capitalize: {
    textTransform: 'capitalize',
  },
  whenReady: {
    backgroundColor: '#edf2f4',
    paddingLeft: '20px',
    paddingRight: '20px',
    textAlign: 'left',
    borderRadius: '4px',
  },
  whenReadyContainer: {
    display: 'flex',
  },
  highlightedText: {
    backgroundColor: '#ffffe0',
    padding: 5,
  },
};

export class RegisterSucceed extends React.PureComponent {
  state = {
    form: false,
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
      HIDE_DELAY,
    );
  };

  componentWillUnmount = () => {
    clearTimeout(this.formTimeout);
  };

  makeEmail = (email = '') => {
    if (email) {
      return (
        <span>
          {' '}
          at <b>{email}</b>
        </span>
      );
    }
    return '';
  };

  makeOrgName = (orgName = '') => {
    if (orgName) {
      return <b>{` – ${orgName}`}</b>;
    }
    return '';
  };

  // if you are to polish this UI, you can talk with Jay about how to get more data (senderName, orgName, orgRole, etc) to display
  renderRegisterByInvitationSuccess = () => {
    const email =
      get(this.props, 'data.user.email', '') ||
      get(this.props, 'data.email', '');

    return (
      <div>
        <H4>You have successfully registered by invitation.</H4>

        <H4>
          <UGLink to={`/login?email=${encodeURIComponent(email)}`}>
            <M {...m.loginNow} /> <FlightTakeoff />
          </UGLink>
        </H4>
      </div>
    );
  };

  renderPersonalRegisterMessage = (opacity, translateY) => {
    const { data, classes } = this.props;
    const { email } = data;
    const emailAddress = this.makeEmail(email);
    return (
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <H4>
          <M {...m.introductionJoining} />
        </H4>
        <H4>
          <div className={classes.highlightedText}>
            <M {...m.accountCreatedWithVerification} /> {emailAddress}
            &nbsp;
            <M {...m.checkSpamFolder} />
          </div>
        </H4>
        <H4>
          <M {...m.requestForActivation} />
        </H4>
        <H4>
          <M {...m.needAssistance} />
        </H4>
        <H4>
          <M {...m.planAndTravel} />
          <br />
          <M {...m.uGroopTeam} />
        </H4>
        <H4>
          <UGLink to={`/login?email=${encodeURIComponent(email)}`}>
            <M {...m.loginNow} />
          </UGLink>
          &nbsp;
          <M {...m.loginAndBookmark} />
          <br />
          <br />
          {/* <M {...m.copyRight} /> */}
        </H4>
      </div>
    );
  };

  renderOrgRegisterMessage = (opacity, translateY) => {
    const { data, classes } = this.props;
    const { email } = data;
    const emailAddress = this.makeEmail(email);

    return (
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <H4>
          <M {...m.thankYouOrganisation} />
        </H4>
        <div className={classes.whenReadyContainer}>
          <div className={classes.whenReady}>
            <H4>
              <M {...m.orgAccountCreated} />
              &nbsp;
              {emailAddress}
            </H4>
            <H4>
              <M {...m.whenReady} />
            </H4>
          </div>
        </div>
        {/* <H4>
          <M {...m.orgEnjoyUgroop} />
          &nbsp;
          <M {...m.emailUsAnytime} />
          <a href={`mailto:${FEEDBACK_EMAIL}`}>{FEEDBACK_EMAIL}</a>
          <M {...m.emailUs} />
        </H4> */}
        {/* <H4>
          <UGLink to={`/login?email=${encodeURIComponent(email)}`}>
            <M {...m.goBack} />
            <M {...m.loginNow} /> <FlightTakeoff />
          </UGLink>
        </H4> */}
      </div>
    );
  };

  renderPage = ({ opacity, translateY }) => {
    const { data } = this.props;
    const { isRegisterByInvitation, personal } = data;

    if (isRegisterByInvitation) {
      return this.renderRegisterByInvitationSuccess();
    }

    if (personal) {
      return this.renderPersonalRegisterMessage(opacity, translateY);
    }

    return this.renderOrgRegisterMessage(opacity, translateY);
  };

  render = () => {
    const { form } = this.state;

    return (
      <Motion
        style={{
          opacity: spring(form ? 1 : 0, presets.stiff),
          translateY: spring(form ? 0 : -30, presets.stiff),
        }}
      >
        {this.renderPage}
      </Motion>
    );
  };
}

RegisterSucceed.propTypes = {
  classes: PropTypes.object.isRequired,
  config: PropTypes.func,
  size: PropTypes.number,
  title: PropTypes.string,
  data: PropTypes.object,
};

RegisterSucceed.defaultProps = {
  size: 5,
  title: 'Welcome aboard!',
  data: {},
};

export default withStyles(stylesheet, { name: 'RegisterSucceed' })(
  RegisterSucceed,
);
