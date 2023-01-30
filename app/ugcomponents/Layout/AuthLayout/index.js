import { get } from 'lodash';
import { PRODUCTION } from 'appConstants';
import classnames from 'classnames';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ContentWrapper from 'components/ContentWrapper/index';
import H1 from 'components/H1';
import SideBar from 'components/Sidebar/index';
import Wrapper from 'components/Wrapper/index';
import Grid from '@material-ui/core/Grid';
import { Hidden } from 'components/material-ui';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { H5 } from 'viewComponents/Typography';
import { Motion, presets, spring } from 'react-motion';
import forgotBackground from 'shareAssets/bg-login.jpg';
// import defaultBackground from 'shareAssets/bg-login-2.jpg';
import defaultBackground from 'shareAssets/bg-login-3.jpg';
import Logo from 'ugcomponents/Logo/index';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';
import style from './style';

// TODO: 3.5 Upgrade, revisit this page, and do some clean up furthur.
export class UGAuthenticationLayout extends React.PureComponent {
  state = {
    size: 5,
    title: '',
    sidebar: '',
    tinting: true,
    currentBG: 'auth',
    background: defaultBackground,
  };

  values = {
    currentYear: new Date().getFullYear(),
  };

  componentDidMount = () => {
    const { history } = this.props;
    const { currentBG } = this.state;
    const pathname = get(history, 'location.pathname', '/');
    if (pathname.includes('/forgot') && currentBG === 'auth') {
      this.setState({ background: forgotBackground, currentBG: 'forgot' });
    } else if (currentBG === 'forgot') {
      this.setState({ background: defaultBackground, currentBG: 'auth' });
    }
  };

  config = setting => this.setState(setting);

  reset = () => this.setState(this.props.setting);

  renderLogo = (tinting, className) => (
    <Grid justify="center" container className={className}>
      <Grid item xs={10}>
        <Logo tinting={tinting} />
      </Grid>
    </Grid>
  );

  renderSidebar = (sidebar, className) => (
    <Motion
      style={{
        opacity: spring(sidebar ? 1 : 0, presets.stiff),
        translateX: spring(sidebar ? 0 : 30, presets.stiff),
      }}
    >
      {({ opacity, translateX }) => (
        <Grid
          justify="center"
          container
          style={{
            opacity,
            transform: `translateX(${translateX}px)`,
          }}
          className={className}
        >
          <Grid item xs={10}>
            {sidebar}
          </Grid>
        </Grid>
      )}
    </Motion>
  );

  renderVersion = () => {
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
      <React.Fragment>
        {version} - {diff}
      </React.Fragment>
    );
  };

  render() {
    const { classes, children } = this.props;
    const { size, title, background, tinting, sidebar } = this.state;

    const logoNode = this.renderLogo(tinting, classes.logo);
    const sidebarNode = this.renderSidebar(sidebar, classes.text);
    const content = React.cloneElement(children, {
      config: this.config,
      reset: this.reset,
    });

    return (
      <article className={classes.authentication}>
        <Helmet
          titleTemplate="%s - uGroop"
          defaultTitle="uGroop"
          meta={[
            {
              name: 'authentication',
              content: 'Layout for Authentication pages',
            },
          ]}
        />

        <ContentWrapper spacing={0}>
          <Hidden smDown>
            <SideBar md className={classes.sidebar}>
              {logoNode}
              {tinting && <div key="tinting" className={classes.bgTinted} />}
              <img
                alt="background"
                key={background}
                src={background}
                role="presentation"
                className={classes.bg}
              />

              {sidebarNode}
            </SideBar>
          </Hidden>

          <Wrapper
            md={size}
            xs
            className={classnames(classes.content, classes.gridItem)}
          >
            <Grid
              container
              justify="center"
              className={classes.contentContainer}
              alignItems="stretch"
            >
              <Hidden smUp>
                <Grid item xs={11} sm={10} className={classes.logoXs}>
                  <Logo tinting={false} />
                </Grid>
              </Hidden>
              <Grid item xs={11} sm={10} md={9} lg={8}>
                <H1 className={classes.header}>{title}</H1>
                {content}
              </Grid>
              {/* add some white space at the end */}
              <Grid item xs={11} sm={10} md={9} lg={8}>
                <H5>
                  <M {...m.copyright} values={this.values} />
                </H5>
                <p>{this.renderVersion()}</p>
              </Grid>
            </Grid>
          </Wrapper>
        </ContentWrapper>
      </article>
    );
  }
}

UGAuthenticationLayout.propTypes = {
  setting: PropTypes.object,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

UGAuthenticationLayout.defaultProps = {
  setting: {
    size: 5,
    title: '',
    sidebar: '',
    tinting: true,
    theme: 'light',
    currentBG: 'auth',
    background: defaultBackground,
  },
};

export default compose(
  withRouter,
  withStyles(style, { name: 'ContentWrapper' }),
)(UGAuthenticationLayout);
