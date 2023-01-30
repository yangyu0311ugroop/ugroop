/*
 *
 * UGAuthenticationLayout
 *
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import BGContentWrapper from 'containers/Marketing/Components/BGContentWrapper';
import Footer from 'containers/Marketing/Components/Footer';
import MarketingNavBar from 'ugcomponents/NaviBar/MarketingNavBar/index';
import LandingLayoutTitle from 'containers/Marketing/Components/LandingLayoutTitle';

export function UGLandingLayout(props) {
  return (
    <article>
      <Helmet
        titleTemplate="%s - uGroop"
        defaultTitle="uGroop"
        meta={[{ name: 'uGroop Marketing', content: '' }]}
      />
      <BGContentWrapper location={props.location}>
        <MarketingNavBar />
        <LandingLayoutTitle location={props.location} />
      </BGContentWrapper>
      {props.children}
      <Footer />
    </article>
  );
}

UGLandingLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  location: PropTypes.object,
};

// export default userIsNotAuthenticated(UGLandingLayout);
// import { userIsNotAuthenticated } from 'routeProtection';
// import BGContentWrapper from 'containers/Marketing/Components/BGContentWrapper';
// import LandingLayoutTitle from 'containers/Marketing/Components/LandingLayoutTitle';

// TODO: 3.5 Upgrade
export default UGLandingLayout;
