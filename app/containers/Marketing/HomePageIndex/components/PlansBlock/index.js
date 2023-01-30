import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import UnderlineWrapper from 'containers/Marketing/Components/UnderlineWrapper';
import GridItem from 'components/GridItem';
import Header from 'containers/Marketing/Components/Header';
import Description from 'containers/Marketing/Components/Description';
import Jumbotron from 'containers/Marketing/Components/Jumbotron';
import UGCard from 'ugcomponents/Card';
import UGButton from 'ugcomponents/Buttons/Button';

import stylesheet from './style';

export const PlansBlock = ({ classes }) => (
  <div className={classes.root}>
    <Container>
      <GridContainer>
        <GridItem>
          <Jumbotron>Plans</Jumbotron>
        </GridItem>
        <GridItem className={`${classes.rightItem} ${classes.normalFlex}`}>
          <Description size={18} isBold>
            Choose what&#39;s best for you
          </Description>
          <UnderlineWrapper>
            <Header as="h2">
              Subscribe to our plan and be an awesome <span>organiser</span>
            </Header>
          </UnderlineWrapper>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem className={`${classes.normalFlex} ${classes.planItem}`}>
          <UGCard withShadow className={`${classes.planItemCard}`}>
            <Header as="h3">Basic</Header>
            <Description size={16}>
              A simple yet powerful way to get things done
            </Description>
            <Description isBold className={classes.pricingText} size={24}>
              $9 <span>Monthly</span>
            </Description>
            <UGButton size="medium" color="blue">
              SIGN UP
            </UGButton>
          </UGCard>
        </GridItem>
        <GridItem className={`${classes.normalFlex} ${classes.planItem}`}>
          <UGCard withShadow className={`${classes.planItemCard}`}>
            <Header as="h3">Premium</Header>
            <Description size={16}>
              A simple yet powerful way to get things done
            </Description>
            <Description isBold className={classes.pricingText} size={24}>
              $20 <span>Monthly</span>
            </Description>
            <UGButton className={classes.homeBtn}>SIGN UP</UGButton>
          </UGCard>
        </GridItem>
        <GridItem className={`${classes.normalFlex} ${classes.planItem}`}>
          <UGCard withShadow className={`${classes.planItemCard}`}>
            <Header as="h3">Standard</Header>
            <Description size={16}>
              A simple yet powerful way to get things done
            </Description>
            <Description isBold className={classes.pricingText} size={24}>
              $15 <span>Monthly</span>
            </Description>
            <UGButton size="medium" color="blue">
              SIGN UP
            </UGButton>
          </UGCard>
        </GridItem>
      </GridContainer>
    </Container>
  </div>
);

PlansBlock.propTypes = {
  classes: PropTypes.object,
};
PlansBlock.defaultProps = {};

export default withStyles(stylesheet, { name: 'PlansBlock' })(PlansBlock);
