import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { P } from 'viewComponents/Typography';
import m from './defines/messages';
import styles from './styles';

export const ConfirmSuccessPage = ({ config, intl, query, classes }) => {
  const text = intl.formatMessage;

  config({ tinting: false, title: text(m.confirmSuccess) });

  const loginUrl = `/login?email=${encodeURIComponent(query.email)}`;

  return (
    <div>
      <Helmet title={text(m.confirmSuccess)} />
      <P className={classes.para}>
        {text(m.registrationConfirmed)} <a href={loginUrl}>{text(m.logIn)}</a>.
      </P>
    </div>
  );
};

ConfirmSuccessPage.propTypes = {
  config: PropTypes.func.isRequired,
  intl: PropTypes.shape({ formatMessage: PropTypes.func.isRequired })
    .isRequired,
  query: PropTypes.object,
  classes: PropTypes.object,
};

ConfirmSuccessPage.defaultProps = {
  query: {},
  classes: {},
};

export default withStyles(styles)(ConfirmSuccessPage);
