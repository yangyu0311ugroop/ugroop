import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Layout from 'ugcomponents/Layout/AuthLayout';
import { parseQueryParam } from 'utils/helpers/url';
import ConfirmSuccessPage from './confirmSuccess';
import ConfirmErrorPage from './confirmError';

const pathMatch = (givenPath, pathLiteral) =>
  givenPath === pathLiteral || givenPath === `${pathLiteral}/`;

export class ConfirmPageWrapper extends PureComponent {
  render = () => {
    const { location, intl } = this.props;

    const params = parseQueryParam(location.search);

    let confirmPage = <ConfirmErrorPage intl={intl} query={params} />;

    if (pathMatch(location.pathname, '/confirm/success')) {
      confirmPage = <ConfirmSuccessPage intl={intl} query={params} />;
    }

    return <Layout>{confirmPage}</Layout>;
  };
}

ConfirmPageWrapper.propTypes = {
  // from react-router
  location: PropTypes.object, // to get query i.e. /login?email=abc@xyz.com
  intl: PropTypes.shape({ formatMessage: PropTypes.func.isRequired })
    .isRequired,
};

ConfirmPageWrapper.defaultProps = {
  location: {},
};

export default injectIntl(ConfirmPageWrapper);
