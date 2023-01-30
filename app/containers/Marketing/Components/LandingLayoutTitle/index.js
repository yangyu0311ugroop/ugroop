import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from 'containers/Marketing/Components/Header';
import Description from 'containers/Marketing/Components/Description';
import Container from 'components/Container';
import Button from 'ugcomponents/Buttons/Button/index';
import Input from '@material-ui/core/TextField';
import KeyboardIcon from '@material-ui/icons/KeyboardArrowRight';
import ClassNames from 'classnames';
import stylesheet from './style';

export const LandingLayoutTitle = ({ location, classes }) => {
  let headerTitle = <div />;
  let isHomeView = false;
  let isFeatureView = false;
  switch (location.pathname) {
    case '/': {
      isHomeView = true;
      headerTitle = (
        <div className={classes.container}>
          <hr className={classes.hrStyle} />
          <Header className={classes.homeHeader} as="h1">
            Manage your tours easily, anywhere and anytime
          </Header>
          <Description size={17}>
            uGroop is the pioneer application program that lets you manage your
            school tours anytime anywhere
          </Description>
          <Button className={classes.homeBtn}>
            <span>Let&#39;s get started!</span> <KeyboardIcon />
          </Button>
        </div>
      );
      break;
    }
    case '/features': {
      isFeatureView = true;
      headerTitle = (
        <div className={classes.centeredContainer}>
          <Header as="h2">Features</Header>
          <Description isBold size={17}>
            Get familiar with what we can do
          </Description>
        </div>
      );
      break;
    }
    case '/faq': {
      headerTitle = (
        <div className={classes.faqContainer}>
          <Header as="h1">Got a questions? Look here!</Header>
          <Input
            className={classes.faqInputStyle}
            placeholder="Search anything under the sun"
          />
          <Description size={16}>
            Can&#39;t find an answer? Call us at (890) 682-7777 or email as at
            help@ugroop.com.au
          </Description>
        </div>
      );
      break;
    }
    default: {
      headerTitle = <div />;
      break;
    }
  }

  return (
    <Container
      className={ClassNames(
        { [classes.homeContainer]: isHomeView },
        { [classes.featureContainer]: isFeatureView },
      )}
    >
      {headerTitle}
    </Container>
  );
};

LandingLayoutTitle.propTypes = {
  location: PropTypes.object,
  classes: PropTypes.object,
};
LandingLayoutTitle.defaultProps = {};

export default withStyles(stylesheet, { name: 'LandingLayoutTitle' })(
  LandingLayoutTitle,
);
