import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import UGCard from 'ugcomponents/Card';
import GridItem from 'components/GridItem';
import Header from 'containers/Marketing/Components/Header';
import Description from 'containers/Marketing/Components/Description';
import HR from 'containers/Marketing/Components/Hr';
import Img from 'components/Img';
import HomeLayout from 'ugcomponents/Layout/LandingLayout';

// Assets
import LaptopMock from 'shareAssets/laptop-mock.png';

import stylesheet from './style';

export const UGFeaturePage = ({ classes, location }) => (
  // eslint-disable-line react/prefer-stateless-function
  <HomeLayout location={location}>
    <div style={{ marginTop: '100px' }}>
      <Helmet
        title="Feature Page"
        meta={[
          {
            name: 'description',
            content: 'uGroop - Features',
          },
        ]}
      />
      <div>
        <Container className={classes.container}>
          <UGCard withNoShadowAndBorder className={classes.featureCard}>
            <Header as="h2" isThin color="orange">
              Create your own tour template
            </Header>
            <HR />
            <GridContainer className={classes.featureContainer}>
              <GridItem xs={12} md={6} className={classes.featureItem}>
                <Header as="h4">Start from template</Header>
                <Description size={14}>
                  Besides school administrators and facilitators, you can find
                  help with your co-organisers when creating the tour
                </Description>
              </GridItem>
              <GridItem xs={12} md={6} className={classes.featureItem}>
                <Header as="h4">Create your own tour</Header>
                <Description size={14}>
                  Besides school administrators and facilitators, you can find
                  help with your co-organisers when creating the tour
                </Description>
              </GridItem>
              <GridItem xs={12} md={6} className={classes.featureItem}>
                <Header as="h4">Collaborate with school</Header>
                <Description size={14}>
                  Besides school administrators and facilitators, you can find
                  help with your co-organisers when creating the tour
                </Description>
              </GridItem>
              <GridItem xs={12} md={6} className={classes.featureItem}>
                <Header as="h4">Share it with others</Header>
                <Description size={14}>
                  Besides school administrators and facilitators, you can find
                  help with your co-organisers when creating the tour
                </Description>
              </GridItem>
            </GridContainer>
          </UGCard>
        </Container>
      </div>
      <div className={classes.laptopBlock}>
        <Container className={classes.laptopBlockContainer}>
          <Img src={LaptopMock} alt="laptop" className={classes.laptopImg} />
          <Header as="h1" className={classes.paddingHeader}>
            ORGANISE IT BETTER, TOGETHER.
          </Header>
        </Container>
      </div>
    </div>
  </HomeLayout>
);

UGFeaturePage.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object,
};
UGFeaturePage.defaultProps = {};

export default withStyles(stylesheet, { name: 'UGFeaturePage' })(UGFeaturePage);
