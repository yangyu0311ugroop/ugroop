import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from 'containers/Marketing/Components/Header';
import Description from 'containers/Marketing/Components/Description';
import Container from 'components/Container';
import Img from 'components/Img';
import BGContentWrapper from 'containers/Marketing/Components/BGContentWrapper';
import Card from 'ugcomponents/Card';
import UGCardContent from 'ugcomponents/Card/UGCardContent';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'containers/Marketing/Components/Hr';

import CalendarIcon from '@material-ui/icons/DateRange';
import DevicesIcon from '@material-ui/icons/ImportantDevices';
import PermDeviceIcon from '@material-ui/icons/PermDeviceInformation';
import PaymentIcon from '@material-ui/icons/Payment';

// Assets
import IconWorryFree from 'shareAssets/icon-worry-free.png';
import FeaturesImage from 'shareAssets/features-image.jpg';

import stylesheet from './style';

export const DoNotWorryBlock = ({ classes }) => (
  <div className={classes.firstContainer}>
    <Container>
      <Header as="h2" color="offwhite" className={classes.header}>
        DON&#39;T YOU WORRY
      </Header>
    </Container>
    <BGContentWrapper bgImageUrl={FeaturesImage}>
      <Container>
        <div className={classes.headingPart}>
          <Img src={IconWorryFree} alt="Do not worry" />
          <Header as="h3">Be Worry Free</Header>
          <Description className={classes.marginBottomZero} size={18}>
            For parents, have that peace in mind. Stop worrying about your kids
            being away for a school tour
          </Description>
          <Description className={classes.marginBottomZero} size={18}>
            With uGroop, you can view their itinerary and receive updates on the
            flow of the tour and any other changes made
          </Description>
        </div>
        <Hr className={classes.marginAuto} size={{ value: 80, unit: '%' }} />
        <div style={{ paddingBottom: '24px', textAlign: 'left' }}>
          <Card withShadow className={classes.cardOverride}>
            <UGCardContent className={classes.cardContent}>
              <GridContainer>
                <GridItem xs={12} md={6} className={classes.item}>
                  <div className={classes.itemHeaderContainer}>
                    <Header as="h4" isUpperCase>
                      Organise Tours
                    </Header>
                    <CalendarIcon />
                  </div>
                  <Hr size={{ value: 10, unit: '%' }} />
                  <Description size={16} className={classes.itemDescription}>
                    Keep all your details in one place in your very own
                    &#34;school tourganizer&#34; and be able to view and edit
                    your itinerary
                  </Description>
                </GridItem>
                <GridItem xs={12} md={6} className={classes.item}>
                  <div className={classes.itemHeaderContainer}>
                    <Header as="h4" isUpperCase>
                      Get Updates
                    </Header>
                    <PermDeviceIcon />
                  </div>
                  <Hr size={{ value: 10, unit: '%' }} />
                  <Description size={16} className={classes.itemDescription}>
                    Get instant notification for any changes such as new
                    participants, flight delays, cancellations, change of meetup
                    venue, and etc. Be the first to know
                  </Description>
                </GridItem>
                <GridItem xs={12} md={6} className={classes.item}>
                  <div className={classes.itemHeaderContainer}>
                    <Header as="h4" isUpperCase>
                      Access Anytime & Anywhere
                    </Header>
                    <DevicesIcon />
                  </div>
                  <Hr size={{ value: 10, unit: '%' }} />
                  <Description size={16} className={classes.itemDescription}>
                    Don&#39;t worry about being on-the-go. Access uGroop anytime
                    on any device. We have desktop version, mobile version, and
                    downloadable app for your devices
                  </Description>
                </GridItem>
                <GridItem xs={12} md={6} className={classes.item}>
                  <div className={classes.itemHeaderContainer}>
                    <Header as="h4" isUpperCase>
                      Flexible Plans
                    </Header>
                    <PaymentIcon />
                  </div>
                  <Hr size={{ value: 10, unit: '%' }} />
                  <Description size={16} className={classes.itemDescription}>
                    Choose from three kinds of plans that best suits your needs
                    and budget
                  </Description>
                </GridItem>
              </GridContainer>
            </UGCardContent>
          </Card>
        </div>
      </Container>
    </BGContentWrapper>
  </div>
);

DoNotWorryBlock.propTypes = {
  classes: PropTypes.object,
};
DoNotWorryBlock.defaultProps = {};

export default withStyles(stylesheet, { name: 'DoNotWorryBlock' })(
  DoNotWorryBlock,
);
