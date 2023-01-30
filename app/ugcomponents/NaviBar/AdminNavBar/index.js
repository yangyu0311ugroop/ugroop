import { withStyles } from '@material-ui/core/styles';
import { GET_PERSON_DETAIL, PERSON_DETAIL_API } from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import UGLink from 'components/Link';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Scroll from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { navbarScroll } from 'utils/constant';
import { withXSDown } from 'components/material-ui/hocs/withMediaQuery';
import LeftMenu from './components/LeftMenu';
import RightMenu from './components/RightMenu';
import { CONFIG } from './config';
import PageLogo from './PageLogo';

const styleSheet = {
  grow: {
    flex: 1,
  },
  navGrid: {
    height: 36,
  },
  logoOffset: {
    marginLeft: -26, // half the reserve column width
  },
  dense: {
    margin: 0,
    padding: 0,
  },
  nav: {
    padding: '4px 8px',
    background: 'white',
    position: 'relative',
  },
  navXS: {
    padding: '0',
    background: 'white',
    position: 'relative',
  },
  navSticky: {
    '&:after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '100%',
      height: 4,
      background:
        'linear-gradient(180deg,rgba(9,30,66,0.13) 0,rgba(9,30,66,0.13) 1px,rgba(9,30,66,0.08) 1px,rgba(9,30,66,0) 4px)',
    },
  },
  updateBanner: {
    background: '#f6f8fa',
    padding: '4px 0',
  },
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  },
  pageLogoPosition: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  invisible: {
    cursor: 'pointer',
    width: 16,
    heigh: 16,
  },
  noUnderline: {
    textDecoration: 'none',
    '&:hover, &:active, &:focus': {
      textDecoration: 'none',
    },
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
};

export class UGAdminHeader extends PureComponent {
  state = {};

  componentDidMount = () => {
    this.fetchPersonDetails(this.props.userId);

    // check if there is a new version every 60s

    this.checkForUpdateTimer = setInterval(this.checkForUpdate, 60 * 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.checkForUpdateTimer);
  };

  checkForUpdate = () => {
    if (window.swUpdate) {
      this.setState({ showUpdate: true });
    }
  };

  fetchPersonDetails = userId => {
    if (userId) {
      this.props.resaga.dispatchTo(PERSON_DETAIL_API, GET_PERSON_DETAIL, {
        payload: {
          userId,
        },
      });
    }
  };

  renderLeftMenu = () => {
    const { match, location, showLeftMenu } = this.props;
    if (!showLeftMenu) {
      return null;
    }

    return <LeftMenu match={match} location={location} />;
  };

  renderLogo = () => {
    const { page, match, classes } = this.props;

    const link = URL_HELPERS.home(page, match);
    return (
      <GridItem>
        {/* <div className={classes.center}> */}
        <UGLink to={link} className={classes.noUnderline}>
          <GridContainer
            alignItems="center"
            wrap="nowrap"
            className={classes.noWrap}
          >
            <GridItem>
              <GridContainer
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <GridItem>
                  <PageLogo sm customText="Home" />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </UGLink>
        {/* </div> */}
      </GridItem>
    );
  };

  refreshPage = () => {
    window.location.reload();
  };

  renderShowUpdate = () => {
    const { classes } = this.props;

    return (
      <GridContainer alignItems="center" className={classes.updateBanner}>
        <GridItem xs />
        <GridItem>
          <Icon icon="lnr-cloud-sync" color="blue" />
        </GridItem>
        <GridItem>
          <JText black>A new version of uGroop is available.</JText>
        </GridItem>
        <GridItem>
          <JText blue bold onClick={this.refreshPage}>
            Refresh
          </JText>
        </GridItem>
        <GridItem xs />
      </GridContainer>
    );
  };

  render = () => {
    const { classes, userId, xsDown } = this.props;
    const { showUpdate } = this.state;

    return (
      <Scroll.Element name={navbarScroll}>
        <GridContainer
          direction="column"
          spacing={0}
          className={xsDown && classes.dense}
        >
          {showUpdate && this.renderShowUpdate()}
          <GridItem>
            <div
              className={classnames(
                xsDown ? classes.navXS : classes.nav,
                classes.navSticky,
              )}
            >
              <Container maxSize>
                <GridContainer
                  alignItems="center"
                  spacing={0}
                  justify="space-between"
                  key="Top Left Menu"
                >
                  <GridItem>
                    <GridContainer
                      alignItems="center"
                      wrap="nowrap"
                      className={classes.noWrap}
                    >
                      <GridItem>{this.renderLogo()}</GridItem>
                      <GridItem>{this.renderLeftMenu()}</GridItem>
                    </GridContainer>
                  </GridItem>

                  <GridItem xs />

                  <GridItem>
                    <RightMenu userId={userId} />
                  </GridItem>
                </GridContainer>
              </Container>
            </div>
          </GridItem>
        </GridContainer>
      </Scroll.Element>
    );
  };
}

UGAdminHeader.propTypes = {
  resaga: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  classes: PropTypes.object.isRequired,
  // resaga
  userId: PropTypes.number,
  page: PropTypes.string,

  showLeftMenu: PropTypes.bool,
  xsDown: PropTypes.bool,
};

UGAdminHeader.defaultProps = {
  userId: null,
  location: {},
  match: {},
  showLeftMenu: true,
};

export default compose(
  withStyles(styleSheet, { name: 'UGAdminHeader' }),
  resaga(CONFIG),
  withXSDown,
)(UGAdminHeader);
