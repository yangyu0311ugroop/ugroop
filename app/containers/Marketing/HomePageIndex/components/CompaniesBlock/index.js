import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UGHR from 'containers/Marketing/Components/Hr';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Header from 'containers/Marketing/Components/Header';
import Img from 'components/Img';

// Logos
import LogoAup from 'shareAssets/company-logos/logo-aup.png';
import LogoIdvpacific from 'shareAssets/company-logos/logo-idvpacific.png';
import LogoTect from 'shareAssets/company-logos/logo-tect.png';
import LogoTrustid from 'shareAssets/company-logos/logo-trustid.png';

import stylesheet from './style';

export const CompaniesBlock = ({ classes }) => (
  <div>
    <UGHR />
    <Container className={classes.root}>
      <GridContainer>
        <GridItem xs={12} md={6} className={classes.flexCenter}>
          <Header as="h2">Supported by these wonderful companies</Header>
        </GridItem>
        <GridItem xs={12} md={6} className={classes.flexCenter}>
          <GridContainer>
            <GridItem xs={12} md={3} className={`${classes.flexCenter}`}>
              <Img
                src={LogoTect}
                alt="tect"
                className={`${classes.companyLogo}`}
              />
            </GridItem>
            <GridItem xs={12} md={3} className={`${classes.flexCenter}`}>
              <Img
                src={LogoTrustid}
                alt="trustid"
                className={`${classes.companyLogo}`}
              />
            </GridItem>
            <GridItem xs={12} md={3} className={`${classes.flexCenter}`}>
              <Img
                src={LogoIdvpacific}
                alt="Idvpacific"
                className={`${classes.companyLogo}`}
              />
            </GridItem>
            <GridItem xs={12} md={3} className={`${classes.flexCenter}`}>
              <Img
                src={LogoAup}
                alt="aup"
                className={`${classes.companyLogo}`}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Container>
  </div>
);

CompaniesBlock.propTypes = {
  classes: PropTypes.object,
};
CompaniesBlock.defaultProps = {};

export default withStyles(stylesheet, { name: 'CompaniesBlock' })(
  CompaniesBlock,
);
