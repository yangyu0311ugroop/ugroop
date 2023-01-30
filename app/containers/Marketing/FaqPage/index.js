import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from 'components/Container';
import BGContentWrapper from 'containers/Marketing/Components/BGContentWrapper';
import Button from 'ugcomponents/Buttons/Button';
import Header from 'containers/Marketing/Components/Header';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';

import FAQBg from 'shareAssets/faq-bg.jpg';

import OrganizerTab from './components/OrganizerTab';
import stylesheet from './style';

export class UGFaqPage extends PureComponent {
  state = {
    tabVal: 0,
  };

  onHandleChange = (event, value) => {
    this.setState({
      tabVal: value,
    });
  };

  render = () => {
    const { classes } = this.props;
    const { tabVal } = this.state;
    return (
      <div className={classes.root}>
        <Container>
          <Tabs value={tabVal} onChange={this.onHandleChange}>
            <Tab label="As an Organizer" />
            <Tab label="As a Student, Guardian or Faculty Member" />
          </Tabs>
          {tabVal === 0 && <OrganizerTab className={classes.tabItems} />}
          {tabVal === 1 && <div className={classes.tabItems}>SOON!</div>}
        </Container>
        <BGContentWrapper
          rootClassName={classes.lowerBg}
          wrappedItemClassName={classes.lowerWrapper}
          bgImageUrl={FAQBg}
        >
          <div>
            <Header as="h2">Ready to organise a tour?</Header>
            <Button className={classes.homeBtn}>Let&#39;s get started</Button>
          </div>
        </BGContentWrapper>
      </div>
    );
  };
}

UGFaqPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(stylesheet, { name: 'UGFaqPage' })(UGFaqPage);
