import { PRODUCTION } from 'appConstants';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UGLink from 'components/Link';
import Container from 'components/Container';
import FooterTop from 'containers/Marketing/Components/FooterTop';
import FooterBottom from 'ugcomponents/Footer';
import stylesheet from './style';

export const FooterMarketing = ({ classes }) => {
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

  return (
    <div className={classes.root}>
      <div className={classes.darkOverride} />
      <div className={classes.footerContent}>
        <Container className={classes.container}>
          <FooterTop />
          <FooterBottom
            rootClassName={classes.footerBottom}
            items={[
              <UGLink to="/privacy" target="_blank">
                Privacy Policy
              </UGLink>,
              'Contact Us',
              <UGLink to="/terms-of-service" target="_blank">
                Terms of Service
              </UGLink>,
              version,
              diff,
            ]}
          />
        </Container>
      </div>
    </div>
  );
};

FooterMarketing.propTypes = {
  classes: PropTypes.object,
};
FooterMarketing.defaultProps = {};

export default withStyles(stylesheet, { name: 'FooterMarketing' })(
  FooterMarketing,
);
