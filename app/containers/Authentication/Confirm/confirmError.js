import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { P } from 'viewComponents/Typography';
import { Error, Information } from 'ugcomponents/Form';
import A from 'htmlComponents/A';
import m from './defines/messages';
import styles from './styles';

const confirmTitle = isError => (isError ? m.confirmError : m.confirmInfo);

const messageComponent = (isError, classes, msg) => {
  if (!isError) {
    return <Information className={classes.info}>{msg}</Information>;
  }
  return <Error className={classes.error}>{msg}</Error>;
};

const confirmMessagePara = (isError, email, intl, classes) => {
  const text = intl.formatMessage;

  if (isError) {
    return (
      <P className={classes.para}>
        {text(m.unableToConfirm)} <strong>{email}</strong>.{' '}
        {text(m.serverReturnedError)}:
      </P>
    );
  }

  return null;
};

export const ConfirmErrorPage = ({ config, intl, query, classes }) => {
  let msg;
  let isError;

  msg = <P className={classes.para}>{query.msg}</P>;
  isError = true;

  if (
    query.msg &&
    (query.msg.toLowerCase() ===
      'user cannot be confirm. current status is confirmed' ||
      query.msg.toLowerCase() ===
        'user cannot be confirmed. current status is confirmed')
  ) {
    isError = false;
    const loginLink = `/login?email=${encodeURIComponent(query.email)}`;
    msg = (
      <P className={classes.para}>
        Your email address has already been verified. Please{' '}
        <A href={loginLink}>log in</A>.
      </P>
    );
  }

  const text = intl.formatMessage;

  config({
    tinting: false,
    title: text(confirmTitle(isError)),
  });

  return (
    <div>
      <Helmet title={isError ? text(m.confirmError) : text(m.confirmInfo)} />
      {confirmMessagePara(isError, query.email, intl, classes)}
      {messageComponent(isError, classes, msg)}
    </div>
  );
};

ConfirmErrorPage.propTypes = {
  config: PropTypes.func.isRequired,
  intl: PropTypes.shape({ formatMessage: PropTypes.func.isRequired })
    .isRequired,
  query: PropTypes.object,
  classes: PropTypes.object,
};

ConfirmErrorPage.defaultProps = {
  query: {},
  classes: {},
};

export default withStyles(styles)(ConfirmErrorPage);
