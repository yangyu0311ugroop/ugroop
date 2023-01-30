/**
 * Created by Jay on 1/7/17.
 */
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import classnames from 'classnames';
import H5 from 'components/H5';
import { compose } from 'redux';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import UGLink from 'components/Link';
import Grid from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'ugcomponents/Icon';
import Logo from 'ugcomponents/Logo/index';
import Button from 'ugcomponents/Buttons/Button';
import LogoutLink from 'smartComponents/Authentication/components/LogoutLink';
import { withStyles } from '@material-ui/core/styles';
import { ORGANISATION_API, GET_OWN_ORG_INFO } from 'apis/constants';
import { FormattedMessage as M, injectIntl } from 'react-intl';
import { CONFIG } from './config';
import menuData from './menuData';
import styleSheet from './style';
import m from './messages';

export class FirstTimeSetupLayout extends PureComponent {
  state = {
    isLoading: false,
  };

  componentDidMount = () => {
    this.props.resaga.dispatchTo(ORGANISATION_API, GET_OWN_ORG_INFO, {});
  };

  handleLoading = isLoading => {
    this.setState({ isLoading: !!isLoading });
  };

  // TODO: remove setTimeout when links for the footer is set
  handlesOnClick = e => {
    e.preventDefault();
    this.handleLoading(true);
    setTimeout(() => this.handleLoading(false), 2000);
  };

  generateHeader = logoutHidden => {
    const logo = <Logo tinting />;
    const { classes } = this.props;
    if (logoutHidden) {
      return logo;
    }
    return (
      <div>
        {logo}
        <LogoutLink className={classes.orgPersonLogout}>
          <Button outline="outLineWhite" onClick={this.handleLoading}>
            <Grid>
              <GridItem>
                <Icon icon="lnr-exit-right" size="medium" />
              </GridItem>
              <GridItem alignItems="center" className={classes.logoutContainer}>
                Logout
              </GridItem>
            </Grid>
          </Button>
        </LogoutLink>
      </div>
    );
  };

  generateFooter = lists => {
    const { classes } = this.props;
    return lists.map(item => (
      <UGLink
        to={item.link}
        onClick={this.handlesOnClick}
        key={item.link}
        className={classes.footerLink}
      >
        {item.title}
      </UGLink>
    ));
  };

  render() {
    const { children, classes, location } = this.props;
    let imgClass = classes.welcomePage;
    let logoutHidden = true;
    if (location.pathname.includes('organisation')) {
      imgClass = classes.orgSetup;
      logoutHidden = false;
    }
    if (location.pathname.includes('person')) {
      imgClass = classes.personSetup;
      logoutHidden = false;
    }
    const footerList = this.generateFooter(menuData.footerLinks);
    const content = React.cloneElement(children, {
      handleLoading: this.handleLoading,
      handlesOnClick: this.handlesOnClick,
    });
    return (
      <BlockUi
        className={classnames(classes.parent, imgClass)}
        tag="div"
        blocking={this.state.isLoading}
      >
        <Grid
          justify="space-between"
          direction="column"
          alignItems="center"
          className={classes.container}
        >
          <Helmet
            title="FirstTimeSetup"
            meta={[
              { name: 'description', content: 'Description of FirstTimeSetup' },
            ]}
          />
          <GridItem className={classes.logo} xs={11} sm={10} md={9} lg={8}>
            {this.generateHeader(logoutHidden)}
          </GridItem>
          <GridItem className={classes.content} xs={11} sm={10} md={9} lg={8}>
            {content}
          </GridItem>
          <GridItem className={classes.footer} xs={11} sm={10} md={9} lg={8}>
            <Grid justify="space-between" direction="row" alignItems="center">
              <GridItem className={classes.noSpacing}>{footerList}</GridItem>
              <GridItem className={classes.noSpacing}>
                <H5 className={classes.copyright}>
                  <M {...m.copyright} />
                </H5>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </BlockUi>
    );
  }
}

FirstTimeSetupLayout.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object,

  // parent
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

FirstTimeSetupLayout.defaultProps = {
  location: { pathname: '' },
};

export default compose(
  withRouter,
  resaga(CONFIG),
  withStyles(styleSheet, { name: 'FirstTimeSetupLayout' }),
)(injectIntl(FirstTimeSetupLayout));
