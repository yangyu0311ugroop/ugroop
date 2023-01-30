import { withStyles } from '@material-ui/core/styles';
import { PRODUCTION } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
// import { FormattedMessage as M } from 'react-intl';
import { Helmet } from 'react-helmet';
import UGLink from 'components/Link';
import Header from 'ugcomponents/Layout/AuthenticatedLayout/Header/index';
import Footer from 'ugcomponents/Footer/index';
import Container from 'components/Container';
import { CONFIG } from './config';
import Content from './components/Content';
import styles from './styles';

export class TermsOfService extends PureComponent {
  render = () => {
    const { account } = this.props;
    let header;

    let version = `uGroop@${process.env.APP_VERSION}.${process.env.BUILD_NUM}`;
    let diff = '';

    if (process.env.CI && process.env.BRANCH !== PRODUCTION) {
      const stableBranch = process.env.STABLE_BRANCH || 'stage';
      const branch = process.env.BRANCH === stableBranch ? 'Stable' : 'Latest';
      diff = (
        <a href={process.env.COMPARE_URL} target="_blank">
          GitHub Commits
        </a>
      );

      version = (
        <span>
          Version {process.env.APP_VERSION} -{' '}
          <a href={process.env.BUILD_URL} target="_blank">
            Build {process.env.BUILD_NUM} ({branch})
          </a>
        </span>
      );
    }

    if (account) {
      header = <Header />;
    }

    return (
      <div>
        <Helmet
          title="Terms of Service"
          meta={[
            { name: 'description', content: 'Description of Terms of Service' },
          ]}
        />
        {header}
        <Content />
        <Container>
          <Footer
            items={[
              <UGLink to="/privacy">Privacy Policy</UGLink>,
              'Contact Us',
              <UGLink to="/terms-of-service">Terms of Service</UGLink>,
              version,
              diff,
            ]}
          />
        </Container>
      </div>
    );
  };
}

TermsOfService.propTypes = {
  // hoc props

  // parent props

  // resaga props
  account: PropTypes.bool.isRequired,
};

TermsOfService.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'TermsOfService' }),
  resaga(CONFIG),
)(TermsOfService);
