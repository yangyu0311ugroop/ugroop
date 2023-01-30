import { DO_NOTHING, PENDING, CONFIRMED, URL_HELPERS } from 'appConstants';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import ErrorPages from 'ugcomponents/ErrorPages';
import { TokenResolver } from 'ugcomponents/Notification';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';

export class NotificationPage extends PureComponent {
  state = {};

  componentWillReceiveProps = nextProps => {
    // user logged out, redirect them to `redirectTo` page
    if (this.props.me && !nextProps.me) {
      const { history } = this.props;
      const { redirectTo } = this.state;

      return history.push(redirectTo);
    }

    return DO_NOTHING;
  };

  redirectTo = (notification, tokenId) => {
    const { decline } = this.props;

    if (decline) {
      return `/invitation/${tokenId}/decline`;
    }

    const registered = get(notification, 'registered', false);
    // user already registered using this token, redirect to login
    if (registered) {
      return `/login/${tokenId}?redirect=${URL_HELPERS.index()}`;
    }

    return `/registration/${tokenId}`;
  };

  fetchSuccess = (notification, { tokenId }) => {
    const { history, me, decline } = this.props;

    const { status } = notification;
    console.log({ notification });
    const shareTo =
      notification.inviteTo || notification.shareTo || notification.transferTo;

    if (status === CONFIRMED) {
      return this.setState({ accepted: true });
    }

    if (status !== PENDING) {
      return this.setState({ error: true });
    }

    let redirectTo = this.redirectTo(notification, tokenId);

    if (me && me !== shareTo) {
      const isDecline = LOGIC_HELPERS.ifElse(decline, '&decline=true', '');
      redirectTo = `/admin?shareTo=${encodeURIComponent(
        shareTo,
      )}&token=${tokenId}${isDecline}`;
    }

    return history.push(redirectTo);
  };

  render = () => {
    const { error, accepted } = this.state;

    if (accepted) {
      return <ErrorPages error="404" type="accepted" />;
    }

    if (error) {
      return <ErrorPages error="404" type="invalid" />;
    }

    return <TokenResolver onSuccess={this.fetchSuccess} />;
  };
}

NotificationPage.propTypes = {
  // hoc props
  history: PropTypes.object.isRequired,

  // parent props
  decline: PropTypes.bool,

  // resaga props
  me: PropTypes.string,
};

NotificationPage.defaultProps = {
  me: '',
  decline: false,
};

export default compose(resaga(CONFIG))(NotificationPage);
